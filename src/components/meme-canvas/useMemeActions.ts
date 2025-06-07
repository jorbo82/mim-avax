
import { Canvas as FabricCanvas, FabricImage } from "fabric";

export const useMemeActions = (
  fabricCanvasRef: React.RefObject<FabricCanvas | null>,
  wizardImageRef: React.RefObject<FabricImage | null>
) => {
  const downloadMeme = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });
      const link = document.createElement('a');
      link.download = 'mim-meme.png';
      link.href = dataURL;
      link.click();
    }
  };

  const rotateWizard = () => {
    if (wizardImageRef.current) {
      const currentAngle = wizardImageRef.current.angle || 0;
      wizardImageRef.current.rotate(currentAngle + 15);
      fabricCanvasRef.current?.renderAll();
    }
  };

  const flipWizardHorizontal = () => {
    if (wizardImageRef.current) {
      wizardImageRef.current.set('flipX', !wizardImageRef.current.flipX);
      fabricCanvasRef.current?.renderAll();
    }
  };

  const flipWizardVertical = () => {
    if (wizardImageRef.current) {
      wizardImageRef.current.set('flipY', !wizardImageRef.current.flipY);
      fabricCanvasRef.current?.renderAll();
    }
  };

  return {
    downloadMeme,
    rotateWizard,
    flipWizardHorizontal,
    flipWizardVertical
  };
};
