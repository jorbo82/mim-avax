
import { Sparkles, Wand2, Stars } from "lucide-react";
import { MagicalSkeleton } from "./ui/skeleton";

interface MagicalImageSkeletonProps {
  phase?: 'connecting' | 'generating' | 'finalizing';
}

const MagicalImageSkeleton = ({ phase = 'generating' }: MagicalImageSkeletonProps) => {
  const phaseMessages = {
    connecting: "🌟 Connecting to JORBO AI Engine...",
    generating: "✨ JORBO AI is crafting your masterpiece...",
    finalizing: "🎨 Adding final magical touches..."
  };

  const phaseIcons = {
    connecting: Wand2,
    generating: Sparkles,
    finalizing: Stars
  };

  const IconComponent = phaseIcons[phase];

  return (
    <div className="space-y-4">
      <MagicalSkeleton className="w-full aspect-square relative overflow-hidden border-2 border-mim-teal/30">
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-mim-gold rounded-full animate-[float_3s_ease-in-out_infinite]" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-mim-teal rounded-full animate-[float_4s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-mim-orange rounded-full animate-[float_2.5s_ease-in-out_infinite_0.5s]" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-mim-pink rounded-full animate-[float_3.5s_ease-in-out_infinite_2s]" />
        </div>
        
        {/* Central magical effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-mim-teal via-mim-gold to-mim-orange animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-mim-teal animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Corner sparkles */}
        <div className="absolute top-2 right-2">
          <Sparkles className="w-4 h-4 text-mim-gold animate-pulse" />
        </div>
        <div className="absolute bottom-2 left-2">
          <Sparkles className="w-3 h-3 text-mim-orange animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </MagicalSkeleton>
      
      {/* Status message */}
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-mim-teal animate-pulse">
          {phaseMessages[phase]}
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-mim-teal rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-mim-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-mim-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};

export default MagicalImageSkeleton;
