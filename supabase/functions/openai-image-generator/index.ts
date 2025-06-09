
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

    console.log('Received request:', { prompt, size, quality, jobType, hasInputImages: !!inputImages?.length })

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
    let imageUrl

    try {
      if (jobType === 'image_edit' && inputImages?.length) {
        // Image editing with GPT-Image-1
        const formData = new FormData()
        
        // Add each input image
        for (let i = 0; i < inputImages.length; i++) {
          const imageBase64 = inputImages[i]
          const imageBytes = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0))
          const imageBlob = new Blob([imageBytes], { type: 'image/png' })
          formData.append('image', imageBlob, `input_${i}.png`)
        }

        // Add mask if provided
        if (mask) {
          const maskBytes = Uint8Array.from(atob(mask), c => c.charCodeAt(0))
          const maskBlob = new Blob([maskBytes], { type: 'image/png' })
          formData.append('mask', maskBlob, 'mask.png')
        }

        // Add parameters
        formData.append('model', 'gpt-image-1')
        formData.append('prompt', prompt)
        formData.append('n', '1')
        formData.append('size', size)
        formData.append('quality', quality)
        formData.append('response_format', 'b64_json')

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
          throw new Error(`OpenAI API error: ${response.status}`)
        }

        openaiResponse = await response.json()
        console.log('OpenAI edit response received')
        
      } else {
        // Text-to-image generation with GPT-Image-1
        const requestBody = {
          model: 'gpt-image-1',
          prompt: prompt,
          n: 1,
          size: size,
          quality: quality,
          response_format: 'b64_json'
        }

        console.log('Making OpenAI request:', { ...requestBody, prompt: prompt.substring(0, 50) + '...' })

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
          throw new Error(`OpenAI API error: ${response.status}`)
        }

        openaiResponse = await response.json()
        console.log('OpenAI generation response received')
      }

      if (!openaiResponse?.data?.[0]?.b64_json) {
        throw new Error('No image data received from OpenAI')
      }

      // Convert base64 to blob and upload to Supabase Storage
      const imageBase64 = openaiResponse.data[0].b64_json
      const imageBytes = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0))
      
      const fileName = `${user.id}/${job.id}_${Date.now()}.png`
      
      console.log('Uploading to storage:', fileName)

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

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('generated-images')
        .getPublicUrl(uploadData.path)

      imageUrl = publicUrl
      console.log('Public URL generated:', imageUrl)

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
          image_url: imageUrl,
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
          imageUrl,
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
