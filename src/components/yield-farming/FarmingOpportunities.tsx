
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const FarmingOpportunities = () => {
  const opportunities = [
    {
      protocol: "Pharaoh Exchange",
      pool: "AVAX/USDC Concentrated Liquidity",
      apy: "45.2%",
      tvl: "$12.5M",
      risk: "Medium",
      category: "Concentrated Liquidity",
      description: "Earn fees from concentrated liquidity positions with active management",
      rewards: ["Trading Fees", "PHAR Tokens", "Liquidity Incentives"],
      minDeposit: "0.1 AVAX",
      lockPeriod: "Flexible",
      url: "https://pharaoh.exchange"
    },
    {
      protocol: "Trader Joe",
      pool: "JOE/AVAX Liquidity Book",
      apy: "55.3%",
      tvl: "$18.7M",
      risk: "High",
      category: "Liquidity Book",
      description: "Zero-slippage trading with innovative liquidity book technology",
      rewards: ["Trading Fees", "JOE Tokens", "Bonus Rewards"],
      minDeposit: "10 JOE",
      lockPeriod: "None",
      url: "https://traderjoexyz.com"
    },
    {
      protocol: "Benqi Finance",
      pool: "sAVAX Staking",
      apy: "8.5%",
      tvl: "$89.4M",
      risk: "Low",
      category: "Liquid Staking",
      description: "Stake AVAX and receive liquid staking tokens for additional DeFi opportunities",
      rewards: ["Staking Rewards", "QI Tokens", "Liquid sAVAX"],
      minDeposit: "1 AVAX",
      lockPeriod: "21 days unbonding",
      url: "https://benqi.fi"
    },
    {
      protocol: "Pangolin",
      pool: "PNG/AVAX Farm",
      apy: "32.8%",
      tvl: "$5.2M",
      risk: "High",
      category: "Traditional AMM",
      description: "Classic automated market maker with proven track record on Avalanche",
      rewards: ["Trading Fees", "PNG Tokens", "Community Rewards"],
      minDeposit: "0.5 AVAX",
      lockPeriod: "Flexible",
      url: "https://pangolin.exchange"
    },
    {
      protocol: "Vector Finance",
      pool: "VTX Boosted Yields",
      apy: "67.1%",
      tvl: "$8.9M",
      risk: "High",
      category: "Yield Optimizer",
      description: "Automated yield optimization across multiple Avalanche protocols",
      rewards: ["Optimized Yields", "VTX Tokens", "Auto-Compounding"],
      minDeposit: "50 USDC",
      lockPeriod: "Variable",
      url: "https://vectorfinance.io"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "high": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default: return "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Concentrated Liquidity": return <Zap className="w-4 h-4" />;
      case "Liquidity Book": return <TrendingUp className="w-4 h-4" />;
      case "Single-Sided": return <Shield className="w-4 h-4" />;
      case "Liquid Staking": return <Sparkles className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold mb-6 text-foreground flex items-center justify-center gap-3 leading-tight">
          <Sparkles className="w-8 h-8 text-brand-primary" />
          Farming Opportunities
          <TrendingUp className="w-8 h-8 text-brand-accent" />
        </h3>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">Discover the best yield farming opportunities across Avalanche protocols</p>
      </div>
      
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {opportunities.map((opportunity, index) => (
          <Card key={index} className="bg-card border border-neutral-200 dark:border-neutral-800 hover:border-brand-primary/50 transition-all duration-300 transform hover:scale-105 modern-shadow hover:modern-shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge 
                  variant="outline" 
                  className={`${getRiskColor(opportunity.risk)} border`}
                >
                  {opportunity.risk} Risk
                </Badge>
                <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                  {getCategoryIcon(opportunity.category)}
                  <span className="ml-1">{opportunity.category}</span>
                </Badge>
              </div>
              <CardTitle className="text-brand-primary text-lg leading-tight">{opportunity.protocol}</CardTitle>
              <div className="text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">{opportunity.pool}</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-green-600 dark:text-green-400 mb-1">APY</div>
                  <div className="font-bold text-green-600 dark:text-green-400 text-xl">{opportunity.apy}</div>
                </div>
                <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-3 text-center">
                  <div className="text-sm text-brand-primary mb-1">TVL</div>
                  <div className="font-bold text-brand-primary text-xl">{opportunity.tvl}</div>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{opportunity.description}</p>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-brand-accent">Rewards:</div>
                <div className="flex flex-wrap gap-2">
                  {opportunity.rewards.map((reward, idx) => (
                    <span 
                      key={idx}
                      className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-3 py-1 rounded-md text-xs"
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600 dark:text-neutral-400">Min Deposit:</span>
                  <div className="font-semibold text-foreground mt-1">{opportunity.minDeposit}</div>
                </div>
                <div>
                  <span className="text-neutral-600 dark:text-neutral-400">Lock Period:</span>
                  <div className="font-semibold text-foreground mt-1">{opportunity.lockPeriod}</div>
                </div>
              </div>

              <Button 
                className="w-full bg-brand-primary text-white hover:opacity-90 mt-4 modern-shadow"
                onClick={() => window.open(opportunity.url, '_blank')}
              >
                <Sparkles className="mr-2 w-4 h-4" />
                Start Farming
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FarmingOpportunities;
