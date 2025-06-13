
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const ArbitratumButton = () => {
  return (
    <Link to="/arbitratum-magnifiicum">
      <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-3">
          <Activity className="w-5 h-5" />
          <span className="hidden sm:inline">Arbitratum Magnificum</span>
          <span className="sm:hidden">DeFi Lab</span>
        </div>
      </button>
    </Link>
  );
};

export default ArbitratumButton;
