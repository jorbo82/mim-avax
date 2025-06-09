
import { useRef } from "react";
import { Upload, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BackgroundSelector from "./BackgroundSelector";

interface CanvasControlsProps {
  backgroundImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlankCanvas: (aspectRatio?: string) => void;
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const CanvasControls = ({ 
  backgroundImage, 
  onImageUpload, 
  onBlankCanvas, 
  onBackgroundSelect 
}: CanvasControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlankCanvas = (aspectRatio: string) => {
    onBlankCanvas(aspectRatio);
  };

  return (
    <div className="space-y-4">
      {/* Canvas Setup */}
      <div>
        <label className="block text-sm font-medium text-mim-purple mb-2">
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
            className="w-full bg-gradient-to-r from-mim-pink to-mim-purple hover:from-mim-pink-dark hover:to-mim-purple-dark cute-border"
          >
            <Upload className="mr-2 w-4 h-4" />
            Upload Background
          </Button>
          
          <div className="space-y-2">
            <label className="block text-xs text-mim-purple">Blank Canvas</label>
            <Select onValueChange={handleBlankCanvas}>
              <SelectTrigger className="w-full bg-mim-cream/80 hover:bg-mim-cream border-mim-pink/50 cute-border">
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
          <p className="text-xs text-mim-teal mt-1">
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
