
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const GalleryImageSkeleton = () => {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Skeleton className="w-full h-full rounded-t-lg" />
        </div>
        <div className="p-3 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
