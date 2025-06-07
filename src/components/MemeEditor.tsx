
import { useState, useRef } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import MemeCanvas from "./MemeCanvas";
import AssetLibrary from "./meme-canvas/AssetLibrary";
import MemeEditorHeader from "./meme-canvas/MemeEditorHeader";
import CanvasControls from "./meme-canvas/CanvasControls";
import TextControls from "./meme-canvas/TextControls";
import ObjectControls from "./meme-canvas/ObjectControls";
import DownloadButton from "./meme-canvas/DownloadButton";

interface MemeEditorProps {
  onClose: () => void;
}

const MemeEditor = ({ onClose }: MemeEditorProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
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

  const handleBlankCanvas = () => {
    setBackgroundImage(null);
  };

  const handleBackgroundSelect = (backgroundUrl: string) => {
    setBackgroundImage(backgroundUrl);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      canvasRef.current.downloadMeme();
    }
  };

  const handleRotate = () => {
    if (canvasRef.current) {
      canvasRef.current.rotateSelectedObject();
    }
  };

  const handleFlipHorizontal = () => {
    if (canvasRef.current) {
      canvasRef.current.flipSelectedObjectHorizontal();
    }
  };

  const handleFlipVertical = () => {
    if (canvasRef.current) {
      canvasRef.current.flipSelectedObjectVertical();
    }
  };

  const handleDelete = () => {
    if (canvasRef.current) {
      canvasRef.current.deleteSelectedObject();
    }
  };

  const handleAssetSelect = (assetUrl: string) => {
    if (canvasRef.current) {
      canvasRef.current.addAssetToCanvas(assetUrl);
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <MemeEditorHeader onClose={onClose} />

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Controls Panel */}
          <div className="w-full lg:w-80 p-4 border-r border-purple-500/30 bg-purple-900/20 overflow-y-auto">
            <div className="space-y-4">
              <CanvasControls 
                backgroundImage={backgroundImage}
                onImageUpload={handleImageUpload}
                onBlankCanvas={handleBlankCanvas}
                onBackgroundSelect={handleBackgroundSelect}
              />

              {/* Asset Library */}
              <AssetLibrary 
                assets={canvasRef.current?.assets || []}
                onAssetSelect={handleAssetSelect}
              />

              <TextControls 
                topText={topText}
                bottomText={bottomText}
                onTopTextChange={setTopText}
                onBottomTextChange={setBottomText}
              />

              <ObjectControls 
                onRotate={handleRotate}
                onFlipHorizontal={handleFlipHorizontal}
                onFlipVertical={handleFlipVertical}
                onDelete={handleDelete}
              />

              <DownloadButton onDownload={handleDownload} />
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
    </TooltipProvider>
  );
};

export default MemeEditor;
