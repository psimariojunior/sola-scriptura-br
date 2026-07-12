import { useReadingPlan } from '@/lib/useReadingPlan';
import { planos } from '@/data/planosLeitura';
import { BookOpen, Check, ChevronLeft, ChevronRight, RotateCcw, BarChart3, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ReadingPlanBanner() {
  const { state, currentDayData, totalDays, progress, selectPlan, markDay, nextDay, prevDay, reset } = useReadingPlan();

  if (!state.planId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[var(--border)]/50 rounded-xl p-4 mb-6 bg-gradient-to-r from-[var(--primary)]/5 to-transparent"
      >
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)]">Plano de Leitura</span>
        </div>
        <p className="text-xs text-[var(--muted-fg)] mb-3">Escolha um plano para começar:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(planos).map(([id, plan]) => (
            <button
              key={id}
              onClick={() => selectPlan(id)}
              className="text-[11px] px-3 py-2 rounded-lg border border-[var(--border)]/50 hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all text-left"
            >
              <span className="font-semibold block text-xs">{plan.nome}</span>
              <span className="text-[10px] text-[var(--muted-fg)]">{plan.desc}</span>
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  const info = state.planId ? planos[state.planId] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[var(--border)]/50 rounded-xl overflow-hidden mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[var(--primary)]/5 to-transparent border-b border-[var(--border)]/30">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-xs font-semibold">{info?.nome || 'Plano'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--muted-fg)]">{state.completedDays.length}/{totalDays}</span>
          <div className="w-16 h-1.5 bg-[var(--border)]/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--primary)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <button onClick={reset} className="p-1 text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors" title="Resetar">
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Day content */}
      {currentDayData && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">
                Dia {state.currentDay}/{totalDays}
              </span>
              <span className="text-xs text-[var(--muted-fg)]">{currentDayData.titulo}</span>
            </div>
            <motion.button
              onClick={() => markDay(state.currentDay, !state.completedDays.includes(state.currentDay))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 rounded-md transition-colors ${
                state.completedDays.includes(state.currentDay)
                  ? 'bg-green-500/10 text-green-500'
                  : 'text-[var(--muted-fg)] hover:text-green-400'
              }`}
            >
              <Check className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentDayData.passagens.map((p, i) => (
              <Link
                key={i}
                href={`/biblia?livro=${p.livro}&capitulo=${p.capitulo}`}
                className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all border border-[var(--border)]/30"
              >
                {p.livro.toUpperCase()} {p.capitulo}
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]/20">
            <button
              onClick={prevDay}
              disabled={state.currentDay <= 1}
              className="flex items-center gap-1 text-[11px] text-[var(--muted-fg)] hover:text-[var(--fg)] disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-3 h-3" /> Anterior
            </button>

            {state.completedDays.includes(state.currentDay) && (
              <motion.button
                onClick={nextDay}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-[11px] text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors font-semibold"
              >
                Próximo <ChevronRight className="w-3 h-3" />
              </motion.button>
            )}

            {!state.completedDays.includes(state.currentDay) && (
              <span className="text-[10px] text-[var(--muted-fg)] italic">
                Marque como concluído para avançar
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
