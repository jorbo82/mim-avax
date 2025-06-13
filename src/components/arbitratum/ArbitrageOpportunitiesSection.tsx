
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, AlertTriangle, DollarSign, RefreshCw, Target } from 'lucide-react';
import { useDeFiLlamaArbitrage } from '@/hooks/useDeFiLlamaArbitrage';

export const ArbitrageOpportunitiesSection = () => {
  const [minProfit, setMinProfit] = useState(0.5);
  const { opportunities, isLoading, error, summary } = useDeFiLlamaArbitrage(minProfit);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          </CardContent>
        </Card>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                Failed to load arbitrage data
              </h3>
              <p className="text-red-600 dark:text-red-400">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Arbitrage Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{summary.totalOpportunities}</p>
              <p className="text-sm text-muted-foreground">Total Opportunities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {summary.avgProfitPotential.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Profit Potential</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {summary.highestProfit.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">Highest Profit</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{summary.lowRiskCount}</p>
              <p className="text-sm text-muted-foreground">Low Risk Ops</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Threshold Control */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Minimum Profit Threshold:</label>
            <select
              value={minProfit}
              onChange={(e) => setMinProfit(parseFloat(e.target.value))}
              className="px-3 py-1 border rounded-md bg-background"
            >
              <option value={0.1}>0.1%</option>
              <option value={0.5}>0.5%</option>
              <option value={1.0}>1.0%</option>
              <option value={2.0}>2.0%</option>
              <option value={5.0}>5.0%</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Arbitrage Opportunities Found</h3>
              <p className="text-muted-foreground">
                Try lowering the minimum profit threshold to see more opportunities.
              </p>
            </CardContent>
          </Card>
        ) : (
          opportunities.slice(0, 10).map((opportunity, index) => (
            <Card key={`${opportunity.tokenPair}-${index}`} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{opportunity.tokenPair.toUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground">
                        Yield Arbitrage Opportunity
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-5 h-5" />
                        {opportunity.potentialProfit.toFixed(2)}%
                      </p>
                      <Badge className={getRiskColor(opportunity.riskAssessment.level)}>
                        {opportunity.riskAssessment.level} Risk
                      </Badge>
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

                  {/* Risk Assessment */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                    <h5 className="font-semibold text-sm mb-2">Risk Assessment</h5>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">TVL Risk:</span>
                        <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.tvlRisk}/3</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Protocol Risk:</span>
                        <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.protocolRisk}/4</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">APY Risk:</span>
                        <span className="ml-1 font-semibold">{opportunity.riskAssessment.factors.apyRisk}/2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {opportunities.length > 10 && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing top 10 of {opportunities.length} total opportunities
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
