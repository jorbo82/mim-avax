
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ImageGenerationJob, CreateJobParams } from '@/types/jobTracking';

export const useJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<ImageGenerationJob[]>([]);
  const [loading, setLoading] = useState(false);

  const createJob = async (params: CreateJobParams) => {
    if (!user) {
      toast.error('You must be signed in to generate images');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('image_generation_jobs')
        .insert({
          user_id: user.id,
          prompt: params.prompt,
          size: params.size,
          quality: params.quality,
          job_type: params.jobType,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      
      const typedJob: ImageGenerationJob = {
        ...data,
        job_type: data.job_type as 'text_to_image' | 'image_edit',
        status: data.status as 'pending' | 'processing' | 'completed' | 'failed'
      };
      
      setJobs(prev => [typedJob, ...prev]);
      return typedJob;
    } catch (error: any) {
      console.error('Error creating job:', error);
      toast.error('Failed to create generation job');
      return null;
    }
  };

  const updateJobStatus = async (jobId: string, status: string, errorMessage?: string, openaiResponse?: any) => {
    try {
      const updateData: any = { 
        status,
        ...(status === 'completed' && { completed_at: new Date().toISOString() }),
        ...(errorMessage && { error_message: errorMessage }),
        ...(openaiResponse && { openai_response: openaiResponse })
      };

      const { error } = await supabase
        .from('image_generation_jobs')
        .update(updateData)
        .eq('id', jobId);

      if (error) throw error;

      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              ...updateData,
              job_type: job.job_type,
              status: status as 'pending' | 'processing' | 'completed' | 'failed'
            } as ImageGenerationJob
          : job
      ));
    } catch (error: any) {
      console.error('Error updating job status:', error);
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('image_generation_jobs')
        .delete()
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) throw error;

      setJobs(prev => prev.filter(job => job.id !== jobId));
      toast.success('Job deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
      return false;
    }
  };

  const clearAllJobs = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('image_generation_jobs')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setJobs([]);
      toast.success('All jobs cleared successfully');
      return true;
    } catch (error: any) {
      console.error('Error clearing jobs:', error);
      toast.error('Failed to clear jobs');
      return false;
    }
  };

  const fetchJobs = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('image_generation_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const typedJobs: ImageGenerationJob[] = (data || []).map(job => ({
        id: job.id,
        user_id: job.user_id,
        prompt: job.prompt,
        size: job.size,
        quality: job.quality,
        job_type: job.job_type as 'text_to_image' | 'image_edit',
        status: job.status as 'pending' | 'processing' | 'completed' | 'failed',
        error_message: job.error_message || undefined,
        openai_response: job.openai_response || undefined,
        created_at: job.created_at,
        completed_at: job.completed_at || undefined
      }));
      
      setJobs(typedJobs);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchJobs();
    } else {
      setJobs([]);
    }
  }, [user]);

  return {
    jobs,
    loading,
    createJob,
    updateJobStatus,
    deleteJob,
    clearAllJobs,
    refetchJobs: fetchJobs
  };
};
