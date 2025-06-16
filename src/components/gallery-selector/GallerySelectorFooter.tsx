
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GallerySelectorFooterProps {
  selectedCount: number;
  isConverting: boolean;
  loading: boolean;
  onCancel: () => void;
  onSelectImages: () => void;
}

export const GallerySelectorFooter = ({
  selectedCount,
  isConverting,
  loading,
  onCancel,
  onSelectImages
}: GallerySelectorFooterProps) => {
  return (
    <DialogFooter className="flex flex-col gap-2">
      {selectedCount === 0 && !isConverting && !loading && (
        <p className="text-sm text-muted-foreground text-center">
          💡 Select images above to enable the use button
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSelectImages}
          disabled={selectedCount === 0 || isConverting || loading}
          className={`min-w-[140px] ${
            selectedCount === 0 
              ? 'bg-muted text-muted-foreground border-muted hover:bg-muted' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
          }`}
        >
          {isConverting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              Converting...
            </>
          ) : (
            `Use ${selectedCount} Asset${selectedCount !== 1 ? 's' : ''}`
          )}
        </Button>
      </div>
    </DialogFooter>
  );
};
