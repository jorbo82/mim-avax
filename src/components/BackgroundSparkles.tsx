
import { Sparkles } from "lucide-react";

const BackgroundSparkles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          <Sparkles className="w-2 h-2 text-yellow-300" />
        </div>
      ))}
    </div>
  );
};

export default BackgroundSparkles;
