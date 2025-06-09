
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
            src="/lovable-uploads/21460dcc-742c-4d8c-851f-b7524728600c.png" 
            alt="Happy MIM Wizard with Coins"
            className="w-48 h-48 mx-auto mb-6 hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
          />
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Zap className="w-8 h-8 text-mim-gold" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-mim-teal via-mim-gold to-mim-orange bg-clip-text text-transparent animate-pulse">
          $MIM
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mim-teal">
          Magic Internet Money 🧙‍♂️✨
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-mim-brown dark:text-mim-cream">
          Cast spells on your portfolio! The most magical meme coin in the multiverse is here to turn your diamond hands into wizard hands! 💎🪄
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-mim-teal to-mim-teal-light hover:from-mim-teal-dark hover:to-mim-teal text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 cute-shadow border-2 border-mim-teal-light"
            onClick={() => window.open('https://arena.trade/token/0x8d8b084269f4b2ad111b60793e9f3577a7795605', '_blank')}
          >
            <Sparkles className="mr-2" />
            Cast Your Spell - Buy $MIM
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-mim-gold to-mim-orange hover:from-yellow-500 hover:to-mim-orange text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 cute-shadow border-2 border-mim-gold"
            onClick={() => navigate('/yield-farming')}
          >
            <TrendingUp className="mr-2" />
            Explore Yield Farming
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 cute-shadow"
            onClick={() => window.open('https://x.com/mimonavax', '_blank')}
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
