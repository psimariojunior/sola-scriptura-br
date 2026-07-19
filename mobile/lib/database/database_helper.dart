import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static DatabaseHelper? _instance;
  static Database? _database;

  DatabaseHelper._();

  factory DatabaseHelper() {
    _instance ??= DatabaseHelper._();
    return _instance!;
  }

  Future<Database> get database async {
    _database ??= await _initDatabase();
    return _database!;
  }

  static const int _dbVersion = 3;

  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'sola_scriptura.db');
    return await openDatabase(
      path,
      version: _dbVersion,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE versiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        versiculo INTEGER NOT NULL,
        texto TEXT NOT NULL,
        traducao TEXT NOT NULL,
        cached_at INTEGER NOT NULL,
        UNIQUE(livro, capitulo, versiculo, traducao)
      )
    ''');

    await db.execute('''
      CREATE TABLE livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        testamento TEXT NOT NULL,
        capitulos INTEGER NOT NULL,
        abreviacao TEXT NOT NULL,
        ordem INTEGER NOT NULL DEFAULT 0,
        cached_at INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE comentarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        referencia TEXT NOT NULL,
        autor TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        fonte TEXT,
        cached_at INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE favoritos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        versiculo_ref TEXT NOT NULL UNIQUE,
        livro TEXT,
        capitulo INTEGER,
        versiculo INTEGER,
        traducao TEXT,
        nota TEXT,
        criado_em INTEGER NOT NULL,
        sincronizado INTEGER NOT NULL DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE notas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        versiculo_ref TEXT NOT NULL UNIQUE,
        livro TEXT,
        capitulo INTEGER,
        versiculo INTEGER,
        traducao TEXT,
        conteudo TEXT NOT NULL,
        criado_em INTEGER NOT NULL,
        atualizado_em INTEGER NOT NULL,
        sincronizado INTEGER NOT NULL DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE historico_pesquisa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE configuracoes (
        chave TEXT NOT NULL PRIMARY KEY,
        valor TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE acoes_pendentes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        dados TEXT NOT NULL,
        criado_em INTEGER NOT NULL,
        tentativas INTEGER NOT NULL DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE devocionais_lidos (
        dia INTEGER NOT NULL PRIMARY KEY,
        lido_em INTEGER NOT NULL
      )
    ''');

    await _createHighlightsTable(db);
    await _createBookmarksTable(db);
    await _createReadingHistoryTable(db);

    await _createV2Tables(db);
  }

  Future<void> _createV2Tables(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS highlights_v2 (
        id TEXT PRIMARY KEY,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        versiculo INTEGER NOT NULL,
        cor TEXT NOT NULL,
        criadoEm TEXT NOT NULL,
        traducao TEXT NOT NULL
      )
    ''');
    await db.execute('''
      CREATE TABLE IF NOT EXISTS notes_v2 (
        id TEXT PRIMARY KEY,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        versiculo INTEGER NOT NULL,
        texto TEXT NOT NULL,
        criadoEm TEXT NOT NULL,
        atualizadoEm TEXT NOT NULL,
        traducao TEXT NOT NULL
      )
    ''');
    await db.execute('''
      CREATE TABLE IF NOT EXISTS favorites_v2 (
        id TEXT PRIMARY KEY,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        versiculo INTEGER NOT NULL,
        criadoEm TEXT NOT NULL,
        traducao TEXT NOT NULL
      )
    ''');
    await db.execute('''
      CREATE TABLE IF NOT EXISTS reading_history_v2 (
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        ultimaLeitura TEXT NOT NULL,
        PRIMARY KEY (livro, capitulo)
      )
    ''');
  }

  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 2) {
      await _ensureColumn(db, 'favoritos', 'livro', 'TEXT');
      await _ensureColumn(db, 'favoritos', 'capitulo', 'INTEGER');
      await _ensureColumn(db, 'favoritos', 'versiculo', 'INTEGER');
      await _ensureColumn(db, 'favoritos', 'traducao', 'TEXT');

      await _ensureColumn(db, 'notas', 'livro', 'TEXT');
      await _ensureColumn(db, 'notas', 'capitulo', 'INTEGER');
      await _ensureColumn(db, 'notas', 'versiculo', 'INTEGER');
      await _ensureColumn(db, 'notas', 'traducao', 'TEXT');

      await _createHighlightsTable(db);
      await _createBookmarksTable(db);
      await _createReadingHistoryTable(db);
      await _createDevocionaisLidosTable(db);
    }
    if (oldVersion < 3) {
      await _createV2Tables(db);
    }
  }

  Future<void> _createDevocionaisLidosTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS devocionais_lidos (
        dia INTEGER NOT NULL PRIMARY KEY,
        lido_em INTEGER NOT NULL
      )
    ''');
  }

  Future<void> _createHighlightsTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS highlights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        versiculo INTEGER NOT NULL,
        cor TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        traducao TEXT NOT NULL,
        UNIQUE(livro, capitulo, versiculo, traducao)
      )
    ''');
  }

  Future<void> _createBookmarksTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        versiculo INTEGER NOT NULL,
        nota TEXT,
        created_at INTEGER NOT NULL
      )
    ''');
  }

  Future<void> _createReadingHistoryTable(Database db) async {
    await db.execute('''
      CREATE TABLE IF NOT EXISTS reading_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        livro TEXT NOT NULL,
        capitulo INTEGER NOT NULL,
        last_read_at INTEGER NOT NULL,
        UNIQUE(livro, capitulo)
      )
    ''');
  }

  Future<void> _ensureColumn(
    Database db,
    String table,
    String column,
    String type,
  ) async {
    final info = await db.rawQuery('PRAGMA table_info($table)');
    final hasColumn = info.any((row) => row['name'] == column);
    if (!hasColumn) {
      await db.execute('ALTER TABLE $table ADD COLUMN $column $type');
    }
  }

  Future<int> insert(String table, Map<String, dynamic> data) async {
    final db = await database;
    return await db.insert(table, data, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<Map<String, dynamic>>> query(
    String table, {
    String? where,
    List<dynamic>? whereArgs,
    String? orderBy,
    int? limit,
  }) async {
    final db = await database;
    return await db.query(
      table,
      where: where,
      whereArgs: whereArgs,
      orderBy: orderBy,
      limit: limit,
    );
  }

  Future<int> update(
    String table,
    Map<String, dynamic> data, {
    String? where,
    List<dynamic>? whereArgs,
  }) async {
    final db = await database;
    return await db.update(table, data, where: where, whereArgs: whereArgs);
  }

  Future<int> delete(
    String table, {
    String? where,
    List<dynamic>? whereArgs,
  }) async {
    final db = await database;
    return await db.delete(table, where: where, whereArgs: whereArgs);
  }

  Future<void> clearOldCache(String table, {required int olderThanMs}) async {
    final db = await database;
    final cutoff = DateTime.now().millisecondsSinceEpoch - olderThanMs;
    await db.delete(table, where: 'cached_at < ?', whereArgs: [cutoff]);
  }

  Future<void> clearAllCache() async {
    final db = await database;
    await db.delete('versiculos');
    await db.delete('livros');
    await db.delete('comentarios');
    await db.delete('historico_pesquisa');
    await db.delete('highlights');
    await db.delete('bookmarks');
    await db.delete('reading_history');
  }

  Future<void> insertBatch(String table, List<Map<String, dynamic>> items) async {
    final db = await database;
    final batch = db.batch();
    for (final item in items) {
      batch.insert(table, item, conflictAlgorithm: ConflictAlgorithm.replace);
    }
    await batch.commit(noResult: true);
  }
}
