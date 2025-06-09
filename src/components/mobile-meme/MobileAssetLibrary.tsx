
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Asset {
  id: string;
  name: string;
  url: string;
}

interface MobileAssetLibraryProps {
  assets: Asset[];
  onAssetSelect: (assetUrl: string) => void;
}

const MobileAssetLibrary = ({ assets, onAssetSelect }: MobileAssetLibraryProps) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open/expanded

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-mim-teal/20 border-mim-teal/50 text-mim-teal hover:bg-mim-teal/30 h-12 cute-border"
        >
          <span className="text-sm font-medium">Cute MIM Assets</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-2">
        {assets.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {assets.map((asset) => (
              <Button
                key={asset.id}
                onClick={() => onAssetSelect(asset.url)}
                className="h-16 p-1 bg-mim-cream/50 hover:bg-mim-teal/20 border border-mim-teal/30 flex flex-col items-center justify-center cute-border transition-all duration-200 hover:scale-105"
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
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-mim-teal/70 text-center py-4">
            No assets available
          </p>
        )}
        <p className="text-xs text-mim-teal/70 text-center">
          Click to add cute asset to canvas ✨
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileAssetLibrary;
