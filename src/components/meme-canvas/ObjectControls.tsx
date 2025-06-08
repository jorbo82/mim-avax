
import { RotateCw, FlipHorizontal, FlipVertical, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ObjectControlsProps {
  onRotate: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
}

const ObjectControls = ({ 
  onRotate, 
  onFlipHorizontal, 
  onFlipVertical, 
  onDelete,
  onBringForward,
  onSendBackward
}: ObjectControlsProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-2">
        Selected Object Controls
      </label>
      <div className="grid grid-cols-2 gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onRotate}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Rotate selected object 15°</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onFlipHorizontal}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
            >
              <FlipHorizontal className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Flip selected object horizontally</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onFlipVertical}
              size="sm"
              className="bg-pink-600 hover:bg-pink-700"
            >
              <FlipVertical className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Flip selected object vertically</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onDelete}
              size="sm"
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected object</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onBringForward}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bring object forward</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onSendBackward}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send object backward</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ObjectControls;
