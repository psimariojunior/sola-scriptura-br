'use client';

const STORAGE_KEY = 'ss_analytics';
const MAX_EVENTS = 500;

type EventType = 'page_view' | 'feature_usage' | 'search';

interface AnalyticsEvent {
  id: string;
  type: EventType;
  path: string;
  action: string;
  label?: string;
  meta?: Record<string, string>;
  timestamp: number;
}

interface AnalyticsData {
  events: AnalyticsEvent[];
  sessionId: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem('ss_sid');
  if (!sid) {
    sid = generateId();
    sessionStorage.setItem('ss_sid', sid);
  }
  return sid;
}

function load(): AnalyticsData {
  if (typeof window === 'undefined') return { events: [], sessionId: '' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data — reset
  }
  return { events: [], sessionId: getSessionId() };
}

function save(data: AnalyticsData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full — trim oldest and retry
    data.events = data.events.slice(-Math.floor(MAX_EVENTS / 2));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // give up silently
    }
  }
}

function push(event: AnalyticsEvent): void {
  const data = load();
  data.sessionId = data.sessionId || getSessionId();
  data.events.push(event);
  if (data.events.length > MAX_EVENTS) {
    data.events = data.events.slice(-MAX_EVENTS);
  }
  save(data);
}

// ── Public API ──────────────────────────────────────────────

export function trackPageView(path: string): void {
  push({
    id: generateId(),
    type: 'page_view',
    path,
    action: 'view',
    timestamp: Date.now(),
  });
}

export function trackFeatureUsage(
  feature: string,
  action: string,
  meta?: Record<string, string>
): void {
  push({
    id: generateId(),
    type: 'feature_usage',
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    action,
    label: feature,
    meta,
    timestamp: Date.now(),
  });
}

export function trackSearch(query: string, resultCount?: number): void {
  push({
    id: generateId(),
    type: 'search',
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    action: 'search',
    label: query,
    meta: resultCount !== undefined ? { resultCount: String(resultCount) } : undefined,
    timestamp: Date.now(),
  });
}

export function getAnalytics(): AnalyticsData {
  return load();
}

export function clearAnalytics(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getEventsByType(type: EventType): AnalyticsEvent[] {
  return load().events.filter((e) => e.type === type);
}

export function getMostUsedFeatures(limit = 10): Array<{ feature: string; count: number }> {
  const counts = new Map<string, number>();
  for (const e of load().events) {
    if (e.type === 'feature_usage' && e.label) {
      counts.set(e.label, (counts.get(e.label) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([feature, count]) => ({ feature, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getPageViewCount(): number {
  return load().events.filter((e) => e.type === 'page_view').length;
}

export function getSearchHistory(limit = 20): Array<{ query: string; timestamp: number }> {
  return load()
    .events.filter((e) => e.type === 'search')
    .slice(-limit)
    .map((e) => ({ query: e.label || '', timestamp: e.timestamp }));
}
