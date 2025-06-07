
import { useRef } from "react";
import { Upload, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundSelector from "./BackgroundSelector";

interface CanvasControlsProps {
  backgroundImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlankCanvas: () => void;
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const CanvasControls = ({ 
  backgroundImage, 
  onImageUpload, 
  onBlankCanvas, 
  onBackgroundSelect 
}: CanvasControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {/* Canvas Setup */}
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">
          Canvas Setup
        </label>
        <div className="grid grid-cols-1 gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="mr-2 w-4 h-4" />
            Upload Background
          </Button>
          <Button
            onClick={onBlankCanvas}
            className="w-full bg-gray-600 hover:bg-gray-700"
            variant="outline"
          >
            <FileImage className="mr-2 w-4 h-4" />
            Blank Canvas
          </Button>
        </div>
        {backgroundImage && (
          <p className="text-xs text-green-400 mt-1">
            Background image loaded
          </p>
        )}
      </div>

      {/* Background Meme Selector - Now Collapsible */}
      <BackgroundSelector onBackgroundSelect={onBackgroundSelect} />
    </div>
  );
};

export default CanvasControls;
