
import { useState } from "react";
import { TrendingUp, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeFiAggregatorButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProceed = () => {
    setIsOpen(false);
    window.open('https://mim-defi-aggregator.lovable.app/', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25 border-2 border-green-400/50"
        >
          <TrendingUp className="mr-2 w-5 h-5" />
          DeFi Aggregator
          <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle className="w-5 h-5" />
            Beta Feature Warning
          </DialogTitle>
          <DialogDescription className="text-purple-200">
            The DeFi Aggregator is currently in beta and still under development. 
            Some features may not work as expected or may be incomplete.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-purple-300">
            By proceeding, you acknowledge that this is experimental software. 
            Please use with caution and report any issues you encounter.
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            Proceed to Beta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeFiAggregatorButton;
