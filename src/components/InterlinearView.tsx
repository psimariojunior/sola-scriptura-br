'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStrongPorVersiculo } from '@/data/biblia/strong';
import { InterlinearModal } from './InterlinearModal';

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

export function InterlinearView({ versiculos, livro, capitulo }: InterlinearViewProps) {
  const [modalStrong, setModalStrong] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const dados = useMemo(() => {
    return versiculos.map(v => ({
      numero: v.numero,
      palavras: mapearVersiculo(livro, capitulo, v.numero, v.texto),
    }));
  }, [versiculos, livro, capitulo]);

  const toggleExpand = (num: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <div className="space-y-0.5">
      <InterlinearModal strong={modalStrong} onClose={() => setModalStrong(null)} />

      {dados.map((versiculo) => {
        const palavrasComStrong = versiculo.palavras.filter(p => p.strong);
        const isExpanded = expanded.has(versiculo.numero);

        return (
          <div
            key={versiculo.numero}
            className="border-b border-[var(--border)]/20 last:border-b-0"
          >
            {/* Linha interlinear compacta — sempre visível */}
            {palavrasComStrong.length > 0 && (
              <div className="flex flex-wrap items-baseline gap-x-0 gap-y-0 py-1.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-[9px] font-bold shrink-0 mr-1.5">
                  {versiculo.numero}
                </span>
                {versiculo.palavras.map((p, wi) => (
                  <span key={wi} className="inline-flex flex-col items-center px-px">
                    {p.strong ? (
                      <span
                        className="text-[10px] leading-none text-center cursor-pointer active:text-[var(--brand-default)] transition-colors text-[var(--content-secondary)] font-medium"
                        onClick={() => setModalStrong(p.strong)}
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
                <button
                  onClick={() => toggleExpand(versiculo.numero)}
                  className="ml-1 text-[8px] text-[var(--content-muted)] hover:text-[var(--brand-default)] transition-colors shrink-0"
                  aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              </div>
            )}

            {/* Detalhes expandidos — apenas quando clica */}
            <AnimatePresence>
              {isExpanded && palavrasComStrong.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-x-1 gap-y-1 pb-2 pl-6">
                    {versiculo.palavras.filter(p => p.strong).map((p, wi) => (
                      <span
                        key={wi}
                        className="inline-flex flex-col items-center px-1.5 py-1 rounded-lg bg-[var(--surface-sunken)]/50 cursor-pointer active:bg-[var(--brand-subtle)] transition-colors"
                        onClick={() => setModalStrong(p.strong)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className={`text-[11px] leading-tight text-center font-medium ${p.idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}`}>
                          {p.palavraOriginal || ''}
                        </span>
                        <span className="text-[8px] font-bold text-[var(--brand-default)]">
                          {p.strong}
                        </span>
                        {p.morfologia && (
                          <span className="text-[7px] text-[var(--content-muted)] text-center leading-tight max-w-[60px] truncate">
                            {p.morfologia}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
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
