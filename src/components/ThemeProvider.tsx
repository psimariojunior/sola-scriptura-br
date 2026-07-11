'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { TemaProvider, useTema } from '@/lib/temas';
import { useEffect, type ReactNode } from 'react';

function TemaSincronizador() {
  const { tema } = useTema();

  useEffect(() => {
    const root = document.documentElement;
    if (tema === 'sepia') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [tema]);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <TemaProvider>
        <TemaSincronizador />
        {children}
      </TemaProvider>
    </NextThemesProvider>
  );
}
