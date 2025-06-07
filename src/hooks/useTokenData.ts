
import { useQuery } from '@tanstack/react-query';

interface TokenPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

interface DexScreenerResponse {
  schemaVersion: string;
  pairs: TokenPair[];
}

const fetchTokenData = async (): Promise<TokenPair | null> => {
  const response = await fetch(
    'https://api.dexscreener.com/latest/dex/pairs/avalanche/0xAfbD649cf0e49E841b3338AC8BF887c2421acE93'
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch token data');
  }
  
  const data: DexScreenerResponse = await response.json();
  return data.pairs?.[0] || null;
};

export const useTokenData = () => {
  return useQuery({
    queryKey: ['tokenData', '0x8D8B084269f4b2Ad111b60793e9f3577A7795605'],
    queryFn: fetchTokenData,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
