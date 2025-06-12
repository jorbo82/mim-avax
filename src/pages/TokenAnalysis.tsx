
import Header from "@/components/Header";
import TokenAnalysisHero from "@/components/token-analysis/TokenAnalysisHero";
import TokenDiscovery from "@/components/yield/TokenDiscovery";
import Footer from "@/components/Footer";

const TokenAnalysis = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <TokenAnalysisHero />
      
      {/* Enhanced Token Analysis Section */}
      <section className="py-12 bg-background/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              🧙‍♂️ Cast Your Ultimate Analysis Spell
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Enter any token address to discover yield opportunities across multiple protocols AND verify if it was forged in the Arena trenches - all in one magical interface!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TokenDiscovery />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TokenAnalysis;
