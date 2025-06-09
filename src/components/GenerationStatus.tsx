
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Shield, Infinity } from 'lucide-react';

interface GenerationStatusProps {
  remainingGenerations: number;
  dailyLimit: number;
  isOverrideUsed: boolean;
  loading: boolean;
}

export const GenerationStatus = ({
  remainingGenerations,
  dailyLimit,
  isOverrideUsed,
  loading
}: GenerationStatusProps) => {
  if (loading) {
    return (
      <Card className="cute-border bg-gradient-to-r from-mim-cream/30 to-mim-pink-light/20 dark:from-mim-brown/20 dark:to-mim-pink-dark/10">
        <CardContent className="pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin w-4 h-4 border-2 border-mim-teal border-t-transparent rounded-full" />
            Loading status...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cute-border bg-gradient-to-r from-mim-cream/30 to-mim-pink-light/20 dark:from-mim-brown/20 dark:to-mim-pink-dark/10">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOverrideUsed ? (
              <>
                <Infinity className="w-4 h-4 text-mim-gold" />
                <span className="text-sm font-medium text-mim-teal">Override Active</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-mim-teal" />
                <span className="text-sm font-medium text-mim-teal">Daily Generations</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isOverrideUsed ? (
              <Badge variant="secondary" className="bg-mim-gold/20 text-mim-gold border-mim-gold/30">
                <Shield className="w-3 h-3 mr-1" />
                Unlimited
              </Badge>
            ) : (
              <Badge 
                variant="secondary" 
                className={`${
                  remainingGenerations <= 1 
                    ? 'bg-mim-orange/20 text-mim-orange border-mim-orange/30' 
                    : 'bg-mim-teal/20 text-mim-teal border-mim-teal/30'
                }`}
              >
                {remainingGenerations} / {dailyLimit}
              </Badge>
            )}
          </div>
        </div>
        
        {!isOverrideUsed && remainingGenerations <= 1 && (
          <div className="mt-2 text-xs text-muted-foreground">
            {remainingGenerations === 0 ? '🚫 Daily limit reached' : '⚠️ Last generation for today'}
          </div>
        )}
        
        {isOverrideUsed && (
          <div className="mt-2 text-xs text-muted-foreground">
            🎯 Override code activated - unlimited generations today
          </div>
        )}
      </CardContent>
    </Card>
  );
};
