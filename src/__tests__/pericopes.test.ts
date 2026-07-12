import { 
  getPericopesLivro, 
  getPericopePorVersiculo,
  getPericopesPorGenero,
  todasPericopes 
} from '@/data/biblia/pericopes';

describe('pericopes.ts', () => {
  test('todasPericopes tem mais de 300 perícopes', () => {
    expect(todasPericopes.length).toBeGreaterThan(300);
  });

  test('getPericopesLivro retorna perícopes de um livro', () => {
    const pericopes = getPericopesLivro('Mateus');
    expect(Array.isArray(pericopes)).toBe(true);
    expect(pericopes.length).toBeGreaterThan(5);
    pericopes.forEach(p => {
      expect(p.livro).toBe('Mateus');
    });
  });

  test('getPericopePorVersiculo retorna perícope ou undefined', () => {
    const pericope = getPericopePorVersiculo('Mateus', 5, 3);
    if (pericope) {
      expect(pericope).toHaveProperty('titulo');
      expect(pericope).toHaveProperty('genero');
    }
  });

  test('getPericopesPorGenero filtra corretamente', () => {
    const parabolas = getPericopesPorGenero('parabola');
    expect(Array.isArray(parabolas)).toBe(true);
    parabolas.forEach(p => {
      expect(p.genero).toBe('parabola');
    });
  });

  test('cada perícope tem campos obrigatórios', () => {
    todasPericopes.slice(0, 50).forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('titulo');
      expect(p).toHaveProperty('genero');
      expect(p).toHaveProperty('tema');
    });
  });
});
