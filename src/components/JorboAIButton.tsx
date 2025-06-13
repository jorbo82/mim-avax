
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wand2 } from "lucide-react";
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
      variant="outline"
      className="border-neutral-300 text-foreground hover:bg-neutral-100 font-medium py-2 px-6 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
    >
      <Wand2 className="mr-2 w-4 h-4" />
      AI Magic ✨
    </Button>
  );
};

export default JorboAIButton;
