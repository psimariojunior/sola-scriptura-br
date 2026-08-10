import { 
  getEntradaConcordancia, 
  buscarConcordancia,
  getConcordanciaPorIdioma 
} from '@/data/biblia/concordancia';

describe('concordancia.ts', () => {
  test('getEntradaConcordancia retorna entrada para Strong existente', async () => {
    const entrada = await getEntradaConcordancia('G2316');
    expect(entrada).toBeDefined();
    expect(entrada?.strong).toBe('G2316');
    expect(entrada?.ocorrencias.length).toBeGreaterThan(0);
  });

  test('getEntradaConcordancia retorna undefined para Strong inexistente', async () => {
    const entrada = await getEntradaConcordancia('Z9999');
    expect(entrada).toBeUndefined();
  });

  test('buscarConcordancia encontra por transliteração', async () => {
    const resultados = await buscarConcordancia('theos');
    expect(resultados.length).toBeGreaterThan(0);
  });

  test('getConcordanciaPorIdioma filtra grego', async () => {
    const gregos = await getConcordanciaPorIdioma('grego');
    expect(gregos.length).toBeGreaterThan(0);
    gregos.forEach(e => {
      expect(e.idioma).toBe('grego');
    });
  });

  test('getConcordanciaPorIdioma filtra hebraico', async () => {
    const hebraicos = await getConcordanciaPorIdioma('hebraico');
    expect(hebraicos.length).toBeGreaterThan(0);
    hebraicos.forEach(e => {
      expect(e.idioma).toBe('hebraico');
    });
  });
});
