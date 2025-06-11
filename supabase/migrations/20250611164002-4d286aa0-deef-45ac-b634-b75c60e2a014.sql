
-- Add storage management function to maintain user image limits
CREATE OR REPLACE FUNCTION public.cleanup_old_user_images()
RETURNS TRIGGER AS $$
DECLARE
    image_count INTEGER;
    oldest_images RECORD;
BEGIN
    -- Count current images for this user
    SELECT COUNT(*) INTO image_count 
    FROM public.user_images 
    WHERE user_id = NEW.user_id;
    
    -- If we exceed 100 images, delete the oldest ones
    IF image_count > 100 THEN
        -- Delete oldest images beyond the limit
        FOR oldest_images IN 
            SELECT id, storage_path 
            FROM public.user_images 
            WHERE user_id = NEW.user_id 
            ORDER BY created_at ASC 
            LIMIT (image_count - 100)
        LOOP
            -- Delete from storage
            PERFORM storage.delete(ARRAY[oldest_images.storage_path], 'generated-images');
            
            -- Delete from database
            DELETE FROM public.user_images WHERE id = oldest_images.id;
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically cleanup old images
DROP TRIGGER IF EXISTS trigger_cleanup_old_images ON public.user_images;
CREATE TRIGGER trigger_cleanup_old_images
    AFTER INSERT ON public.user_images
    FOR EACH ROW
    EXECUTE FUNCTION public.cleanup_old_user_images();

-- Add function to get user storage stats
CREATE OR REPLACE FUNCTION public.get_user_storage_stats(user_uuid UUID)
RETURNS TABLE (
    image_count INTEGER,
    storage_limit INTEGER,
    remaining_slots INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE((SELECT COUNT(*)::INTEGER FROM public.user_images WHERE user_id = user_uuid), 0) as image_count,
        100 as storage_limit,
        GREATEST(0, 100 - COALESCE((SELECT COUNT(*)::INTEGER FROM public.user_images WHERE user_id = user_uuid), 0)) as remaining_slots;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policy for the storage stats function
CREATE POLICY "Users can view their own storage stats" ON public.user_images
  FOR SELECT USING (auth.uid() = user_id);
