
import { useState } from 'react';

export const useGallerySelection = (maxSelections: number = 10) => {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  const toggleSelection = (imageUrl: string) => {
    setSelectedUrls(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else if (prev.length < maxSelections) {
        return [...prev, imageUrl];
      }
      return prev;
    });
  };

  const clearSelection = () => {
    setSelectedUrls([]);
  };

  return {
    selectedUrls,
    toggleSelection,
    clearSelection
  };
};
