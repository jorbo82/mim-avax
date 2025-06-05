
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  meme: {
    src: string;
    alt: string;
    title: string;
  } | null;
}

const MemeModal = ({ isOpen, onClose, meme }: MemeModalProps) => {
  if (!meme) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black/90 border-purple-500/30">
        <DialogTitle className="sr-only">{meme.title}</DialogTitle>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={meme.src}
            alt={meme.alt}
            className="w-full h-auto max-h-[90vh] object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-xl font-bold text-yellow-400 text-center">
              {meme.title}
            </h3>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemeModal;
