'use client';

import { useRef, useCallback, useState } from 'react';

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  passive?: boolean;
}

interface SwipeState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  passive = false,
}: UseSwipeOptions) {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    direction: null,
  });

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    setSwipeState(prev => ({
      ...prev,
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      direction: null,
    }));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    let direction: SwipeState['direction'] = null;
    if (absDeltaX > absDeltaY) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setSwipeState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
      direction,
    }));
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current) return;

    const { deltaX, deltaY, direction } = swipeState;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > threshold || absDeltaY > threshold) {
      if (direction === 'left' && onSwipeLeft) onSwipeLeft();
      if (direction === 'right' && onSwipeRight) onSwipeRight();
      if (direction === 'up' && onSwipeUp) onSwipeUp();
      if (direction === 'down' && onSwipeDown) onSwipeDown();
    }

    touchStartRef.current = null;
    setSwipeState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      direction: null,
    });
  }, [swipeState, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  const bind = useCallback(() => ({
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }), [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    swipeState,
    bind,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

export function useChapterSwipe({
  onPrevChapter,
  onNextChapter,
}: {
  onPrevChapter: () => void;
  onNextChapter: () => void;
}) {
  const { swipeState, handlers } = useSwipe({
    onSwipeRight: onPrevChapter,
    onSwipeLeft: onNextChapter,
    threshold: 80,
  });

  const progress = swipeState.isDragging
    ? Math.min(Math.abs(swipeState.deltaX) / 80, 1)
    : 0;

  const offset = swipeState.isDragging
    ? Math.max(-100, Math.min(100, swipeState.deltaX * 0.5))
    : 0;

  return {
    swipeState,
    handlers,
    progress,
    offset,
    canGoPrev: swipeState.direction === 'right' && swipeState.deltaX > 30,
    canGoNext: swipeState.direction === 'left' && swipeState.deltaX < -30,
  };
}
