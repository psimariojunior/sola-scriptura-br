class Favorite {
  final int? id;
  final String livro;
  final int capitulo;
  final int versiculo;
  final int createdAt;
  final String traducao;
  final String? nota;

  const Favorite({
    this.id,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    required this.createdAt,
    required this.traducao,
    this.nota,
  });

  String get referencia => '$livro $capitulo:$versiculo';

  String get versiculoRef => '$livro $capitulo:$versiculo';

  factory Favorite.fromMap(Map<String, dynamic> map) {
    final livro = map['livro'] as String? ?? _extractLivro(map);
    final capitulo = map['capitulo'] as int? ?? _extractCapitulo(map);
    final versiculo = map['versiculo'] as int? ?? _extractVersiculo(map);

    return Favorite(
      id: map['id'] as int?,
      livro: livro,
      capitulo: capitulo,
      versiculo: versiculo,
      createdAt: map['criado_em'] as int? ?? map['created_at'] as int? ?? 0,
      traducao: map['traducao'] as String? ?? 'arc',
      nota: map['nota'] as String?,
    );
  }

  static String _extractLivro(Map<String, dynamic> map) {
    final ref = map['versiculo_ref'] as String? ?? '';
    final parts = ref.split(' ');
    return parts.isNotEmpty ? parts.first : '';
  }

  static int _extractCapitulo(Map<String, dynamic> map) {
    final ref = map['versiculo_ref'] as String? ?? '';
    final match = RegExp(r'(\d+):(\d+)').firstMatch(ref);
    return match != null ? int.tryParse(match.group(1) ?? '0') ?? 0 : 0;
  }

  static int _extractVersiculo(Map<String, dynamic> map) {
    final ref = map['versiculo_ref'] as String? ?? '';
    final match = RegExp(r'(\d+):(\d+)').firstMatch(ref);
    return match != null ? int.tryParse(match.group(2) ?? '0') ?? 0 : 0;
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'traducao': traducao,
      'versiculo_ref': versiculoRef,
      if (nota != null) 'nota': nota,
      'criado_em': createdAt,
      'sincronizado': 0,
    };
  }

  Favorite copyWith({
    int? id,
    String? livro,
    int? capitulo,
    int? versiculo,
    int? createdAt,
    String? traducao,
    String? nota,
  }) {
    return Favorite(
      id: id ?? this.id,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
      versiculo: versiculo ?? this.versiculo,
      createdAt: createdAt ?? this.createdAt,
      traducao: traducao ?? this.traducao,
      nota: nota ?? this.nota,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Favorite &&
          runtimeType == other.runtimeType &&
          livro == other.livro &&
          capitulo == other.capitulo &&
          versiculo == other.versiculo &&
          traducao == other.traducao;

  @override
  int get hashCode => Object.hash(livro, capitulo, versiculo, traducao);
}
