'use client';

import { useState, useEffect } from 'react';
import { BookOpen, User, ChevronDown, ChevronUp, GraduationCap, Quote, Eye, Lightbulb, X, ScrollText, Sparkles, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { obterEstudoVersiculo, type EstudoVersiculoUnificado } from '@/lib/estudosLoader';

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

function BlocoVersiculo({ estudo }: { estudo: EstudoVersiculoUnificado }) {
  const detalhe = estudo.detalhe!;
  return (
    <>
      <p className="text-xs text-[var(--primary)] font-semibold mb-2">
        {detalhe.titulo}
      </p>

      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-0.5 flex items-center gap-1">
            <ScrollText className="w-3 h-3" /> Contexto Histórico
          </p>
          <p className="text-xs text-[var(--muted-fg)] leading-relaxed font-serif-body">
            {detalhe.contextoHistorico}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-0.5 flex items-center gap-1">
            <ScrollText className="w-3 h-3" /> Contexto Literário
          </p>
          <p className="text-xs text-[var(--muted-fg)] leading-relaxed font-serif-body">
            {detalhe.contextoLiterario}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-0.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Significado Teológico
          </p>
          <p className="text-xs text-[var(--muted-fg)] leading-relaxed font-serif-body">
            {detalhe.significadoTeologico}
          </p>
        </div>
      </div>

      {detalhe.aplicacoes.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Aplicações</p>
          <ul className="space-y-1">
            {detalhe.aplicacoes.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--fg)] leading-relaxed font-serif-body">
                <span className="text-[var(--primary)] mt-0.5">•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {detalhe.perguntasEstudo.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Perguntas de Estudo</p>
          <ol className="space-y-1 list-decimal list-inside">
            {detalhe.perguntasEstudo.map((p, i) => (
              <li key={i} className="text-xs text-[var(--fg)] leading-relaxed font-serif-body">{p}</li>
            ))}
          </ol>
        </div>
      )}

      {detalhe.versiculosConexoes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {detalhe.versiculosConexoes.map((v, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-medium">
              <Link2 className="w-2.5 h-2.5" /> {v}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default function PainelEstudosInline({ livro, capitulo, versiculo, nomeLivro, onClose }: Props) {
  const [expandido, setExpandido] = useState<number | null>(null);
  const [estudo, setEstudo] = useState<EstudoVersiculoUnificado | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setEstudo(null);
    obterEstudoVersiculo(livro, capitulo, versiculo).then((res) => {
      if (!ativo) return;
      setEstudo(res);
      setCarregando(false);
    });
    return () => { ativo = false; };
  }, [livro, capitulo, versiculo]);

  if (carregando) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden ml-8 my-3"
      >
        <div className="border-l-2 border-[var(--primary)]/30 pl-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
          <span className="text-xs text-[var(--muted-fg)]">Carregando estudo…</span>
        </div>
      </motion.div>
    );
  }

  if (!estudo) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden ml-8 my-3"
      >
        <div className="border-l-2 border-[var(--primary)]/30 pl-4 py-2 flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted-fg)]">
            Estudo não disponível para este versículo ({nomeLivro} {capitulo}:{versiculo}).
          </p>
          <button onClick={onClose} className="p-1 hover:bg-[var(--bg)] rounded transition-colors shrink-0">
            <X className="w-3.5 h-3.5 text-[var(--muted-fg)]" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden ml-8 my-3"
    >
      <div className="border-l-2 border-[var(--primary)]/30 pl-4 py-2">
        {/* Mini header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)]">
              Estudos — {nomeLivro} {capitulo}:{versiculo}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[var(--bg)] rounded transition-colors">
            <X className="w-3.5 h-3.5 text-[var(--muted-fg)]" />
          </button>
        </div>

        {estudo.fonte === 'teologico' ? (
          <>
            {/* Theme */}
            <p className="text-xs text-[var(--primary)] font-semibold mb-2">
              {estudo.tema}
            </p>

            {/* Contexto */}
            {estudo.contexto && (
              <p className="text-xs text-[var(--muted-fg)] leading-relaxed mb-3 font-serif-body">
                {estudo.contexto}
              </p>
            )}

            {/* Teólogos */}
            <div className="space-y-1.5">
              {estudo.interpretacoes!.map((interp, i) => {
                const isOpen = expandido === i;
                const tradicaoCor = tradicaoCores[interp.tradicao] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300';

                return (
                  <motion.div
                    key={i}
                    layout
                    className="border border-[var(--border)]/40 rounded-lg overflow-hidden hover:border-[var(--border)] transition-all"
                  >
                    <button
                      onClick={() => setExpandido(isOpen ? null : i)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[var(--bg)]/50 transition-colors text-left"
                    >
                      <div className="w-6 h-6 rounded bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        <User className="w-3 h-3 text-[var(--primary)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-semibold truncate">{interp.teologo}</span>
                          <span className="text-[9px] text-[var(--muted-fg)] shrink-0">{interp.periodo}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${tradicaoCor}`}>
                            {interp.tradicao}
                          </span>
                          <span className="text-[9px] text-[var(--muted-fg)] flex items-center gap-0.5">
                            <VisaoIcon visao={interp.visao} />
                            {interp.visao}
                          </span>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-3 h-3 text-[var(--muted-fg)] shrink-0" /> : <ChevronDown className="w-3 h-3 text-[var(--muted-fg)] shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 border-t border-[var(--border)]/20">
                            <p className="text-xs text-[var(--fg)] leading-relaxed mt-2 font-serif-body">
                              {interp.resumo}
                            </p>
                            {interp.citacao && (
                              <div className="mt-2 p-2.5 bg-[var(--bg)]/60 rounded-lg border-l-2 border-[var(--primary)]/20">
                                <div className="flex items-start gap-1.5">
                                  <Quote className="w-2.5 h-2.5 text-[var(--primary)] mt-0.5 shrink-0" />
                                  <p className="text-[11px] text-[var(--fg)] italic leading-relaxed font-serif-body">
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
              })}
            </div>
          </>
        ) : (
          <BlocoVersiculo estudo={estudo} />
        )}
      </div>
    </motion.div>
  );
}
