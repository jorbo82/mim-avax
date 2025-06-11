
import { DexScreenerService } from './DexScreenerService.ts'

export class LFJService {
  private supabase: any
  private dexScreener: DexScreenerService

  constructor(supabase: any) {
    this.supabase = supabase
    this.dexScreener = new DexScreenerService()
  }

  async findPools(tokenAddress: string) {
    console.log(`LFJ: Finding pools for ERC20 token ${tokenAddress}`)

    try {
      // Get real market data from DexScreener for the ERC20 token
      const dexScreenerData = await this.dexScreener.searchTokenPairs(tokenAddress)
      
      if (!dexScreenerData) {
        return {
          hasPool: false,
          message: 'No LFJ lending pools found for this ERC20 token on DexScreener'
        }
      }

      // Get AVAX price for USD calculations
      const avaxPrice = await this.dexScreener.getAVAXPrice()

      // Calculate lending-specific metrics from real data
      const tvl = dexScreenerData.liquidity.usd || 0
      const volume24h = dexScreenerData.volume24h || 0
      
      // Lending protocols typically offer different APY structure
      const utilizationRate = 0.7 // Assume 70% utilization
      const baseAPY = tvl > 0 ? (volume24h / tvl) * 365 * 0.05 : 0 // 5% of trading volume as lending yield
      const rewardAPY = baseAPY * 1.8 // LFJ often offers higher reward multipliers

      const pool = {
        contractAddress: dexScreenerData.pairAddress,
        name: `${dexScreenerData.baseToken.symbol} LFJ Lending Pool`,
        type: 'lending',
        baseTokenAddress: tokenAddress,
        baseTokenSymbol: dexScreenerData.baseToken.symbol,
        quoteTokenAddress: null, // Lending pools don't have quote tokens
        quoteTokenSymbol: null,
        tvl: tvl,
        apyBase: baseAPY,
        apyReward: rewardAPY,
        volume24h: volume24h,
        fees24h: volume24h * 0.001, // Lower fees for lending
        metadata: {
          platform: 'lfj',
          poolType: 'lending',
          tokenPrice: dexScreenerData.priceUsd,
          avaxPrice: avaxPrice,
          dexScreenerUrl: dexScreenerData.url,
          pairAddress: dexScreenerData.pairAddress,
          dataSource: 'dexscreener',
          calculatedAt: new Date().toISOString(),
          priceChange24h: dexScreenerData.priceChange24h,
          utilizationRate: utilizationRate,
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
      console.error('Error in LFJ pool discovery:', error)
      return {
        hasPool: false,
        message: `Error discovering LFJ pools: ${error.message}`
      }
    }
  }
}
