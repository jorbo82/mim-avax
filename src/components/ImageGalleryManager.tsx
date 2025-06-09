
import { useState } from 'react';
import { Trash2, AlertTriangle, Heart, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useJobTracking } from '@/hooks/useJobTracking';

const ImageGalleryManager = () => {
  const { userImages, loading, deleteImage, clearAllImages, toggleFavorite } = useJobTracking();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleDeleteImage = async (imageId: string) => {
    setIsDeleting(imageId);
    try {
      await deleteImage(imageId);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      await clearAllImages();
    } finally {
      setIsClearing(false);
    }
  };

  const handleToggleFavorite = async (imageId: string, currentFavorite: boolean) => {
    await toggleFavorite(imageId, !currentFavorite);
  };

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `jorbo-ai-${prompt.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Card className="cute-border cute-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-mim-teal">Gallery Management</CardTitle>
          {userImages.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm"
                  disabled={isClearing}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isClearing ? 'Clearing...' : 'Clear All'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Clear All Images
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your generated images from both the gallery and storage. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAll}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Clear All Images
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {userImages.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No images in gallery yet. Start generating with JORBO AI!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userImages.map((image) => (
              <div key={image.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={image.image_url}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant={image.is_favorite ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleToggleFavorite(image.id, image.is_favorite)}
                      className="w-8 h-8 p-0"
                    >
                      <Heart 
                        className={`w-4 h-4 ${image.is_favorite ? 'fill-current' : ''}`} 
                      />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(image.image_url, image.prompt)}
                      className="w-8 h-8 p-0"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-sm line-clamp-2">{image.prompt}</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{image.size}</Badge>
                    <Badge variant="outline" className="text-xs">{image.quality}</Badge>
                    <Badge variant="secondary" className="text-xs">
                      {image.job_type.replace('_', '-to-')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(image.created_at).toLocaleDateString()}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isDeleting === image.id}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            Delete Image
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this image from your gallery and storage. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteImage(image.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Image
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGalleryManager;
