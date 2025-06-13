
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Filter, RefreshCw, Shield, AlertTriangle, Target, Star } from 'lucide-react';
import { useEnhancedAvalancheYields } from '@/hooks/useDeFiLlamaYields';

export const PoolAnalysisSection = () => {
  const [minTVL, setMinTVL] = useState('');
  const [minAPY, setMinAPY] = useState('');
  const [maxRisk, setMaxRisk] = useState<'Low' | 'Medium' | 'High' | 'Extreme'>('Extreme');
  
  const {
    enhancedPools,
    isLoading,
    error,
    topYieldPools,
    safestHighYield,
    sustainablePools,
    analytics
  } = useEnhancedAvalancheYields(
    parseFloat(minTVL) || 0,
    parseFloat(minAPY) || 0,
    maxRisk
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'High': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      case 'Extreme': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Decreasing': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-6 w-1/2" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
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
            <p className="text-red-600 dark:text-red-400">
              Failed to load pool data: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
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
      {/* Analytics Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Avalanche Pool Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{analytics.totalPools}</p>
              <p className="text-sm text-muted-foreground">Total Pools</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {analytics.averageApy.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg APY</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                ${(analytics.totalTvl / 1e6).toFixed(1)}M
              </p>
              <p className="text-sm text-muted-foreground">Total TVL</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {analytics.riskDistribution.low + analytics.riskDistribution.medium}
              </p>
              <p className="text-sm text-muted-foreground">Safe Pools</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Min TVL (USD)"
              type="number"
              value={minTVL}
              onChange={(e) => setMinTVL(e.target.value)}
            />
            <Input
              placeholder="Min APY (%)"
              type="number"
              value={minAPY}
              onChange={(e) => setMinAPY(e.target.value)}
            />
            <select
              value={maxRisk}
              onChange={(e) => setMaxRisk(e.target.value as any)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="Low">Low Risk Only</option>
              <option value="Medium">Up to Medium Risk</option>
              <option value="High">Up to High Risk</option>
              <option value="Extreme">All Risk Levels</option>
            </select>
            <Button variant="outline" onClick={() => {
              setMinTVL('');
              setMinAPY('');
              setMaxRisk('Extreme');
            }}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pool Categories */}
      <Tabs defaultValue="highest-yield" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="highest-yield">🚀 Highest Yield</TabsTrigger>
          <TabsTrigger value="safest">🛡️ Safest High Yield</TabsTrigger>
          <TabsTrigger value="sustainable">⭐ Most Sustainable</TabsTrigger>
          <TabsTrigger value="all">📋 All Pools</TabsTrigger>
        </TabsList>

        <TabsContent value="highest-yield" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Top 10 Highest Yield Pools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {topYieldPools?.map((analytics, index) => (
                  <Card key={analytics.pool.pool} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{analytics.pool.symbol}</h3>
                              {index < 3 && <Star className="w-4 h-4 text-yellow-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{analytics.pool.project}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600 flex items-center gap-1">
                              {getTrendIcon(analytics.yieldTrend)}
                              {analytics.pool.apy.toFixed(2)}%
                            </p>
                            <Badge className={getRiskColor(analytics.riskLevel)}>
                              {analytics.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">TVL:</span>
                            <span className="ml-1 font-semibold">
                              ${analytics.pool.tvlUsd > 1000000 
                                ? `${(analytics.pool.tvlUsd / 1000000).toFixed(1)}M`
                                : `${(analytics.pool.tvlUsd / 1000).toFixed(0)}K`
                              }
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Sustainability:</span>
                            <span className="ml-1 font-semibold">{analytics.sustainabilityScore.toFixed(0)}/100</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Base APY:</span>
                            <span className="ml-1 font-semibold">{analytics.pool.apyBase?.toFixed(2) || 0}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reward APY:</span>
                            <span className="ml-1 font-semibold">{analytics.pool.apyReward?.toFixed(2) || 0}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            {analytics.pool.stablecoin && (
                              <Badge variant="secondary" className="text-xs">Stable</Badge>
                            )}
                            {analytics.pool.ilRisk && (
                              <Badge variant="destructive" className="text-xs">IL Risk</Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Liquidity: {analytics.liquidityHealth.toFixed(0)}/100
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

        <TabsContent value="safest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Safest High Yield Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {safestHighYield?.map((analytics) => (
                  <Card key={analytics.pool.pool} className="border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{analytics.pool.symbol}</h3>
                              <Shield className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-sm text-muted-foreground">{analytics.pool.project}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">
                              {analytics.pool.apy.toFixed(2)}%
                            </p>
                            <Badge className={getRiskColor(analytics.riskLevel)}>
                              {analytics.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Risk Score:</span>
                              <span className="ml-1 font-semibold">{analytics.riskScore}/15</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Protocol Rep:</span>
                              <span className="ml-1 font-semibold">{analytics.protocolReputation}/100</span>
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

        <TabsContent value="sustainable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Most Sustainable Pools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sustainablePools?.slice(0, 10).map((analytics) => (
                  <Card key={analytics.pool.pool} className="border-purple-200 dark:border-purple-800">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{analytics.pool.symbol}</h3>
                              <Star className="w-4 h-4 text-purple-600" />
                            </div>
                            <p className="text-sm text-muted-foreground">{analytics.pool.project}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-600">
                              {analytics.sustainabilityScore.toFixed(0)}/100
                            </p>
                            <p className="text-sm text-green-600 font-semibold">
                              {analytics.pool.apy.toFixed(2)}% APY
                            </p>
                          </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Yield Trend:</span>
                              <span className="ml-1 font-semibold flex items-center gap-1">
                                {getTrendIcon(analytics.yieldTrend)}
                                {analytics.yieldTrend}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Volume/TVL:</span>
                              <span className="ml-1 font-semibold">
                                {(analytics.volumeToTvlRatio * 100).toFixed(2)}%
                              </span>
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

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enhancedPools?.slice(0, 20).map((analytics) => (
              <Card key={analytics.pool.pool} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{analytics.pool.symbol}</h3>
                        <p className="text-sm text-muted-foreground">{analytics.pool.project}</p>
                      </div>
                      <Badge className={getRiskColor(analytics.riskLevel)}>
                        {analytics.riskLevel}
                      </Badge>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                        {getTrendIcon(analytics.yieldTrend)}
                        {analytics.pool.apy.toFixed(2)}%
                      </p>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">TVL:</span>
                        <span>${(analytics.pool.tvlUsd / 1e6).toFixed(2)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sustainability:</span>
                        <span>{analytics.sustainabilityScore.toFixed(0)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IL Risk:</span>
                        <span>{analytics.impermanentLossRisk}%</span>
                      </div>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {analytics.pool.stablecoin && (
                        <Badge variant="secondary" className="text-xs">Stable</Badge>
                      )}
                      {analytics.pool.ilRisk && (
                        <Badge variant="destructive" className="text-xs">IL Risk</Badge>
                      )}
                      {analytics.pool.outlier && (
                        <Badge variant="outline" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Outlier
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {enhancedPools && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground">
              Showing {enhancedPools.length} Avalanche pools with enhanced analytics
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
