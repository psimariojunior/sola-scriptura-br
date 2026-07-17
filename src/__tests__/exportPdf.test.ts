/**
 * Testes de exportação PDF (src/lib/exportPdf.ts)
 * Valida defaults de opções e o utilitário downloadAsFile (sem depender de canvas).
 * As funções de geração de PDF são verificadas por exportação (contrato de API).
 */
import {
  criarOpcoesPadrao,
  downloadAsFile,
  exportChapterPdf,
  exportPlanPDF,
  exportNotesPDF,
  exportarPdf,
  exportarCapitulo,
  exportarEstudo,
  exportarNota,
} from '@/lib/exportPdf';

describe('exportPdf.ts — criarOpcoesPadrao', () => {
  test('retorna defaults sensatos', () => {
    const opts = criarOpcoesPadrao('Meu Estudo');
    expect(opts.titulo).toBe('Meu Estudo');
    expect(opts.autor).toBe('Sola Scriptura');
    expect(opts.idioma).toBe('pt');
    expect(opts.tema).toBe('light');
    expect(opts.incluirCabecalho).toBe(true);
    expect(opts.incluirRodape).toBe(true);
    expect(opts.incluirIndice).toBe(false);
    expect(opts.fonte).toBe('serif');
    expect(typeof opts.margem).toBe('number');
    expect(opts.margem).toBeGreaterThan(0);
  });

  test('overrides substituem defaults', () => {
    const opts = criarOpcoesPadrao('X', { tema: 'dark', margem: 10, incluirIndice: true });
    expect(opts.tema).toBe('dark');
    expect(opts.margem).toBe(10);
    expect(opts.incluirIndice).toBe(true);
    expect(opts.titulo).toBe('X');
  });
});

describe('exportPdf.ts — downloadAsFile', () => {
  test('cria Blob, URL e dispara clique do link', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    const clickSpy = jest.fn();
    const appendSpy = jest.fn();
    const removeSpy = jest.fn();

    const origCreate = (global as any).URL.createObjectURL;
    const origRevoke = (global as any).URL.revokeObjectURL;
    (global as any).URL.createObjectURL = createObjectURL;
    (global as any).URL.revokeObjectURL = revokeObjectURL;

    const realCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation(((tag: string) => {
      const el = realCreateElement(tag);
      if (tag === 'a') {
        jest.spyOn(el, 'click').mockImplementation(clickSpy);
      }
      return el;
    }) as any);

    const appendOrig = document.body.appendChild.bind(document.body);
    jest.spyOn(document.body, 'appendChild').mockImplementation(((n: any) => {
      appendSpy(n);
      return appendOrig(n);
    }) as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(((n: any) => {
      removeSpy(n);
      return n;
    }) as any);

    downloadAsFile('conteudo', 'arquivo.txt', 'text/plain');

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');

    (global as any).URL.createObjectURL = origCreate;
    (global as any).URL.revokeObjectURL = origRevoke;
  });
});

describe('exportPdf.ts — contrato de API', () => {
  test('exporta todas as funções esperadas', () => {
    expect(typeof criarOpcoesPadrao).toBe('function');
    expect(typeof downloadAsFile).toBe('function');
    expect(typeof exportChapterPdf).toBe('function');
    expect(typeof exportPlanPDF).toBe('function');
    expect(typeof exportNotesPDF).toBe('function');
    expect(typeof exportarPdf).toBe('function');
    expect(typeof exportarCapitulo).toBe('function');
    expect(typeof exportarEstudo).toBe('function');
    expect(typeof exportarNota).toBe('function');
  });

  test('exportarEstudo gera e salva PDF sem lançar', async () => {
    // Smoke: cobre o caminho completo de geração (capa + seção + save) sem erro.
    await expect(
      exportarEstudo({ titulo: 'Estudo Teste', conteudo: 'Conteúdo de exemplo.' })
    ).resolves.toBeUndefined();
  });
});
