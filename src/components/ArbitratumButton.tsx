
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArbitratumButton = () => {
  return (
    <Link to="/arbitratum-magnifiicum">
      <Button 
        variant="outline"
        className="border-neutral-300 text-foreground hover:bg-neutral-100 font-medium py-2 px-6 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
      >
        <Activity className="mr-2 w-4 h-4" />
        DeFi Lab ⚡
      </Button>
    </Link>
  );
};

export default ArbitratumButton;
