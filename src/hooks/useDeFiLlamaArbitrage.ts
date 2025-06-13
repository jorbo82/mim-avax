
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
      liquidityRisk: number;
      correlationRisk: number;
    };
  };
  gasCostEstimate: number;
  netProfitEstimate: number;
  executionComplexity: 'Simple' | 'Moderate' | 'Complex';
  timeToCapture: number; // estimated hours
  marketImpact: number; // percentage
}

const calculateGasCost = (complexity: 'Simple' | 'Moderate' | 'Complex'): number => {
  const gasPrice = 25; // 25 gwei average on Avalanche
  const gasLimits = {
    Simple: 200000,
    Moderate: 350000,
    Complex: 500000
  };
  
  // Convert to AVAX (Avalanche uses ~25 gwei)
  return (gasPrice * gasLimits[complexity]) / 1e9;
};

const assessAdvancedRisk = (poolA: DeFiLlamaPool, poolB: DeFiLlamaPool) => {
  let riskScore = 0;
  const factors = { 
    tvlRisk: 0, 
    protocolRisk: 0, 
    apyRisk: 0, 
    liquidityRisk: 0, 
    correlationRisk: 0 
  };

  // TVL difference risk - enhanced
  const tvlRatio = Math.min(poolA.tvlUsd, poolB.tvlUsd) / Math.max(poolA.tvlUsd, poolB.tvlUsd);
  const minTvl = Math.min(poolA.tvlUsd, poolB.tvlUsd);
  
  if (minTvl < 100000 || tvlRatio < 0.1) {
    riskScore += 4;
    factors.tvlRisk = 4;
  } else if (minTvl < 500000 || tvlRatio < 0.3) {
    riskScore += 3;
    factors.tvlRisk = 3;
  } else if (tvlRatio < 0.5) {
    riskScore += 2;
    factors.tvlRisk = 2;
  } else {
    riskScore += 1;
    factors.tvlRisk = 1;
  }

  // Protocol reputation - enhanced with Avalanche-specific protocols
  const reputableProtocols = [
    'aave', 'compound', 'traderjoe', 'pangolin', 'benqi', 'curve',
    'platypus', 'vector', 'yield-yak', 'gmx', 'kyber'
  ];
  
  const protocolARep = reputableProtocols.includes(poolA.project.toLowerCase()) ? 0 : 2;
  const protocolBRep = reputableProtocols.includes(poolB.project.toLowerCase()) ? 0 : 2;
  riskScore += protocolARep + protocolBRep;
  factors.protocolRisk = protocolARep + protocolBRep;

  // APY sustainability risk - enhanced
  const maxApy = Math.max(poolA.apy, poolB.apy);
  const apyDiff = Math.abs(poolA.apy - poolB.apy);
  
  if (maxApy > 200 || apyDiff > 100) {
    riskScore += 4;
    factors.apyRisk = 4;
  } else if (maxApy > 100 || apyDiff > 50) {
    riskScore += 3;
    factors.apyRisk = 3;
  } else if (maxApy > 50 || apyDiff > 20) {
    riskScore += 2;
    factors.apyRisk = 2;
  } else {
    riskScore += 1;
    factors.apyRisk = 1;
  }

  // Liquidity risk - new factor
  const volumeA = poolA.volumeUsd1d || 0;
  const volumeB = poolB.volumeUsd1d || 0;
  const minVolume = Math.min(volumeA, volumeB);
  const minTvlForCalc = Math.min(poolA.tvlUsd, poolB.tvlUsd);
  const liquidityRatio = minVolume / minTvlForCalc;
  
  if (liquidityRatio < 0.01) {
    riskScore += 3;
    factors.liquidityRisk = 3;
  } else if (liquidityRatio < 0.05) {
    riskScore += 2;
    factors.liquidityRisk = 2;
  } else {
    riskScore += 1;
    factors.liquidityRisk = 1;
  }

  // Correlation risk - new factor for IL
  if (poolA.ilRisk || poolB.ilRisk) {
    if (!poolA.stablecoin && !poolB.stablecoin) {
      riskScore += 2;
      factors.correlationRisk = 2;
    } else {
      riskScore += 1;
      factors.correlationRisk = 1;
    }
  }

  const level = riskScore <= 4 ? 'Low' : riskScore <= 8 ? 'Medium' : 'High';

  return { score: riskScore, level, factors } as const;
};

const determineExecutionComplexity = (poolA: DeFiLlamaPool, poolB: DeFiLlamaPool): 'Simple' | 'Moderate' | 'Complex' => {
  // Simple: same token pair, different protocols
  if (poolA.symbol === poolB.symbol) return 'Simple';
  
  // Moderate: related tokens (both stable or both native)
  if ((poolA.stablecoin && poolB.stablecoin) || 
      (poolA.symbol.includes('AVAX') && poolB.symbol.includes('AVAX'))) {
    return 'Moderate';
  }
  
  // Complex: different token types
  return 'Complex';
};

const estimateTimeToCapture = (complexity: 'Simple' | 'Moderate' | 'Complex', yieldDiff: number): number => {
  const baseTime = {
    Simple: 0.5,
    Moderate: 2,
    Complex: 6
  };
  
  // Higher yield differences might close faster
  const urgencyMultiplier = yieldDiff > 10 ? 0.5 : yieldDiff > 5 ? 0.7 : 1;
  
  return baseTime[complexity] * urgencyMultiplier;
};

const estimateMarketImpact = (tvl: number, volume: number): number => {
  // Estimate how much our trade might impact the market
  const assumedTradeSize = 10000; // $10k trade
  const liquidityDepth = volume * 0.1; // assume 10% of daily volume is available
  
  return Math.min(50, (assumedTradeSize / liquidityDepth) * 100);
};

export const useDeFiLlamaArbitrage = (minProfitThreshold = 0.5) => {
  const { data: pools, isLoading, error } = useDeFiLlamaYields();

  const opportunities = useMemo(() => {
    if (!pools) return [];

    // Enhanced token grouping with better matching
    const tokenGroups: Record<string, DeFiLlamaPool[]> = {};
    
    pools.forEach(pool => {
      // Multiple grouping strategies
      const symbols = pool.symbol.toLowerCase().split(/[-\/\s]/);
      const primaryToken = symbols[0];
      const secondaryToken = symbols[1];
      
      // Group by primary token
      if (!tokenGroups[primaryToken]) {
        tokenGroups[primaryToken] = [];
      }
      tokenGroups[primaryToken].push(pool);
      
      // Also group by full symbol for exact matches
      const fullSymbol = symbols.sort().join('-');
      if (!tokenGroups[fullSymbol]) {
        tokenGroups[fullSymbol] = [];
      }
      tokenGroups[fullSymbol].push(pool);
      
      // Group stablecoins together
      if (pool.stablecoin) {
        if (!tokenGroups['stablecoins']) {
          tokenGroups['stablecoins'] = [];
        }
        tokenGroups['stablecoins'].push(pool);
      }
    });

    const opportunities: ArbitrageOpportunity[] = [];

    Object.keys(tokenGroups).forEach(tokenPair => {
      const poolGroup = tokenGroups[tokenPair];
      
      if (poolGroup.length > 1) {
        // Sort by APY and analyze all combinations
        poolGroup.sort((a, b) => b.apy - a.apy);
        
        // Check top vs bottom, and also adjacent pairs for more opportunities
        for (let i = 0; i < Math.min(poolGroup.length - 1, 3); i++) {
          for (let j = i + 1; j < Math.min(poolGroup.length, i + 4); j++) {
            const highest = poolGroup[i];
            const lowest = poolGroup[j];
            const yieldDiff = highest.apy - lowest.apy;
            
            if (yieldDiff > minProfitThreshold) {
              const complexity = determineExecutionComplexity(highest, lowest);
              const gasCostEstimate = calculateGasCost(complexity);
              const riskAssessment = assessAdvancedRisk(highest, lowest);
              
              // Convert percentage to dollar amount for a $10k investment
              const grossProfit = 10000 * (yieldDiff / 100);
              const netProfitEstimate = grossProfit - (gasCostEstimate * 40); // AVAX ~$40
              
              // Only include if net profit is positive
              if (netProfitEstimate > 0) {
                opportunities.push({
                  tokenPair: tokenPair.toUpperCase(),
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
                  riskAssessment,
                  gasCostEstimate,
                  netProfitEstimate,
                  executionComplexity: complexity,
                  timeToCapture: estimateTimeToCapture(complexity, yieldDiff),
                  marketImpact: estimateMarketImpact(
                    Math.min(highest.tvlUsd, lowest.tvlUsd),
                    Math.min(highest.volumeUsd1d || 0, lowest.volumeUsd1d || 0)
                  )
                });
              }
            }
          }
        }
      }
    });

    return opportunities.sort((a, b) => b.netProfitEstimate - a.netProfitEstimate);
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
      avgNetProfit: opportunities.length > 0
        ? opportunities.reduce((sum, op) => sum + op.netProfitEstimate, 0) / opportunities.length
        : 0,
      highestProfit: opportunities.length > 0 ? opportunities[0].potentialProfit : 0,
      lowRiskCount: opportunities.filter(op => op.riskAssessment.level === 'Low').length,
      immediateOpportunities: opportunities.filter(op => op.timeToCapture < 1).length,
      highValueOpportunities: opportunities.filter(op => op.netProfitEstimate > 100).length
    }
  };
};
