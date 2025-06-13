
import { useQuery } from '@tanstack/react-query';

export interface TokenPrice {
  decimals: number;
  price: number;
  symbol: string;
  timestamp: number;
  confidence: number;
}

export interface TokenPriceResponse {
  coins: Record<string, TokenPrice>;
}

const fetchTokenPrice = async (tokenAddress: string): Promise<TokenPrice | null> => {
  const tokenId = `avalanche:${tokenAddress}`;
  const response = await fetch(`https://coins.llama.fi/prices/current/${tokenId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch token price');
  }
  
  const data: TokenPriceResponse = await response.json();
  return data.coins[tokenId] || null;
};

export const useDeFiLlamaTokenPrice = (tokenAddress: string) => {
  return useQuery({
    queryKey: ['defillama-token-price', tokenAddress],
    queryFn: () => fetchTokenPrice(tokenAddress),
    enabled: !!tokenAddress,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    staleTime: 25 * 1000, // Consider data stale after 25 seconds
    retry: 3,
  });
};

const fetchMultipleTokenPrices = async (tokenAddresses: string[]): Promise<Record<string, TokenPrice>> => {
  const tokens = tokenAddresses.map(addr => `avalanche:${addr}`).join(',');
  const response = await fetch(`https://coins.llama.fi/prices/current/${tokens}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch token prices');
  }
  
  const data: TokenPriceResponse = await response.json();
  return data.coins;
};

export const useDeFiLlamaMultipleTokenPrices = (tokenAddresses: string[]) => {
  return useQuery({
    queryKey: ['defillama-multiple-token-prices', tokenAddresses],
    queryFn: () => fetchMultipleTokenPrices(tokenAddresses),
    enabled: tokenAddresses.length > 0,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    staleTime: 25 * 1000, // Consider data stale after 25 seconds
    retry: 3,
  });
};
