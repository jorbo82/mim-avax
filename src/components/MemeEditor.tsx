
import { useState, useRef } from "react";
import { X, Upload, Download, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MemeCanvas from "./MemeCanvas";

interface MemeEditorProps {
  onClose: () => void;
}

const MemeEditor = ({ onClose }: MemeEditorProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      canvasRef.current.downloadMeme();
    }
  };

  const handleRotate = () => {
    if (canvasRef.current) {
      canvasRef.current.rotateWizard();
    }
  };

  const handleFlipHorizontal = () => {
    if (canvasRef.current) {
      canvasRef.current.flipWizardHorizontal();
    }
  };

  const handleFlipVertical = () => {
    if (canvasRef.current) {
      canvasRef.current.flipWizardVertical();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
          🧙‍♂️ MIM-ME Generator
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Controls Panel */}
        <div className="w-full lg:w-80 p-4 border-r border-purple-500/30 bg-purple-900/20">
          <div className="space-y-4">
            {/* Upload Image */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Upload Background Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="mr-2 w-4 h-4" />
                Choose Image
              </Button>
            </div>

            {/* Text Inputs */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Top Text
              </label>
              <Input
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="Enter top text..."
                className="bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Bottom Text
              </label>
              <Input
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="Enter bottom text..."
                className="bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300"
              />
            </div>

            {/* Wizard Controls */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Wizard Head Controls
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={handleRotate}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleFlipHorizontal}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleFlipVertical}
                  size="sm"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <FlipVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Download */}
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              disabled={!backgroundImage}
            >
              <Download className="mr-2 w-4 h-4" />
              Download Meme
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4">
          <MemeCanvas
            ref={canvasRef}
            backgroundImage={backgroundImage}
            topText={topText}
            bottomText={bottomText}
          />
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;
