'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Comentario } from '@/data/comentarios';

let cachedComentarios: Record<string, Comentario[]> | null = null;
let promiseComentarios: Promise<typeof import('@/data/comentarios')> | null = null;

async function loadComentarios() {
  if (cachedComentarios) return cachedComentarios;
  if (!promiseComentarios) {
    promiseComentarios = import('@/data/comentarios');
  }
  const mod = await promiseComentarios;
  cachedComentarios = (mod as any).default || null;
  return cachedComentarios;
}

export function useComentariosLazy(livro: string, capitulo: number, versiculo: number) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/comentarios').then(mod => {
      if (cancelled) return;
      const result = mod.obterComentarios(livro, capitulo, versiculo);
      setComentarios(result);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [livro, capitulo, versiculo]);

  return { comentarios, loading };
}

export function useTemComentarioLazy(livro: string, capitulo: number, versiculo: number) {
  const [tem, setTem] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/comentarios').then(mod => {
      if (cancelled) return;
      setTem(mod.temComentario(livro, capitulo, versiculo));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [livro, capitulo, versiculo]);

  return { temComentario: tem, loading };
}

export function useTodosComentariosLazy() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/comentarios').then(mod => {
      if (cancelled) return;
      setComentarios(mod.obterTodosComentarios());
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { comentarios, loading };
}

export async function getComentariosLazy(livro: string, capitulo: number, versiculo: number): Promise<Comentario[]> {
  const mod = await import('@/data/comentarios');
  return mod.obterComentarios(livro, capitulo, versiculo);
}

export async function getTemComentarioLazy(livro: string, capitulo: number, versiculo: number): Promise<boolean> {
  const mod = await import('@/data/comentarios');
  return mod.temComentario(livro, capitulo, versiculo);
}

export async function getTodosComentariosLazy(): Promise<Comentario[]> {
  const mod = await import('@/data/comentarios');
  return mod.obterTodosComentarios();
}
