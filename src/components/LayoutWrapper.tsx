'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { EstudosProvider } from '@/components/EstudosProvider';
import PageTransition from '@/components/PageTransition';
import '@/lib/i18n';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <EstudosProvider>
        <PageTransition>
          {children}
        </PageTransition>
      </EstudosProvider>
    </ThemeProvider>
  );
}
