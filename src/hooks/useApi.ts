'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  biblia,
  teologia,
  personagens,
  cronologia,
  type Traducao,
  type Livro,
  type Versiculo,
  type Doutrina,
  type Personagem,
  type EventoCronologico,
  ApiError,
} from '@/lib/api-client';

interface UseQueryState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

function useQuery<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): UseQueryState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseQueryState<T>>({
    data: null,
    error: null,
    loading: true,
  });
  const mountedRef = useRef(true);

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetcher();
      if (mountedRef.current) setState({ data, error: null, loading: false });
    } catch (error) {
      if (mountedRef.current) {
        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          loading: false,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    execute();
    return () => { mountedRef.current = false; };
  }, [execute]);

  return { ...state, refetch: execute };
}

// ── Bible hooks ──────────────────────────────────────────────────────────

const LOCAL_TRADS: Traducao[] = [
  { id: 'arc', nome: 'Almeida Revista e Corrigida', sigla: 'ARC', descricao: 'Tradução clássica', idioma: 'pt-BR', ano: 1898 },
  { id: 'kjv', nome: 'King James Version', sigla: 'KJV', descricao: 'Authorized Version', idioma: 'en', ano: 1611 },
  { id: 'web', nome: 'World English Bible', sigla: 'WEB', descricao: 'Domínio público', idioma: 'en', ano: 2000 },
];

export function useTraducoes() {
  const result = useQuery(() => biblia.getTraducoes());
  return {
    ...result,
    data: result.data ?? LOCAL_TRADS,
  };
}

const LOCAL_LIVROS: Livro[] = [
  { nome: 'Gênesis', abreviacao: 'gn', testamento: 'AT', totalCapitulos: 50, ordem: 1 },
  { nome: 'Êxodo', abreviacao: 'ex', testamento: 'AT', totalCapitulos: 40, ordem: 2 },
  { nome: 'Mateus', abreviacao: 'mt', testamento: 'NT', totalCapitulos: 28, ordem: 40 },
  { nome: 'Marcos', abreviacao: 'mc', testamento: 'NT', totalCapitulos: 16, ordem: 41 },
  { nome: 'Lucas', abreviacao: 'lc', testamento: 'NT', totalCapitulos: 24, ordem: 42 },
  { nome: 'João', abreviacao: 'jo', testamento: 'NT', totalCapitulos: 21, ordem: 43 },
  { nome: 'Romanos', abreviacao: 'rm', testamento: 'NT', totalCapitulos: 16, ordem: 45 },
];

export function useLivros() {
  const result = useQuery(() => biblia.getLivros());
  return {
    ...result,
    data: result.data ?? LOCAL_LIVROS,
  };
}

export function useVersiculos(capituloId: string | null) {
  const result = useQuery(
    () => (capituloId ? biblia.getVersiculos(capituloId) : Promise.resolve(null)),
    [capituloId]
  );
  return result;
}

// ── Theology hooks ───────────────────────────────────────────────────────

export function useDoutrinas(categoriaId?: string) {
  const result = useQuery(
    () => teologia.getDoutrinas(categoriaId),
    [categoriaId]
  );
  return result;
}

// ── Characters hooks ─────────────────────────────────────────────────────

export function usePersonagens() {
  return useQuery(() => personagens.getPersonagens());
}

export function usePersonagem(id: string | null) {
  return useQuery(
    () => (id ? personagens.getPersonagem(id) : Promise.resolve(null)),
    [id]
  );
}

// ── Timeline hooks ───────────────────────────────────────────────────────

export function useEventos() {
  return useQuery(() => cronologia.getEventos());
}

// ── Error helper ─────────────────────────────────────────────────────────

export function getApiErrorMessage(error: Error | null): string | null {
  if (!error) return null;
  if (error instanceof ApiError) {
    return `Erro ${error.status}: ${error.message}`;
  }
  return error.message || 'Erro desconhecido';
}
