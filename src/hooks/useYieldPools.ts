
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YieldPool {
  id: string;
  protocol_id: string;
  pool_identifier: string;
  pool_name: string;
  pool_type: string;
  contract_address: string;
  base_token_address: string | null;
  base_token_symbol: string | null;
  quote_token_address: string | null;
  quote_token_symbol: string | null;
  tvl_usd: number;
  apy_base: number;
  apy_reward: number;
  volume_24h_usd: number;
  fees_24h_usd: number;
  pool_metadata: any;
  last_updated: string;
  protocol_name?: string;
  protocol_slug?: string;
}

export const useYieldPools = (protocolSlug?: string) => {
  const [pools, setPools] = useState<YieldPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        let query = supabase
          .from('yield_pools')
          .select(`
            *,
            protocols!inner(name, slug)
          `)
          .eq('is_active', true);

        if (protocolSlug) {
          query = query.eq('protocols.slug', protocolSlug);
        }

        const { data, error } = await query.order('tvl_usd', { ascending: false });

        if (error) throw error;

        const formattedPools = data?.map(pool => ({
          ...pool,
          tvl_usd: Number(pool.tvl_usd),
          apy_base: Number(pool.apy_base),
          apy_reward: Number(pool.apy_reward),
          volume_24h_usd: Number(pool.volume_24h_usd),
          fees_24h_usd: Number(pool.fees_24h_usd),
          protocol_name: pool.protocols.name,
          protocol_slug: pool.protocols.slug
        })) || [];

        setPools(formattedPools);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching yield pools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, [protocolSlug]);

  return { pools, loading, error };
};
