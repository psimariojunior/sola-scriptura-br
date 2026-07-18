class Estudo {
  final String slug;
  final String titulo;
  final String autor;
  final String? data;
  final String? contexto;
  final List<String> versiculosChave;

  const Estudo({
    required this.slug,
    required this.titulo,
    required this.autor,
    this.data,
    this.contexto,
    this.versiculosChave = const [],
  });

  factory Estudo.fromJson(Map<String, dynamic> json) {
    return Estudo(
      slug: json['slug'] as String? ?? '',
      titulo: json['titulo'] as String? ?? json['title'] as String? ?? '',
      autor: json['autor'] as String? ?? json['author'] as String? ?? '',
      data: json['data'] as String? ?? json['date'] as String?,
      contexto: json['contexto'] as String? ?? json['context'] as String?,
      versiculosChave: json['versiculos_chave'] != null
          ? List<String>.from(json['versiculos_chave'] as List)
          : json['key_verses'] != null
              ? List<String>.from(json['key_verses'] as List)
              : const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'slug': slug,
      'titulo': titulo,
      'autor': autor,
      if (data != null) 'data': data,
      if (contexto != null) 'contexto': contexto,
      'versiculos_chave': versiculosChave,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Estudo &&
          runtimeType == other.runtimeType &&
          slug == other.slug;

  @override
  int get hashCode => slug.hashCode;
}
