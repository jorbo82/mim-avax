
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Heart, Download, Trash2, RefreshCw, Image as ImageIcon, Loader2, ChevronDown } from 'lucide-react';
import { useJobTracking } from '@/hooks/useJobTracking';
import { downloadImage } from '@/utils/imageUtils';
import { formatDistanceToNow } from 'date-fns';
import StorageUsageCard from './StorageUsageCard';

const ImageGalleryManager = () => {
  const { 
    userImages, 
    loading, 
    hasMoreImages,
    toggleFavorite, 
    deleteImage, 
    clearAllImages, 
    refetchImages,
    loadMoreImages 
  } = useJobTracking();
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleToggleFavorite = async (imageId: string, currentFavorite: boolean) => {
    await toggleFavorite(imageId, !currentFavorite);
  };

  const handleDeleteImage = async (imageId: string) => {
    setDeletingImageId(imageId);
    await deleteImage(imageId);
    setDeletingImageId(null);
  };

  const handleDownloadImage = (imageUrl: string, imageId: string) => {
    downloadImage(imageUrl, `jorbo-ai-${imageId}.png`);
  };

  const handleClearAll = async () => {
    setClearingAll(true);
    await clearAllImages();
    setClearingAll(false);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await loadMoreImages();
    setLoadingMore(false);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border border-muted overflow-hidden">
          <Skeleton className="w-full h-48" />
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <StorageUsageCard />
      
      <Card className="cute-border cute-shadow">
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-mim-teal">
                <ImageIcon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">JORBO AI Gallery</span>
                <Badge variant="secondary" className="ml-2">
                  {userImages.length} images
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                Your collection of AI-generated masterpieces
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refetchImages}
                className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              {userImages.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear All Images?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete all your generated images. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAll}
                        disabled={clearingAll}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        {clearingAll ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Clearing...
                          </>
                        ) : (
                          'Clear All'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && userImages.length === 0 ? (
            <LoadingSkeleton />
          ) : userImages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No images generated yet</p>
              <p className="text-sm mt-1">Create your first AI masterpiece to start building your gallery</p>
            </div>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userImages.map((image) => (
                  <Card key={image.id} className="border border-muted overflow-hidden">
                    <div className="relative group">
                      <img
                        src={image.image_url}
                        alt={image.prompt}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleToggleFavorite(image.id, image.is_favorite)}
                        >
                          <Heart 
                            className={`w-4 h-4 ${image.is_favorite ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDownloadImage(image.image_url, image.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDeleteImage(image.id)}
                          disabled={deletingImageId === image.id}
                        >
                          {deletingImageId === image.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {image.job_type === 'text_to_image' ? 'Text-to-Image' : 'Image Edit'}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {image.size}
                        </Badge>
                        {image.is_favorite && (
                          <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                        {image.prompt}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(image.created_at), { addSuffix: true })}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {hasMoreImages && (
                <div className="flex justify-center mt-6">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Load More Images
                      </>
                    )}
                  </Button>
                </div>
              )}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageGalleryManager;
