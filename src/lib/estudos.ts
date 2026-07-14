import { authService } from './auth';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://sola-scriptura-backend.onrender.com/api/v1';

export interface Anotacao {
  texto: string;
  data: number;
}

export interface MarcaBiblia {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  texto: string;
  favorito: boolean;
  cor: string | null;
  anotacao: Anotacao | null;
  dataCriacao: number;
}

export interface PlanoLeitura {
  id: string;
  nome: string;
  descricao: string;
  progresso: number;
  total: number;
  ordens: number[];
}

export interface EstudosData {
  marcas: Record<string, MarcaBiblia>;
  planos: PlanoLeitura[];
}

const STORAGE_KEY = 'sola-estudos';

function chave(livro: string, capitulo: number, versiculo: number, traducao: string): string {
  return `${livro}:${capitulo}:${versiculo}:${traducao}`;
}

function carregarLocal(): EstudosData {
  if (typeof window === 'undefined') return { marcas: {}, planos: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { marcas: {}, planos: [] };
  } catch { return { marcas: {}, planos: [] }; }
}

function salvarLocal(data: EstudosData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function obterToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

// Sync with backend
async function syncWithBackend(marcas: Record<string, MarcaBiblia>): Promise<Record<string, MarcaBiblia>> {
  if (!authService.isAutenticado()) return marcas;

  try {
    const res = await authService.apiFetch(`${API_BASE}/estudos`);

    if (res.ok) {
      const remote = await res.json();
      if (remote?.data) {
        const merged = { ...marcas };
        for (const item of remote.data) {
          const k = chave(item.livro, item.capitulo, item.versiculo, item.traducao);
          if (!merged[k] || item.dataCriacao > merged[k].dataCriacao) {
            merged[k] = {
              livro: item.livro,
              capitulo: item.capitulo,
              versiculo: item.versiculo,
              traducao: item.traducao,
              texto: item.texto,
              favorito: item.favorito,
              cor: item.cor,
              anotacao: item.anotacao,
              dataCriacao: item.dataCriacao,
            };
          }
        }
        return merged;
      }
    }
  } catch {}

  return marcas;
}

async function pushToBackend(marcas: Record<string, MarcaBiblia>) {
  if (!authService.isAutenticado()) return;

  try {
    const items = Object.values(marcas).filter(m => m.favorito || m.cor || m.anotacao);
    await authService.apiFetch(`${API_BASE}/estudos/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
  } catch {}
}

// Initialize: sync from backend on first load
let syncPromise: Promise<void> | null = null;

export function initSync() {
  if (syncPromise) return syncPromise;
  syncPromise = (async () => {
    const local = carregarLocal();
    const merged = await syncWithBackend(local.marcas);
    const data: EstudosData = { ...local, marcas: merged };
    salvarLocal(data);
  })();
  return syncPromise;
}

export function toggleFavorito(livro: string, capitulo: number, versiculo: number, traducao: string, texto: string): boolean {
  const data = carregarLocal();
  const k = chave(livro, capitulo, versiculo, traducao);
  if (data.marcas[k]) {
    data.marcas[k].favorito = !data.marcas[k].favorito;
  } else {
    data.marcas[k] = { livro, capitulo, versiculo, traducao, texto, favorito: true, cor: null, anotacao: null, dataCriacao: Date.now() };
  }
  salvarLocal(data);
  pushToBackend(data.marcas);
  return data.marcas[k].favorito;
}

export function setCor(livro: string, capitulo: number, versiculo: number, traducao: string, cor: string | null) {
  const data = carregarLocal();
  const k = chave(livro, capitulo, versiculo, traducao);
  if (data.marcas[k]) data.marcas[k].cor = cor;
  else data.marcas[k] = { livro, capitulo, versiculo, traducao, texto: '', favorito: false, cor, anotacao: null, dataCriacao: Date.now() };
  salvarLocal(data);
  pushToBackend(data.marcas);
}

export function setAnotacao(livro: string, capitulo: number, versiculo: number, traducao: string, anotacao: string | null) {
  const data = carregarLocal();
  const k = chave(livro, capitulo, versiculo, traducao);
  if (data.marcas[k]) {
    data.marcas[k].anotacao = anotacao ? { texto: anotacao, data: Date.now() } : null;
  } else {
    data.marcas[k] = { livro, capitulo, versiculo, traducao, texto: '', favorito: false, cor: null, anotacao: anotacao ? { texto: anotacao, data: Date.now() } : null, dataCriacao: Date.now() };
  }
  salvarLocal(data);
  pushToBackend(data.marcas);
}

export function removerMarca(livro: string, capitulo: number, versiculo: number, traducao: string) {
  const data = carregarLocal();
  const k = chave(livro, capitulo, versiculo, traducao);
  delete data.marcas[k];
  salvarLocal(data);
  pushToBackend(data.marcas);
}

export function obterMarca(livro: string, capitulo: number, versiculo: number, traducao: string): MarcaBiblia | null {
  const data = carregarLocal();
  const k = chave(livro, capitulo, versiculo, traducao);
  return data.marcas[k] ?? null;
}

export function listarMarcas(): MarcaBiblia[] {
  const data = carregarLocal();
  return Object.values(data.marcas).filter((m) => m.favorito || m.cor || m.anotacao);
}

export function listarFavoritos(): MarcaBiblia[] {
  return listarMarcas().filter((m) => m.favorito);
}

export function obterEstatisticas() {
  const marcas = listarMarcas();
  const favoritos = marcas.filter(m => m.favorito).length;
  const anotacoes = marcas.filter(m => m.anotacao).length;
  const livrosUnicos = new Set(marcas.map(m => m.livro)).size;
  return { total: marcas.length, favoritos, anotacoes, livrosUnicos };
}

export function ouvirMudancas(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener('storage', handler);
  window.addEventListener('focus', handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('focus', handler);
  };
}
