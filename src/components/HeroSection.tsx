
import MimeMeButton from "./MimeMeButton";
import TokenAnalysisButton from "./TokenAnalysisButton";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-neutral-50 to-background dark:from-neutral-900 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <img
                src="/lovable-uploads/2b4c14a4-f9f0-41fa-8dfd-84538e909268.png"
                alt="DeFi Wizard with Magic Coins"
                className="w-24 h-24 md:w-32 md:h-32 animate-float"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
              $MIM
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The next generation meme coin built for the modern DeFi ecosystem
            </h2>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users creating memes, earning rewards, and participating in decentralized finance with cutting-edge technology.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <MimeMeButton />
            <TokenAnalysisButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
