'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Nota } from '@/components/NotaEditor';
import { downloadAsFile } from '@/lib/exportPdf';

const STORAGE_KEY = 'sola-notas';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

function obterToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sola-token');
}

function carregarNotasLocal(): Nota[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function salvarNotasLocal(notas: Nota[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
  } catch { /* storage full */ }
}

async function sincronizarComBackend(notas: Nota[]): Promise<Nota[]> {
  const token = obterToken();
  if (!token) return notas;

  try {
    const res = await fetch(`${API_BASE}/notas`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const remote = await res.json();
      if (remote?.data) {
        const merged = [...notas];
        for (const remoteNota of remote.data) {
          const existente = merged.find(n => n.id === remoteNota.id);
          if (!existente) {
            merged.push(remoteNota);
          } else if (new Date(remoteNota.dataAtualizacao) > new Date(existente.dataAtualizacao)) {
            Object.assign(existente, remoteNota);
          }
        }
        return merged;
      }
    }
  } catch { /* offline or error */ }

  return notas;
}

async function salvarNoBackend(nota: Nota): Promise<void> {
  const token = obterToken();
  if (!token) return;

  try {
    await fetch(`${API_BASE}/notas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nota),
      signal: AbortSignal.timeout(3000),
    });
  } catch { /* offline */ }
}

async function excluirNoBackend(id: string): Promise<void> {
  const token = obterToken();
  if (!token) return;

  try {
    await fetch(`${API_BASE}/notas/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(3000),
    });
  } catch { /* offline */ }
}

export function useNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const notasLocais = carregarNotasLocal();
    setNotas(notasLocais);
    setCarregado(true);

    sincronizarComBackend(notasLocais).then(sincronizadas => {
      setNotas(sincronizadas);
      salvarNotasLocal(sincronizadas);
    });
  }, []);

  const persistir = useCallback((novasNotas: Nota[]) => {
    setNotas(novasNotas);
    salvarNotasLocal(novasNotas);
  }, []);

  const criarNota = useCallback((titulo: string): Nota => {
    const novaNota: Nota = {
      id: crypto.randomUUID(),
      titulo,
      conteudo: '',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      tags: [],
      imagens: [],
      versoes: [],
    };
    const novasNotas = [novaNota, ...notas];
    persistir(novasNotas);
    salvarNoBackend(novaNota);
    return novaNota;
  }, [notas, persistir]);

  const salvarNota = useCallback((id: string, conteudo: string) => {
    const novasNotas = notas.map(n => {
      if (n.id !== id) return n;
      const agora = new Date().toISOString();
      return {
        ...n,
        conteudo,
        dataAtualizacao: agora,
        versoes: [
          ...n.versoes.slice(-19),
          { conteudo, data: agora },
        ],
      };
    });
    persistir(novasNotas);
    const notaSalva = novasNotas.find(n => n.id === id);
    if (notaSalva) salvarNoBackend(notaSalva);
  }, [notas, persistir]);

  const excluirNota = useCallback((id: string) => {
    const novasNotas = notas.filter(n => n.id !== id);
    persistir(novasNotas);
    excluirNoBackend(id);
  }, [notas, persistir]);

  const buscarNotas = useCallback((query: string): Nota[] => {
    if (!query.trim()) return notas;
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return notas.filter(n => {
      const tituloNorm = n.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const conteudoNorm = n.conteudo.replace(/<[^>]*>/g, '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const tagsStr = n.tags.join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return tituloNorm.includes(q) || conteudoNorm.includes(q) || tagsStr.includes(q);
    });
  }, [notas]);

  const filtrarPorTag = useCallback((tag: string): Nota[] => {
    if (!tag) return notas;
    return notas.filter(n => n.tags.includes(tag));
  }, [notas]);

  const exportarNota = useCallback((id: string, formato: string) => {
    const nota = notas.find(n => n.id === id);
    if (!nota) return;

    const conteudoLimpo = nota.conteudo.replace(/<[^>]*>/g, '');

    switch (formato) {
      case 'txt': {
        const txt = `${nota.titulo}\n${'='.repeat(nota.titulo.length)}\n\n${conteudoLimpo}\n\n---\nTags: ${nota.tags.join(', ')}\nCriado: ${new Date(nota.dataCriacao).toLocaleString('pt-BR')}`;
        downloadAsFile(txt, `${nota.titulo.substring(0, 50)}.txt`, 'text/plain;charset=utf-8');
        break;
      }
      case 'markdown': {
        const md = `# ${nota.titulo}\n\n${nota.conteudo}\n\n---\n*Tags: ${nota.tags.join(', ')}*\n*Criado: ${new Date(nota.dataCriacao).toLocaleString('pt-BR')}*`;
        downloadAsFile(md, `${nota.titulo.substring(0, 50)}.md`, 'text/markdown;charset=utf-8');
        break;
      }
      case 'html': {
        const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>${nota.titulo}</title><style>body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:2rem;line-height:1.8;color:#1a1612}h1{color:#3a2618}blockquote{border-left:3px solid #d4a843;padding-left:1rem;color:#7a6e62}footer{margin-top:2rem;color:#7a6e62;font-size:.85em}</style></head><body><h1>${nota.titulo}</h1>${nota.conteudo}<footer><p>Tags: ${nota.tags.join(', ')}</p><p>Criado: ${new Date(nota.dataCriacao).toLocaleString('pt-BR')}</p><p>via Sola Scriptura</p></footer></body></html>`;
        downloadAsFile(html, `${nota.titulo.substring(0, 50)}.html`, 'text/html;charset=utf-8');
        break;
      }
      case 'pdf': {
        import('@/lib/exportPdf').then(({ exportarNota }) => {
          exportarNota({
            titulo: nota.titulo,
            conteudo: conteudoLimpo,
            data: new Date(nota.dataCriacao).toLocaleDateString('pt-BR'),
            tags: nota.tags,
          });
        });
        break;
      }
    }
  }, [notas]);

  const todasTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const n of notas) {
      for (const t of n.tags) tagSet.add(t);
    }
    return Array.from(tagSet).sort();
  }, [notas]);

  return {
    notas,
    carregado,
    criarNota,
    salvarNota,
    excluirNota,
    buscarNotas,
    filtrarPorTag,
    exportarNota,
    todasTags,
  };
}
