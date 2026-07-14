'use client';

const STORAGE_KEY = 'ssb_analytics';
const MAX_EVENTS = 1000;

export type AnalyticsEventType =
  | 'page_view'
  | 'search'
  | 'audio_play'
  | 'quiz_complete'
  | 'study_session'
  | 'feature_usage';

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  timestamp: number;
  metadata?: Record<string, string | number>;
}

export interface AnalyticsData {
  events: AnalyticsEvent[];
  sessionId: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem('ssb_sid');
  if (!sid) {
    sid = generateId();
    sessionStorage.setItem('ssb_sid', sid);
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

export function trackPageView(page: string): void {
  push({
    id: generateId(),
    type: 'page_view',
    timestamp: Date.now(),
    metadata: { page },
  });
}

export function trackSearch(query: string, resultCount?: number): void {
  push({
    id: generateId(),
    type: 'search',
    timestamp: Date.now(),
    metadata: {
      query,
      ...(resultCount !== undefined ? { resultCount } : {}),
    },
  });
}

export function trackAudioPlay(reference: string, translation?: string): void {
  push({
    id: generateId(),
    type: 'audio_play',
    timestamp: Date.now(),
    metadata: { reference, ...(translation ? { translation } : {}) },
  });
}

export function trackQuizComplete(
  category: string,
  score: number,
  total: number
): void {
  push({
    id: generateId(),
    type: 'quiz_complete',
    timestamp: Date.now(),
    metadata: { category, score, total },
  });
}

export function trackStudySession(
  book: string,
  durationSeconds: number
): void {
  push({
    id: generateId(),
    type: 'study_session',
    timestamp: Date.now(),
    metadata: { book, durationSeconds },
  });
}

export function trackFeatureUsage(
  feature: string,
  action: string,
  meta?: Record<string, string | number>
): void {
  push({
    id: generateId(),
    type: 'feature_usage',
    timestamp: Date.now(),
    metadata: { feature, action, ...meta },
  });
}

export function getAnalyticsData(): AnalyticsData {
  return load();
}

export function getStats() {
  const data = load();
  const events = data.events;

  const pageViews = events.filter((e) => e.type === 'page_view');
  const searches = events.filter((e) => e.type === 'search');
  const audioPlays = events.filter((e) => e.type === 'audio_play');
  const quizCompletions = events.filter((e) => e.type === 'quiz_complete');
  const studySessions = events.filter((e) => e.type === 'study_session');

  // Most visited pages (top 10)
  const pageCount = new Map<string, number>();
  for (const e of pageViews) {
    const page = String(e.metadata?.page || '/');
    pageCount.set(page, (pageCount.get(page) || 0) + 1);
  }
  const topPages = Array.from(pageCount.entries())
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Recent search queries (last 20)
  const recentSearches = searches.slice(-20).map((e) => ({
    query: String(e.metadata?.query || ''),
    timestamp: e.timestamp,
  }));

  // Audio plays by reference
  const audioCount = new Map<string, number>();
  for (const e of audioPlays) {
    const ref = String(e.metadata?.reference || 'Desconhecido');
    audioCount.set(ref, (audioCount.get(ref) || 0) + 1);
  }
  const topAudio = Array.from(audioCount.entries())
    .map(([reference, count]) => ({ reference, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Quiz stats
  let totalQuizScore = 0;
  let totalQuizQuestions = 0;
  for (const e of quizCompletions) {
    totalQuizScore += Number(e.metadata?.score || 0);
    totalQuizQuestions += Number(e.metadata?.total || 0);
  }

  // Study sessions by book
  const studyBookCount = new Map<string, number>();
  for (const e of studySessions) {
    const book = String(e.metadata?.book || 'Geral');
    studyBookCount.set(book, (studyBookCount.get(book) || 0) + 1);
  }
  const topStudyBooks = Array.from(studyBookCount.entries())
    .map(([book, count]) => ({ book, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalPageViews: pageViews.length,
    totalSearches: searches.length,
    totalAudioPlays: audioPlays.length,
    totalQuizCompletions: quizCompletions.length,
    totalStudySessions: studySessions.length,
    topPages,
    recentSearches,
    topAudio,
    quizStats: {
      totalScore: totalQuizScore,
      totalQuestions: totalQuizQuestions,
      avgScore: totalQuizQuestions > 0 ? Math.round((totalQuizScore / totalQuizQuestions) * 100) : 0,
    },
    topStudyBooks,
    totalEvents: events.length,
  };
}

export function clearAnalytics(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getEventsByType(type: AnalyticsEventType): AnalyticsEvent[] {
  return load().events.filter((e) => e.type === type);
}

export function getSearchHistory(limit = 20): Array<{ query: string; timestamp: number }> {
  return load()
    .events.filter((e) => e.type === 'search')
    .slice(-limit)
    .map((e) => ({ query: String(e.metadata?.query || ''), timestamp: e.timestamp }));
}
