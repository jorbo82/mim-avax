
export class WrapperMappingService {
  private rpcUrls = [
    'https://api.avax.network/ext/bc/C/rpc',
    'https://avalanche-c-chain.publicnode.com',
    'https://rpc.ankr.com/avalanche'
  ]

  private routerAddress = '0x5d2dDA02280F55A9D4529eadFA45Ff032928082B'
  
  private routerABI = [
    'function wrapperFactory() view returns (address)'
  ]

  private wrapperFactoryABI = [
    'function hasWrappedToken(address erc20) view returns (bool)',
    'function erc20ToWrapper(address erc20) view returns (address)'
  ]

  private wrapperABI = [
    'function wrappedToken() view returns (address)',
    'function symbol() view returns (string)',
    'function name() view returns (string)'
  ]

  private erc20ABI = [
    'function symbol() view returns (string)',
    'function name() view returns (string)',
    'function decimals() view returns (uint8)'
  ]

  async findWrapper(erc20Address: string) {
    console.log(`Finding wrapper for ERC20: ${erc20Address}`)

    for (const rpcUrl of this.rpcUrls) {
      try {
        const result = await this.checkWrapperWithRPC(erc20Address, rpcUrl)
        if (result) return result
      } catch (error) {
        console.error(`RPC ${rpcUrl} failed:`, error)
        continue
      }
    }

    return { hasWrapper: false }
  }

  private async checkWrapperWithRPC(erc20Address: string, rpcUrl: string) {
    console.log(`Checking wrapper with RPC: ${rpcUrl}`)

    try {
      // Dynamic import of ethers
      const { ethers } = await import('https://esm.sh/ethers@6.13.0')
      
      // Create provider
      const provider = new ethers.JsonRpcProvider(rpcUrl)
      
      // Get router contract
      const routerContract = new ethers.Contract(this.routerAddress, this.routerABI, provider)
      
      // Get wrapper factory address
      const wrapperFactoryAddress = await routerContract.wrapperFactory()
      console.log(`Wrapper factory address: ${wrapperFactoryAddress}`)
      
      // Get wrapper factory contract
      const wrapperFactoryContract = new ethers.Contract(wrapperFactoryAddress, this.wrapperFactoryABI, provider)
      
      // Check if wrapper exists
      const hasWrapper = await wrapperFactoryContract.hasWrappedToken(erc20Address)
      
      if (!hasWrapper) {
        console.log(`No wrapper found for ${erc20Address}`)
        return null
      }
      
      // Get wrapper address
      const wrapperAddress = await wrapperFactoryContract.erc20ToWrapper(erc20Address)
      
      if (wrapperAddress === '0x0000000000000000000000000000000000000000') {
        console.log(`Wrapper address is zero for ${erc20Address}`)
        return null
      }
      
      console.log(`Found wrapper at ${wrapperAddress}`)
      
      // Get wrapper contract
      const wrapperContract = new ethers.Contract(wrapperAddress, this.wrapperABI, provider)
      
      // Get ERC314 address
      const erc314Address = await wrapperContract.wrappedToken()
      
      // Get token information
      const erc20Contract = new ethers.Contract(erc20Address, this.erc20ABI, provider)
      
      const [tokenSymbol, tokenName] = await Promise.all([
        erc20Contract.symbol(),
        erc20Contract.name()
      ])
      
      console.log(`Wrapper discovery successful: ${tokenSymbol} (${tokenName})`)
      
      return {
        hasWrapper: true,
        wrapperAddress,
        erc314Address,
        tokenSymbol,
        tokenName,
        erc20Address
      }
      
    } catch (error) {
      console.error(`Error checking wrapper with RPC ${rpcUrl}:`, error)
      return null
    }
  }
}
