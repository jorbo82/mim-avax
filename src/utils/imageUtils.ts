
export const validateImageFile = (file: File): boolean => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return false;
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return false;
  }

  return true;
};

export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and resize
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        } else {
          resolve(file);
        }
      }, file.type);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const downloadImage = (imageUrl: string, filename?: string, format: 'png' | 'jpeg' | 'webp' = 'png') => {
  // Generate filename if not provided
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const defaultFilename = `mim-me-${timestamp}.${format}`;
  const finalFilename = filename || defaultFilename;

  // For data URLs, we can download directly
  if (imageUrl.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = finalFilename;
    link.style.display = 'none';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // For other URLs, we need to fetch and convert to blob
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = finalFilename;
      link.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up object URL
      setTimeout(() => URL.revokeObjectURL(url), 100);
    })
    .catch(error => {
      console.error('Download failed:', error);
      // Fallback: try opening in new tab with download attribute
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = finalFilename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
