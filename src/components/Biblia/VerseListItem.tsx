'use client';

import { memo, useCallback } from 'react';
import { VerseCard } from './VerseCard';
import { labelMap, tradBadgeColors } from './TranslationDropdown';
import { getMarcador } from '@/lib/marcadores';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { useFlashcards } from '@/hooks/useFlashcards';

interface VerseListItemProps {
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
  isFocused: boolean;
  isFavorito: boolean;
  copiedVerse: string | null;
  audioNatural: ReturnType<typeof useAudioNatural>;
  audio: ReturnType<typeof useVerseAudio>;
  flashcards: ReturnType<typeof useFlashcards>;
  estudoAberto: boolean;
  isCurrentAudioVerse: boolean;
  hasResources: boolean;
  selectedTradsCount: number;
  onSelectFromList: (livro: string, cap: number, ver: number, traducao: string, texto: string) => void;
  onFavoritoChange: () => void;
  onSetAnotandoVersiculo: (key: string) => void;
  onSetAnotacaoTexto: (text: string) => void;
  onSetSidePanelWidth: (width: 'collapsed' | 'half' | 'full') => void;
  onSetSidePanelTab: (tab: 'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto' | null) => void;
  onSetComentarioVersiculo: (num: number | null) => void;
  onSetEstudoAberto: (num: number | null) => void;
  estudoAbertoState: number | null;
  copyVerse: (text: string, ref: string) => void;
  onCorMarcaChange?: () => void;
}

export const VerseListItem = memo(function VerseListItem({
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
  isFocused,
  isFavorito,
  copiedVerse,
  audioNatural,
  audio,
  flashcards,
  estudoAberto,
  isCurrentAudioVerse,
  hasResources,
  selectedTradsCount,
  onSelectFromList,
  onFavoritoChange,
  onSetAnotandoVersiculo,
  onSetAnotacaoTexto,
  onSetSidePanelWidth,
  onSetSidePanelTab,
  onSetComentarioVersiculo,
  onSetEstudoAberto,
  estudoAbertoState,
  copyVerse,
  onCorMarcaChange,
}: VerseListItemProps) {
  const verseKey = `${livroAbreviacao}:${capitulo}:${numero}:${traducao}`;
  const marcaMarcador = getMarcador(livroAbreviacao, capitulo, numero, traducao);

  const handleSelect = useCallback(() => {
    onSelectFromList(livroAbreviacao, capitulo, numero, traducao, texto);
  }, [onSelectFromList, livroAbreviacao, capitulo, numero, traducao, texto]);

  const handleAnotar = useCallback(() => {
    onSetAnotandoVersiculo(verseKey);
    onSetAnotacaoTexto('');
  }, [onSetAnotandoVersiculo, onSetAnotacaoTexto, verseKey]);

  const handleStrong = useCallback(() => {
    onSetSidePanelWidth('half');
    onSetSidePanelTab('strong');
  }, [onSetSidePanelWidth, onSetSidePanelTab]);

  const handleComentarios = useCallback(() => {
    onSetComentarioVersiculo(numero);
    onSetSidePanelWidth('half');
    onSetSidePanelTab('comentarios');
  }, [onSetComentarioVersiculo, onSetSidePanelWidth, onSetSidePanelTab, numero]);

  const handleToggleEstudo = useCallback(() => {
    onSetEstudoAberto(estudoAbertoState === numero ? null : numero);
  }, [onSetEstudoAberto, estudoAbertoState, numero]);

  return (
    <VerseCard
      numero={numero}
      texto={texto}
      livroAbreviacao={livroAbreviacao}
      livroNome={livroNome}
      capitulo={capitulo}
      traducao={traducao}
      fontSize={fontSize}
      isSelected={isSelected}
      isPlaying={isPlaying}
      isHighlighted={isHighlighted}
      isFocused={isFocused}
      isFavorito={isFavorito}
      corMarca={marcaMarcador?.cor ?? null}
      temAnotacao={false}
      copiedVerse={copiedVerse}
      audioNatural={audioNatural}
      audio={audio}
      flashcards={flashcards}
      estudoAberto={estudoAberto}
      onSelect={handleSelect}
      onFavoritoChange={onFavoritoChange}
      onAnotar={handleAnotar}
      onStrong={handleStrong}
      onComentarios={handleComentarios}
      onToggleEstudo={handleToggleEstudo}
      copyVerse={copyVerse}
      verseKey={verseKey}
      showTranslationLabel={selectedTradsCount > 1}
      tradLabel={labelMap[traducao] || traducao.toUpperCase()}
      tradBadgeColor={tradBadgeColors[traducao] || ''}
      isCurrentAudioVerse={isCurrentAudioVerse}
      hasResources={hasResources}
      onCorMarcaChange={onCorMarcaChange}
    />
  );
});
