import { alignSequences } from '@/lib/wordAlignment';
import type { PalavraStrong } from '@/data/biblia/strong';

function s(strong: string, palavra: string, definicao: string): PalavraStrong {
  return {
    strong,
    palavra,
    transliteracao: '',
    definicao,
    morfologia: '',
    idioma: strong.startsWith('H') ? 'hebraico' : 'grego',
  };
}

describe('alignSequences', () => {
  test('alinha palavra PT com a definição Strong correspondente', () => {
    const pt = 'No princípio criou Deus os céus e a terra.'.split(/\s+/).filter(Boolean);
    const strongs: PalavraStrong[] = [
      s('H7225', 'רֵאשִׁית', 'princípio, início, primícias'),
      s('H1254', 'בָּרָא', 'criar, formar'),
      s('H430', 'אֱלֹהִים', 'Deus, deuses'),
      s('H853', 'אֵת', 'marca de objeto direto'),
      s('H8064', 'שָׁמַיִם', 'céus, céu'),
      s('H853', 'אֵת', 'marca de objeto direto'),
      s('H776', 'אֶרֶץ', 'terra, país, chão'),
    ];
    const align = alignSequences(pt, strongs);
    expect(strongs[align[pt.indexOf('princípio')]!].strong).toBe('H7225');
    expect(strongs[align[pt.indexOf('criou')]!].strong).toBe('H1254');
    expect(strongs[align[pt.indexOf('Deus')]!].strong).toBe('H430');
    expect(strongs[align[pt.indexOf('céus')]!].strong).toBe('H8064');
    expect(strongs[align[pt.indexOf('terra.')]!].strong).toBe('H776');
  });
});
