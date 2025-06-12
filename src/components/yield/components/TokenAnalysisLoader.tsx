
import { Sparkles, Wand2, Stars, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenAnalysisLoaderProps {
  phase?: 'connecting' | 'discovering' | 'analyzing' | 'finalizing';
}

const TokenAnalysisLoader = ({ phase = 'discovering' }: TokenAnalysisLoaderProps) => {
  const phaseMessages = {
    connecting: "🔍 Scanning blockchain for token data...",
    discovering: "⚡ Discovering yield opportunities across protocols...",
    analyzing: "🧙‍♂️ Preparing Gandalf's wisdom...",
    finalizing: "✨ Completing magical analysis..."
  };

  const phaseIcons = {
    connecting: Search,
    discovering: Sparkles,
    analyzing: Wand2,
    finalizing: Stars
  };

  const IconComponent = phaseIcons[phase];

  return (
    <div className="space-y-6 py-8">
      <Skeleton className="w-full h-32 relative overflow-hidden border-2 border-mim-teal/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        {/* Floating magical particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-mim-gold rounded-full animate-[float_3s_ease-in-out_infinite]" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-mim-teal rounded-full animate-[float_4s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-mim-orange rounded-full animate-[float_2.5s_ease-in-out_infinite_0.5s]" />
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-mim-pink rounded-full animate-[float_3.5s_ease-in-out_infinite_2s]" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-[float_2.8s_ease-in-out_infinite_1.5s]" />
        </div>
        
        {/* Central magical portal effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-mim-teal via-mim-gold to-mim-orange animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-mim-teal animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Corner magical sparkles */}
        <div className="absolute top-3 right-3">
          <Sparkles className="w-5 h-5 text-mim-gold animate-pulse" />
        </div>
        <div className="absolute bottom-3 left-3">
          <Sparkles className="w-4 h-4 text-mim-orange animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-3 left-3">
          <Stars className="w-4 h-4 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute bottom-3 right-3">
          <Stars className="w-3 h-3 text-mim-pink animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </Skeleton>
      
      {/* Status message with magical styling */}
      <div className="text-center space-y-3">
        <p className="text-lg font-medium text-purple-300 animate-pulse">
          {phaseMessages[phase]}
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-mim-teal rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-mim-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-mim-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        <p className="text-sm text-muted-foreground">
          The wise wizards are consulting their ancient blockchain scrolls...
        </p>
      </div>
    </div>
  );
};

export default TokenAnalysisLoader;
