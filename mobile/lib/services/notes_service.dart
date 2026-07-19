import 'package:sqflite/sqflite.dart';

import '../database/database_helper.dart';
import '../models/nota.dart';
import '../models/study_note.dart';

class NotesService {
  static NotesService? _instance;
  final DatabaseHelper _db = DatabaseHelper();
  static const String _tableV2 = 'notes_v2';

  NotesService._();

  factory NotesService() {
    _instance ??= NotesService._();
    return _instance!;
  }

  String _novoId() =>
      'nt_${DateTime.now().millisecondsSinceEpoch}_${(DateTime.now().microsecondsSinceEpoch & 0xFFFF).toRadixString(16)}';

  Future<int> add({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String texto,
    required String traducao,
  }) async {
    final db = await _db.database;
    final now = DateTime.now().millisecondsSinceEpoch;
    final versiculoRef = '$livro $capitulo:$versiculo';

    return await db.insert(
      'notas',
      {
        'livro': livro,
        'capitulo': capitulo,
        'versiculo': versiculo,
        'traducao': traducao,
        'versiculo_ref': versiculoRef,
        'conteudo': texto,
        'criado_em': now,
        'atualizado_em': now,
        'sincronizado': 0,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> addNote({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String texto,
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
        'texto': texto,
        'criadoEm': now,
        'atualizadoEm': now,
        'traducao': traducao,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<int> update(int id, String texto) async {
    final db = await _db.database;
    return await db.update(
      'notas',
      {
        'conteudo': texto,
        'atualizado_em': DateTime.now().millisecondsSinceEpoch,
        'sincronizado': 0,
      },
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<void> updateNote({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String texto,
    required String traducao,
  }) async {
    final db = await _db.database;
    final now = DateTime.now().toIso8601String();
    await db.update(
      _tableV2,
      {
        'texto': texto,
        'atualizadoEm': now,
      },
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<int> updateByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
    required String texto,
  }) async {
    final db = await _db.database;
    return await db.update(
      'notas',
      {
        'conteudo': texto,
        'atualizado_em': DateTime.now().millisecondsSinceEpoch,
        'sincronizado': 0,
      },
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<int> delete(int id) async {
    final db = await _db.database;
    return await db.delete(
      'notas',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<void> removeNote({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    await db.delete(
      _tableV2,
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<int> deleteByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    return await db.delete(
      'notas',
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<List<StudyNote>> getAll() async {
    final db = await _db.database;
    final rows = await db.query(
      'notas',
      orderBy: 'atualizado_em DESC',
    );
    return rows.map(StudyNote.fromMap).toList();
  }

  Future<List<Nota>> todasNotes() async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      orderBy: 'atualizadoEm DESC',
    );
    return rows.map((m) => Nota.fromJson(Map<String, dynamic>.from(m))).toList();
  }

  Future<List<StudyNote>> getByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'notas',
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
    return rows.map(StudyNote.fromMap).toList();
  }

  Future<List<Nota>> notesPorReferencia({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
    return rows.map((m) => Nota.fromJson(Map<String, dynamic>.from(m))).toList();
  }

  Future<StudyNote?> getNoteForVerse({
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

  Future<List<StudyNote>> getByChapter({
    required String livro,
    required int capitulo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'notas',
      where: 'livro = ? AND capitulo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, traducao],
      orderBy: 'versiculo ASC',
    );
    return rows.map(StudyNote.fromMap).toList();
  }

  Future<List<StudyNote>> search(String query) async {
    final db = await _db.database;
    final like = '%${query.toLowerCase()}%';
    final rows = await db.query(
      'notas',
      where: 'LOWER(conteudo) LIKE ? OR LOWER(versiculo_ref) LIKE ?',
      whereArgs: [like, like],
      orderBy: 'atualizado_em DESC',
    );
    return rows.map(StudyNote.fromMap).toList();
  }

  Future<bool> hasNoteForVerse({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final note = await getNoteForVerse(
      livro: livro,
      capitulo: capitulo,
      versiculo: versiculo,
      traducao: traducao,
    );
    return note != null && note.texto.trim().isNotEmpty;
  }

  Future<int> count() async {
    final db = await _db.database;
    final result = await db.rawQuery('SELECT COUNT(*) as total FROM notas');
    return Sqflite.firstIntValue(result) ?? 0;
  }
}
