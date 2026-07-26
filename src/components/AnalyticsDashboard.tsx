'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Eye, Search, BookOpen, Heart, FileText, Brain, Download, Share2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAnalyticsSummary, clearAnalytics, exportAnalytics, type AnalyticsSummary } from '@/lib/analytics';

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Páginas Visitadas',
  bible_read: 'Leituras Bíblicas',
  verse_favorite: 'Favoritos',
  note_create: 'Notas',
  quiz_complete: 'Quizzes',
  search: 'Pesquisas',
  audio_play: 'Áudio',
  share: 'Compartilhamentos',
  download_offline: 'Downloads',
  feature_use: 'Uso de Features',
};

const EVENT_ICONS: Record<string, typeof BarChart3> = {
  page_view: Eye,
  bible_read: BookOpen,
  verse_favorite: Heart,
  note_create: FileText,
  quiz_complete: Brain,
  search: Search,
  audio_play: Activity,
  share: Share2,
  download_offline: Download,
  feature_use: TrendingUp,
};

export function AnalyticsDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setSummary(getAnalyticsSummary());
  }, []);

  if (!summary || summary.totalEvents === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
        <p className="text-muted-foreground">Nenhum dado de analytics ainda.</p>
        <p className="text-xs text-muted-foreground mt-1">Os dados começam a ser coletados quando você usa o app.</p>
      </div>
    );
  }

  const sortedPages = Object.entries(summary.topPages as Record<string, number>)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  
  const sortedFeatures = Object.entries(summary.topFeatures as Record<string, number>)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const dailyEntries = Object.entries(summary.dailyEvents as Record<string, number>)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14);

  const maxDaily = Math.max(...dailyEntries.map(([, v]) => v as number), 1);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">{summary.totalEvents.toLocaleString('pt-BR')}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total de Eventos</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{summary.totalDaysActive}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Dias Ativos</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
            <BookOpen className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{(summary.eventsByType.bible_read || 0).toLocaleString('pt-BR')}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Versículos Lidos</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
            <Search className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{(summary.eventsByType.search || 0).toLocaleString('pt-BR')}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pesquisas</p>
        </motion.div>
      </div>

      {/* Daily activity chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border/50 bg-card/50 p-6">
        <h3 className="font-display text-lg font-medium mb-4">Atividade Diária (últimos 14 dias)</h3>
        <div className="flex items-end gap-1.5 h-32">
          {dailyEntries.map(([date, count], i) => (
            <div key={date} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col items-center" style={{ height: '100px', justifyContent: 'flex-end' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(count / maxDaily) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/80 to-primary/30 min-h-[2px]"
                />
              </div>
              <span className="text-[8px] text-muted-foreground">
                {new Date(date + 'T12:00:00').getDate()}/{new Date(date + 'T12:00:00').getMonth() + 1}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Event breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border/50 bg-card/50 p-6">
        <h3 className="font-display text-lg font-medium mb-4">Eventos por Tipo</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(summary.eventsByType as Record<string, number>)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .map(([type, count]) => {
              const Icon = EVENT_ICONS[type] || Activity;
              return (
                <div key={type} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{EVENT_LABELS[type] || type}</p>
                    <p className="text-[10px] text-muted-foreground">{(count as number).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>

      {/* Top pages and features */}
      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-5">
            <h3 className="font-medium text-sm mb-3">Páginas Mais Visitadas</h3>
            <div className="space-y-1.5">
              {sortedPages.map(([page, count], i) => (
                <div key={page} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate mr-2">{i + 1}. {page}</span>
                  <span className="font-mono text-primary shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border/50 bg-card/50 p-5">
            <h3 className="font-medium text-sm mb-3">Features Mais Usadas</h3>
            <div className="space-y-1.5">
              {sortedFeatures.map(([feature, count], i) => (
                <div key={feature} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate mr-2">{i + 1}. {feature}</span>
                  <span className="font-mono text-primary shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => { const data = exportAnalytics(); const blob = new Blob([data], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ssb-analytics.json'; a.click(); }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Exportar JSON
          </button>
          <button onClick={() => { if (confirm('Tem certeza? Isso apagará todos os dados de analytics.')) { clearAnalytics(); setSummary(null); } }}
            className="text-xs text-red-500 hover:text-red-400 transition-colors">
            Limpar dados
          </button>
        </div>
      </div>
    </div>
  );
}
