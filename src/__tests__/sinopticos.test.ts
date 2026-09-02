import paralelos, { 
  getParalelosLivro, 
  getParalelosPorCategoria,
  getParalelosDoCapitulo,
  parseRefSinotico,
  formatarRefSinotica,
} from '@/data/biblia/sinopticos';

describe('sinopticos.ts', () => {
  test('paralelos tem mais de 200 paralelos', () => {
    expect(paralelos.length).toBeGreaterThan(200);
  });

  test('getParalelosLivro retorna paralelos de Mateus', () => {
    const mt = getParalelosLivro('mt');
    expect(Array.isArray(mt)).toBe(true);
    expect(mt.length).toBeGreaterThan(20);
    mt.forEach(p => {
      expect(p.mateus).toBeDefined();
    });
  });

  test('getParalelosPorCategoria filtra parábolas', () => {
    const parabolas = getParalelosPorCategoria('parabola');
    expect(Array.isArray(parabolas)).toBe(true);
    expect(parabolas.length).toBeGreaterThan(10);
    parabolas.forEach(p => {
      expect(p.categoria).toBe('parabola');
    });
  });

  test('getParalelosPorCategoria filtra milagres', () => {
    const milagres = getParalelosPorCategoria('milagre');
    expect(Array.isArray(milagres)).toBe(true);
    expect(milagres.length).toBeGreaterThan(5);
  });

  test('paralelos têm pelo menos 1 referência de evangelho', () => {
    paralelos.slice(0, 30).forEach(p => {
      const temReferencia = !!(p.mateus || p.marcos || p.lucas || p.joao);
      expect(temReferencia).toBe(true);
    });
  });

  test('parseRefSinotico cobre verso, faixa e capítulo cruzado', () => {
    expect(parseRefSinotico('mt:13:33')).toMatchObject({
      livro: 'mt', capInicio: 13, verInicio: 33, capFim: 13, verFim: 33,
    });
    expect(parseRefSinotico('mc:1:9-11')).toMatchObject({
      livro: 'mc', capInicio: 1, verInicio: 9, capFim: 1, verFim: 11,
    });
    expect(parseRefSinotico('mt:5:1-7:29')).toMatchObject({
      livro: 'mt', capInicio: 5, verInicio: 1, capFim: 7, verFim: 29,
    });
    expect(formatarRefSinotica('lc:6:20-26')).toBe('Lc 6:20–26');
  });

  test('getParalelosDoCapitulo lista outros evangelhos e omite caixa vazia', () => {
    const mt3 = getParalelosDoCapitulo('mt', 3);
    expect(mt3.length).toBeGreaterThan(0);
    mt3.forEach((item) => {
      expect(item.outrosEvangelhos.length).toBeGreaterThan(0);
      expect(item.refsNesteCapitulo.length).toBeGreaterThan(0);
    });
    const titulos = mt3.map((i) => i.paralelo.titulo).join(' ');
    expect(titulos.toLowerCase()).toMatch(/batismo|joão batista|tentação/);

    const soDeste = getParalelosDoCapitulo('gn', 1);
    expect(soDeste).toEqual([]);
  });

  test('Sermão do Monte cruza capítulos 5–7 em Mateus', () => {
    const mt6 = getParalelosDoCapitulo('mt', 6);
    expect(mt6.some((i) => /pai nosso|sermão|preocupar|tesouro/i.test(i.paralelo.titulo))).toBe(true);
  });
});
