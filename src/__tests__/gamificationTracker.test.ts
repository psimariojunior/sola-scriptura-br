/**
 * Testes do gamificationTracker (src/lib/gamificationTracker.ts)
 * Cobertura: trackEvent, getSummary, getWeeklyStats, getMonthlyHeatmap, calcularStreakFromEvents
 */
import { trackEvent, getSummary, getWeeklyStats, getMonthlyHeatmap } from '@/lib/gamificationTracker';

beforeEach(() => {
  localStorage.clear();
});

describe('gamificationTracker — trackEvent', () => {
  it('adiciona evento ao localStorage', () => {
    trackEvent('versiculo_lido', 5);
    const raw = localStorage.getItem('ssb_gamification_tracker');
    expect(raw).toBeTruthy();
    const events = JSON.parse(raw!);
    expect(events).toHaveLength(1);
    expect(events[0].tipo).toBe('versiculo_lido');
    expect(events[0].quantidade).toBe(5);
    expect(events[0].timestamp).toBeGreaterThan(0);
  });

  it('acumula multiplos eventos', () => {
    trackEvent('versiculo_lido', 3);
    trackEvent('capitulo_lido', 1);
    trackEvent('quiz_completo', 2);
    const raw = localStorage.getItem('ssb_gamification_tracker');
    const events = JSON.parse(raw!);
    expect(events).toHaveLength(3);
  });

  it('inclui dados opcionais', () => {
    trackEvent('estudo_feito', 1, { livro: 'romanos', capitulo: 8 });
    const raw = localStorage.getItem('ssb_gamification_tracker');
    const events = JSON.parse(raw!);
    expect(events[0].dados).toEqual({ livro: 'romanos', capitulo: 8 });
  });

  it('quantidade padrao e 1', () => {
    trackEvent('favorito');
    const raw = localStorage.getItem('ssb_gamification_tracker');
    const events = JSON.parse(raw!);
    expect(events[0].quantidade).toBe(1);
  });
});

describe('gamificationTracker — getSummary', () => {
  it('retorna zeros quando nao ha eventos', () => {
    const summary = getSummary();
    expect(summary.totalVersiculos).toBe(0);
    expect(summary.totalCapitulos).toBe(0);
    expect(summary.totalQuizzes).toBe(0);
    expect(summary.streakAtual).toBe(0);
    expect(summary.melhorStreak).toBe(0);
    expect(summary.diasAtivos).toEqual([]);
  });

  it('agrega eventos por tipo corretamente', () => {
    trackEvent('versiculo_lido', 5);
    trackEvent('versiculo_lido', 3);
    trackEvent('capitulo_lido', 1);
    trackEvent('quiz_completo', 2);

    const summary = getSummary();
    expect(summary.totalVersiculos).toBe(8);
    expect(summary.totalCapitulos).toBe(1);
    expect(summary.totalQuizzes).toBe(2);
  });

  it('conta todos os 18 tipos de eventos', () => {
    const tipos = [
      'versiculo_lido', 'capitulo_lido', 'quiz_completo', 'estudo_feito',
      'favorito', 'anotacao', 'compartilhou', 'sala_colaborativa',
      'exegese', 'concordancia', 'harmonia', 'atlas', 'cronologia',
      'palavra_estudada', 'referencia_seguida', 'comentario_lido',
      'flashcard_revisado', 'plano_lido',
    ] as const;

    tipos.forEach((tipo, i) => trackEvent(tipo, i + 1));

    const summary = getSummary();
    expect(summary.totalVersiculos).toBe(1);
    expect(summary.totalCapitulos).toBe(2);
    expect(summary.totalQuizzes).toBe(3);
    expect(summary.totalEstudos).toBe(4);
    expect(summary.totalFavoritos).toBe(5);
    expect(summary.totalAnotacoes).toBe(6);
    expect(summary.totalCompartilhamentos).toBe(7);
    expect(summary.totalSalas).toBe(8);
    expect(summary.totalExegese).toBe(9);
    expect(summary.totalConcordancia).toBe(10);
    expect(summary.totalHarmonia).toBe(11);
    expect(summary.totalAtlas).toBe(12);
    expect(summary.totalCronologia).toBe(13);
    expect(summary.totalPalavras).toBe(14);
    expect(summary.totalReferencias).toBe(15);
    expect(summary.totalComentarios).toBe(16);
    expect(summary.totalFlashcards).toBe(17);
    expect(summary.totalPlanos).toBe(18);
  });

  it('calcula streak atual com eventos de hoje', () => {
    const now = Date.now();
    // Força eventos com timestamps de hoje
    const raw = JSON.stringify([
      { tipo: 'versiculo_lido', quantidade: 1, timestamp: now },
    ]);
    localStorage.setItem('ssb_gamification_tracker', raw);

    const summary = getSummary();
    expect(summary.streakAtual).toBeGreaterThanOrEqual(1);
    expect(summary.diasAtivos).toHaveLength(1);
  });

  it('diasAtivos contem datas unicas', () => {
    const now = Date.now();
    const raw = JSON.stringify([
      { tipo: 'versiculo_lido', quantidade: 1, timestamp: now },
      { tipo: 'capitulo_lido', quantidade: 1, timestamp: now },
    ]);
    localStorage.setItem('ssb_gamification_tracker', raw);

    const summary = getSummary();
    expect(summary.diasAtivos).toHaveLength(1);
  });
});

describe('gamificationTracker — getWeeklyStats', () => {
  it('retorna 7 dias', () => {
    const stats = getWeeklyStats();
    expect(stats).toHaveLength(7);
  });

  it('cada dia tem versiculos, capitulos, quizzes', () => {
    const stats = getWeeklyStats();
    stats.forEach(day => {
      expect(day).toHaveProperty('dia');
      expect(day).toHaveProperty('versiculos');
      expect(day).toHaveProperty('capitulos');
      expect(day).toHaveProperty('quizzes');
    });
  });

  it('agrega eventos do dia corretamente', () => {
    const now = Date.now();
    const raw = JSON.stringify([
      { tipo: 'versiculo_lido', quantidade: 5, timestamp: now },
      { tipo: 'versiculo_lido', quantidade: 3, timestamp: now },
      { tipo: 'quiz_completo', quantidade: 1, timestamp: now },
    ]);
    localStorage.setItem('ssb_gamification_tracker', raw);

    const stats = getWeeklyStats();
    const today = stats.find(d => {
      const todayStr = new Date().toISOString().split('T')[0];
      return true; // pega o ultimo (hoje)
    });
    // Pelo menos um dia deve ter versiculos > 0
    const totalVersiculos = stats.reduce((s, d) => s + d.versiculos, 0);
    expect(totalVersiculos).toBe(8);
  });
});

describe('gamificationTracker — getMonthlyHeatmap', () => {
  it('retorna 30 dias', () => {
    const heatmap = getMonthlyHeatmap();
    const keys = Object.keys(heatmap);
    expect(keys).toHaveLength(30);
  });

  it('chaves sao strings de data YYYY-MM-DD', () => {
    const heatmap = getMonthlyHeatmap();
    const keys = Object.keys(heatmap);
    keys.forEach(key => {
      expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('conta eventos por dia', () => {
    const now = Date.now();
    const raw = JSON.stringify([
      { tipo: 'versiculo_lido', quantidade: 10, timestamp: now },
      { tipo: 'capitulo_lido', quantidade: 2, timestamp: now },
    ]);
    localStorage.setItem('ssb_gamification_tracker', raw);

    const heatmap = getMonthlyHeatmap();
    const today = new Date().toISOString().split('T')[0];
    expect(heatmap[today]).toBe(12);
  });
});

describe('gamificationTracker — persistencia', () => {
  it('eventos persistem entre chamadas', () => {
    trackEvent('versiculo_lido', 1);
    trackEvent('capitulo_lido', 1);
    const s1 = getSummary();
    expect(s1.totalVersiculos).toBe(1);
    expect(s1.totalCapitulos).toBe(1);
  });

  it('lidar com localStorage corrompido', () => {
    localStorage.setItem('ssb_gamification_tracker', 'invalid json{{{');
    const summary = getSummary();
    expect(summary.totalVersiculos).toBe(0);
  });
});
