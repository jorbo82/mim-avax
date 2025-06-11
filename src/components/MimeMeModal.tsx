
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
        className="w-full h-full bg-background"
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
