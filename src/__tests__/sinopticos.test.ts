import paralelos, { 
  getParalelosLivro, 
  getParalelosPorCategoria 
} from '@/data/biblia/sinopticos';

describe('sinopticos.ts', () => {
  test('paralelos tem mais de 200 paralelos', () => {
    expect(paralelos.length).toBeGreaterThan(200);
  });

  test('getParalelosLivro retorna paralelos de Mateus', () => {
    const mt = getParalelosLivro('mt');
    expect(Array.isArray(mt)).toBe(true);
    expect(mt.length).toBeGreaterThan(20);
    mt.forEach(p => {
      expect(p.mateus).toBeDefined();
    });
  });

  test('getParalelosPorCategoria filtra parábolas', () => {
    const parabolas = getParalelosPorCategoria('parabola');
    expect(Array.isArray(parabolas)).toBe(true);
    expect(parabolas.length).toBeGreaterThan(10);
    parabolas.forEach(p => {
      expect(p.categoria).toBe('parabola');
    });
  });

  test('getParalelosPorCategoria filtra milagres', () => {
    const milagres = getParalelosPorCategoria('milagre');
    expect(Array.isArray(milagres)).toBe(true);
    expect(milagres.length).toBeGreaterThan(5);
  });

  test('paralelos têm pelo menos 1 referência de evangelho', () => {
    paralelos.slice(0, 30).forEach(p => {
      const temReferencia = !!(p.mateus || p.marcos || p.lucas || p.joao);
      expect(temReferencia).toBe(true);
    });
  });
});
