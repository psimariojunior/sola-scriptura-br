'use client';

import { Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { EstudosProvider } from '@/components/EstudosProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AIProvider } from '@/contexts/AIContext';
import PageTransition from '@/components/PageTransition';
import BibleSplash from '@/components/BibleSplash';
import TopProgressBar from '@/components/TopProgressBar';
import BackToTop from '@/components/BackToTop';
import { Toaster } from '@/components/ui/toast-helpers';
import { AIPainelLateral } from '@/components/AIPainelLateral';
import { AIMiniPainel } from '@/components/AIMiniPainel';
import { HotkeysDialog } from '@/components/HotkeysDialog';
import { OnboardingModal, resetOnboarding } from '@/components/OnboardingModal';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMicroInteracoes } from '@/hooks/useMicroInteracoes';
import { useHotkeys } from '@/hooks/useHotkeys';
import { HOTKEYS } from '@/lib/hotkeys';
import { preloadRoute } from '@/lib/performance';
import { useRouter } from 'next/navigation';
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

function GlobalHotkeys() {
  const router = useRouter();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [onboardingKey, setOnboardingKey] = useState(0);

  useEffect(() => {
    const onShortcuts = () => setShortcutsOpen(true);
    const onReset = () => {
      resetOnboarding();
      setOnboardingKey((k) => k + 1);
    };
    window.addEventListener('ssb:open-shortcuts', onShortcuts as EventListener);
    window.addEventListener('ssb:reset-onboarding', onReset as EventListener);
    return () => {
      window.removeEventListener('ssb:open-shortcuts', onShortcuts as EventListener);
      window.removeEventListener('ssb:reset-onboarding', onReset as EventListener);
    };
  }, []);

  useHotkeys(HOTKEYS, {
    'busca-global': () => {
      window.dispatchEvent(new CustomEvent('ssb:toggle-busca'));
    },
    'painel-ia': () => {
      window.dispatchEvent(new CustomEvent('ssb:toggle-ai'));
    },
    biblia: () => router.push('/biblia'),
    'shortcuts': () => setShortcutsOpen((o) => !o),
    'shortcuts-alt': () => setShortcutsOpen((o) => !o),
  });

  return (
    <>
      <HotkeysDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <OnboardingModal key={onboardingKey} />
    </>
  );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ServiceWorkerRegistration />
        <AnalyticsAndPerformance />
        <TooltipProvider delayDuration={300}>
          <Suspense fallback={null}>
            <AIProvider>
              <EstudosProvider>
                <TopProgressBar />
                <Toaster />
                <PageTransition>
                  {children}
                </PageTransition>
                <BackToTop />
                <AIPainelLateral />
                <AIMiniPainel />
                <GlobalHotkeys />
              </EstudosProvider>
            </AIProvider>
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
