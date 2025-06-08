
import { useEffect } from "react";

interface KeyboardShortcutsConfig {
  onRotate: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onDownload?: () => void;
}

export const useKeyboardShortcuts = (config: KeyboardShortcutsConfig) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // Prevent default browser shortcuts when needed
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isModifierPressed = ctrlKey || metaKey;

      switch (key.toLowerCase()) {
        case 'h':
          if (!isModifierPressed) {
            event.preventDefault();
            config.onFlipHorizontal();
          }
          break;
        case 'v':
          if (!isModifierPressed) {
            event.preventDefault();
            config.onFlipVertical();
          }
          break;
        case 'r':
          if (!isModifierPressed) {
            event.preventDefault();
            config.onRotate();
          }
          break;
        case 'delete':
        case 'backspace':
          if (!isModifierPressed) {
            event.preventDefault();
            config.onDelete();
          }
          break;
        case 'arrowup':
          if (shiftKey && !isModifierPressed) {
            event.preventDefault();
            config.onBringForward();
          }
          break;
        case 'arrowdown':
          if (shiftKey && !isModifierPressed) {
            event.preventDefault();
            config.onSendBackward();
          }
          break;
        case '=':
        case '+':
          if (isModifierPressed && config.onZoomIn) {
            event.preventDefault();
            config.onZoomIn();
          }
          break;
        case '-':
          if (isModifierPressed && config.onZoomOut) {
            event.preventDefault();
            config.onZoomOut();
          }
          break;
        case '0':
          if (isModifierPressed && config.onResetZoom) {
            event.preventDefault();
            config.onResetZoom();
          }
          break;
        case 's':
          if (isModifierPressed && config.onDownload) {
            event.preventDefault();
            config.onDownload();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [config]);

  // Return shortcut descriptions for help/tooltips
  return {
    shortcuts: {
      'H': 'Flip Horizontal',
      'V': 'Flip Vertical', 
      'R': 'Rotate',
      'Del/Backspace': 'Delete',
      'Shift + ↑': 'Bring Forward',
      'Shift + ↓': 'Send Backward',
      'Ctrl/Cmd + +': 'Zoom In',
      'Ctrl/Cmd + -': 'Zoom Out',
      'Ctrl/Cmd + 0': 'Reset Zoom',
      'Ctrl/Cmd + S': 'Download'
    }
  };
};
