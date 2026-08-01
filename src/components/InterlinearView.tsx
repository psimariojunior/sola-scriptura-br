'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { getStrongByNumber, type LexiconEntry } from '@/lib/lexiconSearch';
import { alinharVersiculo, type PalavraAlinhada } from '@/lib/wordAlignment';

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

function DetalhePalavra({ strong, onClose }: { strong: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [entry, setEntry] = useState<LexiconEntry | null>(null);
  const isHebrew = strong.toUpperCase().startsWith('H');

  useEffect(() => {
    let cancelled = false;
    getStrongByNumber(strong).then(e => { if (!cancelled) setEntry(e); });
    return () => { cancelled = true; };
  }, [strong]);

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
      <div
        className="mx-2 mb-3 p-4 rounded-xl relative"
        style={{
          backgroundColor: 'var(--surface-raised)',
          border: '1px solid var(--border)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
        }}
      >
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ backgroundColor: 'var(--brand-default)' }} />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={isHebrew
                ? { backgroundColor: 'var(--brand-subtle)', color: 'var(--brand-default)' }
                : { backgroundColor: 'var(--surface-sunken)', color: 'var(--content-secondary)', border: '1px solid var(--border)' }
              }
            >
              {strong}
            </span>
            <span className="text-[10px] font-medium" style={{ color: 'var(--content-muted)' }}>{isHebrew ? 'Hebraico' : 'Grego'}</span>
            {frequencia !== undefined && frequencia > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)', border: '1px solid var(--border)' }}>{frequencia}x</span>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded-md" style={{ color: 'var(--content-muted)' }} aria-label="Fechar">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-center mb-3">
          <p className={`text-2xl font-bold ${isHebrew ? 'font-hebrew' : 'font-greek'}`} style={{ color: 'var(--content-primary)' }}>{entry.palavra}</p>
          <p className="text-xs italic" style={{ color: 'var(--content-muted)' }}>{entry.transliteracao}</p>
        </div>

        {(categoria || morphologia) && (
          <div className="flex gap-1 flex-wrap justify-center mb-3">
            {categoria && <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: 'var(--brand-subtle)', color: 'var(--brand-default)' }}>{categoria}</span>}
            {morphologia && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-secondary)', border: '1px solid var(--border)' }}>{morphologia}</span>}
          </div>
        )}

        {definicaoResumida && (
          <div className="rounded-lg p-3 mb-2" style={{ backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-1 mb-1">
              <BookOpen className="w-3 h-3" style={{ color: 'var(--brand-default)' }} />
              <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--brand-default)' }}>Definição</span>
            </div>
            <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--content-primary)' }}>{definicaoResumida}</p>
          </div>
        )}

        {definicao && definicao !== definicaoResumida && (
          <p className="text-[11px] leading-relaxed mb-2" style={{ color: 'var(--content-secondary)' }}>{definicao}</p>
        )}

        {uso && (
          <p className="text-[10px] leading-relaxed mt-2 pt-2" style={{ color: 'var(--content-muted)', borderTop: '1px solid var(--border)' }}>
            <span className="font-semibold" style={{ color: 'var(--content-secondary)' }}>Uso:</span> {uso}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function InterlinearView({ versiculos, livro, capitulo }: InterlinearViewProps) {
  const [selectedStrong, setSelectedStrong] = useState<{ verso: number; strong: string } | null>(null);
  const [dados, setDados] = useState<{ numero: number; palavras: PalavraAlinhada[] }[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import('@/lib/wordAlignment');
      const result = await Promise.all(
        versiculos.map(async (v) => ({
          numero: v.numero,
          palavras: await mod.alinharVersiculo(livro, capitulo, v.numero, v.texto),
        })),
      );
      if (!cancelled) setDados(result);
    })();
    return () => {
      cancelled = true;
    };
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
