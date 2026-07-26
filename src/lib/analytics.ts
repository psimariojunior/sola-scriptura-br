'use client';

// Privacy-first analytics - all data stays local
// Tracks usage patterns to help improve the app

const ANALYTICS_KEY = 'ssb_analytics';
const SESSION_KEY = 'ssb_analytics_session';

export type AnalyticsEventType = 
  | 'page_view'
  | 'bible_read'
  | 'verse_favorite'
  | 'note_create'
  | 'quiz_complete'
  | 'search'
  | 'audio_play'
  | 'share'
  | 'download_offline'
  | 'feature_use';

interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: number;
  data?: Record<string, unknown>;
  sessionId: string;
}

export interface AnalyticsSummary {
  totalEvents: number;
  eventsByType: Record<AnalyticsEventType, number>;
  dailyEvents: Record<string, number>;
  topPages: Record<string, number>;
  topFeatures: Record<string, number>;
  lastActivity: number | null;
  firstActivity: number | null;
  totalDaysActive: number;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `ssb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.events)) return parsed.events;
    return [];
  } catch {
    return [];
  }
}

function saveEvents(events: AnalyticsEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep max 5000 events
    const trimmed = events.slice(-5000);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed));
  } catch {}
}

export function trackEvent(type: AnalyticsEventType, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  
  const event: AnalyticsEvent = {
    type,
    timestamp: Date.now(),
    data,
    sessionId: getSessionId(),
  };
  
  const events = getStoredEvents();
  events.push(event);
  saveEvents(events);
}

export function trackPageView(page: string): void {
  trackEvent('page_view', { page });
}

export function trackBibleRead(livro: string, capitulo: number, traducao: string): void {
  trackEvent('bible_read', { livro, capitulo, traducao });
}

export function trackSearch(query: string, resultsCount: number): void {
  trackEvent('search', { query: query.slice(0, 100), resultsCount });
}

export function trackFeatureUse(feature: string, data?: Record<string, unknown>): void {
  trackEvent('feature_use', { feature, ...data });
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getStoredEvents();
  
  if (events.length === 0) {
    return {
      totalEvents: 0,
      eventsByType: {} as Record<AnalyticsEventType, number>,
      dailyEvents: {},
      topPages: {},
      topFeatures: {},
      lastActivity: null,
      firstActivity: null,
      totalDaysActive: 0,
    };
  }
  
  const eventsByType: Record<string, number> = {};
  const dailyEvents: Record<string, number> = {};
  const topPages: Record<string, number> = {};
  const topFeatures: Record<string, number> = {};
  const activeDays = new Set<string>();
  
  for (const event of events) {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    
    const date = new Date(event.timestamp).toISOString().slice(0, 10);
    dailyEvents[date] = (dailyEvents[date] || 0) + 1;
    activeDays.add(date);
    
    if (event.type === 'page_view' && event.data?.page) {
      const page = event.data.page as string;
      topPages[page] = (topPages[page] || 0) + 1;
    }
    
    if (event.type === 'feature_use' && event.data?.feature) {
      const feature = event.data.feature as string;
      topFeatures[feature] = (topFeatures[feature] || 0) + 1;
    }
  }
  
  return {
    totalEvents: events.length,
    eventsByType: eventsByType as Record<AnalyticsEventType, number>,
    dailyEvents,
    topPages,
    topFeatures,
    lastActivity: events[events.length - 1].timestamp,
    firstActivity: events[0].timestamp,
    totalDaysActive: activeDays.size,
  };
}

export function clearAnalytics(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ANALYTICS_KEY);
}

export function exportAnalytics(): string {
  return JSON.stringify(getAnalyticsSummary(), null, 2);
}
