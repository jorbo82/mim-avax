
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  maxSelections = 5 
}: MimAssetSelectorProps) => {
  const { filteredAssets, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, categories } = useMimAssetLibrary();
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);

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

  const convertAssetToFile = async (assetUrl: string, filename: string): Promise<File | null> => {
    try {
      const response = await fetch(assetUrl);
      const blob = await response.blob();
      
      if (blob.size > 10 * 1024 * 1024) {
        console.warn(`Asset ${filename} is too large`);
        return null;
      }
      
      return new File([blob], filename, { type: blob.type || 'image/png' });
    } catch (error) {
      console.error(`Failed to convert asset ${filename}:`, error);
      return null;
    }
  };

  const handleSelectAssets = async () => {
    if (selectedAssetIds.length === 0) return;

    setIsConverting(true);
    
    try {
      const assetFiles: File[] = [];
      
      for (const assetId of selectedAssetIds) {
        const asset = filteredAssets.find(a => a.id === assetId);
        if (asset) {
          const filename = `mim_asset_${asset.id}.png`;
          const file = await convertAssetToFile(asset.url, filename);
          if (file) {
            assetFiles.push(file);
          }
        }
      }

      onSelectAssets(assetFiles);
      setSelectedAssetIds([]);
      onClose();
    } catch (error) {
      console.error('Error converting MIM-ME assets:', error);
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

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'mim-character': return 'MIM Characters';
      case 'background': return 'Backgrounds';
      case 'user-generated': return 'Gallery';
      default: return 'All Assets';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Select MIM-ME Assets
            <Badge variant="secondary">
              {selectedAssetIds.length}/{maxSelections} selected
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search MIM-ME assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {getCategoryDisplayName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredAssets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No assets match your search' : 'No assets available'}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
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
                        alt={asset.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      {selectedAssetIds.includes(asset.id) && (
                        <div className="absolute top-2 right-2 bg-mim-teal text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-1">
                        {asset.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {asset.type}
                        </Badge>
                        {asset.category && (
                          <Badge variant="secondary" className="text-xs">
                            {asset.category}
                          </Badge>
                        )}
                      </div>
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
            className="bg-mim-teal hover:bg-mim-teal-dark"
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
