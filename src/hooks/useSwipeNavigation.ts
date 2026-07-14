import { useRef, useCallback, useEffect } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

interface UseSwipeNavigationOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeNavigationOptions = {}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastSwipe = useRef(0);

  const handlers: SwipeHandlers = {
    onTouchStart: useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }, []),

    onTouchMove: useCallback(
      (e: React.TouchEvent) => {
        if (!touchStart.current) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStart.current.x;
        const deltaY = touch.clientY - touchStart.current.y;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          e.preventDefault();
        }
      },
      []
    ),

    onTouchEnd: useCallback(
      (e: React.TouchEvent) => {
        if (!touchStart.current) return;

        const now = Date.now();
        if (now - lastSwipe.current < 100) {
          touchStart.current = null;
          return;
        }

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStart.current.x;
        const deltaY = touch.clientY - touchStart.current.y;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= threshold) {
          lastSwipe.current = now;
          if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          } else if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          }
        }

        touchStart.current = null;
      },
      [onSwipeLeft, onSwipeRight, threshold]
    ),
  };

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStart.current.x);
      const deltaY = Math.abs(touch.clientY - touchStart.current.y);
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  return { handlers };
}
