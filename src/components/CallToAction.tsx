
import { Sparkles, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="relative z-10 container mx-auto px-4 pb-20 text-center">
      <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
        <h3 className="text-4xl font-bold mb-4 text-yellow-400">Ready to Join the Magic? ✨</h3>
        <p className="text-xl mb-8 text-purple-300">
          Don't be a muggle forever! Cast your spell and join the most magical community in crypto!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
            onClick={() => window.open('https://arena.trade/token/0x8d8b084269f4b2ad111b60793e9f3577a7795605', '_blank')}
          >
            <Sparkles className="mr-2" />
            Buy $MIM on Arena
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
            onClick={() => window.open('https://x.com/MoralGuideline', '_blank')}
          >
            <Twitter className="mr-2" />
            Follow on X
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
