import { TODOS_LIVROS, type LivroInfo } from '@/data/biblia/livros';

function fold(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

const byFoldedName = new Map<string, LivroInfo>();
for (const l of TODOS_LIVROS) {
  byFoldedName.set(fold(l.nome), l);
}

/** Abreviações de exibição (léxico, harmonia, concordância). */
const ALIASES: Record<string, string> = {
  gn: 'gn', gen: 'gn', genesis: 'gn',
  ex: 'ex', exo: 'ex', exodo: 'ex',
  lv: 'lv', lev: 'lv', levitico: 'lv',
  nm: 'nm', num: 'nm', numeros: 'nm',
  dt: 'dt', deu: 'dt', deuteronomio: 'dt',
  js: 'js', jos: 'js', josue: 'js',
  jz: 'jz', juizes: 'jz',
  rt: 'rt', rute: 'rt',
  '1sm': '1sm', '1samuel': '1sm',
  '2sm': '2sm', '2samuel': '2sm',
  '1rs': '1rs', '1reis': '1rs',
  '2rs': '2rs', '2reis': '2rs',
  '1cr': '1cr', '1cronicas': '1cr',
  '2cr': '2cr', '2cronicas': '2cr',
  ed: 'ed', esd: 'ed', esdras: 'ed',
  ne: 'ne', nee: 'ne', neemias: 'ne',
  et: 'et', est: 'et', ester: 'et',
  job: 'jó',
  sl: 'sl', sal: 'sl', salmos: 'sl',
  pv: 'pv', pro: 'pv', proverbios: 'pv',
  ec: 'ec', ecl: 'ec', eclesiastes: 'ec',
  ct: 'ct', can: 'ct', cantares: 'ct',
  is: 'is', isa: 'is', isaias: 'is',
  jr: 'jr', jer: 'jr', jeremias: 'jr',
  lm: 'lm', lamentacoes: 'lm',
  ez: 'ez', eze: 'ez', ezequiel: 'ez',
  dn: 'dn', dan: 'dn', daniel: 'dn',
  os: 'os', ose: 'os', oseias: 'os',
  jl: 'jl', joel: 'jl',
  am: 'am', amos: 'am',
  ob: 'ob', obadias: 'ob',
  jn: 'jn', jon: 'jn', jonas: 'jn',
  mq: 'mq', miq: 'mq', miqueias: 'mq',
  na: 'na', nau: 'na', naum: 'na',
  hc: 'hc', hab: 'hc', habacuque: 'hc',
  sf: 'sf', sof: 'sf', sofonias: 'sf',
  ag: 'ag', age: 'ag', ageu: 'ag',
  zc: 'zc', zac: 'zc', zacarias: 'zc',
  ml: 'ml', mal: 'ml', malaquias: 'ml',
  mt: 'mt', mat: 'mt', mateus: 'mt',
  mc: 'mc', mar: 'mc', marcos: 'mc',
  lc: 'lc', luc: 'lc', lucas: 'lc',
  jo: 'jo', joh: 'jo', joao: 'jo',
  at: 'at', ato: 'at', atos: 'at',
  rm: 'rm', rom: 'rm', romanos: 'rm',
  '1co': '1co', '1cor': '1co', '1corintios': '1co',
  '2co': '2co', '2cor': '2co', '2corintios': '2co',
  gl: 'gl', gal: 'gl', galatas: 'gl',
  ef: 'ef', efe: 'ef', efesios: 'ef',
  fp: 'fp', fil: 'fp', filipenses: 'fp',
  cl: 'cl', col: 'cl', colossenses: 'cl',
  '1ts': '1ts', '1tess': '1ts', '1tessalonicenses': '1ts',
  '2ts': '2ts', '2tess': '2ts', '2tessalonicenses': '2ts',
  '1tm': '1tm', '1tim': '1tm', '1timoteo': '1tm',
  '2tm': '2tm', '2tim': '2tm', '2timoteo': '2tm',
  tt: 'tt', tito: 'tt',
  fm: 'fm', filemom: 'fm',
  hb: 'hb', heb: 'hb', hebreus: 'hb',
  tg: 'tg', tia: 'tg', tiago: 'tg',
  '1pe': '1pe', '1ped': '1pe', '1pedro': '1pe',
  '2pe': '2pe', '2ped': '2pe', '2pedro': '2pe',
  '1jo': '1jo', '1joao': '1jo',
  '2jo': '2jo', '2joao': '2jo',
  '3jo': '3jo', '3joao': '3jo',
  jd: 'jd', jud: 'jd', judas: 'jd', jude: 'jd',
  ap: 'ap', apo: 'ap', apocalipse: 'ap',
};

function livroPorAbrev(abrev: string): LivroInfo | undefined {
  const lower = abrev.toLowerCase();
  return TODOS_LIVROS.find((l) => l.abreviacao.toLowerCase() === lower);
}

/** Resolve abreviação, nome, slug (`genesis`) ou alias (`1 Co`, `Jo`). */
export function resolverLivroParam(param: string | null | undefined): LivroInfo | undefined {
  if (!param) return undefined;
  const raw = param.trim();
  if (!raw) return undefined;

  const exact = livroPorAbrev(raw);
  if (exact) return exact;

  const compact = fold(raw);
  if (!compact) return undefined;

  const foldedAbrev = TODOS_LIVROS.filter((l) => fold(l.abreviacao) === compact);
  if (foldedAbrev.length === 1) return foldedAbrev[0];

  const byName = byFoldedName.get(compact);
  if (byName) return byName;

  const alias = ALIASES[compact];
  if (alias) return livroPorAbrev(alias);

  return undefined;
}

export function parseRefLivre(raw: string): { livro: string; capitulo: number; versiculo?: number } | null {
  const s = raw.trim();
  if (!s) return null;

  const colon = s.match(/^([a-z0-9]+):(\d+)(?::(\d+)(?:-\d+)?)?/i);
  if (colon) {
    const livro = resolverLivroParam(colon[1]);
    if (livro) {
      return {
        livro: livro.abreviacao,
        capitulo: Number(colon[2]),
        versiculo: colon[3] ? parseInt(colon[3], 10) : undefined,
      };
    }
  }

  const spaced = s.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-\d+)?)?/);
  if (spaced) {
    const livro = resolverLivroParam(spaced[1]);
    if (livro) {
      return {
        livro: livro.abreviacao,
        capitulo: Number(spaced[2]),
        versiculo: spaced[3] ? parseInt(spaced[3], 10) : undefined,
      };
    }
  }

  return null;
}

export function hrefBiblia(livro: string, capitulo: number, versiculo?: number, trads?: string[]): string {
  const info = resolverLivroParam(livro);
  const params = new URLSearchParams();
  params.set('livro', info?.abreviacao ?? livro);
  params.set('capitulo', String(Math.max(1, capitulo)));
  if (versiculo && versiculo > 0) params.set('versiculo', String(versiculo));
  if (trads?.length) params.set('trads', trads.join(','));
  return `/biblia?${params.toString()}`;
}

/** Guia da passagem: ficha, comentários, léxico e referências num só lugar. */
export function hrefGuia(livro: string, capitulo: number, versiculo?: number): string {
  const info = resolverLivroParam(livro);
  const params = new URLSearchParams();
  params.set('livro', info?.abreviacao ?? livro);
  params.set('capitulo', String(Math.max(1, capitulo)));
  if (versiculo && versiculo > 0) params.set('versiculo', String(versiculo));
  return `/guia?${params.toString()}`;
}

export function hrefFromRef(raw: string): string {
  const parsed = parseRefLivre(raw);
  if (!parsed) return '/biblia';
  return hrefBiblia(parsed.livro, parsed.capitulo, parsed.versiculo);
}
