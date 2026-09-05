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
import { obra as origenes } from './obras/origenes-principios';
import { obra as cipriano } from './obras/cipriano-unidade';
import { obra as gregorio } from './obras/gregorio-nissa-moises';
import { obra as basilio } from './obras/basilio-espirito-santo';
import { obra as ambrosio } from './obras/ambrosio-deveres';
import { obra as jeronimo } from './obras/jeronimo-cartas';
import { obra as cristaoAutentico } from './obras/cristao-autentico';
import { obra as lewisCristianismo } from './obras/lewis-cristianismo';
import { obra as lewisDiabo } from './obras/lewis-diabo';
import { obra as bonhoeffer } from './obras/bonhoeffer-discipulado';
import { obra as spurgeonManhas } from './obras/spurgeon-manhas';
import { obra as baxter } from './obras/baxter-descanso';
import { obra as edwards } from './obras/edwards-pecadores';
import { obra as wesley } from './obras/wesley-sermoes';
import { obra as clarke } from './obras/clarke-comentario';

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
  'origenes-principios': origenes,
  'cipriano-unidade': cipriano,
  'gregorio-nissa-moises': gregorio,
  'basilio-espirito-santo': basilio,
  'ambrosio-deveres': ambrosio,
  'jeronimo-cartas': jeronimo,
  'cristao-autentico': cristaoAutentico,
  'lewis-cristianismo': lewisCristianismo,
  'lewis-diabo': lewisDiabo,
  'bonhoeffer-discipulado': bonhoeffer,
  'spurgeon-manhas': spurgeonManhas,
  'baxter-descanso': baxter,
  'edwards-pecadores': edwards,
  'wesley-sermoes': wesley,
  'clarke-comentario': clarke,
};

export function getObraConteudo(id: string): ObraConteudo | null {
  return OBRA_MAP[id] ?? null;
}
