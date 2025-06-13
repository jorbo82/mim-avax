
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";
import UnifiedButton from "./ui/unified-button";

const ArbitratumButton = () => {
  return (
    <Link to="/arbitratum-magnifiicum">
      <UnifiedButton 
        icon={Activity}
        variant="outline"
      >
        <span className="hidden sm:inline">DeFi Test Lab</span>
        <span className="sm:hidden">DeFi Lab</span>
      </UnifiedButton>
    </Link>
  );
};

export default ArbitratumButton;
