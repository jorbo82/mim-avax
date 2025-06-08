
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricText } from "fabric";

export const useTextHandling = (
  fabricCanvasRef: React.RefObject<FabricCanvas | null>,
  topText: string,
  bottomText: string
) => {
  const topTextRef = useRef<FabricText | null>(null);
  const bottomTextRef = useRef<FabricText | null>(null);

  const ensureTextOnTop = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    
    // Bring both text objects to front
    if (topTextRef.current) {
      canvas.bringObjectToFront(topTextRef.current);
    }
    if (bottomTextRef.current) {
      canvas.bringObjectToFront(bottomTextRef.current);
    }
    
    canvas.renderAll();
  };

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    // Remove existing top text
    if (topTextRef.current) {
      canvas.remove(topTextRef.current);
    }

    if (topText.trim()) {
      const text = new FabricText(topText.toUpperCase(), {
        left: canvas.getWidth() / 2,
        top: 50,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Impact, Arial Black, sans-serif',
        fontSize: 40,
        fontWeight: 'bold',
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
        textAlign: 'center',
        selectable: true,
      });

      topTextRef.current = text;
      canvas.add(text);
      canvas.bringObjectToFront(text); // Ensure text is on top
    }

    canvas.renderAll();
  }, [topText, fabricCanvasRef]);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    // Remove existing bottom text
    if (bottomTextRef.current) {
      canvas.remove(bottomTextRef.current);
    }

    if (bottomText.trim()) {
      const text = new FabricText(bottomText.toUpperCase(), {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() - 50,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Impact, Arial Black, sans-serif',
        fontSize: 40,
        fontWeight: 'bold',
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
        textAlign: 'center',
        selectable: true,
      });

      bottomTextRef.current = text;
      canvas.add(text);
      canvas.bringObjectToFront(text); // Ensure text is on top
    }

    canvas.renderAll();
  }, [bottomText, fabricCanvasRef]);

  return { topTextRef, bottomTextRef, ensureTextOnTop };
};
