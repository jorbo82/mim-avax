
import { forwardRef, useImperativeHandle } from "react";
import { MemeCanvasProps, MemeCanvasRef } from "./meme-canvas/types";
import { useCanvasSetup } from "./meme-canvas/useCanvasSetup";
import { useBackgroundImage } from "./meme-canvas/useBackgroundImage";
import { useTextHandling } from "./meme-canvas/useTextHandling";
import { useMemeActions } from "./meme-canvas/useMemeActions";
import { useAssetLibrary } from "./meme-canvas/useAssetLibrary";
import { useCanvasZoom } from "./meme-canvas/useCanvasZoom";

const MemeCanvas = forwardRef<MemeCanvasRef, MemeCanvasProps & {
  aspectRatio?: string;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
}>(({ backgroundImage, topText, bottomText, aspectRatio, onZoomIn, onZoomOut, onResetZoom }, ref) => {
  const { canvasRef, fabricCanvasRef, wizardImageRef } = useCanvasSetup(aspectRatio);
  const { topTextRef, bottomTextRef } = useTextHandling(fabricCanvasRef, topText, bottomText);
  const { 
    downloadMeme, 
    rotateWizard, 
    flipWizardHorizontal, 
    flipWizardVertical,
    rotateSelectedObject,
    flipSelectedObjectHorizontal,
    flipSelectedObjectVertical,
    deleteSelectedObject
  } = useMemeActions(
    fabricCanvasRef,
    wizardImageRef
  );
  const { assets, addAssetToCanvas } = useAssetLibrary(fabricCanvasRef);
  const { zoomIn, zoomOut, resetZoom } = useCanvasZoom(fabricCanvasRef);

  useBackgroundImage(fabricCanvasRef, backgroundImage, wizardImageRef, topTextRef, bottomTextRef);

  useImperativeHandle(ref, () => ({
    downloadMeme,
    rotateWizard,
    flipWizardHorizontal,
    flipWizardVertical,
    rotateSelectedObject,
    flipSelectedObjectHorizontal,
    flipSelectedObjectVertical,
    deleteSelectedObject,
    assets,
    addAssetToCanvas,
    zoomIn,
    zoomOut,
    resetZoom
  }));

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded-lg">
      <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden w-full h-full max-w-full max-h-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
          style={{ 
            touchAction: 'manipulation',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
    </div>
  );
});

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;
