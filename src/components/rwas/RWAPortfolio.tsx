
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { PieChart } from "lucide-react";

const portfolioData = [
  { name: "BUIDL", value: 5200, color: "#3b82f6" },
  { name: "bCSPX", value: 3100, color: "#10b981" },
  { name: "AUSD", value: 2800, color: "#f59e0b" },
  { name: "WTGOV", value: 950, color: "#ef4444" },
  { name: "avUSD", value: 400, color: "#8b5cf6" }
];

const chartConfig = {
  value: {
    label: "Value ($)",
    color: "hsl(var(--primary))",
  },
};

export const RWAPortfolio = () => {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section>
      <Card className="modern-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <PieChart className="w-5 h-5" />
            Your RWA Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={portfolioData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-4">Portfolio Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Value:</span>
                    <span className="font-semibold">${totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">24h P&L:</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">+$124 (+1.0%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Holdings:</span>
                    <span className="font-semibold">{portfolioData.length} Assets</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-4">Top Holdings</h4>
                <div className="space-y-3">
                  {portfolioData.slice(0, 3).map((holding, index) => {
                    const percentage = ((holding.value / totalValue) * 100).toFixed(1);
                    return (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{holding.name}</span>
                        <span className="text-sm font-semibold">
                          ${holding.value.toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
