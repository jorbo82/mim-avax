
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SwapHistoryItem {
  id: string;
  exchange_name: string;
  from_token_symbol: string;
  to_token_symbol: string;
  from_amount: number;
  to_amount: number;
  exchange_rate: number;
  gas_fee: number | null;
  status: string;
  created_at: string;
  completed_at: string | null;
}

export const useSwapHistory = () => {
  const [swapHistory, setSwapHistory] = useState<SwapHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setSwapHistory([]);
      setLoading(false);
      return;
    }

    const fetchSwapHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('defi_swap_history')
          .select(`
            *,
            defi_exchanges!inner(name),
            from_token:defi_tokens!defi_swap_history_from_token_id_fkey(symbol),
            to_token:defi_tokens!defi_swap_history_to_token_id_fkey(symbol)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        const formattedData = data?.map(item => ({
          id: item.id,
          exchange_name: item.defi_exchanges.name,
          from_token_symbol: item.from_token.symbol,
          to_token_symbol: item.to_token.symbol,
          from_amount: Number(item.from_amount),
          to_amount: Number(item.to_amount),
          exchange_rate: Number(item.exchange_rate),
          gas_fee: item.gas_fee ? Number(item.gas_fee) : null,
          status: item.status,
          created_at: item.created_at,
          completed_at: item.completed_at
        })) || [];

        setSwapHistory(formattedData);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching swap history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSwapHistory();
  }, [user]);

  const addSwapRecord = async (swapData: {
    exchange_id: string;
    from_token_id: string;
    to_token_id: string;
    from_amount: number;
    to_amount: number;
    exchange_rate: number;
    gas_fee?: number;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('defi_swap_history')
        .insert({
          user_id: user.id,
          ...swapData,
          status: 'completed'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error('Error adding swap record:', err);
      throw err;
    }
  };

  return {
    swapHistory,
    loading,
    error,
    addSwapRecord
  };
};
