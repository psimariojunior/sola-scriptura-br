import type { ObraConteudo } from './types';
import { OBRAS, getObraMeta, TOTAL_CAPITULOS, TOTAL_MINUTOS, SECULOS_COBERTOS } from './catalogo';

export { OBRAS, getObraMeta, TOTAL_CAPITULOS, TOTAL_MINUTOS, SECULOS_COBERTOS };
export * from './types';

// Loader dinâmico: só o módulo da obra roteada entra no bundle/SSG da página
const LOADERS: Record<string, () => Promise<{ obra: ObraConteudo }>> = {
  'didache': () => import('./obras/didache'),
  'diogneto': () => import('./obras/diogneto'),
  'inacio-romanos': () => import('./obras/inacio-romanos'),
  'policarpo-martirio': () => import('./obras/policarpo-martirio'),
  'justino-apologia': () => import('./obras/justino-apologia'),
  'agostinho-confissoes': () => import('./obras/agostinho-confissoes'),
  'credos-ecumenicos': () => import('./obras/credos-ecumenicos'),
  'catecismo-menor-westminster': () => import('./obras/catecismo-menor-westminster'),
  'catecismo-heidelberg': () => import('./obras/catecismo-heidelberg'),
  'lutero-95-teses': () => import('./obras/lutero-95-teses'),
  'lutero-liberdade': () => import('./obras/lutero-liberdade'),
  'calvino-institutas': () => import('./obras/calvino-institutas'),
  'imitacao-cristo': () => import('./obras/imitacao-cristo'),
  'presenca-deus': () => import('./obras/presenca-deus'),
  'josefo-quaeda-jerusalem': () => import('./obras/josefo-quaeda-jerusalem'),
};

export async function getObraConteudo(id: string): Promise<ObraConteudo | null> {
  const loader = LOADERS[id];
  if (!loader) return null;
  const mod = await loader();
  return mod.obra;
}
