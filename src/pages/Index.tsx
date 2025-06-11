
import BackgroundSparkles from "@/components/BackgroundSparkles";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import MemeGallery from "@/components/MemeGallery";
import FeaturesSection from "@/components/FeaturesSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-teal-light/20 to-mim-gold/20 dark:from-gray-900 dark:via-mim-teal-dark/20 dark:to-mim-gold/10 text-foreground overflow-hidden relative">
      <BackgroundSparkles />
      <Header />
      <HeroSection />
      <StatsSection />
      <MemeGallery />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
