'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { getStrongPorVersiculo } from '@/data/biblia/strong';
import { getStrongByNumber } from '@/lib/lexiconSearch';

interface VersiculoInput {
  numero: number;
  texto: string;
}

interface InterlinearViewProps {
  versiculos: VersiculoInput[];
  livro: string;
  capitulo: number;
  traducao: string;
}

interface PalavraInterlinear {
  texto: string;
  strong: string | null;
  palavraOriginal: string | null;
  transliteracao: string | null;
  definicao: string | null;
  morfologia: string | null;
  idioma: 'grego' | 'hebraico' | null;
}

function normalizeForMatch(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function similarity(a: string, b: string): number {
  const na = normalizeForMatch(a);
  const nb = normalizeForMatch(b);
  if (na === nb) return 1;
  if (na.startsWith(nb) || nb.startsWith(na)) return 0.85;
  if (na.includes(nb) || nb.includes(na)) return 0.7;
  const maxLen = Math.max(na.length, nb.length);
  if (maxLen === 0) return 0;
  let matches = 0;
  for (let i = 0; i < Math.min(na.length, nb.length); i++) {
    if (na[i] === nb[i]) matches++;
    else break;
  }
  if (matches >= 3) return 0.5 + (matches / maxLen) * 0.3;
  return 0;
}

function mapearVersiculo(livro: string, capitulo: number, verNumero: number, textoPt: string): PalavraInterlinear[] {
  const strongs = getStrongPorVersiculo(livro, capitulo, verNumero);
  if (strongs.length === 0) {
    return textoPt.split(/\s+/).map(w => ({
      texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null,
    }));
  }
  const words = textoPt.split(/\s+/);
  const mapped: PalavraInterlinear[] = [];
  const usedStrong = new Set<number>();
  for (const w of words) {
    const clean = w.replace(/[,;.:!?()[\]{}'"]/g, '');
    if (clean.length === 0) {
      mapped.push({ texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null });
      continue;
    }
    let bestIdx = -1;
    let bestScore = 0;
    for (let i = 0; i < strongs.length; i++) {
      if (usedStrong.has(i)) continue;
      const s = strongs[i];
      const scoreTransl = s.transliteracao ? similarity(clean, s.transliteracao) : 0;
      const scoreOrig = s.palavra ? similarity(clean, s.palavra) : 0;
      const score = Math.max(scoreTransl, scoreOrig);
      if (score > bestScore) { bestScore = score; bestIdx = i; }
    }
    if (bestIdx >= 0 && bestScore >= 0.4) {
      usedStrong.add(bestIdx);
      const s = strongs[bestIdx];
      mapped.push({ texto: w, strong: s.strong, palavraOriginal: s.palavra, transliteracao: s.transliteracao, definicao: s.definicao, morfologia: s.morfologia, idioma: s.idioma });
    } else {
      mapped.push({ texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null });
    }
  }
  return mapped;
}

function DetalhePalavra({ strong, onClose }: { strong: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const entry = getStrongByNumber(strong);
  const isHebrew = strong.toUpperCase().startsWith('H');

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [strong]);

  if (!entry) return null;

  const definicao = 'definicao' in entry ? (entry as { definicao: string }).definicao : '';
  const definicaoResumida = 'definicaoResumida' in entry ? (entry as { definicaoResumida: string }).definicaoResumida : '';
  const categoria = 'categoria' in entry ? (entry as { categoria: string }).categoria : '';
  const morphologia = 'morphologia' in entry ? (entry as { morphologia: string }).morphologia : '';
  const uso = 'uso' in entry ? (entry as { uso: string }).uso : '';
  const frequencia = 'frequencia' in entry ? (entry as { frequencia: number }).frequencia : undefined;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="mx-2 mb-2 p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]/30 shadow-sm">
        {/* Header com Strong badge e fechar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isHebrew ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'}`}>
              {strong}
            </span>
            <span className="text-[10px] text-[var(--content-muted)]">{isHebrew ? 'Hebraico' : 'Grego'}</span>
            {frequencia !== undefined && frequencia > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--surface-raised)] text-[var(--content-muted)]">{frequencia}x</span>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-[var(--surface-raised)] text-[var(--content-muted)]" aria-label="Fechar">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Palavra + transliteração */}
        <div className="text-center mb-2">
          <p className={`text-2xl font-bold ${isHebrew ? 'font-hebrew' : 'font-greek'}`}>{entry.palavra}</p>
          <p className="text-xs text-[var(--content-muted)] italic">{entry.transliteracao}</p>
        </div>

        {/* Categorias */}
        {(categoria || morphologia) && (
          <div className="flex gap-1 flex-wrap justify-center mb-2">
            {categoria && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium">{categoria}</span>}
            {morphologia && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-raised)] text-[var(--content-secondary)]">{morphologia}</span>}
          </div>
        )}

        {/* Definição */}
        {definicaoResumida && (
          <div className="bg-[var(--brand-subtle)]/20 rounded-lg p-2 mb-1.5 border border-[var(--brand-default)]/10">
            <div className="flex items-center gap-1 mb-0.5">
              <BookOpen className="w-2.5 h-2.5 text-[var(--brand-default)]" />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--brand-default)]">Definição</span>
            </div>
            <p className="text-xs font-medium text-[var(--brand-default)] leading-relaxed">{definicaoResumida}</p>
          </div>
        )}

        {definicao && definicao !== definicaoResumida && (
          <p className="text-[11px] text-[var(--content-secondary)] leading-relaxed mb-1.5">{definicao}</p>
        )}

        {/* Uso */}
        {uso && (
          <p className="text-[10px] text-[var(--content-muted)] leading-relaxed mt-1 pt-1 border-t border-[var(--border)]/20">
            <span className="font-medium">Uso:</span> {uso}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function InterlinearView({ versiculos, livro, capitulo }: InterlinearViewProps) {
  const [selectedStrong, setSelectedStrong] = useState<{ verso: number; strong: string } | null>(null);

  const dados = useMemo(() => {
    return versiculos.map(v => ({
      numero: v.numero,
      palavras: mapearVersiculo(livro, capitulo, v.numero, v.texto),
    }));
  }, [versiculos, livro, capitulo]);

  const handleWordClick = (verso: number, strong: string) => {
    if (selectedStrong?.verso === verso && selectedStrong?.strong === strong) {
      setSelectedStrong(null);
    } else {
      setSelectedStrong({ verso, strong });
    }
  };

  return (
    <div className="space-y-0">
      {dados.map((versiculo) => {
        const palavrasComStrong = versiculo.palavras.filter(p => p.strong);

        return (
          <div key={versiculo.numero} className="border-b border-[var(--border)]/15 last:border-b-0">
            {/* Linha interlinear — palavras clicáveis */}
            {palavrasComStrong.length > 0 && (
              <div className="flex flex-wrap items-baseline gap-x-0 gap-y-0 py-1">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-[9px] font-bold shrink-0 mr-1">
                  {versiculo.numero}
                </span>
                {versiculo.palavras.map((p, wi) => (
                  <span key={wi} className="inline-flex flex-col items-center px-px">
                    {p.strong ? (
                      <span
                        className={`text-[10px] leading-none text-center cursor-pointer transition-colors font-medium ${
                          selectedStrong?.verso === versiculo.numero && selectedStrong?.strong === p.strong
                            ? 'text-[var(--brand-default)] font-bold'
                            : 'text-[var(--content-secondary)] active:text-[var(--brand-default)]'
                        }`}
                        onClick={() => p.strong && handleWordClick(versiculo.numero, p.strong)}
                        role="button"
                        tabIndex={0}
                      >
                        {p.palavraOriginal || '\u00A0'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-transparent select-none">·</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Detalhe inline — aparece ali mesmo */}
            <AnimatePresence>
              {selectedStrong?.verso === versiculo.numero && (
                <DetalhePalavra
                  strong={selectedStrong.strong}
                  onClose={() => setSelectedStrong(null)}
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {dados.length === 0 && (
        <div className="text-center py-10 text-[var(--content-muted)] text-sm">
          Nenhum dado interlinear disponível para este capítulo.
        </div>
      )}
    </div>
  );
}
