
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { GalleryGridSkeleton } from '@/components/gallery/GalleryGridSkeleton';
import { LazyGalleryImage } from '@/components/gallery/LazyGalleryImage';
import { UserImage } from '@/types/jobTracking';

interface GallerySelectorContentProps {
  loading: boolean;
  isRefreshing: boolean;
  error: string | null;
  userImages: UserImage[];
  filteredImages: UserImage[];
  selectedUrls: string[];
  searchTerm: string;
  hasMoreImages: boolean;
  isLoadingMore: boolean;
  onToggleSelection: (imageUrl: string) => void;
  onLoadMore: () => void;
  onRetry: () => void;
}

export const GallerySelectorContent = ({
  loading,
  isRefreshing,
  error,
  userImages,
  filteredImages,
  selectedUrls,
  searchTerm,
  hasMoreImages,
  isLoadingMore,
  onToggleSelection,
  onLoadMore,
  onRetry
}: GallerySelectorContentProps) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load images: {error}</span>
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if ((loading || isRefreshing) && userImages.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-mim-teal border-t-transparent rounded-full" />
          <span className="ml-3 text-muted-foreground">
            {isRefreshing ? 'Refreshing your images...' : 'Loading your images...'}
          </span>
        </div>
        <GalleryGridSkeleton count={8} />
      </div>
    );
  }

  if (filteredImages.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchTerm ? 'No images match your search' : 'No images in gallery yet'}
        {!searchTerm && (
          <p className="text-sm mt-2">Generate some images with JORBO AI first!</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <LazyGalleryImage
            key={image.id}
            image={image}
            isSelected={selectedUrls.includes(image.image_url)}
            onToggleSelection={onToggleSelection}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreImages && !searchTerm && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
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
  );
};
