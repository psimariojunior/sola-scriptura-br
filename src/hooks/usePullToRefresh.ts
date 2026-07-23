'use client';

import { useState, useCallback, useRef } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  maxPull?: number;
  resistance?: number;
}

interface PullToRefreshState {
  isRefreshing: boolean;
  pullDistance: number;
  isPulling: boolean;
  isPastThreshold: boolean;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  maxPull = 120,
  resistance = 2.5,
}: UsePullToRefreshOptions) {
  const [state, setState] = useState<PullToRefreshState>({
    isRefreshing: false,
    pullDistance: 0,
    isPulling: false,
    isPastThreshold: false,
  });

  const startY = useRef(0);
  const currentY = useRef(0);
  const isAtTop = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    isAtTop.current = scrollTop <= 0;
    if (!isAtTop.current) return;

    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isAtTop.current || state.isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const delta = (currentY.current - startY.current) / resistance;
    const pullDistance = Math.min(Math.max(0, delta), maxPull);
    const isPastThreshold = pullDistance >= threshold;

    setState(prev => ({
      ...prev,
      pullDistance,
      isPulling: pullDistance > 0,
      isPastThreshold,
    }));
  }, [state.isRefreshing, threshold, maxPull, resistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!isAtTop.current || state.isRefreshing) return;

    if (state.isPastThreshold) {
      setState(prev => ({ ...prev, isRefreshing: true }));
      try {
        await onRefresh();
      } catch {
        // ignore
      }
      setState(prev => ({ ...prev, isRefreshing: false, pullDistance: 0, isPulling: false }));
    } else {
      setState(prev => ({ ...prev, pullDistance: 0, isPulling: false }));
    }
  }, [state.isRefreshing, state.isPastThreshold, onRefresh]);

  const progress = Math.min(state.pullDistance / threshold, 1);

  return {
    state,
    progress,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
