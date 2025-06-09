
import { User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome, {user.email}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => signOut()}
          className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white"
        >
          <User className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={() => navigate("/auth")}
      className="bg-gradient-to-r from-mim-teal to-mim-gold hover:from-mim-teal-dark hover:to-mim-orange text-white"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
};

export default AuthButton;
