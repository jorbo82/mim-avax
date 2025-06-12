
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TokenCheckResult {
  isArenaToken: boolean;
  creatorAddress: string;
  isVerified: boolean;
  securityRisk: 'low' | 'medium' | 'high';
  warnings: string[];
  snowtraceUrl?: string;
  dexScreenerUrl?: string;
}

export const useTokenChecker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TokenCheckResult | null>(null);

  const checkToken = async (contractAddress: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('token-checker', {
        body: {
          contractAddress
        }
      });

      if (error) throw error;

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to check token');
      console.error('Token check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    checkToken,
    loading,
    error,
    result,
    clearResult
  };
};
