
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";

export const useCanvasSetup = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const wizardImageRef = useRef<FabricImage | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    // Ensure white background is immediately visible
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();

    fabricCanvasRef.current = canvas;

    // Add a small delay to ensure canvas is fully initialized
    setTimeout(() => {
      if (canvas) {
        canvas.backgroundColor = '#ffffff';
        canvas.renderAll();
      }
    }, 50);

    return () => {
      canvas.dispose();
    };
  }, []);

  return { canvasRef, fabricCanvasRef, wizardImageRef };
};
