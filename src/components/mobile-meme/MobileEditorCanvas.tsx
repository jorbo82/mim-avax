
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
    <div className="flex-1 p-4 overflow-hidden min-h-0 flex items-center justify-center">
      <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
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
  );
});

MobileEditorCanvas.displayName = 'MobileEditorCanvas';

export default MobileEditorCanvas;
