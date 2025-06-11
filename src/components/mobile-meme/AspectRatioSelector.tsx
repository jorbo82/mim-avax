
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Square, Smartphone } from "lucide-react";

interface AspectRatioSelectorProps {
  onSelect: (aspectRatio: string) => void;
  onSkip: () => void;
}

const AspectRatioSelector = ({ onSelect, onSkip }: AspectRatioSelectorProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Choose Your Canvas</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Select the aspect ratio for your meme</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card 
            className="p-6 bg-card border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer transition-all modern-shadow hover:modern-shadow-lg"
            onClick={() => onSelect("1:1")}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Square className="w-6 h-6 text-brand-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground">Square (1:1)</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Perfect for Instagram posts</p>
              </div>
            </div>
          </Card>
          
          <Card 
            className="p-6 bg-card border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer transition-all modern-shadow hover:modern-shadow-lg"
            onClick={() => onSelect("9:16")}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-brand-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground">Portrait (9:16)</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Great for stories and vertical content</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onSkip}
            className="text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Skip - I'll upload an image instead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
