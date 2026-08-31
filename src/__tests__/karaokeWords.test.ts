import { karaokeProgressFromAudio, karaokeWordIndex, splitKaraokeWords } from '@/lib/karaokeWords';

describe('karaokeWords', () => {
  it('divide o verso em palavras reais', () => {
    expect(splitKaraokeWords('No princípio criou Deus')).toEqual(['No', 'princípio', 'criou', 'Deus']);
  });

  it('usa o progresso do áudio, sem inventar timestamps', () => {
    const words = splitKaraokeWords('No princípio criou Deus os céus');
    expect(karaokeWordIndex(words, 0)).toBe(0);
    expect(karaokeWordIndex(words, 1)).toBe(words.length - 1);
    expect(karaokeProgressFromAudio(5, 10)).toBe(0.5);
    expect(karaokeProgressFromAudio(0, 0)).toBe(0);
  });
});
