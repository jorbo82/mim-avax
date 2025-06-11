
import { TrendingUp, DollarSign, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useYieldPools } from '@/hooks/useYieldPools';

interface YieldOpportunitiesProps {
  selectedProtocol?: string;
}

const YieldOpportunities = ({ selectedProtocol }: YieldOpportunitiesProps) => {
  const { pools, loading, error } = useYieldPools(selectedProtocol);

  if (loading) {
    return (
      <Card className="bg-black/20 backdrop-blur-md border-purple-500/30">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-purple-300 mt-4">Loading yield opportunities...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-black/20 backdrop-blur-md border-red-500/30">
        <CardContent className="p-8 text-center">
          <p className="text-red-300">Error loading yield opportunities: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const getRiskLevel = (apy: number) => {
    if (apy < 10) return { level: 'Low', color: 'bg-green-500/20 text-green-400' };
    if (apy < 30) return { level: 'Medium', color: 'bg-yellow-500/20 text-yellow-400' };
    return { level: 'High', color: 'bg-red-500/20 text-red-400' };
  };

  return (
    <Card className="bg-black/20 backdrop-blur-md border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Yield Opportunities
        </CardTitle>
        <CardDescription className="text-purple-300">
          {selectedProtocol ? `${pools[0]?.protocol_name || 'Protocol'} pools` : 'All available yield farming pools'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pools.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-purple-300">No yield opportunities found.</p>
            <p className="text-sm text-purple-400 mt-2">
              Try discovering new tokens or check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pools.map((pool) => {
              const totalAPY = pool.apy_base + pool.apy_reward;
              const risk = getRiskLevel(totalAPY);
              
              return (
                <Card key={pool.id} className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:border-yellow-400/50 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{pool.pool_name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={risk.color}>
                          {risk.level} Risk
                        </Badge>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                          {pool.protocol_name}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-purple-300">Total APY</span>
                        </div>
                        <div className="text-xl font-bold text-green-400">
                          {totalAPY.toFixed(2)}%
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-purple-300">TVL</span>
                        </div>
                        <div className="text-xl font-bold text-blue-400">
                          ${pool.tvl_usd.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-purple-300">Base APY</span>
                        </div>
                        <div className="text-lg font-bold text-yellow-400">
                          {pool.apy_base.toFixed(2)}%
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">Rewards</span>
                        </div>
                        <div className="text-lg font-bold text-purple-400">
                          {pool.apy_reward.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="text-sm text-purple-200">
                        <div className="flex justify-between items-center mb-1">
                          <span>Token Pair:</span>
                          <span className="font-mono">
                            {pool.base_token_symbol}/{pool.quote_token_symbol}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span>24h Volume:</span>
                          <span>${pool.volume_24h_usd.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>24h Fees:</span>
                          <span>${pool.fees_24h_usd.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YieldOpportunities;
