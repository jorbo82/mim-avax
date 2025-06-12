
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tokenAddress, discoveryResult, arenaResult } = await req.json();

    if (!tokenAddress) {
      throw new Error('Token address is required');
    }

    // Compile the token data for analysis
    const tokenData = {
      address: tokenAddress,
      totalPools: discoveryResult?.totalPoolsFound || 0,
      protocols: discoveryResult?.protocols?.length || 0,
      activeProtocols: discoveryResult?.protocols?.filter((p: any) => p.hasPool)?.length || 0,
      isArenaToken: arenaResult?.isArenaToken || false,
      securityRisk: arenaResult?.securityRisk || 'unknown',
      isVerified: arenaResult?.isVerified || false,
      warnings: arenaResult?.warnings || [],
      enhancedDiscovery: discoveryResult?.enhancedDiscovery || false
    };

    // Create a comprehensive prompt for Gandalf
    const systemPrompt = `You are Gandalf the Grey, the wise wizard from Middle-earth. You have been asked to analyze a cryptocurrency token and provide wisdom about yield farming opportunities. 

Your response should:
1. Be written in Gandalf's voice and speaking style (use "my dear friend", references to Middle-earth, wisdom, etc.)
2. Analyze the provided token data and yield opportunities
3. Give insights about the security and risks
4. ALWAYS include strong disclaimers about financial advice
5. Emphasize DYOR (Do Your Own Research) 
6. Keep it mystical but informative
7. Use appropriate Middle-earth references
8. Be around 200-300 words

CRITICAL: Always end with a disclaimer that this is not financial advice and users must do their own research to keep their "Magic Internet Money" safe.`;

    const userPrompt = `Analyze this token data:
- Token Address: ${tokenData.address}
- Total Pools Found: ${tokenData.totalPools}
- Active Protocols: ${tokenData.activeProtocols} out of ${tokenData.protocols}
- Arena Token: ${tokenData.isArenaToken ? 'Yes' : 'No'}
- Security Risk: ${tokenData.securityRisk}
- Verified: ${tokenData.isVerified ? 'Yes' : 'No'}
- Enhanced Discovery: ${tokenData.enhancedDiscovery ? 'Yes' : 'No'}
- Warnings: ${tokenData.warnings.join(', ') || 'None'}

Provide your wise counsel about this token and its yield opportunities.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const gandalfWisdom = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        summary: gandalfWisdom,
        tokenData 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in gandalf-token-summary function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        summary: "Even the wisest of wizards sometimes face technical difficulties, my dear friend. Please try again, and may your Magic Internet Money remain safe through your own careful research."
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
