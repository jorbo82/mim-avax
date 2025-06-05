
const FeaturesSection = () => {
  return (
    <section className="relative z-10 container mx-auto px-4 pb-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-4 text-yellow-400">Why Choose $MIM? 🪄</h3>
        <p className="text-xl text-purple-300">Because regular money is for muggles!</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="text-center p-6 bg-black/20 backdrop-blur-md rounded-lg border border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="text-4xl mb-4">🧙‍♂️</div>
          <h4 className="text-xl font-bold text-yellow-400 mb-2">Wizard Power</h4>
          <p className="text-purple-300">Harness the ancient art of meme magic</p>
        </div>
        
        <div className="text-center p-6 bg-black/20 backdrop-blur-md rounded-lg border border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="text-4xl mb-4">💎</div>
          <h4 className="text-xl font-bold text-yellow-400 mb-2">Diamond Spells</h4>
          <p className="text-purple-300">Turn your hands into wizard hands</p>
        </div>
        
        <div className="text-center p-6 bg-black/20 backdrop-blur-md rounded-lg border border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="text-4xl mb-4">🚀</div>
          <h4 className="text-xl font-bold text-yellow-400 mb-2">Moon Magic</h4>
          <p className="text-purple-300">Teleportation spells to the moon</p>
        </div>
        
        <div className="text-center p-6 bg-black/20 backdrop-blur-md rounded-lg border border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="text-4xl mb-4">⚡</div>
          <h4 className="text-xl font-bold text-yellow-400 mb-2">Lightning Fast</h4>
          <p className="text-purple-300">Faster than a wizard's reflexes</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
