
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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
  inputImages?: string[];
  mask?: string;
}

const checkGenerationLimit = async (supabase: any, userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const DAILY_LIMIT = 5;

  // Get today's usage
  const { data: limitData, error: limitError } = await supabase
    .from('user_generation_limits')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle();

  if (limitError) {
    console.error('Error checking generation limits:', limitError);
    throw new Error('Failed to check generation limits');
  }

  // If no record exists, user can generate (first generation of the day)
  if (!limitData) {
    return { canGenerate: true, isOverrideUsed: false };
  }

  // If override is used, allow unlimited generations
  if (limitData.override_used) {
    return { canGenerate: true, isOverrideUsed: true };
  }

  // Check if user has exceeded daily limit
  if (limitData.generation_count >= DAILY_LIMIT) {
    return { canGenerate: false, isOverrideUsed: false };
  }

  return { canGenerate: true, isOverrideUsed: false };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) {
      throw new Error('Unauthorized')
    }

    const { prompt, size, quality, jobType, inputImages, mask }: GenerationRequest = await req.json()

    console.log('Received request:', { prompt, size, quality, jobType, hasInputImages: !!inputImages?.length, inputImagesCount: inputImages?.length })

    // Check generation limits before proceeding
    const { canGenerate, isOverrideUsed } = await checkGenerationLimit(supabase, user.id);
    
    if (!canGenerate) {
      return new Response(
        JSON.stringify({
          error: 'Daily generation limit exceeded',
          code: 'LIMIT_EXCEEDED',
          message: 'You have reached your daily limit of 5 generations. Please try again tomorrow or use an override code.'
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('Generation limit check passed:', { canGenerate, isOverrideUsed });

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('image_generation_jobs')
      .insert({
        user_id: user.id,
        prompt,
        size,
        quality,
        job_type: jobType,
        status: 'processing'
      })
      .select()
      .single()

    if (jobError) {
      console.error('Job creation error:', jobError)
      throw new Error('Failed to create job record')
    }

    console.log('Created job:', job.id)

    let openaiResponse
    let imageBytes: Uint8Array

    try {
      if (jobType === 'image_edit' && inputImages?.length) {
        // Image editing with GPT-Image-1
        const formData = new FormData()
        
        inputImages.forEach((imageBase64, index) => {
          const imageByteArray = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0))
          const imageBlob = new Blob([imageByteArray], { type: 'image/png' })
          formData.append('image[]', imageBlob, `input_${index}.png`)
        })

        if (mask) {
          const maskBytes = Uint8Array.from(atob(mask), c => c.charCodeAt(0))
          const maskBlob = new Blob([maskBytes], { type: 'image/png' })
          formData.append('mask', maskBlob, 'mask.png')
        }

        formData.append('model', 'gpt-image-1')
        formData.append('prompt', prompt)
        formData.append('n', '1')
        formData.append('size', size)
        formData.append('quality', quality)

        console.log('Making OpenAI edit request with', inputImages.length, 'images')

        const response = await fetch('https://api.openai.com/v1/images/edits', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
          },
          body: formData,
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('OpenAI API error:', errorText)
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
        }

        openaiResponse = await response.json()
        console.log('OpenAI edit response received:', { hasData: !!openaiResponse?.data, dataLength: openaiResponse?.data?.length })
        
      } else {
        // Text-to-image generation with GPT-Image-1
        const requestBody = {
          model: 'gpt-image-1',
          prompt: prompt,
          n: 1,
          size: size,
          quality: quality
        }

        console.log('Making OpenAI generation request:', { ...requestBody, prompt: prompt.substring(0, 50) + '...' })

        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('OpenAI API error:', errorText)
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
        }

        openaiResponse = await response.json()
        console.log('OpenAI generation response received:', { hasData: !!openaiResponse?.data, dataLength: openaiResponse?.data?.length })
      }

      // GPT-Image-1 returns base64 data by default
      if (!openaiResponse?.data?.[0]) {
        console.error('No data in OpenAI response:', openaiResponse)
        throw new Error('No image data received from OpenAI')
      }

      const imageData = openaiResponse.data[0]
      
      if (imageData.b64_json) {
        console.log('Processing base64 response')
        imageBytes = Uint8Array.from(atob(imageData.b64_json), c => c.charCodeAt(0))
      } else if (imageData.url) {
        console.log('Processing URL response, downloading image')
        const imageResponse = await fetch(imageData.url)
        if (!imageResponse.ok) {
          throw new Error('Failed to download generated image from URL')
        }
        imageBytes = new Uint8Array(await imageResponse.arrayBuffer())
      } else {
        console.error('Unexpected response format:', imageData)
        throw new Error('Unexpected response format from OpenAI - no base64 or URL found')
      }
      
      const fileName = `${user.id}/${job.id}_${Date.now()}.png`
      
      console.log('Uploading to storage:', fileName, 'Size:', imageBytes.length, 'bytes')

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('generated-images')
        .upload(fileName, imageBytes, {
          contentType: 'image/png',
          upsert: false
        })

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        throw new Error(`Storage upload failed: ${uploadError.message}`)
      }

      console.log('Upload successful:', uploadData.path)

      const { data: { publicUrl } } = supabase.storage
        .from('generated-images')
        .getPublicUrl(uploadData.path)

      console.log('Public URL generated:', publicUrl)

      // Update job status to completed
      await supabase
        .from('image_generation_jobs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          openai_response: openaiResponse
        })
        .eq('id', job.id)

      // Save to user_images table
      const { error: imageError } = await supabase
        .from('user_images')
        .insert({
          user_id: user.id,
          job_id: job.id,
          image_url: publicUrl,
          storage_path: uploadData.path,
          prompt,
          size,
          quality,
          job_type: jobType
        })

      if (imageError) {
        console.error('Error saving to user_images:', imageError)
      }

      console.log('Job completed successfully')

      return new Response(
        JSON.stringify({
          success: true,
          imageUrl: publicUrl,
          jobId: job.id,
          modelUsed: 'gpt-image-1'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )

    } catch (openaiError: any) {
      console.error('OpenAI/Processing error:', openaiError)
      
      // Update job status to failed
      await supabase
        .from('image_generation_jobs')
        .update({
          status: 'failed',
          error_message: openaiError.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', job.id)

      throw openaiError
    }

  } catch (error: any) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
