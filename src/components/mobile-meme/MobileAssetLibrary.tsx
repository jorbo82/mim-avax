
import { Button } from "@/components/ui/button";

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
  return (
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-3">
        Transparent Assets
      </label>
      {assets.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {assets.map((asset) => (
            <Button
              key={asset.id}
              onClick={() => onAssetSelect(asset.url)}
              className="h-16 p-1 bg-purple-800/30 hover:bg-purple-700/50 border border-purple-500/30 flex flex-col items-center justify-center"
              variant="outline"
            >
              <img 
                src={asset.url} 
                alt={asset.name}
                className="w-8 h-8 object-contain mb-1"
                style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}
              />
              <span className="text-purple-200 text-xs text-center leading-tight">
                {asset.name.split(' ')[0]}
              </span>
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-purple-400 text-center py-4">
          No assets available
        </p>
      )}
    </div>
  );
};

export default MobileAssetLibrary;
