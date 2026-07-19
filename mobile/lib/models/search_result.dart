enum SearchResultType {
  verse,
  commentary,
  lexicon,
  character,
  theology,
  study,
  introduction,
  textualCriticism,
  chronology,
  pericope,
  synoptic,
}

extension SearchResultTypeX on SearchResultType {
  String get id {
    switch (this) {
      case SearchResultType.verse:
        return 'versiculo';
      case SearchResultType.commentary:
        return 'comentario';
      case SearchResultType.lexicon:
        return 'lexicon';
      case SearchResultType.character:
        return 'personagem';
      case SearchResultType.theology:
        return 'teologia';
      case SearchResultType.study:
        return 'estudo';
      case SearchResultType.introduction:
        return 'introducao';
      case SearchResultType.textualCriticism:
        return 'critica';
      case SearchResultType.chronology:
        return 'cronologia';
      case SearchResultType.pericope:
        return 'pericope';
      case SearchResultType.synoptic:
        return 'sinoptico';
    }
  }

  String get label {
    switch (this) {
      case SearchResultType.verse:
        return 'Versículo';
      case SearchResultType.commentary:
        return 'Comentário';
      case SearchResultType.lexicon:
        return 'Léxico';
      case SearchResultType.character:
        return 'Personagem';
      case SearchResultType.theology:
        return 'Teologia';
      case SearchResultType.study:
        return 'Estudo';
      case SearchResultType.introduction:
        return 'Introdução';
      case SearchResultType.textualCriticism:
        return 'Crítica Textual';
      case SearchResultType.chronology:
        return 'Cronologia';
      case SearchResultType.pericope:
        return 'Perícope';
      case SearchResultType.synoptic:
        return 'Sinótico';
    }
  }

  static SearchResultType? fromId(String id) {
    for (final t in SearchResultType.values) {
      if (t.id == id) return t;
    }
    return null;
  }
}

class SearchResult {
  final SearchResultType tipo;
  final String titulo;
  final String trecho;
  final String? referencia;
  final double relevancia;
  final String? traducao;
  final String? autor;
  final String? strong;
  final String? idioma;
  final int? livroOrdem;
  final int? capitulo;
  final int? versiculo;

  const SearchResult({
    required this.tipo,
    required this.titulo,
    required this.trecho,
    this.referencia,
    this.relevancia = 0.0,
    this.traducao,
    this.autor,
    this.strong,
    this.idioma,
    this.livroOrdem,
    this.capitulo,
    this.versiculo,
  });

  bool get isVerse => tipo == SearchResultType.verse;
  bool get isCommentary => tipo == SearchResultType.commentary;
  bool get isLexicon => tipo == SearchResultType.lexicon;
  bool get isCharacter => tipo == SearchResultType.character;
  bool get isTheology => tipo == SearchResultType.theology;
  bool get isStudy => tipo == SearchResultType.study;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is SearchResult &&
          runtimeType == other.runtimeType &&
          tipo == other.tipo &&
          referencia == other.referencia &&
          titulo == other.titulo;

  @override
  int get hashCode => Object.hash(tipo, referencia, titulo);
}
