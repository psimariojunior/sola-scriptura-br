class AudioInfo {
  final String livro;
  final int capitulo;
  final String traducao;
  final String url;

  const AudioInfo({
    required this.livro,
    required this.capitulo,
    required this.traducao,
    required this.url,
  });

  factory AudioInfo.fromJson(Map<String, dynamic> json) {
    return AudioInfo(
      livro: json['livro'] as String? ?? json['book'] as String? ?? '',
      capitulo: json['capitulo'] as int? ?? json['chapter'] as int? ?? 0,
      traducao: json['traducao'] as String? ?? json['translation'] as String? ?? '',
      url: json['url'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'livro': livro,
      'capitulo': capitulo,
      'traducao': traducao,
      'url': url,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AudioInfo &&
          runtimeType == other.runtimeType &&
          livro == other.livro &&
          capitulo == other.capitulo &&
          traducao == other.traducao;

  @override
  int get hashCode => Object.hash(livro, capitulo, traducao);
}
