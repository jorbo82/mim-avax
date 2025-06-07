
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";

export const useCanvasSetup = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const wizardImageRef = useRef<FabricImage | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Get container dimensions for responsive canvas
    const container = canvasRef.current.parentElement;
    const containerWidth = container?.clientWidth || 800;
    const containerHeight = container?.clientHeight || 600;
    
    // Calculate canvas size based on container, maintaining aspect ratio
    const maxWidth = Math.min(containerWidth - 20, 800);
    const maxHeight = Math.min(containerHeight - 20, 600);
    const aspectRatio = 4 / 3;
    
    let canvasWidth = maxWidth;
    let canvasHeight = maxWidth / aspectRatio;
    
    if (canvasHeight > maxHeight) {
      canvasHeight = maxHeight;
      canvasWidth = maxHeight * aspectRatio;
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
        
        const newMaxWidth = Math.min(newContainerWidth - 20, 800);
        const newMaxHeight = Math.min(newContainerHeight - 20, 600);
        
        let newCanvasWidth = newMaxWidth;
        let newCanvasHeight = newMaxWidth / aspectRatio;
        
        if (newCanvasHeight > newMaxHeight) {
          newCanvasHeight = newMaxHeight;
          newCanvasWidth = newMaxHeight * aspectRatio;
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
  }, []);

  return { canvasRef, fabricCanvasRef, wizardImageRef };
};
