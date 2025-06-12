
import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useTokenChecker } from '@/hooks/useTokenChecker';

const TokenChecker = () => {
  const [contractAddress, setContractAddress] = useState('');
  const { checkToken, loading, error, result } = useTokenChecker();

  const handleCheck = async () => {
    if (!contractAddress.trim()) return;
    await checkToken(contractAddress.trim());
  };

  const handleExampleClick = (address: string) => {
    setContractAddress(address);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Arena Token Checker
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Verify if tokens were forged in the Arena trenches or need additional research
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
            onClick={handleCheck}
            disabled={loading || !contractAddress.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try this example:</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExampleClick('0x7F2B1D59b13999a8581d8eF382D00b733C2c70fB')}
            className="text-xs border-border/30 hover:bg-accent/50"
          >
            <Shield className="w-3 h-3 mr-2" />
            Test Token (0x7F2B...70fB)
          </Button>
        </div>

        {error && (
          <Alert className="border-destructive/30 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-4">
            {result.isArenaToken ? (
              <Alert className="border-green-500/30 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✅</span>
                    <span className="font-semibold">Forged in the Arena Trenches</span>
                  </div>
                  <div className="mt-2 text-sm">
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
                  <div className="mt-2 text-sm">
                    This token was not created by the Arena deployer. Please do your own research.
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Card className="bg-background/30 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground">Token Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Token Address:</span>
                    <span className="text-foreground ml-2 font-mono">
                      {formatAddress(contractAddress)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Creator:</span>
                    <span className="text-foreground ml-2 font-mono">
                      {formatAddress(result.creatorAddress)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Verified:</span>
                    <Badge 
                      variant="outline" 
                      className={result.isVerified ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'}
                    >
                      {result.isVerified ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Security Status:</span>
                    <Badge 
                      variant="outline" 
                      className={result.securityRisk === 'low' ? 'text-green-400 border-green-500/30' : 
                                result.securityRisk === 'medium' ? 'text-yellow-400 border-yellow-500/30' : 
                                'text-red-400 border-red-500/30'}
                    >
                      {result.securityRisk.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {result.warnings && result.warnings.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Security Warnings:</span>
                    <div className="space-y-1">
                      {result.warnings.map((warning, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-300">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {result.snowtraceUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openExternalLink(result.snowtraceUrl)}
                      className="text-xs border-border/30 hover:bg-accent/50"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View on Snowtrace
                    </Button>
                  )}
                  {result.dexScreenerUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openExternalLink(result.dexScreenerUrl)}
                      className="text-xs border-border/30 hover:bg-accent/50"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View on DexScreener
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenChecker;
