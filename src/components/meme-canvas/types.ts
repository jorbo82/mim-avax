
export interface MemeCanvasProps {
  backgroundImage: string | null;
  topText: string;
  bottomText: string;
}

export interface MemeCanvasRef {
  downloadMeme: () => void;
  rotateWizard: () => void;
  flipWizardHorizontal: () => void;
  flipWizardVertical: () => void;
  assets: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  addAssetToCanvas: (assetUrl: string) => void;
}
