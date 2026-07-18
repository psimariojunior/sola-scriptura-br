class Personagem {
  final String slug;
  final String nome;
  final String resumo;
  final String testamento;
  final List<String> referencias;

  const Personagem({
    required this.slug,
    required this.nome,
    required this.resumo,
    required this.testamento,
    this.referencias = const [],
  });

  factory Personagem.fromJson(Map<String, dynamic> json) {
    return Personagem(
      slug: json['slug'] as String? ?? '',
      nome: json['nome'] as String? ?? json['name'] as String? ?? '',
      resumo: json['resumo'] as String? ?? json['summary'] as String? ?? '',
      testamento: json['testamento'] as String? ?? json['testament'] as String? ?? '',
      referencias: json['referencias'] != null
          ? List<String>.from(json['referencias'] as List)
          : json['references'] != null
              ? List<String>.from(json['references'] as List)
              : const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'slug': slug,
      'nome': nome,
      'resumo': resumo,
      'testamento': testamento,
      'referencias': referencias,
    };
  }

  bool get isAntigoTestamento => testamento == 'AT';
  bool get isNovoTestamento => testamento == 'NT';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Personagem &&
          runtimeType == other.runtimeType &&
          slug == other.slug;

  @override
  int get hashCode => slug.hashCode;
}
