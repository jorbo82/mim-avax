
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Clock, Zap, Target, AlertTriangle } from 'lucide-react';
import type { ArbitrageOpportunity } from '@/hooks/useDeFiLlamaArbitrage';

interface ArbitrageOpportunityCardProps {
  opportunity: ArbitrageOpportunity;
  index: number;
  variant?: 'detailed' | 'compact';
}

export const ArbitrageOpportunityCard = ({ 
  opportunity, 
  index, 
  variant = 'detailed' 
}: ArbitrageOpportunityCardProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Complex': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-bold">{opportunity.tokenPair}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={getRiskColor(opportunity.riskAssessment.level)}>
                    {opportunity.riskAssessment.level} Risk
                  </Badge>
                  <Badge className={getComplexityColor(opportunity.executionComplexity)}>
                    {opportunity.executionComplexity}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ${opportunity.netProfitEstimate.toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">
                {opportunity.yieldDifference.toFixed(2)}% yield diff
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{opportunity.tokenPair}</h3>
                <Badge className={getComplexityColor(opportunity.executionComplexity)}>
                  {opportunity.executionComplexity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced Yield Arbitrage #{index + 1}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                <DollarSign className="w-5 h-5" />
                {opportunity.netProfitEstimate.toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">Net profit ($10k)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Higher APY Pool */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white/50">Higher APY</Badge>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <h4 className="font-semibold">{opportunity.highestAPY.protocol}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>APY:</span>
                      <span className="font-bold text-green-600">
                        {opportunity.highestAPY.apy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TVL:</span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {opportunity.highestAPY.tvl > 1000000 
                          ? `${(opportunity.highestAPY.tvl / 1000000).toFixed(1)}M`
                          : `${(opportunity.highestAPY.tvl / 1000).toFixed(0)}K`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lower APY Pool */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white/50">Lower APY</Badge>
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">{opportunity.lowestAPY.protocol}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>APY:</span>
                      <span className="font-bold text-blue-600">
                        {opportunity.lowestAPY.apy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TVL:</span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {opportunity.lowestAPY.tvl > 1000000 
                          ? `${(opportunity.lowestAPY.tvl / 1000000).toFixed(1)}M`
                          : `${(opportunity.lowestAPY.tvl / 1000).toFixed(0)}K`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Metrics */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <TrendingUp className="w-3 h-3" />
                  Yield Difference
                </div>
                <span className="font-bold text-green-600">
                  {opportunity.yieldDifference.toFixed(2)}%
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Clock className="w-3 h-3" />
                  Time to Capture
                </div>
                <span className="font-bold">
                  {opportunity.timeToCapture.toFixed(1)}h
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Zap className="w-3 h-3" />
                  Gas Cost
                </div>
                <span className="font-bold">
                  ${(opportunity.gasCostEstimate * 40).toFixed(2)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Target className="w-3 h-3" />
                  Market Impact
                </div>
                <span className="font-bold">
                  {opportunity.marketImpact.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Advanced Risk Assessment */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
            <h5 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Enhanced Risk Assessment
              <Badge className={getRiskColor(opportunity.riskAssessment.level)} variant="outline">
                {opportunity.riskAssessment.level}
              </Badge>
            </h5>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">TVL Risk:</span>
                <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.tvlRisk}/4</span>
              </div>
              <div>
                <span className="text-muted-foreground">Protocol Risk:</span>
                <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.protocolRisk}/4</span>
              </div>
              <div>
                <span className="text-muted-foreground">APY Risk:</span>
                <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.apyRisk}/4</span>
              </div>
              <div>
                <span className="text-muted-foreground">Liquidity Risk:</span>
                <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.liquidityRisk}/3</span>
              </div>
              <div>
                <span className="text-muted-foreground">Correlation Risk:</span>
                <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.correlationRisk}/2</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Score:</span>
                <span className="ml-1 font-semibold">{opportunity.riskAssessment.score}/17</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
