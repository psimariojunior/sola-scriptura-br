'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, BookOpen, Heart, FileText, Brain, Flame, Target, Share2, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { ShareProgress } from '@/components/ShareProgress';
import { getSummary, getWeeklyStats, type GamificationSummary } from '@/lib/gamificationTracker';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation();
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
    if (!summary) return { streak: 0, chapters: 0, verses: 0, quizzes: 0, estudos: 0, favoritos: favoritos.length, notas: notas.length, diasAtivos: 0 };
    return {
      streak: summary.streakAtual,
      chapters: summary.totalCapitulos,
      verses: summary.totalVersiculos,
      quizzes: summary.totalQuizzes,
      estudos: summary.totalEstudos + summary.totalExegese,
      favoritos: favoritos.length,
      notas: notas.length,
      diasAtivos: summary.diasAtivos.length,
    };
  }, [summary, favoritos.length, notas.length]);

  const weeklyData = useMemo(() => {
    return getWeeklyStats();
  }, []);

  const maxVersiculos = Math.max(...weeklyData.map(d => d.versiculos), 1);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Meu <span className="text-primary italic">Dashboard</span></h1>
                  <p className="text-sm text-muted-foreground">{t('dashboard.subtitle')}</p>
                </div>
              </div>
              <motion.button onClick={() => setShowShare(!showShare)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-all">
                <Share2 className="w-4 h-4" /> {t('dashboard.share')}
              </motion.button>
            </div>
          </ScrollReveal>

          <AnimatePresence>
            {showShare && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden">
                <ShareProgress stats={{ chaptersRead: stats.chapters, booksCompleted: stats.diasAtivos, streak: stats.streak, memorized: 0 }}
                  onClose={() => setShowShare(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Flame, label: t('dashboard.streak'), value: `${stats.streak} ${t('dashboard.days')}`, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { icon: BookOpen, label: t('dashboard.chapters'), value: stats.chapters.toString(), color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: Zap, label: t('dashboard.verses'), value: stats.verses.toLocaleString('pt-BR'), color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: Brain, label: t('dashboard.quizzes'), value: stats.quizzes.toString(), color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map(({ icon: Icon, label, value, color, bg }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border/50 bg-card/50 p-4">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', bg)}>
                  <Icon className={cn('w-4 h-4', color)} />
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Weekly Chart */}
          <ScrollReveal>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
              <h2 className="font-display text-lg font-medium mb-4">{t('dashboard.weeklyProgress')}</h2>
              <div className="flex items-end gap-2 h-40">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-1" style={{ height: '120px', justifyContent: 'flex-end' }}>
                      <motion.div initial={{ height: 0 }} animate={{ height: `${(d.versiculos / maxVersiculos) * 100}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary/80 to-primary/40 min-h-[4px]" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d.dia}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Content Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-red-500" />
                  <h3 className="font-medium text-sm">{t('dashboard.favorites')}</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{stats.favoritos}</p>
                <p className="text-xs text-muted-foreground">{t('dashboard.verses').toLowerCase()} salvos</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <h3 className="font-medium text-sm">{t('dashboard.notes')}</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{stats.notas}</p>
                <p className="text-xs text-muted-foreground">anotações pessoais</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-medium text-sm">{t('dashboard.activeDays')}</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{stats.diasAtivos}</p>
                <p className="text-xs text-muted-foreground">{t('dashboard.days')} de estudo</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
