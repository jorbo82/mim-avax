
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Droplets, Zap } from "lucide-react";
import { useTokenData } from "@/hooks/useTokenData";
import { formatPrice, formatLargeNumber, formatPercentage } from "@/utils/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import DeFiAggregatorButton from "./DeFiAggregatorButton";
import MimeMeButton from "./MimeMeButton";

const TokenPriceWidget = () => {
  const { data: tokenData, isLoading, error } = useTokenData();

  if (error) {
    return (
      <div className="w-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md border-b border-purple-500/30 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-purple-300 text-sm">Unable to load live token data</p>
            <div className="flex gap-3">
              <MimeMeButton />
              <DeFiAggregatorButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !tokenData) {
    return (
      <div className="w-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md border-b border-purple-500/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 bg-purple-500/20" />
                <Skeleton className="h-4 w-12 bg-purple-500/20" />
              </div>
              <Skeleton className="h-4 w-24 bg-purple-500/20" />
              <Skeleton className="h-4 w-20 bg-purple-500/20" />
              <Skeleton className="h-4 w-16 bg-purple-500/20" />
            </div>
            <div className="flex gap-3">
              <MimeMeButton />
              <DeFiAggregatorButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const priceChange24h = tokenData.priceChange?.h24 || 0;
  const isPositive = priceChange24h >= 0;

  return (
    <div className="w-full bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-indigo-900/30 backdrop-blur-md border-b border-purple-500/30 py-4 relative overflow-hidden">
      {/* Magical sparkles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-3 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8 flex-wrap text-sm md:text-base">
            {/* Price */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <span className="text-2xl font-bold text-white">
                {formatPrice(tokenData.priceUsd || '0')}
              </span>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {formatPercentage(priceChange24h)}
                </span>
              </div>
            </div>

            {/* Market Cap */}
            <div className="flex items-center gap-2 text-purple-200">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-purple-300">MCap:</span>
              <span className="font-semibold text-white">
                ${formatLargeNumber(tokenData.marketCap || 0)}
              </span>
            </div>

            {/* Volume 24h */}
            <div className="flex items-center gap-2 text-purple-200">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-xs text-purple-300">Vol 24h:</span>
              <span className="font-semibold text-white">
                ${formatLargeNumber(tokenData.volume?.h24 || 0)}
              </span>
            </div>

            {/* Liquidity */}
            <div className="flex items-center gap-2 text-purple-200">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-purple-300">Liquidity:</span>
              <span className="font-semibold text-white">
                ${formatLargeNumber(tokenData.liquidity?.usd || 0)}
              </span>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">LIVE</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex gap-3">
            <MimeMeButton />
            <DeFiAggregatorButton />
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden mt-4 flex justify-center gap-3">
          <MimeMeButton />
          <DeFiAggregatorButton />
        </div>
      </div>
    </div>
  );
};

export default TokenPriceWidget;
