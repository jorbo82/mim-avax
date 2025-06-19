
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpDown, Users, Lightbulb } from "lucide-react";

export const RWAAnalytics = () => {
  const flowData = [
    {
      title: "Net Inflows (24h)",
      value: "+$2.4M",
      icon: TrendingDown,
      bgColor: "bg-green-50 dark:bg-green-950/20",
      textColor: "text-green-600 dark:text-green-400",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Trading Volume (24h)",
      value: "$8.7M",
      icon: ArrowUpDown,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-600 dark:text-blue-400",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "New Participants",
      value: "+47",
      icon: Users,
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      textColor: "text-purple-600 dark:text-purple-400",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  const insights = [
    {
      title: "Institutional Interest Rising",
      description: "BlackRock BUIDL seeing 23% increase in large transactions (>$100K)",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      titleColor: "text-yellow-800 dark:text-yellow-400",
      textColor: "text-yellow-700 dark:text-yellow-300"
    },
    {
      title: "Stablecoin Dominance",
      description: "USD-backed stablecoins account for 64% of total RWA volume",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      titleColor: "text-blue-800 dark:text-blue-400",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    {
      title: "Growth Trajectory",
      description: "RWA ecosystem growing 15% month-over-month",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      titleColor: "text-green-800 dark:text-green-400",
      textColor: "text-green-700 dark:text-green-300"
    }
  ];

  return (
    <section>
      <Card className="modern-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5" />
            Market Analytics & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4">RWA Flow Analysis</h4>
              <div className="space-y-3">
                {flowData.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${item.bgColor}`}>
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      <span className="text-sm text-foreground">{item.title}</span>
                    </div>
                    <span className={`font-semibold ${item.textColor}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Key Insights</h4>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className={`p-3 rounded-lg ${insight.bgColor}`}>
                    <h5 className={`font-semibold text-sm mb-1 ${insight.titleColor}`}>
                      {insight.title}
                    </h5>
                    <p className={`text-sm ${insight.textColor}`}>
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
