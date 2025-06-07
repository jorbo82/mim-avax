
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
  },
  {
    id: 'wizard-laptop-avalanche',
    name: 'Wizard with Laptop & Avalanche',
    url: '/lovable-uploads/0767f171-a7a9-4a8f-871b-5643b0ae10a1.png'
  },
  {
    id: 'magic-internet-money-wizard',
    name: 'Magic Internet Money Wizard',
    url: '/lovable-uploads/09c6b040-c8cd-4e77-8b57-9863364ec316.png'
  },
  {
    id: 'jorbo-ai-robot',
    name: 'JORBO AI Robot',
    url: '/lovable-uploads/1fd93b82-ebe6-4487-bf4c-92f934198a7d.png'
  },
  {
    id: 'pixelated-character',
    name: 'Pixelated Character',
    url: '/lovable-uploads/4a0fe933-d8fc-4083-81c1-b982504cc458.png'
  },
  {
    id: 'chad-face',
    name: 'Chad Face',
    url: '/lovable-uploads/4aa465de-e873-44f8-80ff-6bfbf3663c14.png'
  },
  {
    id: 'big-lebowski-character',
    name: 'Big Lebowski Character',
    url: '/lovable-uploads/4ef9ea17-4aaa-40dd-92b7-5e72a1f5313b.png'
  },
  {
    id: 'tony-stark-pose',
    name: 'Tony Stark Pose',
    url: '/lovable-uploads/549a4bd7-bbf7-4a9c-87e9-9e01ede358fb.png'
  },
  {
    id: 'rocky-victory',
    name: 'Rocky Victory',
    url: '/lovable-uploads/849d406f-73f2-4990-b515-77693d496e1e.png'
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
