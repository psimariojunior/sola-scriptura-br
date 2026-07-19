import 'package:sqflite/sqflite.dart';

import '../database/database_helper.dart';
import '../models/favorite.dart';
import '../models/favorito.dart';

class FavoritesService {
  static FavoritesService? _instance;
  final DatabaseHelper _db = DatabaseHelper();
  static const String _tableV2 = 'favorites_v2';

  FavoritesService._();

  factory FavoritesService() {
    _instance ??= FavoritesService._();
    return _instance!;
  }

  String _novoId() =>
      'fv_${DateTime.now().millisecondsSinceEpoch}_${(DateTime.now().microsecondsSinceEpoch & 0xFFFF).toRadixString(16)}';

  Future<int> add({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
    String? nota,
  }) async {
    final db = await _db.database;
    final versiculoRef = '$livro $capitulo:$versiculo';
    return await db.insert(
      'favoritos',
      {
        'livro': livro,
        'capitulo': capitulo,
        'versiculo': versiculo,
        'traducao': traducao,
        'versiculo_ref': versiculoRef,
        if (nota != null) 'nota': nota,
        'criado_em': DateTime.now().millisecondsSinceEpoch,
        'sincronizado': 0,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> addFavorite({
    required String livro,
    required int capitulo,
    required int versiculo,
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
    final versiculoRef = '$livro $capitulo:$versiculo';
    return await db.delete(
      'favoritos',
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
    );
  }

  Future<void> removeFavorite({
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

  Future<int> removeByRef(String versiculoRef) async {
    final db = await _db.database;
    return await db.delete(
      'favoritos',
      where: 'versiculo_ref = ?',
      whereArgs: [versiculoRef],
    );
  }

  Future<bool> isFavorite({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'favoritos',
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
      limit: 1,
    );
    return rows.isNotEmpty;
  }

  Future<bool> isFavoriteByRef(String versiculoRef) async {
    final db = await _db.database;
    final rows = await db.query(
      'favoritos',
      where: 'versiculo_ref = ?',
      whereArgs: [versiculoRef],
      limit: 1,
    );
    return rows.isNotEmpty;
  }

  Future<List<Favorite>> getAll() async {
    final db = await _db.database;
    final rows = await db.query(
      'favoritos',
      orderBy: 'criado_em DESC',
    );
    return rows.map(Favorite.fromMap).toList();
  }

  Future<List<Favorito>> todosFavorites() async {
    final db = await _db.database;
    final rows = await db.query(
      _tableV2,
      orderBy: 'criadoEm DESC',
    );
    return rows.map((m) => Favorito.fromJson(Map<String, dynamic>.from(m))).toList();
  }

  Future<List<Favorite>> getByLivro(String livro) async {
    final db = await _db.database;
    final rows = await db.query(
      'favoritos',
      where: 'livro = ?',
      whereArgs: [livro],
      orderBy: 'capitulo ASC, versiculo ASC',
    );
    return rows.map(Favorite.fromMap).toList();
  }

  Future<List<Favorite>> getByChapter({
    required String livro,
    required int capitulo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'favoritos',
      where: 'livro = ? AND capitulo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, traducao],
      orderBy: 'versiculo ASC',
    );
    return rows.map(Favorite.fromMap).toList();
  }

  Future<int> count() async {
    final db = await _db.database;
    final result =
        await db.rawQuery('SELECT COUNT(*) as total FROM favoritos');
    return Sqflite.firstIntValue(result) ?? 0;
  }

  Future<Favorite?> getByReference({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
  }) async {
    final db = await _db.database;
    final rows = await db.query(
      'favoritos',
      where:
          'livro = ? AND capitulo = ? AND versiculo = ? AND traducao = ?',
      whereArgs: [livro, capitulo, versiculo, traducao],
      limit: 1,
    );
    if (rows.isEmpty) return null;
    return Favorite.fromMap(rows.first);
  }
}
