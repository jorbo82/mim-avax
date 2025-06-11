
-- Update database schema for yield farming aggregator
-- Create protocols table for different DeFi platforms
CREATE TABLE IF NOT EXISTS public.protocols (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  protocol_type VARCHAR(50) NOT NULL DEFAULT 'dex',
  website_url TEXT,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create yield_pools table for discovered pool data
CREATE TABLE IF NOT EXISTS public.yield_pools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  protocol_id UUID NOT NULL REFERENCES public.protocols(id) ON DELETE CASCADE,
  pool_identifier VARCHAR(255) NOT NULL,
  pool_name VARCHAR(255) NOT NULL,
  pool_type VARCHAR(50) NOT NULL DEFAULT 'wrapper',
  contract_address VARCHAR(42) NOT NULL,
  base_token_address VARCHAR(42),
  base_token_symbol VARCHAR(20),
  quote_token_address VARCHAR(42),
  quote_token_symbol VARCHAR(20),
  tvl_usd NUMERIC(20, 2) DEFAULT 0,
  apy_base NUMERIC(8, 4) DEFAULT 0,
  apy_reward NUMERIC(8, 4) DEFAULT 0,
  volume_24h_usd NUMERIC(20, 2) DEFAULT 0,
  fees_24h_usd NUMERIC(20, 2) DEFAULT 0,
  pool_metadata JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(protocol_id, pool_identifier)
);

-- Create pool_discovery_requests table for audit trail
CREATE TABLE IF NOT EXISTS public.pool_discovery_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  contract_address VARCHAR(42) NOT NULL,
  discovery_method VARCHAR(50) NOT NULL DEFAULT 'wrapper_check',
  validation_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  validation_data JSONB DEFAULT '{}',
  error_message TEXT,
  pools_discovered INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yield_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pool_discovery_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for protocols (public read access)
CREATE POLICY "Anyone can view protocols" ON public.protocols
  FOR SELECT USING (true);

-- RLS policies for yield_pools (public read access)
CREATE POLICY "Anyone can view yield pools" ON public.yield_pools
  FOR SELECT USING (true);

-- RLS policies for pool_discovery_requests (users can view their own)
CREATE POLICY "Users can view their own discovery requests" ON public.pool_discovery_requests
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create discovery requests" ON public.pool_discovery_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Insert initial protocol data
INSERT INTO public.protocols (name, slug, protocol_type, website_url) VALUES
  ('Apex DeFi', 'apex-defi', 'dex', 'https://apexdefi.xyz'),
  ('Pharaoh Exchange', 'pharaoh', 'dex', 'https://pharaoh.exchange'),
  ('Liquity Finance (LFJ)', 'lfj', 'lending', 'https://lfj.gg'),
  ('BENQI', 'benqi', 'lending', 'https://benqi.fi')
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_yield_pools_protocol_id ON public.yield_pools(protocol_id);
CREATE INDEX IF NOT EXISTS idx_yield_pools_contract_address ON public.yield_pools(contract_address);
CREATE INDEX IF NOT EXISTS idx_yield_pools_base_token ON public.yield_pools(base_token_address);
CREATE INDEX IF NOT EXISTS idx_pool_discovery_requests_user_id ON public.pool_discovery_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_pool_discovery_requests_contract ON public.pool_discovery_requests(contract_address);
