
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Wand2, Sparkles, Activity, TrendingUp, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MimeMeButton from "../MimeMeButton";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Wand2,
      description: "Back to homepage"
    },
    {
      href: "/token-analysis",
      label: "Token Analysis",
      icon: TrendingUp,
      description: "Analyze any token"
    },
    {
      href: "/rwas",
      label: "RWA Tracker",
      icon: Building,
      description: "Track Real World Assets"
    },
    {
      href: "/arbitratum-magnifiicum",
      label: "DeFi Test Lab",
      icon: Activity,
      description: "DeFiLlama API testing"
    },
    {
      href: "/jorbo-ai",
      label: "AI Magic",
      icon: Sparkles,
      description: "AI-powered tools"
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/2b4c14a4-f9f0-41fa-8dfd-84538e909268.png"
                alt="MIM Logo"
                className="w-6 h-6"
              />
              <span className="text-lg font-semibold">$MIM</span>
            </div>
          </div>
          
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              {/* Create Meme Button */}
              <div className="px-3 py-2">
                <MimeMeButton />
              </div>
              
              {/* Navigation Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
