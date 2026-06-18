'use client';

import { useEffect } from 'react';

export function RegisterSW() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const registrar = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => undefined);
    };

    if (document.readyState === 'complete') {
      registrar();
    } else {
      window.addEventListener('load', registrar, { once: true });
    }
  }, []);

  return null;
}
