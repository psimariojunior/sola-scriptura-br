// ═══════════════════════════════════════════════════════════════════════
// STEPBible-Data — Piloto de interlinear com forma flexionada + aparato crítico
//
// ATRIBUIÇÃO OBRIGATÓRIA (licença CC BY 4.0):
//   Dados de STEPBible.org / Tyndale House Cambridge.
//   "STEPBible-Data" - https://github.com/STEPBible/STEPBible-Data
//   Licenciado sob Creative Commons Attribution 4.0 International (CC BY 4.0)
//   https://creativecommons.org/licenses/by/4.0/
//
// O QUE ESTE MÓDULO RESOLVE
// ──────────────────────────
// O interlinear atual do projeto (src/data/biblia/strong/index.ts) mostra,
// para cada versículo, os códigos Strong + um rótulo morfológico heurístico,
// mas NÃO mostra a palavra flexionada real do texto original — apenas o
// lema do léxico. O STEPBible-Data (TAHOT para hebraico, TAGNT para grego)
// fornece, palavra por palavra:
//   - a forma exatamente como aparece no texto (com pontuação massorética
//     no hebraico, com acentuação no grego);
//   - Strong desambiguado;
//   - morfologia de fontes acadêmicas confiáveis (ETCBC/OSHB para hebraico,
//     Robinson para grego);
//   - no grego, quais edições críticas (NA27/28, SBL, WH, Treg, TR, Byz,
//     Tyndale House) atestam aquela palavra naquela posição — um aparato
//     crítico real, não uma lista estática de variantes redigidas à mão.
//
// COBERTURA ATUAL DO PILOTO
// ──────────────────────────
//   - Hebraico (TAHOT): Gênesis 1-3 (80 versículos, ~1.100 palavras)
//   - Grego (TAGNT): Evangelho de João completo (878 versículos, ~16.000 palavras)
//
// O QUE FALTA PARA COBRIR A BÍBLIA COMPLETA
// ──────────────────────────────────────────
//   1. Repetir o processo em scripts/import-stepbible.mjs para os demais
//      arquivos-fonte do STEPBible-Data:
//        Hebraico (TAHOT, 4 arquivos): Gen-Deu (parcialmente usado aqui),
//          Jos-Est, Job-Sng, Isa-Mal.
//        Grego (TAGNT, 2 arquivos): Mat-Jhn (parcialmente usado aqui: só João
//          foi extraído; Mateus, Marcos e Lucas já estão no mesmo arquivo
//          baixado e só precisam ser processados), Act-Rev.
//   2. Cada livro vira um novo arquivo `<livro>.ts` neste diretório (padrão
//      lazy-load já usado por joao.ts/genesis-1-3.ts) e uma entrada no mapa
//      LOADERS abaixo.
//   3. Decidir a estratégia de merge com o interlinear atual: como o
//      STEPBible cobre 100% do texto com melhor qualidade, o ideal a médio
//      prazo é substituir STRONG_CODES por dados STEPBible processados —
//      mas isso é uma migração maior, fora do escopo deste piloto.
//   4. O decodificador de morfologia hebraica em import-stepbible.mjs cobre
//      os casos mais comuns (verbo, substantivo, adjetivo, partícula,
//      preposição, conjunção, advérbio, pronome, sufixo) mas não é
//      exaustivo — revisar contra a documentação completa em
//      https://openscriptures.github.io/morphhb/parsing/HebrewMorphologyCodes.html
//      ao expandir a cobertura.
//
// NOTA DE CUSTO: as glosas (`glosaIngles`) vêm em inglês diretamente da
// fonte e NÃO foram traduzidas via IA (Groq), para não consumir a cota
// gratuita compartilhada com produção. Tradução em massa fica pendente.

import type { PalavraStepBibleHebraico, PalavraStepBibleGrego } from './types';

export type { PalavraStepBibleHebraico, PalavraStepBibleGrego };

export const STEPBIBLE_ATRIBUICAO =
  'Dados de STEPBible.org / Tyndale House Cambridge, licenciados sob Creative Commons Attribution 4.0 (CC BY 4.0). Fonte: github.com/STEPBible/STEPBible-Data';

/** Metadados de cobertura do piloto, para uso em UI ("disponível para este livro?"). */
export const STEPBIBLE_COBERTURA: { livro: string; capitulos: number[] | 'todos'; idioma: 'hebraico' | 'grego' }[] = [
  { livro: 'gn', capitulos: [1, 2, 3], idioma: 'hebraico' },
  { livro: 'jo', capitulos: 'todos', idioma: 'grego' },
];

export function temCoberturaStepBible(livro: string, capitulo: number): boolean {
  const entrada = STEPBIBLE_COBERTURA.find((c) => c.livro === livro);
  if (!entrada) return false;
  return entrada.capitulos === 'todos' || entrada.capitulos.includes(capitulo);
}

export async function getVersiculoStepBibleHebraico(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<PalavraStepBibleHebraico[] | null> {
  if (livro !== 'gn' || capitulo > 3) return null;
  const mod = await import('./genesis-1-3');
  return mod.GENESIS_1_3_STEPBIBLE[`${capitulo}:${versiculo}`] ?? null;
}

export async function getVersiculoStepBibleGrego(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<PalavraStepBibleGrego[] | null> {
  if (livro !== 'jo') return null;
  const mod = await import('./joao');
  return mod.JOAO_STEPBIBLE[`${capitulo}:${versiculo}`] ?? null;
}

/**
 * Busca unificada: retorna dados STEPBible para o versículo, no idioma
 * disponível (hebraico ou grego), ou null se fora da cobertura do piloto.
 */
export async function getVersiculoStepBible(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<{ idioma: 'hebraico'; palavras: PalavraStepBibleHebraico[] } | { idioma: 'grego'; palavras: PalavraStepBibleGrego[] } | null> {
  if (!temCoberturaStepBible(livro, capitulo)) return null;
  if (livro === 'gn') {
    const palavras = await getVersiculoStepBibleHebraico(livro, capitulo, versiculo);
    return palavras ? { idioma: 'hebraico', palavras } : null;
  }
  if (livro === 'jo') {
    const palavras = await getVersiculoStepBibleGrego(livro, capitulo, versiculo);
    return palavras ? { idioma: 'grego', palavras } : null;
  }
  return null;
}
