import { carregarCapitulo } from '@/lib/apresentacao/versiculos';
import { getTraducoesLocais } from '@/data/biblia/texto/carregar';
import { traducoes } from '@/data/biblia/versoes';

/** Ordem de leitura: Almeida e livres em PT, depois inglês local. Sem API remota. */
const ORDEM_LOCAIS = [
  'arc',
  'ara',
  'acf',
  'nvi',
  'alm1911',
  'blivre',
  'jfaal',
  'kjv',
  'web',
] as const;

export interface VersoTraducao {
  id: string;
  sigla: string;
  nome: string;
  idioma: string;
  texto: string;
}

const cache = new Map<string, VersoTraducao[]>();

export function idsTraducoesLocaisParaLema(): string[] {
  const locais = new Set(getTraducoesLocais());
  return ORDEM_LOCAIS.filter((id) => locais.has(id));
}

/**
 * Texto integral do verso em cada tradução local.
 * Não alinha palavra a palavra: o corpus Strong só casa uma base.
 */
export async function carregarVersoNasTraducoesLocais(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<VersoTraducao[]> {
  const key = `${livro}:${capitulo}:${versiculo}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const ids = idsTraducoesLocaisParaLema();
  const caps = await Promise.all(ids.map((id) => carregarCapitulo(livro, capitulo, id)));
  const meta = new Map(traducoes.map((t) => [t.id, t]));
  const out: VersoTraducao[] = [];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const encontrado = caps[i].find((v) => v.numero === versiculo);
    const texto = encontrado?.texto?.trim();
    if (!texto) continue;
    const m = meta.get(id);
    out.push({
      id,
      sigla: m?.sigla ?? id.toUpperCase(),
      nome: m?.nome ?? id,
      idioma: m?.idioma ?? 'pt-BR',
      texto,
    });
  }

  cache.set(key, out);
  return out;
}
