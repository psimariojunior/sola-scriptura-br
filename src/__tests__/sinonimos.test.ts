import {
  expandirConsulta,
  correspondeSemanticamente,
  obterGrupos,
  obterTodosGrupos,
  obterQueryExpandida,
} from '@/lib/sinonimos';

describe('sinonimos', () => {
  describe('expandirConsulta', () => {
    it('expands known terms', () => {
      const result = expandirConsulta('fé');
      expect(result).toContain('fé');
      expect(result).toContain('crer');
      expect(result).toContain('crenca');
    });

    it('returns original term if not found', () => {
      const result = expandirConsulta('xyzabc');
      expect(result).toContain('xyzabc');
    });

    it('is case insensitive', () => {
      const result = expandirConsulta('FÉ');
      expect(result).toContain('fé');
    });
  });

  describe('correspondeSemanticamente', () => {
    it('matches without semantic search', () => {
      expect(correspondeSemanticamente('A fé é importante', 'fé', false)).toBe(true);
    });

    it('does not match without semantic search', () => {
      expect(correspondeSemanticamente('A fé é importante', 'amor', false)).toBe(false);
    });

    it('matches with semantic search', () => {
      expect(correspondeSemanticamente('A confianca é importante', 'fé', true)).toBe(true);
    });

    it('does not match with semantic search', () => {
      expect(correspondeSemanticamente('O azul é bonito', 'fé', true)).toBe(false);
    });
  });

  describe('obterGrupos', () => {
    it('returns groups for known terms', () => {
      const result = obterGrupos(['fé']);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain('fe');
    });

    it('returns empty for unknown terms', () => {
      const result = obterGrupos(['xyzabc']);
      expect(result.length).toBe(0);
    });
  });

  describe('obterTodosGrupos', () => {
    it('returns all groups', () => {
      const result = obterTodosGrupos();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('conceito');
      expect(result[0]).toHaveProperty('termos');
    });
  });

  describe('obterQueryExpandida', () => {
    it('returns expanded query', () => {
      const result = obterQueryExpandida('fé');
      expect(result).toContain('OR');
      expect(result).toContain('fé');
    });
  });
});
