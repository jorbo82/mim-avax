
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemeEditorHeaderProps {
  onClose: () => void;
}

const MemeEditorHeader = ({ onClose }: MemeEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-mim-purple/30 bg-gradient-to-r from-mim-pink/10 to-mim-purple/10">
      <h2 className="text-2xl font-bold text-mim-purple flex items-center gap-2">
        🧙‍♂️ MIM-ME Generator
      </h2>
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="border-mim-purple text-mim-purple hover:bg-mim-purple hover:text-white cute-border"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default MemeEditorHeader;
