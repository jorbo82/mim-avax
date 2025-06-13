
import { Link } from "react-router-dom";
import { Activity, Wand2, TrendingUp, Sparkles } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import TokenPriceWidget from "./TokenPriceWidget";
import MobileNavigation from "./navigation/MobileNavigation";
import UnifiedButton from "./ui/unified-button";

const Header = () => {
  return (
    <header className="w-full">
      {/* Token Price Widget Bar */}
      <TokenPriceWidget />
      
      {/* Main Header */}
      <div className="relative bg-background/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary rounded-lg">
                  <img
                    src="/lovable-uploads/2b4c14a4-f9f0-41fa-8dfd-84538e909268.png"
                    alt="MIM Logo"
                    className="w-6 h-6"
                  />
                </div>
                <h1 className="text-xl font-semibold text-foreground">
                  $MIM
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/token-analysis">
                <UnifiedButton icon={TrendingUp} variant="outline">
                  Token Analysis
                </UnifiedButton>
              </Link>
              
              <Link to="/arbitratum-magnifiicum">
                <UnifiedButton icon={Activity} variant="outline">
                  DeFi Test Lab
                </UnifiedButton>
              </Link>
              
              <Link to="/jorbo-ai">
                <UnifiedButton icon={Sparkles} variant="primary">
                  AI Magic
                </UnifiedButton>
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <MobileNavigation />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
