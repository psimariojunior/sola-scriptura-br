// ═══════════════════════════════════════════════════════════════════════
// Tipos para o piloto de integração STEPBible-Data
//
// Fonte dos dados: STEPBible.org / Tyndale House Cambridge (CC BY 4.0)
// https://github.com/STEPBible/STEPBible-Data
// ═══════════════════════════════════════════════════════════════════════

export interface PalavraStepBibleHebraico {
  /** Referência original no formato "Gen.1.1#01" */
  ref: string;
  /** Forma exatamente como aparece no texto (flexionada, com pontuação massorética) */
  formaOriginal: string;
  transliteracao: string;
  /** Glosa em inglês fornecida pelo STEPBible (não traduzida — ver nota de custo no README do módulo) */
  glosaIngles: string;
  /** Código Strong normalizado (ex.: "H7225") */
  strong: string;
  /** Campo dStrongs bruto do arquivo original, para depuração/auditoria */
  strongBruto: string;
  /** Código morfológico bruto (esquema OSHB/Westminster, ex.: "Ncfsa") */
  morfologiaCodigo: string;
  /** Rótulo morfológico decodificado em português (ex.: "substantivo (comum), feminino, singular, estado absoluto") */
  morfologia: string;
}

export interface PalavraStepBibleGrego {
  /** Referência original no formato "Jhn.1.1#01" */
  ref: string;
  /** Forma exatamente como aparece no texto grego (flexionada) */
  formaOriginal: string;
  transliteracao: string;
  /** Glosa em inglês fornecida pelo STEPBible */
  glosaIngles: string;
  /** Código Strong normalizado (ex.: "G3056") */
  strong: string;
  strongBruto: string;
  /** Código morfológico Robinson (ex.: "N-NSM", "V-IAI-3S") — decodificável via src/lib/morphology.ts parseMorphology() */
  morfologiaCodigo: string;
  /** Edições críticas que atestam esta palavra nesta posição (NA28, NA27, SBL, WH, Treg, TR, Byz, Tyn) */
  edicoes: string[];
}
