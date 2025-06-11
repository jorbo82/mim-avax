
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface StorageStats {
  imageCount: number;
  storageLimit: number;
  remainingSlots: number;
}

export const useStorageStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StorageStats>({
    imageCount: 0,
    storageLimit: 100,
    remainingSlots: 100
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_user_storage_stats', {
        user_uuid: user.id
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setStats({
          imageCount: data[0].image_count,
          storageLimit: data[0].storage_limit,
          remainingSlots: data[0].remaining_slots
        });
      }
    } catch (error: any) {
      console.error('Error fetching storage stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  return {
    stats,
    loading,
    refetchStats: fetchStats
  };
};
