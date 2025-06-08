import { useState, useRef, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileEditorHeader from "./mobile-meme/MobileEditorHeader";
import MobileEditorCanvas from "./mobile-meme/MobileEditorCanvas";
import MobileEditorTabs from "./mobile-meme/MobileEditorTabs";
import AspectRatioSelector from "./mobile-meme/AspectRatioSelector";
import { ASSET_LIBRARY } from "./meme-canvas/assetLibrary";
import { useKeyboardShortcuts } from "./meme-canvas/useKeyboardShortcuts";

interface MobileOptimizedMemeEditorProps {
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MobileOptimizedMemeEditor = ({ onClose, initialBackgroundImage }: MobileOptimizedMemeEditorProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [aspectRatio, setAspectRatio] = useState<string | undefined>(undefined);
  const [showAspectRatioSelector, setShowAspectRatioSelector] = useState(false);
  const canvasRef = useRef<any>(null);

  // Set initial background image when component mounts
  useEffect(() => {
    if (initialBackgroundImage) {
      setBackgroundImage(initialBackgroundImage);
      setShowAspectRatioSelector(false);
    } else {
      setShowAspectRatioSelector(true);
    }
  }, [initialBackgroundImage]);

  const handleAspectRatioSelect = (selectedAspectRatio: string) => {
    setAspectRatio(selectedAspectRatio);
    setShowAspectRatioSelector(false);
  };

  const handleSkipAspectRatio = () => {
    setShowAspectRatioSelector(false);
  };

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

  const handlePostToX = () => {
    if (canvasRef.current) {
      // Get the canvas element and convert to data URL
      const canvas = canvasRef.current.fabricCanvasRef?.current;
      if (canvas) {
        const dataURL = canvas.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 2
        });
        
        // Create a tweet text with hashtags
        const tweetText = "Just created this epic meme with MIM-ME! 🧙‍♂️✨ #MIMME #MagicInternetMoney #MemeMagic #AVAX #DeFi";
        
        // Convert data URL to blob and create object URL for sharing
        fetch(dataURL)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "mim-meme.png", { type: "image/png" });
            
            // Check if Web Share API is available (mainly mobile browsers)
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
              navigator.share({
                title: "MIM-ME Meme",
                text: tweetText,
                files: [file]
              }).catch(console.error);
            } else {
              // Fallback to Twitter Web Intent
              const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(window.location.origin)}`;
              window.open(twitterUrl, '_blank', 'width=600,height=400');
            }
          })
          .catch(console.error);
      }
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

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onRotate: handleRotate,
    onFlipHorizontal: handleFlipHorizontal,
    onFlipVertical: handleFlipVertical,
    onDelete: handleDelete,
    onBringForward: handleBringForward,
    onSendBackward: handleSendBackward,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onResetZoom: handleResetZoom,
    onDownload: handleDownload,
  });

  if (showAspectRatioSelector) {
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
            onPostToX={handlePostToX}
          />
          
          <AspectRatioSelector
            onSelect={handleAspectRatioSelect}
            onSkip={handleSkipAspectRatio}
          />
        </div>
      </TooltipProvider>
    );
  }

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
          onPostToX={handlePostToX}
        />

        <MobileEditorCanvas
          ref={canvasRef}
          backgroundImage={backgroundImage}
          topText={topText}
          bottomText={bottomText}
          aspectRatio={aspectRatio}
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
          assets={ASSET_LIBRARY}
          onAssetSelect={handleAssetSelect}
          onRotate={handleRotate}
          onFlipHorizontal={handleFlipHorizontal}
          onFlipVertical={handleFlipVertical}
          onDelete={handleDelete}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onBringForward={handleBringForward}
          onSendBackward={handleSendBackward}
        />
      </div>
    </TooltipProvider>
  );
};

export default MobileOptimizedMemeEditor;
