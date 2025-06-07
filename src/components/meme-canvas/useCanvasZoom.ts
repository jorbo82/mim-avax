
import { Canvas as FabricCanvas, Point } from "fabric";

export const useCanvasZoom = (fabricCanvasRef: React.RefObject<FabricCanvas | null>) => {
  const zoomIn = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const currentZoom = canvas.getZoom();
    const newZoom = Math.min(currentZoom * 1.2, 3); // Max zoom 3x
    
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), newZoom);
    canvas.renderAll();
  };

  const zoomOut = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const currentZoom = canvas.getZoom();
    const newZoom = Math.max(currentZoom / 1.2, 0.3); // Min zoom 0.3x
    
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), newZoom);
    canvas.renderAll();
  };

  const resetZoom = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), 1);
    canvas.renderAll();
  };

  return {
    zoomIn,
    zoomOut,
    resetZoom
  };
};
