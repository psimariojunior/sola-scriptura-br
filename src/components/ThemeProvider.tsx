'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { TemaProvider, useTema } from '@/lib/temas';
import { useEffect, useRef, type ReactNode } from 'react';

function TemaSincronizador() {
  const { tema } = useTema();
  const previousTema = useRef<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia', 'noturno');
    // Qualquer tema escuro/sepia/noturno precisa de classe `dark` para
    // ativar as variantes Tailwind dark:bg-*/dark:text-* usadas em TODO o app.
    // So o tema `claro` (light) fica sem `dark`.
    if (tema === 'escuro' || tema === 'noturno' || tema === 'sepia') {
      root.classList.add('dark');
    }
    if (tema === 'noturno') {
      root.classList.add('noturno');
    }
    if (tema === 'sepia') {
      root.classList.add('sepia');
    }

    if (mounted.current && previousTema.current && previousTema.current !== tema) {
      document.body.classList.remove('theme-fading');
      // Force reflow so the animation restarts
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
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TemaProvider>
        <TemaSincronizador />
        {children}
      </TemaProvider>
    </NextThemesProvider>
  );
}
