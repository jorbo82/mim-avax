
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useJobTracking } from '@/hooks/useJobTracking';
import { GallerySelectorHeader } from './GallerySelectorHeader';
import { GallerySelectorSearch } from './GallerySelectorSearch';
import { GallerySelectorContent } from './GallerySelectorContent';
import { GallerySelectorFooter } from './GallerySelectorFooter';
import { useGallerySelection } from './hooks/useGallerySelection';
import { useImageConversion } from './hooks/useImageConversion';

interface GallerySelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImages: (imageFiles: File[]) => void;
  maxSelections?: number;
  refreshTrigger?: number;
}

export const GallerySelectorDialog = ({ 
  isOpen, 
  onClose, 
  onSelectImages, 
  maxSelections = 10,
  refreshTrigger = 0
}: GallerySelectorDialogProps) => {
  const { userImages, loading, error, loadMoreImages, hasMoreImages, refetchImages } = useJobTracking();
  const { selectedUrls, toggleSelection, clearSelection } = useGallerySelection(maxSelections);
  const { isConverting, convertSelectedImages } = useImageConversion();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('GallerySelector: Dialog opened');
      console.log('GallerySelector: userImages count:', userImages.length);
      console.log('GallerySelector: loading state:', loading);
      console.log('GallerySelector: error state:', error);
    }
  }, [isOpen, userImages.length, loading, error]);

  // Auto-refresh when refreshTrigger changes and dialog is open
  useEffect(() => {
    if (isOpen && refreshTrigger > 0) {
      console.log('GallerySelector: Auto-refreshing due to new image generation');
      handleRefresh();
    }
  }, [refreshTrigger, isOpen]);

  // Filter images based on search
  const filteredImages = userImages.filter(image => 
    image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectImages = async () => {
    await convertSelectedImages(selectedUrls, userImages, (imageFiles) => {
      onSelectImages(imageFiles);
      clearSelection();
      onClose();
    });
  };

  const handleLoadMore = async () => {
    if (!isLoadingMore && hasMoreImages) {
      setIsLoadingMore(true);
      await loadMoreImages();
      setIsLoadingMore(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetchImages();
      console.log('GallerySelector: Gallery refreshed successfully');
    } catch (error) {
      console.error('GallerySelector: Error refreshing gallery:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const resetAndClose = () => {
    clearSelection();
    setSearchTerm('');
    onClose();
  };

  const handleRetry = () => {
    console.log('GallerySelector: Retrying image fetch');
    handleRefresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <GallerySelectorHeader
          selectedCount={selectedUrls.length}
          maxSelections={maxSelections}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        <div className="space-y-4">
          <GallerySelectorSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <GallerySelectorContent
            loading={loading}
            isRefreshing={isRefreshing}
            error={error}
            userImages={userImages}
            filteredImages={filteredImages}
            selectedUrls={selectedUrls}
            searchTerm={searchTerm}
            hasMoreImages={hasMoreImages}
            isLoadingMore={isLoadingMore}
            onToggleSelection={toggleSelection}
            onLoadMore={handleLoadMore}
            onRetry={handleRetry}
          />
        </div>

        <GallerySelectorFooter
          selectedCount={selectedUrls.length}
          isConverting={isConverting}
          loading={loading}
          onCancel={resetAndClose}
          onSelectImages={handleSelectImages}
        />
      </DialogContent>
    </Dialog>
  );
};
