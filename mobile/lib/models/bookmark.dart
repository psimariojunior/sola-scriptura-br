class Bookmark {
  final int? id;
  final String livro;
  final int capitulo;
  final int versiculo;
  final String? nota;
  final int createdAt;

  const Bookmark({
    this.id,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    this.nota,
    required this.createdAt,
  });

  String get referencia => '$livro $capitulo:$versiculo';

  String get referenciaCurta => '$capitulo:$versiculo';

  factory Bookmark.fromMap(Map<String, dynamic> map) {
    return Bookmark(
      id: map['id'] as int?,
      livro: map['livro'] as String? ?? '',
      capitulo: map['capitulo'] as int? ?? 0,
      versiculo: map['versiculo'] as int? ?? 0,
      nota: map['nota'] as String?,
      createdAt: map['created_at'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      if (nota != null) 'nota': nota,
      'created_at': createdAt,
    };
  }

  Bookmark copyWith({
    int? id,
    String? livro,
    int? capitulo,
    int? versiculo,
    String? nota,
    int? createdAt,
  }) {
    return Bookmark(
      id: id ?? this.id,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
      versiculo: versiculo ?? this.versiculo,
      nota: nota ?? this.nota,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Bookmark &&
          runtimeType == other.runtimeType &&
          livro == other.livro &&
          capitulo == other.capitulo &&
          versiculo == other.versiculo;

  @override
  int get hashCode => Object.hash(livro, capitulo, versiculo);
}
