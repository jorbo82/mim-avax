
import CustomPortalModal from "./CustomPortalModal";
import MobileOptimizedMemeEditor from "./MobileOptimizedMemeEditor";

interface MimeMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBackgroundImage?: string | null;
}

const MimeMeModal = ({ isOpen, onClose, initialBackgroundImage }: MimeMeModalProps) => {
  return (
    <CustomPortalModal isOpen={isOpen} onClose={onClose}>
      <div 
        className="w-full h-full bg-gradient-to-br from-mim-cream/95 to-mim-teal/95 dark:from-mim-brown/95 dark:to-mim-teal-dark/95"
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          position: 'relative'
        }}
      >
        <MobileOptimizedMemeEditor onClose={onClose} initialBackgroundImage={initialBackgroundImage} />
      </div>
    </CustomPortalModal>
  );
};

export default MimeMeModal;
