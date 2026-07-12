export interface PalavraStrong {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  morfologia: string;
  idioma: 'grego' | 'hebraico';
}

export interface VersiculoStrong {
  livro: string;
  capitulo: number;
  versiculo: number;
  palavras: PalavraStrong[];
}

// Mapa principal: "livro:cap:ver" -> PalavraStrong[]
export const STRONG_POR_VERSICULO: Record<string, PalavraStrong[]> = {
  'jo:1:1': [
    { strong: 'G3056', palavra: 'λόγος', transliteracao: 'logos', definicao: 'palavra, razão, princípio', morfologia: 'substantivo, nominativo, masculino, singular', idioma: 'grego' },
    { strong: 'G2316', palavra: 'θεός', transliteracao: 'theos', definicao: 'Deus, ser divino', morfologia: 'substantivo, nominativo, masculino, singular', idioma: 'grego' },
    { strong: 'G2288', palavra: 'θάνατος', transliteracao: 'thanatos', definicao: 'morte', morfologia: 'substantivo, nominativo, masculino, singular', idioma: 'grego' },
  ],
  'jo:3:16': [
    { strong: 'G2316', palavra: 'θεός', transliteracao: 'theos', definicao: 'Deus', morfologia: 'substantivo, nominativo, masculino, singular', idioma: 'grego' },
    { strong: 'G2889', palavra: 'κόσμος', transliteracao: 'kosmos', definicao: 'mundo, ordem cósmica', morfologia: 'substantivo, acusativo, masculino, singular', idioma: 'grego' },
    { strong: 'G3779', palavra: 'οὕτως', transliteracao: 'houtōs', definicao: 'de tal modo, assim', morfologia: 'advérbio', idioma: 'grego' },
    { strong: 'G25', palavra: 'ἀγαπάω', transliteracao: 'agapaō', definicao: 'amar, ter afeto profundo', morfologia: 'verbo, aoristo ativo indicativo, 3ª pessoa singular', idioma: 'grego' },
    { strong: 'G3441', palavra: 'μονογενής', transliteracao: 'monogenēs', definicao: 'unigênito, único', morfologia: 'adjetivo, acusativo, masculino, singular', idioma: 'grego' },
    { strong: 'G4100', palavra: 'πιστεύω', transliteracao: 'pisteuō', definicao: 'crer, ter fé', morfologia: 'verbo, presente ativo participio, nominativo masculino singular', idioma: 'grego' },
    { strong: 'G2288', palavra: 'θάνατος', transliteracao: 'thanatos', definicao: 'morte', morfologia: 'substantivo, genitivo, masculino, singular', idioma: 'grego' },
  ],
  'rm:5:8': [
    { strong: 'G2316', palavra: 'θεός', transliteracao: 'theos', definicao: 'Deus', morfologia: 'substantivo, nominativo, masculino, singular', idioma: 'grego' },
    { strong: 'G4100', palavra: 'πιστεύω', transliteracao: 'pisteuō', definicao: 'crer, ter fé', morfologia: 'verbo, presente ativo indicativo, 3ª pessoa singular', idioma: 'grego' },
    { strong: 'G266', palavra: 'ἁμαρτωλός', transliteracao: 'hamartōlos', definicao: 'pecador, culpado', morfologia: 'adjetivo, dativo, masculino, plural', idioma: 'grego' },
    { strong: 'G599', palavra: 'ἀποθνῄσκω', transliteracao: 'apothnēskō', definicao: 'morrer', morfologia: 'verbo, aoristo ativo indicativo, 3ª pessoa plural', idioma: 'grego' },
  ],
  'gn:1:1': [
    { strong: 'H1231', palavra: 'בָּרָא', transliteracao: 'bara', definicao: 'criar (ex nihilo)', morfologia: 'verbo, Qal perfecto, 3ª pessoa masculino singular', idioma: 'hebraico' },
    { strong: 'H430', palavra: 'אֱלֹהִים', transliteracao: 'elohim', definicao: 'Deus, seres divinos', morfologia: 'substantivo, masculino, plural', idioma: 'hebraico' },
    { strong: 'H8064', palavra: 'שָׁמַיִם', transliteracao: 'shamayim', definicao: 'céus', morfologia: 'substantivo, masculino, plural', idioma: 'hebraico' },
    { strong: 'H776', palavra: 'אֶרֶץ', transliteracao: 'eretz', definicao: 'terra', morfologia: 'substantivo, feminino, singular', idioma: 'hebraico' },
  ],
  'sl:23:1': [
    { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', definicao: 'Senhor, nome próprio de Deus', morfologia: 'substantivo próprio, masculino, singular', idioma: 'hebraico' },
    { strong: 'H7462', palavra: 'רָעָה', transliteracao: 'ra\'ah', definicao: 'apacentar, cuidar', morfologia: 'verbo, Qal imperfecto, 3ª pessoa masculino singular', idioma: 'hebraico' },
  ],
};

export function getStrongPorVersiculo(livro: string, cap: number, ver: number): PalavraStrong[] {
  const chave = `${livro}:${cap}:${ver}`;
  return STRONG_POR_VERSICULO[chave] || [];
}

export function getTodasOcorrenciasStrong(strong: string): string[] {
  return Object.entries(STRONG_POR_VERSICULO)
    .filter(([_, palavras]) => palavras.some(p => p.strong === strong))
    .map(([chave]) => chave);
}

export function buscarStrong(pesquisa: string): PalavraStrong[] {
  const termo = pesquisa.toLowerCase();
  const resultados: PalavraStrong[] = [];
  for (const palavras of Object.values(STRONG_POR_VERSICULO)) {
    for (const p of palavras) {
      if (p.strong.toLowerCase().includes(termo) ||
          p.palavra.toLowerCase().includes(termo) ||
          p.transliteracao.toLowerCase().includes(termo) ||
          p.definicao.toLowerCase().includes(termo)) {
        resultados.push(p);
      }
    }
  }
  return resultados;
}

export function getVersiculosComStrong(): string[] {
  return Object.keys(STRONG_POR_VERSICULO);
}
