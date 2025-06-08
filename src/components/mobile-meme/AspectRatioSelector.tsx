
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Square, Smartphone } from "lucide-react";

interface AspectRatioSelectorProps {
  onSelect: (aspectRatio: string) => void;
  onSkip: () => void;
}

const AspectRatioSelector = ({ onSelect, onSkip }: AspectRatioSelectorProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-purple-900/95 to-blue-900/95">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Choose Your Canvas</h2>
          <p className="text-blue-200">Select the aspect ratio for your meme</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card 
            className="p-6 bg-purple-800/50 border-purple-500/30 hover:bg-purple-700/50 cursor-pointer transition-all"
            onClick={() => onSelect("1:1")}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Square className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Square (1:1)</h3>
                <p className="text-sm text-blue-200">Perfect for Instagram posts</p>
              </div>
            </div>
          </Card>
          
          <Card 
            className="p-6 bg-purple-800/50 border-purple-500/30 hover:bg-purple-700/50 cursor-pointer transition-all"
            onClick={() => onSelect("9:16")}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Portrait (9:16)</h3>
                <p className="text-sm text-blue-200">Great for stories and vertical content</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onSkip}
            className="text-blue-300 hover:text-white hover:bg-purple-700/50"
          >
            Skip - I'll upload an image instead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
