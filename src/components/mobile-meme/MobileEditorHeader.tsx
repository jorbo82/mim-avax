
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

interface MobileEditorHeaderProps {
  onClose: () => void;
  onDownload: () => void;
  onPostToX: () => void;
}

const MobileEditorHeader = ({ onClose, onDownload, onPostToX }: MobileEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-background shrink-0">
      <h2 className="text-xl font-semibold text-foreground">MIM-ME Editor</h2>
      <div className="flex items-center gap-2">
        <Button
          onClick={onPostToX}
          size="sm"
          className="bg-brand-primary text-white hover:opacity-90 modern-shadow"
          title="Share on X"
        >
          <img 
            src="/lovable-uploads/981dc6c6-3b1e-4b24-b673-bf3ae5864859.png" 
            alt="X Logo" 
            className="w-4 h-4"
          />
        </Button>
        <Button
          onClick={onDownload}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white modern-shadow"
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button
          onClick={onClose}
          size="sm"
          variant="ghost"
          className="text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileEditorHeader;
