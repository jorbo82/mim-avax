
import { Shield, AlertTriangle, AlertCircle, CheckCircle, Globe, ExternalLink, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRiskColor, formatAddress, openExternalLink } from '../utils/tokenDiscoveryUtils';

interface TokenSecurityAnalysisProps {
  arenaResult: any;
}

const TokenSecurityAnalysis = ({ arenaResult }: TokenSecurityAnalysisProps) => {
  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return Shield;
      case 'medium': return AlertTriangle;
      case 'high': return AlertCircle;
      default: return AlertCircle;
    }
  };

  if (!arenaResult) return null;

  return (
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
  );
};

export default TokenSecurityAnalysis;
