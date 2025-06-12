
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAddress } from '../utils/tokenDiscoveryUtils';

interface DiscoverySummaryProps {
  discoveryResult: any;
  contractAddress: string;
  arenaResult: any;
  isEnhancedDiscovery: boolean;
}

const DiscoverySummary = ({ discoveryResult, contractAddress, arenaResult, isEnhancedDiscovery }: DiscoverySummaryProps) => {
  if (!discoveryResult || discoveryResult.totalPoolsFound === 0) return null;

  return (
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
  );
};

export default DiscoverySummary;
