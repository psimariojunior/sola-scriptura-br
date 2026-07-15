const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.solascripturabr.com.br/api/v1';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  retry?: boolean;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined | null>): string {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value != null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, body, retry = true, headers: customHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((customHeaders as Record<string, string>) || {}),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = buildUrl(path, params);

  try {
    const res = await fetch(url, {
      ...rest,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new ApiError(res.status, data?.message || `Erro ${res.status}`, data);
    }

    const text = await res.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (retry && error instanceof TypeError && error.message.includes('fetch')) {
      await new Promise((r) => setTimeout(r, 1000));
      return request<T>(path, { ...options, retry: false });
    }

    throw error;
  }
}

async function get<T>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>(path, { ...options, method: 'GET' });
}

async function post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
  return request<T>(path, { ...options, method: 'POST', body });
}

async function put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
  return request<T>(path, { ...options, method: 'PUT', body });
}

async function del<T>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>(path, { ...options, method: 'DELETE' });
}

// ── Bible types ──────────────────────────────────────────────────────────

export interface Traducao {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  idioma: string;
  ano: number;
}

export interface Livro {
  nome: string;
  abreviacao: string;
  testamento: 'AT' | 'NT';
  totalCapitulos: number;
  ordem: number;
}

export interface Versiculo {
  numero: number;
  texto: string;
}

export interface Capitulo {
  livro: string;
  capitulo: number;
  traducao: string;
  versiculos: Versiculo[];
}

export interface PesquisaResult {
  livroAbrev: string;
  livroNome: string;
  testamento: 'AT' | 'NT';
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

// ── Theology types ───────────────────────────────────────────────────────

export interface CategoriaTeologica {
  id: string;
  nome: string;
  descricao: string;
  icone?: string;
}

export interface Doutrina {
  id: string;
  nome: string;
  categoriaId: string;
  descricao: string;
  versiculos: string[];
}

// ── Character types ──────────────────────────────────────────────────────

export interface Personagem {
  id: string;
  nome: string;
  nomeOriginal?: string;
  testamento: 'AT' | 'NT';
  descricao: string;
  livros: string[];
}

// ── Geography types ──────────────────────────────────────────────────────

export interface Localizacao {
  id: string;
  nome: string;
  descricao: string;
  lat?: number;
  lng?: number;
  regiao?: string;
}

// ── Timeline types ───────────────────────────────────────────────────────

export interface EventoCronologico {
  id: string;
  titulo: string;
  descricao: string;
  anoInicio: number;
  anoFim?: number;
  periodo: 'AT' | 'NT';
  categorias: string[];
}

// ── AI types ─────────────────────────────────────────────────────────────

export interface PerguntaIA {
  pergunta: string;
  contexto?: string;
}

export interface RespostaIA {
  resposta: string;
  fontes?: string[];
}

// ── Auth types ───────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface CadastrarPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    role?: string;
  };
}

// ── Module-specific API clients ──────────────────────────────────────────

export const biblia = {
  getTraducoes: () => get<Traducao[]>('/biblia/traducoes'),
  getLivros: () => get<Livro[]>('/biblia/livros'),
  getCapitulos: (livroId: string) => get<Capitulo[]>(`/biblia/livros/${livroId}/capitulos`),
  getVersiculos: (capituloId: string) => get<Versiculo[]>(`/biblia/capitulos/${capituloId}/versiculos`),
  pesquisar: (query: string, options?: { traducao?: string; livro?: string; capitulo?: number }) =>
    get<PesquisaResult[]>('/biblia/pesquisa', { params: { q: query, ...options } }),
};

export const teologia = {
  getCategorias: () => get<CategoriaTeologica[]>('/teologia/categorias'),
  getDoutrinas: (categoriaId?: string) =>
    get<Doutrina[]>('/teologia/doutrinas', { params: { categoriaId } }),
};

export const personagens = {
  getPersonagens: () => get<Personagem[]>('/personagens'),
  getPersonagem: (id: string) => get<Personagem>(`/personagens/${id}`),
};

export const geografia = {
  getLocalizacoes: () => get<Localizacao[]>('/geografia/localizacoes'),
};

export const cronologia = {
  getEventos: () => get<EventoCronologico[]>('/cronologia/eventos'),
};

export const ia = {
  perguntar: (pergunta: string, contexto?: string) =>
    post<RespostaIA>('/ia/perguntar', { pergunta, contexto }),
};

export const auth = {
  login: (payload: LoginPayload) => post<AuthResponse>('/auth/login', payload),
  cadastrar: (payload: CadastrarPayload) => post<AuthResponse>('/auth/cadastrar', payload),
  refresh: (refreshToken: string) =>
    post<AuthResponse>('/auth/refresh', { refreshToken }),
};

// ── Midvash external API ────────────────────────────────────────────────

const MIDVASH_BASE = 'https://api.midvash.com/v1';

export interface MidvashVerse {
  data?: { verses?: (string | { text: string })[] };
}

export const midvash = {
  getChapter: (trad: string, slug: string, cap: number) =>
    get<MidvashVerse>(`${MIDVASH_BASE}/${trad}/${slug}/${cap}`),
};

// ── Base client export ───────────────────────────────────────────────────

export const apiClient = { get, post, put, del, request };
