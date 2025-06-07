import { useEffect } from "react";
import { Canvas as FabricCanvas, FabricImage, FabricText } from "fabric";

export const useBackgroundImage = (
  fabricCanvasRef: React.RefObject<FabricCanvas | null>,
  backgroundImage: string | null,
  wizardImageRef: React.RefObject<FabricImage | null>,
  topTextRef: React.RefObject<FabricText | null>,
  bottomTextRef: React.RefObject<FabricText | null>
) => {
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    if (backgroundImage) {
      // Load and set background image
      FabricImage.fromURL(backgroundImage).then((img) => {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        
        // Scale image to fit canvas while maintaining aspect ratio
        const scale = Math.min(canvasWidth / img.width!, canvasHeight / img.height!);
        
        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
        });

        canvas.clear();
        canvas.add(img);
        canvas.sendObjectToBack(img);

        // Re-add wizard image
        if (wizardImageRef.current) {
          canvas.add(wizardImageRef.current);
        }

        // Re-add texts
        if (topTextRef.current) {
          canvas.add(topTextRef.current);
        }
        if (bottomTextRef.current) {
          canvas.add(bottomTextRef.current);
        }

        canvas.renderAll();
      });
    } else {
      // Handle blank canvas mode - clear background but keep objects
      const objects = canvas.getObjects();
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      
      // Re-add all non-background objects
      objects.forEach(obj => {
        if (obj.selectable !== false) {
          canvas.add(obj);
        }
      });

      // Re-add wizard image if it exists
      if (wizardImageRef.current) {
        canvas.add(wizardImageRef.current);
      }

      // Re-add texts
      if (topTextRef.current) {
        canvas.add(topTextRef.current);
      }
      if (bottomTextRef.current) {
        canvas.add(bottomTextRef.current);
      }

      canvas.renderAll();
    }
  }, [backgroundImage, fabricCanvasRef, wizardImageRef, topTextRef, bottomTextRef]);
};
