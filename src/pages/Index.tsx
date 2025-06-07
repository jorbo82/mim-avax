
import BackgroundSparkles from "@/components/BackgroundSparkles";
import TokenPriceWidget from "@/components/TokenPriceWidget";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import MemeGallery from "@/components/MemeGallery";
import FeaturesSection from "@/components/FeaturesSection";
import RoadmapSection from "@/components/RoadmapSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      <BackgroundSparkles />
      <TokenPriceWidget />
      <HeroSection />
      <StatsSection />
      <MemeGallery />
      <FeaturesSection />
      <RoadmapSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
