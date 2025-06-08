
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";

export const useCanvasSetup = (aspectRatio?: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const wizardImageRef = useRef<FabricImage | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Get container dimensions for responsive canvas
    const container = canvasRef.current.parentElement;
    const containerWidth = container?.clientWidth || 800;
    const containerHeight = container?.clientHeight || 600;
    
    // Calculate canvas size based on aspect ratio
    let canvasWidth: number;
    let canvasHeight: number;
    
    if (aspectRatio === "1:1") {
      // Square aspect ratio
      const size = Math.min(containerWidth - 20, containerHeight - 20, 600);
      canvasWidth = size;
      canvasHeight = size;
    } else if (aspectRatio === "9:16") {
      // Portrait aspect ratio (9:16)
      const maxWidth = Math.min(containerWidth - 20, 400);
      const maxHeight = Math.min(containerHeight - 20, 700);
      
      // Calculate based on 9:16 ratio
      canvasWidth = Math.min(maxWidth, maxHeight * (9/16));
      canvasHeight = canvasWidth * (16/9);
      
      // Ensure it fits in container
      if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = canvasHeight * (9/16);
      }
    } else {
      // Default 4:3 aspect ratio
      const maxWidth = Math.min(containerWidth - 20, 800);
      const maxHeight = Math.min(containerHeight - 20, 600);
      const defaultAspectRatio = 4 / 3;
      
      canvasWidth = maxWidth;
      canvasHeight = maxWidth / defaultAspectRatio;
      
      if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * defaultAspectRatio;
      }
    }

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#ffffff',
    });

    // Mobile-specific optimizations
    canvas.selection = true;
    canvas.preserveObjectStacking = true;
    
    // Improve touch handling
    canvas.targetFindTolerance = 10; // Larger touch targets
    canvas.perPixelTargetFind = true;

    // Force white background immediately and ensure it stays
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();

    fabricCanvasRef.current = canvas;

    // Handle resize for mobile orientation changes
    const handleResize = () => {
      if (canvas && container) {
        const newContainerWidth = container.clientWidth;
        const newContainerHeight = container.clientHeight;
        
        let newCanvasWidth: number;
        let newCanvasHeight: number;
        
        if (aspectRatio === "1:1") {
          const size = Math.min(newContainerWidth - 20, newContainerHeight - 20, 600);
          newCanvasWidth = size;
          newCanvasHeight = size;
        } else if (aspectRatio === "9:16") {
          const maxWidth = Math.min(newContainerWidth - 20, 400);
          const maxHeight = Math.min(newContainerHeight - 20, 700);
          
          newCanvasWidth = Math.min(maxWidth, maxHeight * (9/16));
          newCanvasHeight = newCanvasWidth * (16/9);
          
          if (newCanvasHeight > maxHeight) {
            newCanvasHeight = maxHeight;
            newCanvasWidth = newCanvasHeight * (9/16);
          }
        } else {
          const newMaxWidth = Math.min(newContainerWidth - 20, 800);
          const newMaxHeight = Math.min(newContainerHeight - 20, 600);
          const defaultAspectRatio = 4 / 3;
          
          newCanvasWidth = newMaxWidth;
          newCanvasHeight = newMaxWidth / defaultAspectRatio;
          
          if (newCanvasHeight > newMaxHeight) {
            newCanvasHeight = newMaxHeight;
            newCanvasWidth = newMaxHeight * defaultAspectRatio;
          }
        }
        
        canvas.setDimensions({
          width: newCanvasWidth,
          height: newCanvasHeight
        });
        // Ensure white background is maintained after resize
        canvas.backgroundColor = '#ffffff';
        canvas.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Ensure white background is set multiple times to guarantee visibility
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
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      canvas.dispose();
    };
  }, [aspectRatio]);

  return { canvasRef, fabricCanvasRef, wizardImageRef };
};
