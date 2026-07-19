'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
    }));
  }

  const words = textoPt.split(/\s+/);
  const mapped: PalavraInterlinear[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const cleanWord = w.replace(/[,;.:!?()[\]{}'"]/g, '');

    let matched: typeof strongs[0] | null = null;
    for (const s of strongs) {
      if (s.transliteracao && cleanWord.toLowerCase().startsWith(s.transliteracao.toLowerCase().slice(0, 3))) {
        matched = s;
        break;
      }
    }

    if (!matched && i < strongs.length) {
      matched = strongs[i];
    }

    if (matched) {
      mapped.push({
        texto: w,
        strong: matched.strong,
        palavraOriginal: matched.palavra,
        transliteracao: matched.transliteracao,
        definicao: matched.morfologia || matched.definicao,
      });
    } else {
      mapped.push({
        texto: w,
        strong: null,
        palavraOriginal: null,
        transliteracao: null,
        definicao: null,
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

      {dados.map((versiculo, vi) => (
        <motion.div
          key={versiculo.numero}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: vi * 0.03 }}
          className="border border-[var(--border)]/30 rounded-xl overflow-hidden hover:border-[var(--brand-default)]/30 transition-colors"
        >
          <div className="px-4 py-3">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--brand-default)] text-[var(--brand-contrast)] text-xs font-bold shrink-0 mt-0.5">
                {versiculo.numero}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-x-1 gap-y-0.5 leading-relaxed font-serif-body text-[var(--content-primary)]" style={{ fontSize: '15px' }}>
                  {versiculo.palavras.map((p, wi) => (
                    <span key={wi} className="inline-flex items-baseline gap-0.5 group relative">
                      <span className={p.strong ? 'relative' : ''}>
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

            <div className="flex flex-wrap gap-x-1 gap-y-0 ml-10">
              {versiculo.palavras.map((p, wi) => (
                <span key={wi} className="inline-flex flex-col items-center min-w-[40px]">
                  <span
                    className={`text-xs leading-tight text-center font-hebrew ${p.strong ? 'cursor-pointer hover:text-[var(--brand-default)] transition-colors' : 'text-[var(--content-muted)]/30'}`}
                    style={{ fontSize: '11px', minHeight: '18px' }}
                    onClick={() => p.strong && setModalStrong(p.strong)}
                    title={p.strong ? `${p.transliteracao} — ${p.definicao}` : undefined}
                  >
                    {p.palavraOriginal || '\u00A0'}
                  </span>
                  {p.strong && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full cursor-pointer transition-colors bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)] hover:text-[var(--brand-contrast)]"
                      onClick={() => setModalStrong(p.strong)}
                    >
                      {p.strong}
                    </span>
                  )}
                  {p.strong && (
                    <span className="text-[8px] text-[var(--content-muted)] text-center max-w-[60px] leading-tight truncate px-0.5" title={p.definicao ?? ''}>
                      {p.definicao && p.definicao.length > 12 ? p.definicao.slice(0, 12) + '…' : p.definicao}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {dados.length === 0 && (
        <div className="text-center py-10 text-[var(--content-muted)] text-sm">
          Nenhum dado interlinear disponível para este capítulo.
        </div>
      )}
    </div>
  );
}
