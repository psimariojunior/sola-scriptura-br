import type { ObraConteudo } from './types';
import { OBRAS, getObraMeta, TOTAL_CAPITULOS, TOTAL_MINUTOS, SECULOS_COBERTOS } from './catalogo';

export { OBRAS, getObraMeta, TOTAL_CAPITULOS, TOTAL_MINUTOS, SECULOS_COBERTOS };
export * from './types';

// Imports diretos — todas as obras já são SSG via generateStaticParams()
import { obra as didache } from './obras/didache';
import { obra as diogneto } from './obras/diogneto';
import { obra as inacio } from './obras/inacio-romanos';
import { obra as policarpo } from './obras/policarpo-martirio';
import { obra as justino } from './obras/justino-apologia';
import { obra as agostinho } from './obras/agostinho-confissoes';
import { obra as credos } from './obras/credos-ecumenicos';
import { obra as westminster } from './obras/catecismo-menor-westminster';
import { obra as heidelberg } from './obras/catecismo-heidelberg';
import { obra as lutero95 } from './obras/lutero-95-teses';
import { obra as luteroLib } from './obras/lutero-liberdade';
import { obra as calvino } from './obras/calvino-institutas';
import { obra as imitacao } from './obras/imitacao-cristo';
import { obra as presenca } from './obras/presenca-deus';
import { obra as josefo } from './obras/josefo-quaeda-jerusalem';

const OBRA_MAP: Record<string, ObraConteudo> = {
  'didache': didache,
  'diogneto': diogneto,
  'inacio-romanos': inacio,
  'policarpo-martirio': policarpo,
  'justino-apologia': justino,
  'agostinho-confissoes': agostinho,
  'credos-ecumenicos': credos,
  'catecismo-menor-westminster': westminster,
  'catecismo-heidelberg': heidelberg,
  'lutero-95-teses': lutero95,
  'lutero-liberdade': luteroLib,
  'calvino-institutas': calvino,
  'imitacao-cristo': imitacao,
  'presenca-deus': presenca,
  'josefo-quaeda-jerusalem': josefo,
};

export function getObraConteudo(id: string): ObraConteudo | null {
  return OBRA_MAP[id] ?? null;
}
