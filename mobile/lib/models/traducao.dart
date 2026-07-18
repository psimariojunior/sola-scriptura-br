class Traducao {
  final String id;
  final String nome;
  final String abreviacao;
  final String idioma;

  const Traducao({
    required this.id,
    required this.nome,
    this.abreviacao = '',
    this.idioma = 'pt',
  });

  factory Traducao.fromJson(Map<String, dynamic> json) {
    return Traducao(
      id: json['id'] as String? ?? '',
      nome: json['nome'] as String? ?? json['name'] as String? ?? '',
      abreviacao: json['abreviacao'] as String? ?? json['abbreviation'] as String? ?? '',
      idioma: json['idioma'] as String? ?? json['language'] as String? ?? 'pt',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nome': nome,
      'abreviacao': abreviacao,
      'idioma': idioma,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Traducao &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}

class Traducoes {
  static const List<Traducao> lista = [
    Traducao(id: 'arc', nome: 'Almeida Revista e Corrigida', abreviacao: 'ARC', idioma: 'pt'),
    Traducao(id: 'nvi', nome: 'Nova Versao Internacional', abreviacao: 'NVI', idioma: 'pt'),
    Traducao(id: 'ara', nome: 'Almeida Revista e Atualizada', abreviacao: 'ARA', idioma: 'pt'),
    Traducao(id: 'acf', nome: 'Almeida Corrigida Fiel', abreviacao: 'ACF', idioma: 'pt'),
    Traducao(id: 'kjv', nome: 'King James Version', abreviacao: 'KJV', idioma: 'en'),
    Traducao(id: 'web', nome: 'World English Bible', abreviacao: 'WEB', idioma: 'en'),
    Traducao(id: 'naa', nome: 'Nova Almeida Atualizada', abreviacao: 'NAA', idioma: 'pt'),
    Traducao(id: 'ntlh', nome: 'Nova Traducao na Linguagem de Hoje', abreviacao: 'NTLH', idioma: 'pt'),
  ];

  static Traducao? porId(String id) {
    for (final t in lista) {
      if (t.id == id) return t;
    }
    return null;
  }
}
