
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Check } from 'lucide-react';
import { useJobTracking } from '@/hooks/useJobTracking';

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
  maxSelections = 5 
}: GallerySelectorProps) => {
  const { userImages, loading } = useJobTracking();
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConverting, setIsConverting] = useState(false);

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
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (blob.size > 10 * 1024 * 1024) {
        console.warn(`Image ${filename} is too large`);
        return null;
      }
      
      return new File([blob], filename, { type: blob.type || 'image/png' });
    } catch (error) {
      console.error(`Failed to convert ${filename}:`, error);
      return null;
    }
  };

  const handleSelectImages = async () => {
    if (selectedUrls.length === 0) return;

    setIsConverting(true);
    
    try {
      const imageFiles: File[] = [];
      
      for (const url of selectedUrls) {
        const image = userImages.find(img => img.image_url === url);
        if (image) {
          const filename = `gallery_${image.id}.png`;
          const file = await convertUrlToFile(url, filename);
          if (file) {
            imageFiles.push(file);
          }
        }
      }

      onSelectImages(imageFiles);
      setSelectedUrls([]);
      onClose();
    } catch (error) {
      console.error('Error converting gallery images:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const resetAndClose = () => {
    setSelectedUrls([]);
    setSearchTerm('');
    onClose();
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

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No images match your search' : 'No images in gallery yet'}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className={`cursor-pointer transition-all ${
                    selectedUrls.includes(image.image_url)
                      ? 'ring-2 ring-mim-teal shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleSelection(image.image_url)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <img
                        src={image.image_url}
                        alt="Gallery"
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      {selectedUrls.includes(image.image_url) && (
                        <div className="absolute top-2 right-2 bg-mim-teal text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {image.prompt}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {image.size}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {image.quality}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSelectImages}
            disabled={selectedUrls.length === 0 || isConverting}
            className="bg-mim-teal hover:bg-mim-teal-dark"
          >
            {isConverting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Converting...
              </>
            ) : (
              `Use ${selectedUrls.length} Image${selectedUrls.length !== 1 ? 's' : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
