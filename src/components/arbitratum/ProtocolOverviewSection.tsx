
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, DollarSign, TrendingUp, TrendingDown, RefreshCw, BarChart3 } from 'lucide-react';
import { useDeFiLlamaProtocols } from '@/hooks/useDeFiLlamaProtocols';

export const ProtocolOverviewSection = () => {
  const { data: protocols, isLoading, error, refetch } = useDeFiLlamaProtocols();

  const topProtocols = protocols?.slice(0, 12).sort((a, b) => (b.tvl || 0) - (a.tvl || 0));

  const totalTVL = protocols?.reduce((sum, protocol) => sum + (protocol.tvl || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-8 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Activity className="w-12 h-12 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                Failed to load protocol data
              </h3>
              <p className="text-red-600 dark:text-red-400">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
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
      {/* Overview Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Avalanche DeFi Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {protocols?.length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Active Protocols</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 flex items-center justify-center gap-1">
                <DollarSign className="w-6 h-6" />
                {totalTVL > 1000000000 
                  ? `${(totalTVL / 1000000000).toFixed(1)}B`
                  : `${(totalTVL / 1000000).toFixed(0)}M`
                }
              </p>
              <p className="text-sm text-muted-foreground">Total TVL</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {topProtocols?.[0]?.tvl ? 
                  `$${(topProtocols[0].tvl / 1000000).toFixed(0)}M` : 
                  'N/A'
                }
              </p>
              <p className="text-sm text-muted-foreground">Largest Protocol TVL</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topProtocols?.map((protocol, index) => (
          <Card key={protocol.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {protocol.logo && (
                      <img 
                        src={protocol.logo} 
                        alt={protocol.name}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{protocol.name}</h3>
                      <p className="text-sm text-muted-foreground">#{index + 1}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {protocol.category || 'DeFi'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value Locked</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      <DollarSign className="w-5 h-5" />
                      {protocol.tvl > 1000000000 
                        ? `${(protocol.tvl / 1000000000).toFixed(2)}B`
                        : `${(protocol.tvl / 1000000).toFixed(1)}M`
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground">1h</p>
                      <div className="flex items-center justify-center gap-1">
                        {protocol.change_1h >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={protocol.change_1h >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(protocol.change_1h || 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">1d</p>
                      <div className="flex items-center justify-center gap-1">
                        {protocol.change_1d >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={protocol.change_1d >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(protocol.change_1d || 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">7d</p>
                      <div className="flex items-center justify-center gap-1">
                        {protocol.change_7d >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={protocol.change_7d >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(protocol.change_7d || 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {protocol.chains && protocol.chains.length > 1 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Multi-chain:</p>
                      <div className="flex flex-wrap gap-1">
                        {protocol.chains.slice(0, 3).map(chain => (
                          <Badge key={chain} variant="secondary" className="text-xs">
                            {chain}
                          </Badge>
                        ))}
                        {protocol.chains.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{protocol.chains.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {protocols && protocols.length > 12 && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing top 12 of {protocols.length} total Avalanche protocols
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
