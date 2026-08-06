'use client';

import { useCallback, useRef, useState } from 'react';

interface Options {
  delay?: number;
  onLongPress: () => void;
  onPress?: () => void;
}

export function useLongPress({ delay = 500, onLongPress, onPress }: Options) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const [pressing, setPressing] = useState(false);

  const start = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isLongPress.current = false;
    setPressing(true);

    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setPressing(false);
      onLongPress();
    }, delay);
  }, [delay, onLongPress]);

  const stop = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPressing(false);

    if (!isLongPress.current && onPress) {
      onPress();
    }
  }, [onPress]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPressing(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchMove: cancel,
    pressing,
  };
}
