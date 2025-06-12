
import { Wand2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TokenAnalysisHero = () => {
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
            <Wand2 className="w-16 h-16 text-brand-primary" />
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground leading-tight">
                Tkenus Analyticus
              </h1>
              <div className="text-2xl md:text-3xl font-semibold text-brand-primary">
                🧙‍♂️ Token Analysis Wizardry ✨
              </div>
            </div>
            <Search className="w-16 h-16 text-brand-accent" />
          </div>
        </div>
        
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-neutral-600 dark:text-neutral-400">
          Cast the ultimate token analysis spell! Discover if tokens were forged in the Arena trenches, 
          find yield opportunities, and uncover the magical secrets of Avalanche tokens! 🔮⚡
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 modern-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">⚡ Arena</div>
            <div className="text-neutral-600 dark:text-neutral-400">Token Verification</div>
          </div>
          <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 modern-shadow">
            <div className="text-3xl font-bold text-brand-primary mb-2">🔮 Multi</div>
            <div className="text-neutral-600 dark:text-neutral-400">Protocol Discovery</div>
          </div>
          <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 modern-shadow">
            <div className="text-3xl font-bold text-brand-accent mb-2">✨ Enhanced</div>
            <div className="text-neutral-600 dark:text-neutral-400">Real-time Analysis</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenAnalysisHero;
