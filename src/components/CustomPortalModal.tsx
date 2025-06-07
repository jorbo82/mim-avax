
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface CustomPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomPortalModal = ({ isOpen, onClose, children }: CustomPortalModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Store original styles - use computed styles as fallback for empty inline styles
      const computedStyle = window.getComputedStyle(document.body);
      const originalOverflow = document.body.style.overflow || computedStyle.overflow || 'auto';
      const originalPosition = document.body.style.position || computedStyle.position || 'static';
      const originalWidth = document.body.style.width || '';
      const originalHeight = document.body.style.height || '';
      const originalTop = document.body.style.top || '';
      const originalLeft = document.body.style.left || '';
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      // Cleanup function
      const restoreBodyStyles = () => {
        // Use requestAnimationFrame to ensure restoration happens after all DOM updates
        requestAnimationFrame(() => {
          // Restore original styles or defaults
          document.body.style.overflow = originalOverflow === 'auto' && !document.body.style.overflow ? '' : originalOverflow;
          document.body.style.position = originalPosition === 'static' && !document.body.style.position ? '' : originalPosition;
          document.body.style.width = originalWidth;
          document.body.style.height = originalHeight;
          document.body.style.top = originalTop;
          document.body.style.left = originalLeft;
        });
      };

      return () => {
        restoreBodyStyles();
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Defensive cleanup on unmount
  useEffect(() => {
    return () => {
      if (mounted) {
        requestAnimationFrame(() => {
          // Ensure scroll is always restored to default behavior
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          document.body.style.top = '';
          document.body.style.left = '';
        });
      }
    };
  }, [mounted]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default CustomPortalModal;
