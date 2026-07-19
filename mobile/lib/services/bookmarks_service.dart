import 'package:sqflite/sqflite.dart';

import '../database/database_helper.dart';
import '../models/bookmark.dart';

class BookmarksService {
  static BookmarksService? _instance;
  final DatabaseHelper _db = DatabaseHelper();

  BookmarksService._();

  factory BookmarksService() {
    _instance ??= BookmarksService._();
    return _instance!;
  }

  Future<int> add({
    required String livro,
    required int capitulo,
    required int versiculo,
    String? nota,
  }) async {
    final db = await _db.database;
    return await db.insert(
      'bookmarks',
      {
        'livro': livro,
        'capitulo': capitulo,
        'versiculo': versiculo,
        if (nota != null) 'nota': nota,
        'created_at': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }

  Future<int> updateNota(int id, String? nota) async {
    final db = await _db.database;
    return await db.update(
      'bookmarks',
      {'nota': nota},
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<int> remove(int id) async {
    final db = await _db.database;
    return await db.delete(
      'bookmarks',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<int> removeByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
  }) async {
    final db = await _db.database;
    return await db.delete(
      'bookmarks',
      where: 'livro = ? AND capitulo = ? AND versiculo = ?',
      whereArgs: [livro, capitulo, versiculo],
    );
  }

  Future<List<Bookmark>> getAll() async {
    final db = await _db.database;
    final rows = await db.query(
      'bookmarks',
      orderBy: 'created_at DESC',
    );
    return rows.map(Bookmark.fromMap).toList();
  }

  Future<List<Bookmark>> getByLivro(String livro) async {
    final db = await _db.database;
    final rows = await db.query(
      'bookmarks',
      where: 'livro = ?',
      whereArgs: [livro],
      orderBy: 'capitulo ASC, versiculo ASC',
    );
    return rows.map(Bookmark.fromMap).toList();
  }

  Future<Bookmark?> getByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'bookmarks',
      where: 'livro = ? AND capitulo = ? AND versiculo = ?',
      whereArgs: [livro, capitulo, versiculo],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return Bookmark.fromMap(rows.first);
  }

  Future<bool> hasBookmark({
    required String livro,
    required int capitulo,
    required int versiculo,
  }) async {
    final b = await getByReference(
      livro: livro,
      capitulo: capitulo,
      versiculo: versiculo,
    );
    return b != null;
  }

  Future<int> count() async {
    final db = await _db.database;
    final result =
        await db.rawQuery('SELECT COUNT(*) as total FROM bookmarks');
    return Sqflite.firstIntValue(result) ?? 0;
  }
}
