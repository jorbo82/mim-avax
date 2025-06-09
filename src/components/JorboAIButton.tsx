
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const JorboAIButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate("/jorbo-ai");
  };

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group bg-gradient-to-r from-mim-purple to-mim-pink hover:from-mim-purple/80 hover:to-mim-pink/80 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white/20 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {isHovered ? (
            <Wand2 className="w-6 h-6 transition-all duration-300" />
          ) : (
            <Sparkles className="w-6 h-6 transition-all duration-300" />
          )}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-mim-gold to-mim-orange rounded-full animate-pulse" />
        </div>
        <div className="text-left">
          <div className="font-bold text-lg">AI MAGIC</div>
          <div className="text-sm opacity-90">Image Generator</div>
        </div>
      </div>
      
      {/* Magical sparkle effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-white/30 rounded-full animate-bounce delay-100" />
        <div className="absolute top-1/2 -right-1 w-3 h-3 bg-mim-gold/50 rounded-full animate-ping delay-300" />
        <div className="absolute -bottom-1 left-1/3 w-2 h-2 bg-mim-teal/40 rounded-full animate-pulse delay-500" />
      </div>
    </Button>
  );
};

export default JorboAIButton;
