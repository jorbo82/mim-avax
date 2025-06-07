
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";
import { ASSET_LIBRARY } from "./assetLibrary";

export const useAssetLibrary = (fabricCanvasRef: React.RefObject<FabricCanvas | null>) => {
  const addAssetToCanvas = (assetUrl: string) => {
    if (!fabricCanvasRef.current) return;

    FabricImage.fromURL(assetUrl).then((img) => {
      const canvas = fabricCanvasRef.current!;
      
      img.set({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
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
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    }).catch((error) => {
      console.error('Error loading asset:', error);
    });
  };

  return {
    assets: ASSET_LIBRARY,
    addAssetToCanvas
  };
};
