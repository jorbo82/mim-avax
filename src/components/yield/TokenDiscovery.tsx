
import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useContractValidation } from '@/hooks/useContractValidation';

const TokenDiscovery = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const { validateContract, loading, error } = useContractValidation();

  const handleValidate = async () => {
    if (!contractAddress.trim()) return;

    try {
      const result = await validateContract(contractAddress.trim(), true);
      setValidationResult(result);
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  const handleExampleClick = (address: string) => {
    setContractAddress(address);
    setValidationResult(null);
  };

  return (
    <Card className="bg-black/20 backdrop-blur-md border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Token Discovery
        </CardTitle>
        <CardDescription className="text-purple-300">
          Enter an ERC20 token address to discover yield farming opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter ERC20 contract address (0x...)"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="bg-black/20 border-purple-500/30 text-white"
          />
          <Button 
            onClick={handleValidate}
            disabled={loading || !contractAddress.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Example addresses */}
        <div className="space-y-2">
          <p className="text-sm text-purple-300">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick('0x8D8B084269f4b2Ad111b60793e9f3577A7795605')}
              className="text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              MIM Token
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {validationResult && (
          <div className="space-y-4">
            {validationResult.hasWrapper ? (
              <Alert className="border-green-500/30 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  Wrapper found! This token has yield farming opportunities.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-300">
                  No wrapper found for this token.
                </AlertDescription>
              </Alert>
            )}

            {validationResult.hasWrapper && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-purple-900/20 border-purple-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-300">ERC314 Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-mono text-white break-all">
                      {validationResult.erc314Address}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-900/20 border-blue-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-300">Wrapper Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-mono text-white break-all">
                      {validationResult.wrapperAddress}
                    </p>
                  </CardContent>
                </Card>

                {validationResult.metrics && (
                  <>
                    <Card className="bg-green-900/20 border-green-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-green-300">TVL</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-bold text-green-400">
                          ${validationResult.metrics.tvl?.toLocaleString() || '0'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-yellow-900/20 border-yellow-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-yellow-300">Total APY</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-bold text-yellow-400">
                          {validationResult.metrics.totalAPY?.toFixed(2) || '0.00'}%
                        </p>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenDiscovery;
