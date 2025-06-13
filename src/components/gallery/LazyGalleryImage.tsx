
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { UserImage } from '@/types/jobTracking';

interface LazyGalleryImageProps {
  image: UserImage;
  isSelected: boolean;
  onToggleSelection: (imageUrl: string) => void;
}

export const LazyGalleryImage = ({ image, isSelected, onToggleSelection }: LazyGalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    console.log('LazyGalleryImage: Image loaded successfully:', image.image_url);
  };

  const handleImageError = () => {
    setIsError(true);
    console.error('LazyGalleryImage: Image failed to load:', image.image_url);
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoaded(false);
    if (imgRef.current) {
      imgRef.current.src = image.image_url;
    }
  };

  return (
    <Card
      ref={containerRef}
      className={`cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-mim-teal shadow-lg'
          : 'hover:shadow-md'
      }`}
      onClick={() => onToggleSelection(image.image_url)}
    >
      <CardContent className="p-0">
        <div className="aspect-square relative">
          {!isInView ? (
            <Skeleton className="w-full h-full rounded-t-lg" />
          ) : isError ? (
            <div 
              className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-t-lg flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRetry();
              }}
            >
              <div className="text-center text-sm text-muted-foreground">
                <p>Failed to load</p>
                <p className="text-xs">Click to retry</p>
              </div>
            </div>
          ) : (
            <>
              {!isLoaded && (
                <Skeleton className="w-full h-full rounded-t-lg absolute inset-0" />
              )}
              <img
                ref={imgRef}
                src={image.image_url}
                alt="Gallery"
                className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            </>
          )}
          {isSelected && (
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
  );
};
