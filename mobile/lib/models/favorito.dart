class Favorito {
  final String id;
  final String livro;
  final int capitulo;
  final int versiculo;
  final String criadoEm;
  final String traducao;

  const Favorito({
    required this.id,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    required this.criadoEm,
    required this.traducao,
  });

  String get referencia => '$livro $capitulo:$versiculo';

  factory Favorito.fromJson(Map<String, dynamic> json) {
    return Favorito(
      id: json['id'] as String? ?? '',
      livro: json['livro'] as String? ?? '',
      capitulo: json['capitulo'] as int? ?? 0,
      versiculo: json['versiculo'] as int? ?? 0,
      criadoEm: json['criadoEm'] as String? ?? '',
      traducao: json['traducao'] as String? ?? 'arc',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'criadoEm': criadoEm,
      'traducao': traducao,
    };
  }

  Favorito copyWith({
    String? id,
    String? livro,
    int? capitulo,
    int? versiculo,
    String? criadoEm,
    String? traducao,
  }) {
    return Favorito(
      id: id ?? this.id,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
      versiculo: versiculo ?? this.versiculo,
      criadoEm: criadoEm ?? this.criadoEm,
      traducao: traducao ?? this.traducao,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Favorito &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
