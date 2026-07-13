'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseTelaCheiaReturn {
  isFullscreen: boolean;
  isSupported: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
}

export function useTelaCheia(): UseTelaCheiaReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const supported =
      document.fullscreenEnabled ||
      (document as unknown as { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled ||
      false;
    setIsSupported(supported);

    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
    };
  }, []);

  const enter = useCallback(async () => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else {
        const wk = (el as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen;
        if (wk) await wk.call(el);
      }
    } catch {
      // ignore
    }
  }, []);

  const exit = useCallback(async () => {
    if (typeof document === 'undefined') return;
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else {
        const wk = (document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen;
        if (wk) await wk.call(document);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await exit();
    } else {
      await enter();
    }
  }, [enter, exit]);

  return { isFullscreen, isSupported, enter, exit, toggle };
}
