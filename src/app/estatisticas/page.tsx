'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getStats, getStreakData } from '@/lib/estatisticas';
import { Flame, BookOpen, Heart, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  streak: number;
  chaptersThisWeek: number;
  totalVerses: number;
  totalChapters: number;
  favoriteBook: string;
  weeklyData: Record<string, number>;
  booksRead: Record<string, number>;
  dailyLog: Record<string, number>;
}

export default function EstatisticasPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [streakData, setStreakData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    setStats(getStats());
    setStreakData(getStreakData());
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Header />
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="skeleton skeleton-title w-48 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const diasAbreviados = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const maxWeekly = Math.max(1, ...Object.values(stats.weeklyData));

  const maxBook = Math.max(1, ...Object.values(stats.booksRead));
  const livrosOrdenados = Object.entries(stats.booksRead).sort((a, b) => b[1] - a[1]);

  const today = new Date();
  const last30Days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const found = streakData.find(s => s.date === dateStr);
    last30Days.push({ date: dateStr, count: found ? found.count : 0 });
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
                Estatísticas
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)]">
                Seu Progresso de Leitura
              </h1>
              <div className="ornament w-16 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Flame, label: 'Sequência Atual', value: `${stats.streak} dias`, color: 'text-orange-500' },
                { icon: BookOpen, label: 'Capítulos esta semana', value: `${stats.chaptersThisWeek}`, color: 'text-blue-500' },
                { icon: Heart, label: 'Total de Capítulos', value: `${stats.totalChapters}`, color: 'text-red-400' },
                { icon: TrendingUp, label: 'Livro Favorito', value: stats.favoriteBook, color: 'text-purple-500' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="sola-card p-5 text-center"
                >
                  <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                  <p className="font-display text-2xl font-light text-[var(--fg)] mb-1">{item.value}</p>
                  <p className="text-[11px] text-[var(--muted-fg)] uppercase tracking-wider">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sola-card p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-[var(--muted-fg)]" />
                  <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Atividade Semanal</h2>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {diasSemana.map((dia, i) => {
                    const count = stats.weeklyData[diasAbreviados[i]] || 0;
                    const height = (count / maxWeekly) * 100;
                    return (
                      <div key={dia} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-[var(--muted-fg)]">{count}</span>
                        <div className="w-full bg-[var(--bg)] rounded-t-md overflow-hidden" style={{ height: '100px' }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(4, height)}%` }}
                            transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
                            className="w-full bg-gradient-to-t from-[var(--primary)]/60 to-[var(--primary)]/30 rounded-t-md"
                          />
                        </div>
                        <span className="text-[10px] text-[var(--muted-fg)] uppercase">{dia}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sola-card p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-[var(--muted-fg)]" />
                  <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Livros Lidos</h2>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {livrosOrdenados.slice(0, 10).map(([livro, count]) => (
                    <div key={livro} className="flex items-center gap-2">
                      <span className="text-xs text-[var(--fg)] w-20 truncate">{livro}</span>
                      <div className="flex-1 bg-[var(--bg)] rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / maxBook) * 100}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-[var(--primary)]/60 to-[var(--primary)]/30 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] text-[var(--muted-fg)] min-w-[24px] text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="sola-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-orange-500" />
                <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Calendário de Leitura (30 dias)</h2>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {last30Days.map((day) => {
                  const d = new Date(day.date);
                  const dayNum = d.getDate();
                  const intensity = day.count > 0
                    ? day.count >= 5 ? 'bg-[var(--primary)]'
                    : day.count >= 3 ? 'bg-[var(--primary)]/60'
                    : 'bg-[var(--primary)]/30'
                    : 'bg-[var(--bg)]';
                  return (
                    <div
                      key={day.date}
                      className={`aspect-square rounded-md ${intensity} flex items-center justify-center group relative cursor-default`}
                      title={`${day.date}: ${day.count} capítulo(s)`}
                    >
                      <span className="text-[9px] text-[var(--muted-fg)]/60">{dayNum}</span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[var(--fg)] text-[var(--bg)] text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {new Date(day.date).toLocaleDateString('pt-BR')}: {day.count} cap.
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
