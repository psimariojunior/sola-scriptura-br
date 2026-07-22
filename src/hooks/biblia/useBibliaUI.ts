'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ModoLeituraValue } from '@/components/Biblia/ModoLeitura';
import type { CapituloComparado } from '@/data/biblia/texto/carregar';

export interface UseBibliaUIReturn {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  chapterGridOpen: boolean;
  setChapterGridOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  showDiff: boolean;
  setShowDiff: React.Dispatch<React.SetStateAction<boolean>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  zenMode: boolean;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;
  showInterlinear: boolean;
  setShowInterlinear: React.Dispatch<React.SetStateAction<boolean>>;
  showPlan: boolean;
  setShowPlan: React.Dispatch<React.SetStateAction<boolean>>;
  modoLeitura: ModoLeituraValue;
  setModoLeitura: React.Dispatch<React.SetStateAction<ModoLeituraValue>>;
  focusedVerse: number | null;
  setFocusedVerse: React.Dispatch<React.SetStateAction<number | null>>;
  highlightedVerse: number | null;
  setHighlightedVerse: React.Dispatch<React.SetStateAction<number | null>>;
  quickSearchOpen: boolean;
  setQuickSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tradOpen: boolean;
  setTradOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toolsOpen: boolean;
  setToolsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exportOpen: boolean;
  setExportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shareOpen: boolean;
  setShareOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarNotas: boolean;
  setMostrarNotas: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarNarracao: boolean;
  setMostrarNarracao: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarNarracaoCapitulo: boolean;
  setMostrarNarracaoCapitulo: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarApresentacao: boolean;
  setMostrarApresentacao: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarQualidadeAudio: boolean;
  setMostrarQualidadeAudio: React.Dispatch<React.SetStateAction<boolean>>;
  estudoCapituloAberto: boolean;
  setEstudoCapituloAberto: React.Dispatch<React.SetStateAction<boolean>>;
  chapterAnimProps: {
    initial: { opacity: number; x: number; filter: string };
    animate: { opacity: number; x: number; filter: string };
    exit: { opacity: number; x: number; filter: string };
    transition: { duration: number; ease: number[] };
  };
}

interface UseBibliaUIParams {
  capituloIdx: number;
  livroTotalCapitulos: number;
  livroAbreviacao: string;
  selectedTrads: string[];
  setSelectedTrads: React.Dispatch<React.SetStateAction<string[]>>;
  data: CapituloComparado[];
  chapterDirection: 'next' | 'prev';
  setChapterDirection: React.Dispatch<React.SetStateAction<'next' | 'prev'>>;
  setCapituloIdx: React.Dispatch<React.SetStateAction<number>>;
  versiculoSelecionado: { livro: string; capitulo: number; versiculo: number } | null;
  setVersiculoSelecionado: React.Dispatch<React.SetStateAction<{
    livro: string; livroNome: string; livroAbreviacao: string;
    capitulo: number; versiculo: number; traducao: string; texto: string;
  } | null>>;
  handleSelectFromList: (livro: string, cap: number, ver: number, traducao: string, texto: string) => void;
}

export function UseBibliaUI({
  capituloIdx,
  livroTotalCapitulos,
  livroAbreviacao,
  selectedTrads,
  setSelectedTrads,
  data,
  chapterDirection,
  setChapterDirection,
  setCapituloIdx,
  versiculoSelecionado,
  setVersiculoSelecionado,
  handleSelectFromList,
}: UseBibliaUIParams): UseBibliaUIReturn {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chapterGridOpen, setChapterGridOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDiff, setShowDiff] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return 17;
    return 18;
  });
  const [zenMode, setZenMode] = useState(false);
  const [showInterlinear, setShowInterlinear] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [modoLeitura, setModoLeitura] = useState<ModoLeituraValue>('foco');
  const [focusedVerse, setFocusedVerse] = useState<number | null>(null);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [tradOpen, setTradOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [mostrarNotas, setMostrarNotas] = useState(false);
  const [mostrarNarracao, setMostrarNarracao] = useState(false);
  const [mostrarNarracaoCapitulo, setMostrarNarracaoCapitulo] = useState(false);
  const [mostrarApresentacao, setMostrarApresentacao] = useState(false);
  const [mostrarQualidadeAudio, setMostrarQualidadeAudio] = useState(false);
  const [estudoCapituloAberto, setEstudoCapituloAberto] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setQuickSearchOpen(p => !p); return; }
    if (quickSearchOpen && e.key === 'Escape') { setQuickSearchOpen(false); return; }
    if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

    if (e.key === '/') { e.preventDefault(); setQuickSearchOpen(true); return; }
    if (e.key === 'z' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); setZenMode(p => !p); return; }

    const maxVersos = data[0]?.versiculos?.length ?? 0;

    if (e.key === 'ArrowLeft' && !e.shiftKey && capituloIdx > 0) {
      e.preventDefault();
      setChapterDirection('prev');
      setCapituloIdx(p => Math.max(0, p - 1));
      setFocusedVerse(null);
    } else if (e.key === 'ArrowRight' && !e.shiftKey && capituloIdx < livroTotalCapitulos - 1) {
      e.preventDefault();
      setChapterDirection('next');
      setCapituloIdx(p => p + 1);
      setFocusedVerse(null);
    } else if (e.key === 'ArrowDown' && e.shiftKey && maxVersos > 0) {
      e.preventDefault();
      setFocusedVerse(prev => {
        if (prev === null) return 1;
        return Math.min(maxVersos, prev + 1);
      });
    } else if (e.key === 'ArrowUp' && e.shiftKey && maxVersos > 0) {
      e.preventDefault();
      setFocusedVerse(prev => {
        if (prev === null) return 1;
        return Math.max(1, prev - 1);
      });
    } else if (e.key === 'Enter' && focusedVerse !== null) {
      e.preventDefault();
      const trad = selectedTrads[0] || 'arc';
      const texto = data[0]?.versiculos?.find(v => v.numero === focusedVerse)?.texto || '';
      handleSelectFromList(livroAbreviacao, capituloIdx + 1, focusedVerse, trad, texto);
    } else if (e.key === 'Escape') {
      setSidebarOpen(false); setMobileMenu(false); setChapterGridOpen(false);
      setMostrarNarracao(false); setMostrarNarracaoCapitulo(false);
      setVersiculoSelecionado(null); setFocusedVerse(null);
      setTradOpen(false); setToolsOpen(false); setExportOpen(false);
      setZenMode(false);
    }
  }, [capituloIdx, livroTotalCapitulos, quickSearchOpen, focusedVerse, selectedTrads, data, livroAbreviacao, handleSelectFromList, setCapituloIdx, setFocusedVerse, setVersiculoSelecionado, setChapterDirection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (versiculoSelecionado || mobileMenu || sidebarOpen || chapterGridOpen || mostrarApresentacao || mostrarNarracao || mostrarNarracaoCapitulo || zenMode) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0 && capituloIdx < livroTotalCapitulos - 1) {
          setChapterDirection('next');
          setCapituloIdx(p => p + 1);
          setFocusedVerse(null);
        } else if (deltaX > 0 && capituloIdx > 0) {
          setChapterDirection('prev');
          setCapituloIdx(p => Math.max(0, p - 1));
          setFocusedVerse(null);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [capituloIdx, livroTotalCapitulos, versiculoSelecionado, mobileMenu, sidebarOpen, chapterGridOpen, mostrarApresentacao, mostrarNarracao, mostrarNarracaoCapitulo, zenMode, setCapituloIdx, setFocusedVerse, setChapterDirection]);

  useEffect(() => {
    if (modoLeitura === 'comparacao' && selectedTrads.length < 2) {
      const fallbacks = ['nvi', 'ara', 'acf', 'arc', 'kjv'];
      const other = fallbacks.find(t => !selectedTrads.includes(t)) || 'nvi';
      setSelectedTrads(prev => prev.includes(other) ? prev : [...prev, other]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoLeitura]);

  const chapterAnimProps = {
    initial: { opacity: 0, x: chapterDirection === 'next' ? 40 : -40, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: chapterDirection === 'next' ? -40 : 40, filter: 'blur(4px)' },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    mobileMenu,
    setMobileMenu,
    chapterGridOpen,
    setChapterGridOpen,
    showSettings,
    setShowSettings,
    showDiff,
    setShowDiff,
    fontSize,
    setFontSize,
    zenMode,
    setZenMode,
    showInterlinear,
    setShowInterlinear,
    showPlan,
    setShowPlan,
    modoLeitura,
    setModoLeitura,
    focusedVerse,
    setFocusedVerse,
    highlightedVerse,
    setHighlightedVerse,
    quickSearchOpen,
    setQuickSearchOpen,
    tradOpen,
    setTradOpen,
    toolsOpen,
    setToolsOpen,
    exportOpen,
    setExportOpen,
    shareOpen,
    setShareOpen,
    mostrarNotas,
    setMostrarNotas,
    mostrarNarracao,
    setMostrarNarracao,
    mostrarNarracaoCapitulo,
    setMostrarNarracaoCapitulo,
    mostrarApresentacao,
    setMostrarApresentacao,
    mostrarQualidadeAudio,
    setMostrarQualidadeAudio,
    estudoCapituloAberto,
    setEstudoCapituloAberto,
    chapterAnimProps,
  };
}
