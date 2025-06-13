
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
import { useJobTracking } from '@/hooks/useJobTracking';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GalleryGridSkeleton } from '@/components/gallery/GalleryGridSkeleton';
import { LazyGalleryImage } from '@/components/gallery/LazyGalleryImage';

interface GallerySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImages: (imageFiles: File[]) => void;
  maxSelections?: number;
}

export const GallerySelector = ({ 
  isOpen, 
  onClose, 
  onSelectImages, 
  maxSelections = 10 
}: GallerySelectorProps) => {
  const { userImages, loading, error, loadMoreImages, hasMoreImages } = useJobTracking();
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('GallerySelector: Dialog opened');
      console.log('GallerySelector: userImages count:', userImages.length);
      console.log('GallerySelector: loading state:', loading);
      console.log('GallerySelector: error state:', error);
    }
  }, [isOpen, userImages.length, loading, error]);

  // Filter images based on search
  const filteredImages = userImages.filter(image => 
    image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (imageUrl: string) => {
    setSelectedUrls(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else if (prev.length < maxSelections) {
        return [...prev, imageUrl];
      }
      return prev;
    });
  };

  const convertUrlToFile = async (imageUrl: string, filename: string): Promise<File | null> => {
    try {
      console.log('GallerySelector: Converting URL to file:', imageUrl);
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        console.error('GallerySelector: Failed to fetch image:', response.status, response.statusText);
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log('GallerySelector: Image blob size:', blob.size);
      
      if (blob.size > 10 * 1024 * 1024) {
        console.warn(`GallerySelector: Image ${filename} is too large (${blob.size} bytes)`);
        return null;
      }
      
      return new File([blob], filename, { type: blob.type || 'image/png' });
    } catch (error) {
      console.error(`GallerySelector: Failed to convert ${filename}:`, error);
      return null;
    }
  };

  const handleSelectImages = async () => {
    if (selectedUrls.length === 0) return;

    setIsConverting(true);
    console.log('GallerySelector: Converting selected images:', selectedUrls);
    
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
            console.warn('GallerySelector: Failed to convert image:', url);
          }
        }
      }

      console.log('GallerySelector: Successfully converted files:', imageFiles.length);
      onSelectImages(imageFiles);
      setSelectedUrls([]);
      onClose();
    } catch (error) {
      console.error('GallerySelector: Error converting gallery images:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleLoadMore = async () => {
    if (!isLoadingMore && hasMoreImages) {
      setIsLoadingMore(true);
      await loadMoreImages();
      setIsLoadingMore(false);
    }
  };

  const resetAndClose = () => {
    setSelectedUrls([]);
    setSearchTerm('');
    onClose();
  };

  const handleRetry = () => {
    console.log('GallerySelector: Retrying image fetch');
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Select Images from Gallery
            <Badge variant="secondary">
              {selectedUrls.length}/{maxSelections} selected
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Choose up to {maxSelections} images from your gallery to use as reference images for AI generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by prompt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Failed to load images: {error}</span>
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {loading && userImages.length === 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin w-6 h-6 border-2 border-mim-teal border-t-transparent rounded-full" />
                <span className="ml-3 text-muted-foreground">Loading your images...</span>
              </div>
              <GalleryGridSkeleton count={8} />
            </div>
          ) : filteredImages.length === 0 && !error ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No images match your search' : 'No images in gallery yet'}
              {!searchTerm && (
                <p className="text-sm mt-2">Generate some images with JORBO AI first!</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <LazyGalleryImage
                    key={image.id}
                    image={image}
                    isSelected={selectedUrls.includes(image.image_url)}
                    onToggleSelection={toggleSelection}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreImages && !searchTerm && (
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="min-w-[120px]"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-mim-teal border-t-transparent rounded-full mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More'
                    )}
                  </Button>
                </div>
              )}

              {/* Loading More Skeletons */}
              {isLoadingMore && (
                <div className="pt-4">
                  <GalleryGridSkeleton count={4} />
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col gap-2">
          {selectedUrls.length === 0 && !isConverting && !loading && (
            <p className="text-sm text-muted-foreground text-center">
              💡 Select images above to enable the use button
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetAndClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSelectImages}
              disabled={selectedUrls.length === 0 || isConverting || loading}
              className={`min-w-[140px] ${
                selectedUrls.length === 0 
                  ? 'bg-muted text-muted-foreground border-muted hover:bg-muted' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
              }`}
            >
              {isConverting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Converting...
                </>
              ) : (
                `Use ${selectedUrls.length} Asset${selectedUrls.length !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
