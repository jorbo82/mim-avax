
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, TrendingUp, Filter, RefreshCw } from 'lucide-react';
import { useDeFiLlamaYields } from '@/hooks/useDeFiLlamaYields';

export const PoolAnalysisSection = () => {
  const { data: pools, isLoading, error, refetch } = useDeFiLlamaYields();
  const [searchTerm, setSearchTerm] = useState('');
  const [minTVL, setMinTVL] = useState('');
  const [minAPY, setMinAPY] = useState('');

  const filteredPools = pools?.filter(pool => {
    const matchesSearch = !searchTerm || 
      pool.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTVL = !minTVL || pool.tvlUsd >= parseFloat(minTVL);
    const matchesAPY = !minAPY || pool.apy >= parseFloat(minAPY);
    
    return matchesSearch && matchesTVL && matchesAPY;
  }).slice(0, 20); // Limit to top 20 for performance

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
            <Button variant="outline" onClick={() => refetch()}>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Pool Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search pools or protocols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPools?.map((pool, index) => (
          <Card key={pool.pool} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{pool.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{pool.project}</p>
                  </div>
                  <Badge 
                    variant={pool.stablecoin ? "secondary" : "outline"}
                    className={pool.stablecoin ? "bg-green-100 text-green-700" : ""}
                  >
                    {pool.stablecoin ? "Stable" : "Volatile"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">APY</p>
                    <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {pool.apy.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">TVL</p>
                    <p className="text-lg font-semibold flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {pool.tvlUsd > 1000000 
                        ? `${(pool.tvlUsd / 1000000).toFixed(1)}M`
                        : `${(pool.tvlUsd / 1000).toFixed(0)}K`
                      }
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base APY:</span>
                    <span>{pool.apyBase?.toFixed(2) || 0}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reward APY:</span>
                    <span>{pool.apyReward?.toFixed(2) || 0}%</span>
                  </div>
                  {pool.volumeUsd1d && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">24h Volume:</span>
                      <span>${(pool.volumeUsd1d / 1000).toFixed(0)}K</span>
                    </div>
                  )}
                </div>

                {pool.ilRisk && (
                  <Badge variant="destructive" className="w-full justify-center">
                    Impermanent Loss Risk
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPools?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No pools found matching your criteria. Try adjusting the filters.
            </p>
          </CardContent>
        </Card>
      )}

      {pools && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground">
              Showing {filteredPools?.length || 0} of {pools.length} total Avalanche pools
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
