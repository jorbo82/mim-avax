
import { useJobs } from './useJobs';
import { useImages } from './useImages';

export const useJobTracking = () => {
  const jobsHook = useJobs();
  const imagesHook = useImages();

  return {
    ...jobsHook,
    ...imagesHook,
    loading: jobsHook.loading || imagesHook.loading,
    // Ensure we have proper refetch methods
    refetchJobs: jobsHook.refetchJobs,
    refetchImages: imagesHook.refetchImages
  };
};

// Re-export types for backward compatibility
export type { ImageGenerationJob, UserImage } from '@/types/jobTracking';
