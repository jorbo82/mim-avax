
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Asset {
  id: string;
  name: string;
  url: string;
}

interface AssetLibraryProps {
  assets: Asset[];
  onAssetSelect: (assetUrl: string) => void;
}

const AssetLibrary = ({ assets, onAssetSelect }: AssetLibraryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-mim-teal/20 border-mim-teal/50 text-mim-teal hover:bg-mim-teal/30 cute-border"
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
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-mim-teal/50 scrollbar-track-mim-cream/30">
          <div className="grid grid-cols-2 gap-2 pr-2">
            {assets.map((asset) => (
              <Button
                key={asset.id}
                onClick={() => onAssetSelect(asset.url)}
                className="h-16 p-2 bg-mim-cream/50 hover:bg-mim-teal/20 border border-mim-teal/30 flex flex-col items-center justify-center text-xs cute-border transition-all duration-200 hover:scale-105"
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
              </Button>
            ))}
          </div>
        </div>
        <p className="text-xs text-mim-teal/70 text-center">
          Click to add cute asset to canvas ✨
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AssetLibrary;
