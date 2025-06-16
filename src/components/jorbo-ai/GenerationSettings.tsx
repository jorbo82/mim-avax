
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenerationSettingsProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
}

export const GenerationSettings = ({
  selectedSize,
  onSizeChange,
  selectedQuality,
  onQualityChange,
}: GenerationSettingsProps) => {
  return (
    <Card className="cute-border cute-shadow">
      <CardHeader>
        <CardTitle className="text-mim-teal">Generation Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Image Size</label>
          <Select value={selectedSize} onValueChange={onSizeChange}>
            <SelectTrigger className="border-mim-teal/30 dark:border-mim-teal-light/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1024x1024">Square (1024×1024)</SelectItem>
              <SelectItem value="1536x1024">Landscape (1536×1024)</SelectItem>
              <SelectItem value="1024x1536">Portrait (1024×1536)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Quality</label>
          <Select value={selectedQuality} onValueChange={onQualityChange}>
            <SelectTrigger className="border-mim-teal/30 dark:border-mim-teal-light/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (Fastest)</SelectItem>
              <SelectItem value="medium">Medium (Balanced)</SelectItem>
              <SelectItem value="high">High (Best Quality)</SelectItem>
              <SelectItem value="auto">Auto (AI Optimized)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
