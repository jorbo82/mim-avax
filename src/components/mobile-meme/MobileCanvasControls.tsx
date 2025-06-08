
import { useRef } from "react";
import { Upload, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MobileBackgroundSelector from "./MobileBackgroundSelector";

interface MobileCanvasControlsProps {
  backgroundImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlankCanvas: (aspectRatio?: string) => void;
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const MobileCanvasControls = ({ 
  backgroundImage, 
  onImageUpload, 
  onBlankCanvas, 
  onBackgroundSelect 
}: MobileCanvasControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlankCanvas = (aspectRatio: string) => {
    onBlankCanvas(aspectRatio);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-blue-300 mb-3">
          Canvas Setup
        </label>
        <div className="grid grid-cols-1 gap-3">
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
          
          <div className="space-y-2">
            <label className="block text-xs text-blue-300">Blank Canvas</label>
            <Select onValueChange={handleBlankCanvas}>
              <SelectTrigger className="w-full bg-gray-600 hover:bg-gray-700 border-gray-500 h-12">
                <SelectValue placeholder="Choose aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    1:1 Square
                  </div>
                </SelectItem>
                <SelectItem value="9:16">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    9:16 Portrait
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {backgroundImage && (
          <p className="text-xs text-green-400 text-center mt-2">
            Background loaded ✓
          </p>
        )}
      </div>

      <MobileBackgroundSelector onBackgroundSelect={onBackgroundSelect} />
    </div>
  );
};

export default MobileCanvasControls;
