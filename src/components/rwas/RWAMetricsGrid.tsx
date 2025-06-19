
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Building, Coins, DollarSign } from "lucide-react";

export const RWAMetricsGrid = () => {
  const metrics = [
    {
      title: "Total RWA Value",
      value: "$187.79M",
      change: "+3.94%",
      isPositive: true,
      icon: TrendingUp,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Active RWA Assets",
      value: "24",
      change: "3 new this week",
      isPositive: true,
      icon: Building,
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "RWA Holders",
      value: "7,635",
      change: "+0.34%",
      isPositive: true,
      icon: Users,
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Stablecoin Market Cap",
      value: "$1.70B",
      change: "-25.64%",
      isPositive: false,
      icon: DollarSign,
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      iconColor: "text-yellow-600 dark:text-yellow-400"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">Avalanche RWA Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="card-hover modern-shadow hover:modern-shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground mb-2">{metric.value}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metric.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
