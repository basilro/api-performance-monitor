import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for virtual scrolling optimization
 * Reduces DOM nodes for large lists, improving rendering performance
 */
export const useVirtualization = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStartIndex = Math.floor(scrollTop / itemHeight);
  const visibleEndIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight)
  );

  // Add buffer for smooth scrolling
  const BUFFER_SIZE = 5;
  const startIndex = Math.max(0, visibleStartIndex - BUFFER_SIZE);
  const endIndex = Math.min(items.length - 1, visibleEndIndex + BUFFER_SIZE);

  const visibleItems = useMemo(
    () => items.slice(startIndex, endIndex + 1),
    [items, startIndex, endIndex]
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    startIndex,
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
    handleScroll,
  };
};