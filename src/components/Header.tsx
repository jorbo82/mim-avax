
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import TokenPriceWidget from "./TokenPriceWidget";

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

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/arbitratum-magnifiicum" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                DeFi Test Lab
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
