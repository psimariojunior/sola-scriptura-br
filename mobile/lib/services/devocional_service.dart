import 'package:sqflite/sqflite.dart';

import '../data/devocionais_data.dart';
import '../database/database_helper.dart';
import '../models/devocional.dart';
import 'biblia_service.dart';

class ReferenciaLeitura {
  final String slug;
  final int capitulo;
  final int? versiculoInicial;
  final int? versiculoFinal;

  const ReferenciaLeitura({
    required this.slug,
    required this.capitulo,
    this.versiculoInicial,
    this.versiculoFinal,
  });

  String get caminhoBiblia {
    final abrev = BibliaService.abrevFromSlug(slug);
    return '/biblia/$abrev/$capitulo';
  }
}

class DevocionalService {
  static const String _tabela = 'devocionais_lidos';

  DevocionalService();

  int _diaDoAno(DateTime date) {
    final inicio = DateTime(date.year, 1, 1);
    final diff = date.difference(inicio).inDays;
    final total = DevocionaisData.totalDias;
    return ((diff % total) + 1);
  }

  Devocional obterParaData(DateTime data) {
    return DevocionaisData.getByDia(_diaDoAno(data));
  }

  Devocional obterHoje() => obterParaData(DateTime.now());

  List<Devocional> listarTodos() => DevocionaisData.todos;

  ReferenciaLeitura? parseReferencia(String referencia) {
    final match = RegExp(
      r'^(?:([1-3]\s*)?([A-Za-zÀ-ÿ]+)\s+(\d+):(\d+)(?:\s*[-–]\s*(\d+))?$',
    ).firstMatch(referencia.trim());
    if (match == null) return null;

    final prefixo = (match.group(1) ?? '').replaceAll(RegExp(r'\s+'), '');
    final nome = match.group(2)?.toLowerCase() ?? '';
    final capitulo = int.tryParse(match.group(3) ?? '') ?? 1;
    final versiculoInicial = int.tryParse(match.group(4) ?? '');
    final versiculoFinal = int.tryParse(match.group(5) ?? '');

    final livros = BibliaService.livros;
    for (final livro in livros) {
      final nomeLower = livro.nome.toLowerCase();
      if (nomeLower == nome ||
          nomeLower.startsWith('$prefixo$nome') ||
          (prefixo.isNotEmpty && nomeLower.startsWith('$prefixo $nome'))) {
        return ReferenciaLeitura(
          slug: livro.slug,
          capitulo: capitulo,
          versiculoInicial: versiculoInicial,
          versiculoFinal: versiculoFinal,
        );
      }
    }
    return null;
  }

  Future<Database> _db() => DatabaseHelper().database;

  Future<bool> foiLido(int dia) async {
    final db = await _db();
    final result = await db.query(
      _tabela,
      where: 'dia = ?',
      whereArgs: [dia],
      limit: 1,
    );
    return result.isNotEmpty;
  }

  Future<Set<int>> obterLidos() async {
    final db = await _db();
    final result = await db.query(_tabela, columns: ['dia']);
    return result.map((row) => row['dia'] as int).toSet();
  }

  Future<void> marcarLido(int dia) async {
    final db = await _db();
    await db.insert(
      _tabela,
      {
        'dia': dia,
        'lido_em': DateTime.now().millisecondsSinceEpoch,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> desmarcarLido(int dia) async {
    final db = await _db();
    await db.delete(_tabela, where: 'dia = ?', whereArgs: [dia]);
  }
}

