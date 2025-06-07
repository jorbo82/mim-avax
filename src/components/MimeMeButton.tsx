
import { useState } from "react";
import { Sparkles, Wand2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import MimeMeModal from "./MimeMeModal";

const MimeMeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 hover:from-yellow-600 hover:via-orange-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 border-2 border-yellow-400/50 animate-pulse"
      >
        <Wand2 className="mr-2 w-5 h-5" />
        MIM-ME
        <Sparkles className="ml-2 w-4 h-4 animate-bounce" />
      </Button>
      
      <MimeMeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MimeMeButton;
