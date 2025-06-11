
-- Create tables for DeFi aggregator data
CREATE TABLE public.defi_exchanges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  api_endpoint TEXT,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for supported tokens
CREATE TABLE public.defi_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  contract_address TEXT,
  decimals INTEGER NOT NULL DEFAULT 18,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(symbol, contract_address)
);

-- Create table for trading pairs
CREATE TABLE public.defi_trading_pairs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exchange_id UUID REFERENCES public.defi_exchanges(id) NOT NULL,
  base_token_id UUID REFERENCES public.defi_tokens(id) NOT NULL,
  quote_token_id UUID REFERENCES public.defi_tokens(id) NOT NULL,
  pair_address TEXT,
  liquidity_usd DECIMAL,
  volume_24h_usd DECIMAL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(exchange_id, base_token_id, quote_token_id)
);

-- Create table for price data
CREATE TABLE public.defi_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trading_pair_id UUID REFERENCES public.defi_trading_pairs(id) NOT NULL,
  price DECIMAL NOT NULL,
  price_usd DECIMAL,
  volume_24h DECIMAL,
  price_change_24h DECIMAL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user swap history
CREATE TABLE public.defi_swap_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  exchange_id UUID REFERENCES public.defi_exchanges(id) NOT NULL,
  from_token_id UUID REFERENCES public.defi_tokens(id) NOT NULL,
  to_token_id UUID REFERENCES public.defi_tokens(id) NOT NULL,
  from_amount DECIMAL NOT NULL,
  to_amount DECIMAL NOT NULL,
  exchange_rate DECIMAL NOT NULL,
  gas_fee DECIMAL,
  transaction_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for all tables
ALTER TABLE public.defi_exchanges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defi_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defi_trading_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defi_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defi_swap_history ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to exchange data
CREATE POLICY "Anyone can view exchanges" ON public.defi_exchanges
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view tokens" ON public.defi_tokens
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view trading pairs" ON public.defi_trading_pairs
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view prices" ON public.defi_prices
  FOR SELECT USING (true);

-- Create policies for user swap history
CREATE POLICY "Users can view their own swap history" ON public.defi_swap_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own swap history" ON public.defi_swap_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert initial exchange data
INSERT INTO public.defi_exchanges (name, slug, api_endpoint, is_active) VALUES
('Apex DeFi', 'apex-defi', 'https://api.apexdefi.com', true),
('Pharoah', 'pharoah', 'https://api.pharoah.fi', true),
('LFJ', 'lfj', 'https://api.lfj.gg', true),
('BENQI', 'benqi', 'https://api.benqi.fi', true);

-- Insert common tokens (AVAX ecosystem)
INSERT INTO public.defi_tokens (symbol, name, decimals, is_active) VALUES
('AVAX', 'Avalanche', 18, true),
('USDC', 'USD Coin', 6, true),
('USDT', 'Tether USD', 6, true),
('ETH', 'Ethereum', 18, true),
('BTC', 'Bitcoin', 8, true),
('QI', 'BENQI Token', 18, true),
('JOE', 'JoeToken', 18, true),
('PNG', 'Pangolin', 18, true);

-- Create function to get best rates across exchanges
CREATE OR REPLACE FUNCTION public.get_best_rates(
  base_token_symbol TEXT,
  quote_token_symbol TEXT
)
RETURNS TABLE (
  exchange_name TEXT,
  exchange_slug TEXT,
  price DECIMAL,
  liquidity_usd DECIMAL,
  volume_24h_usd DECIMAL,
  price_change_24h DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.name as exchange_name,
    e.slug as exchange_slug,
    p.price,
    tp.liquidity_usd,
    tp.volume_24h_usd,
    p.price_change_24h
  FROM public.defi_prices p
  JOIN public.defi_trading_pairs tp ON p.trading_pair_id = tp.id
  JOIN public.defi_exchanges e ON tp.exchange_id = e.id
  JOIN public.defi_tokens bt ON tp.base_token_id = bt.id
  JOIN public.defi_tokens qt ON tp.quote_token_id = qt.id
  WHERE bt.symbol = base_token_symbol 
    AND qt.symbol = quote_token_symbol
    AND e.is_active = true
    AND tp.is_active = true
  ORDER BY p.price DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
