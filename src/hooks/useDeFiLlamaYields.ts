
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

export interface EnhancedPoolAnalytics {
  pool: DeFiLlamaPool;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  sustainabilityScore: number;
  liquidityHealth: number;
  protocolReputation: number;
  yieldTrend: 'Increasing' | 'Stable' | 'Decreasing';
  tvlWeightedApy: number;
  volumeToTvlRatio: number;
  impermanentLossRisk: number;
}

const fetchAvalanchePools = async (): Promise<DeFiLlamaPool[]> => {
  const response = await fetch('https://yields.llama.fi/pools');
  
  if (!response.ok) {
    throw new Error('Failed to fetch pools');
  }
  
  const data = await response.json();
  
  // Filter for Avalanche pools only
  return data.data.filter((pool: DeFiLlamaPool) => pool.chain === 'Avalanche');
};

const analyzePool = (pool: DeFiLlamaPool): EnhancedPoolAnalytics => {
  // Risk scoring algorithm
  let riskScore = 0;
  
  // APY sustainability risk
  if (pool.apy > 200) riskScore += 4;
  else if (pool.apy > 100) riskScore += 3;
  else if (pool.apy > 50) riskScore += 2;
  else if (pool.apy > 20) riskScore += 1;
  
  // TVL risk
  if (pool.tvlUsd < 100000) riskScore += 3;
  else if (pool.tvlUsd < 1000000) riskScore += 2;
  else if (pool.tvlUsd < 10000000) riskScore += 1;
  
  // Protocol reputation
  const reputableProtocols = ['aave', 'compound', 'traderjoe', 'pangolin', 'benqi', 'curve'];
  const protocolReputation = reputableProtocols.includes(pool.project.toLowerCase()) ? 0 : 2;
  riskScore += protocolReputation;
  
  // Impermanent Loss risk
  if (pool.ilRisk) riskScore += 2;
  if (!pool.stablecoin) riskScore += 1;
  
  // Risk level classification
  let riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  if (riskScore <= 2) riskLevel = 'Low';
  else if (riskScore <= 4) riskLevel = 'Medium';
  else if (riskScore <= 7) riskLevel = 'High';
  else riskLevel = 'Extreme';
  
  // Sustainability score (0-100)
  const sustainabilityScore = Math.max(0, 100 - (riskScore * 10) - (pool.outlier ? 20 : 0));
  
  // Liquidity health (volume/TVL ratio)
  const volumeToTvlRatio = pool.volumeUsd1d / pool.tvlUsd;
  const liquidityHealth = Math.min(100, volumeToTvlRatio * 1000);
  
  // Yield trend analysis
  let yieldTrend: 'Increasing' | 'Stable' | 'Decreasing' = 'Stable';
  if (pool.apyBase7d && pool.apy) {
    const weeklyChange = ((pool.apy - pool.apyBase7d) / pool.apyBase7d) * 100;
    if (weeklyChange > 5) yieldTrend = 'Increasing';
    else if (weeklyChange < -5) yieldTrend = 'Decreasing';
  }
  
  // TVL-weighted APY
  const tvlWeightedApy = pool.apy * Math.min(1, pool.tvlUsd / 1000000);
  
  // IL risk calculation
  const impermanentLossRisk = pool.ilRisk ? (pool.stablecoin ? 20 : 60) : 10;
  
  return {
    pool,
    riskScore,
    riskLevel,
    sustainabilityScore,
    liquidityHealth,
    protocolReputation: 100 - (protocolReputation * 50),
    yieldTrend,
    tvlWeightedApy,
    volumeToTvlRatio,
    impermanentLossRisk
  };
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

export const useEnhancedAvalancheYields = (minTvl = 0, minApy = 0, maxRisk: 'Low' | 'Medium' | 'High' | 'Extreme' = 'Extreme') => {
  const { data: pools, isLoading, error } = useDeFiLlamaYields();
  
  const enhancedPools = pools?.map(analyzePool).filter(analytics => {
    if (analytics.pool.tvlUsd < minTvl) return false;
    if (analytics.pool.apy < minApy) return false;
    
    const riskLevels = ['Low', 'Medium', 'High', 'Extreme'];
    const maxRiskIndex = riskLevels.indexOf(maxRisk);
    const poolRiskIndex = riskLevels.indexOf(analytics.riskLevel);
    
    return poolRiskIndex <= maxRiskIndex;
  });
  
  return {
    enhancedPools,
    isLoading,
    error,
    topYieldPools: enhancedPools?.sort((a, b) => b.pool.apy - a.pool.apy).slice(0, 10),
    safestHighYield: enhancedPools?.filter(p => p.riskLevel === 'Low' || p.riskLevel === 'Medium')
      .sort((a, b) => b.pool.apy - a.pool.apy).slice(0, 5),
    sustainablePools: enhancedPools?.filter(p => p.sustainabilityScore > 70)
      .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore),
    analytics: {
      totalPools: enhancedPools?.length || 0,
      averageApy: enhancedPools?.reduce((sum, p) => sum + p.pool.apy, 0) / (enhancedPools?.length || 1),
      totalTvl: enhancedPools?.reduce((sum, p) => sum + p.pool.tvlUsd, 0) || 0,
      riskDistribution: {
        low: enhancedPools?.filter(p => p.riskLevel === 'Low').length || 0,
        medium: enhancedPools?.filter(p => p.riskLevel === 'Medium').length || 0,
        high: enhancedPools?.filter(p => p.riskLevel === 'High').length || 0,
        extreme: enhancedPools?.filter(p => p.riskLevel === 'Extreme').length || 0,
      }
    }
  };
};
