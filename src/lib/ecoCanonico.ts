import { hrefBiblia, parseRefLivre, resolverLivroParam } from '@/lib/bibliaHref';
import type { CrossReference } from '@/data/biblia/crossReferences';
import { livroPorAbreviacao } from '@/data/biblia/livros';

export const ROTULO_TIPO_ECO: Record<CrossReference['type'], string> = {
  quotation: 'Citação',
  parallel: 'Paralelo',
  fulfillment: 'Cumprimento',
  contrast: 'Contraste',
  thematic: 'Temático',
  typology: 'Tipologia',
};

export interface EloEco {
  ref: string;
  href: string;
  rotulo: string;
  tipo?: CrossReference['type'];
  rotuloTipo?: string;
  descricao?: string;
  fonte: 'curated' | 'tsk';
}

export interface EcoCanonicoDados {
  curated: EloEco[];
  tsk: EloEco[];
}

export function chaveCanonRef(raw: string): string {
  const p = parseRefEco(raw);
  if (!p) return raw.toLowerCase().replace(/\s+/g, '');
  return `${p.livro}:${p.capitulo}:${p.versiculo ?? 0}`;
}

export function rotuloRefEco(raw: string): string {
  const p = parseRefEco(raw);
  if (!p) return raw;
  const pretty = p.livro.replace(
    /^(\d*)([a-zà-ú]+)/i,
    (_, n: string, rest: string) =>
      `${n}${rest.charAt(0).toUpperCase()}${rest.slice(1)}`
  );
  return p.versiculo
    ? `${pretty} ${p.capitulo}:${p.versiculo}`
    : `${pretty} ${p.capitulo}`;
}

/**
 * TSK deste dump mistura `jn` = Jonas (PT) e `Jn` = João (EN).
 * Jonas só tem 4 capítulos: `jn:11` só pode ser João.
 */
export function parseRefEco(raw: string): { livro: string; capitulo: number; versiculo?: number } | null {
  const parsed = parseRefLivre(raw);
  if (!parsed) return null;
  const jonas = livroPorAbreviacao.get('jn');
  const maxJonas = jonas?.totalCapitulos ?? 4;
  if (parsed.livro === 'jn' && parsed.capitulo > maxJonas) {
    const joao = resolverLivroParam('jo');
    if (joao) return { ...parsed, livro: joao.abreviacao };
  }
  return parsed;
}

function hrefDeRef(raw: string): string {
  const p = parseRefEco(raw);
  if (!p) return '/biblia';
  return hrefBiblia(p.livro, p.capitulo, p.versiculo);
}

export function montarEcoCanonico(
  curated: CrossReference[],
  tsk: string[]
): EcoCanonicoDados {
  const curatedElos: EloEco[] = curated.map((r) => ({
    ref: r.to,
    href: hrefDeRef(r.to),
    rotulo: rotuloRefEco(r.to),
    tipo: r.type,
    rotuloTipo: ROTULO_TIPO_ECO[r.type],
    descricao: r.description,
    fonte: 'curated' as const,
  }));

  const seen = new Set(curatedElos.map((e) => chaveCanonRef(e.ref)));
  const tskElos: EloEco[] = [];
  for (const ref of tsk) {
    const k = chaveCanonRef(ref);
    if (seen.has(k)) continue;
    seen.add(k);
    tskElos.push({
      ref,
      href: hrefDeRef(ref),
      rotulo: rotuloRefEco(ref),
      fonte: 'tsk',
    });
  }

  return { curated: curatedElos, tsk: tskElos };
}

export function temEco(d: EcoCanonicoDados): boolean {
  return d.curated.length > 0 || d.tsk.length > 0;
}

export async function carregarEcoCanonico(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<EcoCanonicoDados> {
  const key = `${livro.toLowerCase()}:${capitulo}:${versiculo}`;
  const hit = cacheEco.get(key);
  if (hit) return hit;

  const [curatedMod, tskMod] = await Promise.all([
    import('@/data/biblia/crossReferences'),
    import('@/data/crossReferences'),
  ]);
  const dados = montarEcoCanonico(
    curatedMod.getCrossReferencesByVerse(livro, capitulo, versiculo),
    tskMod.getCrossReferences(livro.toLowerCase(), capitulo, versiculo)
  );
  cacheEco.set(key, dados);
  return dados;
}

const cacheEco = new Map<string, EcoCanonicoDados>();
