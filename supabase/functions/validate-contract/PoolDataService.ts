import { DexScreenerService } from './DexScreenerService.ts'

export class PoolDataService {
  private dexScreener: DexScreenerService

  constructor() {
    this.dexScreener = new DexScreenerService()
  }

  private pairFactoryABI = [
    'function getPair(address tokenA, address tokenB) view returns (address)',
    'function allPairs(uint256) view returns (address)',
    'function allPairsLength() view returns (uint256)'
  ]

  private pairABI = [
    'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
    'function totalSupply() view returns (uint256)',
    'function token0() view returns (address)',
    'function token1() view returns (address)'
  ]

  private erc20ABI = [
    'function balanceOf(address) view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function decimals() view returns (uint8)'
  ]

  // Common DEX factory addresses on Avalanche
  private dexFactories = [
    '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10', // Trader Joe V1
    '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // Trader Joe V2
    '0xefa94DE7a203D8C5E2cE98e0EC4A1f0dB2e0f2A0'  // Pangolin
  ]

  private rpcUrls = [
    'https://api.avax.network/ext/bc/C/rpc',
    'https://avalanche-c-chain.publicnode.com',
    'https://rpc.ankr.com/avalanche'
  ]

  async getPoolData(erc314Address: string, wrapperAddress: string) {
    console.log(`Getting pool data for ERC314: ${erc314Address}, Wrapper: ${wrapperAddress}`)

    // First try to find liquidity via on-chain DEX contracts
    let onChainResult = null
    for (const rpcUrl of this.rpcUrls) {
      try {
        onChainResult = await this.findLiquidityPools(erc314Address, rpcUrl)
        if (onChainResult.hasLiquidityData) {
          console.log(`Found on-chain liquidity: ${onChainResult.lpContract}`)
          break
        }
      } catch (error) {
        console.error(`RPC ${rpcUrl} failed for pool data:`, error)
        continue
      }
    }

    // If no on-chain pools found, try DexScreener for the ERC20 token
    if (!onChainResult?.hasLiquidityData) {
      console.log('No on-chain LP found, checking DexScreener for ERC20 token')
      const dexScreenerData = await this.dexScreener.searchTokenPairs(wrapperAddress)
      
      if (dexScreenerData) {
        return {
          lpContract: dexScreenerData.pairAddress,
          reserves: {
            token0: dexScreenerData.liquidity.base.toString(),
            token1: dexScreenerData.liquidity.quote.toString()
          },
          totalSupply: '0', // Not available from DexScreener
          volume24h: dexScreenerData.volume24h.toString(),
          fees24h: (dexScreenerData.volume24h * 0.003).toString(), // Estimate 0.3% fee
          hasLiquidityData: true,
          dataSource: 'dexscreener',
          dexScreenerUrl: dexScreenerData.url,
          token0Address: dexScreenerData.baseToken.address,
          token1Address: dexScreenerData.quoteToken.address
        }
      }
    }

    // Return on-chain result or default
    return onChainResult || {
      lpContract: null,
      reserves: { token0: '0', token1: '0' },
      totalSupply: '0',
      volume24h: '0',
      fees24h: '0',
      hasLiquidityData: false,
      dataSource: 'none'
    }
  }

  private async findLiquidityPools(erc314Address: string, rpcUrl: string) {
    try {
      // Dynamic import of ethers
      const { ethers } = await import('https://esm.sh/ethers@6.13.0')
      
      const provider = new ethers.JsonRpcProvider(rpcUrl)
      const wavaxAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7' // WAVAX

      // Try to find liquidity pools for the ERC314 token
      for (const factoryAddress of this.dexFactories) {
        try {
          const factoryContract = new ethers.Contract(factoryAddress, this.pairFactoryABI, provider)
          
          // Check for ERC314/WAVAX pair
          const pairAddress = await factoryContract.getPair(erc314Address, wavaxAddress)
          
          if (pairAddress !== '0x0000000000000000000000000000000000000000') {
            console.log(`Found LP pair at ${pairAddress}`)
            
            // Get pair contract
            const pairContract = new ethers.Contract(pairAddress, this.pairABI, provider)
            
            // Get reserves and other data
            const [reserves, totalSupply, token0, token1] = await Promise.all([
              pairContract.getReserves(),
              pairContract.totalSupply(),
              pairContract.token0(),
              pairContract.token1()
            ])
            
            return {
              lpContract: pairAddress,
              reserves: {
                token0: reserves.reserve0.toString(),
                token1: reserves.reserve1.toString()
              },
              totalSupply: totalSupply.toString(),
              volume24h: '0', // Would need additional API calls to get this
              fees24h: '0',   // Would need additional API calls to get this
              hasLiquidityData: true,
              token0Address: token0,
              token1Address: token1
            }
          }
        } catch (error) {
          console.log(`No pair found in factory ${factoryAddress}:`, error.message)
          continue
        }
      }
      
      return {
        lpContract: null,
        reserves: { token0: '0', token1: '0' },
        totalSupply: '0',
        volume24h: '0',
        fees24h: '0',
        hasLiquidityData: false
      }
      
    } catch (error) {
      console.error(`Error finding liquidity pools:`, error)
      throw error
    }
  }
}
