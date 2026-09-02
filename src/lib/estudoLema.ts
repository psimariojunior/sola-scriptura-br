import { livroPorAbreviacao } from '@/data/biblia/livros';
import { carregarCapitulo } from '@/lib/apresentacao/versiculos';

export interface RefStrong {
  livro: string;
  capitulo: number;
  versiculo: number;
}

export interface OcorrenciaLema extends RefStrong {
  chave: string;
  recorte: string | null;
}

export interface EstudoLema {
  strong: string;
  livro: string;
  capitulo: number;
  noCapitulo: number;
  noLivro: number;
  noCorpus: number;
  capitulosComStrong: number;
  totalCapitulosLivro: number;
  coberturaParcial: boolean;
  ocorrenciasNoLivro: OcorrenciaLema[];
}

export function parseChaveStrong(chave: string): RefStrong | null {
  const [livro, capStr, verStr] = chave.split(':');
  const capitulo = Number(capStr);
  const versiculo = Number(verStr);
  if (!livro || !Number.isFinite(capitulo) || !Number.isFinite(versiculo)) return null;
  return { livro, capitulo, versiculo };
}

/** Conta e lista ocorrências reais do Strong no corpus. Não inventa refs. */
export async function carregarEstudoLema(
  strong: string,
  livro: string,
  capitulo: number
): Promise<EstudoLema> {
  const { getTodasOcorrenciasStrong, getVersiculosComStrong } = await import(
    '@/data/biblia/strong'
  );
  const prefixoLivro = `${livro}:`;
  const todas = getTodasOcorrenciasStrong(strong);
  const noLivroChaves = todas.filter((k) => k.startsWith(prefixoLivro));
  const prefixoCap = `${livro}:${capitulo}:`;
  const noCapitulo = noLivroChaves.filter((k) => k.startsWith(prefixoCap)).length;

  const versosDoLivroNoCorpus = getVersiculosComStrong().filter((k) =>
    k.startsWith(prefixoLivro)
  );
  const capitulosComStrong = new Set(
    versosDoLivroNoCorpus.map((k) => Number(k.split(':')[1])).filter(Number.isFinite)
  ).size;
  const totalCapitulosLivro = livroPorAbreviacao.get(livro)?.totalCapitulos ?? 0;

  const refs = noLivroChaves
    .map((chave) => {
      const parsed = parseChaveStrong(chave);
      if (!parsed) return null;
      return { chave, ...parsed };
    })
    .filter((x): x is { chave: string } & RefStrong => x !== null)
    .sort((a, b) => a.capitulo - b.capitulo || a.versiculo - b.versiculo);

  const capsUnicos = [...new Set(refs.map((r) => r.capitulo))];
  const textosPorCap = new Map<number, Map<number, string>>();
  await Promise.all(
    capsUnicos.map(async (cap) => {
      const vs = await carregarCapitulo(livro, cap, 'arc');
      const mapa = new Map<number, string>();
      for (const v of vs) mapa.set(v.numero, v.texto);
      textosPorCap.set(cap, mapa);
    })
  );

  const ocorrenciasNoLivro: OcorrenciaLema[] = refs.map((r) => ({
    ...r,
    recorte: textosPorCap.get(r.capitulo)?.get(r.versiculo) ?? null,
  }));

  return {
    strong,
    livro,
    capitulo,
    noCapitulo,
    noLivro: noLivroChaves.length,
    noCorpus: todas.length,
    capitulosComStrong,
    totalCapitulosLivro,
    coberturaParcial:
      totalCapitulosLivro > 0 && capitulosComStrong < totalCapitulosLivro,
    ocorrenciasNoLivro,
  };
}
