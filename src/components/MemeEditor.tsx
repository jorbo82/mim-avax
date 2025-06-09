import { useState, useRef, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import MemeCanvas from "./MemeCanvas";
import AssetLibrary from "./meme-canvas/AssetLibrary";
import MemeEditorHeader from "./meme-canvas/MemeEditorHeader";
import CanvasControls from "./meme-canvas/CanvasControls";
import TextControls from "./meme-canvas/TextControls";
import ObjectControls from "./meme-canvas/ObjectControls";
import DownloadButton from "./meme-canvas/DownloadButton";
import { useKeyboardShortcuts } from "./meme-canvas/useKeyboardShortcuts";

interface MemeEditorProps {
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MemeEditor = ({ onClose, initialBackgroundImage }: MemeEditorProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [aspectRatio, setAspectRatio] = useState<string | undefined>(undefined);
  const canvasRef = useRef<any>(null);

  // Set initial background image when component mounts
  useEffect(() => {
    if (initialBackgroundImage) {
      setBackgroundImage(initialBackgroundImage);
    }
  }, [initialBackgroundImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
        setAspectRatio(undefined); // Reset aspect ratio when uploading image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlankCanvas = (selectedAspectRatio?: string) => {
    setBackgroundImage(null);
    setAspectRatio(selectedAspectRatio);
  };

  const handleBackgroundSelect = (backgroundUrl: string) => {
    setBackgroundImage(backgroundUrl);
    setAspectRatio(undefined); // Reset aspect ratio when selecting background
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

  const handleBringForward = () => {
    if (canvasRef.current) {
      canvasRef.current.bringSelectedObjectForward();
    }
  };

  const handleSendBackward = () => {
    if (canvasRef.current) {
      canvasRef.current.sendSelectedObjectBackward();
    }
  };

  const handleAssetSelect = (assetUrl: string) => {
    if (canvasRef.current) {
      canvasRef.current.addAssetToCanvas(assetUrl);
    }
  };

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onRotate: handleRotate,
    onFlipHorizontal: handleFlipHorizontal,
    onFlipVertical: handleFlipVertical,
    onDelete: handleDelete,
    onBringForward: handleBringForward,
    onSendBackward: handleSendBackward,
    onDownload: handleDownload,
  });

  return (
    <TooltipProvider>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <MemeEditorHeader onClose={onClose} />

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Controls Panel with ScrollArea */}
          <div className="w-full lg:w-80 border-r border-mim-teal/30 bg-mim-cream/20 dark:bg-mim-brown/20">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
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
                  onBringForward={handleBringForward}
                  onSendBackward={handleSendBackward}
                />

                <DownloadButton onDownload={handleDownload} />
              </div>
            </ScrollArea>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-4">
            <MemeCanvas
              ref={canvasRef}
              backgroundImage={backgroundImage}
              topText={topText}
              bottomText={bottomText}
              aspectRatio={aspectRatio}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MemeEditor;
