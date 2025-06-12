
import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Loader2, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useContractValidation } from '@/hooks/useContractValidation';
import { useTokenChecker } from '@/hooks/useTokenChecker';
import TokenSecurityAnalysis from './components/TokenSecurityAnalysis';
import PoolCard from './components/PoolCard';
import DiscoverySummary from './components/DiscoverySummary';
import GandalfSummary from './components/GandalfSummary';

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

        {/* Example addresses */}
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

        {/* Token Security Analysis */}
        <TokenSecurityAnalysis arenaResult={arenaResult} />

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
                <PoolCard 
                  key={index} 
                  protocol={protocol} 
                  isEnhancedDiscovery={isEnhancedDiscovery} 
                />
              ))}
            </div>

            {/* Gandalf's Wisdom */}
            <GandalfSummary
              tokenAddress={contractAddress}
              discoveryResult={discoveryResult}
              arenaResult={arenaResult}
            />

            {/* Discovery Summary */}
            <DiscoverySummary 
              discoveryResult={discoveryResult}
              contractAddress={contractAddress}
              arenaResult={arenaResult}
              isEnhancedDiscovery={isEnhancedDiscovery}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenDiscovery;
