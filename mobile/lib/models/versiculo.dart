class Versiculo {
  final int numero;
  final String texto;

  const Versiculo({
    required this.numero,
    required this.texto,
  });

  factory Versiculo.fromJson(Map<String, dynamic> json) {
    return Versiculo(
      numero: json['verse'] as int? ?? 0,
      texto: (json['text'] as String?) ?? '',
    );
  }
}
