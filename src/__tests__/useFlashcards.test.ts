/**
 * Testes do hook useFlashcards (src/hooks/useFlashcards.ts)
 * Valida o algoritmo SM-2 (easiness/interval/repetitions/dueDate),
 * addCardManual e agregação de stats. SSR-safe (localStorage só no cliente).
 */
import { renderHook, act } from '@testing-library/react';
import { useFlashcards } from '@/hooks/useFlashcards';

beforeEach(() => {
  localStorage.clear();
});

describe('useFlashcards — SM-2 (review)', () => {
  test('quality 5 (easy) aumenta easiness e define intervalo crescente', () => {
    const { result } = renderHook(() => useFlashcards());

    act(() => { result.current.addCard('jo:3:16:arc'); });
    expect(result.current.cards.length).toBe(1);
    const key = result.current.cards[0].verseKey;

    // Primeira revisão correta (quality 5)
    act(() => { result.current.review(key, 5); });
    let card = result.current.cards[0];
    expect(card.repetitions).toBe(1);
    expect(card.interval).toBe(1);
    expect(card.easiness).toBeCloseTo(2.6, 5); // 2.5 + 0.1
    expect(card.correctStreak).toBe(1);
    expect(card.dueDate).toBeGreaterThan(Date.now());

    // Segunda revisão correta (quality 5): interval = round(6 * 1.3) = 8
    act(() => { result.current.review(key, 5); });
    card = result.current.cards[0];
    expect(card.repetitions).toBe(2);
    expect(card.interval).toBe(8);
    expect(card.easiness).toBeCloseTo(2.7, 5);

    // Terceira revisão (quality 5): interval = round(8 * 2.7) * 1.3 = round(21.6)=22 -> 29
    act(() => { result.current.review(key, 5); });
    card = result.current.cards[0];
    expect(card.repetitions).toBe(3);
    expect(card.interval).toBe(Math.round(Math.round(8 * 2.7) * 1.3));
    expect(card.correctStreak).toBe(3);
  });

  test('quality 1 (again) zera repetitions e intervalo', () => {
    const { result } = renderHook(() => useFlashcards());

    act(() => { result.current.addCard('gn:1:1:arc'); });
    const key = result.current.cards[0].verseKey;

    act(() => { result.current.review(key, 5); });
    act(() => { result.current.review(key, 5); });
    expect(result.current.cards[0].repetitions).toBe(2);

    // "again" (quality 1) reseta
    act(() => { result.current.review(key, 1); });
    const card = result.current.cards[0];
    expect(card.repetitions).toBe(0);
    expect(card.interval).toBe(0);
    expect(card.correctStreak).toBe(0);
    // easiness não desce abaixo de 1.3
    expect(card.easiness).toBeGreaterThanOrEqual(1.3);
  });

  test('quality mantém easiness >= 1.3', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.addCard('sl:23:1:arc'); });
    const key = result.current.cards[0].verseKey;
    for (let i = 0; i < 10; i++) act(() => { result.current.review(key, 0); });
    expect(result.current.cards[0].easiness).toBe(1.3);
  });
});

describe('useFlashcards — addCardManual e stats', () => {
  test('addCardManual cria card com referência e texto', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.addCardManual('João 3:16', 'Porque Deus amou...'); });
    expect(result.current.cards.length).toBe(1);
    const c = result.current.cards[0];
    expect(c.verseKey).toBe('manual:joão 3:16');
    expect(c.manualReferencia).toBe('João 3:16');
    expect(c.manualTexto).toBe('Porque Deus amou...');
  });

  test('não duplica card manual com mesma referência', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.addCardManual('Rm 8:28', 'Todas as coisas.'); });
    act(() => { result.current.addCardManual('Rm 8:28', 'Outro texto.'); });
    expect(result.current.cards.length).toBe(1);
  });

  test('stats categoriza cards novos/aprendizado/revisão/conhecidos', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.addCard('a:1:1:arc'); }); // novo (rep 0)
    act(() => { result.current.addCard('b:1:1:arc'); }); // será learning
    act(() => { result.current.addCard('c:1:1:arc'); }); // conhecido

    const k1 = result.current.cards[0].verseKey;
    const k2 = result.current.cards[1].verseKey;
    const k3 = result.current.cards[2].verseKey;

    // k2 -> aprendizado (1-2 reps)
    act(() => { result.current.review(k2, 5); });
    // k3 -> conhecido (>=3 reps, interval>=21)
    act(() => { result.current.review(k3, 5); });
    act(() => { result.current.review(k3, 5); });
    act(() => { result.current.review(k3, 5); });
    act(() => { result.current.review(k3, 5); }); // garante interval grande

    const stats = result.current.stats;
    expect(stats.new).toBe(1); // k1
    expect(stats.learning).toBe(1); // k2
    expect(result.current.totalCards).toBe(3);
  });

  test('removeCard remove pelo verseKey', () => {
    const {  result  } = renderHook(() => useFlashcards());
    act(() => { result.current.addCard('jo:1:1:arc'); });
    const key = result.current.cards[0].verseKey;
    act(() => { result.current.removeCard(key); });
    expect(result.current.cards.length).toBe(0);
  });
});

describe('useFlashcards — SSR-safe', () => {
  test('inicializa vazio quando window é undefined', () => {
    const realWindow = global.window;
    // @ts-expect-error simula ambiente sem window
    delete global.window;
    try {
      const { result } = renderHook(() => useFlashcards());
      expect(result.current.cards).toEqual([]);
    } finally {
      global.window = realWindow;
    }
  });
});
