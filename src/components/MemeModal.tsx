
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, Wand2 } from "lucide-react";

interface MemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseAsBackground: (imageUrl: string) => void;
  meme: {
    src: string;
    alt: string;
    title: string;
  } | null;
}

const MemeModal = ({ isOpen, onClose, onUseAsBackground, meme }: MemeModalProps) => {
  if (!meme) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = meme.src;
    link.download = `${meme.title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUseAsBackground = () => {
    onUseAsBackground(meme.src);
  };

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
            <h3 className="text-xl font-bold text-yellow-400 text-center mb-4">
              {meme.title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleUseAsBackground}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Use as Background
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemeModal;
