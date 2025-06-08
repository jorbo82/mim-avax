
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
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
  assets: Array<{ id: string; name: string; url: string; }>;
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
  assets,
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
    <div className="border-t border-purple-500/30 bg-purple-900/30 shrink-0 min-h-[200px] max-h-[80vh]">
      <ResizablePanelGroup direction="vertical" className="h-full">
        <ResizablePanel defaultSize={100} minSize={30}>
          <Tabs defaultValue="assets" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-transparent border-0 h-12 shrink-0">
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
            
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="canvas" className="m-0 p-4 h-full">
                <MobileCanvasControls 
                  backgroundImage={backgroundImage}
                  onImageUpload={onImageUpload}
                  onBlankCanvas={onBlankCanvas}
                  onBackgroundSelect={onBackgroundSelect}
                />
              </TabsContent>
              
              <TabsContent value="text" className="m-0 p-4 h-full">
                <MobileTextControls 
                  topText={topText}
                  bottomText={bottomText}
                  onTopTextChange={onTopTextChange}
                  onBottomTextChange={onBottomTextChange}
                />
              </TabsContent>
              
              <TabsContent value="assets" className="m-0 p-4 h-full">
                <MobileAssetLibrary 
                  assets={assets}
                  onAssetSelect={onAssetSelect}
                />
              </TabsContent>

              <TabsContent value="tools" className="m-0 p-4 h-full">
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MobileEditorTabs;
