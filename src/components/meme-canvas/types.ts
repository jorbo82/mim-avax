
export interface MemeCanvasRef {
  downloadMeme: () => void;
  rotateWizard: () => void;
  flipWizardHorizontal: () => void;
  flipWizardVertical: () => void;
  rotateSelectedObject: () => void;
  flipSelectedObjectHorizontal: () => void;
  flipSelectedObjectVertical: () => void;
  deleteSelectedObject: () => void;
  assets: Array<{ id: string; name: string; url: string; }>;
  addAssetToCanvas: (assetUrl: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export interface MemeCanvasProps {
  backgroundImage: string | null;
  topText: string;
  bottomText: string;
}
