class Nota {
  final String id;
  final String livro;
  final int capitulo;
  final int versiculo;
  final String texto;
  final String criadoEm;
  final String atualizadoEm;
  final String traducao;

  const Nota({
    required this.id,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    required this.texto,
    required this.criadoEm,
    required this.atualizadoEm,
    required this.traducao,
  });

  String get referencia => '$livro $capitulo:$versiculo';

  factory Nota.fromJson(Map<String, dynamic> json) {
    return Nota(
      id: json['id'] as String? ?? '',
      livro: json['livro'] as String? ?? '',
      capitulo: json['capitulo'] as int? ?? 0,
      versiculo: json['versiculo'] as int? ?? 0,
      texto: json['texto'] as String? ?? '',
      criadoEm: json['criadoEm'] as String? ?? '',
      atualizadoEm: json['atualizadoEm'] as String? ?? '',
      traducao: json['traducao'] as String? ?? 'arc',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'texto': texto,
      'criadoEm': criadoEm,
      'atualizadoEm': atualizadoEm,
      'traducao': traducao,
    };
  }

  Nota copyWith({
    String? id,
    String? livro,
    int? capitulo,
    int? versiculo,
    String? texto,
    String? criadoEm,
    String? atualizadoEm,
    String? traducao,
  }) {
    return Nota(
      id: id ?? this.id,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
      versiculo: versiculo ?? this.versiculo,
      texto: texto ?? this.texto,
      criadoEm: criadoEm ?? this.criadoEm,
      atualizadoEm: atualizadoEm ?? this.atualizadoEm,
      traducao: traducao ?? this.traducao,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Nota &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
