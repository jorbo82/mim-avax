
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface GenerationParams {
  prompt: string;
  size: string;
  quality: string;
  jobType: 'text_to_image' | 'image_edit';
  inputImages?: File[];
  maskImage?: File;
}

export const useEnhancedImageGeneration = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [generationPhase, setGenerationPhase] = useState<'connecting' | 'generating' | 'finalizing'>('connecting');

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

  const generateImage = async (params: GenerationParams) => {
    if (!user) {
      toast.error('You must be signed in to generate images');
      return;
    }

    if (!params.prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setCurrentJobId(null);
    setGenerationPhase('connecting');

    try {
      console.log('Starting JORBO AI image generation with params:', {
        ...params,
        inputImagesCount: params.inputImages?.length || 0,
        hasMask: !!params.maskImage
      });

      // Phase 1: Connecting
      setGenerationPhase('connecting');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert input images to base64 if provided
      let inputImagesBase64: string[] = [];
      if (params.inputImages?.length) {
        setGenerationPhase('generating');
        inputImagesBase64 = await Promise.all(
          params.inputImages.map(file => convertFileToBase64(file))
        );
        console.log(`Converted ${inputImagesBase64.length} input images to base64`);
      } else {
        setGenerationPhase('generating');
      }

      // Convert mask to base64 if provided
      let maskBase64: string | undefined;
      if (params.maskImage) {
        maskBase64 = await convertFileToBase64(params.maskImage);
        console.log('Converted mask image to base64');
      }

      // Phase 2: Generating
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('openai-image-generator', {
        body: {
          prompt: params.prompt,
          size: params.size,
          quality: params.quality,
          jobType: params.jobType,
          inputImages: inputImagesBase64,
          mask: maskBase64
        }
      });

      if (error) {
        console.error('JORBO AI generation error:', error);
        throw new Error(error.message || 'Generation failed');
      }

      // Phase 3: Finalizing
      setGenerationPhase('finalizing');
      await new Promise(resolve => setTimeout(resolve, 800));

      if (data?.success && data?.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
        setCurrentJobId(data.jobId);
        
        const jobTypeText = params.jobType === 'image_edit' ? 'image editing' : 'text-to-image';
        toast.success(`🎨 JORBO AI successfully created your ${jobTypeText} masterpiece!`);
        
        console.log('JORBO AI generation successful:', {
          imageUrl: data.imageUrl,
          jobId: data.jobId,
          engine: 'JORBO AI Engine'
        });
      } else {
        throw new Error('No image returned from JORBO AI');
      }

    } catch (error: any) {
      console.error('JORBO AI image generation error:', error);
      toast.error(error.message || 'Failed to generate image with JORBO AI');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGeneration = () => {
    setGeneratedImageUrl(null);
    setCurrentJobId(null);
    setGenerationPhase('connecting');
  };

  return {
    isGenerating,
    generatedImageUrl,
    currentJobId,
    generationPhase,
    generateImage,
    resetGeneration
  };
};
