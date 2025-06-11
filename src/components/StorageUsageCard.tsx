
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { HardDrive, Image as ImageIcon } from 'lucide-react';
import { useStorageStats } from '@/hooks/useStorageStats';

const StorageUsageCard = () => {
  const { stats, loading } = useStorageStats();

  if (loading) {
    return (
      <Card className="cute-border cute-shadow">
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-mim-teal border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }

  const usagePercentage = (stats.imageCount / stats.storageLimit) * 100;
  const isNearLimit = usagePercentage > 80;

  return (
    <Card className="cute-border cute-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-mim-teal">
          <HardDrive className="w-4 h-4" />
          Storage Usage
        </CardTitle>
        <CardDescription>
          Your image storage quota and usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {stats.imageCount} / {stats.storageLimit} images
            </span>
          </div>
          <Badge 
            variant={isNearLimit ? "destructive" : "secondary"}
            className="text-xs"
          >
            {stats.remainingSlots} remaining
          </Badge>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={usagePercentage} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground">
            {usagePercentage.toFixed(1)}% of storage used
            {isNearLimit && ' - Consider deleting old images'}
          </p>
        </div>

        {stats.remainingSlots === 0 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
            Storage limit reached! Oldest images will be automatically deleted when you generate new ones.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StorageUsageCard;
