class StudyNote {
  final int? id;
  final String livro;
  final int capitulo;
  final int versiculo;
  final String texto;
  final int createdAt;
  final int updatedAt;
  final String traducao;

  const StudyNote({
    this.id,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    required this.texto,
    required this.createdAt,
    required this.updatedAt,
    required this.traducao,
  });

  String get referencia => '$livro $capitulo:$versiculo';

  String get referenciaCurta => '$capitulo:$versiculo';

  factory StudyNote.fromMap(Map<String, dynamic> map) {
    return StudyNote(
      id: map['id'] as int?,
      livro: map['livro'] as String? ?? '',
      capitulo: map['capitulo'] as int? ?? 0,
      versiculo: map['versiculo'] as int? ?? 0,
      texto: map['conteudo'] as String? ?? map['texto'] as String? ?? '',
      createdAt: map['criado_em'] as int? ?? map['created_at'] as int? ?? 0,
      updatedAt:
          map['atualizado_em'] as int? ?? map['updated_at'] as int? ?? 0,
      traducao: map['traducao'] as String? ?? 'arc',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'conteudo': texto,
      'criado_em': createdAt,
      'atualizado_em': updatedAt,
      'traducao': traducao,
    };
  }

  StudyNote copyWith({
    int? id,
    String? livro,
    int? capitulo,
    int? versiculo,
    String? texto,
    int? createdAt,
    int? updatedAt,
    String? traducao,
  }) {
    return StudyNote(
      id: id ?? this.id,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
      versiculo: versiculo ?? this.versiculo,
      texto: texto ?? this.texto,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      traducao: traducao ?? this.traducao,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is StudyNote &&
          runtimeType == other.runtimeType &&
          livro == other.livro &&
          capitulo == other.capitulo &&
          versiculo == other.versiculo &&
          traducao == other.traducao;

  @override
  int get hashCode => Object.hash(livro, capitulo, versiculo, traducao);
}
