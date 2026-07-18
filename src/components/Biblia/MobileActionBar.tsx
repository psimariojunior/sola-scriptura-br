'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, StickyNote, Languages, Share2, BookOpen, GraduationCap, Palette, Copy, X, Sparkles, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';
import { useState } from 'react';
import { CORES, setMarcador, removeMarcador, getMarcador, type CorMarcador } from '@/lib/marcadores';
import { toggleFavorito } from '@/lib/estudos';
import { temComentario } from '@/data/comentarios';
import { temEstudo } from '@/data/estudosTeologicos';

const corMap: Record<CorMarcador, string> = {
  yellow: 'bg-yellow-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  pink: 'bg-pink-400',
  orange: 'bg-orange-400',
  purple: 'bg-purple-400',
};

export interface MobileActionBarProps {
  selected: { livro: string; livroNome: string; livroAbreviacao: string; capitulo: number; versiculo: number; traducao: string; texto: string } | null;
  onClose: () => void;
  audioNatural: ReturnType<typeof useAudioNatural>;
  audio: ReturnType<typeof useVerseAudio>;
  flashcards: ReturnType<typeof useFlashcards>;
  isFavorito: boolean;
  onFavoritoChange: () => void;
  onAnotar: () => void;
  onStrong: () => void;
  onComentarios: () => void;
  onToggleEstudo: () => void;
  onApresentar: () => void;
  onCompartilharImagem: () => void;
  onAprofundar: () => void;
  copyVerse: (text: string, ref: string) => void;
  copiedVerse: string | null;
}

export function MobileActionBar({
  selected,
  onClose,
  audioNatural,
  audio,
  flashcards,
  isFavorito,
  onFavoritoChange,
  onAnotar,
  onStrong,
  onComentarios,
  onToggleEstudo,
  onApresentar,
  onCompartilharImagem,
  onAprofundar,
  copyVerse,
  copiedVerse,
}: MobileActionBarProps) {
  const [colorOpen, setColorOpen] = useState(false);

  if (!selected) return null;
  const { livroNome, livroAbreviacao, capitulo, versiculo, traducao, texto } = selected;
  const corAtual = getMarcador(livroAbreviacao, capitulo, versiculo, traducao)?.cor ?? null;
  const ref = `${livroNome} ${capitulo}:${versiculo}`;
  const flashKey = `${livroAbreviacao}:${capitulo}:${versiculo}:${traducao}`;
  const isFlashcard = flashcards.cards.find((c) => c.verseKey === flashKey);

  return (
    <AnimatePresence>
      {selected && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe bg-[var(--surface-raised)] border-t border-[var(--border)] rounded-t-2xl shadow-2xl"
            role="dialog"
            aria-label={`Ações para ${ref}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]/50">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[var(--content-muted)] font-medium uppercase tracking-wider">
                  Versículo {versiculo}
                </p>
                <p className="text-sm font-display text-[var(--brand-default)] truncate">
                  {ref}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)]"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <p className="text-sm font-serif-body leading-relaxed text-[var(--content-primary)] italic mb-4">
                "{texto}"
              </p>

              <motion.button
                onClick={onAprofundar}
                whileTap={{ scale: 0.97 }}
                className="w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] text-[var(--brand-contrast)] font-semibold shadow-md shadow-[var(--brand-default)]/20 hover:shadow-lg transition-shadow"
              >
                <Sparkles className="w-4 h-4" />
                Aprofundar com IA
              </motion.button>

              <AnimatePresence>
                {colorOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--surface-sunken)]/60">
                      <span className="text-xs text-[var(--content-muted)] font-medium">Cor:</span>
                      {CORES.map((cor) => {
                        const ativa = corAtual === cor;
                        return (
                          <button
                            key={cor}
                            onClick={() => {
                              if (ativa) removeMarcador(livroAbreviacao, capitulo, versiculo, traducao);
                              else setMarcador(livroAbreviacao, capitulo, versiculo, traducao, cor);
                              setColorOpen(false);
                            }}
                            className={cn(
                              'w-7 h-7 rounded-full transition-all',
                              corMap[cor],
                              ativa && 'ring-2 ring-offset-1 ring-[var(--brand-default)]'
                            )}
                            aria-label={`Cor ${cor}`}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-4 gap-2">
                <ActionTile
                  icon={Heart}
                  label="Favorito"
                  active={isFavorito}
                  activeColor="bg-red-500"
                  onClick={() => {
                    toggleFavorito(livroAbreviacao, capitulo, versiculo, traducao, texto);
                    onFavoritoChange();
                  }}
                />
                <ActionTile
                  icon={StickyNote}
                  label="Anotar"
                  onClick={onAnotar}
                />
                <ActionTile
                  icon={Palette}
                  label="Cor"
                  active={!!corAtual}
                  onClick={() => setColorOpen(!colorOpen)}
                />
                <ActionTile
                  icon={Copy}
                  label="Copiar"
                  onClick={() => copyVerse(texto, ref)}
                />
                <ActionTile
                  icon={Languages}
                  label="Léxico"
                  onClick={onStrong}
                />
                {temComentario(livroAbreviacao, capitulo, versiculo) && (
                  <ActionTile
                    icon={MessageSquare}
                    label="Comentário"
                    onClick={onComentarios}
                  />
                )}
                {temEstudo(livroAbreviacao, capitulo, versiculo) && (
                  <ActionTile
                    icon={GraduationCap}
                    label="Estudo"
                    onClick={onToggleEstudo}
                  />
                )}
                <ActionTile
                  icon={Share2}
                  label="Compartilhar"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: ref, text: `${ref}\n\n${texto}` });
                    } else {
                      copyVerse(texto, ref);
                    }
                  }}
                />
                <ActionTile
                  icon={Sparkles}
                  label="Apresentar"
                  onClick={onApresentar}
                />
                <ActionTile
                  icon={ImageIcon}
                  label="Imagem"
                  onClick={onCompartilharImagem}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ActionTileProps {
  icon: typeof Heart;
  label: string;
  active?: boolean;
  activeColor?: string;
  onClick: () => void;
}

function ActionTile({ icon: Icon, label, active, activeColor, onClick }: ActionTileProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl',
        'transition-colors duration-200',
        active
          ? cn('text-white', activeColor || 'bg-[var(--brand-default)]')
          : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-default)]'
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[10px] font-medium">{label}</span>
    </motion.button>
  );
}
