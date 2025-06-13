
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface ArbitrageSummaryCardProps {
  summary: {
    totalOpportunities: number;
    avgNetProfit: number;
    immediateOpportunities: number;
    highValueOpportunities: number;
  };
}

export const ArbitrageSummaryCard = ({ summary }: ArbitrageSummaryCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Advanced Arbitrage Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{summary.totalOpportunities}</p>
            <p className="text-sm text-muted-foreground">Total Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              ${summary.avgNetProfit.toFixed(0)}
            </p>
            <p className="text-sm text-muted-foreground">Avg Net Profit</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {summary.immediateOpportunities}
            </p>
            <p className="text-sm text-muted-foreground">Immediate Ops</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">{summary.highValueOpportunities}</p>
            <p className="text-sm text-muted-foreground">$100+ Profit</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
