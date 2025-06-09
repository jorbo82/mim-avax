
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
      <label className="block text-sm font-medium text-mim-purple mb-2">
        Selected Object Controls
      </label>
      <div className="grid grid-cols-2 gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onRotate}
              size="sm"
              className="bg-mim-teal hover:bg-mim-teal-dark cute-border"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Rotate selected object 15° (R)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onFlipHorizontal}
              size="sm"
              className="bg-mim-gold hover:bg-mim-gold/80 cute-border"
            >
              <FlipHorizontal className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Flip selected object horizontally (H)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onFlipVertical}
              size="sm"
              className="bg-mim-pink hover:bg-mim-pink-dark cute-border"
            >
              <FlipVertical className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Flip selected object vertically (V)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onDelete}
              size="sm"
              className="bg-red-400 hover:bg-red-500 cute-border"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected object (Del)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onBringForward}
              size="sm"
              className="bg-mim-purple hover:bg-mim-purple-dark cute-border"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bring object forward (Shift + ↑)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onSendBackward}
              size="sm"
              className="bg-mim-mint hover:bg-mim-mint/80 cute-border"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send object backward (Shift + ↓)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ObjectControls;
