class Usuario {
  final String id;
  final String email;
  final String nome;
  final String? avatar;
  final List<String> favoritos;
  final List<Map<String, dynamic>> notas;

  const Usuario({
    required this.id,
    required this.email,
    required this.nome,
    this.avatar,
    this.favoritos = const [],
    this.notas = const [],
  });

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      id: json['id'] as String? ?? '',
      email: json['email'] as String? ?? '',
      nome: json['nome'] as String? ?? json['name'] as String? ?? '',
      avatar: json['avatar'] as String?,
      favoritos: json['favoritos'] != null
          ? List<String>.from(json['favoritos'] as List)
          : json['favorites'] != null
              ? List<String>.from(json['favorites'] as List)
              : const [],
      notas: json['notas'] != null
          ? List<Map<String, dynamic>>.from(json['notas'] as List)
          : json['notes'] != null
              ? List<Map<String, dynamic>>.from(json['notes'] as List)
              : const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'nome': nome,
      if (avatar != null) 'avatar': avatar,
      'favoritos': favoritos,
      'notas': notas,
    };
  }

  Usuario copyWith({
    String? id,
    String? email,
    String? nome,
    String? avatar,
    List<String>? favoritos,
    List<Map<String, dynamic>>? notas,
  }) {
    return Usuario(
      id: id ?? this.id,
      email: email ?? this.email,
      nome: nome ?? this.nome,
      avatar: avatar ?? this.avatar,
      favoritos: favoritos ?? this.favoritos,
      notas: notas ?? this.notas,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Usuario &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
