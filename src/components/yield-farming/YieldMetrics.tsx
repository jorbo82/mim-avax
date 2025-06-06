
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Clock, AlertTriangle } from "lucide-react";

interface YieldMetricsProps {
  selectedProtocol: string | null;
}

const YieldMetrics = ({ selectedProtocol }: YieldMetricsProps) => {
  const getProtocolData = () => {
    switch (selectedProtocol) {
      case "pharaoh":
        return {
          name: "Pharaoh Exchange",
          pools: [
            { name: "AVAX/USDC", apy: "45.2%", tvl: "$12.5M", risk: "Medium", impermanentLoss: "5-15%" },
            { name: "PHAR/AVAX", apy: "78.6%", tvl: "$8.2M", risk: "High", impermanentLoss: "10-25%" },
            { name: "USDC/USDT", apy: "12.4%", tvl: "$25.1M", risk: "Low", impermanentLoss: "0-2%" }
          ]
        };
      case "traderjoe":
        return {
          name: "Trader Joe",
          pools: [
            { name: "AVAX/USDC.e", apy: "32.8%", tvl: "$45.2M", risk: "Medium", impermanentLoss: "5-12%" },
            { name: "JOE/AVAX", apy: "55.3%", tvl: "$18.7M", risk: "High", impermanentLoss: "8-20%" },
            { name: "USDC.e/USDT.e", apy: "8.9%", tvl: "$67.8M", risk: "Low", impermanentLoss: "0-1%" }
          ]
        };
      default:
        return {
          name: "All Protocols",
          pools: [
            { name: "AVAX/USDC", apy: "35.4%", tvl: "$89.2M", risk: "Medium", impermanentLoss: "5-15%" },
            { name: "Stablecoin Pools", apy: "12.1%", tvl: "$156.7M", risk: "Low", impermanentLoss: "0-2%" },
            { name: "Native Token Pairs", apy: "67.2%", tvl: "$45.3M", risk: "High", impermanentLoss: "10-30%" }
          ]
        };
    }
  };

  const protocolData = getProtocolData();

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-green-400 bg-green-500/20";
      case "medium": return "text-yellow-400 bg-yellow-500/20";
      case "high": return "text-red-400 bg-red-500/20";
      default: return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <section className="relative z-10 container mx-auto px-4 pb-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-4 text-yellow-400 flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8" />
          Yield Metrics - {protocolData.name}
          <DollarSign className="w-8 h-8" />
        </h3>
        <p className="text-xl text-purple-300">Real-time APY and risk analysis for top farming pools</p>
      </div>
      
      <div className="grid gap-6 max-w-6xl mx-auto">
        {protocolData.pools.map((pool, index) => (
          <Card key={index} className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-yellow-400/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-xl flex items-center justify-between">
                <span>{pool.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${getRiskColor(pool.risk)}`}>
                  {pool.risk} Risk
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-purple-300">APY</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{pool.apy}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-purple-300">TVL</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{pool.tvl}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-purple-300">IL Risk</span>
                  </div>
                  <div className="text-lg font-bold text-yellow-400">{pool.impermanentLoss}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-purple-300">Lock Period</span>
                  </div>
                  <div className="text-lg font-bold text-purple-400">Flexible</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-sm text-purple-200">
                  <strong>Pool Strategy:</strong> {pool.name.includes("USDC") && pool.name.includes("USDT") ? 
                    "Low-risk stablecoin farming with minimal impermanent loss. Perfect for conservative yield farmers." :
                    pool.name.includes("AVAX") ? 
                    "Medium-risk strategy involving native AVAX token. Monitor market volatility closely." :
                    "High-yield opportunity with native protocol tokens. Higher rewards come with increased volatility risk."
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default YieldMetrics;
