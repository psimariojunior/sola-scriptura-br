import 'package:sqflite/sqflite.dart';

import '../database/database_helper.dart';

class ReadingHistoryEntry {
  final int? id;
  final String livro;
  final int capitulo;
  final int lastReadAt;

  const ReadingHistoryEntry({
    this.id,
    required this.livro,
    required this.capitulo,
    required this.lastReadAt,
  });

  String get referencia => '$livro $capitulo';

  factory ReadingHistoryEntry.fromMap(Map<String, dynamic> map) {
    return ReadingHistoryEntry(
      id: map['id'] as int?,
      livro: map['livro'] as String? ?? '',
      capitulo: map['capitulo'] as int? ?? 0,
      lastReadAt: map['last_read_at'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'livro': livro,
      'capitulo': capitulo,
      'last_read_at': lastReadAt,
    };
  }
}

class ReadingHistoryService {
  static ReadingHistoryService? _instance;
  final DatabaseHelper _db = DatabaseHelper();
  static const String _tableV2 = 'reading_history_v2';

  ReadingHistoryService._();

  factory ReadingHistoryService() {
    _instance ??= ReadingHistoryService._();
    return _instance!;
  }

  Future<void> saveProgress({
    required String livro,
    required int capitulo,
  }) async {
    final db = await _db.database;
    await db.insert(
      'reading_history',
      {
        'livro': livro,
        'capitulo': capitulo,
        'last_read_at': DateTime.now().millisecondsSinceEpoch,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> salvarProgresso({
    required String livro,
    required int capitulo,
  }) async {
    final db = await _db.database;
    await db.insert(
      _tableV2,
      {
        'livro': livro,
        'capitulo': capitulo,
        'ultimaLeitura': DateTime.now().toIso8601String(),
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<ReadingHistoryEntry?> getLastRead() async {
    final db = await _db.database;
    final rows = await db.query(
      'reading_history',
      orderBy: 'last_read_at DESC',
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return ReadingHistoryEntry.fromMap(rows.first);
  }

  Future<int?> ultimoCapitulo() async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      orderBy: 'ultimaLeitura DESC',
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return rows.first['capitulo'] as int?;
  }

  Future<String?> ultimoLivro() async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      orderBy: 'ultimaLeitura DESC',
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return rows.first['livro'] as String?;
  }

  Future<List<ReadingHistoryEntry>> getHistory({int? limit}) async {
    final db = await _db.database;
    final rows = await db.query(
      'reading_history',
      orderBy: 'last_read_at DESC',
      limit: limit,
    );
    return rows.map(ReadingHistoryEntry.fromMap).toList();
  }

  Future<int> clear() async {
    final db = await _db.database;
    return await db.delete('reading_history');
  }
}
