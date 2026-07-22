'use client';

import { useState, useEffect, useCallback } from 'react';
import { useNotas } from '@/hooks/useNotas';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import type { Nota } from '@/components/NotaEditor';
import type { SidePanelWidth } from '@/components/Biblia/SidePanel';

export interface UseBibliaVerseReturn {
  versiculoSelecionado: {
    livro: string;
    livroNome: string;
    livroAbreviacao: string;
    capitulo: number;
    versiculo: number;
    traducao: string;
    texto: string;
  } | null;
  setVersiculoSelecionado: React.Dispatch<React.SetStateAction<{
    livro: string;
    livroNome: string;
    livroAbreviacao: string;
    capitulo: number;
    versiculo: number;
    traducao: string;
    texto: string;
  } | null>>;
  anotandoVersiculo: string | null;
  setAnotandoVersiculo: React.Dispatch<React.SetStateAction<string | null>>;
  anotacaoTexto: string;
  setAnotacaoTexto: React.Dispatch<React.SetStateAction<string>>;
  copiedVerse: string | null;
  setCopiedVerse: React.Dispatch<React.SetStateAction<string | null>>;
  comentarioVersiculo: number | null;
  setComentarioVersiculo: React.Dispatch<React.SetStateAction<number | null>>;
  estudoAberto: number | null;
  setEstudoAberto: React.Dispatch<React.SetStateAction<number | null>>;
  notaAtiva: Nota | null;
  setNotaAtiva: React.Dispatch<React.SetStateAction<Nota | null>>;
  handleSelectVerse: (v: { livro: string; livroNome: string; livroAbreviacao: string; cap: number; ver: number; traducao: string; texto: string }) => void;
  handleSelectFromList: (livro: string, cap: number, ver: number, traducao: string, texto: string) => void;
  copyVerse: (text: string, reference: string) => Promise<void>;
  shareVerse: (text: string, reference: string) => Promise<void>;
  recentSearches: Array<{ query: string; livro: string; nome: string; cap: number; versiculo: number }>;
  setRecentSearches: React.Dispatch<React.SetStateAction<Array<{ query: string; livro: string; nome: string; cap: number; versiculo: number }>>>;
  notas: ReturnType<typeof useNotas>['notas'];
  criarNota: ReturnType<typeof useNotas>['criarNota'];
  salvarNotaHook: ReturnType<typeof useNotas>['salvarNota'];
  excluirNota: ReturnType<typeof useNotas>['excluirNota'];
}

interface UseBibliaVerseParams {
  setSidePanelTab: React.Dispatch<React.SetStateAction<'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto' | null>>;
  setSidePanelWidth: React.Dispatch<React.SetStateAction<SidePanelWidth>>;
}

export function UseBibliaVerse({
  setSidePanelTab,
  setSidePanelWidth,
}: UseBibliaVerseParams): UseBibliaVerseReturn {
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<{
    livro: string;
    livroNome: string;
    livroAbreviacao: string;
    capitulo: number;
    versiculo: number;
    traducao: string;
    texto: string;
  } | null>(null);
  const [anotandoVersiculo, setAnotandoVersiculo] = useState<string | null>(null);
  const [anotacaoTexto, setAnotacaoTexto] = useState('');
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const [comentarioVersiculo, setComentarioVersiculo] = useState<number | null>(null);
  const [estudoAberto, setEstudoAberto] = useState<number | null>(null);
  const [notaAtiva, setNotaAtiva] = useState<Nota | null>(null);
  const { notas, criarNota, salvarNota: salvarNotaHook, excluirNota } = useNotas();
  const [recentSearches, setRecentSearches] = useState<Array<{ query: string; livro: string; nome: string; cap: number; versiculo: number }>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_recent_searches');
      if (raw) setRecentSearches(JSON.parse(raw));
    } catch {}
  }, []);

  const handleSelectVerse = useCallback((v: { livro: string; livroNome: string; livroAbreviacao: string; cap: number; ver: number; traducao: string; texto: string }) => {
    setVersiculoSelecionado({ ...v, capitulo: v.cap, versiculo: v.ver });
  }, []);

  const handleSelectFromList = useCallback((livro: string, cap: number, ver: number, traducao: string, texto: string) => {
    try {
      const livroInfo = livroPorAbreviacao.get(livro);
      const livroNome = livroInfo?.nome || livro;
      setVersiculoSelecionado({ livro, livroNome, livroAbreviacao: livro, capitulo: cap, versiculo: ver, traducao, texto });
      setSidePanelTab('comentarios');
      setSidePanelWidth('half');
    } catch (e) {
      console.error('Erro ao selecionar versículo:', e);
    }
  }, [setSidePanelTab, setSidePanelWidth]);

  const copyVerse = useCallback(async (text: string, reference: string) => {
    await navigator.clipboard.writeText(`${reference}\n${text}`);
    setCopiedVerse(reference);
    setTimeout(() => setCopiedVerse(null), 2000);
  }, []);

  const shareVerse = useCallback(async (text: string, reference: string) => {
    if (navigator.share) await navigator.share({ title: reference, text: `${reference}\n\n${text}` });
  }, []);

  return {
    versiculoSelecionado,
    setVersiculoSelecionado,
    anotandoVersiculo,
    setAnotandoVersiculo,
    anotacaoTexto,
    setAnotacaoTexto,
    copiedVerse,
    setCopiedVerse,
    comentarioVersiculo,
    setComentarioVersiculo,
    estudoAberto,
    setEstudoAberto,
    notaAtiva,
    setNotaAtiva,
    handleSelectVerse,
    handleSelectFromList,
    copyVerse,
    shareVerse,
    recentSearches,
    setRecentSearches,
    notas,
    criarNota,
    salvarNotaHook,
    excluirNota,
  };
}
