'use client';

import { useState } from 'react';
import { X, BookOpen, User, ChevronDown, ChevronUp, GraduationCap, Quote, Eye, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { obterEstudos, type EstudoVersiculo, type EstudoTeologo } from '@/data/estudosTeologicos';

interface Props {
  livro: string;
  capitulo: number;
  versiculo: number;
  nomeLivro: string;
  onClose: () => void;
}

const tradicaoCores: Record<string, string> = {
  'Patrística': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Escolástica': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Reforma': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Teologia Dialética': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Evangélica': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Teologia da Libertação': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Neocalvinista': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'Filosofia judaica': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Batista': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'Luterana': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Metodista': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Puritana': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Católica': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Anglicana': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'Estudo judaico': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Missionologia': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Inter-religioso': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  'Filosofia cristã': 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
};

function VisaoIcon({ visao }: { visao: string }) {
  if (visao.includes('graça') || visao.includes('Graça')) return <Eye className="w-3 h-3" />;
  if (visao.includes('Cruz') || visao.includes('cruz')) return <Lightbulb className="w-3 h-3" />;
  return <GraduationCap className="w-3 h-3" />;
}

export default function PainelEstudos({ livro, capitulo, versiculo, nomeLivro, onClose }: Props) {
  const [expandido, setExpandido] = useState<number | null>(0);
  const estudos = obterEstudos(livro, capitulo, versiculo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Estudos Teológicos</h3>
              <p className="text-xs text-[var(--muted-fg)]">
                {nomeLivro} {capitulo}:{versiculo} — {estudos.length > 0 ? estudos[0].tema : 'Estudo'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--bg)] rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {estudos.length === 0 ? (
        <div className="p-8 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-[var(--muted-fg)]/60" strokeWidth={1} />
          <p className="text-sm text-[var(--muted-fg)]">Nenhum estudo disponível para este versículo.</p>
          <p className="text-xs text-[var(--muted-fg)]/60 mt-1">Estudos estão disponíveis para versículos-chave selecionados.</p>
        </div>
      ) : (
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Contexto */}
          {estudos[0] && (
            <div className="px-6 py-4 border-b border-[var(--border)]/50 bg-[var(--bg)]/50">
              <p className="text-xs text-[var(--muted-fg)] leading-relaxed font-serif-body">
                <span className="font-semibold text-[var(--fg)]">Contexto: </span>
                {estudos[0].contexto}
              </p>
            </div>
          )}

          {/* Teólogos */}
          <div className="p-4 space-y-2">
            {estudos.map((estudo) =>
              estudo.interpretacoes.map((interp, i) => {
                const key = `${estudo.livro}:${estudo.capitulo}:${estudo.versiculo}:${i}`;
                const isOpen = expandido === i;
                const tradicaoCor = tradicaoCores[interp.tradicao] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300';

                return (
                  <motion.div
                    key={key}
                    layout
                    className="border border-[var(--border)]/50 rounded-xl overflow-hidden hover:border-[var(--primary)]/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandido(isOpen ? null : i)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-[var(--bg)]/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[var(--primary)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold truncate">{interp.teologo}</span>
                          <span className="text-[10px] text-[var(--muted-fg)] shrink-0">{interp.periodo}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tradicaoCor}`}>
                            {interp.tradicao}
                          </span>
                          <span className="text-[10px] text-[var(--muted-fg)] flex items-center gap-1">
                            <VisaoIcon visao={interp.visao} />
                            {interp.visao}
                          </span>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[var(--muted-fg)] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[var(--muted-fg)] shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-[var(--border)]/30">
                            <p className="text-sm text-[var(--fg)]/80 leading-relaxed mt-3 font-serif-body">
                              {interp.resumo}
                            </p>
                            {interp.citacao && (
                              <div className="mt-3 p-3 bg-[var(--bg)]/80 rounded-lg border-l-3 border-[var(--primary)]/30">
                                <div className="flex items-start gap-2">
                                  <Quote className="w-3 h-3 text-[var(--primary)] mt-1 shrink-0" />
                                  <p className="text-xs text-[var(--fg)]/70 italic leading-relaxed font-serif-body">
                                    {interp.citacao}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
