
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Droplets, Zap } from "lucide-react";
import { useTokenData } from "@/hooks/useTokenData";
import { formatPrice, formatLargeNumber, formatPercentage } from "@/utils/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import MimeMeButton from "./MimeMeButton";
import TokenAnalysisButton from "./TokenAnalysisButton";

const TokenPriceWidget = () => {
  const { data: tokenData, isLoading, error } = useTokenData();

  if (error) {
    return (
      <div className="w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Unable to load live token data</p>
            <div className="hidden lg:flex gap-3">
              <MimeMeButton />
              <TokenAnalysisButton />
            </div>
          </div>
          {/* Mobile Action Buttons - Stacked */}
          <div className="lg:hidden mt-3 flex flex-col sm:flex-row gap-2">
            <MimeMeButton />
            <TokenAnalysisButton />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !tokenData) {
    return (
      <div className="w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700" />
                <Skeleton className="h-4 w-12 bg-neutral-200 dark:bg-neutral-700" />
              </div>
              <Skeleton className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="hidden lg:flex gap-3">
              <MimeMeButton />
              <TokenAnalysisButton />
            </div>
          </div>
          {/* Mobile Action Buttons - Stacked */}
          <div className="lg:hidden mt-4 flex flex-col sm:flex-row gap-2">
            <MimeMeButton />
            <TokenAnalysisButton />
          </div>
        </div>
      </div>
    );
  }

  const priceChange24h = tokenData.priceChange?.h24 || 0;
  const isPositive = priceChange24h >= 0;

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 flex-wrap text-sm md:text-base">
            {/* Price */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-brand-primary" />
              <span className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {formatPrice(tokenData.priceUsd || '0')}
              </span>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {formatPercentage(priceChange24h)}
                </span>
              </div>
            </div>

            {/* Market Cap */}
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">MCap:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                ${formatLargeNumber(tokenData.marketCap || 0)}
              </span>
            </div>

            {/* Volume 24h */}
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Vol 24h:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                ${formatLargeNumber(tokenData.volume?.h24 || 0)}
              </span>
            </div>

            {/* Liquidity */}
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Droplets className="w-4 h-4" />
              <span className="text-xs">Liquidity:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                ${formatLargeNumber(tokenData.liquidity?.usd || 0)}
              </span>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">LIVE</span>
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex gap-3">
            <MimeMeButton />
            <TokenAnalysisButton />
          </div>
        </div>

        {/* Mobile Action Buttons - Responsive */}
        <div className="lg:hidden mt-4 flex flex-col sm:flex-row gap-2">
          <MimeMeButton />
          <TokenAnalysisButton />
        </div>
      </div>
    </div>
  );
};

export default TokenPriceWidget;
