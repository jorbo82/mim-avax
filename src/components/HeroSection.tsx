import MimeMeButton from "./MimeMeButton";
import DeFiAggregatorButton from "./DeFiAggregatorButton";
import JorboAIButton from "./JorboAIButton";

const HeroSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-mim-cream/30 dark:bg-gray-900/30 overflow-hidden">
      <div className="absolute inset-0 opacity-50 dark:opacity-70">
        <img
          src="/images/mim-stars-bg.webp"
          alt="Background Stars"
          className="w-full h-full object-cover animate-fade-in"
          style={{ animationDuration: '2s' }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-mim-teal via-mim-gold to-mim-orange bg-clip-text text-transparent animate-pulse">
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
            <JorboAIButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
