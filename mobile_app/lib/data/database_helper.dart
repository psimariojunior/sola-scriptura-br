import 'package:flutter/foundation.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    try {
      _database = await _initDB('sola_scriptura.db');
      return _database!;
    } catch (e) {
      debugPrint('[DatabaseHelper] Init error: $e');
      rethrow;
    }
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future<void> _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE translations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        language TEXT NOT NULL,
        abbreviation TEXT NOT NULL,
        downloaded INTEGER NOT NULL DEFAULT 0,
        download_date TEXT,
        file_size INTEGER DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE chapters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        translation_id TEXT NOT NULL,
        book_number INTEGER NOT NULL,
        chapter_number INTEGER NOT NULL,
        data TEXT NOT NULL,
        cached_at TEXT NOT NULL,
        FOREIGN KEY (translation_id) REFERENCES translations(id) ON DELETE CASCADE
      )
    ''');

    await db.execute('''
      CREATE TABLE favorites (
        id TEXT PRIMARY KEY,
        book_number INTEGER NOT NULL,
        chapter_number INTEGER NOT NULL,
        verse_number INTEGER NOT NULL,
        translation_id TEXT NOT NULL,
        text TEXT NOT NULL,
        reference TEXT NOT NULL,
        color TEXT DEFAULT '#A17A2C',
        created_at TEXT NOT NULL,
        synced INTEGER DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE notes (
        id TEXT PRIMARY KEY,
        book_number INTEGER NOT NULL,
        chapter_number INTEGER NOT NULL,
        verse_number INTEGER,
        translation_id TEXT,
        title TEXT,
        content TEXT NOT NULL,
        tags TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        synced INTEGER DEFAULT 0
      )
    ''');

    await db.execute('''
      CREATE TABLE reading_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_number INTEGER NOT NULL,
        chapter_number INTEGER NOT NULL,
        verse_number INTEGER DEFAULT 0,
        translation_id TEXT NOT NULL,
        read_at TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE streak_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        chapters_read INTEGER DEFAULT 0,
        minutes_read INTEGER DEFAULT 0
      )
    ''');

    await db.execute('CREATE INDEX idx_chapters_translation ON chapters(translation_id)');
    await db.execute('CREATE INDEX idx_chapters_book ON chapters(book_number, chapter_number)');
    await db.execute('CREATE INDEX idx_favorites_translation ON favorites(translation_id)');
    await db.execute('CREATE INDEX idx_notes_book ON notes(book_number, chapter_number)');
  }

  Future<void> close() async {
    final db = await database;
    db.close();
    _database = null;
  }
}
