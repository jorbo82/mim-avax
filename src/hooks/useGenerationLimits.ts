
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useStorageStats } from '@/hooks/useStorageStats';
import { toast } from 'sonner';

export interface GenerationLimit {
  id: string;
  user_id: string;
  date: string;
  generation_count: number;
  override_used: boolean;
  override_timestamp?: string;
}

export const useGenerationLimits = () => {
  const { user } = useAuth();
  const { stats, refetchStats } = useStorageStats();
  const [todayLimit, setTodayLimit] = useState<GenerationLimit | null>(null);
  const [loading, setLoading] = useState(false);
  const [remainingGenerations, setRemainingGenerations] = useState(15);

  const DAILY_LIMIT = 15;
  const OVERRIDE_PASSWORD = "Zoo1ander";

  const fetchTodayLimit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('user_generation_limits')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error) throw error;

      setTodayLimit(data);
      const remaining = data ? Math.max(0, DAILY_LIMIT - data.generation_count) : DAILY_LIMIT;
      setRemainingGenerations(remaining);
      
      // Also refresh storage stats when fetching limits
      refetchStats();
    } catch (error: any) {
      console.error('Error fetching generation limits:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementGenerationCount = async () => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      if (todayLimit) {
        // Update existing record
        const { error } = await supabase
          .from('user_generation_limits')
          .update({ 
            generation_count: todayLimit.generation_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', todayLimit.id);

        if (error) throw error;
        
        setTodayLimit(prev => prev ? { ...prev, generation_count: prev.generation_count + 1 } : null);
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('user_generation_limits')
          .insert({
            user_id: user.id,
            date: today,
            generation_count: 1
          })
          .select()
          .single();

        if (error) throw error;
        setTodayLimit(data);
      }

      setRemainingGenerations(prev => Math.max(0, prev - 1));
      
      // Refresh storage stats after generation
      setTimeout(() => {
        refetchStats();
      }, 1000);
      
      return true;
    } catch (error: any) {
      console.error('Error incrementing generation count:', error);
      toast.error('Failed to update generation count');
      return false;
    }
  };

  const useOverride = async (password: string) => {
    if (!user || password !== OVERRIDE_PASSWORD) {
      toast.error('Invalid override password');
      return false;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      if (todayLimit) {
        // Update existing record with override
        const { error } = await supabase
          .from('user_generation_limits')
          .update({ 
            override_used: true,
            override_timestamp: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', todayLimit.id);

        if (error) throw error;
        
        setTodayLimit(prev => prev ? { ...prev, override_used: true, override_timestamp: new Date().toISOString() } : null);
      } else {
        // Create new record with override
        const { data, error } = await supabase
          .from('user_generation_limits')
          .insert({
            user_id: user.id,
            date: today,
            generation_count: 0,
            override_used: true,
            override_timestamp: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        setTodayLimit(data);
      }

      toast.success('Override activated! Unlimited generations for today.');
      return true;
    } catch (error: any) {
      console.error('Error using override:', error);
      toast.error('Failed to activate override');
      return false;
    }
  };

  const canGenerate = () => {
    if (!todayLimit) return true;
    
    // Check storage limit
    if (stats.remainingSlots <= 0) {
      return true; // Allow generation, old images will be auto-deleted
    }
    
    return todayLimit.override_used || todayLimit.generation_count < DAILY_LIMIT;
  };

  const isOverrideUsed = () => {
    return todayLimit?.override_used || false;
  };

  useEffect(() => {
    if (user) {
      fetchTodayLimit();
    }
  }, [user]);

  return {
    todayLimit,
    loading,
    remainingGenerations,
    storageStats: stats,
    canGenerate,
    isOverrideUsed,
    incrementGenerationCount,
    useOverride,
    refetch: fetchTodayLimit,
    DAILY_LIMIT
  };
};
