
import { useState, useEffect } from "react";
import { ArrowUpDown, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeFiTokens, useBestRates } from "@/hooks/useDeFiData";
import { useToast } from "@/hooks/use-toast";

interface SwapInterfaceProps {
  selectedFromToken: string;
  selectedToToken: string;
  onTokenChange: (fromToken: string, toToken: string) => void;
}

const SwapInterface = ({ selectedFromToken, selectedToToken, onTokenChange }: SwapInterfaceProps) => {
  const [fromAmount, setFromAmount] = useState<string>('1');
  const [toAmount, setToAmount] = useState<string>('0');
  const [slippage, setSlippage] = useState<string>('0.5');
  const [isSwapping, setIsSwapping] = useState(false);
  
  const { tokens, loading: tokensLoading } = useDeFiTokens();
  const { rates, loading: ratesLoading } = useBestRates(selectedFromToken, selectedToToken);
  const { toast } = useToast();

  // Calculate estimated output
  useEffect(() => {
    if (rates.length > 0 && fromAmount) {
      const bestRate = rates[0];
      const estimated = (parseFloat(fromAmount) * bestRate.price).toFixed(6);
      setToAmount(estimated);
    } else {
      setToAmount('0');
    }
  }, [rates, fromAmount]);

  const handleSwapTokens = () => {
    onTokenChange(selectedToToken, selectedFromToken);
  };

  const handleSwap = async () => {
    setIsSwapping(true);
    
    // Simulate swap process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Swap Simulated Successfully!",
        description: `Swapped ${fromAmount} ${selectedFromToken} for ${toAmount} ${selectedToToken}`,
      });
      
      setFromAmount('1');
      setToAmount('0');
    } catch (error) {
      toast({
        title: "Swap Failed",
        description: "There was an error processing your swap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSwapping(false);
    }
  };

  const bestRate = rates.length > 0 ? rates[0] : null;

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Swap Tokens</CardTitle>
          <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <label className="text-sm text-purple-300">From</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1 bg-purple-800/50 border-purple-600 text-white"
              placeholder="0.0"
            />
            <Select value={selectedFromToken} onValueChange={(value) => onTokenChange(value, selectedToToken)}>
              <SelectTrigger className="w-32 bg-purple-800/50 border-purple-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.id} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapTokens}
            className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white rounded-full"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm text-purple-300">To</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={toAmount}
              readOnly
              className="flex-1 bg-purple-800/50 border-purple-600 text-white"
              placeholder="0.0"
            />
            <Select value={selectedToToken} onValueChange={(value) => onTokenChange(selectedFromToken, value)}>
              <SelectTrigger className="w-32 bg-purple-800/50 border-purple-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.id} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rate Info */}
        {bestRate && (
          <div className="p-3 bg-purple-800/30 rounded-lg space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-purple-300">Best Rate:</span>
              <span className="text-white">{bestRate.exchange_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-300">Price:</span>
              <span className="text-white">{bestRate.price.toFixed(6)} {selectedToToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-300">24h Change:</span>
              <span className={`${bestRate.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {bestRate.price_change_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        )}

        {/* Slippage Setting */}
        <div className="space-y-2">
          <label className="text-sm text-purple-300">Slippage Tolerance (%)</label>
          <Input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white"
            step="0.1"
            min="0.1"
            max="50"
          />
        </div>

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!fromAmount || !toAmount || isSwapping || ratesLoading || parseFloat(fromAmount) <= 0}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3"
        >
          {isSwapping ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Swapping...
            </>
          ) : ratesLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Finding Best Rate...
            </>
          ) : (
            `Swap ${selectedFromToken} for ${selectedToToken}`
          )}
        </Button>

        {/* Beta Notice */}
        <p className="text-xs text-yellow-400 text-center">
          ⚠️ Beta Mode: This is a simulated swap for demonstration purposes
        </p>
      </CardContent>
    </Card>
  );
};

export default SwapInterface;
