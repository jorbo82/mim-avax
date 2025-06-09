
import { useState } from "react";
import { toast } from "sonner";

export interface ImageGenerationParams {
  prompt: string;
  size: string;
  quality: string;
  jobType: 'text_to_image' | 'image_edit';
  inputImages?: File[];
  maskFile?: File | null;
}

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

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
    if (!params.prompt.trim()) {
      toast.error("Please enter a description for your image");
      return null;
    }

    setIsGenerating(true);
    setGeneratedImageUrl(null);

    try {
      // Convert images to base64 if provided
      let imagesBase64: string[] = [];
      if (params.inputImages && params.inputImages.length > 0) {
        imagesBase64 = await Promise.all(
          params.inputImages.map(file => convertFileToBase64(file))
        );
      }

      // Convert mask to base64 if provided
      let maskBase64: string | null = null;
      if (params.maskFile) {
        maskBase64 = await convertFileToBase64(params.maskFile);
      }

      // For now, simulate the API call - this will be replaced with actual Supabase edge function
      console.log('Generation parameters:', {
        prompt: params.prompt,
        jobType: params.jobType,
        size: params.size,
        quality: params.quality,
        inputImagesCount: imagesBase64.length,
        hasMask: !!maskBase64
      });

      // Simulate generation time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate a random image URL for demo
      const imageUrl = `https://picsum.photos/${params.size.split('x')[0]}/${params.size.split('x')[1]}?random=${Date.now()}`;
      
      setGeneratedImageUrl(imageUrl);
      toast.success(`Image generated successfully using ${params.jobType.replace('_', '-to-')}!`);
      
      return imageUrl;
    } catch (error: any) {
      console.error('Image generation error:', error);
      toast.error(error.message || 'Failed to generate image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGeneration = () => {
    setGeneratedImageUrl(null);
    setIsGenerating(false);
  };

  return {
    isGenerating,
    generatedImageUrl,
    generateImage,
    resetGeneration
  };
};
