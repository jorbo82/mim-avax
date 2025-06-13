
import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";
import UnifiedButton from "./ui/unified-button";
import MimeMeModal from "./MimeMeModal";

const MimeMeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UnifiedButton 
        onClick={() => setIsOpen(true)}
        icon={Wand2}
        variant="primary"
      >
        Create Meme
        <Sparkles className="ml-2 w-4 h-4" />
      </UnifiedButton>
      
      <MimeMeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MimeMeButton;
