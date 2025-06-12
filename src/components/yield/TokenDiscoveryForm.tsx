
import { Search, TrendingUp, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TokenDiscoveryFormProps {
  contractAddress: string;
  setContractAddress: (address: string) => void;
  onDiscover: () => void;
  loading: boolean;
  arenaCheckLoading: boolean;
}

const TokenDiscoveryForm = ({
  contractAddress,
  setContractAddress,
  onDiscover,
  loading,
  arenaCheckLoading
}: TokenDiscoveryFormProps) => {
  const handleExampleClick = (address: string) => {
    setContractAddress(address);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter token contract address (0x...)"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="bg-background/50 border-border/50"
        />
        <Button 
          onClick={onDiscover}
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
    </div>
  );
};

export default TokenDiscoveryForm;
