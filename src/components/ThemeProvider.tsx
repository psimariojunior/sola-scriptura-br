'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { TemaProvider, useTema } from '@/lib/temas';
import { useEffect, type ReactNode } from 'react';

function TemaSincronizador() {
  const { tema } = useTema();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia', 'noturno');
    if (tema === 'escuro' || tema === 'noturno') {
      root.classList.add('dark');
    }
    if (tema === 'noturno') {
      root.classList.add('noturno');
    }
    if (tema === 'sepia') {
      root.classList.add('sepia');
    }
    // light: no class, uses :root CSS variables
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
