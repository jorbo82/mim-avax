
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

        // Store current objects
        const objects = canvas.getObjects().filter(obj => obj.selectable !== false);
        
        canvas.clear();
        canvas.add(img);
        canvas.sendObjectToBack(img);

        // Re-add all other objects
        objects.forEach(obj => {
          canvas.add(obj);
        });

        canvas.renderAll();
      }).catch((error) => {
        console.error('Error loading background image:', error);
      });
    } else {
      // Handle blank canvas mode - ensure white background is always set immediately
      const objects = canvas.getObjects().filter(obj => obj.selectable !== false);
      
      // Clear canvas and immediately set white background
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      
      // Force immediate render of white background multiple times
      canvas.renderAll();
      
      // Re-add all objects that are not background images
      objects.forEach(obj => {
        canvas.add(obj);
      });

      // Multiple renders to ensure white background visibility
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
      
      // Additional renders with delays to ensure visibility
      setTimeout(() => {
        if (canvas) {
          canvas.backgroundColor = '#ffffff';
          canvas.renderAll();
        }
      }, 10);

      setTimeout(() => {
        if (canvas) {
          canvas.backgroundColor = '#ffffff';
          canvas.renderAll();
        }
      }, 50);
    }
  }, [backgroundImage, fabricCanvasRef, wizardImageRef, topTextRef, bottomTextRef]);
};
