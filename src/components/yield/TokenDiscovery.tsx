
import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Loader2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useContractValidation } from '@/hooks/useContractValidation';

const TokenDiscovery = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [discoveryResult, setDiscoveryResult] = useState<any>(null);
  const { discoverPools, loading, error } = useContractValidation();

  const handleDiscover = async () => {
    if (!contractAddress.trim()) return;

    try {
      const result = await discoverPools(contractAddress.trim());
      setDiscoveryResult(result);
    } catch (err) {
      console.error('Pool discovery failed:', err);
    }
  };

  const handleExampleClick = (address: string) => {
    setContractAddress(address);
    setDiscoveryResult(null);
  };

  const getProtocolColor = (protocol: string) => {
    const colors: { [key: string]: string } = {
      'apex-defi': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'pharaoh': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'lfj': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'benqi': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[protocol] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <Card className="bg-black/20 backdrop-blur-md border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Multi-Protocol Pool Discovery
        </CardTitle>
        <CardDescription className="text-purple-300">
          Enter a token address to discover yield opportunities across all supported protocols
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter token contract address (0x...)"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="bg-black/20 border-purple-500/30 text-white"
          />
          <Button 
            onClick={handleDiscover}
            disabled={loading || !contractAddress.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Example addresses */}
        <div className="space-y-2">
          <p className="text-sm text-purple-300">Try this example:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick('0x8D8B084269f4b2Ad111b60793e9f3577A7795605')}
              className="text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              MIM Token
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {discoveryResult && (
          <div className="space-y-4">
            <Alert className={discoveryResult.totalPoolsFound > 0 ? "border-green-500/30 bg-green-500/10" : "border-yellow-500/30 bg-yellow-500/10"}>
              <CheckCircle className={`h-4 w-4 ${discoveryResult.totalPoolsFound > 0 ? 'text-green-400' : 'text-yellow-400'}`} />
              <AlertDescription className={discoveryResult.totalPoolsFound > 0 ? 'text-green-300' : 'text-yellow-300'}>
                Found {discoveryResult.totalPoolsFound} pool(s) across {discoveryResult.protocols.filter((p: any) => p.hasPool).length} protocol(s)
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discoveryResult.protocols.map((protocol: any, index: number) => (
                <Card key={index} className={`bg-black/20 border ${protocol.hasPool ? 'border-green-500/30' : 'border-gray-500/30'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-white capitalize">
                        {protocol.protocol.replace('-', ' ')}
                      </CardTitle>
                      <Badge className={getProtocolColor(protocol.protocol)}>
                        {protocol.hasPool ? 'Available' : 'Not Found'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {protocol.hasPool && protocol.pools ? (
                      <div className="space-y-3">
                        {protocol.pools.map((pool: any, poolIndex: number) => (
                          <div key={poolIndex} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-white">{pool.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {pool.type}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-purple-300">TVL:</span>
                                <span className="text-green-400 ml-1">${pool.tvl?.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-purple-300">APY:</span>
                                <span className="text-yellow-400 ml-1">{((pool.apyBase || 0) + (pool.apyReward || 0)).toFixed(2)}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        {protocol.message || 'No pools available'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenDiscovery;
