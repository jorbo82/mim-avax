
import { useState } from "react";
import { ArrowLeft, TrendingUp, Zap, Shield, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundSparkles from "@/components/BackgroundSparkles";
import TokenPriceWidget from "@/components/TokenPriceWidget";
import TokenDiscovery from "@/components/yield/TokenDiscovery";
import YieldOpportunities from "@/components/yield/YieldOpportunities";

const DeFiAggregator = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('');

  const protocols = [
    { name: 'All Protocols', slug: '' },
    { name: 'Apex DeFi', slug: 'apex-defi' },
    { name: 'Pharaoh', slug: 'pharaoh' },
    { name: 'Arena.trade', slug: 'arena' },
    { name: 'BENQI', slug: 'benqi' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      <BackgroundSparkles />
      <TokenPriceWidget />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Yield Farming Aggregator
            </h1>
            <p className="text-purple-300 mt-2">
              Discover and compare yield farming opportunities across DeFi protocols
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <CardTitle className="text-green-400">Best Yields</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-200">
                Compare APY rates across multiple protocols to maximize your yield farming returns.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <CardTitle className="text-blue-400">Meme Token Discovery</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-blue-200">
                Discover meme coin opportunities on Arena.trade and ERC314 wrappers through Apex DeFi.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <CardTitle className="text-purple-400">Risk Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Understand risks and rewards with detailed analytics and impermanent loss calculations.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Protocol Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {protocols.map((protocol) => (
              <Button
                key={protocol.slug}
                variant={selectedProtocol === protocol.slug ? "default" : "outline"}
                onClick={() => setSelectedProtocol(protocol.slug)}
                className={selectedProtocol === protocol.slug 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500" 
                  : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                }
              >
                {protocol.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="bg-black/20 border border-purple-500/30">
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-purple-500/30">
              Yield Opportunities
            </TabsTrigger>
            <TabsTrigger value="discovery" className="data-[state=active]:bg-purple-500/30">
              Token Discovery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities">
            <YieldOpportunities selectedProtocol={selectedProtocol} />
          </TabsContent>

          <TabsContent value="discovery">
            <TokenDiscovery />
          </TabsContent>
        </Tabs>

        {/* Beta Warning */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <CardTitle className="text-yellow-400">Beta Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-yellow-200">
              This yield farming aggregator is currently in beta. Data is simulated for demonstration purposes. 
              Arena.trade integration focuses on meme token trading with social features and community-driven yields.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeFiAggregator;
