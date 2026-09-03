export interface VersiculoColecao {
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  referencia: string;
}

export interface Colecao {
  id: string;
  nome: string;
  descricao: string;
  versiculos: VersiculoColecao[];
  criadaEm: string;
}

const STORAGE_KEY = 'ssb_colecoes';

function persistir(colecoes: Colecao[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colecoes));
  } catch (e) {
    console.error('[colecoes:salvar]', e);
  }
  void import('./offlineStorage').then((m) => m.saveCollectionsOffline(colecoes)).catch(() => {});
  void import('@/lib/supabaseSync').then((m) => m.syncType('colecoes')).catch(() => {});
}

export function listarColecoes(): Colecao[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Colecao[]) : [];
  } catch {
    return [];
  }
}

export async function carregarColecoes(): Promise<Colecao[]> {
  try {
    const { getCollectionsOffline } = await import('./offlineStorage');
    const fromIDB = (await getCollectionsOffline()) as Colecao[];
    if (fromIDB.length > 0) return fromIDB;
  } catch {
    /* fallback local */
  }
  return listarColecoes();
}

export function criarColecao(nome: string, descricao = ''): Colecao {
  const nova: Colecao = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    nome: nome.trim() || 'Nova coleção',
    descricao: descricao.trim(),
    versiculos: [],
    criadaEm: new Date().toISOString(),
  };
  persistir([...listarColecoes(), nova]);
  return nova;
}

export function versoEstaNaColecao(colecao: Colecao, livro: string, capitulo: number, verso: number): boolean {
  return colecao.versiculos.some(
    (v) => v.livro === livro && v.capitulo === capitulo && v.verso === verso,
  );
}

export function adicionarVersoAColecao(
  colecaoId: string,
  verso: VersiculoColecao,
): boolean {
  const colecoes = listarColecoes();
  const idx = colecoes.findIndex((c) => c.id === colecaoId);
  if (idx < 0) return false;
  const alvo = colecoes[idx];
  if (versoEstaNaColecao(alvo, verso.livro, verso.capitulo, verso.verso)) return true;
  colecoes[idx] = { ...alvo, versiculos: [...alvo.versiculos, verso] };
  persistir(colecoes);
  return true;
}

export function removerColecao(colecaoId: string): boolean {
  const colecoes = listarColecoes();
  const filtered = colecoes.filter((c) => c.id !== colecaoId);
  if (filtered.length === colecoes.length) return false;
  persistir(filtered);
  return true;
}

export function removerVersoDaColecao(
  colecaoId: string,
  livro: string,
  capitulo: number,
  verso: number,
): boolean {
  const colecoes = listarColecoes();
  const idx = colecoes.findIndex((c) => c.id === colecaoId);
  if (idx < 0) return false;
  const alvo = colecoes[idx];
  const filtered = alvo.versiculos.filter(
    (v) => !(v.livro === livro && v.capitulo === capitulo && v.verso === verso),
  );
  if (filtered.length === alvo.versiculos.length) return false;
  colecoes[idx] = { ...alvo, versiculos: filtered };
  persistir(colecoes);
  return true;
}

export function editarColecao(colecaoId: string, updates: Partial<Pick<Colecao, 'nome' | 'descricao'>>): boolean {
  const colecoes = listarColecoes();
  const idx = colecoes.findIndex((c) => c.id === colecaoId);
  if (idx < 0) return false;
  colecoes[idx] = { ...colecoes[idx], ...updates };
  persistir(colecoes);
  return true;
}
