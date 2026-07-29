'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { getStrongPorVersiculo, type PalavraStrong } from '@/data/biblia/strong';
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

function alignSequences(ptWords: string[], strongs: PalavraStrong[]): (number | null)[] {
  const n = ptWords.length;
  const m = strongs.length;
  if (m === 0) return ptWords.map(() => null);
  if (n === 0) return [];

  const GAP_PENALTY = 1;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const trace: number[][][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => [0, 0, 0])
  );

  for (let i = 0; i <= n; i++) { dp[i][0] = i * GAP_PENALTY; trace[i][0] = [0, 1, 0]; }
  for (let j = 0; j <= m; j++) { dp[0][j] = j * GAP_PENALTY; trace[0][j] = [0, 0, 1]; }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = dp[i - 1][j - 1];
      const gapPt = dp[i - 1][j] + GAP_PENALTY;
      const gapStrong = dp[i][j - 1] + GAP_PENALTY;

      if (match <= gapPt && match <= gapStrong) {
        dp[i][j] = match;
        trace[i][j] = [1, 0, 0];
      } else if (gapPt <= gapStrong) {
        dp[i][j] = gapPt;
        trace[i][j] = [0, 1, 0];
      } else {
        dp[i][j] = gapStrong;
        trace[i][j] = [0, 0, 1];
      }
    }
  }

  const alignment: (number | null)[] = new Array(n).fill(null);
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && trace[i][j][0]) {
      alignment[i - 1] = j - 1;
      i--; j--;
    } else if (i > 0 && trace[i][j][1]) {
      i--;
    } else if (j > 0 && trace[i][j][2]) {
      j--;
    } else {
      break;
    }
  }

  return alignment;
}

function mapearVersiculo(livro: string, capitulo: number, verNumero: number, textoPt: string): PalavraInterlinear[] {
  const strongs = getStrongPorVersiculo(livro, capitulo, verNumero);
  if (strongs.length === 0) {
    return textoPt.split(/\s+/).map(w => ({
      texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null,
    }));
  }
  const words = textoPt.split(/\s+/);
  const alignment = alignSequences(words, strongs);
  return words.map((w, i) => {
    const idx = alignment[i];
    if (idx !== null && idx !== undefined && idx >= 0 && idx < strongs.length) {
      const s = strongs[idx];
      return { texto: w, strong: s.strong, palavraOriginal: s.palavra, transliteracao: s.transliteracao, definicao: s.definicao, morfologia: s.morfologia, idioma: s.idioma };
    }
    return { texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null };
  });
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

        <div className="text-center mb-2">
          <p className={`text-2xl font-bold ${isHebrew ? 'font-hebrew' : 'font-greek'}`}>{entry.palavra}</p>
          <p className="text-xs text-[var(--content-muted)] italic">{entry.transliteracao}</p>
        </div>

        {(categoria || morphologia) && (
          <div className="flex gap-1 flex-wrap justify-center mb-2">
            {categoria && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium">{categoria}</span>}
            {morphologia && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-raised)] text-[var(--content-secondary)]">{morphologia}</span>}
          </div>
        )}

        {definicaoResumida && (
          <div className="bg-[var(--brand-subtle)]/20 rounded-lg p-2.5 mb-1.5 border border-[var(--brand-default)]/10">
            <div className="flex items-center gap-1 mb-1">
              <BookOpen className="w-3 h-3 text-[var(--brand-default)]" />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--brand-default)]">Definição</span>
            </div>
            <p className="text-xs font-medium text-[var(--brand-default)] leading-relaxed">{definicaoResumida}</p>
          </div>
        )}

        {definicao && definicao !== definicaoResumida && (
          <p className="text-[11px] text-[var(--content-secondary)] leading-relaxed mb-1.5">{definicao}</p>
        )}

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
            {palavrasComStrong.length > 0 && (
              <div className="py-2 px-1">
                {/* Texto PT primeiro — grande, legível */}
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-[9px] font-bold shrink-0 mt-0.5">
                    {versiculo.numero}
                  </span>
                  <div className="flex flex-wrap gap-x-1 gap-y-0 leading-relaxed font-serif-body text-[var(--content-primary)]" style={{ fontSize: '14px' }}>
                    {versiculo.palavras.map((p, wi) => (
                      <span
                        key={wi}
                        className={`cursor-pointer transition-colors relative ${
                          selectedStrong?.verso === versiculo.numero && selectedStrong?.strong === p.strong
                            ? 'text-[var(--brand-default)] font-semibold'
                            : p.strong ? 'hover:text-[var(--brand-default)]' : ''
                        }`}
                        onClick={() => p.strong && handleWordClick(versiculo.numero, p.strong)}
                        role={p.strong ? 'button' : undefined}
                        tabIndex={p.strong ? 0 : undefined}
                      >
                        {p.texto}
                        {p.strong && (
                          <span className="absolute -bottom-px left-0 right-0 h-px bg-[var(--brand-default)]/30 scale-x-0 hover:scale-x-100 transition-transform origin-left rounded-full" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Linha original compacta abaixo */}
                <div className="flex flex-wrap items-baseline gap-x-0 gap-y-0 ml-7">
                  {versiculo.palavras.map((p, wi) => (
                    <span key={wi} className="inline-flex flex-col items-center px-px">
                      {p.strong ? (
                        <span
                          className={`text-[9px] leading-none text-center cursor-pointer transition-colors ${
                            selectedStrong?.verso === versiculo.numero && selectedStrong?.strong === p.strong
                              ? 'text-[var(--brand-default)] font-bold'
                              : 'text-[var(--content-muted)] hover:text-[var(--brand-default)]'
                          }`}
                          onClick={() => p.strong && handleWordClick(versiculo.numero, p.strong)}
                          role="button"
                          tabIndex={0}
                        >
                          {p.palavraOriginal || '\u00A0'}
                        </span>
                      ) : (
                        <span className="text-[9px] text-transparent select-none">·</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Detalhe inline */}
                <AnimatePresence>
                  {selectedStrong?.verso === versiculo.numero && (
                    <DetalhePalavra
                      strong={selectedStrong.strong}
                      onClose={() => setSelectedStrong(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
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
