'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { EstudosProvider } from '@/components/EstudosProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AIProvider } from '@/contexts/AIContext';
import TopProgressBar from '@/components/TopProgressBar';
import BackToTop from '@/components/BackToTop';
import { Toaster } from '@/components/ui/toast-helpers';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useRouter, usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { registerServiceWorker } from '@/lib/offline';
import { authService } from '@/lib/auth';
import { initSentry } from '@/lib/sentry';
import PageTransition from '@/components/PageTransition';
import '@/lib/i18n';

const MobilePerformanceMonitor = lazy(() => import('@/components/MobilePerformanceMonitor'));
const BottomNavBar = lazy(() => import('@/components/BottomNavBar'));
const OfflineManager = lazy(() => import('@/components/OfflineManager').then(m => ({ default: m.OfflineManager })));
const VoiceCommands = lazy(() => import('@/components/VoiceCommands').then(m => ({ default: m.VoiceCommands })));
const AccessibilityPanel = lazy(() => import('@/components/AccessibilityPanel').then(m => ({ default: m.AccessibilityPanel })));

const AIPainelLateral = lazy(() => import('@/components/AIPainelLateral').then(m => ({ default: m.AIPainelLateral })));
const AIMiniPainel = lazy(() => import('@/components/AIMiniPainel').then(m => ({ default: m.AIMiniPainel })));
const HotkeysDialog = lazy(() => import('@/components/HotkeysDialog').then(m => ({ default: m.HotkeysDialog })));


function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    const register = () => {
      registerServiceWorker().catch(() => {});
    };
    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register, { once: true });
    }
  }, []);
  return null;
}

// Sincroniza o "Acesso Total" real do servidor (Supabase) com o cache local,
// uma vez ao montar, caso o usuario esteja autenticado.
function SincronizacaoAcessoTotal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (authService.isAutenticado()) {
      authService.sincronizarAcessoTotal().catch(() => {});
    }
  }, []);
  return null;
}

function GlobalHotkeys() {
  const router = useRouter();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const onShortcuts = () => setShortcutsOpen(true);
    window.addEventListener('ssb:open-shortcuts', onShortcuts as EventListener);
    return () => {
      window.removeEventListener('ssb:open-shortcuts', onShortcuts as EventListener);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setShortcutsOpen((o) => !o);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ssb:toggle-busca'));
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('ssb:toggle-ai'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <HotkeysDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      </Suspense>
    </>
  );
}

function PageViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    initSentry();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--framer-motion-duration',
      prefersReducedMotion ? '0ms' : ''
    );
  }, [prefersReducedMotion]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ServiceWorkerRegistration />
        <SincronizacaoAcessoTotal />
        <PageViewTracker />
        <TooltipProvider delayDuration={300}>
          <Suspense fallback={null}>
            <AIProvider>
              <EstudosProvider>
              <TopProgressBar />
              <Toaster />
              <PageTransition>{children}</PageTransition>
              <BackToTop />
              <Suspense fallback={null}>
                <BottomNavBar />
                <AIPainelLateral />
                <AIMiniPainel />
              </Suspense>
              <GlobalHotkeys />
              <Suspense fallback={null}>
                <OfflineManager />
                <AccessibilityPanel />
              </Suspense>
              {process.env.NODE_ENV === 'development' && (
                <Suspense fallback={null}>
                  <MobilePerformanceMonitor />
                </Suspense>
              )}
              </EstudosProvider>
            </AIProvider>
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
