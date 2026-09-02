import {
  adicionarVersoAColecao,
  criarColecao,
  listarColecoes,
  versoEstaNaColecao,
} from '@/lib/colecoes';

describe('colecoes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('cria coleção e adiciona verso sem duplicar', () => {
    const c = criarColecao('Promessas');
    const verso = {
      livro: 'jo',
      capitulo: 3,
      verso: 16,
      texto: 'Porque Deus amou o mundo',
      referencia: 'João 3:16',
    };
    expect(adicionarVersoAColecao(c.id, verso)).toBe(true);
    expect(adicionarVersoAColecao(c.id, verso)).toBe(true);
    const lista = listarColecoes();
    expect(lista).toHaveLength(1);
    expect(lista[0].versiculos).toHaveLength(1);
    expect(versoEstaNaColecao(lista[0], 'jo', 3, 16)).toBe(true);
  });
});
