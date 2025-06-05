
import { useState } from "react";
import BackgroundSparkles from "@/components/BackgroundSparkles";
import YieldFarmingHero from "@/components/yield-farming/YieldFarmingHero";
import ProtocolOverview from "@/components/yield-farming/ProtocolOverview";
import YieldMetrics from "@/components/yield-farming/YieldMetrics";
import FarmingOpportunities from "@/components/yield-farming/FarmingOpportunities";
import TechnicalGuide from "@/components/yield-farming/TechnicalGuide";
import Footer from "@/components/Footer";

const YieldFarming = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      <BackgroundSparkles />
      <YieldFarmingHero />
      <ProtocolOverview 
        selectedProtocol={selectedProtocol}
        onProtocolSelect={setSelectedProtocol}
      />
      <YieldMetrics selectedProtocol={selectedProtocol} />
      <FarmingOpportunities />
      <TechnicalGuide />
      <Footer />
    </div>
  );
};

export default YieldFarming;
