import type { CrossReference } from '@/data/biblia/crossReferences';
import { hrefFromRef, parseRefLivre } from '@/lib/bibliaHref';

export interface EloCadeia {
  ref: string;
  href: string;
  papel: string;
  descricao?: string;
}

const TIPO_PESO: Record<CrossReference['type'], number> = {
  fulfillment: 0,
  quotation: 1,
  typology: 2,
  parallel: 3,
  thematic: 4,
  contrast: 5,
};

const TIPO_PAPEL: Record<CrossReference['type'], string> = {
  fulfillment: 'Cumprimento em Cristo',
  quotation: 'A Escritura cita',
  typology: 'Tipo → cumprimento',
  parallel: 'Paralelo',
  thematic: 'Mesmo tema',
  contrast: 'Contraste',
};

const NT = new Set([
  'mt', 'mc', 'lc', 'jo', 'at', 'rm', '1co', '2co', 'gl', 'ef', 'fp', 'cl',
  '1ts', '2ts', '1tm', '2tm', 'tt', 'fm', 'hb', 'tg', '1pe', '2pe', '1jo', '2jo', '3jo', 'jd', 'ap',
]);

const CRISTO = new Set(['mt', 'mc', 'lc', 'jo', 'hb', 'rm', 'ap', 'is', 'sl']);

function chaveRef(ref: string): string {
  const parsed = parseRefLivre(ref);
  if (parsed) return `${parsed.livro}:${parsed.capitulo}:${parsed.versiculo ?? 0}`;
  return ref.toLowerCase().replace(/\s+/g, '');
}

function livroDeRef(ref: string): string {
  const m = ref.trim().toLowerCase().match(/^(\d?[a-z]+)/);
  return m?.[1] ?? '';
}

function pesoTsk(ref: string, origemLivro: string): number {
  const livro = livroDeRef(ref);
  if (CRISTO.has(livro)) return 0;
  if (NT.has(livro) && !NT.has(origemLivro)) return 1;
  if (livro === origemLivro) return 2;
  return 3;
}

function eloDeCurated(r: CrossReference): EloCadeia {
  return {
    ref: r.to,
    href: hrefFromRef(r.to),
    papel: TIPO_PAPEL[r.type] ?? 'Ligação',
    descricao: r.description,
  };
}

function eloDeTsk(ref: string): EloCadeia {
  return {
    ref,
    href: hrefFromRef(ref),
    papel: NT.has(livroDeRef(ref)) ? 'Daqui → o Novo Testamento' : 'Mesma Escritura',
  };
}

/**
 * 4–5 elos em ordem teológica, não o dump do TSK.
 * Prefere cumprimento / citação / tipologia; completa com TSK ranqueado.
 */
export function montarCadeia(opts: {
  livro: string;
  curated: CrossReference[];
  tsk: string[];
  limite?: number;
}): EloCadeia[] {
  const limite = opts.limite ?? 5;
  const origem = opts.livro.toLowerCase();
  const seen = new Set<string>();
  const out: EloCadeia[] = [];

  const curated = [...opts.curated].sort(
    (a, b) => (TIPO_PESO[a.type] ?? 9) - (TIPO_PESO[b.type] ?? 9),
  );

  for (const r of curated) {
    const key = chaveRef(r.to);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(eloDeCurated(r));
    if (out.length >= limite) return out;
  }

  const tsk = [...opts.tsk].sort((a, b) => pesoTsk(a, origem) - pesoTsk(b, origem));
  for (const ref of tsk) {
    const key = chaveRef(ref);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(eloDeTsk(ref));
    if (out.length >= limite) return out;
  }

  return out;
}
