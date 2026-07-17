export interface VersiculoData {
  numero: number;
  texto: string;
}

export interface CapituloComparado {
  traducao: string;
  versiculos: VersiculoData[];
}

type LivroData = Record<string, Record<number, string[]>>;

export const TRADUCOES_DISPONIVEIS = ['arc', 'nvi', 'ara', 'acf', 'naa', 'ntlh', 'kjv', 'web'] as const;
export type TraducaoId = (typeof TRADUCOES_DISPONIVEIS)[number];

// Traduções que existem localmente (completo)
const TRADUCOES_LOCAIS = ['arc', 'kjv', 'web', 'nvi', 'ara', 'acf'] as const;

// Traduções que vêm da API Midvash
const TRADUCOES_API = ['ntlh', 'naa'] as const;

const cache = new Map<string, LivroData>();

const MIDVASH_API = 'https://api.midvash.com/v1';
const cacheMid = new Map<string, string[]>();

// Mapeamento de abreviações para slugs do Midvash (em português)
import { ABREV_PARA_MIDVASH as MIDVASH_MAP } from '../midvash';

async function fetchMidvash(traducao: string, livro: string, capitulo: number): Promise<string[] | null> {
  const key = `${traducao}_${livro}_${capitulo}`;
  if (cacheMid.has(key)) return cacheMid.get(key)!;

  const slug = MIDVASH_MAP[livro];
  if (!slug) return null;

  try {
    const url = `${MIDVASH_API}/${traducao}/${slug}/${capitulo}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000), // 8s timeout
    });
    if (!res.ok) return null;

    const json = await res.json();
    const versiculos: string[] = [];

    if (json.data?.verses) {
      for (const v of json.data.verses) {
        // A API retorna versículos como strings diretas ou objetos com propriedade text
        const texto = typeof v === 'string' ? v : v.text;
        if (texto?.trim()) {
          versiculos.push(texto.trim());
        }
      }
    }

    if (versiculos.length > 0) {
      cacheMid.set(key, versiculos);
    }
    return versiculos.length > 0 ? versiculos : null;
  } catch {
    return null;
  }
}

export async function carregarTraducao(traducao: string): Promise<LivroData> {
  if (cache.has(traducao)) return cache.get(traducao)!;

  // Se é uma tradução local, carrega do diretório
  if ((TRADUCOES_LOCAIS as readonly string[]).includes(traducao)) {
    try {
      const mod = await import(`./${traducao}/index`);
      cache.set(traducao, mod.default);
      return mod.default;
    } catch {
      // Se falhar, retorna vazio
      return {};
    }
  }

  // Se é uma tradução da API, retorna objeto vazio (será carregada por versículo)
  // A API Midvash é chamada diretamente pela página da Bíblia
  cache.set(traducao, {});
  return {};
}

export async function obterCapituloMulti(
  livro: string,
  capitulo: number,
  traducoes: string[]
): Promise<CapituloComparado[]> {
  const resultados: CapituloComparado[] = [];

  for (const trad of traducoes) {
    // Para traduções da API, busca diretamente
    if ((TRADUCOES_API as readonly string[]).includes(trad)) {
      const versiculos = await fetchMidvash(trad, livro, capitulo);
      if (versiculos) {
        resultados.push({
          traducao: trad,
          versiculos: versiculos.map((texto, i) => ({ numero: i + 1, texto })),
        });
      }
      continue;
    }

    // Para traduções locais
    const data = await carregarTraducao(trad);
    const versiculos = data[livro]?.[capitulo];
    if (versiculos) {
      resultados.push({
        traducao: trad,
        versiculos: versiculos.map((texto, i) => ({ numero: i + 1, texto })),
      });
    }
  }

  return resultados;
}

export function versaoDisponivel(data: LivroData, livro: string, capitulo: number): boolean {
  return !!data[livro]?.[capitulo];
}

const infoCache = new Map<string, { total: number; livros: string[] }>();

export async function obterInfoTraducao(traducao: string): Promise<{ total: number; livros: string[] }> {
  if (infoCache.has(traducao)) return infoCache.get(traducao)!;

  const data = await carregarTraducao(traducao);
  const livros = Object.keys(data);
  const total = livros.reduce((acc, livro) => acc + Object.keys(data[livro]).length, 0);
  const info = { total, livros };
  infoCache.set(traducao, info);
  return info;
}

// Verificar se uma tradução está disponível
export function isTraducaoDisponivel(traducao: string): boolean {
  return (TRADUCOES_DISPONIVEIS as readonly string[]).includes(traducao);
}

// Obter traduções locais completas
export function getTraducoesLocais(): string[] {
  return [...TRADUCOES_LOCAIS];
}

// Obter traduções da API
export function getTraducoesApi(): string[] {
  return [...TRADUCOES_API];
}
