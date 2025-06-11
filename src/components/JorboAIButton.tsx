
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
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
      className="relative group bg-brand-primary text-white hover:opacity-90 font-medium py-2 px-6 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span>AI Magic</span>
        <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
      </div>
    </Button>
  );
};

export default JorboAIButton;
