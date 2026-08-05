'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState, lazy } from 'react';
import { Heart } from 'lucide-react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { EstudosProvider } from '@/components/EstudosProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AIProvider } from '@/contexts/AIContext';
import TopProgressBar from '@/components/TopProgressBar';
import BackToTop from '@/components/BackToTop';
import { Toaster } from '@/components/ui/toast-helpers';
import { TooltipProvider } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { registerServiceWorker } from '@/lib/offline';
import { authService } from '@/lib/auth';
import { initSentry } from '@/lib/sentry';
import { startAutoSync, syncAll } from '@/lib/supabaseSync';
import { onOfflineStatusChange } from '@/lib/offlineStorage';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageTransition from '@/components/PageTransition';
import { SkipLinks } from '@/components/SkipLinks';
import { checkAndSendPlanReminder } from '@/lib/pushPlanReminder';
import '@/lib/i18n';

const MobilePerformanceMonitor = lazy(() => import('@/components/MobilePerformanceMonitor'));
const BottomNavBar = lazy(() => import('@/components/BottomNavBar'));
const AccessibilityPanel = lazy(() => import('@/components/AccessibilityPanel').then(m => ({ default: m.AccessibilityPanel })));
const PerformanceMonitor = lazy(() => import('@/components/PerformanceMonitor').then(m => ({ default: m.PerformanceMonitor })));

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

function FloatingDonateButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[25] sm:bottom-6 animate-fade-in-up">
      <Link
        href="/ofertas"
        className="group flex items-center gap-2 px-3 py-2.5 rounded-full bg-amber-500/90 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
        aria-label="Apoie o projeto"
      >
        <Heart className="w-4 h-4 fill-current animate-heart-pulse" />
        <span className="hidden sm:inline text-xs font-semibold">Apoie</span>
      </Link>
    </div>
  );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => initSentry());
    } else {
      initSentry();
    }
  }, []);

  useEffect(() => {
    const initSync = () => {
      startAutoSync();
      checkAndSendPlanReminder();
      onOfflineStatusChange((offline) => {
        if (!offline) {
          syncAll();
        }
      });
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(initSync);
    } else {
      initSync();
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <SkipLinks />
        <ServiceWorkerRegistration />
        <SincronizacaoAcessoTotal />
        <PageViewTracker />
        <TooltipProvider delayDuration={300}>
          <Suspense fallback={null}>
            <AIProvider>
              <EstudosProvider>
              <TopProgressBar />
              <Toaster />
              <PageTransition><ErrorBoundary>{children}</ErrorBoundary></PageTransition>
              <BackToTop />
              <FloatingDonateButton />
              <Suspense fallback={<div className="fixed bottom-0 left-0 right-0 h-16 bg-[var(--surface-raised)] border-t border-[var(--border)] sm:hidden" />}>
                <BottomNavBar />
              </Suspense>
              <Suspense fallback={null}>
                <AIPainelLateral />
                <AIMiniPainel />
              </Suspense>
              <GlobalHotkeys />
              <Suspense fallback={null}>
                <AccessibilityPanel />
              </Suspense>
              {process.env.NODE_ENV === 'development' && (
                <Suspense fallback={null}>
                  <PerformanceMonitor />
                </Suspense>
              )}
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
