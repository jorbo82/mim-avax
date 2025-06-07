
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

    // Add wizard head image
    FabricImage.fromURL('/lovable-uploads/6816180e-9cbd-413e-ba28-1ac3ed4f1eec.png').then((img) => {
      img.set({
        left: 400,
        top: 300,
        scaleX: 0.3,
        scaleY: 0.3,
        originX: 'center',
        originY: 'center',
        hasControls: true,
        hasBorders: true,
        cornerStyle: 'circle',
        cornerColor: '#ff6b35',
        cornerSize: 12,
        transparentCorners: false,
        lockUniScaling: true,
      });
      
      wizardImageRef.current = img;
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return { canvasRef, fabricCanvasRef, wizardImageRef };
};
