
import { useState, useEffect } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface GandalfSummaryProps {
  tokenAddress: string;
  discoveryResult: any;
  arenaResult: any;
}

const GandalfSummary = ({ tokenAddress, discoveryResult, arenaResult }: GandalfSummaryProps) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Reset state when token address changes
  useEffect(() => {
    setSummary('');
    setError(null);
    setHasGenerated(false);
    setLoading(false);
  }, [tokenAddress]);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('gandalf-token-summary', {
        body: {
          tokenAddress,
          discoveryResult,
          arenaResult
        }
      });

      if (error) throw error;

      setSummary(data.summary);
      setHasGenerated(true);
    } catch (err: any) {
      setError(err.message || 'Failed to generate Gandalf\'s wisdom');
      console.error('Gandalf summary error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!hasGenerated && !loading) {
    return (
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-purple-300 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Seek Gandalf's Wisdom
          </CardTitle>
          <CardDescription className="text-purple-200">
            Let the wise wizard analyze your token discovery and share his counsel
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={generateSummary}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={loading}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Consult the Wizard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Gandalf's Wisdom
          {!loading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={generateSummary}
              className="ml-auto text-purple-400 hover:text-purple-300"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </CardTitle>
        <CardDescription className="text-purple-200">
          The wise wizard's counsel on your token analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400 mr-2" />
            <span className="text-purple-300">The wizard consults his ancient tomes...</span>
          </div>
        ) : error ? (
          <div className="text-red-400 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <p className="font-medium mb-2">The wizard's crystal ball grows cloudy...</p>
            <p className="text-sm">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateSummary}
              className="mt-2 border-red-500/50 text-red-400 hover:bg-red-900/30"
            >
              Try Again
            </Button>
          </div>
        ) : summary ? (
          <div className="prose prose-purple max-w-none">
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
              <div className="text-purple-100 leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 text-xs font-medium">
                🧙‍♂️ Remember: Even Gandalf cannot predict the future of markets. This is not financial advice. 
                Do your own research to keep your Magic Internet Money safe!
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default GandalfSummary;
