'use client';

import { useEffect, useRef } from 'react';

export function useAutoPlay(
  callback: () => void,
  intervalSeconds: number,
  isPlaying: boolean
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!isPlaying || intervalSeconds <= 0) return;
    const ms = Math.max(1, intervalSeconds) * 1000;
    const id = setInterval(() => {
      callbackRef.current();
    }, ms);
    return () => clearInterval(id);
  }, [intervalSeconds, isPlaying]);
}
