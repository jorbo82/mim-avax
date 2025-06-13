
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MimeMeModal from "./MimeMeModal";

const MimeMeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-brand-primary text-white hover:opacity-90 font-medium py-2 px-6 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
      >
        <Wand2 className="mr-2 w-4 h-4" />
        Create Meme ✨
      </Button>
      
      <MimeMeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MimeMeButton;
