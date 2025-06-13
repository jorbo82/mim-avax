
import { GalleryImageSkeleton } from './GalleryImageSkeleton';

interface GalleryGridSkeletonProps {
  count?: number;
}

export const GalleryGridSkeleton = ({ count = 8 }: GalleryGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <GalleryImageSkeleton key={index} />
      ))}
    </div>
  );
};
