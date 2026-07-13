'use client';

import { useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { EstudosProvider } from '@/components/EstudosProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import PageTransition from '@/components/PageTransition';
import BibleSplash from '@/components/BibleSplash';
import TopProgressBar from '@/components/TopProgressBar';
import BackToTop from '@/components/BackToTop';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMicroInteracoes } from '@/hooks/useMicroInteracoes';
import { preloadRoute } from '@/lib/performance';
import '@/lib/i18n';

function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);
  return null;
}

function AnalyticsAndPerformance() {
  useAnalytics();
  useMicroInteracoes();

  useEffect(() => {
    const criticalRoutes = ['/biblia', '/pesquisa', '/ia', '/teologia', '/exegese'];
    criticalRoutes.forEach((route, i) => {
      setTimeout(() => preloadRoute(route), i * 2000);
    });
  }, []);

  return null;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ServiceWorkerRegistration />
        <AnalyticsAndPerformance />
        <TooltipProvider delayDuration={300}>
          <EstudosProvider>
            <TopProgressBar />
            <BibleSplash />
            <PageTransition>
              {children}
            </PageTransition>
            <BackToTop />
          </EstudosProvider>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
