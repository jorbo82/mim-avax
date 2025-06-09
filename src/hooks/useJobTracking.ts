
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ImageGenerationJob {
  id: string;
  user_id: string;
  prompt: string;
  size: string;
  quality: string;
  job_type: 'text_to_image' | 'image_edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message?: string;
  openai_response?: any;
  created_at: string;
  completed_at?: string;
}

export interface UserImage {
  id: string;
  user_id: string;
  job_id?: string;
  image_url: string;
  storage_path: string;
  prompt: string;
  size: string;
  quality: string;
  job_type: string;
  is_favorite: boolean;
  created_at: string;
}

export const useJobTracking = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<ImageGenerationJob[]>([]);
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);

  const createJob = async (params: {
    prompt: string;
    size: string;
    quality: string;
    jobType: 'text_to_image' | 'image_edit';
  }) => {
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
      
      // Type assertion to ensure the data matches our interface
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
              status: status as 'pending' | 'processing' | 'completed' | 'failed'
            }
          : job
      ));
    } catch (error: any) {
      console.error('Error updating job status:', error);
    }
  };

  const saveGeneratedImage = async (params: {
    jobId: string;
    imageUrl: string;
    storagePath: string;
    prompt: string;
    size: string;
    quality: string;
    jobType: string;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_images')
        .insert({
          user_id: user.id,
          job_id: params.jobId,
          image_url: params.imageUrl,
          storage_path: params.storagePath,
          prompt: params.prompt,
          size: params.size,
          quality: params.quality,
          job_type: params.jobType
        })
        .select()
        .single();

      if (error) throw error;
      
      setUserImages(prev => [data, ...prev]);
      return data;
    } catch (error: any) {
      console.error('Error saving generated image:', error);
      return null;
    }
  };

  const toggleFavorite = async (imageId: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('user_images')
        .update({ is_favorite: isFavorite })
        .eq('id', imageId);

      if (error) throw error;

      setUserImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, is_favorite: isFavorite }
          : img
      ));
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorite status');
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
      
      // Type the data properly
      const typedJobs: ImageGenerationJob[] = (data || []).map(job => ({
        ...job,
        job_type: job.job_type as 'text_to_image' | 'image_edit',
        status: job.status as 'pending' | 'processing' | 'completed' | 'failed'
      }));
      
      setJobs(typedJobs);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserImages = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserImages(data || []);
    } catch (error: any) {
      console.error('Error fetching user images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchJobs();
      fetchUserImages();
    } else {
      setJobs([]);
      setUserImages([]);
    }
  }, [user]);

  return {
    jobs,
    userImages,
    loading,
    createJob,
    updateJobStatus,
    saveGeneratedImage,
    toggleFavorite,
    refetchJobs: fetchJobs,
    refetchImages: fetchUserImages
  };
};
