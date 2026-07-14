import { traducoes, traducaoPadrao } from '@/data/biblia/versoes';

describe('Traduções', () => {
  it('should have 8 translations', () => {
    expect(traducoes).toHaveLength(9);
  });

  it('should have ARC as default translation', () => {
    expect(traducaoPadrao).toBe('arc');
  });

  it('should have all required translations', () => {
    const ids = traducoes.map(t => t.id);
    expect(ids).toContain('arc');
    expect(ids).toContain('nvi');
    expect(ids).toContain('naa');
    expect(ids).toContain('ara');
    expect(ids).toContain('acf');
    expect(ids).toContain('aa');
    expect(ids).toContain('ntlh');
    expect(ids).toContain('kjv');
    expect(ids).toContain('web');
  });

  it('should have valid translation structure', () => {
    traducoes.forEach(t => {
      expect(t.id).toBeTruthy();
      expect(t.nome).toBeTruthy();
      expect(t.sigla).toBeTruthy();
      expect(t.descricao).toBeTruthy();
      expect(t.idioma).toBeTruthy();
      expect(t.ano).toBeGreaterThan(0);
    });
  });
});
