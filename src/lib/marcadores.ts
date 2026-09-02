export const CORES = ['yellow', 'green', 'blue', 'pink', 'orange', 'purple'] as const;
export type CorMarcador = (typeof CORES)[number];

export const COR_SIGNIFICADO: Record<CorMarcador, { label: string; uso: string; swatch: string }> = {
  yellow: { label: 'Destaque', uso: 'Promessa ou verdade central', swatch: 'bg-yellow-400' },
  green: { label: 'Vida', uso: 'Aplicação para hoje', swatch: 'bg-green-400' },
  blue: { label: 'Estudo', uso: 'Para pesquisar depois', swatch: 'bg-blue-400' },
  pink: { label: 'Oração', uso: 'Pedido, louvor ou consolo', swatch: 'bg-pink-400' },
  orange: { label: 'Atenção', uso: 'Aviso, juízo ou chamado', swatch: 'bg-orange-400' },
  purple: { label: 'Cristo', uso: 'Messias e evangelho', swatch: 'bg-purple-400' },
};

export interface TrechoMarcado {
  id: string;
  inicio: number;
  fim: number;
  cor: CorMarcador;
  texto: string;
}

export interface Marca {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  cor: CorMarcador;
  data: number;
  trechos?: TrechoMarcado[];
}

const STORAGE_KEY = 'ssb_marks';
const LAST_COLOR_KEY = 'ssb_marks_last_color';
const UNDO_KEY = 'ssb_marks_undo';
const EVT = 'ssb-marks-changed';

export const MARCA_CLASSE: Record<CorMarcador, string> = {
  yellow: 'mark-yellow-bg',
  green: 'mark-green-bg',
  blue: 'mark-blue-bg',
  pink: 'mark-pink-bg',
  orange: 'mark-orange-bg',
  purple: 'mark-purple-bg',
};

interface UndoEntry {
  chave: string;
  anterior: Marca | null;
}

function emitir() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(EVT));
  }
}

function carregar(): Record<string, Marca> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('[marcadores:carregar]', e);
    return {};
  }
}

function salvar(data: Record<string, Marca>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    emitir();
    if (typeof window !== 'undefined') {
      void import('@/lib/offlineStorage')
        .then((m) => m.saveMarcasOffline(Object.values(data)))
        .catch(() => {});
    }
  } catch (e) {
    console.error('[marcadores:salvar]', e);
  }
}

function lerUndo(): UndoEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(UNDO_KEY);
    return raw ? (JSON.parse(raw) as UndoEntry[]) : [];
  } catch {
    return [];
  }
}

function gravarUndo(stack: UndoEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(UNDO_KEY, JSON.stringify(stack.slice(-10)));
  } catch {
    /* quota */
  }
}

function pushUndo(chaveMarca: string, anterior: Marca | null) {
  const stack = lerUndo();
  stack.push({ chave: chaveMarca, anterior });
  gravarUndo(stack);
}

export function getUltimaCor(): CorMarcador {
  if (typeof window === 'undefined') return 'yellow';
  try {
    const raw = localStorage.getItem(LAST_COLOR_KEY);
    if (raw && (CORES as readonly string[]).includes(raw)) return raw as CorMarcador;
  } catch {
    /* ignore */
  }
  return 'yellow';
}

function gravarUltimaCor(cor: CorMarcador) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LAST_COLOR_KEY, cor);
  } catch {
    /* ignore */
  }
}

function chave(livro: string, capitulo: number, versiculo: number, traducao: string): string {
  return `${livro}:${capitulo}:${versiculo}:${traducao}`;
}

export function setMarcador(livro: string, capitulo: number, versiculo: number, traducao: string, cor: CorMarcador) {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  const atual = data[k] ?? null;
  pushUndo(k, atual);
  data[k] = {
    livro,
    capitulo,
    versiculo,
    traducao,
    cor,
    data: Date.now(),
    trechos: atual?.trechos,
  };
  gravarUltimaCor(cor);
  salvar(data);
}

export function removeMarcador(livro: string, capitulo: number, versiculo: number, traducao: string) {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  pushUndo(k, data[k] ?? null);
  delete data[k];
  salvar(data);
}

/** Mesma cor de novo = limpa. Outra cor = troca. */
export function aplicarOuRemoverMarcador(
  livro: string,
  capitulo: number,
  versiculo: number,
  traducao: string,
  cor: CorMarcador,
): CorMarcador | null {
  const atual = getMarcador(livro, capitulo, versiculo, traducao);
  if (atual?.cor === cor) {
    removeMarcador(livro, capitulo, versiculo, traducao);
    return null;
  }
  setMarcador(livro, capitulo, versiculo, traducao, cor);
  return cor;
}

export function desfazerUltimaMarca(): boolean {
  const stack = lerUndo();
  const last = stack.pop();
  if (!last) return false;
  gravarUndo(stack);
  const data = carregar();
  if (last.anterior) data[last.chave] = last.anterior;
  else delete data[last.chave];
  salvar(data);
  return true;
}

export function getMarcador(livro: string, capitulo: number, versiculo: number, traducao: string): Marca | null {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  return data[k] ?? null;
}

export function marcarTrecho(
  livro: string,
  capitulo: number,
  versiculo: number,
  traducao: string,
  inicio: number,
  fim: number,
  cor: CorMarcador,
  texto: string,
) {
  if (fim <= inicio) return;
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  const atual = data[k];
  pushUndo(k, atual ?? null);
  gravarUltimaCor(cor);
  const trechos = [...(atual?.trechos ?? []), {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    inicio,
    fim,
    cor,
    texto,
  }];
  data[k] = {
    livro,
    capitulo,
    versiculo,
    traducao,
    cor: atual?.cor ?? cor,
    data: Date.now(),
    trechos,
  };
  salvar(data);
}

export function removerTrecho(
  livro: string,
  capitulo: number,
  versiculo: number,
  traducao: string,
  trechoId: string,
) {
  const data = carregar();
  const k = chave(livro, capitulo, versiculo, traducao);
  const atual = data[k];
  if (!atual?.trechos) return;
  const trechos = atual.trechos.filter((t) => t.id !== trechoId);
  if (trechos.length === 0 && !atual.cor) {
    delete data[k];
  } else {
    data[k] = { ...atual, trechos, data: Date.now() };
  }
  salvar(data);
}

export function listarMarcadores(): Marca[] {
  return Object.values(carregar()).sort((a, b) => b.data - a.data);
}

export function listarMarcadoresDoCapitulo(
  livro: string,
  capitulo: number,
  traducao?: string,
): Marca[] {
  return listarMarcadores().filter(
    (m) => m.livro === livro && m.capitulo === capitulo && (!traducao || m.traducao === traducao),
  );
}

export function onMarcadoresChange(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
