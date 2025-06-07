
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Canvas as FabricCanvas, FabricImage, FabricText } from "fabric";

interface MemeCanvasProps {
  backgroundImage: string | null;
  topText: string;
  bottomText: string;
}

const MemeCanvas = forwardRef<any, MemeCanvasProps>(({ backgroundImage, topText, bottomText }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const wizardImageRef = useRef<FabricImage | null>(null);
  const topTextRef = useRef<FabricText | null>(null);
  const bottomTextRef = useRef<FabricText | null>(null);

  useImperativeHandle(ref, () => ({
    downloadMeme: () => {
      if (fabricCanvasRef.current) {
        const dataURL = fabricCanvasRef.current.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 2
        });
        const link = document.createElement('a');
        link.download = 'mim-meme.png';
        link.href = dataURL;
        link.click();
      }
    },
    rotateWizard: () => {
      if (wizardImageRef.current) {
        const currentAngle = wizardImageRef.current.angle || 0;
        wizardImageRef.current.rotate(currentAngle + 15);
        fabricCanvasRef.current?.renderAll();
      }
    },
    flipWizardHorizontal: () => {
      if (wizardImageRef.current) {
        wizardImageRef.current.set('flipX', !wizardImageRef.current.flipX);
        fabricCanvasRef.current?.renderAll();
      }
    },
    flipWizardVertical: () => {
      if (wizardImageRef.current) {
        wizardImageRef.current.set('flipY', !wizardImageRef.current.flipY);
        fabricCanvasRef.current?.renderAll();
      }
    }
  }));

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

  useEffect(() => {
    if (!fabricCanvasRef.current || !backgroundImage) return;

    FabricImage.fromURL(backgroundImage).then((img) => {
      const canvas = fabricCanvasRef.current!;
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      
      // Scale image to fit canvas while maintaining aspect ratio
      const scale = Math.min(canvasWidth / img.width!, canvasHeight / img.height!);
      
      img.set({
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
      });

      canvas.clear();
      canvas.add(img);
      canvas.sendObjectToBack(img);

      // Re-add wizard image
      if (wizardImageRef.current) {
        canvas.add(wizardImageRef.current);
      }

      // Re-add texts
      if (topTextRef.current) {
        canvas.add(topTextRef.current);
      }
      if (bottomTextRef.current) {
        canvas.add(bottomTextRef.current);
      }

      canvas.renderAll();
    });
  }, [backgroundImage]);

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
    }

    canvas.renderAll();
  }, [topText]);

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
    }

    canvas.renderAll();
  }, [bottomText]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded-lg">
      <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="max-w-full max-h-full"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
});

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;
