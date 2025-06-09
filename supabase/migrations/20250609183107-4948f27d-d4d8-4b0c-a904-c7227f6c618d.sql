
-- Make the generated-images bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'generated-images';

-- Update storage policies to allow public read access to generated images
DROP POLICY IF EXISTS "Allow public read access to generated images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to generated images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own generated images" ON storage.objects;

-- Create new storage policies for generated images
CREATE POLICY "Public read access to generated images" ON storage.objects
  FOR SELECT USING (bucket_id = 'generated-images');

CREATE POLICY "Authenticated users can upload generated images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'generated-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own generated images" ON storage.objects
  FOR DELETE USING (bucket_id = 'generated-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add proper foreign key constraint for cascade deletion
ALTER TABLE public.user_images 
DROP CONSTRAINT IF EXISTS user_images_job_id_fkey;

ALTER TABLE public.user_images 
ADD CONSTRAINT user_images_job_id_fkey 
FOREIGN KEY (job_id) REFERENCES public.image_generation_jobs(id) ON DELETE CASCADE;
