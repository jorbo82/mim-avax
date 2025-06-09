import { TrendingUp, Zap, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsSection = () => {
  return (
    <section className="relative z-10 container mx-auto px-4 pb-16">
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-fit">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-yellow-400">Total Supply</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-white">10 Billion</p>
            <p className="text-purple-300">$MIM Tokens</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-fit">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-yellow-400">Tax</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-white">0%</p>
            <p className="text-purple-300">No Tax Magic!</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 p-3 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full w-fit">
              <Users className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-yellow-400">Phase</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-white">Arena</p>
            <p className="text-purple-300">Building Phase</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StatsSection;
