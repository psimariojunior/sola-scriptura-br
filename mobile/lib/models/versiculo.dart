class Versiculo {
  final int numero;
  final String texto;
  final String? traducao;
  final String? livro;
  final int? capitulo;

  const Versiculo({
    required this.numero,
    required this.texto,
    this.traducao,
    this.livro,
    this.capitulo,
  });

  factory Versiculo.fromJson(Map<String, dynamic> json) {
    return Versiculo(
      numero: json['numero'] as int? ?? json['verse'] as int? ?? 0,
      texto: json['texto'] as String? ?? json['text'] as String? ?? '',
      traducao: json['traducao'] as String? ?? json['translation'] as String?,
      livro: json['livro'] as String? ?? json['book'] as String?,
      capitulo: json['capitulo'] as int? ?? json['chapter'] as int?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'numero': numero,
      'texto': texto,
      if (traducao != null) 'traducao': traducao,
      if (livro != null) 'livro': livro,
      if (capitulo != null) 'capitulo': capitulo,
    };
  }

  String get referencia {
    final parts = <String>[];
    if (livro != null) parts.add(livro!);
    if (capitulo != null) parts.add('$capitulo');
    parts.add('$numero');
    return '${parts.join(' ')}';
  }

  Versiculo copyWith({
    int? numero,
    String? texto,
    String? traducao,
    String? livro,
    int? capitulo,
  }) {
    return Versiculo(
      numero: numero ?? this.numero,
      texto: texto ?? this.texto,
      traducao: traducao ?? this.traducao,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Versiculo &&
          runtimeType == other.runtimeType &&
          numero == other.numero &&
          livro == other.livro &&
          capitulo == other.capitulo &&
          traducao == other.traducao;

  @override
  int get hashCode => Object.hash(numero, livro, capitulo, traducao);
}
