'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackPageView,
  trackFeatureUsage,
  trackSearch,
  getStats,
  getSearchHistory,
  clearAnalytics,
} from '@/lib/analytics';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  const trackBibleTranslation = useCallback((translation: string) => {
    trackFeatureUsage('bible', 'select_translation', { translation });
  }, []);

  const trackBibleRead = useCallback((book: string, chapter: number, translation: string) => {
    trackFeatureUsage('bible', 'read_chapter', { book, chapter: String(chapter), translation });
  }, []);

  const trackToolUse = useCallback((tool: string, action = 'use') => {
    trackFeatureUsage('tool', action, { tool });
  }, []);

  const trackSearchQuery = useCallback((query: string, resultCount?: number) => {
    trackSearch(query, resultCount);
  }, []);

  const trackFeature = useCallback((feature: string, action: string) => {
    trackFeatureUsage(feature, action);
  }, []);

  return {
    trackBibleTranslation,
    trackBibleRead,
    trackToolUse,
    trackSearchQuery,
    trackFeature,
    getStats,
    getSearchHistory,
    clearAnalytics,
  };
}
