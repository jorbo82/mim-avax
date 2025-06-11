
import { DataSourceDebugger } from './DataSourceDebugger.ts'

export class EnhancedDexScreenerService {
  private baseUrl = 'https://api.dexscreener.com/latest/dex'
  private debugger: DataSourceDebugger

  constructor(debugger: DataSourceDebugger) {
    this.debugger = debugger
  }
  
  async searchTokenPairs(tokenAddress: string, targetDex?: string) {
    this.debugger.log('DEXSCREENER', 'SEARCH_START', { tokenAddress, targetDex })
    
    try {
      const response = await fetch(`${this.baseUrl}/search/?q=${tokenAddress}`)
      
      if (!response.ok) {
        throw new Error(`DexScreener API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.pairs || data.pairs.length === 0) {
        this.debugger.log('DEXSCREENER', 'NO_PAIRS_FOUND', { tokenAddress })
        return null
      }
      
      // Filter for Avalanche pairs only
      const avalanchePairs = data.pairs.filter((pair: any) => 
        pair.chainId === 'avalanche' || pair.chainId === 'avax'
      )
      
      this.debugger.log('DEXSCREENER', 'AVALANCHE_PAIRS_FOUND', {
        total: data.pairs.length,
        avalanche: avalanchePairs.length,
        dexes: [...new Set(avalanchePairs.map((p: any) => p.dexId))]
      })
      
      // Filter by target DEX if specified
      let filteredPairs = avalanchePairs
      if (targetDex) {
        filteredPairs = avalanchePairs.filter((pair: any) => 
          pair.dexId.toLowerCase().includes(targetDex.toLowerCase())
        )
        
        this.debugger.log('DEXSCREENER', 'DEX_FILTERED', {
          targetDex,
          beforeFilter: avalanchePairs.length,
          afterFilter: filteredPairs.length,
          foundDexes: [...new Set(filteredPairs.map((p: any) => p.dexId))]
        })
      }
      
      if (filteredPairs.length === 0) {
        this.debugger.log('DEXSCREENER', 'NO_MATCHING_DEX_PAIRS', { targetDex })
        return null
      }
      
      // Return the pair with highest liquidity for the target DEX
      const bestPair = filteredPairs.reduce((best: any, current: any) => {
        const currentLiquidity = parseFloat(current.liquidity?.usd || '0')
        const bestLiquidity = parseFloat(best.liquidity?.usd || '0')
        return currentLiquidity > bestLiquidity ? current : best
      })
      
      const result = {
        pairAddress: bestPair.pairAddress,
        dexId: bestPair.dexId,
        priceUsd: parseFloat(bestPair.priceUsd || '0'),
        priceNative: parseFloat(bestPair.priceNative || '0'),
        liquidity: {
          usd: parseFloat(bestPair.liquidity?.usd || '0'),
          base: parseFloat(bestPair.liquidity?.base || '0'),
          quote: parseFloat(bestPair.liquidity?.quote || '0')
        },
        volume24h: parseFloat(bestPair.volume?.h24 || '0'),
        priceChange24h: parseFloat(bestPair.priceChange?.h24 || '0'),
        baseToken: bestPair.baseToken,
        quoteToken: bestPair.quoteToken,
        url: bestPair.url,
        metadata: {
          actualDex: bestPair.dexId,
          requestedDex: targetDex,
          isTargetDex: targetDex ? bestPair.dexId.toLowerCase().includes(targetDex.toLowerCase()) : true,
          totalAvailablePairs: avalanchePairs.length,
          selectedReason: 'highest_liquidity'
        }
      }
      
      this.debugger.log('DEXSCREENER', 'BEST_PAIR_SELECTED', result)
      return result
      
    } catch (error) {
      this.debugger.log('DEXSCREENER', 'API_ERROR', { error: error.message, tokenAddress })
      return null
    }
  }
  
  async getAVAXPrice(): Promise<number> {
    try {
      const wavaxAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
      const pairData = await this.searchTokenPairs(wavaxAddress)
      
      if (pairData && pairData.priceUsd > 0) {
        this.debugger.log('DEXSCREENER', 'AVAX_PRICE_SUCCESS', { price: pairData.priceUsd })
        return pairData.priceUsd
      }
      
      this.debugger.log('DEXSCREENER', 'AVAX_PRICE_FALLBACK', { fallbackPrice: 35 })
      return 35
    } catch (error) {
      this.debugger.log('DEXSCREENER', 'AVAX_PRICE_ERROR', { error: error.message })
      return 35
    }
  }
}
