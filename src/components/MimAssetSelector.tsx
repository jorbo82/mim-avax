
import { useState } from 'react';
import { useMimAssetLibrary } from '@/hooks/useMimAssetLibrary';
import { MimAssetDialog } from './mim-asset-selector/MimAssetDialog';
import { MimAssetFilters } from './mim-asset-selector/MimAssetFilters';
import { MimAssetGrid } from './mim-asset-selector/MimAssetGrid';

interface MimAssetSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssets: (assetFiles: File[]) => void;
  maxSelections?: number;
}

export const MimAssetSelector = ({ 
  isOpen, 
  onClose, 
  onSelectAssets, 
  maxSelections = 10 
}: MimAssetSelectorProps) => {
  const { 
    allAssets, 
    filteredAssets, 
    selectedCategory, 
    setSelectedCategory, 
    searchTerm, 
    setSearchTerm,
    categories 
  } = useMimAssetLibrary();
  
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const assetsToShow = searchTerm || selectedCategory !== 'all' ? filteredAssets : allAssets;

  const toggleSelection = (assetId: string) => {
    setSelectedAssetIds(prev => {
      if (prev.includes(assetId)) {
        return prev.filter(id => id !== assetId);
      } else if (prev.length < maxSelections) {
        return [...prev, assetId];
      }
      return prev;
    });
  };

  const convertUrlToFile = async (imageUrl: string, filename: string): Promise<File | null> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (blob.size > 10 * 1024 * 1024) {
        console.warn(`Asset ${filename} is too large`);
        return null;
      }
      
      return new File([blob], filename, { type: blob.type || 'image/png' });
    } catch (error) {
      console.error(`Failed to convert ${filename}:`, error);
      return null;
    }
  };

  const handleSelectAssets = async () => {
    if (selectedAssetIds.length === 0) return;

    setIsConverting(true);
    
    try {
      const assetFiles: File[] = [];
      
      for (const assetId of selectedAssetIds) {
        const asset = allAssets.find(asset => asset.id === assetId);
        if (asset) {
          const filename = `mim_asset_${asset.id}.png`;
          const file = await convertUrlToFile(asset.url, filename);
          if (file) {
            assetFiles.push(file);
          }
        }
      }

      onSelectAssets(assetFiles);
      setSelectedAssetIds([]);
      onClose();
    } catch (error) {
      console.error('Error converting MIM assets:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const resetAndClose = () => {
    setSelectedAssetIds([]);
    setSearchTerm('');
    setSelectedCategory('all');
    onClose();
  };

  return (
    <MimAssetDialog
      isOpen={isOpen}
      onClose={resetAndClose}
      selectedCount={selectedAssetIds.length}
      maxSelections={maxSelections}
      onSelectAssets={handleSelectAssets}
      isConverting={isConverting}
    >
      <div className="space-y-4">
        <MimAssetFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <MimAssetGrid
          assets={assetsToShow}
          selectedAssetIds={selectedAssetIds}
          onToggleSelection={toggleSelection}
          searchTerm={searchTerm}
        />
      </div>
    </MimAssetDialog>
  );
};
