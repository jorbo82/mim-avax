
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { RWAMetricsGrid } from "@/components/rwas/RWAMetricsGrid";
import { RWACharts } from "@/components/rwas/RWACharts";
import { RWADiscovery } from "@/components/rwas/RWADiscovery";
import { RWAAssetTable } from "@/components/rwas/RWAAssetTable";
import { RWAPortfolio } from "@/components/rwas/RWAPortfolio";
import { RWAAnalytics } from "@/components/rwas/RWAAnalytics";
import { RWAAlerts } from "@/components/rwas/RWAAlerts";

const RWAs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Avalanche RWA Tracker
            </h1>
            <p className="text-muted-foreground mt-2">Track, discover, and analyze Real World Assets on Avalanche</p>
          </div>
        </div>

        {/* Key Metrics */}
        <RWAMetricsGrid />

        {/* Charts Section */}
        <RWACharts />

        {/* New RWA Discovery */}
        <RWADiscovery />

        {/* RWA Assets Table */}
        <RWAAssetTable />

        {/* Portfolio Tracker */}
        <RWAPortfolio />

        {/* Market Analytics */}
        <RWAAnalytics />

        {/* Alert System */}
        <RWAAlerts />
      </main>
    </div>
  );
};

export default RWAs;
