
import MimeMeButton from "./MimeMeButton";
import DeFiAggregatorButton from "./DeFiAggregatorButton";

const HeroSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-mim-cream/30 dark:bg-gray-900/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <img
                src="/lovable-uploads/2b4c14a4-f9f0-41fa-8dfd-84538e909268.png"
                alt="DeFi Wizard with Magic Coins"
                className="w-32 h-32 md:w-48 md:h-48 animate-float"
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-mim-teal via-mim-gold to-mim-orange bg-clip-text text-transparent">
              $MIM
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-mim-brown dark:text-mim-cream">
              The Cutest Meme Coin Ever! 🐾
            </h2>
            <p className="text-lg md:text-xl text-mim-brown/80 dark:text-mim-cream/80 max-w-2xl mx-auto">
              Join the most adorable revolution in DeFi! Create memes, earn rewards, and spread cuteness across the blockchain! ✨
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MimeMeButton />
            <DeFiAggregatorButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
