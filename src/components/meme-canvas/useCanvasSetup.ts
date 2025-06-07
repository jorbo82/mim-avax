
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

    fabricCanvasRef.current = canvas;

    // No longer automatically adding wizard image - users can add assets from the library

    return () => {
      canvas.dispose();
    };
  }, []);

  return { canvasRef, fabricCanvasRef, wizardImageRef };
};
