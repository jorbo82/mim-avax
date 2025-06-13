
import { useMemo } from 'react';
import { useDeFiLlamaYields, DeFiLlamaPool } from './useDeFiLlamaYields';

export interface ArbitrageOpportunity {
  tokenPair: string;
  yieldDifference: number;
  highestAPY: {
    apy: number;
    protocol: string;
    tvl: number;
    poolId: string;
    pool: DeFiLlamaPool;
  };
  lowestAPY: {
    apy: number;
    protocol: string;
    tvl: number;
    poolId: string;
    pool: DeFiLlamaPool;
  };
  potentialProfit: number;
  riskAssessment: {
    score: number;
    level: 'Low' | 'Medium' | 'High';
    factors: {
      tvlRisk: number;
      protocolRisk: number;
      apyRisk: number;
    };
  };
}

const assessRisk = (poolA: DeFiLlamaPool, poolB: DeFiLlamaPool) => {
  let riskScore = 0;
  const factors = { tvlRisk: 0, protocolRisk: 0, apyRisk: 0 };

  // TVL difference risk
  const tvlRatio = Math.min(poolA.tvlUsd, poolB.tvlUsd) / Math.max(poolA.tvlUsd, poolB.tvlUsd);
  if (tvlRatio < 0.1) {
    riskScore += 3;
    factors.tvlRisk = 3;
  } else if (tvlRatio < 0.5) {
    riskScore += 2;
    factors.tvlRisk = 2;
  } else {
    riskScore += 1;
    factors.tvlRisk = 1;
  }

  // Protocol reputation (simplified)
  const reputableProtocols = ['aave', 'compound', 'uniswap', 'sushiswap', 'curve', 'traderjoe', 'pangolin'];
  const protocolARep = reputableProtocols.includes(poolA.project.toLowerCase()) ? 0 : 2;
  const protocolBRep = reputableProtocols.includes(poolB.project.toLowerCase()) ? 0 : 2;
  riskScore += protocolARep + protocolBRep;
  factors.protocolRisk = protocolARep + protocolBRep;

  // APY sustainability risk
  if (poolA.apy > 100 || poolB.apy > 100) {
    riskScore += 2;
    factors.apyRisk = 2;
  }

  const level = riskScore <= 3 ? 'Low' : riskScore <= 6 ? 'Medium' : 'High';

  return { score: riskScore, level, factors } as const;
};

export const useDeFiLlamaArbitrage = (minProfitThreshold = 0.5) => {
  const { data: pools, isLoading, error } = useDeFiLlamaYields();

  const opportunities = useMemo(() => {
    if (!pools) return [];

    // Group pools by similar token pairs
    const tokenGroups: Record<string, DeFiLlamaPool[]> = {};
    
    pools.forEach(pool => {
      const symbols = pool.symbol.toLowerCase().split(/[-\/]/);
      const key = symbols.sort().join('-');
      
      if (!tokenGroups[key]) {
        tokenGroups[key] = [];
      }
      tokenGroups[key].push(pool);
    });

    const opportunities: ArbitrageOpportunity[] = [];

    Object.keys(tokenGroups).forEach(tokenPair => {
      const poolGroup = tokenGroups[tokenPair];
      
      if (poolGroup.length > 1) {
        // Sort by APY
        poolGroup.sort((a, b) => b.apy - a.apy);
        
        const highest = poolGroup[0];
        const lowest = poolGroup[poolGroup.length - 1];
        const yieldDiff = highest.apy - lowest.apy;
        
        if (yieldDiff > minProfitThreshold) {
          opportunities.push({
            tokenPair,
            yieldDifference: yieldDiff,
            highestAPY: {
              apy: highest.apy,
              protocol: highest.project,
              tvl: highest.tvlUsd,
              poolId: highest.pool,
              pool: highest
            },
            lowestAPY: {
              apy: lowest.apy,
              protocol: lowest.project,
              tvl: lowest.tvlUsd,
              poolId: lowest.pool,
              pool: lowest
            },
            potentialProfit: yieldDiff,
            riskAssessment: assessRisk(highest, lowest)
          });
        }
      }
    });

    return opportunities.sort((a, b) => b.potentialProfit - a.potentialProfit);
  }, [pools, minProfitThreshold]);

  return {
    opportunities,
    isLoading,
    error,
    summary: {
      totalOpportunities: opportunities.length,
      avgProfitPotential: opportunities.length > 0 
        ? opportunities.reduce((sum, op) => sum + op.potentialProfit, 0) / opportunities.length 
        : 0,
      highestProfit: opportunities.length > 0 ? opportunities[0].potentialProfit : 0,
      lowRiskCount: opportunities.filter(op => op.riskAssessment.level === 'Low').length
    }
  };
};
