
import { useState, useRef, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileEditorHeader from "./mobile-meme/MobileEditorHeader";
import MobileEditorCanvas from "./mobile-meme/MobileEditorCanvas";
import MobileEditorTabs from "./mobile-meme/MobileEditorTabs";

interface MobileOptimizedMemeEditorProps {
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MobileOptimizedMemeEditor = ({ onClose, initialBackgroundImage }: MobileOptimizedMemeEditorProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
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

  const handleAssetSelect = (assetUrl: string) => {
    if (canvasRef.current) {
      canvasRef.current.addAssetToCanvas(assetUrl);
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

  const handleZoomIn = () => {
    if (canvasRef.current) {
      canvasRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (canvasRef.current) {
      canvasRef.current.zoomOut();
    }
  };

  const handleResetZoom = () => {
    if (canvasRef.current) {
      canvasRef.current.resetZoom();
    }
  };

  return (
    <TooltipProvider>
      <div 
        className="w-full h-full flex flex-col"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          position: 'relative'
        }}
      >
        <MobileEditorHeader 
          onClose={onClose}
          onDownload={handleDownload}
        />

        <MobileEditorCanvas
          ref={canvasRef}
          backgroundImage={backgroundImage}
          topText={topText}
          bottomText={bottomText}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />

        <MobileEditorTabs
          backgroundImage={backgroundImage}
          onImageUpload={handleImageUpload}
          onBlankCanvas={handleBlankCanvas}
          onBackgroundSelect={handleBackgroundSelect}
          topText={topText}
          bottomText={bottomText}
          onTopTextChange={setTopText}
          onBottomTextChange={setBottomText}
          assets={canvasRef.current?.assets || []}
          onAssetSelect={handleAssetSelect}
          onRotate={handleRotate}
          onFlipHorizontal={handleFlipHorizontal}
          onFlipVertical={handleFlipVertical}
          onDelete={handleDelete}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />
      </div>
    </TooltipProvider>
  );
};

export default MobileOptimizedMemeEditor;
