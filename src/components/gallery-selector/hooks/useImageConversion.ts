
import { useState } from 'react';
import { UserImage } from '@/types/jobTracking';

export const useImageConversion = () => {
  const [isConverting, setIsConverting] = useState(false);

  const convertUrlToFile = async (imageUrl: string, filename: string): Promise<File | null> => {
    try {
      console.log('Converting URL to file:', imageUrl);
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        console.error('Failed to fetch image:', response.status, response.statusText);
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log('Image blob size:', blob.size);
      
      if (blob.size > 10 * 1024 * 1024) {
        console.warn(`Image ${filename} is too large (${blob.size} bytes)`);
        return null;
      }
      
      return new File([blob], filename, { type: blob.type || 'image/png' });
    } catch (error) {
      console.error(`Failed to convert ${filename}:`, error);
      return null;
    }
  };

  const convertSelectedImages = async (
    selectedUrls: string[],
    userImages: UserImage[],
    onSuccess: (files: File[]) => void
  ) => {
    if (selectedUrls.length === 0) return;

    setIsConverting(true);
    console.log('Converting selected images:', selectedUrls);
    
    try {
      const imageFiles: File[] = [];
      
      for (const url of selectedUrls) {
        const image = userImages.find(img => img.image_url === url);
        if (image) {
          const filename = `gallery_${image.id}.png`;
          const file = await convertUrlToFile(url, filename);
          if (file) {
            imageFiles.push(file);
          } else {
            console.warn('Failed to convert image:', url);
          }
        }
      }

      console.log('Successfully converted files:', imageFiles.length);
      onSuccess(imageFiles);
    } catch (error) {
      console.error('Error converting gallery images:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return {
    isConverting,
    convertSelectedImages
  };
};
