'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getStrongPorVersiculo, type PalavraStrong } from '@/data/biblia/strong';
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
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
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
      texto: w,
      strong: null,
      palavraOriginal: null,
      transliteracao: null,
      definicao: null,
      morfologia: null,
      idioma: null,
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

      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }

    if (bestIdx >= 0 && bestScore >= 0.4) {
      usedStrong.add(bestIdx);
      const s = strongs[bestIdx];
      mapped.push({
        texto: w,
        strong: s.strong,
        palavraOriginal: s.palavra,
        transliteracao: s.transliteracao,
        definicao: s.definicao,
        morfologia: s.morfologia,
        idioma: s.idioma,
      });
    } else {
      mapped.push({
        texto: w,
        strong: null,
        palavraOriginal: null,
        transliteracao: null,
        definicao: null,
        morfologia: null,
        idioma: null,
      });
    }
  }

  return mapped;
}

export function InterlinearView({ versiculos, livro, capitulo, traducao }: InterlinearViewProps) {
  const [modalStrong, setModalStrong] = useState<string | null>(null);

  const dados = useMemo(() => {
    return versiculos.map(v => ({
      numero: v.numero,
      palavras: mapearVersiculo(livro, capitulo, v.numero, v.texto),
    }));
  }, [versiculos, livro, capitulo]);

  return (
    <div className="space-y-1">
      <InterlinearModal strong={modalStrong} onClose={() => setModalStrong(null)} />

      {dados.map((versiculo, vi) => {
        const palavrasComStrong = versiculo.palavras.filter(p => p.strong);
        return (
          <motion.div
            key={versiculo.numero}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: vi * 0.03 }}
            className="border border-[var(--border)]/30 rounded-xl overflow-hidden hover:border-[var(--brand-default)]/30 transition-colors"
          >
            <div className="px-4 py-3">
              {/* Texto original com underline hover */}
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--brand-default)] text-[var(--brand-contrast)] text-xs font-bold shrink-0 mt-0.5">
                  {versiculo.numero}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-x-1 gap-y-0.5 leading-relaxed font-serif-body text-[var(--content-primary)]" style={{ fontSize: '15px' }}>
                    {versiculo.palavras.map((p, wi) => (
                      <span key={wi} className="inline-flex items-baseline gap-0.5 group relative">
                        <span className={p.strong ? 'relative cursor-pointer' : ''}>
                          {p.texto}
                          {p.strong && (
                            <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[var(--brand-default)]/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                          )}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Linha interlinear: palavra original + Strong + definição */}
              {palavrasComStrong.length > 0 && (
                <div className="ml-10 border-t border-[var(--border)]/20 pt-2">
                  <div className="flex flex-wrap gap-x-0.5 gap-y-1">
                    {versiculo.palavras.map((p, wi) => (
                      <span key={wi} className="inline-flex flex-col items-center min-w-[44px] max-w-[80px] px-1">
                        {p.strong ? (
                          <>
                            {/* Palavra original (hebraico/grego) */}
                            <span
                              className={`text-xs leading-tight text-center cursor-pointer hover:text-[var(--brand-default)] transition-colors ${p.idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}`}
                              style={{ fontSize: '12px', minHeight: '18px' }}
                              onClick={() => setModalStrong(p.strong)}
                              title={p.transliteracao || ''}
                            >
                              {p.palavraOriginal || '\u00A0'}
                            </span>
                            {/* Código Strong */}
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full cursor-pointer transition-colors bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)] hover:text-[var(--brand-contrast)]"
                              onClick={() => setModalStrong(p.strong)}
                            >
                              {p.strong}
                            </span>
                            {/* Definição curta */}
                            {p.morfologia && (
                              <span
                                className="text-[8px] text-[var(--content-muted)] text-center leading-tight truncate w-full px-0.5"
                                title={p.morfologia}
                              >
                                {p.morfologia.length > 14 ? p.morfologia.slice(0, 13) + '…' : p.morfologia}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[8px] text-[var(--content-muted)]/30" style={{ minHeight: '18px' }}>
                            {'\u00A0'}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
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
