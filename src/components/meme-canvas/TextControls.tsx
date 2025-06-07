
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
        <label className="block text-sm font-medium text-purple-300 mb-2">
          Top Text
        </label>
        <Input
          value={topText}
          onChange={(e) => onTopTextChange(e.target.value)}
          placeholder="Enter top text..."
          className="bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">
          Bottom Text
        </label>
        <Input
          value={bottomText}
          onChange={(e) => onBottomTextChange(e.target.value)}
          placeholder="Enter bottom text..."
          className="bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300"
        />
      </div>
    </div>
  );
};

export default TextControls;
