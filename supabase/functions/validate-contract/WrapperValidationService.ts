
import { WrapperMappingService } from './WrapperMappingService.ts'
import { PoolDataService } from './PoolDataService.ts'
import { MetricsCalculator } from './MetricsCalculator.ts'

export class WrapperValidationService {
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

  async validateContract(contractAddress: string, checkWrapper: boolean = false) {
    console.log(`Validating contract: ${contractAddress}, checkWrapper: ${checkWrapper}`)

    try {
      // Record discovery request
      const userId = null // Server-side validation, no user context
      await this.recordDiscoveryRequest(contractAddress, userId)

      if (checkWrapper) {
        return await this.performWrapperValidation(contractAddress)
      } else {
        return await this.performBasicValidation(contractAddress)
      }
    } catch (error) {
      console.error('Validation failed:', error)
      await this.updateDiscoveryRequest(contractAddress, 'failed', null, error.message)
      throw error
    }
  }

  private async performWrapperValidation(erc20Address: string) {
    console.log(`Performing wrapper validation for: ${erc20Address}`)

    // 1. Check if wrapper exists
    const wrapperInfo = await this.wrapperMapping.findWrapper(erc20Address)
    
    if (!wrapperInfo.hasWrapper) {
      await this.updateDiscoveryRequest(erc20Address, 'no_wrapper', { erc20Address })
      return {
        hasWrapper: false,
        erc20Address,
        message: 'No wrapper found for this ERC20 token'
      }
    }

    // 2. Get pool data
    const poolData = await this.poolData.getPoolData(wrapperInfo.erc314Address, wrapperInfo.wrapperAddress)
    
    // 3. Calculate metrics
    const metrics = await this.metricsCalculator.calculateMetrics(poolData)

    // 4. Store in database
    await this.storePoolData({
      ...wrapperInfo,
      ...poolData,
      ...metrics,
      erc20Address
    })

    await this.updateDiscoveryRequest(erc20Address, 'validated', {
      erc20Address,
      wrapperAddress: wrapperInfo.wrapperAddress,
      erc314Address: wrapperInfo.erc314Address,
      poolData: poolData
    })

    return {
      hasWrapper: true,
      erc20Address,
      wrapperAddress: wrapperInfo.wrapperAddress,
      erc314Address: wrapperInfo.erc314Address,
      poolData,
      metrics
    }
  }

  private async performBasicValidation(contractAddress: string) {
    // Basic contract validation logic
    return {
      isValid: true,
      contractAddress,
      message: 'Contract validated successfully'
    }
  }

  private async storePoolData(data: any) {
    // Get Apex DeFi protocol ID
    const { data: protocol } = await this.supabase
      .from('protocols')
      .select('id')
      .eq('slug', 'apex-defi')
      .single()

    if (!protocol) {
      throw new Error('Apex DeFi protocol not found')
    }

    const poolIdentifier = `apex-wrapper-${data.erc20Address.toLowerCase()}`
    
    const poolData = {
      protocol_id: protocol.id,
      pool_identifier: poolIdentifier,
      pool_name: `${data.tokenSymbol || 'Token'}/AVAX Enhanced Pool`,
      pool_type: 'wrapper',
      contract_address: data.wrapperAddress,
      base_token_address: data.erc20Address,
      base_token_symbol: data.tokenSymbol,
      quote_token_address: data.erc314Address,
      quote_token_symbol: `a${data.tokenSymbol}`,
      tvl_usd: data.metrics?.tvl || 0,
      apy_base: data.metrics?.baseAPY || 0,
      apy_reward: data.metrics?.rewardAPY || 0,
      volume_24h_usd: data.metrics?.volume24h || 0,
      fees_24h_usd: data.metrics?.fees24h || 0,
      pool_metadata: {
        erc314Address: data.erc314Address,
        wrapperAddress: data.wrapperAddress,
        lpContract: data.lpContract,
        tokenInfo: data.tokenInfo
      },
      last_updated: new Date().toISOString()
    }

    const { error } = await this.supabase
      .from('yield_pools')
      .upsert(poolData, {
        onConflict: 'protocol_id,pool_identifier'
      })

    if (error) {
      console.error('Error storing pool data:', error)
      throw error
    }

    console.log(`Pool data stored for ${poolIdentifier}`)
  }

  private async recordDiscoveryRequest(contractAddress: string, userId: string | null) {
    const { error } = await this.supabase
      .from('pool_discovery_requests')
      .insert({
        user_id: userId,
        contract_address: contractAddress,
        discovery_method: 'wrapper_check',
        validation_status: 'pending'
      })

    if (error) {
      console.error('Error recording discovery request:', error)
    }
  }

  private async updateDiscoveryRequest(contractAddress: string, status: string, validationData: any = null, errorMessage: string | null = null) {
    const { error } = await this.supabase
      .from('pool_discovery_requests')
      .update({
        validation_status: status,
        validation_data: validationData,
        error_message: errorMessage,
        pools_discovered: status === 'validated' ? 1 : 0
      })
      .eq('contract_address', contractAddress)
      .eq('validation_status', 'pending')

    if (error) {
      console.error('Error updating discovery request:', error)
    }
  }
}
