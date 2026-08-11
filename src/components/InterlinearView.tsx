'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Languages, Hash, ArrowRight, ExternalLink, Volume2 } from 'lucide-react';
import { getStrongByNumber, type LexiconEntry } from '@/lib/lexiconSearch';
import { alinharVersiculo, type PalavraAlinhada } from '@/lib/wordAlignment';
import { romanizeHebrew } from '@/lib/hebrewRomanize';
import { AudioPronunciation } from '@/components/AudioPronunciation';
import { parsearMorfologia, getCorMorfologia, type MorfologiaEstruturada } from '@/lib/morphology';

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

function MorfologiaTag({ campo, valor }: { campo: string; valor: string }) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium leading-none ${getCorMorfologia(campo)}`}>
      {valor}
    </span>
  );
}

function DetalhePalavra({ strong, palavraOriginal, onClose }: { strong: string; palavraOriginal?: string; onClose: () => void }) {
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
  const versiculos = 'versiculos' in entry ? (entry as { versiculos: string[] }).versiculos : [];
  const notas = 'notas' in entry ? (entry as { notas: string }).notas : '';
  const palavrasDerivadas = 'palavrasDerivadas' in entry ? (entry as { palavrasDerivadas: string[] }).palavrasDerivadas : [];

  const morphParsed: MorfologiaEstruturada | null = morphologia ? parsearMorfologia(morphologia, isHebrew ? 'hebraico' : 'grego') : null;

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
        className="mx-2 mb-3 rounded-xl relative overflow-hidden"
        style={{
          backgroundColor: 'var(--surface-raised)',
          border: '1px solid var(--border)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Barra lateral colorida */}
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ backgroundColor: isHebrew ? '#f59e0b' : '#8b5cf6' }} />

        {/* Cabeçalho */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={isHebrew
                  ? { backgroundColor: '#fef3c7', color: '#92400e' }
                  : { backgroundColor: '#ede9fe', color: '#5b21b6' }
                }
              >
                {strong}
              </span>
              <span className="text-[10px] font-medium" style={{ color: 'var(--content-muted)' }}>
                {isHebrew ? 'Hebraico' : 'Grego'}
              </span>
              {frequencia !== undefined && frequencia > 0 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)', border: '1px solid var(--border)' }}>
                  <Hash className="w-2.5 h-2.5" />
                  {frequencia}x no NT
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors" aria-label="Fechar">
              <X className="w-3.5 h-3.5" style={{ color: 'var(--content-muted)' }} />
            </button>
          </div>

          {/* Palavra original grande */}
          <div className="text-center py-2">
            <p className={`text-3xl font-bold ${isHebrew ? 'font-hebrew' : 'font-greek'}`} style={{ color: 'var(--content-primary)', lineHeight: 1.2 }}>
              {palavraOriginal || entry.palavra}
            </p>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <p className="text-xs italic" style={{ color: 'var(--content-muted)' }}>
                {isHebrew ? romanizeHebrew(entry.transliteracao || entry.palavra) : entry.transliteracao}
              </p>
              <AudioPronunciation
                palavra={entry.palavra}
                strong={strong}
                lingua={isHebrew ? 'hebraico' : 'grego'}
                transliteracao={entry.transliteracao}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Tags morfológicas */}
        {morphParsed && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-1 justify-center">
              {morphParsed.tipo && <MorfologiaTag campo="tipo" valor={morphParsed.tipo} />}
              {morphParsed.stem && <MorfologiaTag campo="stem" valor={morphParsed.stem} />}
              {morphParsed.tempo && <MorfologiaTag campo="tempo" valor={morphParsed.tempo} />}
              {morphParsed.voz && <MorfologiaTag campo="voz" valor={morphParsed.voz} />}
              {morphParsed.modo && <MorfologiaTag campo="modo" valor={morphParsed.modo} />}
              {morphParsed.pessoa && <MorfologiaTag campo="pessoa" valor={`${morphParsed.pessoa} pessoa`} />}
              {morphParsed.numero && <MorfologiaTag campo="numero" valor={morphParsed.numero} />}
              {morphParsed.genero && <MorfologiaTag campo="genero" valor={morphParsed.genero} />}
              {morphParsed.caso && <MorfologiaTag campo="caso" valor={morphParsed.caso} />}
              {morphParsed.estado && <MorfologiaTag campo="estado" valor={morphParsed.estado} />}
            </div>
            <p className="text-center text-[10px] mt-1.5 font-medium" style={{ color: 'var(--content-muted)' }}>
              {morphParsed.label}
            </p>
          </div>
        )}

        {/* Definição */}
        <div className="px-4 pb-3 space-y-2">
          {(definicaoResumida || definicao) && (
            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1 mb-1">
                <BookOpen className="w-3 h-3" style={{ color: isHebrew ? '#f59e0b' : '#8b5cf6' }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: isHebrew ? '#f59e0b' : '#8b5cf6' }}>
                  {isHebrew ? 'BDB / Strong' : 'BDAG / Strong'}
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--content-primary)' }}>
                {definicaoResumida || definicao}
              </p>
              {definicao && definicao !== definicaoResumida && (
                <p className="text-[11px] leading-relaxed mt-1.5 pt-1.5" style={{ color: 'var(--content-secondary)', borderTop: '1px solid var(--border)' }}>
                  {definicao}
                </p>
              )}
            </div>
          )}

          {/* Uso contextual */}
          {uso && (
            <div className="rounded-lg p-2.5" style={{ backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1 mb-1">
                <ArrowRight className="w-3 h-3" style={{ color: 'var(--content-muted)' }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--content-muted)' }}>Uso</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--content-secondary)' }}>{uso}</p>
            </div>
          )}

          {/* Ocorrências */}
          {versiculos && versiculos.length > 0 && (
            <div className="rounded-lg p-2.5" style={{ backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1 mb-1.5">
                <ExternalLink className="w-3 h-3" style={{ color: 'var(--content-muted)' }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--content-muted)' }}>
                  Ocorrências ({versiculos.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {versiculos.map((v, i) => (
                  <a
                    key={i}
                    href={`/biblia?ref=${v}`}
                    className="text-[10px] px-1.5 py-0.5 rounded border hover:bg-[var(--brand-default)]/10 transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--content-secondary)' }}
                  >
                    {v}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Notas */}
          {notas && (
            <div className="rounded-lg p-2.5" style={{ backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1 mb-1">
                <Volume2 className="w-3 h-3" style={{ color: 'var(--content-muted)' }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--content-muted)' }}>Notas</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--content-secondary)' }}>{notas}</p>
            </div>
          )}

          {/* Palavras derivadas */}
          {palavrasDerivadas && palavrasDerivadas.length > 0 && (
            <div className="rounded-lg p-2.5" style={{ backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1 mb-1.5">
                <Languages className="w-3 h-3" style={{ color: 'var(--content-muted)' }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--content-muted)' }}>
                  Derivadas ({palavrasDerivadas.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {palavrasDerivadas.map((d, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface-raised)', color: 'var(--content-secondary)', border: '1px solid var(--border)' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function InterlinearView({ versiculos, livro, capitulo }: InterlinearViewProps) {
  const [selectedStrong, setSelectedStrong] = useState<{ verso: number; strong: string; palavraOriginal?: string } | null>(null);
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

  const handleWordClick = (verso: number, strong: string, palavraOriginal?: string) => {
    if (selectedStrong?.verso === verso && selectedStrong?.strong === strong) {
      setSelectedStrong(null);
    } else {
      setSelectedStrong({ verso, strong, palavraOriginal });
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
                {/* Linha 1: Texto em português */}
                <div className="flex items-start gap-2 mb-1">
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
                        onClick={() => p.strong && handleWordClick(versiculo.numero, p.strong, p.palavraOriginal || undefined)}
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

                {/* Linha 2: Palavras originais (grego/hebraico) */}
                <div className="flex flex-wrap items-baseline gap-x-0 gap-y-0 ml-7">
                  {versiculo.palavras.map((p, wi) => (
                    <span key={wi} className="inline-flex flex-col items-center px-px">
                      {p.strong ? (
                        <span
                          className={`text-[10px] leading-none text-center cursor-pointer transition-colors ${
                            selectedStrong?.verso === versiculo.numero && selectedStrong?.strong === p.strong
                              ? 'text-[var(--brand-default)] font-bold'
                              : 'text-[var(--content-muted)] hover:text-[var(--brand-default)]'
                          } ${p.idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}`}
                          onClick={() => p.strong && handleWordClick(versiculo.numero, p.strong, p.palavraOriginal || undefined)}
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

                {/* Linha 3: Transliteração compacta */}
                <div className="flex flex-wrap items-baseline gap-x-0 gap-y-0 ml-7 mt-0.5">
                  {versiculo.palavras.map((p, wi) => (
                    <span key={wi} className="inline-flex flex-col items-center px-px">
                      {p.strong && p.transliteracao ? (
                        <span className="text-[7px] leading-none text-center italic" style={{ color: 'var(--content-muted)' }}>
                          {p.transliteracao.length > 6 ? p.transliteracao.slice(0, 6) + '.' : p.transliteracao}
                        </span>
                      ) : (
                        <span className="text-[7px] text-transparent select-none">·</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Detalhe inline */}
                <AnimatePresence>
                  {selectedStrong?.verso === versiculo.numero && (
                    <DetalhePalavra
                      strong={selectedStrong.strong}
                      palavraOriginal={selectedStrong.palavraOriginal}
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
