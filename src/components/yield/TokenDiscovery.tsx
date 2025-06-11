
import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Loader2, TrendingUp, ExternalLink } from 'lucide-react';
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

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
                            
                            {/* Pool metrics */}
                            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                              <div>
                                <span className="text-purple-300">TVL:</span>
                                <span className="text-green-400 ml-1">
                                  ${pool.tvl > 0 ? pool.tvl.toLocaleString() : 'N/A'}
                                </span>
                              </div>
                              <div>
                                <span className="text-purple-300">APY:</span>
                                <span className="text-yellow-400 ml-1">
                                  {((pool.apyBase || 0) + (pool.apyReward || 0)).toFixed(2)}%
                                </span>
                              </div>
                            </div>

                            {/* Enhanced Apex DeFi details */}
                            {protocol.protocol === 'apex-defi' && pool.metadata && (
                              <div className="space-y-1 text-xs border-t border-purple-500/20 pt-2">
                                {pool.metadata.erc314Address && (
                                  <div className="flex justify-between">
                                    <span className="text-purple-300">ERC314:</span>
                                    <span className="text-blue-400 font-mono">
                                      {formatAddress(pool.metadata.erc314Address)}
                                    </span>
                                  </div>
                                )}
                                {pool.metadata.wrapperAddress && (
                                  <div className="flex justify-between">
                                    <span className="text-purple-300">Wrapper:</span>
                                    <span className="text-blue-400 font-mono">
                                      {formatAddress(pool.metadata.wrapperAddress)}
                                    </span>
                                  </div>
                                )}
                                {pool.metadata.lpContract && (
                                  <div className="flex justify-between">
                                    <span className="text-purple-300">LP Pool:</span>
                                    <span className="text-green-400 font-mono">
                                      {formatAddress(pool.metadata.lpContract)}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-purple-300">Liquidity:</span>
                                  <span className={pool.metadata.hasLiquidityData ? 'text-green-400' : 'text-red-400'}>
                                    {pool.metadata.hasLiquidityData ? 'Active' : 'No LP Found'}
                                  </span>
                                </div>
                              </div>
                            )}
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

            {/* Discovery details */}
            {discoveryResult.totalPoolsFound > 0 && (
              <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-400 text-sm">Discovery Details</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Token Address:</span>
                    <span className="text-white font-mono">{formatAddress(contractAddress)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Total Pools:</span>
                    <span className="text-green-400">{discoveryResult.totalPoolsFound}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Active Protocols:</span>
                    <span className="text-yellow-400">
                      {discoveryResult.protocols.filter((p: any) => p.hasPool).length} / {discoveryResult.protocols.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenDiscovery;
