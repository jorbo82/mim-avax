
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Check } from 'lucide-react';
import { useMimAssetLibrary } from '@/hooks/useMimAssetLibrary';

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

  // Use filteredAssets or allAssets based on search/category filtering
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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Select MIM Assets
            <Badge variant="secondary">
              {selectedAssetIds.length}/{maxSelections} selected
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Choose up to {maxSelections} MIM assets to use as reference images for AI generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryClick(category)}
                className="whitespace-nowrap"
              >
                {category === 'all' ? 'All' : 
                 category === 'mim-character' ? 'Characters' : 
                 category === 'background' ? 'Backgrounds' : 
                 category}
              </Button>
            ))}
          </div>

          {assetsToShow.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No assets match your search' : 'No assets in library yet'}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {assetsToShow.map((asset) => (
                <Card
                  key={asset.id}
                  className={`cursor-pointer transition-all ${
                    selectedAssetIds.includes(asset.id)
                      ? 'ring-2 ring-mim-teal shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleSelection(asset.id)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <img
                        src={asset.url}
                        alt="MIM Asset"
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      {selectedAssetIds.includes(asset.id) && (
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
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSelectAssets}
            disabled={selectedAssetIds.length === 0 || isConverting}
            className={`min-w-[140px] ${
              selectedAssetIds.length === 0 
                ? 'bg-muted text-muted-foreground border-muted hover:bg-muted' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
            }`}
          >
            {isConverting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Converting...
              </>
            ) : (
              `Use ${selectedAssetIds.length} Asset${selectedAssetIds.length !== 1 ? 's' : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
