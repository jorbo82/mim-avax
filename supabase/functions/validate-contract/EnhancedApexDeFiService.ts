
import { ApexTokenRegistry } from './ApexTokenRegistry.ts'
import { PoolDataService } from './PoolDataService.ts'
import { MetricsCalculator } from './MetricsCalculator.ts'
import { WrapperMappingService } from './WrapperMappingService.ts'

export class EnhancedApexDeFiService {
  private supabase: any
  private poolData: PoolDataService
  private metricsCalculator: MetricsCalculator
  private fallbackWrapperMapping: WrapperMappingService

  constructor(supabase: any) {
    this.supabase = supabase
    this.poolData = new PoolDataService()
    this.metricsCalculator = new MetricsCalculator()
    this.fallbackWrapperMapping = new WrapperMappingService()
  }

  async findPools(tokenAddress: string) {
    console.log(`Enhanced Apex DeFi: Finding pools for ${tokenAddress}`)

    try {
      // Fast path: Check registry first
      const registryResult = await this.checkRegistryForToken(tokenAddress)
      if (registryResult.hasPool) {
        console.log('Found token in registry - fast path')
        return registryResult
      }

      // Fallback: Use original RPC-based discovery for unknown tokens
      console.log('Token not in registry - using RPC fallback')
      return await this.fallbackDiscovery(tokenAddress)

    } catch (error) {
      console.error('Error in Enhanced Apex DeFi pool discovery:', error)
      return {
        hasPool: false,
        message: `Error discovering Apex DeFi pools: ${error.message}`
      }
    }
  }

  private async checkRegistryForToken(tokenAddress: string) {
    const token = ApexTokenRegistry.getTokenByAddress(tokenAddress)
    
    if (!token) {
      return { hasPool: false }
    }

    console.log(`Found token in registry: ${token.symbol} (${token.name})`)

    if (token.type === 'native') {
      // Native ERC314 token - already on Apex
      return this.createNativeTokenPool(token)
    } else if (token.type === 'wrapped') {
      // Wrapped token - get enhanced pool data
      return this.createWrappedTokenPool(token)
    }

    return { hasPool: false }
  }

  private async createNativeTokenPool(token: any) {
    // Get enhanced metrics for native tokens
    const poolData = await this.poolData.getPoolData(token.address, null)
    const metrics = await this.metricsCalculator.calculateMetrics(poolData, {
      tokenSymbol: token.symbol,
      tokenName: token.name,
      erc314Address: token.address
    })

    const pool = {
      contractAddress: token.address,
      name: `${token.symbol}/AVAX Native Pool`,
      type: 'native',
      baseTokenAddress: null,
      baseTokenSymbol: null,
      quoteTokenAddress: token.address,
      quoteTokenSymbol: token.symbol,
      tvl: metrics.tvl,
      apyBase: metrics.baseAPY,
      apyReward: metrics.rewardAPY,
      volume24h: metrics.volume24h,
      fees24h: metrics.fees24h,
      metadata: {
        tokenType: 'native',
        erc314Address: token.address,
        tokenInfo: {
          name: token.name,
          symbol: token.symbol,
          logoURI: token.logoURI,
          tags: token.tags
        },
        registrySource: true,
        hasLiquidityData: poolData.hasLiquidityData,
        dataSource: metrics.dataSource,
        tokenPrice: metrics.tokenPrice,
        avaxPrice: metrics.avaxPrice,
        dexScreenerUrl: metrics.dexScreenerUrl,
        calculatedAt: metrics.calculatedAt
      }
    }

    return {
      hasPool: true,
      pools: [pool]
    }
  }

  private async createWrappedTokenPool(token: any) {
    if (!token.wrapperAddress || !token.underlyingToken) {
      return { hasPool: false, message: 'Invalid wrapped token data' }
    }

    // Get enhanced pool data with known addresses
    const poolData = await this.poolData.getPoolData(token.address, token.wrapperAddress)
    const metrics = await this.metricsCalculator.calculateMetrics(poolData, {
      tokenSymbol: token.underlyingToken.symbol,
      tokenName: token.underlyingToken.name,
      erc314Address: token.address,
      wrapperAddress: token.wrapperAddress
    })

    const pool = {
      contractAddress: token.wrapperAddress,
      name: `${token.underlyingToken.symbol}/AVAX Enhanced Pool`,
      type: 'wrapper',
      baseTokenAddress: token.underlyingToken.address,
      baseTokenSymbol: token.underlyingToken.symbol,
      quoteTokenAddress: token.address,
      quoteTokenSymbol: token.symbol,
      tvl: metrics.tvl,
      apyBase: metrics.baseAPY,
      apyReward: metrics.rewardAPY,
      volume24h: metrics.volume24h,
      fees24h: metrics.fees24h,
      metadata: {
        tokenType: 'wrapped',
        erc314Address: token.address,
        wrapperAddress: token.wrapperAddress,
        lpContract: poolData.lpContract,
        tokenInfo: {
          name: token.underlyingToken.name,
          symbol: token.underlyingToken.symbol,
          logoURI: token.logoURI,
          tags: token.tags
        },
        registrySource: true,
        hasLiquidityData: poolData.hasLiquidityData,
        dataSource: metrics.dataSource,
        tokenPrice: metrics.tokenPrice,
        avaxPrice: metrics.avaxPrice,
        dexScreenerUrl: metrics.dexScreenerUrl,
        calculatedAt: metrics.calculatedAt
      }
    }

    return {
      hasPool: true,
      pools: [pool]
    }
  }

  private async fallbackDiscovery(tokenAddress: string) {
    console.log('Using fallback RPC-based discovery')
    
    // Use the original wrapper mapping service for unknown tokens
    const wrapperInfo = await this.fallbackWrapperMapping.findWrapper(tokenAddress)
    
    if (!wrapperInfo.hasWrapper) {
      return {
        hasPool: false,
        message: 'No Apex DeFi wrapper found for this token (not in registry)'
      }
    }

    console.log(`Fallback discovery found wrapper: ${wrapperInfo.wrapperAddress}`)

    // Get pool data and metrics using original approach
    const poolData = await this.poolData.getPoolData(wrapperInfo.erc314Address, wrapperInfo.wrapperAddress)
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
        tokenType: 'wrapper',
        erc314Address: wrapperInfo.erc314Address,
        wrapperAddress: wrapperInfo.wrapperAddress,
        lpContract: poolData.lpContract,
        tokenInfo: {
          name: wrapperInfo.tokenName,
          symbol: wrapperInfo.tokenSymbol
        },
        registrySource: false,
        hasLiquidityData: poolData.hasLiquidityData,
        dataSource: metrics.dataSource,
        tokenPrice: metrics.tokenPrice,
        avaxPrice: metrics.avaxPrice,
        dexScreenerUrl: metrics.dexScreenerUrl,
        calculatedAt: metrics.calculatedAt
      }
    }

    return {
      hasPool: true,
      pools: [pool]
    }
  }

  // Additional utility methods for enhanced functionality
  async getAllKnownPools() {
    const allTokens = ApexTokenRegistry.getAllTokens()
    const pools = []

    for (const token of allTokens) {
      try {
        const result = await this.checkRegistryForToken(token.address)
        if (result.hasPool && result.pools) {
          pools.push(...result.pools)
        }
      } catch (error) {
        console.error(`Error processing token ${token.symbol}:`, error)
      }
    }

    return pools
  }

  getBluechipTokens() {
    return ApexTokenRegistry.getBluechipTokens()
  }

  searchTokensBySymbol(symbol: string) {
    return ApexTokenRegistry.findTokensBySymbol(symbol)
  }
}
