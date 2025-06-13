
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import UnifiedButton from "./ui/unified-button";

const TokenAnalysisButton = () => {
  return (
    <Link to="/token-analysis">
      <UnifiedButton 
        icon={TrendingUp}
        variant="outline"
      >
        <span className="hidden sm:inline">Token Analysis</span>
        <span className="sm:hidden">Analysis</span>
      </UnifiedButton>
    </Link>
  );
};

export default TokenAnalysisButton;
