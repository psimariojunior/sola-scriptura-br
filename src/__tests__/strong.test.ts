import { 
  getStrongPorVersiculo, 
  getTodasOcorrenciasStrong,
  buscarStrong 
} from '@/data/biblia/strong';

describe('strong/index.ts', () => {
  test('getStrongPorVersiculo retorna palavras para jo:1:1', () => {
    const palavras = getStrongPorVersiculo('jo', 1, 1);
    expect(Array.isArray(palavras)).toBe(true);
    expect(palavras.length).toBeGreaterThan(0);
    expect(palavras[0]).toHaveProperty('strong');
    expect(palavras[0]).toHaveProperty('palavra');
    expect(palavras[0]).toHaveProperty('transliteracao');
    expect(palavras[0]).toHaveProperty('definicao');
    expect(palavras[0].idioma).toBe('grego');
  });

  test('getStrongPorVersiculo retorna palavras para gn:1:1 (hebraico)', () => {
    const palavras = getStrongPorVersiculo('gn', 1, 1);
    expect(palavras.length).toBeGreaterThan(0);
    expect(palavras[0].idioma).toBe('hebraico');
  });

  test('getStrongPorVersiculo retorna vazio para versículo inexistente', () => {
    const palavras = getStrongPorVersiculo('zz', 99, 99);
    expect(palavras).toEqual([]);
  });

  test('buscarStrong encontra por Strong number', () => {
    const resultados = buscarStrong('G2316');
    expect(resultados.length).toBeGreaterThan(0);
    expect(resultados[0].strong).toBe('G2316');
  });

  test('buscarStrong encontra por palavra grega', () => {
    const resultados = buscarStrong('λόγος');
    expect(resultados.length).toBeGreaterThan(0);
  });

  test('getTodasOcorrenciasStrong retorna versículos', () => {
    const ocorrencias = getTodasOcorrenciasStrong('G2316');
    expect(Array.isArray(ocorrencias)).toBe(true);
    expect(ocorrencias.length).toBeGreaterThan(0);
  });
});
