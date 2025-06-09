
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Type, Layers, Settings } from "lucide-react";
import MobileCanvasControls from "./MobileCanvasControls";
import MobileTextControls from "./MobileTextControls";
import MobileAssetLibrary from "./MobileAssetLibrary";
import MobileToolsControls from "./MobileToolsControls";

interface MobileEditorTabsProps {
  // Canvas props
  backgroundImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlankCanvas: (aspectRatio?: string) => void;
  onBackgroundSelect: (backgroundUrl: string) => void;
  
  // Text props
  topText: string;
  bottomText: string;
  onTopTextChange: (value: string) => void;
  onBottomTextChange: (value: string) => void;
  
  // Assets props
  onAssetSelect: (assetUrl: string) => void;
  
  // Tools props
  onRotate: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onDelete: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
}

const MobileEditorTabs = ({
  backgroundImage,
  onImageUpload,
  onBlankCanvas,
  onBackgroundSelect,
  topText,
  bottomText,
  onTopTextChange,
  onBottomTextChange,
  onAssetSelect,
  onRotate,
  onFlipHorizontal,
  onFlipVertical,
  onDelete,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onBringForward,
  onSendBackward
}: MobileEditorTabsProps) => {
  return (
    <div className="border-t border-purple-500/30 bg-purple-900/30 shrink-0">
      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-transparent border-0 h-12">
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
          <TabsTrigger 
            value="tools" 
            className="flex flex-col items-center gap-1 data-[state=active]:bg-purple-700/50 text-white"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Tools</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="max-h-64 overflow-y-auto">
          <TabsContent value="canvas" className="m-0 p-4">
            <MobileCanvasControls 
              backgroundImage={backgroundImage}
              onImageUpload={onImageUpload}
              onBlankCanvas={onBlankCanvas}
              onBackgroundSelect={onBackgroundSelect}
            />
          </TabsContent>
          
          <TabsContent value="text" className="m-0 p-4">
            <MobileTextControls 
              topText={topText}
              bottomText={bottomText}
              onTopTextChange={onTopTextChange}
              onBottomTextChange={onBottomTextChange}
            />
          </TabsContent>
          
          <TabsContent value="assets" className="m-0 p-4">
            <MobileAssetLibrary 
              onAssetSelect={onAssetSelect}
            />
          </TabsContent>

          <TabsContent value="tools" className="m-0 p-4">
            <MobileToolsControls 
              onRotate={onRotate}
              onFlipHorizontal={onFlipHorizontal}
              onFlipVertical={onFlipVertical}
              onDelete={onDelete}
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              onResetZoom={onResetZoom}
              onBringForward={onBringForward}
              onSendBackward={onSendBackward}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MobileEditorTabs;
