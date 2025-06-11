
import { WrapperMappingService } from './WrapperMappingService.ts'
import { PoolDataService } from './PoolDataService.ts'
import { MetricsCalculator } from './MetricsCalculator.ts'

export class ApexDeFiService {
  private supabase: any
  private wrapperMapping: WrapperMappingService
  private poolData: PoolDataService
  private metricsCalculator: MetricsCalculator

  constructor(supabase: any) {
    this.supabase = supabase
    this.wrapperMapping = new WrapperMappingService()
    this.poolData = new PoolDataService()
    this.metricsCalculator = new MetricsCalculator()
  }

  async findPools(tokenAddress: string) {
    console.log(`ApexDeFi: Finding pools for ${tokenAddress}`)

    try {
      // Check for wrapper existence using real contract calls
      const wrapperInfo = await this.wrapperMapping.findWrapper(tokenAddress)
      
      if (!wrapperInfo.hasWrapper) {
        return {
          hasPool: false,
          message: 'No Apex DeFi wrapper found for this token'
        }
      }

      console.log(`Wrapper found: ${wrapperInfo.wrapperAddress} -> ${wrapperInfo.erc314Address}`)

      // Get real pool data
      const poolData = await this.poolData.getPoolData(wrapperInfo.erc314Address, wrapperInfo.wrapperAddress)
      
      // Calculate real metrics
      const metrics = await this.metricsCalculator.calculateMetrics(poolData, wrapperInfo)

      const pool = {
        contractAddress: wrapperInfo.wrapperAddress,
        name: `${wrapperInfo.tokenSymbol || 'Token'}/AVAX Enhanced Pool`,
        type: 'wrapper',
        baseTokenAddress: tokenAddress,
        baseTokenSymbol: wrapperInfo.tokenSymbol,
        quoteTokenAddress: wrapperInfo.erc314Address,
        quoteTokenSymbol: `a${wrapperInfo.tokenSymbol}`,
        tvl: metrics.tvl,
        apyBase: metrics.baseAPY,
        apyReward: metrics.rewardAPY,
        volume24h: metrics.volume24h,
        fees24h: metrics.fees24h,
        metadata: {
          erc314Address: wrapperInfo.erc314Address,
          wrapperAddress: wrapperInfo.wrapperAddress,
          lpContract: poolData.lpContract,
          tokenInfo: {
            name: wrapperInfo.tokenName,
            symbol: wrapperInfo.tokenSymbol
          },
          hasLiquidityData: poolData.hasLiquidityData
        }
      }

      return {
        hasPool: true,
        pools: [pool]
      }
      
    } catch (error) {
      console.error('Error in ApexDeFi pool discovery:', error)
      return {
        hasPool: false,
        message: `Error discovering Apex DeFi pools: ${error.message}`
      }
    }
  }
}
