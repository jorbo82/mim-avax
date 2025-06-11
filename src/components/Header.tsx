
import { useState } from "react";
import JorboAIButton from "./JorboAIButton";
import DarkModeToggle from "./DarkModeToggle";
import TokenPriceWidget from "./TokenPriceWidget";

const Header = () => {
  return (
    <header className="w-full">
      {/* Token Price Widget Bar */}
      <TokenPriceWidget />
      
      {/* Main Header */}
      <div className="relative bg-mim-cream/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-mim-teal/20 dark:border-mim-teal-light/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-mim-teal to-mim-gold rounded-full">
                <img
                  src="/lovable-uploads/2b4c14a4-f9f0-41fa-8dfd-84538e909268.png"
                  alt="MIM Logo"
                  className="w-8 h-8"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-mim-teal to-mim-gold bg-clip-text text-transparent">
                $MIM
              </h1>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <JorboAIButton />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 flex justify-center">
            <JorboAIButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
