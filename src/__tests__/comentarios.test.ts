import { obterComentarios, temComentario, obterTodosComentarios, obterAutoresComentarios } from '@/data/comentarios';

describe('Comentários', () => {
  it('should have comments for Genesis 1:1', () => {
    const comentarios = obterComentarios('gn', 1, 1);
    expect(comentarios.length).toBeGreaterThan(0);
  });

  it('should return true for verses with comments', () => {
    expect(temComentario('gn', 1, 1)).toBe(true);
    expect(temComentario('jo', 3, 16)).toBe(true);
    expect(temComentario('rm', 3, 23)).toBe(true);
  });

  it('should return false for verses without comments', () => {
    expect(temComentario('gn', 999, 999)).toBe(false);
  });

  it('should have valid comment structure', () => {
    const comentarios = obterComentarios('gn', 1, 1);
    comentarios.forEach(c => {
      expect(c.livro).toBe('gn');
      expect(c.capitulo).toBe(1);
      expect(c.versiculo).toBe(1);
      expect(c.autor).toBeTruthy();
      expect(c.texto).toBeTruthy();
      expect(['historico', 'teologico', 'gramatical', 'cultural', 'aplicacao', 'escatologico']).toContain(c.tipo);
    });
  });

  it('should return all comments', () => {
    const todos = obterTodosComentarios();
    expect(todos.length).toBeGreaterThan(50);
  });

  it('should return unique authors', () => {
    const autores = obterAutoresComentarios();
    expect(autores.length).toBeGreaterThan(5);
    expect(autores).toContain('Calvino');
    expect(autores).toContain('Lutero');
    expect(autores).toContain('Spurgeon');
  });
});
