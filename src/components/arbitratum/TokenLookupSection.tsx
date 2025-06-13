
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useDeFiLlamaTokenPrice } from '@/hooks/useDeFiLlamaTokens';

export const TokenLookupSection = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  
  const { data: tokenPrice, isLoading, error, refetch } = useDeFiLlamaTokenPrice(searchAddress);

  const handleSearch = () => {
    if (tokenAddress.trim()) {
      setSearchAddress(tokenAddress.trim());
    }
  };

  const handleExampleToken = (address: string, name: string) => {
    setTokenAddress(address);
    setSearchAddress(address);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Token Price Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter Avalanche token address (0x...)"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={!tokenAddress.trim()}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleToken('0x0000000000000000000000000000000000000000', 'AVAX')}
            >
              AVAX
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleToken('0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', 'USDC')}
            >
              USDC
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleToken('0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', 'USDt')}
            >
              USDt
            </Button>
          </div>

          {isLoading && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="text-red-600 dark:text-red-400">
                  <p className="font-semibold">Error fetching token data</p>
                  <p className="text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
                  <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {tokenPrice && searchAddress && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{tokenPrice.symbol}</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchAddress.slice(0, 6)}...{searchAddress.slice(-4)}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-white/50">
                      Avalanche
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-2xl font-bold flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        {tokenPrice.price.toFixed(tokenPrice.price < 1 ? 6 : 2)}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Decimals</p>
                      <p className="text-lg font-semibold">{tokenPrice.decimals}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">{(tokenPrice.confidence * 100).toFixed(1)}%</p>
                        {tokenPrice.confidence >= 0.9 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="text-sm">
                        {new Date(tokenPrice.timestamp * 1000).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {searchAddress && !tokenPrice && !isLoading && !error && (
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <p className="text-yellow-600 dark:text-yellow-400">
                  No price data found for this token address. It may not be tracked by DeFiLlama or the address might be incorrect.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
