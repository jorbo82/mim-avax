
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DeFiExchange {
  id: string;
  name: string;
  slug: string;
  api_endpoint: string | null;
  logo_url: string | null;
  is_active: boolean;
}

export interface DeFiToken {
  id: string;
  symbol: string;
  name: string;
  contract_address: string | null;
  decimals: number;
  logo_url: string | null;
  is_active: boolean;
}

export interface BestRate {
  exchange_name: string;
  exchange_slug: string;
  price: number;
  liquidity_usd: number;
  volume_24h_usd: number;
  price_change_24h: number;
}

export const useDeFiExchanges = () => {
  const [exchanges, setExchanges] = useState<DeFiExchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data, error } = await supabase
          .from('defi_exchanges')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (error) throw error;
        setExchanges(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching exchanges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  return { exchanges, loading, error };
};

export const useDeFiTokens = () => {
  const [tokens, setTokens] = useState<DeFiToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data, error } = await supabase
          .from('defi_tokens')
          .select('*')
          .eq('is_active', true)
          .order('symbol');

        if (error) throw error;
        setTokens(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching tokens:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading, error };
};

export const useBestRates = (fromToken: string, toToken: string) => {
  const [rates, setRates] = useState<BestRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    if (!fromToken || !toToken || fromToken === toToken) {
      setRates([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_best_rates', {
        base_token_symbol: fromToken,
        quote_token_symbol: toToken
      });

      if (error) throw error;
      setRates(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fromToken, toToken]);

  return { rates, loading, error, refetch: fetchRates };
};
