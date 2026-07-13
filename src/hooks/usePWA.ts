'use client';

import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  isOffline: boolean;
  updateAvailable: boolean;
  install: () => Promise<boolean>;
  update: () => void;
  canInstallBanner: boolean;
  dismissBanner: () => void;
}

const BANNER_DISMISS_KEY = 'ssb_install_banner_dismissed';
const VISIT_COUNT_KEY = 'ssb_visit_count';

function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementVisitCount(): number {
  const count = getVisitCount() + 1;
  try {
    localStorage.setItem(VISIT_COUNT_KEY, String(count));
  } catch {}
  return count;
}

function isBannerDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const dismissed = localStorage.getItem(BANNER_DISMISS_KEY);
    if (!dismissed) return false;
    const dismissedAt = parseInt(dismissed, 10);
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt < thirtyDays;
  } catch {
    return false;
  }
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

export function usePWA(): UsePWAReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setIsInstalled(isStandalone());
    const count = incrementVisitCount();
    setVisitCount(count);
    setBannerDismissed(isBannerDismissed());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
    };
    const handleDisplayModeChange = () => {
      setIsInstalled(isStandalone());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleDisplayModeChange);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return outcome === 'accepted';
    } catch {
      return false;
    }
  }, [deferredPrompt]);

  const update = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg?.waiting) {
          reg.waiting.postMessage('skipWaiting');
          window.location.reload();
        }
      });
    }
  }, []);

  const dismissBanner = useCallback(() => {
    try {
      localStorage.setItem(BANNER_DISMISS_KEY, String(Date.now()));
    } catch {}
    setBannerDismissed(true);
  }, []);

  const canInstallBanner = !isInstalled && !bannerDismissed && visitCount >= 3 && !!deferredPrompt;

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isOnline,
    isOffline: !isOnline,
    updateAvailable,
    install,
    update,
    canInstallBanner,
    dismissBanner,
  };
}
