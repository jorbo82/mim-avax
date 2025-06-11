
import { TrendingUp, Zap, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const YieldFarmingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative container mx-auto px-4 pt-20 pb-20 text-center">
      <div className="animate-fade-in">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-neutral-600 dark:text-neutral-400 hover:text-foreground"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Button>

        <div className="mb-12 relative">
          <div className="flex justify-center items-center gap-4 mb-8">
            <TrendingUp className="w-16 h-16 text-brand-primary" />
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground leading-tight">
                Yield Farming
              </h1>
              <div className="text-2xl md:text-3xl font-semibold text-brand-primary">
                on Avalanche 🏔️
              </div>
            </div>
            <Zap className="w-16 h-16 text-brand-accent" />
          </div>
        </div>
        
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-neutral-600 dark:text-neutral-400">
          Discover the most magical yield farming opportunities on Avalanche! From Pharaoh Exchange to Trader Joe, 
          explore high-APY pools and maximize your DeFi wizardry! 🧙‍♂️✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-brand-primary text-white hover:opacity-90 font-medium py-4 px-8 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
            onClick={() => window.open('https://pharaoh.exchange', '_blank')}
          >
            <TrendingUp className="mr-2" />
            Explore Pharaoh Exchange
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-medium py-4 px-8 rounded-md transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95"
            onClick={() => window.open('https://traderjoexyz.com', '_blank')}
          >
            <Zap className="mr-2" />
            Visit Trader Joe
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 modern-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">20%+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Average APY</div>
          </div>
          <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 modern-shadow">
            <div className="text-3xl font-bold text-brand-primary mb-2">$2B+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Total TVL</div>
          </div>
          <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 modern-shadow">
            <div className="text-3xl font-bold text-brand-accent mb-2">50+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Active Pools</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YieldFarmingHero;
