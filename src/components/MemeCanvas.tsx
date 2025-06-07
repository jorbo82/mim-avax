
import { forwardRef, useImperativeHandle } from "react";
import { MemeCanvasProps, MemeCanvasRef } from "./meme-canvas/types";
import { useCanvasSetup } from "./meme-canvas/useCanvasSetup";
import { useBackgroundImage } from "./meme-canvas/useBackgroundImage";
import { useTextHandling } from "./meme-canvas/useTextHandling";
import { useMemeActions } from "./meme-canvas/useMemeActions";

const MemeCanvas = forwardRef<MemeCanvasRef, MemeCanvasProps>(
  ({ backgroundImage, topText, bottomText }, ref) => {
    const { canvasRef, fabricCanvasRef, wizardImageRef } = useCanvasSetup();
    const { topTextRef, bottomTextRef } = useTextHandling(fabricCanvasRef, topText, bottomText);
    const { downloadMeme, rotateWizard, flipWizardHorizontal, flipWizardVertical } = useMemeActions(
      fabricCanvasRef,
      wizardImageRef
    );

    useBackgroundImage(fabricCanvasRef, backgroundImage, wizardImageRef, topTextRef, bottomTextRef);

    useImperativeHandle(ref, () => ({
      downloadMeme,
      rotateWizard,
      flipWizardHorizontal,
      flipWizardVertical
    }));

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded-lg">
        <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="max-w-full max-h-full"
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>
    );
  }
);

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;
