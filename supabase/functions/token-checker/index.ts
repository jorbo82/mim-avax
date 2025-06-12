
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ARENA_DEPLOYER_ADDRESS = '0x84ee560527A0432D53C0F11248cA95714aD453E2'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { contractAddress } = await req.json()
    
    if (!contractAddress) {
      return new Response(
        JSON.stringify({ error: 'Contract address is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Checking token: ${contractAddress}`)

    // Get token creation details from Snowtrace
    const creationDetails = await getTokenCreationDetails(contractAddress)
    
    // Check if it's an Arena token
    const isArenaToken = creationDetails.creatorAddress?.toLowerCase() === ARENA_DEPLOYER_ADDRESS.toLowerCase()
    
    // Get additional security information
    const securityInfo = await getSecurityInfo(contractAddress)
    
    const result = {
      isArenaToken,
      creatorAddress: creationDetails.creatorAddress || 'Unknown',
      isVerified: creationDetails.isVerified || false,
      securityRisk: isArenaToken ? 'low' : securityInfo.riskLevel,
      warnings: isArenaToken ? [] : securityInfo.warnings,
      snowtraceUrl: `https://snowtrace.io/address/${contractAddress}`,
      dexScreenerUrl: securityInfo.dexScreenerUrl
    }

    console.log('Token check result:', result)

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Token checker error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function getTokenCreationDetails(contractAddress: string) {
  try {
    // Query Snowtrace API for contract creation details
    const apiKey = Deno.env.get('SNOWTRACE_API_KEY') || 'YourApiKeyToken'
    const url = `https://api.snowtrace.io/api?module=contract&action=getcontractcreation&contractaddresses=${contractAddress}&apikey=${apiKey}`
    
    console.log('Querying Snowtrace:', url)
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status === '1' && data.result && data.result.length > 0) {
      const creation = data.result[0]
      
      // Also check if contract is verified
      const verificationUrl = `https://api.snowtrace.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`
      const verificationResponse = await fetch(verificationUrl)
      const verificationData = await verificationResponse.json()
      
      const isVerified = verificationData.status === '1' && 
                        verificationData.result && 
                        verificationData.result[0] && 
                        verificationData.result[0].SourceCode !== ''
      
      return {
        creatorAddress: creation.contractCreator,
        isVerified
      }
    }
    
    return { creatorAddress: null, isVerified: false }
  } catch (error) {
    console.error('Error getting creation details:', error)
    return { creatorAddress: null, isVerified: false }
  }
}

async function getSecurityInfo(contractAddress: string) {
  try {
    const warnings: string[] = []
    let riskLevel: 'low' | 'medium' | 'high' = 'medium'
    let dexScreenerUrl = null
    
    // Check DexScreener for token information
    const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/search/?q=${contractAddress}`)
    const dexData = await dexResponse.json()
    
    if (dexData.pairs && dexData.pairs.length > 0) {
      const avalanchePairs = dexData.pairs.filter((pair: any) => 
        pair.chainId === 'avalanche' || pair.chainId === 'avax'
      )
      
      if (avalanchePairs.length > 0) {
        const bestPair = avalanchePairs[0]
        dexScreenerUrl = bestPair.url
        
        // Check for potential red flags
        const liquidity = parseFloat(bestPair.liquidity?.usd || '0')
        const volume24h = parseFloat(bestPair.volume?.h24 || '0')
        
        if (liquidity < 1000) {
          warnings.push('Very low liquidity detected')
          riskLevel = 'high'
        } else if (liquidity < 10000) {
          warnings.push('Low liquidity - exercise caution')
          riskLevel = 'medium'
        }
        
        if (volume24h === 0) {
          warnings.push('No trading volume in last 24h')
          riskLevel = 'high'
        }
        
        // Check for potential honeypot indicators
        if (bestPair.priceChange?.h24 && Math.abs(bestPair.priceChange.h24) > 90) {
          warnings.push('Extreme price volatility detected')
          riskLevel = 'high'
        }
      } else {
        warnings.push('No Avalanche trading pairs found')
        riskLevel = 'high'
      }
    } else {
      warnings.push('Token not found on DexScreener')
      riskLevel = 'high'
    }
    
    // If no major warnings, set risk to low
    if (warnings.length === 0) {
      riskLevel = 'low'
    }
    
    return {
      riskLevel,
      warnings,
      dexScreenerUrl
    }
  } catch (error) {
    console.error('Error getting security info:', error)
    return {
      riskLevel: 'high' as const,
      warnings: ['Unable to verify security information'],
      dexScreenerUrl: null
    }
  }
}
