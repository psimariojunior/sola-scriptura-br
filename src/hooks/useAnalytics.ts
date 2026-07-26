'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackPageView,
  trackFeatureUse,
  trackSearch,
  trackBibleRead as trackBibleReadEvent,
  getAnalyticsSummary,
  clearAnalytics,
} from '@/lib/analytics';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  const trackBibleTranslation = useCallback((translation: string) => {
    trackFeatureUse('bible:select_translation', { translation });
  }, []);

  const trackBibleRead = useCallback((book: string, chapter: number, translation: string) => {
    trackBibleReadEvent(book, chapter, translation);
  }, []);

  const trackToolUse = useCallback((tool: string, action = 'use') => {
    trackFeatureUse(`tool:${tool}`, { action });
  }, []);

  const trackSearchQuery = useCallback((query: string, resultCount?: number) => {
    trackSearch(query, resultCount ?? 0);
  }, []);

  const trackFeature = useCallback((feature: string, action: string) => {
    trackFeatureUse(`${feature}:${action}`);
  }, []);

  return {
    trackBibleTranslation,
    trackBibleRead,
    trackToolUse,
    trackSearchQuery,
    trackFeature,
    getStats: getAnalyticsSummary,
    clearAnalytics,
  };
}
