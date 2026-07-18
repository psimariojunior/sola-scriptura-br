class ResultadoPesquisa {
  final String tipo;
  final String titulo;
  final String? subtitulo;
  final String? referencia;
  final double score;

  const ResultadoPesquisa({
    required this.tipo,
    required this.titulo,
    this.subtitulo,
    this.referencia,
    this.score = 0.0,
  });

  factory ResultadoPesquisa.fromJson(Map<String, dynamic> json) {
    return ResultadoPesquisa(
      tipo: json['tipo'] as String? ?? json['type'] as String? ?? '',
      titulo: json['titulo'] as String? ?? json['title'] as String? ?? '',
      subtitulo: json['subtitulo'] as String? ?? json['subtitle'] as String?,
      referencia: json['referencia'] as String? ?? json['reference'] as String?,
      score: (json['score'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'tipo': tipo,
      'titulo': titulo,
      if (subtitulo != null) 'subtitulo': subtitulo,
      if (referencia != null) 'referencia': referencia,
      'score': score,
    };
  }

  bool get isVersiculo => tipo == 'versiculo' || tipo == 'verse';
  bool get isComentario => tipo == 'comentario' || tipo == 'commentary';
  bool get isLexicon => tipo == 'lexicon';
  bool get isEstudo => tipo == 'estudo' || tipo == 'study';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ResultadoPesquisa &&
          runtimeType == other.runtimeType &&
          titulo == other.titulo &&
          tipo == other.tipo;

  @override
  int get hashCode => Object.hash(tipo, titulo);
}
