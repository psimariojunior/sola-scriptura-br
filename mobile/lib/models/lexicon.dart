class PalavraLexicon {
  final String strong;
  final String palavra;
  final String transliteracao;
  final String definicao;
  final String idioma;

  const PalavraLexicon({
    required this.strong,
    required this.palavra,
    required this.transliteracao,
    required this.definicao,
    required this.idioma,
  });

  factory PalavraLexicon.fromJson(Map<String, dynamic> json) {
    return PalavraLexicon(
      strong: json['strong'] as String? ?? '',
      palavra: json['palavra'] as String? ?? json['word'] as String? ?? '',
      transliteracao: json['transliteracao'] as String? ?? json['transliteration'] as String? ?? '',
      definicao: json['definicao'] as String? ?? json['definition'] as String? ?? '',
      idioma: json['idioma'] as String? ?? json['language'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'strong': strong,
      'palavra': palavra,
      'transliteracao': transliteracao,
      'definicao': definicao,
      'idioma': idioma,
    };
  }

  bool get isGrego => idioma == 'greek' || idioma == 'grego';
  bool get isHebraico => idioma == 'hebrew' || idioma == 'hebraico';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is PalavraLexicon &&
          runtimeType == other.runtimeType &&
          strong == other.strong;

  @override
  int get hashCode => strong.hashCode;
}
