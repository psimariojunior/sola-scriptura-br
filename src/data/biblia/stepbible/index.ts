// ═══════════════════════════════════════════════════════════════════════
// STEPBible-Data — interlinear com forma flexionada + aparato crítico
//
// ATRIBUIÇÃO OBRIGATÓRIA (licença CC BY 4.0):
//   Dados de STEPBible.org / Tyndale House Cambridge.
//   "STEPBible-Data" - https://github.com/STEPBible/STEPBible-Data
//   Licenciado sob Creative Commons Attribution 4.0 International (CC BY 4.0)
//   https://creativecommons.org/licenses/by/4.0/
//
// O QUE ESTE MÓDULO RESOLVE
// ──────────────────────────
// O interlinear "clássico" do projeto (src/data/biblia/strong/index.ts) mostra,
// para cada versículo, os códigos Strong + um rótulo morfológico heurístico,
// mas NÃO mostra a palavra flexionada real do texto original — apenas o
// lema do léxico. O STEPBible-Data (TAHOT para hebraico, TAGNT para grego)
// fornece, palavra por palavra:
//   - a forma exatamente como aparece no texto (com pontuação massorética
//     no hebraico, com acentuação no grego);
//   - Strong desambiguado;
//   - morfologia de fontes acadêmicas confiáveis (OSHB/Westminster para
//     hebraico, Robinson para grego);
//   - no grego, quais edições críticas (NA27/28, SBL, WH, Treg, TR, Byz,
//     Tyndale House) atestam aquela palavra naquela posição — um aparato
//     crítico real, não uma lista estática de variantes redigidas à mão.
//
// COBERTURA ATUAL
// ──────────────────────────
//   - Hebraico (TAHOT): Gênesis (completo), Êxodo (completo), Salmos (completo)
//   - Grego (TAGNT): Novo Testamento completo (27 livros — Mateus a Apocalipse)
//
// Ver STEPBIBLE_COBERTURA abaixo para a lista exata, gerada a partir do
// catálogo usado por scripts/import-stepbible.mjs.
//
// COMO EXPANDIR A COBERTURA
// ──────────────────────────
//   1. Adicionar o livro à lista LIVROS em scripts/import-stepbible.mjs
//      (código STEPBible, abreviação do projeto, idioma, arquivo-fonte e
//      total de capítulos esperado para a validação de integridade).
//   2. Rodar "node scripts/import-stepbible.mjs" (ou informando as
//      abreviações desejadas como argumentos, ex.: "node scripts/import-stepbible.mjs is jr").
//      O script baixa o(s) arquivo(s)-fonte que faltarem (com cache local
//      em scripts/.cache/stepbible/) e gera um arquivo `<abrev>.ts` por
//      livro neste diretório.
//   3. Adicionar a entrada correspondente no mapa LOADERS abaixo.
//   4. Livros do AT ainda pendentes (arquivos-fonte TAHOT já mapeados no
//      script): Josué-Ester (tahotJosEst) e Isaías-Malaquias (tahotIsaMal).
//   5. Decidir a estratégia de merge com o interlinear "clássico": como o
//      STEPBible cobre 100% do texto com melhor qualidade, o ideal a médio
//      prazo é substituir STRONG_CODES por dados STEPBible processados —
//      mas isso é uma migração maior, fora do escopo deste módulo.
//   6. O decodificador de morfologia hebraica em import-stepbible.mjs cobre
//      os casos mais comuns (verbo, substantivo, adjetivo, partícula,
//      preposição, conjunção, advérbio, pronome, sufixo) mas não é
//      exaustivo — revisar contra a documentação completa em
//      https://openscriptures.github.io/morphhb/parsing/HebrewMorphologyCodes.html
//      ao expandir a cobertura.
//
// NOTA DE VERSIFICAÇÃO: quando a referência do STEPBible traz uma numeração
// alternativa entre parênteses (ex.: "Gen.31.55(32.1)", comum no hebraico
// onde a divisão de versículos varia entre tradições), o importador usa a
// numeração PRINCIPAL (antes dos parênteses) — confirmado por amostragem
// contra o texto local (ARC) como a que corresponde à versificação usada
// pelas traduções do projeto. Título/superscrição de Salmos (versículo "0"
// no STEPBible, ex. "Psa.3.0") é mesclado ao versículo 1.
//
// NOTA DE CUSTO: as glosas (`glosaIngles`) vêm em inglês diretamente da
// fonte e NÃO foram traduzidas via IA (Groq), para não consumir a cota
// gratuita compartilhada com produção. Tradução em massa fica pendente.

import type { PalavraStepBibleHebraico, PalavraStepBibleGrego } from './types';

export type { PalavraStepBibleHebraico, PalavraStepBibleGrego };

export const STEPBIBLE_ATRIBUICAO =
  'Dados de STEPBible.org / Tyndale House Cambridge, licenciados sob Creative Commons Attribution 4.0 (CC BY 4.0). Fonte: github.com/STEPBible/STEPBible-Data';

type Idioma = 'hebraico' | 'grego';

interface LivroStepBible {
  idioma: Idioma;
  totalCapitulos: number;
  /** Carrega o módulo gerado do livro (dynamic import — lazy load por livro). */
  carregar: () => Promise<{ PALAVRAS: Record<string, PalavraStepBibleHebraico[] | PalavraStepBibleGrego[]> }>;
}

/**
 * Registro central de livros disponíveis. Chave = abreviação do projeto
 * (ver src/data/biblia/livros.ts). Cada entrada corresponde a um arquivo
 * gerado por scripts/import-stepbible.mjs neste mesmo diretório.
 */
const LIVROS: Record<string, LivroStepBible> = {
  // ---- Hebraico (TAHOT) ----
  gn: { idioma: 'hebraico', totalCapitulos: 50, carregar: () => import('./gn') },
  ex: { idioma: 'hebraico', totalCapitulos: 40, carregar: () => import('./ex') },
  sl: { idioma: 'hebraico', totalCapitulos: 150, carregar: () => import('./sl') },

  // ---- Grego (TAGNT) — Novo Testamento completo ----
  mt: { idioma: 'grego', totalCapitulos: 28, carregar: () => import('./mt') },
  mc: { idioma: 'grego', totalCapitulos: 16, carregar: () => import('./mc') },
  lc: { idioma: 'grego', totalCapitulos: 24, carregar: () => import('./lc') },
  jo: { idioma: 'grego', totalCapitulos: 21, carregar: () => import('./jo') },
  at: { idioma: 'grego', totalCapitulos: 28, carregar: () => import('./at') },
  rm: { idioma: 'grego', totalCapitulos: 16, carregar: () => import('./rm') },
  '1co': { idioma: 'grego', totalCapitulos: 16, carregar: () => import('./_1co') },
  '2co': { idioma: 'grego', totalCapitulos: 13, carregar: () => import('./_2co') },
  gl: { idioma: 'grego', totalCapitulos: 6, carregar: () => import('./gl') },
  ef: { idioma: 'grego', totalCapitulos: 6, carregar: () => import('./ef') },
  fp: { idioma: 'grego', totalCapitulos: 4, carregar: () => import('./fp') },
  cl: { idioma: 'grego', totalCapitulos: 4, carregar: () => import('./cl') },
  '1ts': { idioma: 'grego', totalCapitulos: 5, carregar: () => import('./_1ts') },
  '2ts': { idioma: 'grego', totalCapitulos: 3, carregar: () => import('./_2ts') },
  '1tm': { idioma: 'grego', totalCapitulos: 6, carregar: () => import('./_1tm') },
  '2tm': { idioma: 'grego', totalCapitulos: 4, carregar: () => import('./_2tm') },
  tt: { idioma: 'grego', totalCapitulos: 3, carregar: () => import('./tt') },
  fm: { idioma: 'grego', totalCapitulos: 1, carregar: () => import('./fm') },
  hb: { idioma: 'grego', totalCapitulos: 13, carregar: () => import('./hb') },
  tg: { idioma: 'grego', totalCapitulos: 5, carregar: () => import('./tg') },
  '1pe': { idioma: 'grego', totalCapitulos: 5, carregar: () => import('./_1pe') },
  '2pe': { idioma: 'grego', totalCapitulos: 3, carregar: () => import('./_2pe') },
  '1jo': { idioma: 'grego', totalCapitulos: 5, carregar: () => import('./_1jo') },
  '2jo': { idioma: 'grego', totalCapitulos: 1, carregar: () => import('./_2jo') },
  '3jo': { idioma: 'grego', totalCapitulos: 1, carregar: () => import('./_3jo') },
  jd: { idioma: 'grego', totalCapitulos: 1, carregar: () => import('./jd') },
  ap: { idioma: 'grego', totalCapitulos: 22, carregar: () => import('./ap') },
};

/** Metadados de cobertura, para uso em UI ("disponível para este livro?"). */
export const STEPBIBLE_COBERTURA: { livro: string; capitulos: number[] | 'todos'; idioma: Idioma }[] = Object.entries(
  LIVROS
).map(([livro, cfg]) => ({ livro, capitulos: 'todos' as const, idioma: cfg.idioma }));

export function temCoberturaStepBible(livro: string, _capitulo: number): boolean {
  return livro in LIVROS;
}

export async function getVersiculoStepBibleHebraico(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<PalavraStepBibleHebraico[] | null> {
  const cfg = LIVROS[livro];
  if (!cfg || cfg.idioma !== 'hebraico') return null;
  const mod = await cfg.carregar();
  return (mod.PALAVRAS[`${capitulo}:${versiculo}`] as PalavraStepBibleHebraico[] | undefined) ?? null;
}

export async function getVersiculoStepBibleGrego(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<PalavraStepBibleGrego[] | null> {
  const cfg = LIVROS[livro];
  if (!cfg || cfg.idioma !== 'grego') return null;
  const mod = await cfg.carregar();
  return (mod.PALAVRAS[`${capitulo}:${versiculo}`] as PalavraStepBibleGrego[] | undefined) ?? null;
}

/**
 * Busca unificada: retorna dados STEPBible para o versículo, no idioma
 * disponível (hebraico ou grego), ou null se o livro não estiver coberto.
 */
export async function getVersiculoStepBible(
  livro: string,
  capitulo: number,
  versiculo: number
): Promise<{ idioma: 'hebraico'; palavras: PalavraStepBibleHebraico[] } | { idioma: 'grego'; palavras: PalavraStepBibleGrego[] } | null> {
  const cfg = LIVROS[livro];
  if (!cfg) return null;
  if (cfg.idioma === 'hebraico') {
    const palavras = await getVersiculoStepBibleHebraico(livro, capitulo, versiculo);
    return palavras ? { idioma: 'hebraico', palavras } : null;
  }
  const palavras = await getVersiculoStepBibleGrego(livro, capitulo, versiculo);
  return palavras ? { idioma: 'grego', palavras } : null;
}
