
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";

const ASSET_LIBRARY = [
  {
    id: 'mim-wizard-head',
    name: 'MIM Wizard Head',
    url: '/lovable-uploads/b3055ff0-376f-42dd-a541-83e57ea167eb.png'
  },
  {
    id: 'red-cape-wrestler',
    name: 'Red Cape Wrestler',
    url: '/lovable-uploads/07c77816-0782-438d-83d8-65eae6a60c4b.png'
  },
  {
    id: 'burgundy-suit-man',
    name: 'Burgundy Suit Man',
    url: '/lovable-uploads/f3962b87-87e8-4433-9ce9-6958041b57cc.png'
  },
  {
    id: 'plaid-shirt-man',
    name: 'Plaid Shirt Man',
    url: '/lovable-uploads/4f15d90a-fe53-450f-ae5c-5bba9e7501f6.png'
  },
  {
    id: 'business-suit-hands',
    name: 'Business Suit Hands',
    url: '/lovable-uploads/fbe510e5-b7a0-4295-8909-9141634b2398.png'
  },
  {
    id: 'yoda-wise',
    name: 'Wise Yoda',
    url: '/lovable-uploads/08a94be2-cbf9-456c-ab16-a7a907308145.png'
  },
  {
    id: 'leonardo-dicaprio-toast',
    name: 'Leonardo Toast',
    url: '/lovable-uploads/1f93a159-f2dc-41b1-846c-a5536787979d.png'
  },
  {
    id: 'snoop-dogg-cool',
    name: 'Snoop Cool',
    url: '/lovable-uploads/3b4ae095-2460-46bc-bdf2-16bb509742a2.png'
  },
  {
    id: 'chuck-norris-action',
    name: 'Chuck Norris Action',
    url: '/lovable-uploads/4180231f-60f8-4690-995f-92ddfd1fcc8d.png'
  },
  {
    id: 'john-wick',
    name: 'John Wick',
    url: '/lovable-uploads/ae89a959-e486-4a8f-aeaa-53ebf501716e.png'
  },
  {
    id: 'rocky-victory',
    name: 'Rocky Victory',
    url: '/lovable-uploads/591e0f73-72e0-4c38-9108-84e4ad8c86b1.png'
  },
  {
    id: 'tony-stark-pose',
    name: 'Tony Stark Pose',
    url: '/lovable-uploads/38a3afcd-7179-4eb4-b934-50ed64819bcf.png'
  },
  {
    id: 'big-lebowski-character',
    name: 'Big Lebowski Character',
    url: '/lovable-uploads/657675aa-04fc-4448-be1f-1790ee9e1b9e.png'
  },
  {
    id: 'chad-face',
    name: 'Chad Face',
    url: '/lovable-uploads/82872567-05fa-4184-a39e-69e0ec1fb763.png'
  },
  {
    id: 'magic-internet-money-wizard',
    name: 'Magic Internet Money Wizard',
    url: '/lovable-uploads/994639ab-fb50-452c-9b25-0a4138ace906.png'
  },
  {
    id: 'pixelated-character',
    name: 'Pixelated Character',
    url: '/lovable-uploads/4b058054-2291-4736-8e35-7eb4602270d2.png'
  },
  {
    id: 'jorbo-ai-robot',
    name: 'JORBO AI Robot',
    url: '/lovable-uploads/f7a9ef3a-32ca-4bc3-88df-b5329ad8b0c0.png'
  },
  {
    id: 'wizard-laptop-avalanche',
    name: 'Wizard with Laptop & Avalanche',
    url: '/lovable-uploads/6649b943-04e0-4a9b-80f2-f286961943c8.png'
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
