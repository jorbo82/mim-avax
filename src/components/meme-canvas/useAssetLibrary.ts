
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";

const ASSET_LIBRARY = [
  {
    id: 'wizard-head-1',
    name: 'Original Wizard Head',
    url: '/lovable-uploads/6816180e-9cbd-413e-ba28-1ac3ed4f1eec.png'
  },
  {
    id: 'wizard-head-2', 
    name: 'New Wizard Head',
    url: '/lovable-uploads/34792e5b-91a2-44f9-9653-12d177de8af1.png'
  }
];

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
