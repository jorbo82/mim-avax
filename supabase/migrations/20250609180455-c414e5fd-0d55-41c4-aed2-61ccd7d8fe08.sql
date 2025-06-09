
-- First, let's create the storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('generated-images', 'generated-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('reference-images', 'reference-images', true)
ON CONFLICT (id) DO NOTHING;

-- Update storage policies to be more permissive for generated images
DROP POLICY IF EXISTS "Users can view their own generated images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own generated images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own generated images" ON storage.objects;

-- Create more permissive policies for generated images bucket
CREATE POLICY "Allow public read access to generated images" ON storage.objects
  FOR SELECT USING (bucket_id = 'generated-images');

CREATE POLICY "Allow authenticated uploads to generated images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'generated-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to delete their own generated images" ON storage.objects
  FOR DELETE USING (bucket_id = 'generated-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Similar policies for reference images
DROP POLICY IF EXISTS "Users can view their own reference images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own reference images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own reference images" ON storage.objects;

CREATE POLICY "Allow public read access to reference images" ON storage.objects
  FOR SELECT USING (bucket_id = 'reference-images');

CREATE POLICY "Allow authenticated uploads to reference images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'reference-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to delete their own reference images" ON storage.objects
  FOR DELETE USING (bucket_id = 'reference-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add RLS policies for the image generation jobs table
DROP POLICY IF EXISTS "Users can view their own jobs" ON public.image_generation_jobs;
DROP POLICY IF EXISTS "Users can create their own jobs" ON public.image_generation_jobs;
DROP POLICY IF EXISTS "Users can update their own jobs" ON public.image_generation_jobs;

CREATE POLICY "Users can view their own jobs" ON public.image_generation_jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own jobs" ON public.image_generation_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" ON public.image_generation_jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Add RLS policies for user images table
DROP POLICY IF EXISTS "Users can view their own images" ON public.user_images;
DROP POLICY IF EXISTS "Users can create their own images" ON public.user_images;
DROP POLICY IF EXISTS "Users can update their own images" ON public.user_images;
DROP POLICY IF EXISTS "Users can delete their own images" ON public.user_images;

CREATE POLICY "Users can view their own images" ON public.user_images
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own images" ON public.user_images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" ON public.user_images
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images" ON public.user_images
  FOR DELETE USING (auth.uid() = user_id);
