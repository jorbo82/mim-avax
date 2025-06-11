
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DeFiAggregatorButton = () => {
  return (
    <Link to="/defi-aggregator">
      <Button 
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25 border-2 border-green-400/50"
      >
        <TrendingUp className="mr-2 w-5 h-5" />
        DeFi Aggregator
      </Button>
    </Link>
  );
};

export default DeFiAggregatorButton;
