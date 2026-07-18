'use client';

import { memo, Fragment, lazy, Suspense, useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { getCrossReferencesLazy } from '@/data/lazy/crossReferences';
import { getCrossReferencesByVerse, type CrossReference } from '@/data/biblia/crossReferences';
import {
  getTiposRecursoDisponiveis,
  getRecursosVersiculo,
  type TipoRecurso,
  type RecursoMapa,
  type RecursoPersonagem,
  type RecursoDoutrina,
  type RecursoLexico,
} from '@/data/biblia/versiculoRecursos';
import { authService } from '@/lib/auth';
import { VerseActions } from './VerseActions';

const PainelEstudosInline = lazy(() => import('@/components/PainelEstudosInline'));
const EstudoSintetizado = lazy(() => import('./EstudoSintetizado'));
const InlineStrongHighlight = lazy(() => import('./InlineStrongHighlight'));

// ═══════════════════════════════════════════════════════════════════════════════
// FALLBACKS DE LOADING (lazy loading)
// ═══════════════════════════════════════════════════════════════════════════════

function PanelFallback() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

function PanelFallbackSintetizado() {
  return (
    <div className="px-4 py-4">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TOGGLE DE ESTUDO INLINE
// ═══════════════════════════════════════════════════════════════════════════════

function EstudoToggle({ livro, livroNome, capitulo, versiculo, onClose }: {
  livro: string; livroNome: string; capitulo: number; versiculo: number; onClose: () => void;
}) {
  const [modo, setModo] = useState<'resumo' | 'sintetizado'>('resumo');
  return (
    <div className="px-3 sm:px-4">
      <div className="flex items-center gap-1 p-1 bg-[var(--surface-sunken)] rounded-lg mb-2 w-fit">
        <button
          onClick={() => setModo('resumo')}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors',
            modo === 'resumo' ? 'bg-[var(--surface-raised)] text-[var(--brand-default)] shadow-sm' : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          Estudo
        </button>
        <button
          onClick={() => setModo('sintetizado')}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5',
            modo === 'sintetizado' ? 'bg-[var(--surface-raised)] text-[var(--brand-default)] shadow-sm' : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          Estudo Sintetizado
        </button>
      </div>
      {modo === 'resumo' ? (
        <Suspense fallback={<PanelFallback />}>
          <PainelEstudosInline
            livro={livro}
            capitulo={capitulo}
            versiculo={versiculo}
            nomeLivro={livroNome}
            onClose={onClose}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<PanelFallbackSintetizado />}>
          <EstudoSintetizado
            livro={livro}
            livroNome={livroNome}
            capitulo={capitulo}
            versiculo={versiculo}
            onClose={onClose}
          />
        </Suspense>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAPEAMENTO DE CORES PARA TIPOS DE REFERÊNCIAS CRUZADAS
// ═══════════════════════════════════════════════════════════════════════════════

/** Cores para cada tipo de referência cruzada */
const crossRefTypeColors: Record<CrossReference['type'], { bg: string; text: string; label: string }> = {
  parallel: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', label: 'Paralelo' },
  fulfillment: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Cumprimento' },
  quotation: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', label: 'Citação' },
  contrast: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Contraste' },
  thematic: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', label: 'Temático' },
  typology: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Tipologia' },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ÍCONES E LABELS PARA TIPOS DE RECURSOS (Melhoria 2)
// ═══════════════════════════════════════════════════════════════════════════════

/** Mapa de ícones e labels para cada tipo de recurso disponível */
const resourceTypeInfo: Record<TipoRecurso, { icon: string; label: string }> = {
  comentario: { icon: '📝', label: 'Comentário' },
  estudo: { icon: '📖', label: 'Estudo' },
  nota: { icon: '📋', label: 'Nota' },
  'cross-ref': { icon: '🔗', label: 'Ref. Cruzada' },
  lexico: { icon: '🔤', label: 'Léxico' },
  mapa: { icon: '🗺️', label: 'Mapa' },
  personagem: { icon: '👤', label: 'Personagem' },
  doutrina: { icon: '⛪', label: 'Doutrina' },
  cronologia: { icon: '📅', label: 'Cronologia' },
  pericope: { icon: '📑', label: 'Perícope' },
  'contexto-historico': { icon: '🏛️', label: 'Contexto Histórico' },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROPS DO VERSECARD
// ═══════════════════════════════════════════════════════════════════════════════

export interface VerseCardProps {
  numero: number;
  texto: string;
  livroAbreviacao: string;
  livroNome: string;
  capitulo: number;
  traducao: string;
  fontSize: number;
  isSelected: boolean;
  isPlaying: boolean;
  isHighlighted: boolean;
  isFavorito: boolean;
  corMarca: string | null;
  temAnotacao: boolean;
  copiedVerse: string | null;
  audioNatural: ReturnType<typeof useAudioNatural>;
  audio: ReturnType<typeof useVerseAudio>;
  flashcards: ReturnType<typeof useFlashcards>;
  estudoAberto: boolean;
  onSelect: () => void;
  onFavoritoChange: () => void;
  onAnotar: () => void;
  onStrong: () => void;
  onComentarios: () => void;
  onToggleEstudo: () => void;
  copyVerse: (text: string, ref: string) => void;
  verseKey: string;
  showTranslationLabel: boolean;
  tradLabel: string;
  tradBadgeColor: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL VERSECARD
// ═══════════════════════════════════════════════════════════════════════════════

export const VerseCard = memo(function VerseCard({
  numero,
  texto,
  livroAbreviacao,
  livroNome,
  capitulo,
  traducao,
  fontSize,
  isSelected,
  isPlaying,
  isHighlighted,
  isFavorito,
  corMarca,
  temAnotacao,
  copiedVerse,
  audioNatural,
  audio,
  flashcards,
  estudoAberto,
  onSelect,
  onFavoritoChange,
  onAnotar,
  onStrong,
  onComentarios,
  onToggleEstudo,
  copyVerse,
  verseKey,
  showTranslationLabel,
  tradLabel,
  tradBadgeColor,
}: VerseCardProps) {
  const ref = `${livroNome} ${capitulo}:${numero}`;

  // ── Referências cruzadas lazy-loaded (29k entries) ──
  const [crossRefsSimples, setCrossRefsSimples] = useState<string[]>([]);
  useEffect(() => {
    let cancelled = false;
    import('@/data/crossReferences').then(mod => {
      if (!cancelled) setCrossRefsSimples(mod.crossReferences[`${livroAbreviacao}:${capitulo}:${numero}`] || []);
    });
    return () => { cancelled = true; };
  }, [livroAbreviacao, capitulo, numero]);
  const crossRefsDetalhadas = getCrossReferencesByVerse(livroAbreviacao, capitulo, numero);

  // ── Recursos detalhados do versículo (Melhorias 2, 3, 4) ──
  const tiposRecursos = getTiposRecursoDisponiveis(livroAbreviacao, capitulo, numero);
  const recursosCompletos = getRecursosVersiculo(livroAbreviacao, capitulo, numero);

  // ── Filtrar recursos por tipo para exibição ──
  const recursosMapa = recursosCompletos.filter((r) => r.tipo === 'mapa') as Array<{ tipo: 'mapa'; dados: RecursoMapa }>;
  const recursosPersonagem = recursosCompletos.filter((r) => r.tipo === 'personagem') as Array<{ tipo: 'personagem'; dados: RecursoPersonagem }>;
  const recursosDoutrina = recursosCompletos.filter((r) => r.tipo === 'doutrina') as Array<{ tipo: 'doutrina'; dados: RecursoDoutrina }>;
  const recursosLexico = recursosCompletos.filter((r) => r.tipo === 'lexico') as Array<{ tipo: 'lexico'; dados: RecursoLexico }>;

  // ── Popover de recursos (Melhoria 2) ──
  const [recursosPopoverAberto, setRecursosPopoverAberto] = useState(false);
  const recursosPopoverRef = useRef<HTMLDivElement>(null);

  // Fechar popover ao clicar fora
  useEffect(() => {
    if (!recursosPopoverAberto) return;
    const handler = (e: MouseEvent) => {
      if (recursosPopoverRef.current && !recursosPopoverRef.current.contains(e.target as Node)) {
        setRecursosPopoverAberto(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [recursosPopoverAberto]);

  // ── Verificar acesso total para botão de IA (Melhoria 5) ──
  const temAcessoIA = authService.temAcessoTotal();

  // ── Cores para marcas ──
  const corBgMap: Record<string, string> = {
    yellow: 'bg-[var(--mark-yellow)]',
    green: 'bg-[var(--mark-green)]',
    blue: 'bg-[var(--mark-blue)]',
    pink: 'bg-[var(--mark-pink)]',
    orange: 'bg-[var(--mark-orange)]',
    purple: 'bg-[var(--mark-purple)]',
  };

  return (
    <Fragment>
      <motion.article
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={onSelect}
        className={cn(
          'group relative cursor-pointer rounded-lg',
          'transition-all duration-300',
          'px-3 sm:px-4 -mx-3 sm:-mx-4',
          'py-3 sm:py-3',
          isSelected
            ? 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)] shadow-sm'
            : isPlaying
            ? 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)]'
            : isHighlighted
            ? 'bg-[var(--brand-subtle)]'
            : 'hover:bg-[var(--surface-sunken)]/60 border-l-2 border-l-transparent hover:border-l-[var(--brand-default)]/30',
          corMarca && corBgMap[corMarca]
        )}
        aria-selected={isSelected}
        aria-label={`Versículo ${numero} de ${livroNome} ${capitulo}`}
      >
        <div className="flex items-start gap-2.5 sm:gap-4">
          {/* ── Número do versículo ── */}
          <span
            className={cn(
              'shrink-0 inline-flex items-center justify-center',
              'w-8 h-8 sm:w-10 sm:h-10 rounded-lg',
              'text-[11px] sm:text-sm font-bold tabular-nums',
              'transition-all duration-200',
              isSelected || isPlaying
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/20'
                : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] group-hover:bg-[var(--brand-default)] group-hover:text-[var(--brand-contrast)]'
            )}
            aria-hidden="true"
          >
            {numero}
            {corMarca && (
              <span
                className={cn(
                  'absolute -mt-3 ml-7 w-1.5 h-1.5 rounded-full ring-2 ring-[var(--surface-raised)]',
                  corMarca === 'yellow' && 'bg-yellow-400',
                  corMarca === 'green' && 'bg-green-400',
                  corMarca === 'blue' && 'bg-blue-400',
                  corMarca === 'pink' && 'bg-pink-400',
                  corMarca === 'orange' && 'bg-orange-400',
                  corMarca === 'purple' && 'bg-purple-400'
                )}
              />
            )}
          </span>

          <div className="flex-1 min-w-0">
            {/* ── Texto do versículo ── */}
            <p
              className="font-serif-body text-[var(--content-primary)] leading-[1.75] sm:leading-[1.8]"
              style={{ fontSize: `${fontSize}px` }}
            >
              {texto}
            </p>
            <span className="block mt-0.5 text-[0.65em] sm:text-[0.7em] text-[var(--content-muted)] font-normal tracking-wide tabular-nums">
              {ref}
            </span>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* MELHORIA 1: Referências cruzadas com tipo + descrição        */}
            {/* Exibe badges coloridos para cada tipo de referência cruzada   */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {crossRefsDetalhadas.length > 0 && (
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[var(--content-muted)] font-medium uppercase tracking-wider">
                  Refs
                </span>
                {crossRefsDetalhadas.slice(0, 4).map((cref) => {
                  const tipoInfo = crossRefTypeColors[cref.type];
                  const parts = cref.to.split(' ');
                  const livroRef = parts[0];
                  const capRef = parts[1];
                  return (
                    <Link
                      key={`${cref.to}-${cref.type}`}
                      href={`/biblia?livro=${livroRef}&capitulo=${capRef}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 group/ref"
                      title={cref.description || cref.to}
                    >
                      {/* Badge colorido com o tipo */}
                      <span
                        className={cn(
                          'inline-flex items-center text-[8px] font-bold uppercase px-1 py-0.5 rounded',
                          tipoInfo.bg,
                          tipoInfo.text
                        )}
                      >
                        {tipoInfo.label}
                      </span>
                      {/* Referência */}
                      <span className="text-[10px] font-medium text-[var(--brand-default)] group-hover/ref:underline">
                        {cref.to}
                      </span>
                    </Link>
                  );
                })}
                {crossRefsDetalhadas.length > 4 && (
                  <span className="text-[10px] text-[var(--content-muted)]">
                    +{crossRefsDetalhadas.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* MELHORIA 2: Badge de recursos com tooltip/popover             */}
            {/* Lista todos os tipos de recursos disponíveis ao hover/clique   */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {tiposRecursos.length > 0 && (
              <div className="mt-1.5 relative" ref={recursosPopoverRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRecursosPopoverAberto(!recursosPopoverAberto);
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-[10px] px-1.5 py-0.5 rounded-full',
                    'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium',
                    'hover:bg-[var(--brand-default)]/20 transition-colors duration-150'
                  )}
                  title={`${tiposRecursos.length} tipo(s) de recurso(s) disponível(eis)`}
                  aria-expanded={recursosPopoverAberto}
                >
                  <span>📚</span>
                  <span>{tiposRecursos.length} recurso{tiposRecursos.length !== 1 ? 's' : ''}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Popover com lista detalhada de recursos */}
                <AnimatePresence>
                  {recursosPopoverAberto && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        'absolute left-0 top-full mt-1 z-40',
                        'bg-[var(--surface-raised)] border border-[var(--border)]',
                        'rounded-lg shadow-xl p-2 min-w-[180px]'
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--content-muted)] px-2 py-1 mb-1">
                        Recursos disponíveis
                      </p>
                      {tiposRecursos.map((tipo) => {
                        const info = resourceTypeInfo[tipo];
                        return (
                          <div
                            key={tipo}
                            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--surface-sunken)] transition-colors"
                          >
                            <span className="text-sm">{info.icon}</span>
                            <span className="text-[11px] text-[var(--content-secondary)]">{info.label}</span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* MELHORIA 3: Indicador de léxico de Strong                     */}
            {/* Mostra popover com dados do léxico grego/hebraico             */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {recursosLexico.length > 0 && (
              <Suspense fallback={null}>
                <InlineStrongHighlight
                  lexicoRecursos={recursosLexico.map((r) => r.dados)}
                  textoVersiculo={texto}
                  fontSize={fontSize}
                />
              </Suspense>
            )}

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* MELHORIA 4: Badges de mapas, personagens e doutrinas          */}
            {/* Links para /historia, /personagens, /teologia                 */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {(recursosMapa.length > 0 || recursosPersonagem.length > 0 || recursosDoutrina.length > 0) && (
              <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                {/* Badges de mapas */}
                {recursosMapa.slice(0, 2).map((r) => (
                  <Link
                    key={r.dados.slug}
                    href={`/historia?local=${r.dados.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      'inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md',
                      'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
                      'hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors',
                      'border border-emerald-200 dark:border-emerald-800'
                    )}
                    title={`Mapa: ${r.dados.lugar}`}
                  >
                    <span>🗺️</span>
                    <span className="font-medium">{r.dados.lugar}</span>
                  </Link>
                ))}

                {/* Badges de personagens */}
                {recursosPersonagem.slice(0, 2).map((r) => (
                  <Link
                    key={r.dados.slug}
                    href={`/personagens?personagem=${r.dados.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      'inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md',
                      'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300',
                      'hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors',
                      'border border-sky-200 dark:border-sky-800'
                    )}
                    title={`Personagem: ${r.dados.nome}`}
                  >
                    <span>👤</span>
                    <span className="font-medium">{r.dados.nome}</span>
                  </Link>
                ))}

                {/* Badges de doutrinas */}
                {recursosDoutrina.slice(0, 2).map((r) => (
                  <Link
                    key={r.dados.slug}
                    href={`/teologia?topico=${r.dados.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      'inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md',
                      'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300',
                      'hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors',
                      'border border-violet-200 dark:border-violet-800'
                    )}
                    title={`Doutrina: ${r.dados.nome}`}
                  >
                    <span>⛪</span>
                    <span className="font-medium">{r.dados.nome}</span>
                  </Link>
                ))}

                {/* Indicador de mais itens */}
                {(recursosMapa.length > 2 || recursosPersonagem.length > 2 || recursosDoutrina.length > 2) && (
                  <span className="text-[9px] text-[var(--content-muted)]">
                    +{Math.max(0, recursosMapa.length - 2) + Math.max(0, recursosPersonagem.length - 2) + Math.max(0, recursosDoutrina.length - 2)}
                  </span>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* MELHORIA 5: Botão "Aprofundar com IA"                         */}
            {/* Linka para /estudo-ia se tiver acesso, senão mostra paywall    */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <div className="mt-2">
              {temAcessoIA ? (
                <Link
                  href={`/estudo-ia?versiculo=${livroAbreviacao} ${capitulo}:${numero}`}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-[10px] font-semibold',
                    'px-2 py-1 rounded-md',
                    'bg-gradient-to-r from-violet-500/10 to-blue-500/10',
                    'text-violet-700 dark:text-violet-300',
                    'hover:from-violet-500/20 hover:to-blue-500/20',
                    'border border-violet-200 dark:border-violet-800',
                    'transition-all duration-200'
                  )}
                  title="Aprofundar estudo com IA"
                >
                  <span>🤖</span>
                  <span>Aprofundar com IA</span>
                </Link>
              ) : (
                <Link
                  href="/assinar"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-[10px] font-semibold',
                    'px-2 py-1 rounded-md',
                    'bg-gradient-to-r from-gray-500/10 to-gray-400/10',
                    'text-[var(--content-muted)]',
                    'hover:from-gray-500/20 hover:to-gray-400/20',
                    'border border-[var(--border)]',
                    'transition-all duration-200'
                  )}
                  title="Desbloqueie com Acesso Total"
                >
                  <span>🔒</span>
                  <span>Aprofundar com IA</span>
                </Link>
              )}
            </div>
          </div>

          {/* ── Ações do versículo ── */}
          <VerseActions
            livro={livroNome}
            livroNome={livroNome}
            livroAbreviacao={livroAbreviacao}
            capitulo={capitulo}
            versiculo={numero}
            traducao={traducao}
            texto={texto}
            audioNatural={audioNatural}
            audio={audio}
            flashcards={flashcards}
            isFavorito={isFavorito}
            onFavoritoChange={onFavoritoChange}
            onAnotar={onAnotar}
            onStrong={onStrong}
            onComentarios={onComentarios}
            onEstudos={onToggleEstudo}
            onSelected={onSelect}
            temAnotacao={temAnotacao}
            copyVerse={copyVerse}
            copiedVerse={copiedVerse}
            verseKey={verseKey}
          />
        </div>
      </motion.article>

      {/* ── Painel de estudo expandível ── */}
      <AnimatePresence>
        {estudoAberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden -mx-3 sm:-mx-4 mb-3"
          >
            <EstudoToggle
              livro={livroAbreviacao}
              livroNome={livroNome}
              capitulo={capitulo}
              versiculo={numero}
              onClose={onToggleEstudo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
});
