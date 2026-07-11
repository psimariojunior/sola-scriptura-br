export const CORES = ['yellow', 'green', 'blue', 'pink', 'orange', 'purple'] as const;
export type CorMarcador = (typeof CORES)[number];

export interface Marca {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  cor: CorMarcador;
  data: number;
}

const STORAGE_KEY = 'ssb_marks';

function carregar(): Record<string, Marca> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function salvar(data: Record<string, Marca>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function chave(livro: string, capitulo: number, versiculo: number, traducao: string): string {
  return `${livro}:${capitulo}:${versiculo}:${traducao}`;
}

export function setMarcador(livro: string, capitulo: number, versiculo: number, traducao: string, cor: CorMarcador) {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  data[k] = { livro, capitulo, versiculo, traducao, cor, data: Date.now() };
  salvar(data);
}

export function removeMarcador(livro: string, capitulo: number, versiculo: number, traducao: string) {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  delete data[k];
  salvar(data);
}

export function getMarcador(livro: string, capitulo: number, versiculo: number, traducao: string): Marca | null {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  return data[k] ?? null;
}

export function listarMarcadores(): Marca[] {
  return Object.values(carregar());
}
