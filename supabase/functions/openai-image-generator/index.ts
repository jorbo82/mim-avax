
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerationRequest {
  prompt: string;
  size: string;
  quality: string;
  jobType: 'text_to_image' | 'image_edit';
  jobId: string;
  inputImages?: string[]; // base64 encoded images
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { prompt, size, quality, jobType, jobId, inputImages }: GenerationRequest = await req.json();

    if (!prompt || !jobId) {
      throw new Error('Missing required parameters');
    }

    console.log(`Starting image generation for job ${jobId}, user ${user.id}`);

    // Update job status to processing
    await supabase
      .from('image_generation_jobs')
      .update({ status: 'processing' })
      .eq('id', jobId)
      .eq('user_id', user.id);

    // Prepare OpenAI request
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let openaiResponse;
    
    if (jobType === 'text_to_image') {
      // Text-to-image generation
      openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: size,
          quality: quality,
          response_format: 'url'
        }),
      });
    } else {
      // Image-to-image editing (requires DALL-E 2)
      if (!inputImages || inputImages.length === 0) {
        throw new Error('Input images required for image editing');
      }

      // Convert first base64 image to blob for editing
      const imageBase64 = inputImages[0];
      const imageBuffer = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0));
      
      const formData = new FormData();
      formData.append('image', new Blob([imageBuffer], { type: 'image/png' }));
      formData.append('prompt', prompt);
      formData.append('n', '1');
      formData.append('size', size);
      formData.append('response_format', 'url');

      openaiResponse = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
        },
        body: formData,
      });
    }

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      throw new Error(errorData.error?.message || 'OpenAI API request failed');
    }

    const result = await openaiResponse.json();
    console.log('OpenAI response received for job:', jobId);

    if (!result.data || result.data.length === 0) {
      throw new Error('No image generated');
    }

    const imageUrl = result.data[0].url;
    
    // Download the generated image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to download generated image');
    }

    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    
    // Upload to Supabase Storage
    const fileName = `${user.id}/${jobId}_${Date.now()}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error('Failed to save image to storage');
    }

    // Get the public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from('generated-images')
      .getPublicUrl(fileName);

    const storedImageUrl = urlData.publicUrl;

    // Save image record to database
    await supabase
      .from('user_images')
      .insert({
        user_id: user.id,
        job_id: jobId,
        image_url: storedImageUrl,
        storage_path: fileName,
        prompt: prompt,
        size: size,
        quality: quality,
        job_type: jobType
      });

    // Update job status to completed
    await supabase
      .from('image_generation_jobs')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
        openai_response: result
      })
      .eq('id', jobId)
      .eq('user_id', user.id);

    console.log(`Successfully completed job ${jobId}`);

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: storedImageUrl,
        jobId: jobId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Image generation error:', error);
    
    // Try to update job status to failed if we have the jobId
    try {
      const { jobId } = await req.json();
      if (jobId) {
        const authHeader = req.headers.get('Authorization');
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: authHeader } }
        });
        
        await supabase
          .from('image_generation_jobs')
          .update({ 
            status: 'failed',
            error_message: error.message,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      }
    } catch (updateError) {
      console.error('Failed to update job status:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
