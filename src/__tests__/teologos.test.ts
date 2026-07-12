import { 
  getTeologo,
  getTeologosPorPeriodo,
  listarTodosTeologos 
} from '@/data/teologos';

describe('teologos.ts', () => {
  test('listarTodosTeologos retorna mais de 70 teólogos', () => {
    const teologos = listarTodosTeologos();
    expect(teologos.length).toBeGreaterThan(70);
  });

  test('getTeologo retorna Calvino', () => {
    const calvino = getTeologo('joao-calvino');
    expect(calvino).toBeDefined();
    expect(calvino?.nome).toContain('Calvino');
  });

  test('getTeologo retorna undefined para slug inexistente', () => {
    const teologo = getTeologo('inexistente-xyz');
    expect(teologo).toBeUndefined();
  });

  test('getTeologosPorPeriodo filtra patrísticos', () => {
    const patristicos = getTeologosPorPeriodo('patristico');
    expect(patristicos.length).toBeGreaterThan(3);
    patristicos.forEach(t => {
      expect(t.periodo).toBe('patristico');
    });
  });

  test('cada teólogo tem obrasChave', () => {
    const teologos = listarTodosTeologos();
    teologos.slice(0, 20).forEach(t => {
      expect(Array.isArray(t.obrasChave)).toBe(true);
      expect(t.obrasChave.length).toBeGreaterThan(0);
    });
  });
});
