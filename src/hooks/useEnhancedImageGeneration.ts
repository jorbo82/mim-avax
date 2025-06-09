
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useJobTracking } from "./useJobTracking";

export interface ImageGenerationParams {
  prompt: string;
  size: string;
  quality: string;
  jobType: 'text_to_image' | 'image_edit';
  inputImages?: File[];
}

export const useEnhancedImageGeneration = () => {
  const { user } = useAuth();
  const { createJob, updateJobStatus, saveGeneratedImage } = useJobTracking();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const generateImage = async (params: ImageGenerationParams) => {
    if (!user) {
      toast.error("Please sign in to generate images");
      return null;
    }

    if (!params.prompt.trim()) {
      toast.error("Please enter a description for your image");
      return null;
    }

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setCurrentJobId(null);

    try {
      // Create job record in database
      const job = await createJob({
        prompt: params.prompt,
        size: params.size,
        quality: params.quality,
        jobType: params.jobType
      });

      if (!job) {
        throw new Error("Failed to create generation job");
      }

      setCurrentJobId(job.id);

      // Convert images to base64 if provided
      let imagesBase64: string[] = [];
      if (params.inputImages && params.inputImages.length > 0) {
        imagesBase64 = await Promise.all(
          params.inputImages.map(file => convertFileToBase64(file))
        );
      }

      console.log('Starting image generation for job:', job.id);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('openai-image-generator', {
        body: {
          prompt: params.prompt,
          size: params.size,
          quality: params.quality,
          jobType: params.jobType,
          jobId: job.id,
          inputImages: imagesBase64
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to generate image');
      }

      if (!data || !data.success) {
        throw new Error(data?.error || 'Image generation failed');
      }

      setGeneratedImageUrl(data.imageUrl);
      toast.success(`Image generated successfully using ${params.jobType.replace('_', '-to-')}!`);
      
      return data.imageUrl;
    } catch (error: any) {
      console.error('Image generation error:', error);
      
      // Update job status to failed if we have a job ID
      if (currentJobId) {
        await updateJobStatus(currentJobId, 'failed', error.message);
      }
      
      toast.error(error.message || 'Failed to generate image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGeneration = () => {
    setGeneratedImageUrl(null);
    setIsGenerating(false);
    setCurrentJobId(null);
  };

  return {
    isGenerating,
    generatedImageUrl,
    currentJobId,
    generateImage,
    resetGeneration
  };
};
