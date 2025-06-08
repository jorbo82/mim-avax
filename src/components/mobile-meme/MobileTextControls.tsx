
import { Textarea } from "@/components/ui/textarea";

interface MobileTextControlsProps {
  topText: string;
  bottomText: string;
  onTopTextChange: (value: string) => void;
  onBottomTextChange: (value: string) => void;
}

const MobileTextControls = ({ 
  topText, 
  bottomText, 
  onTopTextChange, 
  onBottomTextChange 
}: MobileTextControlsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-3">
          Top Text
        </label>
        <Textarea
          value={topText}
          onChange={(e) => onTopTextChange(e.target.value)}
          placeholder="Enter top text..."
          className="bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300 min-h-[80px] text-base resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300 mb-3">
          Bottom Text
        </label>
        <Textarea
          value={bottomText}
          onChange={(e) => onBottomTextChange(e.target.value)}
          placeholder="Enter bottom text..."
          className="bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300 min-h-[80px] text-base resize-none"
          rows={3}
        />
      </div>
      
      <div className="h-4"></div> {/* Extra space for comfortable scrolling */}
    </div>
  );
};

export default MobileTextControls;
