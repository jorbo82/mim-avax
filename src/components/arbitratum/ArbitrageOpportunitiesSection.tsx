
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, AlertTriangle, DollarSign, RefreshCw, Target, Clock, Zap, Calculator } from 'lucide-react';
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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Complex': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
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
      {/* Enhanced Summary Stats */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Advanced Arbitrage Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{summary.totalOpportunities}</p>
              <p className="text-sm text-muted-foreground">Total Opportunities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ${summary.avgNetProfit.toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Net Profit</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {summary.immediateOpportunities}
              </p>
              <p className="text-sm text-muted-foreground">Immediate Ops</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{summary.highValueOpportunities}</p>
              <p className="text-sm text-muted-foreground">$100+ Profit</p>
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
              <option value={10.0}>10.0%</option>
            </select>
            <div className="text-sm text-muted-foreground">
              Found {opportunities.length} opportunities
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorized Opportunities */}
      <Tabs defaultValue="best-net-profit" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="best-net-profit">💰 Best Net Profit</TabsTrigger>
          <TabsTrigger value="immediate">⚡ Immediate</TabsTrigger>
          <TabsTrigger value="low-risk">🛡️ Low Risk</TabsTrigger>
          <TabsTrigger value="all">📋 All Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="best-net-profit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Highest Net Profit Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.slice(0, 5).map((opportunity, index) => (
                  <Card key={`${opportunity.tokenPair}-${index}`} className="border-green-200 dark:border-green-800">
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="immediate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Immediate Opportunities (&lt;1 hour)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {opportunities.filter(op => op.timeToCapture < 1).map((opportunity, index) => (
                  <Card key={`immediate-${index}`} className="border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{opportunity.tokenPair}</h3>
                            <p className="text-sm text-muted-foreground">{opportunity.executionComplexity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">
                              ${opportunity.netProfitEstimate.toFixed(0)}
                            </p>
                            <div className="flex items-center gap-1 text-yellow-600">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{opportunity.timeToCapture.toFixed(1)}h</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-center bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                          <strong>{opportunity.yieldDifference.toFixed(2)}%</strong> yield difference
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-green-600" />
                Low Risk Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {opportunities.filter(op => op.riskAssessment.level === 'Low').map((opportunity, index) => (
                  <Card key={`low-risk-${index}`} className="border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{opportunity.tokenPair}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={getRiskColor('Low')}>Low Risk</Badge>
                              <Badge className={getComplexityColor(opportunity.executionComplexity)}>
                                {opportunity.executionComplexity}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">
                              ${opportunity.netProfitEstimate.toFixed(0)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {opportunity.yieldDifference.toFixed(2)}% diff
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                          Risk Score: <strong>{opportunity.riskAssessment.score}/17</strong>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
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
            <div className="space-y-4">
              {opportunities.slice(0, 20).map((opportunity, index) => (
                <Card key={`all-${index}`} className="hover:shadow-md transition-shadow">
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
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {opportunities.length > 20 && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing top 20 of {opportunities.length} total opportunities
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
