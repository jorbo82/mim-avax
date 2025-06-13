
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';
import { PoolAnalysisSection } from '@/components/arbitratum/PoolAnalysisSection';
import { ArbitrageOpportunitiesSection } from '@/components/arbitratum/ArbitrageOpportunitiesSection';
import Header from '@/components/Header';

const ArbitratumMagnifiicum = () => {
  const [activeTab, setActiveTab] = useState('pools');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Use unified header */}
      <Header />

      {/* Page Title Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Arbitratum Magnificum
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  DeFiLlama API Testing Ground for Avalanche DeFi
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-gray-800/50 h-auto p-1">
            <TabsTrigger value="pools" className="flex items-center gap-2 py-3 text-sm md:text-base">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Pool Analysis</span>
              <span className="sm:hidden">Pools</span>
            </TabsTrigger>
            <TabsTrigger value="arbitrage" className="flex items-center gap-2 py-3 text-sm md:text-base">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Arbitrage Opportunities</span>
              <span className="sm:hidden">Arbitrage</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pools" className="space-y-6">
            <PoolAnalysisSection />
          </TabsContent>

          <TabsContent value="arbitrage" className="space-y-6">
            <ArbitrageOpportunitiesSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArbitratumMagnifiicum;
