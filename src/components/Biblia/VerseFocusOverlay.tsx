'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Link2, MessageSquare, ChevronDown, ChevronUp, Copy, Heart, Share2, Languages, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCrossReferencesByVerse, formatReference, type CrossReference } from '@/data/biblia/crossReferences';
import { toggleFavorito } from '@/lib/estudos';

interface VerseFocusOverlayProps {
  open: boolean;
  onClose: () => void;
  livroAbreviacao: string;
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
  onNavigate?: (livro: string, cap: number, ver: number) => void;
}

export function VerseFocusOverlay({
  open, onClose, livroAbreviacao, livroNome, capitulo, versiculo, texto, traducao, onNavigate,
}: VerseFocusOverlayProps) {
  const [activeSection, setActiveSection] = useState<'refs' | 'comments' | 'context'>('refs');
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);
  const ref = `${livroNome} ${capitulo}:${versiculo}`;

  const checkFav = useCallback(() => {
    try {
      const raw = localStorage.getItem('ssb_estudos');
      if (!raw) { setIsFav(false); return; }
      const data = JSON.parse(raw);
      const k = `${livroAbreviacao}_${capitulo}_${versiculo}_${traducao}`;
      setIsFav(!!data.marcas?.[k]?.favorito);
    } catch { setIsFav(false); }
  }, [livroAbreviacao, capitulo, versiculo, traducao]);

  useEffect(() => { checkFav(); }, [checkFav]);

  const references = useMemo(
    () => getCrossReferencesByVerse(livroAbreviacao, capitulo, versiculo),
    [livroAbreviacao, capitulo, versiculo]
  );

  const refsByType = useMemo(() => {
    const grouped: Record<string, CrossReference[]> = {};
    for (const r of references) {
      if (!grouped[r.type]) grouped[r.type] = [];
      grouped[r.type].push(r);
    }
    return grouped;
  }, [references]);

  const TYPE_LABELS: Record<string, string> = {
    parallel: 'Paralelos',
    fulfillment: 'Cumprimento',
    quotation: 'Citação',
    contrast: 'Contraste',
    thematic: 'Temático',
    typology: 'Tipologia',
  };

  const TYPE_ICONS: Record<string, string> = {
    parallel: '↔',
    fulfillment: '✓',
    quotation: '❝',
    contrast: '⚡',
    thematic: '🔗',
    typology: '📜',
  };

  const copyVerse = useCallback(() => {
    navigator.clipboard.writeText(`"${texto}" — ${ref} (${traducao})`);
  }, [texto, ref, traducao]);

  const handleFav = useCallback(() => {
    toggleFavorito(livroAbreviacao, capitulo, versiculo, traducao, texto);
    checkFav();
  }, [livroAbreviacao, capitulo, versiculo, traducao, texto, checkFav]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full sm:max-w-lg max-h-[85vh] bg-[var(--surface-raised)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Drag handle (mobile) */}
          <div className="sm:hidden flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full bg-[var(--content-muted)]/30" />
          </div>
          {/* Header */}
          <div className="shrink-0 px-5 pt-5 pb-3 border-b border-[var(--border)]/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)]">
                  {ref}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">{traducao}</span>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Fechar">
                <X className="w-4 h-4 text-[var(--content-muted)]" />
              </button>
            </div>

            {/* Verse text */}
            <blockquote className="font-serif-body text-[var(--content-primary)] leading-relaxed text-[15px] border-l-2 border-[var(--brand-default)] pl-3 italic">
              &ldquo;{texto}&rdquo;
            </blockquote>

            {/* Quick actions */}
            <div className="flex items-center gap-2 mt-3">
              <button onClick={copyVerse} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-default)] transition-colors">
                <Copy className="w-3 h-3" />Copiar
              </button>
              <button onClick={handleFav} className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors',
                isFav ? 'bg-rose-500/10 text-rose-500' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-rose-500/10 hover:text-rose-500'
              )}>
                <Heart className={cn('w-3 h-3', isFav && 'fill-current')} />{isFav ? 'Favoritado' : 'Favoritar'}
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-default)] transition-colors">
                <Share2 className="w-3 h-3" />Compartilhar
              </button>
            </div>
          </div>

          {/* Section tabs */}
          <div className="shrink-0 flex border-b border-[var(--border)]/50">
            {([
              { id: 'refs' as const, label: 'Ref. Cruzadas', icon: Link2, count: references.length },
              { id: 'comments' as const, label: 'Comentários', icon: MessageSquare },
              { id: 'context' as const, label: 'Contexto', icon: BookOpen },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-semibold transition-all border-b-2',
                  activeSection === tab.id
                    ? 'border-[var(--brand-default)] text-[var(--brand-default)] bg-[var(--brand-subtle)]/30'
                    : 'border-transparent text-[var(--content-muted)] hover:text-[var(--content-secondary)]'
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)]">{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeSection === 'refs' && (
              <>
                {references.length === 0 ? (
                  <p className="text-center text-sm text-[var(--content-muted)] py-8">Nenhuma referência cruzada encontrada para este versículo.</p>
                ) : (
                  Object.entries(refsByType).map(([type, refs]) => (
                    <div key={type}>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2 flex items-center gap-1.5">
                        <span>{TYPE_ICONS[type]}</span>
                        {TYPE_LABELS[type] || type}
                        <span className="text-[9px] font-normal px-1.5 py-0.5 rounded-full bg-[var(--surface-sunken)]">{refs.length}</span>
                      </h4>
                      <div className="space-y-1.5">
                        {refs.map((r, i) => {
                          const isExpanded = expandedRef === r.to;
                          return (
                            <div key={i} className="rounded-lg border border-[var(--border)]/40 overflow-hidden">
                              <button
                                onClick={() => setExpandedRef(isExpanded ? null : r.to)}
                                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--surface-sunken)]/50 transition-colors text-left"
                              >
                                <span className="text-[10px] font-bold text-[var(--brand-default)]">{formatReference(r.to)}</span>
                                {r.description && <span className="text-[10px] text-[var(--content-muted)] truncate flex-1">{r.description}</span>}
                                {isExpanded ? <ChevronUp className="w-3 h-3 shrink-0 text-[var(--content-muted)]" /> : <ChevronDown className="w-3 h-3 shrink-0 text-[var(--content-muted)]" />}
                              </button>
                              <AnimatePresence>
                                {isExpanded && r.description && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="px-3 pb-2 text-xs text-[var(--content-secondary)] leading-relaxed font-serif-body">
                                      {r.description}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {activeSection === 'comments' && (
              <div className="text-center py-8">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-[var(--content-muted)]" strokeWidth={1} />
                <p className="text-sm text-[var(--content-muted)] mb-2">Comentários disponíveis no painel lateral</p>
                <button
                  onClick={() => { onClose(); }}
                  className="text-xs font-medium text-[var(--brand-default)] hover:underline"
                >
                  Abrir painel de comentários →
                </button>
              </div>
            )}

            {activeSection === 'context' && (
              <div className="space-y-3">
                <div className="rounded-xl bg-[var(--surface-sunken)]/50 p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" />Referência
                  </h4>
                  <p className="text-sm font-medium text-[var(--content-primary)]">{ref}</p>
                  <p className="text-xs text-[var(--content-muted)] mt-1">{traducao}</p>
                </div>
                <div className="rounded-xl bg-[var(--surface-sunken)]/50 p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2 flex items-center gap-1.5">
                    <Languages className="w-3 h-3" />Palavras Originais
                  </h4>
                  <p className="text-xs text-[var(--content-secondary)] leading-relaxed">
                    Clique em qualquer palavra no texto para ver o léxico original (Strong&apos;s) com transliteração, definição e morfologia.
                  </p>
                </div>
                <div className="rounded-xl bg-[var(--surface-sunken)]/50 p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />Referências
                  </h4>
                  <p className="text-xs text-[var(--content-secondary)] leading-relaxed">
                    Explore referências cruzadas e estudos relacionados a este versículo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
