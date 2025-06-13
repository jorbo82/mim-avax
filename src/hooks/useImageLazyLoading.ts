
import { useState, useEffect, useRef } from 'react';

interface UseImageLazyLoadingProps {
  src: string;
  threshold?: number;
}

export const useImageLazyLoading = ({ src, threshold = 0.1 }: UseImageLazyLoadingProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  const retry = () => {
    setIsError(false);
    setIsLoaded(false);
    if (imgRef.current) {
      imgRef.current.src = src;
    }
  };

  return {
    imgRef,
    containerRef,
    isLoaded,
    isError,
    isInView,
    handleLoad,
    handleError,
    retry
  };
};
