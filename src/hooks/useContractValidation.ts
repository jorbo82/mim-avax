
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useContractValidation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const discoverPools = async (contractAddress: string, protocols: string[] = ['apex-defi', 'pharaoh', 'lfj', 'benqi']) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('validate-contract', {
        body: {
          contractAddress,
          protocols
        }
      });

      if (error) throw error;

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    discoverPools,
    loading,
    error
  };
};
