import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { TokenLookupSection } from '@/components/arbitratum/TokenLookupSection';
import { PoolAnalysisSection } from '@/components/arbitratum/PoolAnalysisSection';
import { ArbitrageOpportunitiesSection } from '@/components/arbitratum/ArbitrageOpportunitiesSection';
import { ProtocolOverviewSection } from '@/components/arbitratum/ProtocolOverviewSection';
const ArbitratumMagnifiicum = () => {
  const [activeTab, setActiveTab] = useState('tokens');
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Arbitratum Magnificum</h1>
                <p className="text-muted-foreground">
                  DeFiLlama API Testing Ground for Avalanche DeFi
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              Live Data
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50">
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Token Lookup
            </TabsTrigger>
            <TabsTrigger value="pools" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Pool Analysis
            </TabsTrigger>
            <TabsTrigger value="arbitrage" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Arbitrage
            </TabsTrigger>
            <TabsTrigger value="protocols" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Protocols
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-6">
            <TokenLookupSection />
          </TabsContent>

          <TabsContent value="pools" className="space-y-6">
            <PoolAnalysisSection />
          </TabsContent>

          <TabsContent value="arbitrage" className="space-y-6">
            <ArbitrageOpportunitiesSection />
          </TabsContent>

          <TabsContent value="protocols" className="space-y-6">
            <ProtocolOverviewSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default ArbitratumMagnifiicum;