/**
 * Testes do indexador de concordância (src/lib/concordancia.ts)
 * Valida: buildIndice a partir de tradução mock, busca case/acento-insensível,
 * correspondência parcial para consultas >= 4 chars e metadados corretos.
 */
import { buildIndice, buscar, type Ocorrencia } from '@/lib/concordancia';

jest.mock('@/data/biblia/texto/carregar', () => ({
  carregarTraducao: jest.fn(async () => ({
    gn: {
      1: [
        'No princípio criou Deus os céus e a terra.',
        'E a terra estava sem forma e vazia.',
      ],
      2: [
        'E Deus abençoou o sétimo dia.',
        'Estes são os gerações dos céus e da terra.',
      ],
    },
    jo: {
      3: [
        'Pois Deus amou o mundo de tal maneira.',
        'Porque Deus enviou o seu filho ao mundo.',
      ],
    },
  })),
  getTraducoesLocais: jest.fn(() => ['arc', 'kjv', 'web', 'nvi', 'ara', 'acf']),
}));

jest.mock('@/data/biblia/livros', () => {
  const LIVROS = [
    { nome: 'Gênesis', abreviacao: 'gn', testamento: 'AT', totalCapitulos: 50, ordem: 1 },
    { nome: 'João', abreviacao: 'jo', testamento: 'NT', totalCapitulos: 21, ordem: 43 },
  ] as any;
  return {
    LIVROS_AT: LIVROS,
    LIVROS_NT: LIVROS,
    TODOS_LIVROS: LIVROS,
    livroPorAbreviacao: new Map(LIVROS.map((l: any) => [l.abreviacao, l])),
    livroPorOrdem: new Map(LIVROS.map((l: any) => [l.ordem, l])),
  };
});

describe('concordancia.ts — buildIndice', () => {
  test('constrói índice com ocorrências corretas (livro/capítulo/versículo)', async () => {
    const indice = await buildIndice('arc');
    const deus = indice.get('deus');
    expect(deus).toBeDefined();
    // "Deus" aparece em gn 1:1, gn 1:2 (não), gn 2:1, jo 3:1, jo 3:2 => 4 ocorrências
    expect(deus!.length).toBe(4);

    const map = new Map<string, Ocorrencia>(
      deus!.map(o => [`${o.livro}-${o.capitulo}-${o.versiculo}`, o])
    );
    expect(map.get('gn-1-1')?.texto).toBe('No princípio criou Deus os céus e a terra.');
    expect(map.get('gn-2-1')?.texto).toContain('abençoou');
    expect(map.get('gn-2-1')?.livroNome).toBe('Gênesis');
    expect(map.get('jo-3-1')?.livroNome).toBe('João');
  });

  test('resultado é ordenado por ordem de livro / capítulo / versículo', async () => {
    const indice = await buildIndice('arc');
    const terra = indice.get('terra');
    expect(terra!.length).toBeGreaterThan(1);
    // todas de Gênesis (ordem 1) vêm antes de João (ordem 43)
    const livros = terra!.map(o => o.livro);
    expect(livros.every(l => l === 'gn')).toBe(true);
    // versículos em ordem
    const versiculos = terra!.map(o => o.versiculo);
    expect(versiculos).toEqual([...versiculos].sort((a, b) => a - b));
  });
});

describe('concordancia.ts — buscar', () => {
  let indice: Map<string, Ocorrencia[]>;
  beforeAll(async () => {
    indice = await buildIndice('arc');
  });

  test('busca case-insensitive', () => {
    const r = buscar(indice, 'DEUS');
    expect(r.length).toBe(4);
  });

  test('busca accent-insensitive (Deus == Deus com acento)', () => {
    const r = buscar(indice, 'deus');
    expect(r.length).toBe(4);
  });

  test('busca exata de palavra curta', () => {
    const r = buscar(indice, 'terra');
    // gn 1:1 ("...e a terra"), gn 1:2 ("E a terra estava..."), gn 2:2 ("...e da terra")
    expect(r.length).toBe(3);
    const livros = r.map(o => `${o.livro}-${o.capitulo}-${o.versiculo}`).sort();
    expect(livros).toEqual(['gn-1-1', 'gn-1-2', 'gn-2-2'].sort());
    expect(r.every(o => o.texto.toLowerCase().includes('terra'))).toBe(true);
  });

  test('palavra inexistente retorna vazio', () => {
    expect(buscar(indice, 'xzqw').length).toBe(0);
    expect(buscar(indice, '').length).toBe(0);
  });

  test('consulta >= 4 chars usa correspondência parcial (startsWith)', () => {
    // "geracoes" (é longa) deve casar parcialmente com "gera"
    const r = buscar(indice, 'gera');
    expect(r.length).toBeGreaterThan(0);
    // "gerações" (gn 2:2) casa parcialmente via startsWith('gera') no índice
    expect(r.some(o => o.texto.toLowerCase().includes('gera'))).toBe(true);
  });

  test('consulta curta (<4) NÃO usa parcial', () => {
    // "ce" tem 2 chars; não há palavra exata "ce", então vazio
    expect(buscar(indice, 'ce').length).toBe(0);
  });
});
