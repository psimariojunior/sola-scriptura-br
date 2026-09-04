'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, BookOpen, Heart, FileText, Trophy, Target, CheckCircle2, Lock,
  Calendar, Clock, Award, Star, TrendingUp, Sparkles,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { getVersiculoDoDia } from '@/data/versiculosDestaque';
import { listarMarcadores } from '@/lib/marcadores';
import { getFavoritesOffline, getNotesOffline } from '@/lib/offlineStorage';

type Tab = 'resumo' | 'historico' | 'conquistas' | 'desafios';

interface ReadingEntry {
  livro: string;
  capitulo: number;
  timestamp: number;
  traducao: string;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  total: number;
}

interface ActiveChallenge {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
}

const TABS: { key: Tab; label: string; icon: typeof BookOpen }[] = [
  { key: 'resumo', label: 'Resumo', icon: TrendingUp },
  { key: 'historico', label: 'Histórico', icon: Clock },
  { key: 'conquistas', label: 'Conquistas', icon: Trophy },
  { key: 'desafios', label: 'Desafios', icon: Target },
];

const LIVROS_ABREV: Record<string, string> = {
  'Gênesis': 'Gn', 'Êxodo': 'Ex', 'Levítico': 'Lv', 'Números': 'Nm', 'Deuteronômio': 'Dt',
  'Josué': 'Js', 'Juízes': 'Jz', 'Rute': 'Rt', '1 Samuel': '1Sm', '2 Samuel': '2Sm',
  '1 Reis': '1Rs', '2 Reis': '2Rs', '1 Crônicas': '1Cr', '2 Crônicas': '2Cr',
  'Esdras': 'Ed', 'Neemias': 'Ne', 'Ester': 'Et', 'Jó': 'Jó', 'Salmos': 'Sl',
  'Provérbios': 'Pv', 'Eclesiastes': 'Ec', 'Cantares': 'Ct', 'Isaías': 'Is',
  'Jeremias': 'Jr', 'Lamentações': 'Lm', 'Ezequiel': 'Ez', 'Daniel': 'Dn',
  'Oséias': 'Os', 'Joel': 'Jl', 'Amós': 'Am', 'Obadias': 'Ob', 'Jonas': 'Jn',
  'Miquéias': 'Mq', 'Naum': 'Na', 'Habacuque': 'Hc', 'Sofonias': 'Sf',
  'Ageu': 'Ag', 'Zacarias': 'Zc', 'Malaquias': 'Ml',
  'Mateus': 'Mt', 'Marcos': 'Mc', 'Lucas': 'Lc', 'João': 'Jo', 'Atos': 'At',
  'Romanos': 'Rm', '1 Coríntios': '1Co', '2 Coríntios': '2Co',
  'Gálatas': 'Gl', 'Efésios': 'Ef', 'Filipenses': 'Fp', 'Colossenses': 'Cl',
  '1 Tessalonicenses': '1Ts', '2 Tessalonicenses': '2Ts',
  '1 Timóteo': '1Tm', '2 Timóteo': '2Tm', 'Tito': 'Ti', 'Filemom': 'Fm',
  'Hebreus': 'Hb', 'Tiago': 'Tg', '1 Pedro': '1Pe', '2 Pedro': '2Pe',
  '1 João': '1Jo', '2 João': '2Jo', '3 João': '3Jo', 'Judas': 'Jd',
  'Apocalipse': 'Ap',
};

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function formatRelativeTime(ts: number): string {
  const now = Date.now();
  const diff = now - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'ontem';
  if (days < 7) return `há ${days} dias`;
  return `há ${Math.floor(days / 7)} sem`;
}

function abbreviateLivro(livro: string): string {
  return LIVROS_ABREV[livro] || livro.slice(0, 3);
}

function isToday(ts: number): boolean {
  const d = new Date(ts);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function getDayOfWeekKey(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().split('T')[0];
}

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>('resumo');
  const [carregado, setCarregado] = useState(false);
  const [readingHistory, setReadingHistory] = useState<ReadingEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [favoritosCount, setFavoritosCount] = useState(0);
  const [notasCount, setNotasCount] = useState(0);
  const [markersCount, setMarkersCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const raw = localStorage.getItem('ssb_reading_history');
        if (raw) setReadingHistory(JSON.parse(raw));
      } catch { console.debug('[social-page]'); }
      try {
        const raw = localStorage.getItem('ssb_streak');
        if (raw) { const s = JSON.parse(raw); setStreak(s.count || 0); }
      } catch { console.debug('[social-page]'); }
      try {
        const favs = await getFavoritesOffline();
        setFavoritosCount(favs.length);
      } catch {
        try {
          const raw = localStorage.getItem('ssb_favoritos');
          if (raw) setFavoritosCount(JSON.parse(raw).length);
        } catch { console.debug('[social-page]'); }
      }
      try {
        const notes = await getNotesOffline();
        setNotasCount(notes.length);
      } catch {
        try {
          const raw = localStorage.getItem('ssb_notas_rich');
          if (raw) setNotasCount(JSON.parse(raw).length);
        } catch { console.debug('[social-page]'); }
      }
      try {
        const marks = listarMarcadores();
        setMarkersCount(marks.length);
      } catch { console.debug('[social-page]'); }
      setCarregado(true);
    }
    load();
  }, []);

  const stats = useMemo(() => {
    const totalChapters = readingHistory.length;
    const todayChapters = readingHistory.filter(e => isToday(e.timestamp)).length;
    const uniqueChapters = new Set(readingHistory.map(e => `${e.livro}:${e.capitulo}`)).size;
    return { totalChapters, todayChapters, uniqueChapters };
  }, [readingHistory]);

  const weeklyData = useMemo(() => {
    const counts: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const key = getDayOfWeekKey(i);
      const dayCount = readingHistory.filter(e => {
        const d = new Date(e.timestamp).toISOString().split('T')[0];
        return d === key;
      }).length;
      counts.push(dayCount);
    }
    return counts;
  }, [readingHistory]);

  const maxWeekly = Math.max(...weeklyData, 1);

  const recentHistory = useMemo(() => {
    return [...readingHistory]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);
  }, [readingHistory]);

  const achievements = useMemo((): Achievement[] => {
    const chaptersInDay: Record<string, number> = {};
    readingHistory.forEach(e => {
      const key = new Date(e.timestamp).toISOString().split('T')[0];
      chaptersInDay[key] = (chaptersInDay[key] || 0) + 1;
    });
    const maxChaptersInDay = Math.max(...Object.values(chaptersInDay), 0);

    const defs: Omit<Achievement, 'unlocked' | 'progress'>[] = [
      { id: 'primeiro_passo', icon: '📖', title: 'Primeiro Passo', description: 'Leia 1 capítulo', total: 1 },
      { id: 'estudante_dedicado', icon: '🎓', title: 'Estudante Dedicado', description: 'Leia 10 capítulos', total: 10 },
      { id: 'fe_inabalavel', icon: '✝️', title: 'Fé Inabalável', description: 'Leia 50 capítulos', total: 50 },
      { id: 'erudito', icon: '📚', title: 'Erudito', description: 'Leia 100 capítulos', total: 100 },
      { id: 'coracao_marcado', icon: '💛', title: 'Coração Marcado', description: 'Tenha 5+ favoritos', total: 5 },
      { id: 'notas_estudo', icon: '✍️', title: 'Notas de Estudo', description: 'Tenha 5+ notas', total: 5 },
      { id: 'colorindo_palavra', icon: '🎨', title: 'Colorindo a Palavra', description: 'Use 10+ marcadores de cor', total: 10 },
      { id: 'sequencia_fogo', icon: '🔥', title: 'Sequência de Fogo', description: 'Streak de 7+ dias', total: 7 },
      { id: 'maratonista', icon: '🏃', title: 'Maratonista Bíblico', description: 'Leia 20+ capítulos em 1 dia', total: 20 },
      { id: 'mestre_palavra', icon: '🏆', title: 'Mestre da Palavra', description: 'Streak de 30+ dias', total: 30 },
    ];

    const progressMap: Record<string, number> = {
      primeiro_passo: stats.totalChapters,
      estudante_dedicado: stats.totalChapters,
      fe_inabalavel: stats.totalChapters,
      erudito: stats.totalChapters,
      coracao_marcado: favoritosCount,
      notas_estudo: notasCount,
      colorindo_palavra: markersCount,
      sequencia_fogo: streak,
      maratonista: maxChaptersInDay,
      mestre_palavra: streak,
    };

    return defs.map(d => ({
      ...d,
      progress: Math.min(progressMap[d.id] || 0, d.total),
      unlocked: (progressMap[d.id] || 0) >= d.total,
    }));
  }, [stats.totalChapters, favoritosCount, notasCount, markersCount, streak, readingHistory]);

  const challenges = useMemo((): ActiveChallenge[] => {
    const unlocked = new Set(achievements.filter(a => a.unlocked).map(a => a.id));
    const all: ActiveChallenge[] = [
      { id: 'c_leitor', icon: '📖', title: 'Leitor Ávido', description: 'Leia 25 capítulos no total', progress: stats.totalChapters, total: 25 },
      { id: 'c_colecionador', icon: '⭐', title: 'Colecionador', description: 'Tenha 15 favoritos', progress: favoritosCount, total: 15 },
      { id: 'c_estudioso', icon: '📝', title: 'Estudioso', description: 'Escreva 10 notas', progress: notasCount, total: 10 },
      { id: 'c_pintor', icon: '🎨', title: 'Pintor Bíblico', description: 'Use 25 marcadores', progress: markersCount, total: 25 },
      { id: 'c_firme', icon: '🔥', title: 'Firme e Forte', description: 'Mantenha streak de 14 dias', progress: streak, total: 14 },
      { id: 'c_semestre', icon: '🏅', title: 'Semestre Bíblico', description: 'Leia 200 capítulos', progress: stats.totalChapters, total: 200 },
    ];
    return all.filter(c => !unlocked.has(c.id.replace('c_', ''))).slice(0, 4);
  }, [achievements, stats.totalChapters, favoritosCount, notasCount, markersCount, streak]);

  const versiculo = useMemo(() => getVersiculoDoDia(), []);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  if (!carregado) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 rounded-2xl bg-muted/30 animate-pulse" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-light mb-3">
                Meu <span className="text-primary italic">Progresso</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Acompanhe sua jornada de estudo bíblico
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Flame, label: 'Sequência', value: streak, color: 'text-orange-500', bg: 'from-orange-500/15 to-orange-500/5', border: 'border-orange-500/20', suffix: ' dias' },
              { icon: BookOpen, label: 'Hoje', value: stats.todayChapters, color: 'text-blue-500', bg: 'from-blue-500/15 to-blue-500/5', border: 'border-blue-500/20', suffix: ' caps' },
              { icon: Heart, label: 'Favoritos', value: favoritosCount, color: 'text-red-500', bg: 'from-red-500/15 to-red-500/5', border: 'border-red-500/20', suffix: '' },
              { icon: FileText, label: 'Notas', value: notasCount, color: 'text-purple-500', bg: 'from-purple-500/15 to-purple-500/5', border: 'border-purple-500/20', suffix: '' },
            ].map(({ icon: Icon, label, value, color, bg, border, suffix }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn('rounded-2xl border bg-gradient-to-br p-4 transition-all hover:scale-[1.02]', bg, border)}>
                <Icon className={cn('w-5 h-5 mb-2', color)} />
                <p className="text-2xl font-bold tabular-nums">{value.toLocaleString('pt-BR')}{suffix}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  tab === t.key ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted/50')}>
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>

              {tab === 'resumo' && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="glass-card p-5">
                      <h3 className="font-medium text-sm mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> Leituras da Semana
                      </h3>
                      <div className="flex items-end gap-2 h-40">
                        {weeklyData.map((count, i) => {
                          const pct = maxWeekly > 0 ? (count / maxWeekly) * 100 : 0;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                              <div className="w-full rounded-t-lg bg-muted/30 relative overflow-hidden" style={{ height: '100%' }}>
                                <motion.div
                                  className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-gradient-to-t from-primary to-primary/60"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${Math.max(pct, 2)}%` }}
                                  transition={{ duration: 0.5, delay: i * 0.06 }} />
                              </div>
                              <span className="text-[10px] text-muted-foreground">{DIAS_SEMANA[(new Date().getDay() - 6 + i + 7) % 7]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal>
                    <div className="glass-card p-5">
                      <h3 className="font-medium text-sm mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" /> Resumo Rápido
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Capítulos lidos', value: stats.totalChapters },
                          { label: 'Capítulos únicos', value: stats.uniqueChapters },
                          { label: 'Favoritos', value: favoritosCount },
                          { label: 'Notas', value: notasCount },
                          { label: 'Marcadores', value: markersCount },
                          { label: 'Conquistas', value: `${unlockedCount}/${achievements.length}` },
                        ].map((item, i) => (
                          <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                            <span className="text-xs text-muted-foreground">{item.label}</span>
                            <span className="text-sm font-bold tabular-nums">{typeof item.value === 'number' ? item.value.toLocaleString('pt-BR') : item.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal>
                    <div className="glass-card p-5 border-primary/20">
                      <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" /> Versículo do Dia
                      </h3>
                      <p className="text-sm italic text-muted-foreground leading-relaxed mb-2">
                        &ldquo;{versiculo.texto}&rdquo;
                      </p>
                      <p className="text-xs text-primary font-medium">{versiculo.referencia}</p>
                    </div>
                  </ScrollReveal>
                </div>
              )}

              {tab === 'historico' && (
                <div className="space-y-3">
                  {recentHistory.length === 0 ? (
                    <ScrollReveal>
                      <div className="glass-card p-10 text-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground text-sm">Nenhum capítulo lido ainda.</p>
                        <p className="text-muted-foreground/60 text-xs mt-1">Comece a ler na Bíblia para registar seu histórico.</p>
                      </div>
                    </ScrollReveal>
                  ) : (
                    <ScrollReveal>
                      <div className="glass-card p-5">
                        <h3 className="font-medium text-sm mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" /> Últimas Leituras
                        </h3>
                        <div className="space-y-2">
                          {recentHistory.map((entry, i) => (
                            <motion.div key={`${entry.livro}-${entry.capitulo}-${entry.timestamp}`}
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30 hover:bg-muted/40 transition-all">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {abbreviateLivro(entry.livro)} {entry.capitulo}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">{entry.traducao}</p>
                              </div>
                              <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                                {formatRelativeTime(entry.timestamp)}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              )}

              {tab === 'conquistas' && (
                <div className="space-y-3">
                  <ScrollReveal>
                    <div className="glass-card p-5 mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-primary" /> Conquistas Desbloqueadas
                        </h3>
                        <span className="text-xs text-muted-foreground">{unlockedCount}/{achievements.length}</span>
                      </div>
                      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                          initial={{ width: 0 }}
                          animate={{ width: `${achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0}%` }}
                          transition={{ duration: 0.6 }} />
                      </div>
                    </div>
                  </ScrollReveal>

                  {achievements.map((a, i) => (
                    <ScrollReveal key={a.id}>
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={cn('glass-card p-4 flex items-center gap-4 transition-all',
                          a.unlocked ? 'border-primary/20' : 'opacity-60')}>
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0',
                          a.unlocked ? 'bg-primary/10' : 'bg-muted/50')}>
                          {a.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium">{a.title}</h4>
                            {a.unlocked ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={cn('h-full rounded-full', a.unlocked ? 'bg-green-500' : 'bg-primary/50')}
                                initial={{ width: 0 }}
                                animate={{ width: `${a.total > 0 ? (a.progress / a.total) * 100 : 0}%` }}
                                transition={{ duration: 0.5, delay: i * 0.03 }} />
                            </div>
                            <span className="text-[10px] text-muted-foreground tabular-nums">{a.progress}/{a.total}</span>
                          </div>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {tab === 'desafios' && (
                <div className="space-y-4">
                  {challenges.length === 0 ? (
                    <ScrollReveal>
                      <div className="glass-card p-10 text-center">
                        <Award className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground text-sm">Todos os desafios concluídos!</p>
                        <p className="text-muted-foreground/60 text-xs mt-1">Parabéns, você desbloqueou todas as conquistas.</p>
                      </div>
                    </ScrollReveal>
                  ) : (
                    <>
                      <ScrollReveal>
                        <div className="glass-card p-5">
                          <h3 className="font-medium text-sm flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" /> Desafios Ativos
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">Complete estes desafios para desbloquear novas conquistas</p>
                        </div>
                      </ScrollReveal>

                      {challenges.map((c, i) => (
                        <ScrollReveal key={c.id}>
                          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-5 hover:border-primary/30 transition-all">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl flex-shrink-0">
                                {c.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm">{c.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">{c.progress}/{c.total}</span>
                                <span className="text-xs text-primary font-medium">{c.total > 0 ? Math.round((c.progress / c.total) * 100) : 0}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${c.total > 0 ? Math.min((c.progress / c.total) * 100, 100) : 0}%` }}
                                  transition={{ duration: 0.5, delay: i * 0.06 }} />
                              </div>
                            </div>
                          </motion.div>
                        </ScrollReveal>
                      ))}
                    </>
                  )}

                  <ScrollReveal>
                    <div className="glass-card p-5 mt-6">
                      <h3 className="font-medium text-sm mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" /> Todas as Conquistas
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {achievements.map((a, i) => (
                          <motion.div key={a.id}
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className={cn('p-3 rounded-xl border text-center transition-all',
                              a.unlocked ? 'border-primary/20 bg-primary/5' : 'border-border/50 bg-muted/20 opacity-50')}>
                            <div className="text-2xl mb-1">{a.icon}</div>
                            <p className="text-[11px] font-medium leading-tight">{a.title}</p>
                            <div className="mt-1.5 h-1 bg-muted rounded-full overflow-hidden">
                              <div className={cn('h-full rounded-full', a.unlocked ? 'bg-green-500' : 'bg-primary/40')}
                                style={{ width: `${a.total > 0 ? (a.progress / a.total) * 100 : 0}%` }} />
                            </div>
                            <p className="text-[9px] text-muted-foreground mt-1">{a.progress}/{a.total}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}