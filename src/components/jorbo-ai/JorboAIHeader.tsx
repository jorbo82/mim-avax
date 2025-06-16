
import { ArrowLeft, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface JorboAIHeaderProps {
  userEmail?: string;
  onSignOut: () => void;
}

export const JorboAIHeader = ({ userEmail, onSignOut }: JorboAIHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="text-mim-teal hover:text-mim-teal-dark dark:text-mim-teal-light dark:hover:text-mim-teal"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-mim-teal to-mim-gold rounded-full">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-mim-teal to-mim-gold bg-clip-text text-transparent">
              JORBO AI
            </h1>
            <p className="text-muted-foreground">Advanced AI Image Generator</p>
            <p className="text-sm text-muted-foreground">Welcome back, {userEmail}</p>
          </div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onSignOut}
        className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white dark:border-mim-teal-light dark:text-mim-teal-light dark:hover:bg-mim-teal-light dark:hover:text-gray-900"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};
