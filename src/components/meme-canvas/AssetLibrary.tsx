
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
          className="w-full justify-between bg-purple-800/30 border-purple-500/30 text-purple-300 hover:bg-purple-700/50"
        >
          <span className="text-sm font-medium">Transparent Assets</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-2">
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-purple-900/30">
          <div className="grid grid-cols-2 gap-2 pr-2">
            {assets.map((asset) => (
              <Button
                key={asset.id}
                onClick={() => onAssetSelect(asset.url)}
                className="h-16 p-2 bg-purple-800/30 hover:bg-purple-700/50 border border-purple-500/30 flex flex-col items-center justify-center text-xs"
                variant="outline"
              >
                <img 
                  src={asset.url} 
                  alt={asset.name}
                  className="w-8 h-8 object-contain mb-1"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}
                />
                <span className="text-purple-200 truncate w-full text-center">
                  {asset.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
        <p className="text-xs text-purple-400">
          Click to add asset to canvas
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AssetLibrary;
