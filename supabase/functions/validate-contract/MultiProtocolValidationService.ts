import { EnhancedApexDeFiService } from './EnhancedApexDeFiService.ts'
import { PharaohService } from './PharaohService.ts'
import { ArenaService } from './ArenaService.ts'
import { BenqiService } from './BenqiService.ts'

export class MultiProtocolValidationService {
  private supabase: any
  private services: { [key: string]: any }

  constructor(supabase: any) {
    this.supabase = supabase
    this.services = {
      'apex-defi': new EnhancedApexDeFiService(supabase),
      'pharaoh': new PharaohService(supabase),
      'arena': new ArenaService(supabase),
      'benqi': new BenqiService(supabase)
    }
  }

  async discoverPools(tokenAddress: string, protocolSlugs: string[]) {
    console.log(`Enhanced discovery for token: ${tokenAddress} across protocols: ${protocolSlugs.join(', ')}`)

    // Record discovery request
    await this.recordDiscoveryRequest(tokenAddress, protocolSlugs)

    const results = []
    let totalPoolsFound = 0

    for (const protocolSlug of protocolSlugs) {
      const service = this.services[protocolSlug]
      if (!service) {
        console.warn(`No service found for protocol: ${protocolSlug}`)
        continue
      }

      try {
        console.log(`Checking ${protocolSlug} for token ${tokenAddress}`)
        const protocolResult = await service.findPools(tokenAddress)
        
        if (protocolResult.pools && protocolResult.pools.length > 0) {
          totalPoolsFound += protocolResult.pools.length
          
          // Store pools in database with enhanced metadata
          for (const pool of protocolResult.pools) {
            await this.storePoolData(protocolSlug, pool)
          }
        }

        results.push({
          protocol: protocolSlug,
          ...protocolResult
        })
      } catch (error) {
        console.error(`Error checking ${protocolSlug}:`, error)
        results.push({
          protocol: protocolSlug,
          hasPool: false,
          error: error.message
        })
      }
    }

    // Update discovery request with results
    await this.updateDiscoveryRequest(tokenAddress, totalPoolsFound > 0 ? 'success' : 'no_pools', results, totalPoolsFound)

    return {
      tokenAddress,
      totalPoolsFound,
      protocols: results,
      enhancedDiscovery: true
    }
  }

  private async storePoolData(protocolSlug: string, poolData: any) {
    // Get protocol ID
    const { data: protocol } = await this.supabase
      .from('protocols')
      .select('id')
      .eq('slug', protocolSlug)
      .single()

    if (!protocol) {
      throw new Error(`Protocol not found: ${protocolSlug}`)
    }

    const poolIdentifier = `${protocolSlug}-${poolData.contractAddress?.toLowerCase() || 'unknown'}`
    
    const poolRecord = {
      protocol_id: protocol.id,
      pool_identifier: poolIdentifier,
      pool_name: poolData.name || `${poolData.tokenSymbol || 'Token'} Pool`,
      pool_type: poolData.type || 'liquidity',
      contract_address: poolData.contractAddress,
      base_token_address: poolData.baseTokenAddress,
      base_token_symbol: poolData.baseTokenSymbol,
      quote_token_address: poolData.quoteTokenAddress,
      quote_token_symbol: poolData.quoteTokenSymbol,
      tvl_usd: poolData.tvl || 0,
      apy_base: poolData.apyBase || 0,
      apy_reward: poolData.apyReward || 0,
      volume_24h_usd: poolData.volume24h || 0,
      fees_24h_usd: poolData.fees24h || 0,
      pool_metadata: {
        ...poolData.metadata,
        enhancedDiscovery: true,
        lastUpdated: new Date().toISOString()
      },
      last_updated: new Date().toISOString()
    }

    const { error } = await this.supabase
      .from('yield_pools')
      .upsert(poolRecord, {
        onConflict: 'protocol_id,pool_identifier'
      })

    if (error) {
      console.error('Error storing enhanced pool data:', error)
      throw error
    }

    console.log(`Enhanced pool data stored for ${poolIdentifier}`)
  }

  private async recordDiscoveryRequest(tokenAddress: string, protocols: string[]) {
    const { error } = await this.supabase
      .from('pool_discovery_requests')
      .insert({
        user_id: null,
        contract_address: tokenAddress,
        discovery_method: 'enhanced_multi_protocol_scan',
        validation_status: 'pending',
        validation_data: { protocols, enhancedRegistry: true }
      })

    if (error) {
      console.error('Error recording enhanced discovery request:', error)
    }
  }

  private async updateDiscoveryRequest(tokenAddress: string, status: string, results: any[], poolsFound: number) {
    const { error } = await this.supabase
      .from('pool_discovery_requests')
      .update({
        validation_status: status,
        validation_data: { 
          results, 
          enhancedDiscovery: true,
          performanceImprovement: true
        },
        pools_discovered: poolsFound
      })
      .eq('contract_address', tokenAddress)
      .eq('validation_status', 'pending')

    if (error) {
      console.error('Error updating enhanced discovery request:', error)
    }
  }

  // New methods for enhanced functionality
  async getApexBluechipPools() {
    const apexService = this.services['apex-defi'] as EnhancedApexDeFiService
    const bluechipTokens = apexService.getBluechipTokens()
    
    const pools = []
    for (const token of bluechipTokens) {
      try {
        const result = await apexService.findPools(token.address)
        if (result.hasPool && result.pools) {
          pools.push(...result.pools)
        }
      } catch (error) {
        console.error(`Error getting bluechip pool for ${token.symbol}:`, error)
      }
    }
    
    return pools
  }

  async searchApexTokens(symbol: string) {
    const apexService = this.services['apex-defi'] as EnhancedApexDeFiService
    return apexService.searchTokensBySymbol(symbol)
  }
}
