
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

interface MobileEditorHeaderProps {
  onClose: () => void;
  onDownload: () => void;
  onPostToX: () => void;
}

const MobileEditorHeader = ({ onClose, onDownload, onPostToX }: MobileEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-purple-500/30 shrink-0">
      <h2 className="text-xl font-bold text-yellow-400">MIM-ME</h2>
      <div className="flex items-center gap-2">
        <Button
          onClick={onPostToX}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          title="Share on X"
        >
          <img 
            src="/lovable-uploads/2fbd28b9-3c42-4b7f-aab8-95e1dfd483d3.png" 
            alt="X Logo" 
            className="w-4 h-4"
          />
        </Button>
        <Button
          onClick={onDownload}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button
          onClick={onClose}
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileEditorHeader;
