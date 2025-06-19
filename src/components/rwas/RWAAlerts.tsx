
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, TrendingUp, DollarSign, Plus } from "lucide-react";

export const RWAAlerts = () => {
  const activeAlerts = [
    {
      title: "New RWA Detection",
      description: "Alert when new assets are tokenized",
      icon: Bell,
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-400",
      isActive: true
    },
    {
      title: "Volume Spike Alert",
      description: "Alert for 50%+ volume increases",
      icon: TrendingUp,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      isActive: true
    },
    {
      title: "Price Movement",
      description: "Alert for significant price changes",
      icon: DollarSign,
      bgColor: "bg-gray-50 dark:bg-gray-950/20",
      iconColor: "text-gray-400",
      isActive: false
    }
  ];

  return (
    <section>
      <Card className="modern-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="w-5 h-5" />
            Smart Alert System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Active Alerts</h4>
              <div className="space-y-3">
                {activeAlerts.map((alert, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${alert.bgColor}`}>
                    <alert.icon className={`w-5 h-5 ${alert.iconColor}`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className={alert.iconColor}>
                      {alert.isActive ? "🟢" : "⚪"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Create New Alert</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alertType" className="text-sm font-medium text-foreground">
                    Alert Type
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-asset">New Asset Launch</SelectItem>
                      <SelectItem value="volume">Volume Threshold</SelectItem>
                      <SelectItem value="market-cap">Market Cap Change</SelectItem>
                      <SelectItem value="holders">Holder Count Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition" className="text-sm font-medium text-foreground">
                    Condition
                  </Label>
                  <Input
                    id="condition"
                    placeholder="e.g., > $1M market cap"
                    className="w-full"
                  />
                </div>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Alert
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
