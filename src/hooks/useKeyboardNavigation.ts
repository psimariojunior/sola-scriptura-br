'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseKeyboardNavigationOptions {
  itemCount: number;
  columns?: number;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
  loop?: boolean;
}

interface UseKeyboardNavigationReturn {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  handlers: {
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
}

export function useKeyboardNavigation({
  itemCount,
  columns = 1,
  onSelect,
  onEscape,
  loop = true,
}: UseKeyboardNavigationOptions): UseKeyboardNavigationReturn {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const getNextIndex = useCallback(
    (current: number, key: string): number => {
      if (itemCount <= 0) return -1;

      switch (key) {
        case 'ArrowDown':
          if (columns > 1) {
            const next = current + columns;
            return next < itemCount ? next : loop ? next % itemCount : itemCount - 1;
          }
          return loop
            ? (current + 1) % itemCount
            : Math.min(current + 1, itemCount - 1);

        case 'ArrowUp':
          if (columns > 1) {
            const prev = current - columns;
            return prev >= 0 ? prev : loop ? ((prev % itemCount) + itemCount) % itemCount : 0;
          }
          return loop
            ? (current - 1 + itemCount) % itemCount
            : Math.max(current - 1, 0);

        case 'ArrowRight':
          return loop
            ? (current + 1) % itemCount
            : Math.min(current + 1, itemCount - 1);

        case 'ArrowLeft':
          return loop
            ? (current - 1 + itemCount) % itemCount
            : Math.max(current - 1, 0);

        case 'Home':
          return 0;

        case 'End':
          return itemCount - 1;

        default:
          return current;
      }
    },
    [itemCount, columns, loop]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isGridKey = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key);
      const isActionKey = ['Enter', ' '].includes(e.key);

      if (!isGridKey && !isActionKey && e.key !== 'Escape') return;

      if (e.key === 'Escape') {
        setActiveIndex(-1);
        onEscape?.();
        containerRef.current?.blur();
        return;
      }

      e.preventDefault();

      if (isActionKey) {
        if (activeIndex >= 0 && activeIndex < itemCount) {
          onSelect?.(activeIndex);
        }
        return;
      }

      if (isGridKey) {
        const newIndex = activeIndex < 0 ? 0 : getNextIndex(activeIndex, e.key);
        setActiveIndex(newIndex);

        const items = containerRef.current?.querySelectorAll('[data-roving-item]');
        items?.[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        (items?.[newIndex] as HTMLElement)?.focus();
      }
    },
    [activeIndex, itemCount, getNextIndex, onSelect, onEscape]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) {
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    containerRef,
    handlers: { onKeyDown: handleKeyDown },
  };
}
