
import { Sparkles, Zap, TrendingUp, Users, ExternalLink, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Sparkles className="w-2 h-2 text-yellow-300" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="animate-fade-in">
          <div className="mb-8 relative">
            <img 
              src="/lovable-uploads/c3967f00-c1ca-4f6f-ba10-c8ea2fed0a38.png" 
              alt="Magic Internet Money Wizard"
              className="w-48 h-48 mx-auto mb-6 hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            $MIM
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-300">
            Magic Internet Money 🧙‍♂️✨
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Cast spells on your portfolio! The most magical meme coin in the multiverse is here to turn your diamond hands into wizard hands! 💎🪄
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              onClick={() => window.open('https://arena.trade/token/0x8d8b084269f4b2ad111b60793e9f3577a7795605', '_blank')}
            >
              <Sparkles className="mr-2" />
              Cast Your Spell - Buy $MIM
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
              onClick={() => window.open('https://x.com/MoralGuideline', '_blank')}
            >
              <Twitter className="mr-2" />
              Join the Wizards
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-fit">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-yellow-400">Total Supply</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-white">10 Billion</p>
              <p className="text-purple-300">$MIM Tokens</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-fit">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-yellow-400">Tax</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-white">0%</p>
              <p className="text-purple-300">No Tax Magic!</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-3 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full w-fit">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-yellow-400">Phase</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-white">Arena</p>
              <p className="text-purple-300">Bonding Phase</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Call to Action */}
      <section className="relative z-10 container mx-auto px-4 pb-20 text-center">
        <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
          <h3 className="text-4xl font-bold mb-4 text-yellow-400">Ready to Join the Magic? ✨</h3>
          <p className="text-xl mb-8 text-purple-300">
            Don't be a muggle forever! Cast your spell and join the most magical community in crypto!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
              onClick={() => window.open('https://arena.trade/token/0x8d8b084269f4b2ad111b60793e9f3577a7795605', '_blank')}
            >
              <Sparkles className="mr-2" />
              Buy $MIM on Arena
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
              onClick={() => window.open('https://x.com/MoralGuideline', '_blank')}
            >
              <Twitter className="mr-2" />
              Follow on X
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-purple-500/30">
        <p className="text-purple-300">
          $MIM - Magic Internet Money | The most magical meme coin in the multiverse! 🧙‍♂️✨
        </p>
        <p className="text-sm text-purple-400 mt-2">
          Disclaimer: This is a meme coin. Please cast responsibly! 🪄
        </p>
      </footer>
    </div>
  );
};

export default Index;
