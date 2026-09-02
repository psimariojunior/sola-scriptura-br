import { estudosCapituloProfundos } from '@/data/estudosCapituloProfundos';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { obterEstudoCapitulo } from '@/lib/estudosLoader';
import { eStubGenerico, sintetizarEstudoCapitulo } from '@/lib/sintetizarEstudoCapitulo';

describe('fichas profundas vs cânon', () => {
  const canon = TODOS_LIVROS.reduce((s, l) => s + l.totalCapitulos, 0);

  it('o cânon tem 1189 capítulos', () => {
    expect(canon).toBe(1189);
  });

  it('há dezenas de fichas profundas, todas com nivel profundo', () => {
    const keys = Object.keys(estudosCapituloProfundos);
    expect(keys.length).toBeGreaterThanOrEqual(90);
    for (const k of keys) {
      expect(estudosCapituloProfundos[k].nivel).toBe('profundo');
    }
  });

  it('João 1–21 está coberto por ficha profunda', () => {
    for (let c = 1; c <= 21; c++) {
      expect(estudosCapituloProfundos[`jo:${c}`]?.nivel).toBe('profundo');
    }
  });

  it('Romanos 1–16 está coberto por ficha profunda', () => {
    for (let c = 1; c <= 16; c++) {
      expect(estudosCapituloProfundos[`rm:${c}`]?.nivel).toBe('profundo');
    }
  });
});

describe('sintetizarEstudoCapitulo', () => {
  it('nunca se apresenta como Henry/Calvino e sempre marca síntese', () => {
    const s = sintetizarEstudoCapitulo('gn', 4);
    expect(s.nivel).toBe('sintese');
    expect(s.resumo.toLowerCase()).not.toContain('matthew henry');
    expect(s.fontes?.some((f) => /síntese automática/i.test(f))).toBe(true);
    expect(s.perguntasEstudo[0]).toMatch(/Gênesis 4/);
  });

  it('não reproduz o stub raso de Gn 1 legado', () => {
    const s = sintetizarEstudoCapitulo('gn', 1);
    expect(s.resumo).not.toMatch(/Deus cria o universo e o homem/);
    expect(s.resumo).not.toMatch(/apresenta o desenvolvimento do capítulo/);
    expect(s.nivel).toBe('sintese');
  });

  it('marca seções histórico/cultural/exegese/hermenêutica como síntese, não Henry', () => {
    const s = sintetizarEstudoCapitulo('lc', 3);
    expect(s.nivel).toBe('sintese');
    expect(s.contextoHistorico?.toLowerCase()).toContain('síntese');
    expect(s.notaHermeneutica?.toLowerCase()).toContain('síntese');
    expect(s.notaHermeneutica?.toLowerCase()).not.toMatch(/matthew henry disse/);
    expect(s.contextoCultural?.toLowerCase()).toContain('síntese');
  });

  it('usa temas do livro quando não há perícope isolada', () => {
    const s = sintetizarEstudoCapitulo('nm', 7);
    expect(s.nivel).toBe('sintese');
    expect(s.temas.length).toBeGreaterThan(0);
    expect(s.perguntasEstudo.length).toBeGreaterThanOrEqual(1);
    expect(s.fontes?.some((f) => /Escritura/i.test(f))).toBe(true);
  });
});

describe('obterEstudoCapitulo', () => {
  it('prioriza ficha profunda', () => {
    const e = obterEstudoCapitulo('gn', 1);
    expect(e.nivel).toBe('profundo');
    expect(e.titulo).toMatch(/criação/i);
  });

  it('cai em síntese quando o legado é stub', () => {
    const e = obterEstudoCapitulo('gn', 4);
    expect(e.nivel).toBe('sintese');
    expect(eStubGenerico({ ...e, nivel: 'legado', resumo: 'Gênesis 4 apresenta o desenvolvimento do capítulo.', perguntasEstudo: ['Qual o tema central de Gênesis 4?', 'Como este capítulo se relaciona com o restante de Gênesis?', 'Que verdade prática pode ser aplicada hoje?'] })).toBe(true);
  });
});
