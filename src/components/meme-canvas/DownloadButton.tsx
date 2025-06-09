
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  onDownload: () => void;
}

const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
  return (
    <Button
      onClick={onDownload}
      className="w-full bg-gradient-to-r from-mim-gold to-mim-orange hover:from-mim-gold/80 hover:to-mim-orange/80 cute-border"
    >
      <Download className="mr-2 w-4 h-4" />
      Download Meme
    </Button>
  );
};

export default DownloadButton;
