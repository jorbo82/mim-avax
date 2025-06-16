
import { GallerySelectorDialog } from './gallery-selector/GallerySelectorDialog';

interface GallerySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImages: (imageFiles: File[]) => void;
  maxSelections?: number;
  refreshTrigger?: number;
}

export const GallerySelector = (props: GallerySelectorProps) => {
  return <GallerySelectorDialog {...props} />;
};
