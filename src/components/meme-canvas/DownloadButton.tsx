
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface DownloadButtonProps {
  onDownload: (format?: 'png' | 'jpeg' | 'webp') => void;
}

const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpeg' | 'webp'>('png');

  const handleDownload = () => {
    onDownload(selectedFormat);
  };

  return (
    <div className="space-y-2">
      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
        <SelectTrigger className="border-mim-gold/30 focus:border-mim-gold text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="png">PNG (Best Quality)</SelectItem>
          <SelectItem value="jpeg">JPEG (Smaller Size)</SelectItem>
          <SelectItem value="webp">WebP (Modern)</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        onClick={handleDownload}
        className="w-full bg-gradient-to-r from-mim-gold to-mim-orange hover:from-mim-gold/80 hover:to-mim-orange/80 cute-border"
      >
        <Download className="mr-2 w-4 h-4" />
        Download Meme
      </Button>
    </div>
  );
};

export default DownloadButton;
