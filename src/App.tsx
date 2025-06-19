
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import TokenAnalysis from "./pages/TokenAnalysis";
import JorboAI from "./pages/JorboAI";
import DeFiAggregator from "./pages/DeFiAggregator";
import Auth from "./pages/Auth";
import ArbitratumMagnifiicum from "./pages/ArbitratumMagnifiicum";
import RWAs from "./pages/RWAs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/token-analysis" element={<TokenAnalysis />} />
            <Route path="/jorbo-ai" element={<JorboAI />} />
            <Route path="/defi-aggregator" element={<DeFiAggregator />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/arbitratum-magnifiicum" element={<ArbitratumMagnifiicum />} />
            <Route path="/rwas" element={<RWAs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
