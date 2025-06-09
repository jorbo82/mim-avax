
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { UserImage, SaveImageParams } from '@/types/jobTracking';

export const useImages = () => {
  const { user } = useAuth();
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);

  const saveGeneratedImage = async (params: SaveImageParams) => {
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

  const deleteImage = async (imageId: string) => {
    if (!user) return false;

    try {
      const image = userImages.find(img => img.id === imageId);
      if (!image) {
        toast.error('Image not found');
        return false;
      }

      const { error: storageError } = await supabase.storage
        .from('generated-images')
        .remove([image.storage_path]);

      if (storageError) {
        console.warn('Storage deletion warning:', storageError);
      }

      const { error: dbError } = await supabase
        .from('user_images')
        .delete()
        .eq('id', imageId)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      setUserImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
      return false;
    }
  };

  const clearAllImages = async () => {
    if (!user) return false;

    try {
      const storagePaths = userImages.map(img => img.storage_path);

      if (storagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('generated-images')
          .remove(storagePaths);

        if (storageError) {
          console.warn('Storage deletion warning:', storageError);
        }
      }

      const { error: dbError } = await supabase
        .from('user_images')
        .delete()
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      setUserImages([]);
      toast.success('All images cleared successfully');
      return true;
    } catch (error: any) {
      console.error('Error clearing images:', error);
      toast.error('Failed to clear images');
      return false;
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
      fetchUserImages();
    } else {
      setUserImages([]);
    }
  }, [user]);

  return {
    userImages,
    loading,
    saveGeneratedImage,
    toggleFavorite,
    deleteImage,
    clearAllImages,
    refetchImages: fetchUserImages
  };
};
