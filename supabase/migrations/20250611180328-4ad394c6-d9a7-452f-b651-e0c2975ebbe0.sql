
-- Remove LFJ protocol and associated data
DELETE FROM yield_pools WHERE protocol_id IN (
  SELECT id FROM protocols WHERE slug = 'lfj'
);

DELETE FROM protocols WHERE slug = 'lfj';

-- Add Arena.trade as a new protocol
INSERT INTO protocols (name, slug, protocol_type, website_url, logo_url, is_active)
VALUES (
  'Arena.trade',
  'arena',
  'dex',
  'https://arena.trade',
  'https://arena.trade/logo.png',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  website_url = EXCLUDED.website_url,
  logo_url = EXCLUDED.logo_url,
  is_active = EXCLUDED.is_active;
