
import { Input } from "@/components/ui/input";

interface TextControlsProps {
  topText: string;
  bottomText: string;
  onTopTextChange: (value: string) => void;
  onBottomTextChange: (value: string) => void;
}

const TextControls = ({ 
  topText, 
  bottomText, 
  onTopTextChange, 
  onBottomTextChange 
}: TextControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Text Inputs */}
      <div>
        <label className="block text-sm font-medium text-mim-purple mb-2">
          Top Text
        </label>
        <Input
          value={topText}
          onChange={(e) => onTopTextChange(e.target.value)}
          placeholder="Enter top text..."
          className="bg-mim-cream/80 border-mim-pink/50 text-mim-purple placeholder-mim-purple/70 cute-border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-mim-purple mb-2">
          Bottom Text
        </label>
        <Input
          value={bottomText}
          onChange={(e) => onBottomTextChange(e.target.value)}
          placeholder="Enter bottom text..."
          className="bg-mim-cream/80 border-mim-pink/50 text-mim-purple placeholder-mim-purple/70 cute-border"
        />
      </div>
    </div>
  );
};

export default TextControls;
