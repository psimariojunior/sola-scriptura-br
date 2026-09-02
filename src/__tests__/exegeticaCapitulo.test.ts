import { getCrossReferencesByVerse } from '@/data/biblia/crossReferences';
import { getCrossReferences } from '@/data/crossReferences';
import {
  getPalavrasRarasNoCapitulo,
  getCoberturaStrongDoLivro,
  getTodasOcorrenciasStrong,
  ehCodigoStrongValido,
} from '@/data/biblia/strong';
import { montarEcoCanonico, rotuloRefEco, chaveCanonRef, parseRefEco } from '@/lib/ecoCanonico';
import { nomeDivino } from '@/lib/nomesDivinos';
import { idsTraducoesLocaisParaLema, carregarVersoNasTraducoesLocais } from '@/lib/versoEmTraducoes';
import { livroPorAbreviacao } from '@/data/biblia/livros';

describe('nomes divinos no corpus', () => {
  test('H3068, H430, G2316 e G2962 são reconhecidos; lema comum não', () => {
    expect(nomeDivino('H3068')?.rotulo).toBe('YHWH');
    expect(nomeDivino('H430')?.rotulo).toBe('Elohim');
    expect(nomeDivino('G2316')?.rotulo).toBe('θεός');
    expect(nomeDivino('G2962')?.rotulo).toBe('κύριος');
    expect(nomeDivino('G3056')).toBeNull();
    expect(nomeDivino(null)).toBeNull();
  });
});

describe('palavras raras neste livro', () => {
  test('códigos Strong inválidos (Hb, Hl) não passam no filtro', () => {
    expect(ehCodigoStrongValido('H7225')).toBe(true);
    expect(ehCodigoStrongValido('G2316')).toBe(true);
    expect(ehCodigoStrongValido('Hb')).toBe(false);
    expect(ehCodigoStrongValido('Hl')).toBe(false);
  });

  test('Gênesis 1: hapax/quase-hapax batem com o corpus do livro', () => {
    const raras = getPalavrasRarasNoCapitulo('gn', 1, 2);
    expect(raras.length).toBeGreaterThan(0);
    for (const r of raras) {
      expect(r.noLivro).toBeGreaterThanOrEqual(1);
      expect(r.noLivro).toBeLessThanOrEqual(2);
      expect(getTodasOcorrenciasStrong(r.strong).filter((k) => k.startsWith('gn:')).length).toBe(
        r.noLivro
      );
      expect(r.versiculosNoCapitulo.every((k) => k.startsWith('gn:1:'))).toBe(true);
    }
  });

  test('João 1: raras existem e cobertura do evangelho é honesta', () => {
    const raras = getPalavrasRarasNoCapitulo('jo', 1, 2);
    const cob = getCoberturaStrongDoLivro('jo');
    const total = livroPorAbreviacao.get('jo')?.totalCapitulos ?? 0;
    expect(raras.length).toBeGreaterThan(0);
    expect(cob.capitulosComStrong).toBeGreaterThan(0);
    expect(cob.capitulosComStrong).toBeLessThanOrEqual(total);
  });

  test('lema frequente (G2316 θεός) não entra como rara em João 1', () => {
    const raras = getPalavrasRarasNoCapitulo('jo', 1, 2);
    expect(raras.some((r) => r.strong === 'G2316')).toBe(false);
  });
});

describe('eco canônico', () => {
  test('rotula TSK jo:1:1 e curated Jo 1:1 sem inventar tipo no TSK', () => {
    expect(rotuloRefEco('jo:1:1')).toBe('Jo 1:1');
    expect(rotuloRefEco('Gn 1:1')).toBe('Gn 1:1');
    expect(chaveCanonRef('jo:1:1')).toBe(chaveCanonRef('Jo 1:1'));

    const curated = getCrossReferencesByVerse('jo', 1, 1);
    const tsk = getCrossReferences('jo', 1, 1);
    const eco = montarEcoCanonico(curated, tsk);

    expect(curated.length).toBeGreaterThan(0);
    expect(tsk.length).toBeGreaterThan(0);
    expect(eco.curated.every((e) => e.tipo && e.rotuloTipo)).toBe(true);
    expect(eco.tsk.every((e) => e.tipo === undefined && e.fonte === 'tsk')).toBe(true);

    const gnCurated = eco.curated.find((e) => chaveCanonRef(e.ref) === 'gn:1:1');
    expect(gnCurated?.tipo).toBe('thematic');
    expect(eco.tsk.some((e) => chaveCanonRef(e.ref) === 'gn:1:1')).toBe(false);
  });

  test('jn:11 no TSK é João (Jonas só tem 4 capítulos); jn:1 permanece Jonas', () => {
    expect(parseRefEco('jn:11:25')?.livro).toBe('jo');
    expect(parseRefEco('jn:1:1')?.livro).toBe('jn');
    expect(parseRefEco('jo:1:1')?.livro).toBe('jo');
  });

  test('Gênesis 1:1 tem eco tipado para João 1:1', () => {
    const eco = montarEcoCanonico(
      getCrossReferencesByVerse('gn', 1, 1),
      getCrossReferences('gn', 1, 1)
    );
    const jo = eco.curated.find((e) => chaveCanonRef(e.ref) === 'jo:1:1');
    expect(jo?.tipo).toBe('thematic');
    expect(jo?.rotuloTipo).toBe('Temático');
  });
});

describe('verso nas traduções locais', () => {
  test('ordem inclui ARC ARA ACF NVI sem API remota', () => {
    const ids = idsTraducoesLocaisParaLema();
    expect(ids).toEqual(
      expect.arrayContaining(['arc', 'ara', 'acf', 'nvi'])
    );
    expect(ids).not.toContain('ntlh');
  });

  test('João 1:1 existe em várias edições locais, texto integral distinto', async () => {
    const versos = await carregarVersoNasTraducoesLocais('jo', 1, 1);
    expect(versos.length).toBeGreaterThanOrEqual(4);
    expect(versos.every((v) => v.texto.length > 10)).toBe(true);
    const textos = new Set(versos.map((v) => v.texto));
    expect(textos.size).toBeGreaterThan(1);
  });

  test('Gênesis 1:1 local não inventa alinhamento: cada item é o verso inteiro', async () => {
    const versos = await carregarVersoNasTraducoesLocais('gn', 1, 1);
    expect(versos.length).toBeGreaterThanOrEqual(4);
    expect(versos.every((v) => /terra/i.test(v.texto) || /earth/i.test(v.texto))).toBe(true);
  });
});
