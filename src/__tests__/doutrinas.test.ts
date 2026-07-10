import { doutrinas } from '@/data/biblia';

describe('Doutrinas', () => {
  it('should have 20+ doctrines', () => {
    expect(doutrinas.length).toBeGreaterThanOrEqual(20);
  });

  it('should have valid structure for all doctrines', () => {
    doutrinas.forEach(d => {
      expect(d.nome).toBeTruthy();
      expect(d.slug).toBeTruthy();
      expect(d.definicao).toBeTruthy();
      expect(Array.isArray(d.passagens)).toBe(true);
      expect(d.passagens.length).toBeGreaterThan(0);
      expect(d.categoria).toBeTruthy();
    });
  });

  it('should include Trinity doctrine', () => {
    const trindade = doutrinas.find(d => d.slug === 'trindade');
    expect(trindade).toBeDefined();
    expect(trindade?.categoria).toBe('Teísmo');
  });

  it('should include Justification doctrine', () => {
    const justificacao = doutrinas.find(d => d.slug === 'justificacao');
    expect(justificacao).toBeDefined();
    expect(justificacao?.categoria).toBe('Soteriologia');
  });

  it('should have unique slugs', () => {
    const slugs = doutrinas.map(d => d.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it('should have valid categories', () => {
    const categorias = new Set(doutrinas.map(d => d.categoria));
    expect(categorias.size).toBeGreaterThan(0);
    expect(categorias.has('Soteriologia')).toBe(true);
    expect(categorias.has('Teísmo')).toBe(true);
  });

  it('should have scripture references for all doctrines', () => {
    doutrinas.forEach(d => {
      d.passagens.forEach(p => {
        expect(p).toBeTruthy();
        expect(p.length).toBeGreaterThan(2);
      });
    });
  });
});
