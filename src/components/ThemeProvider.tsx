'use client';

import { TemaProvider, useTema } from '@/lib/temas';
import { useEffect, useRef, type ReactNode } from 'react';

function TemaSincronizador() {
  const { tema } = useTema();
  const previousTema = useRef<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current && previousTema.current && previousTema.current !== tema) {
      document.body.classList.remove('theme-fading');
      void document.body.offsetWidth;
      document.body.classList.add('theme-fading');
      const timeout = window.setTimeout(() => {
        document.body.classList.remove('theme-fading');
      }, 520);
      previousTema.current = tema;
      return () => window.clearTimeout(timeout);
    }

    mounted.current = true;
    previousTema.current = tema;
  }, [tema]);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <TemaProvider>
      <TemaSincronizador />
      {children}
    </TemaProvider>
  );
}
