import 'package:flutter/foundation.dart';

import '../data/versiculo_do_dia_data.dart';
import 'biblia_service.dart';

class VersiculoDoDia {
  final String referencia;
  final String texto;
  final String traducao;
  final int diaDoAno;
  final DateTime data;

  const VersiculoDoDia({
    required this.referencia,
    required this.texto,
    required this.traducao,
    required this.diaDoAno,
    required this.data,
  });

  String get livroSlug => referencia.split(' ').first;

  int get capitulo {
    final parts = referencia.split(' ');
    return int.tryParse(parts[1].split(':').first) ?? 1;
  }

  int get versiculo {
    final parts = referencia.split(' ');
    final versPart = parts[1].split(':').last;
    return int.tryParse(versPart) ?? 1;
  }
}

class VerseOfDayService {
  static const String _traducao = 'arc';
  static const String _traducaoNome = 'ARC';
  static const int _totalDias = 365;

  VerseOfDayService();

  int _diaDoAno(DateTime date) {
    final inicio = DateTime(date.year, 1, 1);
    final diff = date.difference(inicio).inDays;
    final day = diff + 1;
    if (day < 1) return 1;
    if (day > _totalDias) return ((day - 1) % _totalDias) + 1;
    return day;
  }

  String _formatarReferencia(int index) {
    final ref = versiculosDoAno[index];
    final livro = BibliaService.livros.firstWhere(
      (l) => l.slug == ref.slug,
      orElse: () => BibliaService.livros.first,
    );
    return '${livro.nome} ${ref.capitulo}:${ref.versiculo}';
  }

  String _resolverTexto(int index) {
    final ref = versiculosDoAno[index];
    final texto = BibliaService.getTextoVersiculoStatic(
      _traducao,
      ref.slug,
      ref.capitulo,
      ref.versiculo,
    );
    if (texto == null || texto.isEmpty) {
      if (kDebugMode) {
        debugPrint('Versiculo do dia nao encontrado: ${ref.slug} ${ref.capitulo}:${ref.versiculo}');
      }
      return '';
    }
    return texto;
  }

  VersiculoDoDia obterParaData(DateTime data) {
    final dia = _diaDoAno(data);
    final index = dia - 1;
    final texto = _resolverTexto(index);
    final referencia = _formatarReferencia(index);
    return VersiculoDoDia(
      referencia: referencia,
      texto: texto,
      traducao: _traducaoNome,
      diaDoAno: dia,
      data: DateTime(data.year, data.month, data.day),
    );
  }

  VersiculoDoDia obterHoje() => obterParaData(DateTime.now());
}
