
import Header from "@/components/Header";
import TokenAnalysisHero from "@/components/token-analysis/TokenAnalysisHero";
import TokenChecker from "@/components/yield/TokenChecker";
import TokenDiscovery from "@/components/yield/TokenDiscovery";
import Footer from "@/components/Footer";

const TokenAnalysis = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <TokenAnalysisHero />
      
      {/* Token Analysis Section */}
      <section className="py-12 bg-background/30">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              🧙‍♂️ Cast Your Analysis Spells
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Use our magical token analysis tools to discover Arena tokens and find yield opportunities
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <TokenChecker />
            <TokenDiscovery />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TokenAnalysis;
