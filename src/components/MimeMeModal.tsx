
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MemeEditor from "./MemeEditor";

interface MimeMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MimeMeModal = ({ isOpen, onClose }: MimeMeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-purple-500/30 p-0 overflow-hidden">
        <MemeEditor onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default MimeMeModal;
