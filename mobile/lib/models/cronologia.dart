class EventoCronologico {
  final String data;
  final String evento;
  final String periodo;
  final String? detalhes;

  const EventoCronologico({
    required this.data,
    required this.evento,
    required this.periodo,
    this.detalhes,
  });

  factory EventoCronologico.fromJson(Map<String, dynamic> json) {
    return EventoCronologico(
      data: json['data'] as String? ?? json['date'] as String? ?? '',
      evento: json['evento'] as String? ?? json['event'] as String? ?? '',
      periodo: json['periodo'] as String? ?? json['period'] as String? ?? '',
      detalhes: json['detalhes'] as String? ?? json['details'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'data': data,
      'evento': evento,
      'periodo': periodo,
      if (detalhes != null) 'detalhes': detalhes,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is EventoCronologico &&
          runtimeType == other.runtimeType &&
          data == other.data &&
          evento == other.evento;

  @override
  int get hashCode => Object.hash(data, evento);
}
