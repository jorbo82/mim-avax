
import { useState, useRef, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Settings, Image, Type, Layers, Download } from "lucide-react";
import MemeCanvas from "./MemeCanvas";
import MobileCanvasControls from "./mobile-meme/MobileCanvasControls";
import MobileTextControls from "./mobile-meme/MobileTextControls";
import MobileAssetLibrary from "./mobile-meme/MobileAssetLibrary";

interface MobileOptimizedMemeEditorProps {
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MobileOptimizedMemeEditor = ({ onClose, initialBackgroundImage }: MobileOptimizedMemeEditorProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [isControlsOpen, setIsControlsOpen] = useState(false);
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

  return (
    <TooltipProvider>
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-purple-900/95 to-blue-900/95">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
          <h2 className="text-xl font-bold text-yellow-400">MIM-ME</h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDownload}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="w-full h-full relative">
            <MemeCanvas
              ref={canvasRef}
              backgroundImage={backgroundImage}
              topText={topText}
              bottomText={bottomText}
            />
          </div>
        </div>

        {/* Mobile Bottom Controls */}
        <div className="border-t border-purple-500/30 bg-purple-900/30">
          <Tabs defaultValue="canvas" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-0 h-12">
              <TabsTrigger 
                value="canvas" 
                className="flex flex-col items-center gap-1 data-[state=active]:bg-purple-700/50 text-white"
              >
                <Image className="w-4 h-4" />
                <span className="text-xs">Canvas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="text" 
                className="flex flex-col items-center gap-1 data-[state=active]:bg-purple-700/50 text-white"
              >
                <Type className="w-4 h-4" />
                <span className="text-xs">Text</span>
              </TabsTrigger>
              <TabsTrigger 
                value="assets" 
                className="flex flex-col items-center gap-1 data-[state=active]:bg-purple-700/50 text-white"
              >
                <Layers className="w-4 h-4" />
                <span className="text-xs">Assets</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="max-h-64 overflow-y-auto">
              <TabsContent value="canvas" className="m-0 p-4">
                <MobileCanvasControls 
                  backgroundImage={backgroundImage}
                  onImageUpload={handleImageUpload}
                  onBlankCanvas={handleBlankCanvas}
                  onBackgroundSelect={handleBackgroundSelect}
                />
              </TabsContent>
              
              <TabsContent value="text" className="m-0 p-4">
                <MobileTextControls 
                  topText={topText}
                  bottomText={bottomText}
                  onTopTextChange={setTopText}
                  onBottomTextChange={setBottomText}
                />
              </TabsContent>
              
              <TabsContent value="assets" className="m-0 p-4">
                <MobileAssetLibrary 
                  assets={canvasRef.current?.assets || []}
                  onAssetSelect={handleAssetSelect}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MobileOptimizedMemeEditor;
