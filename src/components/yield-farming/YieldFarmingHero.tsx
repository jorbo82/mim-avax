
import { TrendingUp, Zap, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const YieldFarmingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 container mx-auto px-4 pt-20 pb-20 text-center">
      <div className="animate-fade-in">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-purple-300 hover:text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Button>

        <div className="mb-12 relative">
          <div className="flex justify-center items-center gap-4 mb-8">
            <TrendingUp className="w-16 h-16 text-yellow-400 animate-pulse" />
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                Yield Farming
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-yellow-300">
                on Avalanche 🏔️
              </div>
            </div>
            <Zap className="w-16 h-16 text-blue-400 animate-pulse" />
          </div>
        </div>
        
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-purple-200">
          Discover the most magical yield farming opportunities on Avalanche! From Pharaoh Exchange to Trader Joe, 
          explore high-APY pools and maximize your DeFi wizardry! 🧙‍♂️✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            onClick={() => window.open('https://pharaoh.exchange', '_blank')}
          >
            <TrendingUp className="mr-2" />
            Explore Pharaoh Exchange
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
            onClick={() => window.open('https://traderjoexyz.com', '_blank')}
          >
            <Zap className="mr-2" />
            Visit Trader Joe
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">20%+</div>
            <div className="text-purple-300">Average APY</div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">$2B+</div>
            <div className="text-purple-300">Total TVL</div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
            <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-purple-300">Active Pools</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YieldFarmingHero;
