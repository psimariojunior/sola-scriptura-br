/**
 * Testes de exportação EPUB (src/lib/exportEpub.ts)
 * Valida: gerarEpub retorna Blob do tipo correto, e as funções de capítulo/plano
 * retornam Blob (sem necessidade de fetch quando não há capa).
 */
import { gerarEpub, exportChapterEpub, exportPlanEpub } from '@/lib/exportEpub';

describe('exportEpub.ts — gerarEpub', () => {
  test('retorna Blob do tipo application/epub+zip para entrada mínima', async () => {
    const blob = await gerarEpub({
      titulo: 'Livro Teste',
      autor: 'Sola Scriptura',
      descricao: 'Descrição.',
      idioma: 'pt',
      capitulos: [
        { titulo: 'Cap 1', conteudo: '<p>Texto um.</p>' },
        { titulo: 'Cap 2', conteudo: '<p>Texto dois.</p>' },
      ],
    });
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/epub+zip');
    expect(blob.size).toBeGreaterThan(0);
  });

  test('gera bytes que começam pela assinatura do mimetype EPUB', async () => {
    const blob = await gerarEpub({
      titulo: 'X', autor: 'Sola', descricao: 'd', idioma: 'pt',
      capitulos: [{ titulo: 'C', conteudo: '<p>o</p>' }],
    });
    // EPUB exige o arquivo mimetype como primeiro entry (sem compressão)
    const buf = await (blob as any).arrayBuffer?.() ?? new ArrayBuffer(0);
    if (buf.byteLength > 0) {
      const head = new TextDecoder().decode(new Uint8Array(buf).slice(0, 20));
      expect(head.startsWith('application/epub+zip')).toBe(true);
    } else {
      // jsdom Blob pode não implementar arrayBuffer; validamos via tipo/tamanho
      expect(blob.type).toBe('application/epub+zip');
      expect(blob.size).toBeGreaterThan(0);
    }
  });
});

describe('exportEpub.ts — exportChapterEpub', () => {
  test('retorna Blob para capítulo com versículos', async () => {
    const blob = await exportChapterEpub('João', 3, [
      { numero: 1, texto: 'Pois Deus amou o mundo.' },
      { numero: 16, texto: 'Porque Deus amou o mundo assim.' },
    ], 'arc');
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/epub+zip');
    expect(blob.size).toBeGreaterThan(0);
  });
});

describe('exportEpub.ts — exportPlanEpub', () => {
  test('retorna Blob para plano de leitura', async () => {
    const blob = await exportPlanEpub({
      id: 'p1', nome: 'Plano Teste', descricao: 'Descrição do plano.', duracao: 7,
      categoria: 'geral', dificuldade: 'fácil',
      dias: [
        { dia: 1, titulo: 'Primeiro dia', leituras: [{ livro: 'João', capituloInicio: 1, capituloFim: 2 }], reflexao: 'Reflita.', oracao: 'Ore.' },
        { dia: 2, titulo: 'Segundo dia', leituras: [{ livro: 'Romanos', capituloInicio: 1 }] },
      ],
    });
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/epub+zip');
    expect(blob.size).toBeGreaterThan(0);
  });
});
