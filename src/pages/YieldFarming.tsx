
import { useState } from "react";
import Header from "@/components/Header";
import YieldFarmingHero from "@/components/yield-farming/YieldFarmingHero";
import ProtocolOverview from "@/components/yield-farming/ProtocolOverview";
import YieldMetrics from "@/components/yield-farming/YieldMetrics";
import FarmingOpportunities from "@/components/yield-farming/FarmingOpportunities";
import TechnicalGuide from "@/components/yield-farming/TechnicalGuide";
import TokenChecker from "@/components/yield/TokenChecker";
import Footer from "@/components/Footer";

const YieldFarming = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <YieldFarmingHero />
      <ProtocolOverview 
        selectedProtocol={selectedProtocol}
        onProtocolSelect={setSelectedProtocol}
      />
      <YieldMetrics selectedProtocol={selectedProtocol} />
      
      {/* Add TokenChecker section */}
      <section className="py-12 bg-background/30">
        <div className="container mx-auto px-4">
          <TokenChecker />
        </div>
      </section>
      
      <FarmingOpportunities />
      <TechnicalGuide />
      <Footer />
    </div>
  );
};

export default YieldFarming;
