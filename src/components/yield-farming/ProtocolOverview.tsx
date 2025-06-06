
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, TrendingUp, Shield } from "lucide-react";

interface ProtocolOverviewProps {
  selectedProtocol: string | null;
  onProtocolSelect: (protocol: string) => void;
}

const ProtocolOverview = ({ selectedProtocol, onProtocolSelect }: ProtocolOverviewProps) => {
  const protocols = [
    {
      id: "pharaoh",
      name: "Pharaoh Exchange",
      logo: "🏺",
      description: "Next-generation concentrated liquidity DEX on Avalanche with innovative yield farming mechanisms",
      tvl: "$150M+",
      apy: "25-80%",
      features: ["Concentrated Liquidity", "Yield Farming", "Low Fees", "High Capital Efficiency"],
      website: "https://pharaoh.exchange",
      contracts: {
        factory: "0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42",
        router: "0xAAAE99091Fbb28D400029052821653C1C752483B",
        token: "0xAAAB9D12A30504559b0C5a9A5977fEE4A6081c6b"
      }
    },
    {
      id: "traderjoe",
      name: "Trader Joe (LFJ)",
      logo: "☕",
      description: "The leading DEX on Avalanche with innovative liquidity book technology and diverse farming pools",
      tvl: "$500M+",
      apy: "15-60%",
      features: ["Liquidity Book", "Zero Slippage", "Auto-Compounding", "Stable Farms"],
      website: "https://traderjoexyz.com",
      contracts: {
        aggregator: "0x45A62B090DF48243F12A21897e7ed91863E2c86b",
        router: "0xB35033d71cF5E13cAB5eB8618260F94363Dff9Cf",
        token: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd"
      }
    }
  ];

  return (
    <section className="relative z-10 container mx-auto px-4 pb-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-4 text-yellow-400 flex items-center justify-center gap-3">
          <Shield className="w-8 h-8" />
          Protocol Overview
          <TrendingUp className="w-8 h-8" />
        </h3>
        <p className="text-xl text-purple-300">Explore the top DeFi protocols on Avalanche</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {protocols.map((protocol) => (
          <Card 
            key={protocol.id}
            className={`bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              selectedProtocol === protocol.id ? 'ring-2 ring-yellow-400 border-yellow-400' : ''
            }`}
            onClick={() => onProtocolSelect(protocol.id)}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">{protocol.logo}</div>
              <CardTitle className="text-yellow-400 text-2xl">{protocol.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-purple-300 text-sm leading-relaxed">{protocol.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-green-300">TVL</div>
                  <div className="font-bold text-green-400">{protocol.tvl}</div>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-yellow-300">APY Range</div>
                  <div className="font-bold text-yellow-400">{protocol.apy}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-blue-300">Key Features:</div>
                <div className="flex flex-wrap gap-1">
                  {protocol.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(protocol.website, '_blank');
                }}
              >
                <Zap className="mr-2 w-4 h-4" />
                Visit Protocol
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProtocolOverview;
