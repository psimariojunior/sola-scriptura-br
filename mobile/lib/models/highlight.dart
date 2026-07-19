import 'package:flutter/material.dart';

class HighlightColor {
  final String id;
  final String label;
  final Color color;
  final Color onColor;

  const HighlightColor({
    required this.id,
    required this.label,
    required this.color,
    required this.onColor,
  });

  static const HighlightColor yellow = HighlightColor(
    id: 'yellow',
    label: 'Amarelo',
    color: Color(0xFFFFEB3B),
    onColor: Color(0xFF1C1917),
  );

  static const HighlightColor green = HighlightColor(
    id: 'green',
    label: 'Verde',
    color: Color(0xFF81C784),
    onColor: Color(0xFF0A2E0A),
  );

  static const HighlightColor blue = HighlightColor(
    id: 'blue',
    label: 'Azul',
    color: Color(0xFF64B5F6),
    onColor: Color(0xFF0A1A2E),
  );

  static const HighlightColor pink = HighlightColor(
    id: 'pink',
    label: 'Rosa',
    color: Color(0xFFF8BBD0),
    onColor: Color(0xFF3E0A1F),
  );

  static const List<HighlightColor> all = [
    yellow,
    green,
    blue,
    pink,
  ];

  static HighlightColor fromId(String? id) {
    if (id == null) return yellow;
    for (final c in all) {
      if (c.id == id) return c;
    }
    return yellow;
  }
}

class Highlight {
  final int? id;
  final String? idV2;
  final String livro;
  final int capitulo;
  final int versiculo;
  final String cor;
  final int createdAt;
  final String? criadoEm;
  final String traducao;

  const Highlight({
    this.id,
    this.idV2,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
    required this.cor,
    required this.createdAt,
    this.criadoEm,
    required this.traducao,
  });

  HighlightColor get colorData => HighlightColor.fromId(cor);

  Color get displayColor => colorData.color;

  String get referencia {
    return '$livro $capitulo:$versiculo';
  }

  factory Highlight.fromMap(Map<String, dynamic> map) {
    return Highlight(
      id: map['id'] as int?,
      livro: map['livro'] as String? ?? '',
      capitulo: map['capitulo'] as int? ?? 0,
      versiculo: map['versiculo'] as int? ?? 0,
      cor: map['cor'] as String? ?? 'yellow',
      createdAt: map['created_at'] as int? ?? 0,
      traducao: map['traducao'] as String? ?? 'arc',
    );
  }

  factory Highlight.fromJson(Map<String, dynamic> json) {
    return Highlight(
      idV2: json['id'] as String? ?? '',
      livro: json['livro'] as String? ?? '',
      capitulo: json['capitulo'] as int? ?? 0,
      versiculo: json['versiculo'] as int? ?? 0,
      cor: json['cor'] as String? ?? 'yellow',
      createdAt: 0,
      criadoEm: json['criadoEm'] as String? ?? '',
      traducao: json['traducao'] as String? ?? 'arc',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'cor': cor,
      'created_at': createdAt,
      'traducao': traducao,
    };
  }

  Map<String, dynamic> toJson() {
    return {
      'id': idV2 ?? '',
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'cor': cor,
      'criadoEm': criadoEm ?? '',
      'traducao': traducao,
    };
  }

  Highlight copyWith({
    int? id,
    String? idV2,
    String? livro,
    int? capitulo,
    int? versiculo,
    String? cor,
    int? createdAt,
    String? criadoEm,
    String? traducao,
  }) {
    return Highlight(
      id: id ?? this.id,
      idV2: idV2 ?? this.idV2,
      livro: livro ?? this.livro,
      capitulo: capitulo ?? this.capitulo,
      versiculo: versiculo ?? this.versiculo,
      cor: cor ?? this.cor,
      createdAt: createdAt ?? this.createdAt,
      criadoEm: criadoEm ?? this.criadoEm,
      traducao: traducao ?? this.traducao,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Highlight &&
          runtimeType == other.runtimeType &&
          livro == other.livro &&
          capitulo == other.capitulo &&
          versiculo == other.versiculo &&
          traducao == other.traducao;

  @override
  int get hashCode =>
      Object.hash(livro, capitulo, versiculo, traducao);
}
