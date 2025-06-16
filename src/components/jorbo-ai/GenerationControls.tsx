
import { useState } from "react";
import { Wand2, ImageIcon, Palette, Brush, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MultiImageUpload } from "@/components/MultiImageUpload";
import { GenerationSettings } from "./GenerationSettings";

interface ImageWithSource extends File {
  source?: 'upload' | 'gallery' | 'mim-asset';
}

interface GenerationControlsProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  selectedImages: ImageWithSource[];
  onImagesChange: (images: ImageWithSource[]) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
  isGenerating: boolean;
  canGenerate: boolean;
  isOverrideUsed: boolean;
  onGenerate: () => void;
  onShowGallerySelector: () => void;
  onShowMimAssetSelector: () => void;
}

export const GenerationControls = ({
  prompt,
  onPromptChange,
  selectedImages,
  onImagesChange,
  selectedSize,
  onSizeChange,
  selectedQuality,
  onQualityChange,
  isGenerating,
  canGenerate,
  isOverrideUsed,
  onGenerate,
  onShowGallerySelector,
  onShowMimAssetSelector,
}: GenerationControlsProps) => {
  return (
    <div className="space-y-6">
      <Card className="cute-border cute-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-mim-teal">
            <Wand2 className="w-5 h-5" />
            Describe Your Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe the image you want to create or edit... e.g., 'A majestic dragon flying over a medieval castle at sunset'"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="min-h-[120px] resize-none border-mim-teal/30 focus:border-mim-teal dark:border-mim-teal-light/30 dark:focus:border-mim-teal-light"
          />
        </CardContent>
      </Card>

      <Card className="cute-border cute-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-mim-teal">
            <ImageIcon className="w-5 h-5" />
            Reference Images
            <Badge variant="secondary">{selectedImages.length}/10</Badge>
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={onShowGallerySelector}
              className="flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              From Gallery
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onShowMimAssetSelector}
              className="flex items-center gap-2"
            >
              <Brush className="w-4 h-4" />
              From MIM-ME
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <MultiImageUpload
            images={selectedImages}
            onImagesChange={onImagesChange}
            maxImages={10}
            disabled={isGenerating}
          />
        </CardContent>
      </Card>

      <GenerationSettings
        selectedSize={selectedSize}
        onSizeChange={onSizeChange}
        selectedQuality={selectedQuality}
        onQualityChange={onQualityChange}
      />

      <Button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim() || (!canGenerate && !isOverrideUsed)}
        className="w-full bg-gradient-to-r from-mim-teal to-mim-gold hover:from-mim-teal-dark hover:to-mim-orange text-white font-semibold py-6 text-lg"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
            JORBO AI is Creating...
          </>
        ) : !canGenerate && !isOverrideUsed ? (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Daily Limit Reached
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Image
          </>
        )}
      </Button>

      {selectedImages.length > 0 && (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            🎨 Using {selectedImages.length} reference image{selectedImages.length !== 1 ? 's' : ''} for image-to-image editing
          </p>
          <p className="text-xs text-muted-foreground">
            JORBO AI will intelligently blend and edit your reference images
          </p>
        </div>
      )}
    </div>
  );
};
