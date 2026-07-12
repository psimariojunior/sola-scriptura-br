import { 
  obterComentarios, 
  temComentario, 
  obterAutoresComentarios 
} from '@/data/comentarios';

describe('comentarios.ts', () => {
  test('temComentario retorna true para versículos com comentário', () => {
    expect(temComentario('jo', 3, 16)).toBe(true);
    expect(temComentario('gn', 1, 1)).toBe(true);
    expect(temComentario('sl', 23, 1)).toBe(true);
  });

  test('temComentario retorna false para versículos sem comentário', () => {
    expect(temComentario('lv', 1, 1)).toBe(false);
  });

  test('obterComentarios retorna array de comentários', () => {
    const comentarios = obterComentarios('jo', 3, 16);
    expect(Array.isArray(comentarios)).toBe(true);
    expect(comentarios.length).toBeGreaterThan(0);
    expect(comentarios[0]).toHaveProperty('autor');
    expect(comentarios[0]).toHaveProperty('texto');
  });

  test('obterAutoresComentarios retorna lista de autores', () => {
    const autores = obterAutoresComentarios();
    expect(Array.isArray(autores)).toBe(true);
    expect(autores.length).toBeGreaterThan(10);
    expect(autores).toContain('Calvino');
    expect(autores).toContain('Lutero');
  });
});
