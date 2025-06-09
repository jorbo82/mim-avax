
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMimAssetLibrary } from "@/hooks/useMimAssetLibrary";

interface AssetLibraryProps {
  onAssetSelect: (assetUrl: string) => void;
}

const AssetLibrary = ({ onAssetSelect }: AssetLibraryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    filteredAssets,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    categories
  } = useMimAssetLibrary();

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all': return 'All Assets';
      case 'mim-character': return 'MIM Characters';
      case 'background': return 'Backgrounds';
      case 'user-generated': return 'Your Gallery';
      default: return category;
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'mim-character': return '🧙';
      case 'background': return '🖼️';
      case 'user-generated': return '🎨';
      default: return '✨';
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-mim-teal/20 border-mim-teal/50 text-mim-teal hover:bg-mim-teal/30 cute-border"
        >
          <span className="text-sm font-medium">Asset Library</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-2">
        {/* Search and Filter Controls */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-mim-teal/30 focus:border-mim-teal text-sm"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-mim-teal/30 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {getCategoryLabel(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Assets Grid */}
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-mim-teal/50 scrollbar-track-mim-cream/30">
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 pr-2">
              {filteredAssets.map((asset) => (
                <Button
                  key={asset.id}
                  onClick={() => onAssetSelect(asset.url)}
                  className="h-16 p-2 bg-mim-cream/50 hover:bg-mim-teal/20 border border-mim-teal/30 flex flex-col items-center justify-center text-xs cute-border transition-all duration-200 hover:scale-105 relative"
                  variant="outline"
                >
                  <img 
                    src={asset.url} 
                    alt={asset.name}
                    className="w-8 h-8 object-contain mb-1"
                    style={{ filter: 'drop-shadow(0 0 2px rgba(52, 152, 219, 0.5))' }}
                  />
                  <span className="text-mim-teal truncate w-full text-center font-medium">
                    {asset.name}
                  </span>
                  <span className="absolute top-1 right-1 text-xs">
                    {getAssetTypeIcon(asset.type)}
                  </span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-mim-teal/70">
              <p className="text-sm">No assets found</p>
              <p className="text-xs mt-1">Try adjusting your search or category</p>
            </div>
          )}
        </div>
        
        <p className="text-xs text-mim-teal/70 text-center">
          Click to add asset to canvas ✨
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AssetLibrary;
