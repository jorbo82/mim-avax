
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBestRates } from "@/hooks/useDeFiData";

interface ExchangeComparisonProps {
  fromToken: string;
  toToken: string;
}

const ExchangeComparison = ({ fromToken, toToken }: ExchangeComparisonProps) => {
  const { rates, loading, error } = useBestRates(fromToken, toToken);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white">Exchange Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-blue-800/30 rounded-lg space-y-2">
              <Skeleton className="h-4 w-24 bg-blue-700/50" />
              <Skeleton className="h-3 w-16 bg-blue-700/50" />
              <Skeleton className="h-3 w-20 bg-blue-700/50" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white">Exchange Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-300">Failed to load exchange data</p>
        </CardContent>
      </Card>
    );
  }

  if (rates.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900/50 to-slate-900/50 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-white">Exchange Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            {fromToken === toToken 
              ? "Select different tokens to compare rates" 
              : "No trading pairs found for selected tokens"
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-white">
          Exchange Comparison
          <span className="text-sm font-normal text-blue-300 ml-2">
            ({fromToken} → {toToken})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rates.map((rate, index) => (
          <div
            key={`${rate.exchange_slug}-${index}`}
            className={`p-3 rounded-lg border ${
              index === 0
                ? 'bg-green-900/30 border-green-500/50'
                : 'bg-blue-800/30 border-blue-600/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{rate.exchange_name}</span>
                {index === 0 && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    Best
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-300 hover:text-white p-1"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Price:</span>
                <span className="text-white font-mono">{rate.price.toFixed(6)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">24h Change:</span>
                <div className="flex items-center gap-1">
                  {rate.price_change_24h >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`${rate.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {rate.price_change_24h.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Liquidity:</span>
                <span className="text-white">
                  ${rate.liquidity_usd ? (rate.liquidity_usd / 1000).toFixed(1) + 'K' : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">24h Volume:</span>
                <span className="text-white">
                  ${rate.volume_24h_usd ? (rate.volume_24h_usd / 1000).toFixed(1) + 'K' : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {rates.length === 0 && (
          <div className="text-center py-6">
            <p className="text-blue-300">No rates available for this pair</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExchangeComparison;
