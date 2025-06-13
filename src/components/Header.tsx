
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DarkModeToggle from "./DarkModeToggle";
import TokenPriceWidget from "./TokenPriceWidget";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Token Analysis", path: "/token-analysis" },
    { label: "AI Magic", path: "/jorbo-ai" },
    { label: "DeFi Lab", path: "/arbitratum-magnifiicum" }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full">
      {/* Token Price Widget Bar */}
      <TokenPriceWidget />
      
      {/* Main Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
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
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    isActivePath(item.path) 
                      ? 'text-foreground border-b-2 border-brand-primary pb-1' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              
              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-brand-primary rounded-lg">
                        <img
                          src="/lovable-uploads/2b4c14a4-f9f0-41fa-8dfd-84538e909268.png"
                          alt="MIM Logo"
                          className="w-6 h-6"
                        />
                      </div>
                      <h2 className="text-lg font-semibold">$MIM Navigation</h2>
                    </div>
                    
                    <nav className="flex flex-col gap-4">
                      {navItems.map((item) => (
                        <Link 
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`text-base font-medium p-3 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                            isActivePath(item.path) 
                              ? 'bg-brand-primary/10 text-brand-primary border-l-4 border-brand-primary' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
