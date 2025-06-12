
import { CheckCircle, Star, Zap, ExternalLink, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProtocolColor, formatAddress, formatPrice, openExternalLink, renderTokenLogo } from './utils/tokenDiscoveryUtils';

interface PoolDiscoveryResultsProps {
  discoveryResult: any;
  arenaResult: any;
  contractAddress: string;
}

const PoolDiscoveryResults = ({ discoveryResult, arenaResult, contractAddress }: PoolDiscoveryResultsProps) => {
  if (!discoveryResult) return null;

  const isEnhancedDiscovery = discoveryResult?.enhancedDiscovery;

  return (
    <div className="space-y-4">
      <Alert className={discoveryResult.totalPoolsFound > 0 ? "border-green-500/30 bg-green-500/10" : "border-yellow-500/30 bg-yellow-500/10"}>
        <CheckCircle className={`h-4 w-4 ${discoveryResult.totalPoolsFound > 0 ? 'text-green-400' : 'text-yellow-400'}`} />
        <AlertDescription className={discoveryResult.totalPoolsFound > 0 ? 'text-green-300' : 'text-yellow-300'}>
          Found {discoveryResult.totalPoolsFound} pool(s) across {discoveryResult.protocols.filter((p: any) => p.hasPool).length} protocol(s)
          {isEnhancedDiscovery && (
            <span className="ml-2 text-xs bg-primary/20 px-2 py-1 rounded">
              Enhanced Discovery
            </span>
          )}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discoveryResult.protocols.map((protocol: any, index: number) => (
          <Card key={index} className={`bg-background/30 border ${protocol.hasPool ? 'border-green-500/30' : 'border-border/30'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-foreground capitalize flex items-center gap-2">
                  {protocol.protocol.replace('-', ' ')}
                  {protocol.protocol === 'apex-defi' && isEnhancedDiscovery && (
                    <Zap className="w-3 h-3 text-primary" />
                  )}
                </CardTitle>
                <Badge className={getProtocolColor(protocol.protocol)}>
                  {protocol.hasPool ? 'Available' : 'Not Found'}
                </Badge>
              </div>
              {/* Protocol-specific action buttons */}
              {protocol.protocol === 'pharaoh' && protocol.hasPool && (
                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openExternalLink('https://pharaoh.exchange/liquidity')}
                    className="text-xs border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 w-full"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Add Liquidity on Pharaoh
                  </Button>
                </div>
              )}
              {protocol.protocol === 'apex-defi' && protocol.hasPool && protocol.pools && 
               protocol.pools.some((pool: any) => pool.metadata?.erc314Address) && (
                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const erc314Address = protocol.pools.find((pool: any) => pool.metadata?.erc314Address)?.metadata?.erc314Address;
                      if (erc314Address) {
                        openExternalLink(`https://apexdefi.xyz/trade/${erc314Address}`);
                      }
                    }}
                    className="text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10 w-full"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Trade on Apex DeFi
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {protocol.hasPool && protocol.pools ? (
                <div className="space-y-3">
                  {protocol.pools.map((pool: any, poolIndex: number) => (
                    <div key={poolIndex} className="p-3 bg-accent/10 rounded-lg border border-border/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {pool.metadata?.tokenInfo?.logoURI && 
                            renderTokenLogo(pool.metadata.tokenInfo.logoURI, pool.metadata.tokenInfo.symbol || pool.name)
                          }
                          <span className="text-sm font-medium text-foreground">{pool.name}</span>
                          {pool.metadata?.tokenInfo?.tags?.includes('bluechip') && (
                            <Star className="w-3 h-3 text-yellow-500" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {pool.type}
                        </Badge>
                      </div>
                      
                      {/* Enhanced pool metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-muted-foreground">TVL:</span>
                          <span className="text-green-400 ml-1">
                            ${pool.tvl > 0 ? pool.tvl.toLocaleString() : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">APY:</span>
                          <span className="text-yellow-400 ml-1">
                            {((pool.apyBase || 0) + (pool.apyReward || 0)).toFixed(2)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Volume 24h:</span>
                          <span className="text-blue-400 ml-1">
                            ${pool.volume24h > 0 ? pool.volume24h.toLocaleString() : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Token Price:</span>
                          <span className="text-cyan-400 ml-1">
                            {formatPrice(pool.metadata?.tokenPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced metadata display */}
                      {protocol.protocol === 'apex-defi' && pool.metadata && (
                        <div className="space-y-1 text-xs border-t border-border/20 pt-2">
                          {pool.metadata.registrySource && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Source:</span>
                              <span className="text-primary font-mono">
                                Enhanced Registry
                              </span>
                            </div>
                          )}
                          {pool.metadata.tokenType && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type:</span>
                              <span className="text-foreground capitalize">
                                {pool.metadata.tokenType}
                              </span>
                            </div>
                          )}
                          {pool.metadata.erc314Address && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">ERC314:</span>
                              <span className="text-blue-400 font-mono">
                                {formatAddress(pool.metadata.erc314Address)}
                              </span>
                            </div>
                          )}
                          {pool.metadata.wrapperAddress && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Wrapper:</span>
                              <span className="text-blue-400 font-mono">
                                {formatAddress(pool.metadata.wrapperAddress)}
                              </span>
                            </div>
                          )}
                          
                          {/* External links */}
                          {pool.metadata.dexScreenerUrl && (
                            <div className="flex justify-center pt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openExternalLink(pool.metadata.dexScreenerUrl)}
                                className="text-xs border-border/30 hover:bg-accent/50"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View on DexScreener
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {protocol.message || 'No pools available'}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced discovery summary */}
      {discoveryResult.totalPoolsFound > 0 && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-primary text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Enhanced Discovery Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token Address:</span>
              <span className="text-foreground font-mono">{formatAddress(contractAddress)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Pools:</span>
              <span className="text-green-400">{discoveryResult.totalPoolsFound}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Protocols:</span>
              <span className="text-yellow-400">
                {discoveryResult.protocols.filter((p: any) => p.hasPool).length} / {discoveryResult.protocols.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discovery Method:</span>
              <span className="text-primary">
                {isEnhancedDiscovery ? 'Enhanced Registry + RPC' : 'Standard RPC'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Arena Status:</span>
              <span className={arenaResult?.isArenaToken ? 'text-green-400' : 'text-yellow-400'}>
                {arenaResult?.isArenaToken ? '✅ Arena Token' : '⚠️ Not Arena'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Security Risk:</span>
              <span className={
                arenaResult?.securityRisk === 'low' ? 'text-green-400' : 
                arenaResult?.securityRisk === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }>
                {arenaResult?.securityRisk?.toUpperCase() || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Updated:</span>
              <span className="text-cyan-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PoolDiscoveryResults;
