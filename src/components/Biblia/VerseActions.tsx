'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  StickyNote,
  Copy,
  Check,
  Share2,
  Palette,
  Brain,
  GraduationCap,
  BookOpen,
  Languages,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CORES, setMarcador, removeMarcador, getMarcador, type CorMarcador } from '@/lib/marcadores';
import { toggleFavorito, obterMarca } from '@/lib/estudos';
import { temComentario } from '@/data/comentarios';
import { temEstudo } from '@/data/estudosTeologicos';
import VersiculoAudioNatural from '@/components/VersiculoAudioNatural';
import { CompartilharVersiculo } from '@/components/CompartilharVersiculo';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';

const corMap: Record<CorMarcador, string> = {
  yellow: 'bg-yellow-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  pink: 'bg-pink-400',
  orange: 'bg-orange-400',
  purple: 'bg-purple-400',
};

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  activeColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  ariaLabel: string;
  ariaPressed?: boolean;
  children?: React.ReactNode;
}

function ActionButton({ icon: Icon, label, active, activeColor, onClick, ariaLabel, ariaPressed, children }: ActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'group relative inline-flex items-center justify-center rounded-lg p-2',
        'transition-all duration-200',
        active
          ? cn('text-white shadow-sm', activeColor || 'bg-[var(--brand-default)]/90')
          : 'text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--brand-subtle)]'
      )}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      title={label}
    >
      <Icon className="w-3.5 h-3.5" />
      {children}
    </motion.button>
  );
}

export interface VerseActionsProps {
  livro: string;
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  texto: string;
  audioNatural: ReturnType<typeof useAudioNatural>;
  audio: ReturnType<typeof useVerseAudio>;
  flashcards: ReturnType<typeof useFlashcards>;
  isFavorito: boolean;
  onFavoritoChange: () => void;
  onAnotar: () => void;
  onStrong: () => void;
  onComentarios: () => void;
  onEstudos: () => void;
  onSelected: () => void;
  temAnotacao: boolean;
  copyVerse: (text: string, ref: string) => void;
  copiedVerse: string | null;
  verseKey: string;
  variant?: 'inline' | 'floating';
}

export function VerseActions({
  livro,
  livroNome,
  livroAbreviacao,
  capitulo,
  versiculo,
  traducao,
  texto,
  audioNatural,
  audio,
  flashcards,
  isFavorito,
  onFavoritoChange,
  onAnotar,
  onStrong,
  onComentarios,
  onEstudos,
  onSelected,
  temAnotacao,
  copyVerse,
  copiedVerse,
  verseKey,
  variant = 'inline',
}: VerseActionsProps) {
  const [colorOpen, setColorOpen] = useState(false);
  const corAtual = getMarcador(livroAbreviacao, capitulo, versiculo, traducao)?.cor ?? null;
  const ref = `${livroNome} ${capitulo}:${versiculo}`;
  const flashKey = `${livroAbreviacao}:${capitulo}:${versiculo}:${traducao}`;
  const isFlashcard = flashcards.cards.find((c) => c.verseKey === flashKey);
  const isPlaying = audio.isVersePlaying?.(versiculo) ?? false;
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!colorOpen) return;
    const handler = (e: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setColorOpen(false);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [colorOpen]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'flex items-center gap-0.5 shrink-0',
        variant === 'inline'
          ? 'hidden lg:flex lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-opacity duration-200'
          : 'flex opacity-100'
      )}
    >
      <VersiculoAudioNatural
        text={texto}
        verseNumber={versiculo}
        isCurrentlyPlaying={audioNatural.state.isPlaying}
        isLoading={audioNatural.state.isLoading}
        engine={audioNatural.state.engine}
        onPlay={() => audioNatural.play(texto)}
        onStop={() => audioNatural.stop()}
        onSpeedChange={(s) => audioNatural.setSpeed(s)}
        currentSpeed={audioNatural.state.speed}
      />

      <ActionButton
        icon={isPlaying ? BookOpen : BookOpen}
        label="Selecionar"
        onClick={onSelected}
        ariaLabel={`Selecionar versículo ${versiculo}`}
      />

      <CompartilharVersiculo
        livro={livroNome}
        capítulo={capitulo}
        versículo={versiculo}
        texto={texto}
      />

      <div className="relative" ref={colorRef}>
        <ActionButton
          icon={Palette}
          label="Cor"
          active={!!corAtual}
          activeColor={corAtual ? corMap[corAtual as CorMarcador] : undefined}
          onClick={(e) => {
            e.stopPropagation();
            setColorOpen(!colorOpen);
          }}
          ariaLabel={`Marcar versículo ${versiculo} com cor`}
          ariaPressed={!!corAtual}
        />
        <AnimatePresence>
          {colorOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1.5 z-30 bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg shadow-xl p-2 flex gap-1.5"
            >
              {CORES.map((cor) => {
                const ativa = corAtual === cor;
                return (
                  <motion.button
                    key={cor}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (ativa) removeMarcador(livroAbreviacao, capitulo, versiculo, traducao);
                      else setMarcador(livroAbreviacao, capitulo, versiculo, traducao, cor);
                      setColorOpen(false);
                    }}
                    className={cn(
                      'w-5 h-5 rounded-full transition-all duration-200',
                      corMap[cor],
                      ativa && 'ring-2 ring-offset-1 ring-[var(--brand-default)]'
                    )}
                    title={cor}
                    aria-label={`Cor ${cor}`}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ActionButton
        icon={Heart}
        label={isFavorito ? 'Favorito' : 'Favoritar'}
        active={isFavorito}
        activeColor="bg-red-500"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorito(livroAbreviacao, capitulo, versiculo, traducao, texto);
          onFavoritoChange();
        }}
        ariaLabel={isFavorito ? `Remover versículo ${versiculo} dos favoritos` : `Adicionar versículo ${versiculo} aos favoritos`}
        ariaPressed={isFavorito}
      />

      <ActionButton
        icon={StickyNote}
        label="Anotar"
        active={temAnotacao}
        activeColor="bg-amber-500"
        onClick={(e) => {
          e.stopPropagation();
          onAnotar();
        }}
        ariaLabel={`Anotar versículo ${versiculo}`}
      />

      <ActionButton
        icon={Copy}
        label="Copiar"
        active={copiedVerse === ref}
        onClick={(e) => {
          e.stopPropagation();
          copyVerse(texto, ref);
        }}
        ariaLabel={copiedVerse === ref ? `Versículo ${versiculo} copiado` : `Copiar versículo ${versiculo}`}
      />

      <ActionButton
        icon={Languages}
        label="Léxico"
        onClick={(e) => {
          e.stopPropagation();
          onStrong();
        }}
        ariaLabel={`Léxico de Strong do versículo ${versiculo}`}
      />

      {temComentario(livroAbreviacao, capitulo, versiculo) && (
        <ActionButton
          icon={BookOpen}
          label="Comentário"
          onClick={(e) => {
            e.stopPropagation();
            onComentarios();
          }}
          ariaLabel={`Ver comentário do versículo ${versiculo}`}
        />
      )}

      {temEstudo(livroAbreviacao, capitulo, versiculo) && (
        <ActionButton
          icon={GraduationCap}
          label="Estudo"
          onClick={(e) => {
            e.stopPropagation();
            onEstudos();
          }}
          ariaLabel={`Estudos teológicos do versículo ${versiculo}`}
        />
      )}

      <ActionButton
        icon={Brain}
        label={isFlashcard ? 'Remover flashcard' : 'Adicionar flashcard'}
        active={!!isFlashcard}
        activeColor="bg-cyan-500"
        onClick={(e) => {
          e.stopPropagation();
          if (isFlashcard) flashcards.removeCard(flashKey);
          else flashcards.addCard(flashKey, texto, ref);
        }}
        ariaLabel={isFlashcard ? `Remover versículo ${versiculo} dos flashcards` : `Adicionar versículo ${versiculo} aos flashcards`}
        ariaPressed={!!isFlashcard}
      />
    </div>
  );
}
