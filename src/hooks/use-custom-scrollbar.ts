import { useState, useRef, useEffect } from 'react';

interface UseCustomScrollbarReturn {
  scrollThumbTop: number;
  scrollThumbHeight: number;
  isDragging: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  handleScrollbarMouseDown: (e: React.MouseEvent) => void;
  handleScrollbarTrackClick: (e: React.MouseEvent) => void;
}

export function useCustomScrollbar(): UseCustomScrollbarReturn {
  const [scrollThumbTop, setScrollThumbTop] = useState(0);
  const [scrollThumbHeight, setScrollThumbHeight] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      const maxThumbTop = 100 - scrollThumbHeight;
      setScrollThumbTop(Math.min(Math.max(scrollPercentage, 0), maxThumbTop));
    }
  };

  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const scrollbarElement = e.currentTarget.parentElement;
    if (!scrollbarElement || !scrollContainerRef.current) return;
    
    const startY = e.clientY;
    const startScrollTop = scrollContainerRef.current.scrollTop;
    const scrollbarHeight = scrollbarElement.offsetHeight;
    const maxScrollTop = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
    
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollContainerRef.current) return;
      
      const deltaY = e.clientY - startY;
      const scrollRatio = deltaY / scrollbarHeight;
      const newScrollTop = Math.max(0, Math.min(maxScrollTop, startScrollTop + (scrollRatio * maxScrollTop)));
      scrollContainerRef.current.scrollTop = newScrollTop;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleScrollbarTrackClick = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const scrollbarHeight = rect.height;
      const scrollPercentage = Math.max(0, Math.min(100, (clickY / scrollbarHeight) * 100));
      const maxScrollTop = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      const newScrollTop = (scrollPercentage / 100) * maxScrollTop;
      scrollContainerRef.current.scrollTop = newScrollTop;
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const thumbHeight = Math.max((clientHeight / scrollHeight) * 100, 10);
      setScrollThumbHeight(thumbHeight);
    }
  }, []);

  return {
    scrollThumbTop,
    scrollThumbHeight,
    isDragging,
    scrollContainerRef,
    handleScroll,
    handleScrollbarMouseDown,
    handleScrollbarTrackClick,
  };
}
