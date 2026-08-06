import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:sqflite/sqflite.dart';
import '../data/database_helper.dart';
import '../data/bible_books.dart';

class BibleOfflineService {
  static final BibleOfflineService instance = BibleOfflineService._init();
  BibleOfflineService._init();

  static const String _apiBaseUrl = 'https://api.solascripturabr.com.br/api/v1';

  static const List<Map<String, String>> availableTranslations = [
    {'id': 'ARC', 'name': 'A Bíblia de Estudo Arqueológica', 'abbreviation': 'ARC', 'language': 'Português'},
    {'id': 'ARA', 'name': 'Nova Tradução na Linguagem de Hoje', 'abbreviation': 'ARA', 'language': 'Português'},
    {'id': 'ACF', 'name': 'Nova Tradução Bíblica', 'abbreviation': 'ACF', 'language': 'Português'},
    {'id': 'KJV', 'name': 'King James Version', 'abbreviation': 'KJV', 'language': 'Inglês'},
    {'id': 'NVI', 'name': 'Nova Versão Internacional', 'abbreviation': 'NVI', 'language': 'Português'},
    {'id': 'WEB', 'name': 'World English Bible', 'abbreviation': 'WEB', 'language': 'Inglês'},
    {'id': 'NVT', 'name': 'Nova Tradução', 'abbreviation': 'NVT', 'language': 'Português'},
    {'id': 'KJA', 'name': 'King James Atualizada', 'abbreviation': 'KJA', 'language': 'Português'},
    {'id': 'AA', 'name': 'Almeida Atualizada', 'abbreviation': 'AA', 'language': 'Português'},
    {'id': 'NBV', 'name': 'Nova Bíblia Viva', 'abbreviation': 'NBV', 'language': 'Português'},
  ];

  bool _isDownloading = false;
  bool get isDownloading => _isDownloading;

  // === DOWNLOAD POR LIVRO (YouVersion style) ===

  Future<void> downloadBook(
    String translationId,
    int bookNumber, {
    Function(double progress)? onProgress,
  }) async {
    final db = await DatabaseHelper.instance.database;
    final book = BibleBooks.getBookByNumber(bookNumber);
    if (book == null) return;

    final chaptersCount = book['chapters'] as int;
    int downloaded = 0;

    for (int chapter = 1; chapter <= chaptersCount; chapter++) {
      try {
        final response = await http.get(
          Uri.parse('$_apiBaseUrl/biblia/traducoes/$translationId/livros/$bookNumber/capitulos/$chapter'),
        ).timeout(const Duration(seconds: 15));

        if (response.statusCode == 200) {
          await db.insert('chapters', {
            'translation_id': translationId,
            'book_number': bookNumber,
            'chapter_number': chapter,
            'data': response.body,
            'cached_at': DateTime.now().toIso8601String(),
          }, conflictAlgorithm: ConflictAlgorithm.replace);
        }
      } catch (e) {
        debugPrint('Erro ao baixar $translationId $bookNumber:$chapter - $e');
      }

      downloaded++;
      onProgress?.call(downloaded / chaptersCount);
      await Future.delayed(const Duration(milliseconds: 50));
    }

    await _updateTranslationMeta(translationId);
  }

  Future<void> downloadTestament(
    String translationId,
    bool isOldTestament, {
    Function(double progress, String currentBook)? onProgress,
  }) async {
    final books = isOldTestament ? BibleBooks.oldTestament : BibleBooks.newTestament;
    int totalBooks = books.length;
    int completedBooks = 0;

    _isDownloading = true;

    for (final book in books) {
      final bookNumber = book['number'] as int;
      final bookName = book['name'] as String;

      await downloadBook(translationId, bookNumber);
      completedBooks++;
      onProgress?.call(completedBooks / totalBooks, bookName);
    }

    _isDownloading = false;
  }

  Future<void> downloadAll(
    String translationId, {
    Function(double progress, String currentBook)? onProgress,
  }) async {
    int totalBooks = BibleBooks.allBooks.length;
    int completedBooks = 0;

    _isDownloading = true;

    for (final book in BibleBooks.allBooks) {
      final bookNumber = book['number'] as int;
      final bookName = book['name'] as String;

      await downloadBook(translationId, bookNumber);
      completedBooks++;
      onProgress?.call(completedBooks / totalBooks, bookName);
    }

    _isDownloading = false;
  }

  // === STATUS DE DOWNLOAD POR LIVRO ===

  Future<Map<int, int>> getBookDownloadStatus(String translationId) async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.rawQuery(
      'SELECT book_number, COUNT(*) as count FROM chapters WHERE translation_id = ? GROUP BY book_number',
      [translationId],
    );

    final status = <int, int>{};
    for (final row in result) {
      status[row['book_number'] as int] = row['count'] as int;
    }
    return status;
  }

  Future<int> getBookChapterCount(String translationId, int bookNumber) async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.rawQuery(
      'SELECT COUNT(*) as count FROM chapters WHERE translation_id = ? AND book_number = ?',
      [translationId, bookNumber],
    );
    return result.first['count'] as int;
  }

  Future<bool> isBookDownloaded(String translationId, int bookNumber) async {
    final book = BibleBooks.getBookByNumber(bookNumber);
    if (book == null) return false;

    final count = await getBookChapterCount(translationId, bookNumber);
    return count >= (book['chapters'] as int);
  }

  Future<void> deleteBook(String translationId, int bookNumber) async {
    final db = await DatabaseHelper.instance.database;
    await db.delete(
      'chapters',
      where: 'translation_id = ? AND book_number = ?',
      whereArgs: [translationId, bookNumber],
    );
    await _updateTranslationMeta(translationId);
  }

  // === MÉTODOS LEGADOS ===

  Future<List<Map<String, dynamic>>> getDownloadedTranslations() async {
    final db = await DatabaseHelper.instance.database;
    return await db.query('translations', where: 'downloaded = 1');
  }

  Future<bool> isTranslationDownloaded(String translationId) async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.query(
      'translations',
      where: 'id = ? AND downloaded = 1',
      whereArgs: [translationId],
    );
    return result.isNotEmpty;
  }

  Future<String?> getCachedChapter(String translationId, int bookNumber, int chapterNumber) async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.query(
      'chapters',
      where: 'translation_id = ? AND book_number = ? AND chapter_number = ?',
      whereArgs: [translationId, bookNumber, chapterNumber],
    );

    if (result.isNotEmpty) {
      return result.first['data'] as String;
    }
    return null;
  }

  Future<void> cacheChapter(String translationId, int bookNumber, int chapterNumber, String data) async {
    final db = await DatabaseHelper.instance.database;
    await db.insert('chapters', {
      'translation_id': translationId,
      'book_number': bookNumber,
      'chapter_number': chapterNumber,
      'data': data,
      'cached_at': DateTime.now().toIso8601String(),
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<int> getCachedChapterCount(String translationId) async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.rawQuery(
      'SELECT COUNT(*) as count FROM chapters WHERE translation_id = ?',
      [translationId],
    );
    return result.first['count'] as int;
  }

  Future<int> getTotalCachedChapters() async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.rawQuery('SELECT COUNT(*) as count FROM chapters');
    return result.first['count'] as int;
  }

  Future<int> getTotalCacheSize() async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.rawQuery('SELECT SUM(LENGTH(data)) as total FROM chapters');
    return result.first['total'] as int? ?? 0;
  }

  Future<void> deleteTranslation(String translationId) async {
    final db = await DatabaseHelper.instance.database;
    await db.delete('chapters', where: 'translation_id = ?', whereArgs: [translationId]);
    await db.update(
      'translations',
      {'downloaded': 0, 'download_date': null, 'file_size': 0},
      where: 'id = ?',
      whereArgs: [translationId],
    );
  }

  Future<void> _updateTranslationMeta(String translationId) async {
    final db = await DatabaseHelper.instance.database;
    final bookStatus = await getBookDownloadStatus(translationId);
    final allBooksDownloaded = BibleBooks.allBooks.every((book) {
      final bookNumber = book['number'] as int;
      final downloaded = bookStatus[bookNumber] ?? 0;
      return downloaded >= (book['chapters'] as int);
    });

    final result = await db.rawQuery(
      'SELECT SUM(LENGTH(data)) as total FROM chapters WHERE translation_id = ?',
      [translationId],
    );
    final totalSize = result.first['total'] as int? ?? 0;

    final existing = await db.query('translations', where: 'id = ?', whereArgs: [translationId]);
    if (existing.isEmpty) {
      final t = availableTranslations.firstWhere(
        (t) => t['id'] == translationId,
        orElse: () => {'id': translationId, 'name': translationId, 'abbreviation': translationId, 'language': 'Desconhecido'},
      );
      await db.insert('translations', {
        'id': translationId,
        'name': t['name'],
        'language': t['language']!,
        'abbreviation': t['abbreviation']!,
        'downloaded': allBooksDownloaded ? 1 : 0,
        'file_size': totalSize,
      });
    } else {
      await db.update(
        'translations',
        {
          'downloaded': allBooksDownloaded ? 1 : 0,
          'download_date': allBooksDownloaded ? DateTime.now().toIso8601String() : null,
          'file_size': totalSize,
        },
        where: 'id = ?',
        whereArgs: [translationId],
      );
    }
  }

  // === FAVORITOS ===

  Future<void> saveFavorite({
    required int bookNumber,
    required int chapterNumber,
    required int verseNumber,
    required String translationId,
    required String text,
    required String reference,
    String color = '#A17A2C',
  }) async {
    final db = await DatabaseHelper.instance.database;
    final id = '${translationId}_${bookNumber}_${chapterNumber}_$verseNumber';

    await db.insert('favorites', {
      'id': id,
      'book_number': bookNumber,
      'chapter_number': chapterNumber,
      'verse_number': verseNumber,
      'translation_id': translationId,
      'text': text,
      'reference': reference,
      'color': color,
      'created_at': DateTime.now().toIso8601String(),
      'synced': 0,
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<Map<String, dynamic>>> getFavorites({String? translationId}) async {
    final db = await DatabaseHelper.instance.database;
    if (translationId != null) {
      return await db.query('favorites', where: 'translation_id = ?', whereArgs: [translationId]);
    }
    return await db.query('favorites', orderBy: 'created_at DESC');
  }

  Future<void> removeFavorite(String id) async {
    final db = await DatabaseHelper.instance.database;
    await db.delete('favorites', where: 'id = ?', whereArgs: [id]);
  }

  // === NOTAS ===

  Future<void> saveNote({
    required int bookNumber,
    required int chapterNumber,
    int? verseNumber,
    String? translationId,
    String? title,
    required String content,
    List<String>? tags,
  }) async {
    final db = await DatabaseHelper.instance.database;
    final id = 'note_${DateTime.now().millisecondsSinceEpoch}';

    await db.insert('notes', {
      'id': id,
      'book_number': bookNumber,
      'chapter_number': chapterNumber,
      'verse_number': verseNumber,
      'translation_id': translationId,
      'title': title,
      'content': content,
      'tags': tags?.join(','),
      'created_at': DateTime.now().toIso8601String(),
      'updated_at': DateTime.now().toIso8601String(),
      'synced': 0,
    });
  }

  Future<List<Map<String, dynamic>>> getNotes({int? bookNumber, int? chapterNumber}) async {
    final db = await DatabaseHelper.instance.database;
    String? where;
    List<dynamic>? whereArgs;

    if (bookNumber != null && chapterNumber != null) {
      where = 'book_number = ? AND chapter_number = ?';
      whereArgs = [bookNumber, chapterNumber];
    } else if (bookNumber != null) {
      where = 'book_number = ?';
      whereArgs = [bookNumber];
    }

    return await db.query('notes', where: where, whereArgs: whereArgs, orderBy: 'created_at DESC');
  }

  Future<void> updateNote(String id, {String? title, String? content, List<String>? tags}) async {
    final db = await DatabaseHelper.instance.database;
    final updates = <String, dynamic>{
      'updated_at': DateTime.now().toIso8601String(),
      'synced': 0,
    };
    if (title != null) updates['title'] = title;
    if (content != null) updates['content'] = content;
    if (tags != null) updates['tags'] = tags.join(',');

    await db.update('notes', updates, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> deleteNote(String id) async {
    final db = await DatabaseHelper.instance.database;
    await db.delete('notes', where: 'id = ?', whereArgs: [id]);
  }

  // === STREAK ===

  Future<void> recordReading(int bookNumber, int chapterNumber) async {
    final db = await DatabaseHelper.instance.database;
    await db.insert('reading_progress', {
      'book_number': bookNumber,
      'chapter_number': chapterNumber,
      'translation_id': 'ARC',
      'read_at': DateTime.now().toIso8601String(),
    });
  }

  Future<void> recordStreakDay({int chaptersRead = 1, int minutesRead = 0}) async {
    final db = await DatabaseHelper.instance.database;
    final today = DateTime.now();
    final dateStr = '${today.year}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';

    await db.insert('streak_history', {
      'date': dateStr,
      'chapters_read': chaptersRead,
      'minutes_read': minutesRead,
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<int> getCurrentStreak() async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.query('streak_history', orderBy: 'date DESC');
    if (result.isEmpty) return 0;

    int streak = 0;
    DateTime? lastDate;

    for (final row in result) {
      final date = DateTime.parse(row['date'] as String);
      if (lastDate == null) {
        final today = DateTime.now();
        final todayDate = DateTime(today.year, today.month, today.day);
        final lastDay = DateTime(date.year, date.month, date.day);
        final diff = todayDate.difference(lastDay).inDays;

        if (diff == 0) {
          streak = 1;
          lastDate = date;
        } else if (diff == 1) {
          streak = 1;
          lastDate = date;
        } else {
          break;
        }
      } else {
        final prevDay = DateTime(lastDate.year, lastDate.month, lastDate.day);
        final currentDay = DateTime(date.year, date.month, date.day);
        final diff = prevDay.difference(currentDay).inDays;

        if (diff == 1) {
          streak++;
          lastDate = date;
        } else {
          break;
        }
      }
    }

    return streak;
  }

  // === SYNC ===

  Future<List<Map<String, dynamic>>> getUnsyncedFavorites() async {
    final db = await DatabaseHelper.instance.database;
    return await db.query('favorites', where: 'synced = 0');
  }

  Future<List<Map<String, dynamic>>> getUnsyncedNotes() async {
    final db = await DatabaseHelper.instance.database;
    return await db.query('notes', where: 'synced = 0');
  }

  Future<void> markFavoriteSynced(String id) async {
    final db = await DatabaseHelper.instance.database;
    await db.update('favorites', {'synced': 1}, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> markNoteSynced(String id) async {
    final db = await DatabaseHelper.instance.database;
    await db.update('notes', {'synced': 1}, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> clearAllData() async {
    final db = await DatabaseHelper.instance.database;
    await db.delete('chapters');
    await db.delete('favorites');
    await db.delete('notes');
    await db.delete('reading_progress');
    await db.delete('streak_history');
    await db.update('translations', {
      'downloaded': 0,
      'download_date': null,
      'file_size': 0,
    });
  }
}
