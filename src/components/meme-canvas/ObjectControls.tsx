
import { RotateCw, FlipHorizontal, FlipVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ObjectControlsProps {
  onRotate: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onDelete: () => void;
}

const ObjectControls = ({ 
  onRotate, 
  onFlipHorizontal, 
  onFlipVertical, 
  onDelete 
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
      </div>
    </div>
  );
};

export default ObjectControls;
