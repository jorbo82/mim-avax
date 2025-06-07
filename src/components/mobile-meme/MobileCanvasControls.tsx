
import { useRef } from "react";
import { Upload, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileBackgroundSelector from "./MobileBackgroundSelector";

interface MobileCanvasControlsProps {
  backgroundImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlankCanvas: () => void;
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const MobileCanvasControls = ({ 
  backgroundImage, 
  onImageUpload, 
  onBlankCanvas, 
  onBackgroundSelect 
}: MobileCanvasControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-sm"
        >
          <Upload className="mr-2 w-4 h-4" />
          Upload
        </Button>
        <Button
          onClick={onBlankCanvas}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white h-12 text-sm"
          variant="outline"
        >
          <FileImage className="mr-2 w-4 h-4" />
          Blank
        </Button>
      </div>
      
      {backgroundImage && (
        <p className="text-xs text-green-400 text-center">
          Background loaded ✓
        </p>
      )}

      <MobileBackgroundSelector onBackgroundSelect={onBackgroundSelect} />
    </div>
  );
};

export default MobileCanvasControls;
