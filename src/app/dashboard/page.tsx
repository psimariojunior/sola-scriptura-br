'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Heart, FileText, Brain, Flame, Target, Share2, Zap, Trophy, Calendar, TrendingUp, Star, Cross, Map, Clock, Award, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareProgress } from '@/components/ShareProgress';
import { getSummary, getWeeklyStats, getMonthlyHeatmap, type GamificationSummary } from '@/lib/gamificationTracker';
import Link from 'next/link';

const CONQUISTAS = [
  { id: 'primeiro_passo', titulo: 'Primeiro Passo', descricao: 'Leu o primeiro capitulo', icone: '📖', requisito: (s: GamificationSummary) => s.totalCapitulos >= 1 },
  { id: 'estudante_dedicado', titulo: 'Estudante Dedicado', descricao: 'Leu 10 capitulos', icone: '🎓', requisito: (s: GamificationSummary) => s.totalCapitulos >= 10 },
  { id: 'explorador', titulo: 'Explorador', descricao: 'Estudou 50 palavras', icone: '🔍', requisito: (s: GamificationSummary) => s.totalPalavras >= 50 },
  { id: 'sabio', titulo: 'Sábio', descricao: 'Completou 5 quizzes', icone: '🧠', requisito: (s: GamificationSummary) => s.totalQuizzes >= 5 },
  { id: 'persistente', titulo: 'Persistente', descricao: 'Streak de 7 dias', icone: '🔥', requisito: (s: GamificationSummary) => s.melhorStreak >= 7 },
  { id: 'colecionador', titulo: 'Colecionador', descricao: 'Salvou 10 favoritos', icone: '⭐', requisito: (s: GamificationSummary) => s.totalFavoritos >= 10 },
  { id: 'escrevidor', titulo: 'Escrevidor', descricao: 'Criou 5 notas', icone: '✍️', requisito: (s: GamificationSummary) => s.totalAnotacoes >= 5 },
  { id: 'missionario', titulo: 'Missionário', descricao: 'Compartilhou 3 versiculos', icone: '📤', requisito: (s: GamificationSummary) => s.totalCompartilhamentos >= 3 },
  { id: 'exegeta', titulo: 'Exegeta', descricao: 'Fez 3 exegeses', icone: '📜', requisito: (s: GamificationSummary) => s.totalExegese >= 3 },
  { id: 'incansavel', titulo: 'Incansável', descricao: 'Streak de 30 dias', icone: '💎', requisito: (s: GamificationSummary) => s.melhorStreak >= 30 },
  { id: 'erudito', titulo: 'Erudito', descricao: 'Leu 100 capitulos', icone: '📚', requisito: (s: GamificationSummary) => s.totalCapitulos >= 100 },
  { id: 'mestre', titulo: 'Mestre', descricao: 'Completou 20 quizzes', icone: '🏆', requisito: (s: GamificationSummary) => s.totalQuizzes >= 20 },
];

function ProgressRing({ value, max, size = 80, strokeWidth = 6, color = 'var(--primary)', label }: {
  value: number; max: number; size?: number; strokeWidth?: number; color?: string; label: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circumference - pct * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke="var(--border)" strokeWidth={strokeWidth} opacity={0.3} />
          <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{Math.round(pct * 100)}%</span>
        </div>
      </div>
      <span className="text-[11px] text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
}

function HeatmapCalendar({ data }: { data: Record<string, number> }) {
  const semanas: string[][] = [];
  const hoje = new Date();
  const inicio = new Date(hoje);
  inicio.setDate(inicio.getDate() - 29);
  const diaSemanaInicio = inicio.getDay();

  let semanaAtual: string[] = new Array(diaSemanaInicio).fill('');
  for (let i = 0; i < 30; i++) {
    const d = new Date(inicio);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split('T')[0];
    semanaAtual.push(key);
    if (semanaAtual.length === 7) {
      semanas.push(semanaAtual);
      semanaAtual = [];
    }
  }
  if (semanaAtual.length > 0) semanas.push(semanaAtual);

  const maxVal = Math.max(...Object.values(data), 1);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 text-[9px] text-muted-foreground mb-1">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => <span key={i} className="w-5 text-center">{d}</span>)}
      </div>
      {semanas.map((semana, si) => (
        <div key={si} className="flex gap-1">
          {semana.map((dia, di) => {
            if (!dia) return <div key={di} className="w-5 h-5" />;
            const val = data[dia] || 0;
            const intensity = val > 0 ? Math.min(0.2 + (val / maxVal) * 0.8, 1) : 0;
            return (
              <motion.div key={di} initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: si * 0.02 + di * 0.01 }}
                className="w-5 h-5 rounded-sm cursor-default"
                style={{
                  backgroundColor: val > 0 ? `hsl(var(--primary) / ${intensity})` : 'var(--border)',
                  opacity: val > 0 ? 1 : 0.15,
                }}
                title={`${dia}: ${val} ações`} />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [showShare, setShowShare] = useState(false);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [notas, setNotas] = useState<any[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [summary, setSummary] = useState<GamificationSummary | null>(null);

  useEffect(() => {
    try {
      const f = localStorage.getItem('ssb_favoritos');
      if (f) setFavoritos(JSON.parse(f));
      const n = localStorage.getItem('ssb_notas_rich');
      if (n) setNotas(JSON.parse(n));
      setSummary(getSummary());
    } catch {}
    setCarregado(true);
  }, []);

  const stats = useMemo(() => {
    if (!summary) return { streak: 0, chapters: 0, verses: 0, quizzes: 0, estudos: 0, favoritos: favoritos.length, notas: notas.length, diasAtivos: 0, melhorStreak: 0, palavras: 0, exegese: 0, compartilhou: 0 };
    return {
      streak: summary.streakAtual,
      chapters: summary.totalCapitulos,
      verses: summary.totalVersiculos,
      quizzes: summary.totalQuizzes,
      estudos: summary.totalEstudos + summary.totalExegese,
      favoritos: favoritos.length,
      notas: notas.length,
      diasAtivos: summary.diasAtivos.length,
      melhorStreak: summary.melhorStreak,
      palavras: summary.totalPalavras,
      exegese: summary.totalExegese,
      compartilhou: summary.totalCompartilhamentos,
    };
  }, [summary, favoritos.length, notas.length]);

  const weeklyData = useMemo(() => getWeeklyStats(), []);
  const heatmapData = useMemo(() => getMonthlyHeatmap(), []);

  const conquistasDesbloqueadas = useMemo(() => {
    if (!summary) return [];
    return CONQUISTAS.filter(c => c.requisito(summary));
  }, [summary]);

  const totalAcoes = stats.chapters + stats.verses + stats.quizzes + stats.estudos + stats.palavras;

  if (!carregado) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-5xl mx-auto space-y-6">
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
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ═══ HERO SECTION ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-8 border border-primary/20"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02), transparent)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Streak */}
              <div className="flex items-center gap-4">
                <motion.div animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 flex items-center justify-center border border-orange-500/20">
                  <div className="text-center">
                    <Flame className="w-8 h-8 text-orange-500 mx-auto" />
                    <span className="text-2xl font-bold text-orange-500">{stats.streak}</span>
                  </div>
                </motion.div>
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-light">
                    {stats.streak > 0 ? `${stats.streak} dias seguidos!` : 'Comece sua jornada'}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.streak > 0
                      ? `Melhor sequência: ${stats.melhorStreak} dias`
                      : 'Leia pelo menos 1 versículo por dia para manter o streak'}
                  </p>
                </div>
              </div>
              <div className="md:ml-auto flex gap-2">
                <motion.button onClick={() => setShowShare(!showShare)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-all">
                  <Share2 className="w-4 h-4" /> Compartilhar
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ═══ STATS CARDS ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: BookOpen, label: 'Capítulos', value: stats.chapters, color: 'text-blue-500', bg: 'from-blue-500/15 to-blue-500/5', border: 'border-blue-500/20' },
              { icon: Zap, label: 'Versículos', value: stats.verses, color: 'text-amber-500', bg: 'from-amber-500/15 to-amber-500/5', border: 'border-amber-500/20' },
              { icon: Brain, label: 'Quizzes', value: stats.quizzes, color: 'text-purple-500', bg: 'from-purple-500/15 to-purple-500/5', border: 'border-purple-500/20' },
              { icon: Cross, label: 'Exegeses', value: stats.exegese, color: 'text-emerald-500', bg: 'from-emerald-500/15 to-emerald-500/5', border: 'border-emerald-500/20' },
            ].map(({ icon: Icon, label, value, color, bg, border }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn('rounded-2xl border bg-gradient-to-br p-4 transition-all hover:scale-[1.02]', bg, border)}>
                <Icon className={cn('w-5 h-5 mb-2', color)} />
                <p className="text-2xl font-bold tabular-nums">{value.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* ═══ PROGRESS RINGS ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
            <h2 className="font-display text-lg font-medium mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Progresso Geral
            </h2>
            <div className="flex justify-around flex-wrap gap-4">
              <ProgressRing value={stats.chapters} max={1189} size={90} strokeWidth={7} color="hsl(210, 70%, 50%)" label="Capítulos lidos" />
              <ProgressRing value={stats.verses} max={31102} size={90} strokeWidth={7} color="hsl(38, 90%, 50%)" label="Versículos lidos" />
              <ProgressRing value={stats.palavras} max={14200} size={90} strokeWidth={7} color="hsl(280, 60%, 50%)" label="Palavras estudadas" />
              <ProgressRing value={stats.favoritos} max={100} size={90} strokeWidth={7} color="hsl(0, 70%, 55%)" label="Favoritos" />
              <ProgressRing value={conquistasDesbloqueadas.length} max={CONQUISTAS.length} size={90} strokeWidth={7} color="hsl(45, 90%, 50%)" label="Conquistas" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* ═══ WEEKLY CHART ═══ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Atividade Semanal
              </h2>
              <div className="flex items-end gap-1.5 h-36">
                {weeklyData.map((d, i) => {
                  const total = d.versiculos + d.capitulos + d.quizzes;
                  const maxTotal = Math.max(...weeklyData.map(dd => dd.versiculos + dd.capitulos + dd.quizzes), 1);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center" style={{ height: '100px', justifyContent: 'flex-end' }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${(total / maxTotal) * 100}%` }}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                          className="w-full rounded-t-lg min-h-[3px]"
                          style={{ background: total > 0 ? 'linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.5))' : 'var(--border)' }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">{d.dia}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-4 mt-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/80" /> Versículos</span>
              </div>
            </motion.div>

            {/* ═══ MONTHLY HEATMAP ═══ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Mapa de Atividade
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Últimos 30 dias</p>
              <HeatmapCalendar data={heatmapData} />
              <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground">
                <span>Menos</span>
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((op, i) => (
                  <div key={i} className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: op > 0 ? `hsl(var(--primary) / ${op})` : 'var(--border)', opacity: op > 0 ? 1 : 0.15 }} />
                ))}
                <span>Mais</span>
              </div>
            </motion.div>
          </div>

          {/* ═══ CONQUISTAS ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
            <h2 className="font-display text-lg font-medium mb-1 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" /> Conquistas
            </h2>
            <p className="text-xs text-muted-foreground mb-5">{conquistasDesbloqueadas.length} de {CONQUISTAS.length} desbloqueadas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CONQUISTAS.map((c, i) => {
                const desbloqueada = conquistasDesbloqueadas.some(cd => cd.id === c.id);
                return (
                  <motion.div key={c.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.04 }}
                    className={cn(
                      'rounded-xl border p-3 text-center transition-all',
                      desbloqueada
                        ? 'bg-gradient-to-b from-primary/10 to-primary/5 border-primary/30 shadow-sm shadow-primary/10'
                        : 'bg-muted/20 border-border/30 opacity-40 grayscale'
                    )}>
                    <div className="text-3xl mb-2">{c.icone}</div>
                    <p className="text-xs font-semibold leading-tight">{c.titulo}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{c.descricao}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ═══ CONTENT SUMMARY ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Heart, label: 'Favoritos', value: stats.favoritos, color: 'text-red-500', href: '/favoritos', desc: 'versículos salvos' },
              { icon: FileText, label: 'Notas', value: stats.notas, color: 'text-blue-500', href: '/notas', desc: 'anotações pessoais' },
              { icon: Clock, label: 'Dias Ativos', value: stats.diasAtivos, color: 'text-emerald-500', href: '/dashboard', desc: 'dias de estudo' },
            ].map(({ icon: Icon, label, value, color, href, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}>
                <Link href={href}
                  className="block rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-primary/30 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn('w-4 h-4', color)} />
                      <h3 className="font-medium text-sm">{label}</h3>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-3xl font-bold mb-0.5">{value}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ═══ QUICK ACTIONS ═══ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-6">
            <h2 className="font-display text-lg font-medium mb-4">Acesso Rápido</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: BookOpen, label: 'Bíblia', href: '/biblia', color: 'bg-blue-500/10 text-blue-500' },
                { icon: Brain, label: 'Quiz', href: '/quiz', color: 'bg-purple-500/10 text-purple-500' },
                { icon: Cross, label: 'Exegese', href: '/exegese', color: 'bg-emerald-500/10 text-emerald-500' },
                { icon: Map, label: 'Atlas', href: '/atlas', color: 'bg-amber-500/10 text-amber-500' },
              ].map(({ icon: Icon, label, href, color }, i) => (
                <Link key={label} href={href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all hover:scale-[1.02]">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {showShare && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowShare(false)}>
              <div onClick={e => e.stopPropagation()}>
                <ShareProgress
                  stats={{ chaptersRead: stats.chapters, booksCompleted: stats.diasAtivos, streak: stats.streak, memorized: 0 }}
                  onClose={() => setShowShare(false)} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
