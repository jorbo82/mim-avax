
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Key } from 'lucide-react';

interface GenerationLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOverride: (password: string) => Promise<boolean>;
  remainingGenerations: number;
  dailyLimit: number;
}

export const GenerationLimitModal = ({
  isOpen,
  onClose,
  onOverride,
  remainingGenerations,
  dailyLimit
}: GenerationLimitModalProps) => {
  const [overridePassword, setOverridePassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOverrideSubmit = async () => {
    if (!overridePassword.trim()) return;
    
    setIsSubmitting(true);
    const success = await onOverride(overridePassword);
    setIsSubmitting(false);
    
    if (success) {
      setOverridePassword('');
      onClose();
    }
  };

  const handleClose = () => {
    setOverridePassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-mim-teal">
            <Shield className="w-5 h-5" />
            Daily Generation Limit Reached
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-mim-orange/30 bg-gradient-to-r from-mim-cream/50 to-mim-pink-light/30 dark:from-mim-brown/30 dark:to-mim-pink-dark/20">
            <CardContent className="pt-4">
              <div className="text-center space-y-2">
                <Clock className="w-8 h-8 mx-auto text-mim-orange" />
                <h3 className="font-semibold text-mim-teal">Daily Limit: {dailyLimit} generations</h3>
                <p className="text-sm text-muted-foreground">
                  You've used all your daily generations. Your limit will reset tomorrow.
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  Remaining today: <span className="font-medium text-mim-orange">{remainingGenerations}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Key className="w-4 h-4" />
              <span>Have an override code?</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="override-password">Override Password</Label>
              <Input
                id="override-password"
                type="password"
                placeholder="Enter override password"
                value={overridePassword}
                onChange={(e) => setOverridePassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleOverrideSubmit()}
                className="border-mim-teal/30 focus:border-mim-teal dark:border-mim-teal-light/30 dark:focus:border-mim-teal-light"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleOverrideSubmit}
                disabled={!overridePassword.trim() || isSubmitting}
                className="flex-1 bg-gradient-to-r from-mim-teal to-mim-gold hover:from-mim-teal-dark hover:to-mim-orange text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Activating...
                  </>
                ) : (
                  'Activate Override'
                )}
              </Button>
            </div>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            🎨 JORBO AI respects fair usage to ensure quality service for everyone
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
