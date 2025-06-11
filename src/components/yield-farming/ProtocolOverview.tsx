
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
    <section className="relative container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold mb-6 text-foreground flex items-center justify-center gap-3 leading-tight">
          <Shield className="w-8 h-8 text-brand-primary" />
          Protocol Overview
          <TrendingUp className="w-8 h-8 text-brand-accent" />
        </h3>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">Explore the top DeFi protocols on Avalanche</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {protocols.map((protocol) => (
          <Card 
            key={protocol.id}
            className={`bg-card border border-neutral-200 dark:border-neutral-800 hover:border-brand-primary/50 transition-all duration-300 transform hover:scale-105 cursor-pointer modern-shadow hover:modern-shadow-lg ${
              selectedProtocol === protocol.id ? 'ring-2 ring-brand-primary border-brand-primary' : ''
            }`}
            onClick={() => onProtocolSelect(protocol.id)}
          >
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-6">{protocol.logo}</div>
              <CardTitle className="text-brand-primary text-2xl leading-tight">{protocol.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{protocol.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <div className="text-sm text-green-600 dark:text-green-400 mb-1">TVL</div>
                  <div className="font-bold text-green-600 dark:text-green-400 text-lg">{protocol.tvl}</div>
                </div>
                <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-4 text-center">
                  <div className="text-sm text-brand-accent mb-1">APY Range</div>
                  <div className="font-bold text-brand-accent text-lg">{protocol.apy}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-brand-primary">Key Features:</div>
                <div className="flex flex-wrap gap-2">
                  {protocol.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-md text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-brand-primary text-white hover:opacity-90 mt-4 modern-shadow"
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
