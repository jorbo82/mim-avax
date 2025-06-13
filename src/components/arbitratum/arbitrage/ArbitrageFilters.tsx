
import { Card, CardContent } from '@/components/ui/card';

interface ArbitrageFiltersProps {
  minProfit: number;
  setMinProfit: (value: number) => void;
  opportunitiesCount: number;
}

export const ArbitrageFilters = ({ minProfit, setMinProfit, opportunitiesCount }: ArbitrageFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Minimum Profit Threshold:</label>
          <select
            value={minProfit}
            onChange={(e) => setMinProfit(parseFloat(e.target.value))}
            className="px-3 py-1 border rounded-md bg-background"
          >
            <option value={0.1}>0.1%</option>
            <option value={0.5}>0.5%</option>
            <option value={1.0}>1.0%</option>
            <option value={2.0}>2.0%</option>
            <option value={5.0}>5.0%</option>
            <option value={10.0}>10.0%</option>
          </select>
          <div className="text-sm text-muted-foreground">
            Found {opportunitiesCount} opportunities
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
