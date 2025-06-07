
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import MobileOptimizedMemeEditor from "./MobileOptimizedMemeEditor";

interface MimeMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MimeMeModal = ({ isOpen, onClose, initialBackgroundImage }: MimeMeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 p-0 border-0 rounded-none overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>MIM-ME Meme Editor</DialogTitle>
          <DialogDescription>
            Create and edit memes with the MIM-ME editor. Upload images, add text, and customize your memes.
          </DialogDescription>
        </VisuallyHidden>
        <MobileOptimizedMemeEditor onClose={onClose} initialBackgroundImage={initialBackgroundImage} />
      </DialogContent>
    </Dialog>
  );
};

export default MimeMeModal;
