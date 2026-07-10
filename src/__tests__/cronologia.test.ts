import { cronologia } from '@/data/biblia';

describe('Cronologia Bíblica', () => {
  it('should have 40+ events', () => {
    expect(cronologia.length).toBeGreaterThanOrEqual(40);
  });

  it('should have valid structure for all events', () => {
    cronologia.forEach(e => {
      expect(e.ano).toBeTruthy();
      expect(e.evento).toBeTruthy();
      expect(e.referencia).toBeTruthy();
      expect(e.tipo).toBeTruthy();
    });
  });

  it('should have valid event types', () => {
    const tiposValidos = ['criacao', 'patriarca', 'lei', 'reis', 'profeta', 'exilio', 'vinda', 'igreja'];
    cronologia.forEach(e => {
      expect(tiposValidos).toContain(e.tipo);
    });
  });

  it('should cover creation period', () => {
    const criacao = cronologia.filter(e => e.tipo === 'criacao');
    expect(criacao.length).toBeGreaterThan(0);
  });

  it('should cover patriarch period', () => {
    const patriarca = cronologia.filter(e => e.tipo === 'patriarca');
    expect(patriarca.length).toBeGreaterThan(0);
  });

  it('should cover law period', () => {
    const lei = cronologia.filter(e => e.tipo === 'lei');
    expect(lei.length).toBeGreaterThan(0);
  });

  it('should cover kings period', () => {
    const reis = cronologia.filter(e => e.tipo === 'reis');
    expect(reis.length).toBeGreaterThan(0);
  });

  it('should cover prophets period', () => {
    const profeta = cronologia.filter(e => e.tipo === 'profeta');
    expect(profeta.length).toBeGreaterThan(0);
  });

  it('should cover exile period', () => {
    const exilio = cronologia.filter(e => e.tipo === 'exilio');
    expect(exilio.length).toBeGreaterThan(0);
  });

  it('should cover coming of Christ period', () => {
    const vinda = cronologia.filter(e => e.tipo === 'vinda');
    expect(vinda.length).toBeGreaterThan(0);
  });

  it('should cover church period', () => {
    const igreja = cronologia.filter(e => e.tipo === 'igreja');
    expect(igreja.length).toBeGreaterThan(0);
  });

  it('should include creation of heavens and earth', () => {
    const criacao = cronologia.find(e => e.evento.includes('Criação'));
    expect(criacao).toBeDefined();
    expect(criacao?.tipo).toBe('criacao');
  });

  it('should include crucifixion and resurrection', () => {
    const crucificacao = cronologia.find(e => e.evento.includes('Crucificação'));
    expect(crucificacao).toBeDefined();
    expect(crucificacao?.tipo).toBe('vinda');
  });
});
