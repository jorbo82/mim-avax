
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MimAssetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  maxSelections: number;
  children: React.ReactNode;
  onSelectAssets: () => void;
  isConverting: boolean;
}

export const MimAssetDialog = ({
  isOpen,
  onClose,
  selectedCount,
  maxSelections,
  children,
  onSelectAssets,
  isConverting
}: MimAssetDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Select MIM Assets
            <Badge variant="secondary">
              {selectedCount}/{maxSelections} selected
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Choose up to {maxSelections} MIM assets to use as reference images for AI generation.
          </DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onSelectAssets}
            disabled={selectedCount === 0 || isConverting}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
