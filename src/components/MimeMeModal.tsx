
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MobileOptimizedMemeEditor from "./MobileOptimizedMemeEditor";

interface MimeMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MimeMeModal = ({ isOpen, onClose, initialBackgroundImage }: MimeMeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 p-0 bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-md border-0 rounded-none overflow-hidden">
        <MobileOptimizedMemeEditor onClose={onClose} initialBackgroundImage={initialBackgroundImage} />
      </DialogContent>
    </Dialog>
  );
};

export default MimeMeModal;
