
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import UnifiedButton from "./ui/unified-button";

const JorboAIButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate("/jorbo-ai");
  };

  return (
    <UnifiedButton
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      icon={Sparkles}
      variant="primary"
    >
      <span>AI Magic</span>
      <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
    </UnifiedButton>
  );
};

export default JorboAIButton;
