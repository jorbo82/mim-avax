
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Zap, Shield, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TechnicalGuide = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast({
      title: "Copied to clipboard!",
      description: `${label} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const contractAddresses = [
    {
      protocol: "Pharaoh Exchange",
      contracts: [
        { name: "CL Factory", address: "0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42" },
        { name: "Position Manager", address: "0xAAA78E8C4241990B4ce159E105dA08129345946A" },
        { name: "Swap Router", address: "0xAAAE99091Fbb28D400029052821653C1C752483B" },
        { name: "PHAR Token", address: "0xAAAB9D12A30504559b0C5a9A5977fEE4A6081c6b" }
      ]
    },
    {
      protocol: "Trader Joe (LFJ)",
      contracts: [
        { name: "Joe Aggregator", address: "0x45A62B090DF48243F12A21897e7ed91863E2c86b" },
        { name: "Router Logic", address: "0xB35033d71cF5E13cAB5eB8618260F94363Dff9Cf" },
        { name: "JOE Token", address: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd" }
      ]
    }
  ];

  const codeExamples = [
    {
      title: "Query DefiLlama API",
      language: "JavaScript",
      code: `// Get all Avalanche yield farms
async function getAvalancheYieldFarms() {
  try {
    const response = await fetch('https://yields.llama.fi/pools');
    const data = await response.json();
    
    const avalanchePools = data.data.filter(
      pool => pool.chain === 'Avalanche'
    );
    
    return avalanchePools.map(pool => ({
      protocol: pool.project,
      symbol: pool.symbol,
      apy: pool.apy,
      tvlUsd: pool.tvlUsd,
      poolMeta: pool.poolMeta
    }));
  } catch (error) {
    console.error('Error fetching yield data:', error);
  }
}`
    },
    {
      title: "Web3 Contract Interaction",
      language: "JavaScript",
      code: `import { ethers } from 'ethers';

// Avalanche C-Chain RPC
const provider = new ethers.JsonRpcProvider(
  'https://api.avax.network/ext/bc/C/rpc'
);

// ERC20 ABI for basic token operations
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// Get pool information
async function getPoolData(poolAddress) {
  const contract = new ethers.Contract(
    poolAddress, 
    ERC20_ABI, 
    provider
  );
  
  const [totalSupply, decimals] = await Promise.all([
    contract.totalSupply(),
    contract.decimals()
  ]);
  
  return {
    totalSupply: ethers.formatUnits(totalSupply, decimals),
    decimals
  };
}`
    },
    {
      title: "Yield Calculation Helper",
      language: "JavaScript",
      code: `class YieldCalculator {
  // Calculate APY from daily rewards
  static calculateAPY(dailyRewards, principal) {
    const dailyRate = dailyRewards / principal;
    return Math.pow(1 + dailyRate, 365) - 1;
  }
  
  // Calculate impermanent loss
  static calculateImpermanentLoss(priceRatio) {
    return 2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1;
  }
  
  // Estimate farming returns
  static estimateReturns(principal, apy, days) {
    const dailyRate = apy / 365;
    return principal * Math.pow(1 + dailyRate, days);
  }
}`
    }
  ];

  return (
    <section className="relative z-10 container mx-auto px-4 pb-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-4 text-yellow-400 flex items-center justify-center gap-3">
          <Code className="w-8 h-8" />
          Technical Guide
          <Database className="w-8 h-8" />
        </h3>
        <p className="text-xl text-purple-300">Developer resources and smart contract addresses for Avalanche DeFi</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Contract Addresses */}
        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Smart Contract Addresses
          </h4>
          
          {contractAddresses.map((protocol, index) => (
            <Card key={index} className="bg-black/20 backdrop-blur-md border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-lg">{protocol.protocol}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {protocol.contracts.map((contract, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">{contract.name}</div>
                      <div className="text-sm text-purple-300 font-mono break-all">
                        {contract.address}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(contract.address, contract.name)}
                      className="ml-2 shrink-0"
                    >
                      {copiedCode === contract.name ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Examples */}
        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Code Examples
          </h4>
          
          {codeExamples.map((example, index) => (
            <Card key={index} className="bg-black/20 backdrop-blur-md border-purple-500/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-yellow-400 text-lg">{example.title}</CardTitle>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {example.language}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm border border-purple-500/20">
                    <code className="text-green-300">{example.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(example.code, example.title)}
                    className="absolute top-2 right-2"
                  >
                    {copiedCode === example.title ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold text-yellow-400 text-center mb-6">Additional Resources</h4>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 text-center">
            <CardContent className="p-6">
              <Database className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h5 className="font-bold text-white mb-2">DefiLlama API</h5>
              <p className="text-purple-300 text-sm mb-4">Comprehensive DeFi data aggregation</p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://docs.llama.fi/api', '_blank')}
              >
                View Docs <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 text-center">
            <CardContent className="p-6">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h5 className="font-bold text-white mb-2">Snowtrace</h5>
              <p className="text-purple-300 text-sm mb-4">Avalanche block explorer</p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://snowtrace.io', '_blank')}
              >
                Explore <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 text-center">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h5 className="font-bold text-white mb-2">Avalanche Docs</h5>
              <p className="text-purple-300 text-sm mb-4">Official developer documentation</p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://docs.avax.network', '_blank')}
              >
                Learn More <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnicalGuide;
