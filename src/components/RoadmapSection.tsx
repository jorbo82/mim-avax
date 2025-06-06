
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Brain, Diamond, Sparkles, Calendar, TrendingUp } from "lucide-react";

const RoadmapSection = () => {
  const roadmapPhases = [
    {
      quarter: "Q2 2025",
      title: "Foundation Phase",
      icon: <Rocket className="w-8 h-8" />,
      status: "upcoming",
      color: "from-purple-500 to-blue-500",
      milestones: [
        "Token Launch on Arena.trade",
        "Community Building & Social Growth",
        "Initial Exchange Listings",
        "Wizard Council Formation",
        "Tokenomics Implementation"
      ]
    },
    {
      quarter: "Q3 2025",
      title: "DeFi Innovation Phase",
      icon: <Brain className="w-8 h-8" />,
      status: "upcoming",
      color: "from-green-500 to-teal-500",
      milestones: [
        "AI-Powered Yield Farming Aggregation",
        "Smart Contract Yield Evaluation",
        "Automated Portfolio Optimization",
        "Cross-Chain Yield Discovery",
        "Risk Assessment AI Models"
      ]
    },
    {
      quarter: "Q4 2025",
      title: "RWA Integration Phase",
      icon: <Diamond className="w-8 h-8" />,
      status: "upcoming",
      color: "from-yellow-500 to-orange-500",
      milestones: [
        "On-Chain Real World Assets Aggregator",
        "Tokenized Asset Marketplace",
        "Institutional Partnerships",
        "Regulatory Compliance Framework",
        "Asset Tokenization Platform"
      ]
    },
    {
      quarter: "Q1 2026",
      title: "Ecosystem Expansion",
      icon: <Sparkles className="w-8 h-8" />,
      status: "future",
      color: "from-pink-500 to-purple-500",
      milestones: [
        "Multi-Chain Deployment",
        "Advanced AI Analytics Dashboard",
        "Governance Token Utility",
        "Magic Internet Empire Launch",
        "Global DeFi Integration"
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Upcoming</Badge>;
      case "future":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Future</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Planning</Badge>;
    }
  };

  return (
    <section className="relative z-10 container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Magic Roadmap
        </h2>
        <p className="text-xl md:text-2xl text-purple-300 max-w-3xl mx-auto leading-relaxed">
          Our journey to build the most magical DeFi ecosystem in the multiverse! 🚀✨
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {roadmapPhases.map((phase, index) => (
          <Card 
            key={index}
            className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <span className="text-purple-300 font-semibold">{phase.quarter}</span>
                </div>
                {getStatusBadge(phase.status)}
              </div>
              
              <CardTitle className="text-yellow-400 text-2xl flex items-center gap-3">
                {phase.icon}
                {phase.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-4">
              <div className="space-y-3">
                {phase.milestones.map((milestone, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-purple-200 text-sm">{milestone}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-xs text-purple-300 text-center">
                  {phase.quarter === "Q2 2025" && "🎯 Foundation for magical DeFi innovation"}
                  {phase.quarter === "Q3 2025" && "🧙‍♂️ AI-powered yield farming revolution"}
                  {phase.quarter === "Q4 2025" && "💎 Real-world asset tokenization magic"}
                  {phase.quarter === "Q1 2026" && "✨ Complete ecosystem transformation"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-purple-200">Join the magical journey and help shape the future of DeFi!</span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
