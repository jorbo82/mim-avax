
import { DexScreenerService } from './DexScreenerService.ts'

export class PharaohService {
  private supabase: any
  private dexScreener: DexScreenerService

  constructor(supabase: any) {
    this.supabase = supabase
    this.dexScreener = new DexScreenerService()
  }

  async findPools(tokenAddress: string) {
    console.log(`Pharaoh: Finding pools for ERC20 token ${tokenAddress}`)

    try {
      // Get real market data from DexScreener for the ERC20 token
      const dexScreenerData = await this.dexScreener.searchTokenPairs(tokenAddress)
      
      if (!dexScreenerData) {
        return {
          hasPool: false,
          message: 'No Pharaoh pools found for this ERC20 token on DexScreener'
        }
      }

      // Get AVAX price for USD calculations
      const avaxPrice = await this.dexScreener.getAVAXPrice()

      // Calculate metrics from real data
      const tvl = dexScreenerData.liquidity.usd || 0
      const volume24h = dexScreenerData.volume24h || 0
      const fees24h = volume24h * 0.003 // 0.3% typical DEX fee
      
      // Estimate APY based on fees and TVL
      const dailyYield = tvl > 0 ? (fees24h / tvl) * 100 : 0
      const baseAPY = dailyYield * 365
      const rewardAPY = baseAPY * 0.5 // Additional 50% in protocol rewards (estimated)

      const pool = {
        contractAddress: dexScreenerData.pairAddress,
        name: `${dexScreenerData.baseToken.symbol}/AVAX Pharaoh Pool`,
        type: 'liquidity',
        baseTokenAddress: tokenAddress,
        baseTokenSymbol: dexScreenerData.baseToken.symbol,
        quoteTokenAddress: dexScreenerData.quoteToken.address,
        quoteTokenSymbol: dexScreenerData.quoteToken.symbol,
        tvl: tvl,
        apyBase: baseAPY,
        apyReward: rewardAPY,
        volume24h: volume24h,
        fees24h: fees24h,
        metadata: {
          platform: 'pharaoh',
          poolType: 'liquidity',
          tokenPrice: dexScreenerData.priceUsd,
          avaxPrice: avaxPrice,
          dexScreenerUrl: dexScreenerData.url,
          pairAddress: dexScreenerData.pairAddress,
          dataSource: 'dexscreener',
          calculatedAt: new Date().toISOString(),
          priceChange24h: dexScreenerData.priceChange24h,
          tokenInfo: {
            name: dexScreenerData.baseToken.name,
            symbol: dexScreenerData.baseToken.symbol,
            address: dexScreenerData.baseToken.address
          }
        }
      }

      return {
        hasPool: true,
        pools: [pool]
      }
      
    } catch (error) {
      console.error('Error in Pharaoh pool discovery:', error)
      return {
        hasPool: false,
        message: `Error discovering Pharaoh pools: ${error.message}`
      }
    }
  }
}
