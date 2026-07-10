import { personagens } from '@/data/biblia';

describe('Personagens Bíblicos', () => {
  it('should have 30+ characters', () => {
    expect(personagens.length).toBeGreaterThanOrEqual(30);
  });

  it('should have AT characters', () => {
    const at = personagens.filter(p => p.testamento === 'AT');
    expect(at.length).toBeGreaterThan(0);
  });

  it('should have NT characters', () => {
    const nt = personagens.filter(p => p.testamento === 'NT');
    expect(nt.length).toBeGreaterThan(0);
  });

  it('should have valid structure for all characters', () => {
    personagens.forEach(p => {
      expect(p.nome).toBeTruthy();
      expect(p.significado).toBeTruthy();
      expect(p.resumo).toBeTruthy();
      expect(['AT', 'NT']).toContain(p.testamento);
    });
  });

  it('should include Abraham', () => {
    const abrao = personagens.find(p => p.nome === 'Abraão');
    expect(abrao).toBeDefined();
    expect(abrao?.testamento).toBe('AT');
    expect(abrao?.significado).toBe('Pai de multidões');
  });

  it('should include Apostle Paul', () => {
    const paulo = personagens.find(p => p.nome === 'Paulo');
    expect(paulo).toBeDefined();
    expect(paulo?.testamento).toBe('NT');
  });

  it('should have unique character names', () => {
    const names = personagens.map(p => p.nome);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});
