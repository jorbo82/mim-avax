
import { useState } from "react";
import { ArrowLeft, TrendingUp, Zap, Shield, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundSparkles from "@/components/BackgroundSparkles";
import SwapInterface from "@/components/defi/SwapInterface";
import ExchangeComparison from "@/components/defi/ExchangeComparison";
import TokenPriceWidget from "@/components/TokenPriceWidget";

const DeFiAggregator = () => {
  const [selectedFromToken, setSelectedFromToken] = useState<string>('AVAX');
  const [selectedToToken, setSelectedToToken] = useState<string>('USDC');

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
              DeFi Aggregator
            </h1>
            <p className="text-purple-300 mt-2">
              Find the best rates across multiple DEX platforms
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <CardTitle className="text-green-400">Best Rates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-200">
                Compare rates across multiple exchanges to get the best deal for your swaps.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <CardTitle className="text-blue-400">Lightning Fast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-blue-200">
                Execute trades quickly with real-time rate updates and instant comparisons.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <CardTitle className="text-purple-400">Secure</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                Trade with confidence using secure, audited smart contracts and protocols.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <SwapInterface 
              selectedFromToken={selectedFromToken}
              selectedToToken={selectedToToken}
              onTokenChange={(from, to) => {
                setSelectedFromToken(from);
                setSelectedToToken(to);
              }}
            />
          </div>

          {/* Exchange Comparison */}
          <div className="lg:col-span-1">
            <ExchangeComparison 
              fromToken={selectedFromToken}
              toToken={selectedToToken}
            />
          </div>
        </div>

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
              This DeFi aggregator is currently in beta. All trades are simulated for demonstration purposes. 
              In a production environment, this would connect to real DEX protocols for actual trading.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeFiAggregator;
