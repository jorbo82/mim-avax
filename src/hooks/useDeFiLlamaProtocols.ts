
import { useQuery } from '@tanstack/react-query';

export interface DeFiLlamaProtocol {
  id: string;
  name: string;
  address: string;
  symbol: string;
  url: string;
  description: string;
  chain: string;
  logo: string;
  audits: string;
  audit_note: string;
  gecko_id: string;
  cmcId: string;
  category: string;
  chains: string[];
  module: string;
  twitter: string;
  forkedFrom: string[];
  oracles: string[];
  listedAt: number;
  methodology: string;
  slug: string;
  tvl: number;
  chainTvls: Record<string, number>;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  tokenBreakdowns: Record<string, number>;
  mcap: number;
}

const fetchAvalancheProtocols = async (): Promise<DeFiLlamaProtocol[]> => {
  const response = await fetch('https://api.llama.fi/protocols');
  
  if (!response.ok) {
    throw new Error('Failed to fetch protocols');
  }
  
  const data: DeFiLlamaProtocol[] = await response.json();
  
  // Filter for Avalanche protocols
  return data.filter(protocol => 
    protocol.chains?.includes('Avalanche') || 
    protocol.chain === 'Avalanche'
  );
};

export const useDeFiLlamaProtocols = () => {
  return useQuery({
    queryKey: ['defillama-protocols', 'avalanche'],
    queryFn: fetchAvalancheProtocols,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 4 * 60 * 1000, // Consider data stale after 4 minutes
    retry: 3,
  });
};
