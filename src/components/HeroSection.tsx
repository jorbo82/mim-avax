import { Sparkles, Zap, ExternalLink, Twitter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
      <div className="animate-fade-in">
        <div className="mb-8 relative">
          <img 
            src="/lovable-uploads/c3967f00-c1ca-4f6f-ba10-c8ea2fed0a38.png" 
            alt="Magic Internet Money Wizard"
            className="w-48 h-48 mx-auto mb-6 hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
          />
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
          $MIM
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-300">
          Magic Internet Money 🧙‍♂️✨
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Cast spells on your portfolio! The most magical meme coin in the multiverse is here to turn your diamond hands into wizard hands! 💎🪄
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            onClick={() => window.open('https://arena.trade/token/0x8d8b084269f4b2ad111b60793e9f3577a7795605', '_blank')}
          >
            <Sparkles className="mr-2" />
            Cast Your Spell - Buy $MIM
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            onClick={() => navigate('/yield-farming')}
          >
            <TrendingUp className="mr-2" />
            Explore Yield Farming
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
            onClick={() => window.open('https://x.com/i/communities/1930683048946815295', '_blank')}
          >
            <Twitter className="mr-2" />
            Join the Wizards
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
