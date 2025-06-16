
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useEnhancedImageGeneration } from "@/hooks/useEnhancedImageGeneration";
import { useGenerationLimits } from "@/hooks/useGenerationLimits";
import { downloadImage } from "@/utils/imageUtils";

interface ImageWithSource extends File {
  source?: 'upload' | 'gallery' | 'mim-asset';
}

export const useJorboAIState = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [selectedImages, setSelectedImages] = useState<ImageWithSource[]>([]);
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [selectedQuality, setSelectedQuality] = useState("high");
  const [showGallerySelector, setShowGallerySelector] = useState(false);
  const [showMimAssetSelector, setShowMimAssetSelector] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);
  
  const { 
    isGenerating, 
    generatedImageUrl, 
    generationPhase, 
    limitExceeded, 
    generateImage, 
    resetGeneration,
    setGalleryRefreshCallback
  } = useEnhancedImageGeneration();
  
  const { 
    remainingGenerations, 
    canGenerate, 
    isOverrideUsed, 
    incrementGenerationCount, 
    useOverride, 
    refetch: refetchLimits,
    loading: limitsLoading,
    DAILY_LIMIT 
  } = useGenerationLimits();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?redirect=/jorbo-ai");
    }
  }, [user, authLoading, navigate]);

  // Show limit modal when limit is exceeded
  useEffect(() => {
    if (limitExceeded) {
      setShowLimitModal(true);
    }
  }, [limitExceeded]);

  // Set up gallery refresh callback
  useEffect(() => {
    setGalleryRefreshCallback(() => {
      setGalleryRefreshTrigger(prev => prev + 1);
    });
    
    return () => setGalleryRefreshCallback(null);
  }, [setGalleryRefreshCallback]);

  const handleGeneration = async () => {
    // Check limits before generating
    if (!canGenerate()) {
      setShowLimitModal(true);
      return;
    }

    const jobType = selectedImages.length > 0 ? 'image_edit' : 'text_to_image';
    
    // Increment count if not using override (the edge function will also check)
    if (!isOverrideUsed()) {
      const success = await incrementGenerationCount();
      if (!success) {
        toast.error('Failed to update generation count');
        return;
      }
    }
    
    await generateImage({
      prompt,
      size: selectedSize,
      quality: selectedQuality,
      jobType,
      inputImages: selectedImages,
    });

    // Refetch limits after successful generation
    refetchLimits();
  };

  const handleOverride = async (password: string) => {
    const success = await useOverride(password);
    if (success) {
      refetchLimits();
    }
    return success;
  };

  const handleDownload = () => {
    if (generatedImageUrl) {
      downloadImage(generatedImageUrl, `jorbo-ai-${Date.now()}.png`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleGalleryImagesSelected = (imageFiles: File[]) => {
    const filesWithSource: ImageWithSource[] = imageFiles.map(file => {
      const fileWithSource = file as ImageWithSource;
      fileWithSource.source = 'gallery';
      return fileWithSource;
    });
    setSelectedImages(prev => [...prev, ...filesWithSource].slice(0, 10));
    toast.success(`Added ${imageFiles.length} image${imageFiles.length !== 1 ? 's' : ''} from gallery`);
  };

  const handleMimAssetsSelected = (assetFiles: File[]) => {
    const filesWithSource: ImageWithSource[] = assetFiles.map(file => {
      const fileWithSource = file as ImageWithSource;
      fileWithSource.source = 'mim-asset';
      return fileWithSource;
    });
    setSelectedImages(prev => [...prev, ...filesWithSource].slice(0, 10));
    toast.success(`Added ${assetFiles.length} MIM-ME asset${assetFiles.length !== 1 ? 's' : ''}`);
  };

  return {
    // Auth state
    user,
    authLoading,
    
    // Form state
    prompt,
    setPrompt,
    selectedImages,
    setSelectedImages,
    selectedSize,
    setSelectedSize,
    selectedQuality,
    setSelectedQuality,
    
    // Modal state
    showGallerySelector,
    setShowGallerySelector,
    showMimAssetSelector,
    setShowMimAssetSelector,
    showLimitModal,
    setShowLimitModal,
    galleryRefreshTrigger,
    
    // Generation state
    isGenerating,
    generatedImageUrl,
    generationPhase,
    limitExceeded,
    
    // Limits state
    remainingGenerations,
    canGenerate,
    isOverrideUsed,
    limitsLoading,
    DAILY_LIMIT,
    
    // Actions
    handleGeneration,
    handleOverride,
    handleDownload,
    handleSignOut,
    handleGalleryImagesSelected,
    handleMimAssetsSelected,
    resetGeneration,
  };
};
