import { TRILHAS_LIVRO, obterTrilhaPorLivro, obterTrilhaPorSlug } from '@/data/trilhasLivro';
import { capitulosDaTrilha, nivelEfetivoDaTrilha } from '@/lib/trilhaCapitulos';
import { estudosCapituloProfundos } from '@/data/estudosCapituloProfundos';
import {
  MIN_RESPOSTA_CHARS,
  TRILHA_STORAGE_KEY,
  capituloCompleto,
  emitirCertificadoTrilha,
  idCertificado,
  montarPayloadHash,
  salvarRespostaCapitulo,
  sha256Curto,
  trilhaProntaParaCertificado,
  validarResposta,
} from '@/lib/trilhaProgress';
import { markChapterRead } from '@/lib/readingProgress';

const RESPOSTA_OK =
  'O Verbo eterno se fez carne: João 1 relê Gênesis e identifica o Logos com a Pessoa do Filho.';

function limparStorage() {
  localStorage.clear();
}

describe('trilhas oficiais João e Romanos', () => {
  it('só oferece João e Romanos — livros com ficha profunda em todos os capítulos', () => {
    expect(TRILHAS_LIVRO.map((t) => t.slug).sort()).toEqual(['joao', 'romanos']);
  });

  it('João 1–21 e Romanos 1–16 são fichas profundas com pergunta própria', () => {
    const jo = obterTrilhaPorSlug('joao')!;
    const rm = obterTrilhaPorSlug('romanos')!;
    expect(capitulosDaTrilha(jo)).toHaveLength(21);
    expect(capitulosDaTrilha(rm)).toHaveLength(16);
    for (const t of [jo, rm]) {
      for (const cap of capitulosDaTrilha(t)) {
        expect(estudosCapituloProfundos[`${t.livroAbrev}:${cap.capitulo}`]?.nivel).toBe('profundo');
        expect(cap.nivel).toBe('profundo');
        expect(cap.pergunta.length).toBeGreaterThan(10);
        expect(cap.titulo.toLowerCase()).not.toMatch(/capítulo \d+ apresenta o desenvolvimento/);
      }
      expect(nivelEfetivoDaTrilha(t)).toBe('profundo');
    }
  });

  it('não se apresenta como curso avançado genérico nem inventa Henry/Wright', () => {
    for (const t of TRILHAS_LIVRO) {
      expect(t.oQueAtesta.toLowerCase()).toMatch(/leitura/);
      expect(t.oQueAtesta.toLowerCase()).toMatch(/pergunta/);
      expect(t.oQueNaoAtesta.toLowerCase()).toMatch(/carga horária/);
      expect(t.descricao.toLowerCase()).not.toContain('expert');
      expect(t.descricao.toLowerCase()).not.toContain('n.t. wright');
      expect(t.criterio.toLowerCase()).toMatch(/bíblia/);
    }
  });

  it('resolver por livro (jo/rm) aponta para a trilha oficial', () => {
    expect(obterTrilhaPorLivro('jo')?.slug).toBe('joao');
    expect(obterTrilhaPorLivro('rm')?.slug).toBe('romanos');
    expect(obterTrilhaPorLivro('gn')).toBeUndefined();
  });
});

describe('critério honesto de conclusão', () => {
  beforeEach(() => {
    limparStorage();
  });

  it('rejeita resposta curta', () => {
    expect(validarResposta('ok')).toMatch(/caracteres/);
    expect(validarResposta(RESPOSTA_OK)).toBeNull();
    expect(RESPOSTA_OK.length).toBeGreaterThanOrEqual(MIN_RESPOSTA_CHARS);
  });

  it('capítulo só completa com leitura + resposta', () => {
    const jo = obterTrilhaPorSlug('joao')!;
    expect(capituloCompleto(jo, 1)).toBe(false);
    salvarRespostaCapitulo('joao', 1, RESPOSTA_OK);
    expect(capituloCompleto(jo, 1)).toBe(false);
    markChapterRead('jo', 1);
    expect(capituloCompleto(jo, 1)).toBe(true);
    expect(trilhaProntaParaCertificado(jo)).toBe(false);
  });

  it('emite certificado com ID e SHA-256 curto só quando todos os capítulos estão completos', async () => {
    const jo = obterTrilhaPorSlug('joao')!;
    await expect(
      emitirCertificadoTrilha({ trilha: jo, nome: 'Ana Silva', autenticado: false }),
    ).rejects.toThrow(/completa/);

    for (let n = 1; n <= 21; n++) {
      markChapterRead('jo', n);
      salvarRespostaCapitulo('joao', n, RESPOSTA_OK);
    }
    expect(trilhaProntaParaCertificado(jo)).toBe(true);

    const cert = await emitirCertificadoTrilha({ trilha: jo, nome: 'Ana Silva', autenticado: false });
    expect(cert.id).toMatch(/^SSB-JO-\d{8}-[A-F0-9]{4}$/);
    expect(cert.hash).toMatch(/^[A-F0-9]{12}$/);
    expect(cert.nome).toBe('Ana Silva');
    expect(cert.autenticado).toBe(false);

    const payload = montarPayloadHash({
      trilhaId: 'joao',
      nome: 'Ana Silva',
      dataIso: cert.data,
      capitulos: Array.from({ length: 21 }, (_, i) => i + 1),
    });
    const hash = await sha256Curto(payload);
    expect(hash).toBe(cert.hash);
    expect(idCertificado('joao', cert.data, hash)).toBe(cert.id);

    const store = JSON.parse(localStorage.getItem(TRILHA_STORAGE_KEY) || '{}');
    expect(store.joao.certificado.hash).toBe(cert.hash);
  });

  it('SHA é estável para o mesmo payload', async () => {
    const a = await sha256Curto('sola-scriptura-br|joao|ana silva|2026-09-02|1,2,3');
    const b = await sha256Curto('sola-scriptura-br|joao|ana silva|2026-09-02|1,2,3');
    const c = await sha256Curto('sola-scriptura-br|joao|ana silva|2026-09-02|1,2,4');
    expect(a).toBe(b);
    expect(a).not.toBe(c);
    expect(a).toHaveLength(12);
  });
});
