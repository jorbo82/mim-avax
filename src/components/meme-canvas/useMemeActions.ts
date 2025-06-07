import { Canvas as FabricCanvas, FabricImage, FabricObject } from "fabric";

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

  const getSelectedObject = (): FabricObject | null => {
    if (!fabricCanvasRef.current) return null;
    return fabricCanvasRef.current.getActiveObject();
  };

  const rotateSelectedObject = () => {
    const activeObject = getSelectedObject();
    if (activeObject) {
      const currentAngle = activeObject.angle || 0;
      activeObject.rotate(currentAngle + 15);
      fabricCanvasRef.current?.renderAll();
    }
  };

  const flipSelectedObjectHorizontal = () => {
    const activeObject = getSelectedObject();
    if (activeObject) {
      activeObject.set('flipX', !activeObject.flipX);
      fabricCanvasRef.current?.renderAll();
    }
  };

  const flipSelectedObjectVertical = () => {
    const activeObject = getSelectedObject();
    if (activeObject) {
      activeObject.set('flipY', !activeObject.flipY);
      fabricCanvasRef.current?.renderAll();
    }
  };

  const deleteSelectedObject = () => {
    const activeObject = getSelectedObject();
    if (activeObject && fabricCanvasRef.current) {
      fabricCanvasRef.current.remove(activeObject);
      fabricCanvasRef.current.renderAll();
    }
  };

  // Keep backward compatibility with old function names
  const rotateWizard = rotateSelectedObject;
  const flipWizardHorizontal = flipSelectedObjectHorizontal;
  const flipWizardVertical = flipSelectedObjectVertical;

  return {
    downloadMeme,
    rotateWizard,
    flipWizardHorizontal,
    flipWizardVertical,
    rotateSelectedObject,
    flipSelectedObjectHorizontal,
    flipSelectedObjectVertical,
    deleteSelectedObject
  };
};
