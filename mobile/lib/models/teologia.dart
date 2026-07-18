class Doutrina {
  final String id;
  final String nome;
  final String categoria;
  final String descricao;
  final List<String> versiculos;

  const Doutrina({
    required this.id,
    required this.nome,
    required this.categoria,
    required this.descricao,
    this.versiculos = const [],
  });

  factory Doutrina.fromJson(Map<String, dynamic> json) {
    return Doutrina(
      id: json['id'] as String? ?? '',
      nome: json['nome'] as String? ?? json['name'] as String? ?? '',
      categoria: json['categoria'] as String? ?? json['category'] as String? ?? '',
      descricao: json['descricao'] as String? ?? json['description'] as String? ?? '',
      versiculos: json['versiculos'] != null
          ? List<String>.from(json['versiculos'] as List)
          : json['verses'] != null
              ? List<String>.from(json['verses'] as List)
              : const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nome': nome,
      'categoria': categoria,
      'descricao': descricao,
      'versiculos': versiculos,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Doutrina &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
