
-- Create table to track daily generation limits and override usage
CREATE TABLE public.user_generation_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  generation_count INTEGER NOT NULL DEFAULT 0,
  override_used BOOLEAN NOT NULL DEFAULT false,
  override_timestamp TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.user_generation_limits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own generation limits" ON public.user_generation_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generation limits" ON public.user_generation_limits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generation limits" ON public.user_generation_limits
  FOR UPDATE USING (auth.uid() = user_id);

-- Create index for efficient queries
CREATE INDEX idx_user_generation_limits_user_date ON public.user_generation_limits(user_id, date);
