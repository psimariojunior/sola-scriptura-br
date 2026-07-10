import { TODOS_LIVROS, LIVROS_AT, LIVROS_NT, livroPorAbreviacao } from '@/data/biblia/livros';

describe('Biblia Livros', () => {
  it('should have 66 books total', () => {
    expect(TODOS_LIVROS).toHaveLength(66);
  });

  it('should have 39 AT books', () => {
    expect(LIVROS_AT).toHaveLength(39);
  });

  it('should have 27 NT books', () => {
    expect(LIVROS_NT).toHaveLength(27);
  });

  it('should find Genesis by abbreviation', () => {
    const genesis = livroPorAbreviacao.get('gn');
    expect(genesis).toBeDefined();
    expect(genesis?.nome).toBe('Gênesis');
    expect(genesis?.testamento).toBe('AT');
    expect(genesis?.totalCapitulos).toBe(50);
  });

  it('should find Revelation by abbreviation', () => {
    const revelation = livroPorAbreviacao.get('ap');
    expect(revelation).toBeDefined();
    expect(revelation?.nome).toBe('Apocalipse');
    expect(revelation?.testamento).toBe('NT');
    expect(revelation?.totalCapitulos).toBe(22);
  });

  it('should have valid total chapters for all books', () => {
    TODOS_LIVROS.forEach(book => {
      expect(book.totalCapitulos).toBeGreaterThan(0);
      expect(book.totalCapitulos).toBeLessThanOrEqual(150);
    });
  });

  it('should have unique abbreviations', () => {
    const abbreviations = TODOS_LIVROS.map(b => b.abreviacao);
    const unique = new Set(abbreviations);
    expect(unique.size).toBe(abbreviations.length);
  });
});
