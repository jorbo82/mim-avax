
import { forwardRef } from "react";
import MemeCanvas from "../MemeCanvas";

interface MobileEditorCanvasProps {
  backgroundImage: string | null;
  topText: string;
  bottomText: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const MobileEditorCanvas = forwardRef<any, MobileEditorCanvasProps>(({
  backgroundImage,
  topText,
  bottomText,
  onZoomIn,
  onZoomOut,
  onResetZoom
}, ref) => {
  return (
    <div className="flex-1 p-4 overflow-hidden min-h-0">
      <div className="w-full h-full relative">
        <MemeCanvas
          ref={ref}
          backgroundImage={backgroundImage}
          topText={topText}
          bottomText={bottomText}
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
