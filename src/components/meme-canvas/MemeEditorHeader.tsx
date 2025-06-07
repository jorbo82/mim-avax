
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemeEditorHeaderProps {
  onClose: () => void;
}

const MemeEditorHeader = ({ onClose }: MemeEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
      <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
        🧙‍♂️ MIM-ME Generator
      </h2>
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default MemeEditorHeader;
