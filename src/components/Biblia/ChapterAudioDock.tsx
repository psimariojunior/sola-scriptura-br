'use client';

import { Pause, Play, Square, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterAudioDockProps {
  livroNome: string;
  capitulo: number;
  versiculoAtual: number;
  totalVersiculos: number;
  isPlaying: boolean;
  isLoading: boolean;
  speechFallback?: boolean;
  onToggle: () => void;
  onStop: () => void;
  onPrevVerse: () => void;
  onNextVerse: () => void;
}

export function ChapterAudioDock({
  livroNome,
  capitulo,
  versiculoAtual,
  totalVersiculos,
  isPlaying,
  isLoading,
  speechFallback = false,
  onToggle,
  onStop,
  onPrevVerse,
  onNextVerse,
}: ChapterAudioDockProps) {
  return (
    <div className="fixed left-0 right-0 z-30 px-3 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-lg rounded-2xl border border-[var(--border)]/50 bg-[var(--surface-raised)]/95 backdrop-blur-md shadow-xl shadow-black/10 px-3 py-2.5 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95',
            'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md shadow-[var(--brand-default)]/25'
          )}
          aria-label={isPlaying ? 'Pausar' : 'Continuar'}
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-[var(--content-primary)] truncate">
            {livroNome} {capitulo}
          </p>
          <p className="text-[10px] text-[var(--content-muted)] tabular-nums">
            Versículo {versiculoAtual} de {totalVersiculos}
            {speechFallback ? ' · voz do aparelho' : ''}
          </p>
          {speechFallback && (
            <p className="text-[10px] text-amber-700 dark:text-amber-300/90">
              Sem áudio do servidor — usando a voz do navegador.
            </p>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <button type="button" onClick={onPrevVerse} className="p-2 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" aria-label="Versículo anterior">
            <ChevronUp className="w-4 h-4" />
          </button>
          <button type="button" onClick={onNextVerse} className="p-2 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" aria-label="Próximo versículo">
            <ChevronDown className="w-4 h-4" />
          </button>
          <button type="button" onClick={onStop} className="p-2 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]" aria-label="Parar">
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
