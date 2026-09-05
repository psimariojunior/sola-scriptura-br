'use client';

import { useState, useCallback, useRef } from 'react';

export interface AIVerseRef {
  referencia: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  texto?: string;
  relevancia: 'alta' | 'media' | 'baixa';
}

export interface AISearchState {
  streaming: boolean;
  explicacao: string;
  versiculos: AIVerseRef[];
  error: string | null;
  tempoMs: number;
}

export function useAISearch() {
  const [state, setState] = useState<AISearchState>({
    streaming: false,
    explicacao: '',
    versiculos: [],
    error: null,
    tempoMs: 0,
  });
  const abortRef = useRef<AbortController | null>(null);
  const startTimeRef = useRef<number>(0);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    startTimeRef.current = Date.now();

    setState(prev => ({ ...prev, streaming: true, error: null }));

    try {
      const res = await fetch('/api/ia/pesquisa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        throw new Error('Erro ao conectar com a IA');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Resposta vazia');

      const decoder = new TextDecoder();
      let buffer = '';
      let explicacao = '';
      let versiculos: AIVerseRef[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const linhas = buffer.split('\n');
        buffer = linhas.pop() || '';

        for (const linha of linhas) {
          if (linha.startsWith('data: ')) {
            try {
              const json = JSON.parse(linha.slice(6));
              if (json.tipo === 'token' && json.dados?.token) {
                explicacao += json.dados.token;
                setState(prev => ({ ...prev, explicacao }));
              } else if (json.tipo === 'versiculos' && json.dados?.versiculos) {
                versiculos = json.dados.versiculos;
                setState(prev => ({ ...prev, versiculos }));
              } else if (json.tipo === 'completo') {
                explicacao = json.dados?.explicacao || explicacao;
                setState(prev => ({
                  ...prev,
                  explicacao,
                  streaming: false,
                  tempoMs: Date.now() - startTimeRef.current,
                }));
              } else if (json.tipo === 'erro') {
                setState(prev => ({
                  ...prev,
                  error: json.dados?.message || 'Erro ao processar',
                  streaming: false,
                }));
              }
            } catch { /* skip invalid JSON */ }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setState(prev => ({
          ...prev,
          error: err.message || 'Erro ao conectar com a IA',
          streaming: false,
        }));
      }
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setState(prev => ({ ...prev, streaming: false }));
  }, []);

  const clear = useCallback(() => {
    setState({
      streaming: false,
      explicacao: '',
      versiculos: [],
      error: null,
      tempoMs: 0,
    });
  }, []);

  return { ...state, search, cancel, clear };
}
