
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';

interface GallerySelectorHeaderProps {
  selectedCount: number;
  maxSelections: number;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const GallerySelectorHeader = ({
  selectedCount,
  maxSelections,
  isRefreshing,
  onRefresh
}: GallerySelectorHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center justify-between">
        Select Images from Gallery
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-8"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge variant="secondary">
            {selectedCount}/{maxSelections} selected
          </Badge>
        </div>
      </DialogTitle>
      <DialogDescription>
        Choose up to {maxSelections} images from your gallery to use as reference images for AI generation.
        {isRefreshing && (
          <span className="text-mim-teal ml-2">🔄 Refreshing gallery...</span>
        )}
      </DialogDescription>
    </DialogHeader>
  );
};
