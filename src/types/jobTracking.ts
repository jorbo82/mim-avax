
export interface ImageGenerationJob {
  id: string;
  user_id: string;
  prompt: string;
  size: string;
  quality: string;
  job_type: 'text_to_image' | 'image_edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message?: string;
  openai_response?: any;
  created_at: string;
  completed_at?: string;
}

export interface UserImage {
  id: string;
  user_id: string;
  job_id?: string;
  image_url: string;
  storage_path: string;
  prompt: string;
  size: string;
  quality: string;
  job_type: string;
  is_favorite: boolean;
  created_at: string;
}

export interface CreateJobParams {
  prompt: string;
  size: string;
  quality: string;
  jobType: 'text_to_image' | 'image_edit';
}

export interface SaveImageParams {
  jobId: string;
  imageUrl: string;
  storagePath: string;
  prompt: string;
  size: string;
  quality: string;
  jobType: string;
}
