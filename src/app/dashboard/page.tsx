'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { motion } from 'framer-motion';
import {
  BookOpen, Flame, Trophy, Clock, Search, Eye, Brain,
  ChevronRight, Award, TrendingUp, BarChart3, History,
  Heart, Globe, Languages, BookMarked, GraduationCap, ScrollText,
  Compass, GitCompareArrows, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';

const PREFIX = 'ssb_dashboard_';
const TOTAL_CHAPTERS = 1189;

const SECTIONS_VISITED = [
  '/biblia', '/pesquisa', '/idiomas', '/exegese', '/teologia',
  '/historia', '/personagens', '/cronologia', '/atlas', '/comparar',
] as const;

interface ReadingProgress {
  chapters: Record<string, number>;
  lastRead: string;
}

interface StudyStats {
  totalTimeMs: number;
  versesStudied: number;
  wordsLearned: { grego: number; hebraico: number };
  searchHistory: Array<{ query: string; timestamp: number }>;
  comparisonsMade: number;
}

interface Activity {
  pagesVisited: Array<{ path: string; title: string; timestamp: number }>;
  versesStudied: Array<{ reference: string; timestamp: number }>;
}

interface Achievement {
  id: string;
  nome: string;
  descricao: string;
  icon: LucideIcon;
  desbloqueada: boolean;
  progresso: number;
  meta: number;
}

interface DashboardState {
  reading: ReadingProgress;
  stats: StudyStats;
  activity: Activity;
  streak: number;
  bestStreak: number;
  favoriteVerses: Array<{ reference: string; text: string; color: string }>;
}

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  return Math.round(Math.abs(da.getTime() - db.getTime()) / 86400000);
}

function useStudyDashboard() {
  const [state, setState] = useState<DashboardState>({
    reading: { chapters: {}, lastRead: '' },
    stats: { totalTimeMs: 0, versesStudied: 0, wordsLearned: { grego: 0, hebraico: 0 }, searchHistory: [], comparisonsMade: 0 },
    activity: { pagesVisited: [], versesStudied: [] },
    streak: 0,
    bestStreak: 0,
    favoriteVerses: [],
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reading = loadJSON<ReadingProgress>('reading_progress', { chapters: {}, lastRead: '' });
    const stats = loadJSON<StudyStats>('study_stats', { totalTimeMs: 0, versesStudied: 0, wordsLearned: { grego: 0, hebraico: 0 }, searchHistory: [], comparisonsMade: 0 });
    const activity = loadJSON<Activity>('activity', { pagesVisited: [], versesStudied: [] });
    const streakData = loadJSON<{ streak: number; bestStreak: number; activeDays: string[] }>('streak', { streak: 0, bestStreak: 0, activeDays: [] });
    const favoriteVerses = loadJSON<DashboardState['favoriteVerses']>('favorites', []);

    const streak = calculateStreak(streakData.activeDays);

    setState({
      reading,
      stats,
      activity,
      streak,
      bestStreak: Math.max(streakData.bestStreak, streak),
      favoriteVerses,
    });
    setLoaded(true);
  }, []);

  const trackPageVisit = useCallback((path: string, title: string) => {
    setState(prev => {
      const pages = [{ path, title, timestamp: Date.now() }, ...prev.activity.pagesVisited].slice(0, 10);
      const updated = { ...prev, activity: { ...prev.activity, pagesVisited: pages } };
      saveJSON('activity', updated.activity);
      return updated;
    });
  }, []);

  const trackVerseStudied = useCallback((reference: string) => {
    setState(prev => {
      const verses = [{ reference, timestamp: Date.now() }, ...prev.activity.versesStudied].slice(0, 10);
      const updated = { ...prev, activity: { ...prev.activity, versesStudied: verses } };
      saveJSON('activity', updated.activity);
      return updated;
    });
  }, []);

  const trackSearch = useCallback((query: string) => {
    setState(prev => {
      const history = [{ query, timestamp: Date.now() }, ...prev.stats.searchHistory].slice(0, 20);
      const updated = { ...prev, stats: { ...prev.stats, searchHistory: history } };
      saveJSON('study_stats', updated.stats);
      return updated;
    });
  }, []);

  const markChapterRead = useCallback((book: string, chapter: number) => {
    setState(prev => {
      const chapters = { ...prev.reading.chapters };
      const existing = chapters[book] || 0;
      chapters[book] = Math.max(existing, chapter);
      const today = todayStr();
      let activeDays = loadJSON<string[]>('streak_active_days', []);
      if (!activeDays.includes(today)) {
        activeDays = [...activeDays, today];
        saveJSON('streak_active_days', activeDays);
      }
      const streak = calculateStreak(activeDays);
      const bestStreak = Math.max(prev.bestStreak, streak);
      const reading = { chapters, lastRead: today };
      const updated = { ...prev, reading, streak, bestStreak };
      saveJSON('reading_progress', reading);
      saveJSON('streak', { streak, bestStreak, activeDays });
      return updated;
    });
  }, []);

  const recordStudyTime = useCallback((ms: number) => {
    setState(prev => {
      const stats = { ...prev.stats, totalTimeMs: prev.stats.totalTimeMs + ms };
      saveJSON('study_stats', stats);
      return { ...prev, stats };
    });
  }, []);

  const recordWordsLearned = useCallback((greekDelta: number, hebrewDelta: number) => {
    setState(prev => {
      const wordsLearned = {
        grego: prev.stats.wordsLearned.grego + greekDelta,
        hebraico: prev.stats.wordsLearned.hebraico + hebrewDelta,
      };
      const stats = { ...prev.stats, wordsLearned };
      saveJSON('study_stats', stats);
      return { ...prev, stats };
    });
  }, []);

  const achievements = useMemo<Achievement[]>(() => {
    const totalChaptersRead = Object.keys(state.reading.chapters).reduce(
      (sum, book) => sum + state.reading.chapters[book], 0
    );
    const sectionsVisited = new Set(state.activity.pagesVisited.map(p => p.path));
    const allSectionsVisited = SECTIONS_VISITED.every(s => sectionsVisited.has(s));

    return [
      {
        id: 'primeiro_estudo',
        nome: 'Primeiro Estudo',
        descricao: 'Visite pela primeira vez',
        icon: BookOpen,
        desbloqueada: state.activity.pagesVisited.length >= 1,
        progresso: Math.min(state.activity.pagesVisited.length, 1),
        meta: 1,
      },
      {
        id: 'leitor_assiduo',
        nome: 'Leitor Assíduo',
        descricao: '7 dias seguidos lendo',
        icon: Flame,
        desbloqueada: state.streak >= 7 || state.bestStreak >= 7,
        progresso: Math.min(state.streak, 7),
        meta: 7,
      },
      {
        id: 'estudioso',
        nome: 'Estudioso',
        descricao: '30 dias seguidos lendo',
        icon: GraduationCap,
        desbloqueada: state.streak >= 30 || state.bestStreak >= 30,
        progresso: Math.min(state.bestStreak, 30),
        meta: 30,
      },
      {
        id: 'polyglot',
        nome: 'Polyglot',
        descricao: '50 palavras gregas aprendidas',
        icon: Languages,
        desbloqueada: state.stats.wordsLearned.grego >= 50,
        progresso: Math.min(state.stats.wordsLearned.grego, 50),
        meta: 50,
      },
      {
        id: 'erudito',
        nome: 'Erudito',
        descricao: '50 palavras hebraicas aprendidas',
        icon: ScrollText,
        desbloqueada: state.stats.wordsLearned.hebraico >= 50,
        progresso: Math.min(state.stats.wordsLearned.hebraico, 50),
        meta: 50,
      },
      {
        id: 'explorador',
        nome: 'Explorador',
        descricao: 'Visite todas as seções',
        icon: Compass,
        desbloqueada: allSectionsVisited,
        progresso: SECTIONS_VISITED.filter(s => sectionsVisited.has(s)).length,
        meta: SECTIONS_VISITED.length,
      },
      {
        id: 'polemicista',
        nome: 'Polemicista',
        descricao: 'Compare 10 traduções',
        icon: GitCompareArrows,
        desbloqueada: state.stats.comparisonsMade >= 10,
        progresso: Math.min(state.stats.comparisonsMade, 10),
        meta: 10,
      },
    ];
  }, [state]);

  const bookProgress = useMemo(() => {
    const allBooks = [...LIVROS_AT, ...LIVROS_NT];
    return allBooks.map(book => {
      const read = state.reading.chapters[book.abreviacao] || 0;
      const total = book.totalCapitulos;
      return { ...book, read, total, percent: total > 0 ? Math.round((read / total) * 100) : 0 };
    });
  }, [state.reading.chapters]);

  const atProgress = useMemo(() => {
    const atBooks = bookProgress.filter(b => b.testamento === 'AT');
    const totalRead = atBooks.reduce((s, b) => s + b.read, 0);
    const totalChapters = atBooks.reduce((s, b) => s + b.total, 0);
    return { read: totalRead, total: totalChapters, percent: totalChapters > 0 ? Math.round((totalRead / totalChapters) * 100) : 0 };
  }, [bookProgress]);

  const ntProgress = useMemo(() => {
    const ntBooks = bookProgress.filter(b => b.testamento === 'NT');
    const totalRead = ntBooks.reduce((s, b) => s + b.read, 0);
    const totalChapters = ntBooks.reduce((s, b) => s + b.total, 0);
    return { read: totalRead, total: totalChapters, percent: totalChapters > 0 ? Math.round((totalRead / totalChapters) * 100) : 0 };
  }, [bookProgress]);

  const totalRead = useMemo(() => atProgress.read + ntProgress.read, [atProgress, ntProgress]);

  const weeklyData = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const now = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const count = state.activity.pagesVisited.filter(p => {
        const pDate = new Date(p.timestamp).toISOString().split('T')[0];
        return pDate === dateStr;
      }).length;
      return { day: days[d.getDay()], count };
    });
  }, [state.activity.pagesVisited]);

  return {
    state,
    loaded,
    achievements,
    bookProgress,
    atProgress,
    ntProgress,
    totalRead,
    weeklyData,
    trackPageVisit,
    trackVerseStudied,
    trackSearch,
    markChapterRead,
    recordStudyTime,
    recordWordsLearned,
  };
}

function calculateStreak(activeDays: string[]): number {
  if (activeDays.length === 0) return 0;
  const daySet = new Set(activeDays);
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const expected = new Date();
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    if (daySet.has(expectedStr)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function formatTime(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  if (totalMin < 60) return `${totalMin}min`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'agora';
  if (min < 60) return `${min}min atrás`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h atrás`;
  const d = Math.floor(h / 24);
  return `${d}d atrás`;
}

function ProgressBar({ percent, color = 'bg-primary' }: { percent: number; color?: string }) {
  return (
    <div className="h-2 rounded-full bg-border/50 overflow-hidden w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn('h-full rounded-full', color)}
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, tile }: {
  icon: typeof BookOpen; label: string; value: string | number; sub?: string; tile: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-2xl border border-border/40 p-4 transition-all hover:scale-[1.02]', tile)}
    >
      <Icon className="w-5 h-5 mb-2" />
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
    </motion.div>
  );
}

export default function DashboardPage() {
  const dashboard = useStudyDashboard();
  const { state, loaded, achievements, bookProgress, atProgress, ntProgress, totalRead, weeklyData } = dashboard;

  const unlockedCount = achievements.filter(a => a.desbloqueada).length;

  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1);

  if (!loaded) {
    return (
      <PageShell maxWidth="6xl" className="pt-24">
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 rounded-2xl bg-muted/30 animate-pulse" />
            ))}
          </div>
      </PageShell>
    );
  }

  return (
    <PageShell maxWidth="6xl">

          {/* ═══ HERO: STREAK + OVERVIEW ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-8 border border-primary/20"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02), transparent)' }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20"
                  >
                    <div className="text-center">
                      <Flame className="w-7 h-7 text-primary mx-auto" />
                      <span className="text-2xl font-bold text-primary">{state.streak}</span>
                    </div>
                  </motion.div>
                  <div>
                    <h1 className="text-h2">
                      {state.streak > 0 ? `${state.streak} dias seguidos!` : 'Comece sua jornada'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {state.streak > 0
                        ? `Melhor sequência: ${state.bestStreak} dias`
                        : 'Leia pelo menos 1 capítulo por dia para manter o streak'}
                    </p>
                  </div>
                </div>
                <div className="md:ml-auto text-right">
                  <p className="text-3xl font-bold text-primary">{totalRead}</p>
                  <p className="text-xs text-muted-foreground">de {TOTAL_CHAPTERS} capítulos lidos</p>
                  <p className="text-sm font-medium text-primary/80 mt-1">{Math.round((totalRead / TOTAL_CHAPTERS) * 100)}%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ STATS GRID ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard
              icon={BookOpen}
              label="Capítulos"
              value={totalRead}
              sub={`de ${TOTAL_CHAPTERS}`}
              tile="tile-brand"
            />
            <StatCard
              icon={Clock}
              label="Tempo"
              value={formatTime(state.stats.totalTimeMs)}
              sub="de estudo"
              tile="tile-success"
            />
            <StatCard
              icon={Brain}
              label="Palavras"
              value={state.stats.wordsLearned.grego + state.stats.wordsLearned.hebraico}
              sub={`${state.stats.wordsLearned.grego} gregas, ${state.stats.wordsLearned.hebraico} hebraicas`}
              tile="tile-cool"
            />
            <StatCard
              icon={Search}
              label="Pesquisas"
              value={state.stats.searchHistory.length}
              sub="realizadas"
              tile="tile-warning"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* ═══ READING PROGRESS BY TESTAMENT ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6"
            >
              <h2 className="font-display text-lg font-medium mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Progresso por Testamento
              </h2>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-medium">Antigo Testamento</span>
                    <span className="text-xs text-muted-foreground">{atProgress.read}/{atProgress.total} ({atProgress.percent}%)</span>
                  </div>
                  <ProgressBar percent={atProgress.percent} color="bg-primary" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-medium">Novo Testamento</span>
                    <span className="text-xs text-muted-foreground">{ntProgress.read}/{ntProgress.total} ({ntProgress.percent}%)</span>
                  </div>
                  <ProgressBar percent={ntProgress.percent} color="bg-primary/70" />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border/30">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Livros — AT</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {bookProgress.filter(b => b.testamento === 'AT').map(book => (
                    <div key={book.abreviacao} className="flex items-center gap-3">
                      <span className="text-xs w-20 truncate text-muted-foreground" title={book.nome}>{book.nome}</span>
                      <div className="flex-1">
                        <ProgressBar percent={book.percent} color="bg-blue-500" />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">{book.read}/{book.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/30">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Livros — NT</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {bookProgress.filter(b => b.testamento === 'NT').map(book => (
                    <div key={book.abreviacao} className="flex items-center gap-3">
                      <span className="text-xs w-20 truncate text-muted-foreground" title={book.nome}>{book.nome}</span>
                      <div className="flex-1">
                        <ProgressBar percent={book.percent} color="bg-emerald-500" />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">{book.read}/{book.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ═══ WEEKLY CHART + SEARCH HISTORY ═══ */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-border/50 bg-card/50 p-6"
              >
                <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Atividade Semanal
                </h2>
                <div className="flex items-end gap-2 h-40">
                  {weeklyData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.count / maxWeekly) * 100}%` }}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                          className="w-full rounded-t-lg min-h-[4px]"
                          style={{
                            background: d.count > 0
                              ? 'linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.4))'
                              : 'var(--border)',
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">{d.day}</span>
                      <span className="text-[9px] text-muted-foreground tabular-nums">{d.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border border-border/50 bg-card/50 p-6"
              >
                <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" /> Últimas Pesquisas
                </h2>
                {state.stats.searchHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Nenhuma pesquisa registrada</p>
                ) : (
                  <div className="space-y-2">
                    {state.stats.searchHistory.slice(0, 8).map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate flex-1">{s.query}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(s.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* ═══ ACHIEVEMENTS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-medium flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" /> Conquistas
              </h2>
              <span className="text-xs text-muted-foreground">{unlockedCount}/{achievements.length} desbloqueadas</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.04 }}
                  className={cn(
                    'rounded-xl border p-3 text-center transition-all',
                    a.desbloqueada
                      ? 'bg-gradient-to-b from-primary/10 to-primary/5 border-primary/30 shadow-sm shadow-primary/10'
                      : 'bg-muted/20 border-border/30 opacity-40 grayscale'
                  )}
                >
                  <a.icon className={cn('w-6 h-6 mx-auto mb-1.5', a.desbloqueada ? 'text-primary' : 'text-muted-foreground')} strokeWidth={1.5} />
                  <p className="text-xs font-semibold leading-tight">{a.nome}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{a.descricao}</p>
                  {!a.desbloqueada && (
                    <div className="mt-2">
                      <ProgressBar percent={Math.round((a.progresso / a.meta) * 100)} color="bg-primary" />
                      <span className="text-[9px] text-muted-foreground mt-1 block">{a.progresso}/{a.meta}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* ═══ RECENT ACTIVITY ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6"
            >
              <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-primary" /> Atividade Recente
              </h2>
              <div className="space-y-3">
                {state.activity.pagesVisited.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Nenhuma atividade registrada</p>
                ) : (
                  state.activity.pagesVisited.slice(0, 10).map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{p.title || p.path}</p>
                        <p className="text-[10px] text-muted-foreground">{p.path}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(p.timestamp)}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* ═══ LAST VERSES STUDIED ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6"
            >
              <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-primary" /> Versículos Estudados
              </h2>
              {state.activity.versesStudied.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhum versículo estudado ainda</p>
              ) : (
                <div className="space-y-2">
                  {state.activity.versesStudied.slice(0, 10).map((v, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <BookOpen className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                      <span className="text-sm font-medium flex-1">{v.reference}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(v.timestamp)}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* ═══ FAVORITES ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-medium flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" /> Favoritos
              </h2>
              <Link href="/favoritos" className="text-xs text-primary hover:underline flex items-center gap-1">
                Ver todos <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {state.favoriteVerses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Nenhum versículo favorito. Salve versículos na Bíblia!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {state.favoriteVerses.slice(0, 6).map((f, i) => (
                  <Link
                    key={i}
                    href="/favoritos"
                    className="p-3 rounded-xl border border-border/30 hover:border-primary/30 transition-all bg-gradient-to-br from-primary/5 to-transparent"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={cn('w-2 h-2 rounded-full', f.color || 'bg-primary')} />
                      <span className="text-xs font-semibold text-primary">{f.reference}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{f.text}</p>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* ═══ QUICK ACCESS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6"
          >
            <h2 className="font-display text-lg font-medium mb-4">Acesso Rápido</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[
                { icon: BookOpen, label: 'Bíblia', href: '/biblia', tile: 'tile-brand' },
                { icon: Search, label: 'Pesquisa', href: '/pesquisa', tile: 'tile-warning' },
                { icon: Languages, label: 'Idiomas', href: '/idiomas', tile: 'tile-cool' },
                { icon: Brain, label: 'Exegese', href: '/exegese', tile: 'tile-success' },
                { icon: Globe, label: 'Atlas', href: '/atlas', tile: 'tile-warm' },
                { icon: Award, label: 'Quiz', href: '/quiz', tile: 'tile-info' },
              ].map(({ icon: Icon, label, href, tile }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all hover:scale-[1.02]"
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', tile)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

    </PageShell>
  );
}
