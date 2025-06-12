
import { useState } from 'react';
import { Search, AlertCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useContractValidation } from '@/hooks/useContractValidation';
import { useTokenChecker } from '@/hooks/useTokenChecker';
import TokenDiscoveryForm from './TokenDiscoveryForm';
import TokenSecurityAnalysis from './TokenSecurityAnalysis';
import PoolDiscoveryResults from './PoolDiscoveryResults';

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

  const handleAddressChange = (address: string) => {
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
        <TokenDiscoveryForm
          contractAddress={contractAddress}
          setContractAddress={handleAddressChange}
          onDiscover={handleDiscover}
          loading={loading}
          arenaCheckLoading={arenaCheckLoading}
        />

        {error && (
          <Alert className="border-destructive/30 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <TokenSecurityAnalysis arenaResult={arenaResult} />

        <PoolDiscoveryResults 
          discoveryResult={discoveryResult}
          arenaResult={arenaResult}
          contractAddress={contractAddress}
        />
      </CardContent>
    </Card>
  );
};

export default TokenDiscovery;
