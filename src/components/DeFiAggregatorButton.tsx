
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DeFiAggregatorButton = () => {
  return (
    <Link to="/defi-aggregator">
      <Button 
        variant="outline"
        className="border-neutral-300 text-foreground hover:bg-neutral-100 font-medium py-2 px-6 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
      >
        <TrendingUp className="mr-2 w-4 h-4" />
        Yield Farming
      </Button>
    </Link>
  );
};

export default DeFiAggregatorButton;
