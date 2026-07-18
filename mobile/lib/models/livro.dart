class Livro {
  final String abreviacao;
  final String slug;
  final String nome;
  final String testamento;
  final int capitulos;
  final int ordem;

  const Livro({
    required this.abreviacao,
    required this.slug,
    required this.nome,
    required this.testamento,
    required this.capitulos,
    this.ordem = 0,
  });

  factory Livro.fromJson(Map<String, dynamic> json) {
    return Livro(
      abreviacao: json['abreviacao'] as String? ?? json['abbreviation'] as String? ?? '',
      slug: json['slug'] as String? ?? '',
      nome: json['nome'] as String? ?? json['name'] as String? ?? '',
      testamento: json['testamento'] as String? ?? json['testament'] as String? ?? '',
      capitulos: json['capitulos'] as int? ?? json['chapters'] as int? ?? 0,
      ordem: json['ordem'] as int? ?? json['order'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'abreviacao': abreviacao,
      'slug': slug,
      'nome': nome,
      'testamento': testamento,
      'capitulos': capitulos,
      'ordem': ordem,
    };
  }

  bool get isAntigoTestamento => testamento == 'AT';

  bool get isNovoTestamento => testamento == 'NT';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Livro &&
          runtimeType == other.runtimeType &&
          abreviacao == other.abreviacao;

  @override
  int get hashCode => abreviacao.hashCode;
}
