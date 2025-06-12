
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedApexPool {
  id: string;
  name: string;
  symbol: string;
  type: 'native' | 'wrapped';
  tvl: number;
  apy: number;
  volume24h: number;
  logoURI?: string;
  tags: string[];
  isEnhanced: boolean;
}

interface PoolMetadata {
  tokenType?: string;
  tokenInfo?: {
    logoURI?: string;
    tags?: string[];
  };
  registrySource?: boolean;
}

export const useEnhancedApexData = () => {
  const [bluechipPools, setBluechipPools] = useState<EnhancedApexPool[]>([]);
  const [allApexPools, setAllApexPools] = useState<EnhancedApexPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnhancedApexPools = async () => {
    try {
      const { data, error } = await supabase
        .from('yield_pools')
        .select(`
          *,
          protocols!inner(name, slug)
        `)
        .eq('protocols.slug', 'apex-defi')
        .eq('is_active', true)
        .order('tvl_usd', { ascending: false });

      if (error) throw error;

      const enhancedPools = data?.map(pool => {
        const metadata = (pool.pool_metadata as PoolMetadata) || {};
        
        return {
          id: pool.id,
          name: pool.pool_name,
          symbol: pool.quote_token_symbol || pool.base_token_symbol || 'Unknown',
          type: metadata.tokenType === 'native' ? 'native' : 'wrapped' as 'native' | 'wrapped',
          tvl: Number(pool.tvl_usd || 0),
          apy: Number(pool.apy_base || 0) + Number(pool.apy_reward || 0),
          volume24h: Number(pool.volume_24h_usd || 0),
          logoURI: metadata.tokenInfo?.logoURI,
          tags: metadata.tokenInfo?.tags || [],
          isEnhanced: Boolean(metadata.registrySource)
        };
      }) || [];

      setAllApexPools(enhancedPools);
      setBluechipPools(enhancedPools.filter(pool => pool.tags.includes('bluechip')));
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching enhanced Apex pools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnhancedApexPools();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchEnhancedApexPools();
  };

  const searchPools = (query: string) => {
    if (!query) return allApexPools;
    
    return allApexPools.filter(pool =>
      pool.name.toLowerCase().includes(query.toLowerCase()) ||
      pool.symbol.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getPoolsByType = (type: 'native' | 'wrapped') => {
    return allApexPools.filter(pool => pool.type === type);
  };

  return {
    bluechipPools,
    allApexPools,
    loading,
    error,
    refreshData,
    searchPools,
    getPoolsByType,
    totalPools: allApexPools.length,
    totalTVL: allApexPools.reduce((sum, pool) => sum + pool.tvl, 0),
    averageAPY: allApexPools.length > 0 
      ? allApexPools.reduce((sum, pool) => sum + pool.apy, 0) / allApexPools.length 
      : 0
  };
};
