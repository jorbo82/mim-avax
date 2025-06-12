
import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Loader2, TrendingUp, ExternalLink, DollarSign, Star, Zap, Shield, AlertTriangle, UserCheck, Globe, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useContractValidation } from '@/hooks/useContractValidation';
import { useTokenChecker } from '@/hooks/useTokenChecker';

const TokenDiscovery = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [discoveryResult, setDiscoveryResult] = useState<any>(null);
  const { discoverPools, loading, error } = useContractValidation();
  const { checkToken, loading: arenaCheckLoading, result: arenaResult } = useTokenChecker();

  const handleDiscover = async () => {
    if (!contractAddress.trim()) return;

    try {
      // Run both discovery and Arena check in parallel
      const [poolResult] = await Promise.all([
        discoverPools(contractAddress.trim()),
        checkToken(contractAddress.trim())
      ]);
      
      setDiscoveryResult(poolResult);
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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return Shield;
      case 'medium': return AlertTriangle;
      case 'high': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatPrice = (price: number) => {
    if (!price || price === 0) return 'N/A';
    if (price < 0.01) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(4)}`;
  };

  const getEnhancedPoolName = (pool: any, protocol: any) => {
    // Try to get token symbol from various sources
    let tokenSymbol = '';
    
    // 1. From pool metadata tokenInfo
    if (pool.metadata?.tokenInfo?.symbol) {
      tokenSymbol = pool.metadata.tokenInfo.symbol;
    }
    // 2. From DexScreener data in metadata
    else if (pool.metadata?.dexScreenerData?.baseToken?.symbol) {
      tokenSymbol = pool.metadata.dexScreenerData.baseToken.symbol;
    }
    // 3. From Arena result if available
    else if (arenaResult && protocol.protocol === 'apex-defi') {
      // Try to extract symbol from contract validation or other sources
      tokenSymbol = arenaResult.tokenSymbol || '';
    }
    
    // Format the pool name based on available information
    if (tokenSymbol) {
      // For different pool types, format appropriately
      if (pool.type === 'liquidity_pool' || pool.type === 'amm') {
        // If we have pair information, show as TOKEN/PAIR
        const quoteSymbol = pool.metadata?.dexScreenerData?.quoteToken?.symbol || 'AVAX';
        return `${tokenSymbol}/${quoteSymbol} Pool`;
      } else if (pool.type === 'native_token' || pool.type === 'erc314') {
        return `${tokenSymbol} Native Pool`;
      } else if (pool.type === 'wrapped_token') {
        return `${tokenSymbol} Wrapped Pool`;
      } else {
        return `${tokenSymbol} ${pool.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
      }
    }
    
    // Fallback to original pool name
    return pool.name || 'Unknown Pool';
  };

  const openExternalLink = (url: string) => {
    try {
      // Try to open in a new window first
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // If popup is blocked, fallback to location.href
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // In sandboxed iframe, use parent window if available
        if (window.parent && window.parent !== window) {
          window.parent.location.href = url;
        } else {
          window.location.href = url;
        }
      }
    } catch (error) {
      console.error('Failed to open external link:', error);
      // Final fallback
      window.location.href = url;
    }
  };

  const renderTokenLogo = (logoURI: string, symbol: string) => {
    if (logoURI && logoURI.startsWith('ipfs://')) {
      return (
        <img 
          src={`https://ipfs.io/ipfs/${logoURI.replace('ipfs://', '')}`}
          alt={symbol}
          className="w-6 h-6 rounded-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    return null;
  };

  const isEnhancedDiscovery = discoveryResult?.enhancedDiscovery;

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Search className="w-5 h-5" />
          Enhanced Multi-Protocol Pool Discovery
          {isEnhancedDiscovery && (
            <Badge variant="outline" className="text-xs bg-primary/10">
              <Zap className="w-3 h-3 mr-1" />
              Enhanced
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter a token address to discover yield opportunities with enhanced Apex registry and real-time pricing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter token contract address (0x...)"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="bg-background/50 border-border/50"
          />
          <Button 
            onClick={handleDiscover}
            disabled={loading || arenaCheckLoading || !contractAddress.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {(loading || arenaCheckLoading) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Updated example addresses with LAMBO and MIM */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try these enhanced examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick('0x6F43fF77A9C0Cf552b5b653268fBFe26A052429b')}
              className="text-xs border-border/30 hover:bg-accent/50 justify-start"
            >
              <TrendingUp className="w-3 h-3 mr-2 text-green-500" />
              LAMBO Token
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick('0x8D8B084269f4b2Ad111b60793e9f3577A7795605')}
              className="text-xs border-border/30 hover:bg-accent/50 justify-start"
            >
              <DollarSign className="w-3 h-3 mr-2 text-blue-500" />
              MIM Token
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="border-destructive/30 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Enhanced Token Security Analysis Section */}
        {arenaResult && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Token Security Analysis
              </h3>
              
              {/* Arena Token Status */}
              {arenaResult.isArenaToken ? (
                <Alert className="border-green-500/30 bg-green-500/10">
                  <Shield className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-300">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✅</span>
                      <span className="font-semibold">Forged in the Arena Trenches</span>
                    </div>
                    <div className="mt-1 text-xs">
                      This token was created by the verified Arena deployer address.
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-yellow-500/30 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <AlertDescription className="text-yellow-300">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      <span className="font-semibold">DYOR - Not an Arena Token</span>
                    </div>
                    <div className="mt-1 text-xs">
                      This token was not created by the Arena deployer. Please do your own research.
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Comprehensive Security Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Risk Level Card */}
                <Card className={`bg-background/30 border ${getRiskColor(arenaResult.securityRisk)}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      {(() => {
                        const RiskIcon = getRiskIcon(arenaResult.securityRisk);
                        return <RiskIcon className="w-4 h-4" />;
                      })()}
                      Security Risk Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getRiskColor(arenaResult.securityRisk)}>
                      {arenaResult.securityRisk.toUpperCase()}
                    </Badge>
                    {arenaResult.warnings && arenaResult.warnings.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-muted-foreground">Warnings:</p>
                        {arenaResult.warnings.map((warning: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-yellow-400">{warning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contract Information Card */}
                <Card className="bg-background/30 border border-border/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      Contract Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Creator:</span>
                      <span className="text-xs font-mono text-foreground">
                        {formatAddress(arenaResult.creatorAddress)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Verified:</span>
                      <div className="flex items-center gap-1">
                        {arenaResult.isVerified ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-400">Yes</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-400">No</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* External Links */}
              <div className="flex flex-wrap gap-2">
                {arenaResult.snowtraceUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openExternalLink(arenaResult.snowtraceUrl)}
                    className="text-xs border-border/30 hover:bg-accent/50"
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    View on Snowtrace
                  </Button>
                )}
                {arenaResult.dexScreenerUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openExternalLink(arenaResult.dexScreenerUrl)}
                    className="text-xs border-border/30 hover:bg-accent/50"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on DexScreener
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {discoveryResult && (
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
                    {/* Add Pharaoh Exchange link when pools are found */}
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
                    {/* Add Apex DeFi trade link when ERC314 address is available */}
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
                                <span className="text-sm font-medium text-foreground">
                                  {getEnhancedPoolName(pool, protocol)}
                                </span>
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
        )}
      </CardContent>
    </Card>
  );
};

export default TokenDiscovery;
