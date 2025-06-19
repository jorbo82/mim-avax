
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

const growthData = [
  { name: "Jan 1", value: 145 },
  { name: "Jan 5", value: 152 },
  { name: "Jan 10", value: 148 },
  { name: "Jan 15", value: 165 },
  { name: "Jan 20", value: 172 },
  { name: "Jan 25", value: 180 },
  { name: "Jan 30", value: 187.79 }
];

const categoryData = [
  { name: "Treasury", value: 42, color: "#3b82f6" },
  { name: "Stablecoins", value: 28, color: "#10b981" },
  { name: "Equity", value: 18, color: "#f59e0b" },
  { name: "Bonds", value: 8, color: "#ef4444" },
  { name: "Alternative", value: 4, color: "#8b5cf6" }
];

const chartConfig = {
  value: {
    label: "Value ($M)",
    color: "hsl(var(--primary))",
  },
};

export const RWACharts = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="modern-shadow">
          <CardHeader>
            <CardTitle className="text-foreground">RWA Value Growth (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="modern-shadow">
          <CardHeader>
            <CardTitle className="text-foreground">RWA Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
