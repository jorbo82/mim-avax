
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  onDownload: () => void;
}

const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
  return (
    <Button
      onClick={onDownload}
      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
    >
      <Download className="mr-2 w-4 h-4" />
      Download Meme
    </Button>
  );
};

export default DownloadButton;
