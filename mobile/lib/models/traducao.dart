class Traducao {
  final String id;
  final String nome;

  const Traducao({
    required this.id,
    required this.nome,
  });
}

class Traducoes {
  static const List<Traducao> lista = [
    Traducao(id: 'arc', nome: 'Almeida Revista e Corrigida'),
    Traducao(id: 'nvi', nome: 'Nova Versão Internacional'),
    Traducao(id: 'ara', nome: 'Almeida Revista e Atualizada'),
    Traducao(id: 'acf', nome: 'Almeida Corrigida Fiel'),
    Traducao(id: 'kjv', nome: 'King James Version'),
    Traducao(id: 'web', nome: 'World English Bible'),
    Traducao(id: 'naa', nome: 'Nova Almeida Atualizada'),
    Traducao(id: 'ntlh', nome: 'Nova Tradução na Linguagem de Hoje'),
  ];
}
