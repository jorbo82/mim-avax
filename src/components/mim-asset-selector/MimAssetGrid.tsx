
import { MimAsset } from '@/hooks/useMimAssetLibrary';
import { MimAssetCard } from './MimAssetCard';

interface MimAssetGridProps {
  assets: MimAsset[];
  selectedAssetIds: string[];
  onToggleSelection: (assetId: string) => void;
  searchTerm: string;
}

export const MimAssetGrid = ({
  assets,
  selectedAssetIds,
  onToggleSelection,
  searchTerm
}: MimAssetGridProps) => {
  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchTerm ? 'No assets match your search' : 'No assets in library yet'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {assets.map((asset) => (
        <MimAssetCard
          key={asset.id}
          asset={asset}
          isSelected={selectedAssetIds.includes(asset.id)}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </div>
  );
};
