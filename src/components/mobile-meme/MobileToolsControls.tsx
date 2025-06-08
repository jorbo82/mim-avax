
import { RotateCw, FlipHorizontal, FlipVertical, Trash2, ZoomIn, ZoomOut, RotateCcw, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileToolsControlsProps {
  onRotate: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onDelete: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
}

const MobileToolsControls = ({ 
  onRotate, 
  onFlipHorizontal, 
  onFlipVertical, 
  onDelete,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onBringForward,
  onSendBackward
}: MobileToolsControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Canvas Zoom Controls */}
      <div>
        <label className="block text-sm font-medium text-green-300 mb-3">
          Canvas Zoom
        </label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={onZoomIn}
            className="bg-green-600 hover:bg-green-700 text-white h-12"
          >
            <ZoomIn className="w-4 h-4 mr-1" />
            <span className="text-xs">Zoom In</span>
          </Button>
          <Button
            onClick={onZoomOut}
            className="bg-green-600 hover:bg-green-700 text-white h-12"
          >
            <ZoomOut className="w-4 h-4 mr-1" />
            <span className="text-xs">Zoom Out</span>
          </Button>
          <Button
            onClick={onResetZoom}
            className="bg-green-600 hover:bg-green-700 text-white h-12"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            <span className="text-xs">Reset</span>
          </Button>
        </div>
      </div>

      {/* Object Controls */}
      <div>
        <label className="block text-sm font-medium text-orange-300 mb-3">
          Selected Object Tools
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onRotate}
            className="bg-orange-600 hover:bg-orange-700 text-white h-12"
          >
            <RotateCw className="w-4 h-4 mr-1" />
            <span className="text-xs">Rotate</span>
          </Button>
          <Button
            onClick={onFlipHorizontal}
            className="bg-orange-600 hover:bg-orange-700 text-white h-12"
          >
            <FlipHorizontal className="w-4 h-4 mr-1" />
            <span className="text-xs">Flip H</span>
          </Button>
          <Button
            onClick={onFlipVertical}
            className="bg-orange-600 hover:bg-orange-700 text-white h-12"
          >
            <FlipVertical className="w-4 h-4 mr-1" />
            <span className="text-xs">Flip V</span>
          </Button>
          <Button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white h-12"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            <span className="text-xs">Delete</span>
          </Button>
          <Button
            onClick={onBringForward}
            className="bg-blue-600 hover:bg-blue-700 text-white h-12"
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            <span className="text-xs">Forward</span>
          </Button>
          <Button
            onClick={onSendBackward}
            className="bg-indigo-600 hover:bg-indigo-700 text-white h-12"
          >
            <ArrowDown className="w-4 h-4 mr-1" />
            <span className="text-xs">Backward</span>
          </Button>
        </div>
        <p className="text-xs text-orange-400 mt-2 text-center">
          Select an object on the canvas to use these tools
        </p>
      </div>
    </div>
  );
};

export default MobileToolsControls;
