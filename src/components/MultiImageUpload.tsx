
import { useRef } from 'react';
import { Upload, X, Image as ImageIcon, Palette, Gallery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ImageWithSource extends File {
  source?: 'upload' | 'gallery' | 'mim-asset';
}

interface MultiImageUploadProps {
  images: ImageWithSource[];
  onImagesChange: (images: ImageWithSource[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

export const MultiImageUpload = ({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  disabled = false 
}: MultiImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles: ImageWithSource[] = [];
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          const fileWithSource = file as ImageWithSource;
          fileWithSource.source = 'upload';
          validFiles.push(fileWithSource);
        } else {
          console.warn(`File ${file.name} is too large (max 10MB)`);
        }
      } else {
        console.warn(`File ${file.name} is not a valid image`);
      }
    });

    const newImages = [...images, ...validFiles].slice(0, maxImages);
    onImagesChange(newImages);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case 'gallery': return <Gallery className="w-3 h-3" />;
      case 'mim-asset': return <Palette className="w-3 h-3" />;
      default: return <Upload className="w-3 h-3" />;
    }
  };

  const getSourceLabel = (source?: string) => {
    switch (source) {
      case 'gallery': return 'Gallery';
      case 'mim-asset': return 'MIM-ME';
      default: return 'Upload';
    }
  };

  const canAddMore = images.length < maxImages && !disabled;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Reference Images</span>
          <Badge variant="secondary">{images.length}/{maxImages}</Badge>
        </div>
        
        {canAddMore && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Reference ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      {getSourceIcon(image.source)}
                      {getSourceLabel(image.source)}
                    </Badge>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {image.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(image.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center mb-2">
              No reference images selected
            </p>
            <p className="text-sm text-muted-foreground/75 text-center mb-4">
              Add up to {maxImages} images for image-to-image editing
            </p>
            {canAddMore && (
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Images
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {images.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <p>✨ Using {images.length} reference image{images.length !== 1 ? 's' : ''} for image-to-image editing</p>
          <p>🎨 JORBO AI will blend and edit these images based on your prompt</p>
        </div>
      )}
    </div>
  );
};
