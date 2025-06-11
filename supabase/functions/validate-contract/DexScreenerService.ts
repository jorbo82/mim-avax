
export class DexScreenerService {
  private baseUrl = 'https://api.dexscreener.com/latest/dex'
  
  async searchTokenPairs(tokenAddress: string) {
    console.log(`DexScreener: Searching pairs for token ${tokenAddress}`)
    
    try {
      const response = await fetch(`${this.baseUrl}/search/?q=${tokenAddress}`)
      
      if (!response.ok) {
        throw new Error(`DexScreener API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.pairs || data.pairs.length === 0) {
        console.log(`No pairs found on DexScreener for ${tokenAddress}`)
        return null
      }
      
      // Filter for Avalanche pairs only
      const avalanchePairs = data.pairs.filter((pair: any) => 
        pair.chainId === 'avalanche' || pair.chainId === 'avax'
      )
      
      if (avalanchePairs.length === 0) {
        console.log(`No Avalanche pairs found on DexScreener for ${tokenAddress}`)
        return null
      }
      
      // Return the pair with highest liquidity
      const bestPair = avalanchePairs.reduce((best: any, current: any) => {
        const currentLiquidity = parseFloat(current.liquidity?.usd || '0')
        const bestLiquidity = parseFloat(best.liquidity?.usd || '0')
        return currentLiquidity > bestLiquidity ? current : best
      })
      
      console.log(`Found best pair: ${bestPair.pairAddress} with $${bestPair.liquidity?.usd} liquidity`)
      
      return {
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
        url: bestPair.url
      }
    } catch (error) {
      console.error('DexScreener API error:', error)
      return null
    }
  }
  
  async getAVAXPrice(): Promise<number> {
    try {
      // Get WAVAX price from a major pair
      const wavaxAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
      const pairData = await this.searchTokenPairs(wavaxAddress)
      
      if (pairData && pairData.priceUsd > 0) {
        console.log(`AVAX price from DexScreener: $${pairData.priceUsd}`)
        return pairData.priceUsd
      }
      
      // Fallback to hardcoded price if API fails
      console.log('Using fallback AVAX price: $35')
      return 35
    } catch (error) {
      console.error('Error getting AVAX price:', error)
      return 35
    }
  }
}
