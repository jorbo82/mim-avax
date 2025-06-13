
import { useQuery } from '@tanstack/react-query';

export interface DeFiLlamaPool {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
  apyBase: number;
  apyReward: number;
  pool: string;
  count: number;
  outlier: boolean;
  il7d: number;
  apyBase7d: number;
  apyMean30d: number;
  volumeUsd1d: number;
  volumeUsd7d: number;
  apyBaseInception: number;
  apyRewardInception: number;
  stablecoin: boolean;
  ilRisk: boolean;
  exposure: string;
  predictions: {
    predictedClass: string;
    predictedProbability: number;
    binnedConfidence: number;
  };
  poolMeta: string;
  mu: number;
  sigma: number;
  underlyingTokens: string[];
  url: string;
  rewardTokens: string[];
}

const fetchAvalanchePools = async (): Promise<DeFiLlamaPool[]> => {
  const response = await fetch('https://yields.llama.fi/pools');
  
  if (!response.ok) {
    throw new Error('Failed to fetch pools');
  }
  
  const data = await response.json();
  
  // Filter for Avalanche pools
  return data.data.filter((pool: DeFiLlamaPool) => pool.chain === 'Avalanche');
};

export const useDeFiLlamaYields = () => {
  return useQuery({
    queryKey: ['defillama-yields', 'avalanche'],
    queryFn: fetchAvalanchePools,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 4 * 60 * 1000, // Consider data stale after 4 minutes
    retry: 3,
  });
};
