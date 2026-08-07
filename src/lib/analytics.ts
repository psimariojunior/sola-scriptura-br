'use client';

// Privacy-first analytics — localStorage + backend sync
// LocalStorage serves as offline fallback; backend enables cross-device tracking
// Routes through Next.js API proxy to avoid CORS/rate-limit issues

const ANALYTICS_KEY = 'ssb_analytics';
const SESSION_KEY = 'ssb_analytics_session';
const SYNC_QUEUE_KEY = 'ssb_analytics_sync_queue';
const MAX_RETRIES = 3;

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
  } catch (e) {
    console.error('[analytics:load-events]', e);
    return [];
  }
}

function saveEvents(events: AnalyticsEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = events.slice(-5000);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('[analytics:save-events]', e);
  }
}

// Send event to backend via Next.js API proxy (fire-and-forget, with retry queue)
async function syncToBackend(event: AnalyticsEvent): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const res = await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: event.type,
        sessionId: event.sessionId,
        data: { ...event.data, timestamp: event.timestamp },
      }),
    });

    if (!res.ok) {
      // Don't retry 401/403 (permanent failure) or 4xx client errors
      if (res.status >= 400 && res.status < 500) return;
      // Queue for retry on 5xx or network errors
      queueForRetry(event);
    }
  } catch {
    // Offline or network error — queue for retry
    queueForRetry(event);
  }
}

interface QueuedEvent extends AnalyticsEvent {
  retries?: number;
}

function queueForRetry(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    const queue: QueuedEvent[] = raw ? JSON.parse(raw) : [];
    queue.push({ ...event, retries: 0 });
    // Keep max 100 queued events (reduced from 200)
    if (queue.length > 100) queue.splice(0, queue.length - 100);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Silently fail
  }
}

// Process retry queue (called on page load)
async function processRetryQueue(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    if (!raw) return;
    const queue: QueuedEvent[] = JSON.parse(raw);
    if (queue.length === 0) return;

    // Filter out events that have exceeded max retries
    const validEvents = queue.filter(e => (e.retries || 0) < MAX_RETRIES);
    if (validEvents.length === 0) {
      localStorage.removeItem(SYNC_QUEUE_KEY);
      return;
    }

    const res = await fetch('/api/analytics/events/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: validEvents.map((e) => ({ type: e.type, sessionId: e.sessionId, data: e.data })) }),
    });

    if (res.ok) {
      localStorage.removeItem(SYNC_QUEUE_KEY);
    } else {
      // Increment retry count and keep queue for next load
      const updatedQueue = validEvents.map(e => ({ ...e, retries: (e.retries || 0) + 1 }));
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(updatedQueue));
    }
  } catch {
    // Will retry on next page load
  }
}

// Process queue on load (delayed to not block rendering)
if (typeof window !== 'undefined') {
  setTimeout(processRetryQueue, 2000);
}

export function trackEvent(type: AnalyticsEventType, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  const event: AnalyticsEvent = {
    type,
    timestamp: Date.now(),
    data,
    sessionId: getSessionId(),
  };

  // Save locally
  const events = getStoredEvents();
  events.push(event);
  saveEvents(events);

  // Sync to backend (non-blocking)
  syncToBackend(event);
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
  localStorage.removeItem(SYNC_QUEUE_KEY);
}

export function exportAnalytics(): string {
  return JSON.stringify(getAnalyticsSummary(), null, 2);
}
