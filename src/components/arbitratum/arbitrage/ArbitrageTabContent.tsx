
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, AlertTriangle, Target, Clock } from 'lucide-react';
import { ArbitrageOpportunityCard } from './ArbitrageOpportunityCard';
import type { ArbitrageOpportunity } from '@/hooks/useDeFiLlamaArbitrage';

interface ArbitrageTabContentProps {
  opportunities: ArbitrageOpportunity[];
  tabType: 'best-net-profit' | 'immediate' | 'low-risk' | 'all';
}

export const ArbitrageTabContent = ({ opportunities, tabType }: ArbitrageTabContentProps) => {
  const getFilteredOpportunities = () => {
    switch (tabType) {
      case 'best-net-profit':
        return opportunities.slice(0, 5);
      case 'immediate':
        return opportunities.filter(op => op.timeToCapture < 1);
      case 'low-risk':
        return opportunities.filter(op => op.riskAssessment.level === 'Low');
      case 'all':
        return opportunities.slice(0, 20);
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (tabType) {
      case 'best-net-profit':
        return { icon: Calculator, text: 'Highest Net Profit Opportunities', color: 'text-green-600' };
      case 'immediate':
        return { icon: Zap, text: 'Immediate Opportunities (<1 hour)', color: 'text-yellow-600' };
      case 'low-risk':
        return { icon: AlertTriangle, text: 'Low Risk Opportunities', color: 'text-green-600' };
      case 'all':
        return { icon: Target, text: 'All Opportunities', color: 'text-blue-600' };
      default:
        return { icon: Target, text: 'Opportunities', color: 'text-blue-600' };
    }
  };

  const filteredOpportunities = getFilteredOpportunities();
  const { icon: Icon, text: title, color } = getTitle();

  if (tabType === 'all' && opportunities.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Arbitrage Opportunities Found</h3>
          <p className="text-muted-foreground">
            Try lowering the minimum profit threshold to see more opportunities.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (tabType === 'immediate') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOpportunities.map((opportunity, index) => (
              <Card key={`immediate-${index}`} className="border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{opportunity.tokenPair}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.executionComplexity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          ${opportunity.netProfitEstimate.toFixed(0)}
                        </p>
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{opportunity.timeToCapture.toFixed(1)}h</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-center bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                      <strong>{opportunity.yieldDifference.toFixed(2)}%</strong> yield difference
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tabType === 'low-risk') {
    const getRiskColor = (level: string) => {
      switch (level) {
        case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
        case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
        case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
      }
    };

    const getComplexityColor = (complexity: string) => {
      switch (complexity) {
        case 'Simple': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
        case 'Moderate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
        case 'Complex': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
        default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOpportunities.map((opportunity, index) => (
              <Card key={`low-risk-${index}`} className="border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{opportunity.tokenPair}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskColor('Low')}>Low Risk</Badge>
                          <Badge className={getComplexityColor(opportunity.executionComplexity)}>
                            {opportunity.executionComplexity}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          ${opportunity.netProfitEstimate.toFixed(0)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.yieldDifference.toFixed(2)}% diff
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                      Risk Score: <strong>{opportunity.riskAssessment.score}/17</strong>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tabType === 'all') {
    return (
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity, index) => (
          <ArbitrageOpportunityCard 
            key={`all-${index}`}
            opportunity={opportunity}
            index={index}
            variant="compact"
          />
        ))}
      </div>
    );
  }

  // Default case for best-net-profit
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity, index) => (
            <ArbitrageOpportunityCard 
              key={`${opportunity.tokenPair}-${index}`}
              opportunity={opportunity}
              index={index}
              variant="detailed"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
