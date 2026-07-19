import 'package:sqflite/sqflite.dart';

import '../database/database_helper.dart';
import '../models/highlight.dart';

class HighlightsService {
  static HighlightsService? _instance;
  final DatabaseHelper _db = DatabaseHelper();
  static const String _tableV2 = 'highlights_v2';

  HighlightsService._();

  factory HighlightsService() {
    _instance ??= HighlightsService._();
    return _instance!;
  }

  Future<int> add({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String cor,
    required String traducao,
  }) async {
    final db = await _db.database;
    return await db.insert(
      'highlights',
      {
        'livro': livro,
        'capitulo': capitulo,
        'versiculo': versiculo,
        'cor': cor,
        'created_at': DateTime.now().millisecondsSinceEpoch,
        'traducao': traducao,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  String _novoId() =>
      'hl_${DateTime.now().millisecondsSinceEpoch}_${(DateTime.now().microsecondsSinceEpoch & 0xFFFF).toRadixString(16)}';

  Future<void> addHighlight({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String cor,
    required String traducao,
  }) async {
    final db = await _db.database;
    final now = DateTime.now().toIso8601String();
    await db.insert(
      _tableV2,
      {
        'id': _novoId(),
        'livro': livro,
        'capitulo': capitulo,
        'versiculo': versiculo,
        'cor': cor,
        'criadoEm': now,
        'traducao': traducao,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<int> remove({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    return await db.delete(
      'highlights',
      where: 'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<void> removeHighlight({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    await db.delete(
      _tableV2,
      where: 'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<int> removeByColor({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String cor,
    required String traducao,
  }) async {
    final db = await _db.database;
    return await db.delete(
      'highlights',
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND cor = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, cor, traducao],
    );
  }

  Future<List<Highlight>> getAll() async {
    final db = await _db.database;
    final rows = await db.query(
      'highlights',
      orderBy: 'created_at DESC',
    );
    return rows.map(Highlight.fromMap).toList();
  }

  Future<List<Highlight>> todasHighlights() async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      orderBy: 'criadoEm DESC',
    );
    return rows.map((m) => Highlight.fromJson(Map<String, dynamic>.from(m))).toList();
  }

  Future<List<Highlight>> getByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'highlights',
      where: 'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
    return rows.map(Highlight.fromMap).toList();
  }

  Future<List<Highlight>> highlightsPorReferencia({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      where: 'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
    return rows.map((m) => Highlight.fromJson(Map<String, dynamic>.from(m))).toList();
  }

  Future<List<Highlight>> getByChapter({
    required String livro,
    required int capitulo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'highlights',
      where: 'livro = ? AND capitulo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, traducao],
      orderBy: 'versiculo ASC',
    );
    return rows.map(Highlight.fromMap).toList();
  }

  Future<List<Highlight>> getByColor(String cor) async {
    final db = await _db.database;
    final rows = await db.query(
      'highlights',
      where: 'cor = ?',
      whereArgs: [cor],
      orderBy: 'created_at DESC',
    );
    return rows.map(Highlight.fromMap).toList();
  }

  Future<List<Highlight>> getByLivro(String livro) async {
    final db = await _db.database;
    final rows = await db.query(
      'highlights',
      where: 'livro = ?',
      whereArgs: [livro],
      orderBy: 'capitulo ASC, versiculo ASC',
    );
    return rows.map(Highlight.fromMap).toList();
  }

  Future<Highlight?> getHighlightForVerse({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final list = await getByReference(
      livro: livro,
      capitulo: capitulo,
      versiculo: versiculo,
      traducao: traducao,
    );
    return list.isEmpty ? null : list.first;
  }

  Future<int> count() async {
    final db = await _db.database;
    final result =
        await db.rawQuery('SELECT COUNT(*) as total FROM highlights');
    return Sqflite.firstIntValue(result) ?? 0;
  }

  Future<int> countByColor(String cor) async {
    final db = await _db.database;
    final result = await db.rawQuery(
      'SELECT COUNT(*) as total FROM highlights WHERE cor = ?',
      [cor],
    );
    return Sqflite.firstIntValue(result) ?? 0;
  }
}
