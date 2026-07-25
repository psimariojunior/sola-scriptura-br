import { 
  getRecursosVersiculo, 
  getTiposRecursoDisponiveis, 
  temRecursoEspecifico 
} from '@/data/biblia/versiculoRecursos';

describe('versiculoRecursos.ts', () => {
  test('getRecursosVersiculo retorna array para versículo existente', async () => {
    const recursos = await getRecursosVersiculo('jo', 3, 16);
    expect(Array.isArray(recursos)).toBe(true);
    expect(recursos.length).toBeGreaterThan(0);
  });

  test('recursos têm campo tipo válido', async () => {
    const recursos = await getRecursosVersiculo('jo', 3, 16);
    const tiposValidos = ['comentario', 'estudo', 'nota', 'cross-ref', 'lexico', 'mapa', 'personagem', 'doutrina', 'cronologia', 'pericope', 'contexto-historico'];
    recursos.forEach(r => {
      expect(tiposValidos).toContain(r.tipo);
    });
  });

  test('getTiposRecursoDisponiveis retorna tipos para versículo', async () => {
    const tipos = await getTiposRecursoDisponiveis('jo', 3, 16);
    expect(Array.isArray(tipos)).toBe(true);
    expect(tipos.length).toBeGreaterThan(0);
  });

  test('temRecursoEspecifico retorna boolean', async () => {
    expect(typeof await temRecursoEspecifico('jo', 3, 16, 'comentario')).toBe('boolean');
  });

  test('versículo com comentário tem tipo comentario', async () => {
    const tipos = await getTiposRecursoDisponiveis('jo', 3, 16);
    expect(tipos).toContain('comentario');
  });
});
