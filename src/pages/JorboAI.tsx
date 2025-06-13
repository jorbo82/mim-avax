
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, Sparkles, Zap } from "lucide-react";

const JorboAI = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-neutral-50 to-background dark:from-neutral-900 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 md:space-y-8">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="p-4 md:p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-magical-pulse">
                <Wand2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                🪄 Jorbo AI Magic
              </h1>
              <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Unleash the power of artificial intelligence with mystical $MIM enchantments
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Experience cutting-edge AI capabilities wrapped in magical DeFi wizardry. Create, analyze, and discover with the power of artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl md:text-2xl">Smart Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced AI algorithms analyze market trends and DeFi opportunities with magical precision.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit">
                  <Wand2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl md:text-2xl">Content Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate memes, content, and creative assets powered by state-of-the-art AI models.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-fit">
                  <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle className="text-xl md:text-2xl">Instant Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lightning-fast AI processing delivers results faster than you can say "abracadabra".
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              🔮 Coming Soon
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              The AI magic is brewing in our cauldron. Prepare for enchanted features that will revolutionize your DeFi experience.
            </p>
            <div className="space-y-4">
              <div className="p-4 md:p-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-2">✨ AI-Powered Meme Generation</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Generate viral memes with advanced AI understanding of crypto culture and trends.
                </p>
              </div>
              <div className="p-4 md:p-6 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-2">🤖 Smart Contract Analysis</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  AI-driven security audits and risk assessment for DeFi protocols.
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-brand-primary text-white hover:opacity-90">
              <Sparkles className="mr-2 w-4 h-4" />
              Get Notified When Ready
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JorboAI;
