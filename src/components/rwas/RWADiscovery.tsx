
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Bell, Sparkles } from "lucide-react";

export const RWADiscovery = () => {
  const discoveries = [
    {
      status: "NEW",
      statusColor: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
      time: "2 hours ago",
      name: "WisdomTree WTGOV",
      description: "Government Bond Fund",
      value: "$2.3M Initial Deposit",
      valueColor: "text-green-600 dark:text-green-400"
    },
    {
      status: "UPDATED",
      statusColor: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
      time: "5 hours ago",
      name: "Backed bCSPX",
      description: "S&P 500 Index Fund",
      value: "+$1.8M Volume",
      valueColor: "text-blue-600 dark:text-blue-400"
    },
    {
      status: "TRENDING",
      statusColor: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
      time: "1 day ago",
      name: "BlackRock BUIDL",
      description: "USD Digital Liquidity",
      value: "+127 New Holders",
      valueColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <section>
      <Card className="modern-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Sparkles className="w-5 h-5" />
              New RWA Discovery
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Alerts
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoveries.map((discovery, index) => (
              <div key={index} className={`border rounded-lg p-4 ${discovery.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`${discovery.statusColor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {discovery.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{discovery.time}</span>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{discovery.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{discovery.description}</p>
                <p className={`text-sm font-semibold ${discovery.valueColor}`}>
                  {discovery.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
