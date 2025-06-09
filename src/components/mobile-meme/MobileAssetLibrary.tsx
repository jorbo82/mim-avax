
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMimAssetLibrary } from "@/hooks/useMimAssetLibrary";

interface MobileAssetLibraryProps {
  onAssetSelect: (assetUrl: string) => void;
}

const MobileAssetLibrary = ({ onAssetSelect }: MobileAssetLibraryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localSearch, setLocalSearch] = useState('');
  const [assetType, setAssetType] = useState<'all' | 'mim-character' | 'user-generated'>('all');
  
  const { mimCharacters, userGenerated } = useMimAssetLibrary();

  // Combine and filter assets
  const allAssets = assetType === 'all' 
    ? [...mimCharacters, ...userGenerated]
    : assetType === 'mim-character' 
      ? mimCharacters 
      : userGenerated;

  const filteredAssets = allAssets.filter(asset =>
    asset.name.toLowerCase().includes(localSearch.toLowerCase())
  );

  const getAssetTypeIcon = (type: string) => {
    return type === 'user-generated' ? '🎨' : '🧙';
  };

  const handleAssetTypeChange = (value: string) => {
    setAssetType(value as 'all' | 'mim-character' | 'user-generated');
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-mim-teal/20 border-mim-teal/50 text-mim-teal hover:bg-mim-teal/30 h-12 cute-border"
        >
          <span className="text-sm font-medium">Asset Library</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-2">
        {/* Search and Filter Controls */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search assets..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 border-mim-teal/30 text-sm h-10"
            />
          </div>
          
          <Select value={assetType} onValueChange={handleAssetTypeChange}>
            <SelectTrigger className="border-mim-teal/30 text-sm h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="mim-character">MIM Characters</SelectItem>
              <SelectItem value="user-generated">Your Gallery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredAssets.map((asset) => (
              <Button
                key={asset.id}
                onClick={() => onAssetSelect(asset.url)}
                className="h-16 p-1 bg-mim-cream/50 hover:bg-mim-teal/20 border border-mim-teal/30 flex flex-col items-center justify-center cute-border transition-all duration-200 hover:scale-105 relative"
                variant="outline"
              >
                <img 
                  src={asset.url} 
                  alt={asset.name}
                  className="w-8 h-8 object-contain mb-1"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(52, 152, 219, 0.5))' }}
                />
                <span className="text-mim-teal text-xs text-center leading-tight font-medium">
                  {asset.name.split(' ')[0]}
                </span>
                <span className="absolute top-1 right-1 text-xs">
                  {getAssetTypeIcon(asset.type)}
                </span>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-mim-teal/70 text-center py-4">
            No assets found
          </p>
        )}
        <p className="text-xs text-mim-teal/70 text-center">
          Click to add asset to canvas ✨
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileAssetLibrary;
