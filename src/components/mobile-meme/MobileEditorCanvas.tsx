
import { forwardRef } from "react";
import MemeCanvas from "../MemeCanvas";

interface MobileEditorCanvasProps {
  backgroundImage: string | null;
  topText: string;
  bottomText: string;
  aspectRatio?: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const MobileEditorCanvas = forwardRef<any, MobileEditorCanvasProps>(({
  backgroundImage,
  topText,
  bottomText,
  aspectRatio,
  onZoomIn,
  onZoomOut,
  onResetZoom
}, ref) => {
  return (
    <div className="flex-1 p-2 overflow-hidden min-h-0 flex items-center justify-center bg-gray-900/10">
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{
          minHeight: 'calc(100vh - 200px)', // Account for header and tabs
          maxHeight: 'calc(100vh - 200px)'
        }}
      >
        <div className="w-full h-full max-w-[95%] max-h-[95%] flex items-center justify-center">
          <MemeCanvas
            ref={ref}
            backgroundImage={backgroundImage}
            topText={topText}
            bottomText={bottomText}
            aspectRatio={aspectRatio}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onResetZoom={onResetZoom}
          />
        </div>
      </div>
    </div>
  );
});

MobileEditorCanvas.displayName = 'MobileEditorCanvas';

export default MobileEditorCanvas;
