
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { MimAsset } from '@/hooks/useMimAssetLibrary';

interface MimAssetCardProps {
  asset: MimAsset;
  isSelected: boolean;
  onToggleSelection: (assetId: string) => void;
}

export const MimAssetCard = ({ asset, isSelected, onToggleSelection }: MimAssetCardProps) => {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-mim-teal shadow-lg'
          : 'hover:shadow-md'
      }`}
      onClick={() => onToggleSelection(asset.id)}
    >
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <img
            src={asset.url}
            alt="MIM Asset"
            className="w-full h-full object-cover rounded-t-lg"
          />
          {isSelected && (
            <div className="absolute top-2 right-2 bg-mim-teal text-white rounded-full w-6 h-6 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {asset.name}
          </p>
          {asset.category && (
            <Badge variant="outline" className="text-xs mt-2">
              {asset.category}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
