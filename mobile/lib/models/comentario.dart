class Comentario {
  final String id;
  final String versiculoRef;
  final String autor;
  final String texto;
  final String? fonte;

  const Comentario({
    required this.id,
    required this.versiculoRef,
    required this.autor,
    required this.texto,
    this.fonte,
  });

  factory Comentario.fromJson(Map<String, dynamic> json) {
    return Comentario(
      id: json['id'] as String? ?? '',
      versiculoRef: json['versiculo_ref'] as String? ?? json['verseRef'] as String? ?? '',
      autor: json['autor'] as String? ?? json['author'] as String? ?? '',
      texto: json['texto'] as String? ?? json['text'] as String? ?? '',
      fonte: json['fonte'] as String? ?? json['source'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'versiculo_ref': versiculoRef,
      'autor': autor,
      'texto': texto,
      if (fonte != null) 'fonte': fonte,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Comentario &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
