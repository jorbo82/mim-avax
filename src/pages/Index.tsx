
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
    <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-teal-light/20 to-mim-gold/20 dark:from-gray-900 dark:via-mim-teal-dark/20 dark:to-mim-gold/10 text-foreground overflow-hidden relative">
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
