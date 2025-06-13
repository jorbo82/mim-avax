
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useDeFiLlamaArbitrage } from '@/hooks/useDeFiLlamaArbitrage';
import { ArbitrageSummaryCard } from './arbitrage/ArbitrageSummaryCard';
import { ArbitrageFilters } from './arbitrage/ArbitrageFilters';
import { ArbitrageTabContent } from './arbitrage/ArbitrageTabContent';

export const ArbitrageOpportunitiesSection = () => {
  const [minProfit, setMinProfit] = useState(0.5);
  const { opportunities, isLoading, error, summary } = useDeFiLlamaArbitrage(minProfit);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          </CardContent>
        </Card>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                Failed to load arbitrage data
              </h3>
              <p className="text-red-600 dark:text-red-400">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <ArbitrageSummaryCard summary={summary} />
      
      <ArbitrageFilters 
        minProfit={minProfit}
        setMinProfit={setMinProfit}
        opportunitiesCount={opportunities.length}
      />

      <Tabs defaultValue="best-net-profit" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="best-net-profit">💰 Best Net Profit</TabsTrigger>
          <TabsTrigger value="immediate">⚡ Immediate</TabsTrigger>
          <TabsTrigger value="low-risk">🛡️ Low Risk</TabsTrigger>
          <TabsTrigger value="all">📋 All Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="best-net-profit">
          <ArbitrageTabContent opportunities={opportunities} tabType="best-net-profit" />
        </TabsContent>

        <TabsContent value="immediate">
          <ArbitrageTabContent opportunities={opportunities} tabType="immediate" />
        </TabsContent>

        <TabsContent value="low-risk">
          <ArbitrageTabContent opportunities={opportunities} tabType="low-risk" />
        </TabsContent>

        <TabsContent value="all">
          <ArbitrageTabContent opportunities={opportunities} tabType="all" />
        </TabsContent>
      </Tabs>

      {opportunities.length > 20 && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing top 20 of {opportunities.length} total opportunities
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
