'use client';

import { useState, useMemo } from 'react';
import { estudosTeologicosExpandidos } from '@/data/estudosTeologicosExpandidos';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from 'react-i18next';

interface EstudosTeologicosAbaProps {
  filtroCategoria: string | null;
  busca: string;
  onVersiculoClick: (livro: string, cap: number, ver: number) => void;
}

function parseReferencia(ref: string): { livro: string; capitulo: number; versiculo: number } | null {
  const m = ref.trim().match(/^(\d?\s*[A-Za-zÀ-ú]+)\s+(\d+)(?::(\d+))?/);
  if (!m) return null;
  const livro = m[1].toLowerCase().replace(/\s+/g, '');
  const capitulo = parseInt(m[2], 10);
  const versiculo = m[3] ? parseInt(m[3], 10) : 1;
  return { livro, capitulo, versiculo };
}

const CATEGORIA_CORES: Record<string, { bg: string; text: string; dot: string }> = {
  'Doutrinas Fundamentais': { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  'Cristologia': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'Pneumatologia': { bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-600 dark:text-violet-400', dot: 'bg-violet-500' },
  'Bibliologia': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  'Angelologia': { bg: 'bg-cyan-50 dark:bg-cyan-950/30', text: 'text-cyan-600 dark:text-cyan-400', dot: 'bg-cyan-500' },
  'Antropologia': { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  'Hamartiologia': { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
  'Soteriologia': { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
  'Eclesiologia': { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
  'Escatologia': { bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500' },
  'Teologia Bíblica': { bg: 'bg-teal-50 dark:bg-teal-950/30', text: 'text-teal-600 dark:text-teal-400', dot: 'bg-teal-500' },
  'Apologetica': { bg: 'bg-slate-50 dark:bg-slate-950/30', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-500' },
  'Teologia Sistemática': { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  'História da Igreja': { bg: 'bg-stone-50 dark:bg-stone-950/30', text: 'text-stone-600 dark:text-stone-400', dot: 'bg-stone-500' },
  'Hermenêutica': { bg: 'bg-sky-50 dark:bg-sky-950/30', text: 'text-sky-600 dark:text-sky-400', dot: 'bg-sky-500' },
  'Questões Contemporâneas': { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  'Missiologia': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'Vida Crista': { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
  'Estudos Comparativos': { bg: 'bg-teal-50 dark:bg-teal-950/30', text: 'text-teal-600 dark:text-teal-400', dot: 'bg-teal-500' },
};

function getCoresCategoria(cat: string) {
  return CATEGORIA_CORES[cat] ?? { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' };
}

export default function EstudosTeologicosAba({
  filtroCategoria,
  busca,
  onVersiculoClick,
}: EstudosTeologicosAbaProps) {
  const { t } = useTranslation();
  const [estudoExpandido, setEstudoExpandido] = useState<string | null>(null);

  const categoriasEstudos = useMemo(
    () => [...new Set(estudosTeologicosExpandidos.map((e) => e.categoria))].sort(),
    []
  );

  const estudosFiltrados = useMemo(() => {
    let lista = estudosTeologicosExpandidos;
    if (filtroCategoria) lista = lista.filter((e) => e.categoria === filtroCategoria);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (e) =>
          e.titulo.toLowerCase().includes(q) ||
          e.conteudo.some((c) => c.toLowerCase().includes(q)) ||
          e.versicosChave.some((v) => v.toLowerCase().includes(q)) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroCategoria]);

  return (
    <>
      {categoriasEstudos.map((cat) => {
        const estudosCat = estudosFiltrados.filter((e) => e.categoria === cat);
        if (estudosCat.length === 0) return null;
        const cores = getCoresCategoria(cat);

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${cores.dot}`} />
              {cat}
              <span className="text-sm font-normal text-muted-foreground">({estudosCat.length})</span>
            </h2>
            <div className="space-y-4">
              {estudosCat.map((e, i) => (
                <ScrollReveal key={e.id} delay={i * 0.03}>
                  <motion.div className="sola-card p-6" whileHover={{ y: -2 }} layout>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{e.titulo}</h3>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {e.subcategoria && (
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cores.bg} ${cores.text}`}>
                              {e.subcategoria}
                            </span>
                          )}
                          {e.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <motion.button
                        onClick={() => setEstudoExpandido(estudoExpandido === e.id ? null : e.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <motion.div animate={{ rotate: estudoExpandido === e.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                    </div>

                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2 mb-3">
                      {e.conteudo[0]}
                    </p>

                    <AnimatePresence>
                      {estudoExpandido === e.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-border/50 space-y-4">
                            {e.conteudo.map((paragrafo, pi) => (
                              <p key={pi} className="text-sm text-foreground/80 leading-relaxed font-serif-body">
                                {paragrafo}
                              </p>
                            ))}

                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                {t('theology.keyPassages')}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {e.versicosChave.map((ref) => {
                                  const parsed = parseReferencia(ref);
                                  return (
                                    <div key={ref} className="flex items-center gap-1">
                                      {parsed ? (
                                        <button
                                          onClick={() => onVersiculoClick(parsed.livro, parsed.capitulo, parsed.versiculo)}
                                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                        >
                                          {ref}
                                          <ExternalLink className="w-3 h-3" />
                                        </button>
                                      ) : (
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm">
                                          {ref}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {e.fontes.length > 0 && (
                              <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                  {t('theology.sources')}
                                </h4>
                                <p className="text-xs text-foreground/60">{e.fontes.join(' · ')}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
