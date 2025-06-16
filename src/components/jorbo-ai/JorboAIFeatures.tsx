
import { Card, CardContent } from "@/components/ui/card";

export const JorboAIFeatures = () => {
  return (
    <Card className="cute-border bg-gradient-to-r from-mim-cream/50 to-mim-pink-light/30 dark:from-mim-brown/30 dark:to-mim-pink-dark/20">
      <CardContent className="pt-6">
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-mim-teal">🚀 JORBO AI Features</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>✨</span>
              <span>Advanced AI Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🖼️</span>
              <span>Multi-Image Editing</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📊</span>
              <span>Job Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💾</span>
              <span>Smart Gallery</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
