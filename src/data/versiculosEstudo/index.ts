// Gerado automaticamente pelo script de geração de estudos por versículo.
// Não edite manualmente; cada livro está em <abrev>.ts.
import { VersicoEstudo } from './versiculosEstudoTypes';
export type { VersicoEstudo };

// Carregamento SOB DEMANDA: cada livro é um thunk de import() dinâmico,
// garantindo code-splitting (1 chunk por livro). Nada é materializado no
// bundle do cliente até que getVersiculoEstudo seja chamado.
export const versiculosPorLivro: Record<string, () => Promise<{ default?: Record<string, VersicoEstudo> } & Record<string, Record<string, VersicoEstudo>>>> = {
  'gn': () => import('./gn'),
  'ex': () => import('./ex'),
  'lv': () => import('./lv'),
  'nm': () => import('./nm'),
  'dt': () => import('./dt'),
  'js': () => import('./js'),
  'jz': () => import('./jz'),
  'rt': () => import('./rt'),
  '1sm': () => import('./1sm'),
  '2sm': () => import('./2sm'),
  '1rs': () => import('./1rs'),
  '2rs': () => import('./2rs'),
  '1cr': () => import('./1cr'),
  '2cr': () => import('./2cr'),
  'ed': () => import('./ed'),
  'ne': () => import('./ne'),
  'et': () => import('./et'),
  'jó': () => import('./jó'),
  'sl': () => import('./sl'),
  'pv': () => import('./pv'),
  'ec': () => import('./ec'),
  'ct': () => import('./ct'),
  'is': () => import('./is'),
  'jr': () => import('./jr'),
  'lm': () => import('./lm'),
  'ez': () => import('./ez'),
  'dn': () => import('./dn'),
  'os': () => import('./os'),
  'jl': () => import('./jl'),
  'am': () => import('./am'),
  'ob': () => import('./ob'),
  'jn': () => import('./jn'),
  'mq': () => import('./mq'),
  'na': () => import('./na'),
  'hc': () => import('./hc'),
  'sf': () => import('./sf'),
  'ag': () => import('./ag'),
  'zc': () => import('./zc'),
  'ml': () => import('./ml'),
  'mt': () => import('./mt'),
  'mc': () => import('./mc'),
  'lc': () => import('./lc'),
  'jo': () => import('./jo'),
  'at': () => import('./at'),
  'rm': () => import('./rm'),
  '1co': () => import('./1co'),
  '2co': () => import('./2co'),
  'gl': () => import('./gl'),
  'ef': () => import('./ef'),
  'fp': () => import('./fp'),
  'cl': () => import('./cl'),
  '1ts': () => import('./1ts'),
  '2ts': () => import('./2ts'),
  '1tm': () => import('./1tm'),
  '2tm': () => import('./2tm'),
  'tt': () => import('./tt'),
  'fm': () => import('./fm'),
  'hb': () => import('./hb'),
  'tg': () => import('./tg'),
  '1pe': () => import('./1pe'),
  '2pe': () => import('./2pe'),
  '1jo': () => import('./1jo'),
  '2jo': () => import('./2jo'),
  '3jo': () => import('./3jo'),
  'jd': () => import('./jd'),
  'ap': () => import('./ap'),
};

export function chaveVS(livro: string, cap: number, v: number): string {
  return `${livro.toLowerCase()}:${cap}:${v}`;
}

export async function getVersiculoEstudo(livro: string, cap: number, v: number): Promise<VersicoEstudo | undefined> {
  const livroKey = livro.toLowerCase();
  const loader = versiculosPorLivro[livroKey as keyof typeof versiculosPorLivro];
  if (!loader) return undefined;
  const mod = await loader();
  const rec = (mod.default ?? mod.v_gn ?? mod) as Record<string, VersicoEstudo>;
  return rec[`${cap}:${v}`];
}
