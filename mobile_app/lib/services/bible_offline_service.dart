import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sqflite/sqflite.dart';
import '../data/database_helper.dart';
import '../data/bible_books.dart';

enum BibleDownloadMode { all, oldTestament, newTestament }

class BibleDownloadSnapshot {
  final String translationId;
  final BibleDownloadMode mode;
  final String status; // idle | running | paused | error | done
  final String currentBook;
  final int booksDone;
  final int booksTotal;
  final int chaptersDone;
  final int chaptersTotal;
  final String? error;
  final int estimatedBytes;

  const BibleDownloadSnapshot({
    required this.translationId,
    required this.mode,
    required this.status,
    this.currentBook = '',
    this.booksDone = 0,
    this.booksTotal = 0,
    this.chaptersDone = 0,
    this.chaptersTotal = 0,
    this.error,
    this.estimatedBytes = 0,
  });

  double get progress =>
      chaptersTotal <= 0 ? 0 : (chaptersDone / chaptersTotal).clamp(0.0, 1.0);

  bool get isActive => status == 'running' || status == 'paused' || status == 'error';

  BibleDownloadSnapshot copyWith({
    String? status,
    String? currentBook,
    int? booksDone,
    int? booksTotal,
    int? chaptersDone,
    int? chaptersTotal,
    String? error,
    bool clearError = false,
  }) {
    return BibleDownloadSnapshot(
      translationId: translationId,
      mode: mode,
      status: status ?? this.status,
      currentBook: currentBook ?? this.currentBook,
      booksDone: booksDone ?? this.booksDone,
      booksTotal: booksTotal ?? this.booksTotal,
      chaptersDone: chaptersDone ?? this.chaptersDone,
      chaptersTotal: chaptersTotal ?? this.chaptersTotal,
      error: clearError ? null : (error ?? this.error),
      estimatedBytes: estimatedBytes,
    );
  }

  Map<String, dynamic> toJson() => {
        'translationId': translationId,
        'mode': mode.name,
        'status': status,
        'currentBook': currentBook,
        'booksDone': booksDone,
        'booksTotal': booksTotal,
        'chaptersDone': chaptersDone,
        'chaptersTotal': chaptersTotal,
        'error': error,
        'estimatedBytes': estimatedBytes,
      };

  static BibleDownloadSnapshot? fromJson(Map<String, dynamic> json) {
    final id = json['translationId'] as String?;
    if (id == null || id.isEmpty) return null;
    final modeName = json['mode'] as String? ?? 'all';
    final mode = BibleDownloadMode.values.firstWhere(
      (m) => m.name == modeName,
      orElse: () => BibleDownloadMode.all,
    );
    var status = json['status'] as String? ?? 'idle';
    if (status == 'running') status = 'paused';
    return BibleDownloadSnapshot(
      translationId: id,
      mode: mode,
      status: status,
      currentBook: json['currentBook'] as String? ?? '',
      booksDone: json['booksDone'] as int? ?? 0,
      booksTotal: json['booksTotal'] as int? ?? 0,
      chaptersDone: json['chaptersDone'] as int? ?? 0,
      chaptersTotal: json['chaptersTotal'] as int? ?? 0,
      error: json['error'] as String?,
      estimatedBytes: json['estimatedBytes'] as int? ?? 0,
    );
  }
}

class OfflineVerse {
  final int number;
  final String text;
  const OfflineVerse({required this.number, required this.text});
}

class LastReading {
  final int bookNumber;
  final int chapterNumber;
  final int verseNumber;
  final String translationId;
  const LastReading({
    required this.bookNumber,
    required this.chapterNumber,
    this.verseNumber = 0,
    required this.translationId,
  });
}

class BibleOfflineService {
  static final BibleOfflineService instance = BibleOfflineService._init();
  BibleOfflineService._init();

  static const String _apiBaseUrl = 'https://api.solascripturabr.com.br/api/v1';
  static const String _midvashBase = 'https://api.midvash.com/v1';
  static const String _siteBase = 'https://solascripturabr.com.br';
  static const String _siteChapterApi = '$_siteBase/api/biblia/capitulo';
  static const String _jobPrefKey = 'ssb_bible_dl_job_v1';
  static const Set<String> _siteLocalTranslations = {
    'NVI', 'ARC', 'ARA', 'ACF', 'KJV', 'WEB',
  };

  /// Fonte TS local ~4,1 MB; JSON compacto no aparelho ~3,9 MB.
  static const int estimatedBytesLocal = 3900000;
  static const int estimatedBytesRemote = 4000000;
  static const Map<String, String> _httpHeaders = {
    'Accept': 'application/json',
    'User-Agent': 'SolaScripturaBR/1.4 (Android; offline-reader)',
  };

  static const List<Map<String, String>> availableTranslations = [
    {'id': 'NVI', 'name': 'Nova Versão Internacional', 'abbreviation': 'NVI', 'language': 'Português'},
    {'id': 'ARC', 'name': 'Almeida Revista e Corrigida', 'abbreviation': 'ARC', 'language': 'Português'},
    {'id': 'ARA', 'name': 'Almeida Revista e Atualizada', 'abbreviation': 'ARA', 'language': 'Português'},
    {'id': 'ACF', 'name': 'Almeida Corrigida Fiel', 'abbreviation': 'ACF', 'language': 'Português'},
    {'id': 'NVT', 'name': 'Nova Versão Transformadora', 'abbreviation': 'NVT', 'language': 'Português'},
    {'id': 'KJA', 'name': 'King James Atualizada', 'abbreviation': 'KJA', 'language': 'Português'},
    {'id': 'AA', 'name': 'Almeida Atualizada', 'abbreviation': 'AA', 'language': 'Português'},
    {'id': 'NBV', 'name': 'Nova Bíblia Viva', 'abbreviation': 'NBV', 'language': 'Português'},
    {'id': 'KJV', 'name': 'King James Version', 'abbreviation': 'KJV', 'language': 'Inglês'},
    {'id': 'WEB', 'name': 'World English Bible', 'abbreviation': 'WEB', 'language': 'Inglês'},
  ];

  bool _isDownloading = false;
  int? _activeDownloadBook;
  bool _pauseRequested = false;
  int _batchDepth = 0;
  BibleDownloadSnapshot? _job;
  bool _jobLoaded = false;

  final ValueNotifier<BibleDownloadSnapshot?> jobNotifier = ValueNotifier(null);

  bool get isDownloading => _isDownloading;
  int? get activeDownloadBook => _activeDownloadBook;
  BibleDownloadSnapshot? get currentJob => _job;

  static bool isLocalSiteTranslation(String id) =>
      _siteLocalTranslations.contains(id.toUpperCase());

  static int estimatedBytesFor(String translationId) =>
      isLocalSiteTranslation(translationId) ? estimatedBytesLocal : estimatedBytesRemote;

  static String formatBytes(int bytes) {
    if (bytes >= 1000000) {
      final mb = bytes / 1000000;
      return '~${mb.toStringAsFixed(1).replaceAll('.', ',')} MB';
    }
    return '~${(bytes / 1000).round()} KB';
  }

  static int totalChaptersFor(BibleDownloadMode mode) {
    final books = _booksForMode(mode);
    return books.fold<int>(0, (sum, b) => sum + (b['chapters'] as int));
  }

  static List<Map<String, dynamic>> _booksForMode(BibleDownloadMode mode) {
    switch (mode) {
      case BibleDownloadMode.oldTestament:
        return BibleBooks.oldTestament;
      case BibleDownloadMode.newTestament:
        return BibleBooks.newTestament;
      case BibleDownloadMode.all:
        return BibleBooks.allBooks;
    }
  }

  // === DOWNLOAD POR LIVRO (YouVersion style) ===

  Future<http.Response?> _getWithRetry(
    Uri uri, {
    int retries = 2,
    Duration timeout = const Duration(seconds: 12),
  }) async {
    for (int attempt = 0; attempt <= retries; attempt++) {
      try {
        final res = await http.get(uri, headers: _httpHeaders).timeout(timeout);
        if (res.statusCode == 200 && res.body.isNotEmpty) return res;
        final transient = [408, 429, 502, 503, 504].contains(res.statusCode);
        if (attempt < retries && (transient || res.statusCode >= 500)) {
          await Future.delayed(Duration(milliseconds: 400 * (attempt + 1)));
          continue;
        }
        return null;
      } catch (e) {
        debugPrint('HTTP $attempt $uri: $e');
        if (attempt >= retries) return null;
        await Future.delayed(Duration(milliseconds: 450 * (attempt + 1)));
      }
    }
    return null;
  }

  String? _payloadFromBody(String body) {
    final verses = parseChapterJson(body);
    if (verses.isEmpty) return null;
    return jsonEncode({
      'verses': verses.map((v) => {'number': v.number, 'text': v.text}).toList(),
    });
  }

  Future<bool> _fetchAndStoreChapter({
    required dynamic db,
    required String translationId,
    required int bookNumber,
    required String slug,
    required int chapter,
  }) async {
    String? payload;
    final trad = translationId.toLowerCase();
    final abbr = (BibleBooks.getBookByNumber(bookNumber)?['abbr'] as String?) ?? slug;

    try {
      if (_siteLocalTranslations.contains(translationId.toUpperCase())) {
        final encodedAbbr = Uri.encodeComponent(abbr);
        final rest = await _getWithRetry(
          Uri.parse('$_siteBase/api/biblia/$trad/$encodedAbbr/$chapter'),
        );
        if (rest != null) payload = _payloadFromBody(rest.body);

        if (payload == null) {
          final site = await _getWithRetry(
            Uri.parse(
              '$_siteChapterApi?traducao=$trad&livro=${Uri.encodeQueryComponent(abbr)}&capitulo=$chapter',
            ),
          );
          if (site != null) payload = _payloadFromBody(site.body);
        }
      }

      if (payload == null) {
        final midvash = await _getWithRetry(Uri.parse('$_midvashBase/$trad/$slug/$chapter'));
        if (midvash != null) payload = _payloadFromBody(midvash.body);
      }

      if (payload == null) {
        final fallback = await _getWithRetry(
          Uri.parse('$_apiBaseUrl/biblia/livros/$slug/capitulos/$chapter'),
          retries: 1,
        );
        if (fallback != null) payload = _payloadFromBody(fallback.body);
      }
    } catch (e) {
      debugPrint('Erro ao baixar $translationId $bookNumber:$chapter - $e');
    }

    if (payload == null) return false;

    await db.delete(
      'chapters',
      where: 'translation_id = ? AND book_number = ? AND chapter_number = ?',
      whereArgs: [translationId, bookNumber, chapter],
    );
    await db.insert('chapters', {
      'translation_id': translationId,
      'book_number': bookNumber,
      'chapter_number': chapter,
      'data': payload,
      'cached_at': DateTime.now().toIso8601String(),
    });
    return true;
  }

  Future<int> downloadBook(
    String translationId,
    int bookNumber, {
    Function(double progress)? onProgress,
  }) async {
    if (_activeDownloadBook != null && _activeDownloadBook != bookNumber) {
      return 0;
    }
    final db = await DatabaseHelper.instance.database;
    final book = BibleBooks.getBookByNumber(bookNumber);
    if (book == null) return 0;
    final slug = BibleBooks.midvashSlug(bookNumber);
    if (slug == null) return 0;

    _activeDownloadBook = bookNumber;
    _batchDepth++;
    _isDownloading = true;
    final chaptersCount = book['chapters'] as int;
    final already = await getDownloadedChapterNumbers(translationId, bookNumber);
    int saved = already.length;
    final local = isLocalSiteTranslation(translationId);
    final gap = local ? 50 : 110;

    try {
      for (int chapter = 1; chapter <= chaptersCount; chapter++) {
        if (_pauseRequested) break;
        if (already.contains(chapter)) {
          onProgress?.call(chapter / chaptersCount);
          continue;
        }
        if (await _fetchAndStoreChapter(
          db: db,
          translationId: translationId,
          bookNumber: bookNumber,
          slug: slug,
          chapter: chapter,
        )) {
          saved++;
          already.add(chapter);
        }
        onProgress?.call(chapter / chaptersCount);
        await Future.delayed(Duration(milliseconds: gap));
      }

      if (!_pauseRequested && saved < chaptersCount) {
        for (int chapter = 1; chapter <= chaptersCount; chapter++) {
          if (_pauseRequested) break;
          if (already.contains(chapter)) continue;
          await Future.delayed(const Duration(milliseconds: 220));
          if (await _fetchAndStoreChapter(
            db: db,
            translationId: translationId,
            bookNumber: bookNumber,
            slug: slug,
            chapter: chapter,
          )) {
            saved++;
            already.add(chapter);
          }
          onProgress?.call(chapter / chaptersCount);
        }
      }

      await _updateTranslationMeta(translationId);
      return saved;
    } finally {
      _batchDepth--;
      if (_batchDepth <= 0) {
        _batchDepth = 0;
        _isDownloading = false;
        _activeDownloadBook = null;
      } else {
        _activeDownloadBook = null;
      }
    }
  }

  Future<int> downloadChapter(
    String translationId,
    int bookNumber,
    int chapter,
  ) async {
    final db = await DatabaseHelper.instance.database;
    final slug = BibleBooks.midvashSlug(bookNumber);
    if (slug == null) return 0;
    final ok = await _fetchAndStoreChapter(
      db: db,
      translationId: translationId,
      bookNumber: bookNumber,
      slug: slug,
      chapter: chapter,
    );
    if (ok) await _updateTranslationMeta(translationId);
    return ok ? 1 : 0;
  }

  Future<void> downloadTestament(
    String translationId,
    bool isOldTestament, {
    Function(double progress, String currentBook)? onProgress,
  }) async {
    await downloadFull(
      translationId,
      isOldTestament ? BibleDownloadMode.oldTestament : BibleDownloadMode.newTestament,
      onProgress: onProgress,
    );
  }

  Future<void> downloadAll(
    String translationId, {
    Function(double progress, String currentBook)? onProgress,
  }) async {
    await downloadFull(translationId, BibleDownloadMode.all, onProgress: onProgress);
  }

  void pauseDownload() {
    _pauseRequested = true;
  }

  Future<void> resumeDownload({
    Function(double progress, String currentBook)? onProgress,
  }) async {
    await loadPersistedJob();
    final job = _job;
    if (job == null) return;
    await downloadFull(job.translationId, job.mode, onProgress: onProgress);
  }

  Future<void> retryDownload({
    Function(double progress, String currentBook)? onProgress,
  }) async {
    await resumeDownload(onProgress: onProgress);
  }

  Future<BibleDownloadSnapshot?> loadPersistedJob() async {
    if (_jobLoaded && _job != null) return _job;
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_jobPrefKey);
      if (raw == null || raw.isEmpty) {
        _jobLoaded = true;
        return _job;
      }
      final decoded = jsonDecode(raw);
      if (decoded is Map) {
        _job = BibleDownloadSnapshot.fromJson(Map<String, dynamic>.from(decoded));
        if (_job?.status == 'done') {
          await _clearJobPref();
          _job = null;
        }
        jobNotifier.value = _job;
      }
    } catch (e) {
      debugPrint('loadPersistedJob: $e');
    }
    _jobLoaded = true;
    return _job;
  }

  Future<void> _persistJob(BibleDownloadSnapshot job) async {
    _job = job;
    jobNotifier.value = job;
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_jobPrefKey, jsonEncode(job.toJson()));
    } catch (e) {
      debugPrint('persistJob: $e');
    }
  }

  Future<void> _clearJobPref() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_jobPrefKey);
    } catch (_) {}
  }

  Future<void> clearFinishedJob() async {
    _job = null;
    jobNotifier.value = null;
    await _clearJobPref();
  }

  Future<int> _countDownloadedChapters(
    String translationId,
    List<Map<String, dynamic>> books,
  ) async {
    final status = await getBookDownloadStatus(translationId);
    var total = 0;
    for (final book in books) {
      final n = book['number'] as int;
      final max = book['chapters'] as int;
      final got = status[n] ?? 0;
      total += got > max ? max : got;
    }
    return total;
  }

  Future<void> downloadFull(
    String translationId,
    BibleDownloadMode mode, {
    Function(double progress, String currentBook)? onProgress,
  }) async {
    if (_isDownloading && _batchDepth > 0) return;
    await loadPersistedJob();
    if (_job != null && _job!.isActive && _job!.translationId != translationId) {
      return;
    }

    final books = _booksForMode(mode);
    final chaptersTotal = totalChaptersFor(mode);
    final estimated = estimatedBytesFor(translationId);

    _pauseRequested = false;
    _batchDepth++;
    _isDownloading = true;

    try {
      var chaptersDone = await _countDownloadedChapters(translationId, books);
      var booksDone = 0;
      for (final book in books) {
        final n = book['number'] as int;
        if (await isBookDownloaded(translationId, n)) booksDone++;
      }

      var snapshot = BibleDownloadSnapshot(
        translationId: translationId,
        mode: mode,
        status: 'running',
        currentBook: books.isNotEmpty ? books.first['name'] as String : '',
        booksDone: booksDone,
        booksTotal: books.length,
        chaptersDone: chaptersDone,
        chaptersTotal: chaptersTotal,
        estimatedBytes: estimated,
      );
      await _persistJob(snapshot);
      onProgress?.call(snapshot.progress, snapshot.currentBook);

      for (final book in books) {
        if (_pauseRequested) {
          await _persistJob(snapshot.copyWith(status: 'paused'));
          return;
        }

        final bookNumber = book['number'] as int;
        final bookName = book['name'] as String;
        final bookChapters = book['chapters'] as int;

        if (await isBookDownloaded(translationId, bookNumber)) {
          continue;
        }

        final alreadyInBook = await getBookChapterCount(translationId, bookNumber);
        final baseChapters = chaptersDone - alreadyInBook;

        snapshot = snapshot.copyWith(status: 'running', currentBook: bookName, clearError: true);
        await _persistJob(snapshot);
        onProgress?.call(snapshot.progress, bookName);

        final saved = await downloadBook(
          translationId,
          bookNumber,
          onProgress: (p) {
            final inBook = (p * bookChapters).round();
            final live = (baseChapters + inBook).clamp(0, chaptersTotal).toInt();
            final next = snapshot.copyWith(
              currentBook: bookName,
              chaptersDone: live,
            );
            _job = next;
            jobNotifier.value = next;
            onProgress?.call(next.progress, bookName);
          },
        );

        chaptersDone = await _countDownloadedChapters(translationId, books);
        booksDone = 0;
        final statusMap = await getBookDownloadStatus(translationId);
        for (final b in books) {
          final n = b['number'] as int;
          if ((statusMap[n] ?? 0) >= (b['chapters'] as int)) booksDone++;
        }

        snapshot = snapshot.copyWith(
          currentBook: bookName,
          booksDone: booksDone,
          chaptersDone: chaptersDone,
        );
        await _persistJob(snapshot);
        onProgress?.call(snapshot.progress, bookName);

        if (_pauseRequested) {
          await _persistJob(snapshot.copyWith(status: 'paused'));
          return;
        }

        if (saved < bookChapters && !(await isBookDownloaded(translationId, bookNumber))) {
          await _persistJob(snapshot.copyWith(
            status: 'error',
            error:
                'Falha em $bookName ($saved/$bookChapters). Toque em Tentar de novo. '
                'NVI, ARC e ARA vêm do site; as demais usam a rede como fallback.',
          ));
          return;
        }

        await Future.delayed(const Duration(milliseconds: 180));
      }

      chaptersDone = await _countDownloadedChapters(translationId, books);
      await _persistJob(snapshot.copyWith(
        status: 'done',
        booksDone: books.length,
        chaptersDone: chaptersDone,
        currentBook: '',
        clearError: true,
      ));
      onProgress?.call(1, '');
    } catch (e) {
      debugPrint('downloadFull: $e');
      final prev = _job;
      await _persistJob(
        (prev ??
                BibleDownloadSnapshot(
                  translationId: translationId,
                  mode: mode,
                  status: 'error',
                  estimatedBytes: estimated,
                  chaptersTotal: chaptersTotal,
                  booksTotal: books.length,
                ))
            .copyWith(
          status: 'error',
          error: 'Falha no download. Verifique a internet e toque em Tentar de novo.',
        ),
      );
    } finally {
      _batchDepth--;
      if (_batchDepth <= 0) {
        _batchDepth = 0;
        _isDownloading = false;
        _activeDownloadBook = null;
      }
    }
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

  String favoriteId({
    required String translationId,
    required int bookNumber,
    required int chapterNumber,
    required int verseNumber,
  }) =>
      '${translationId}_${bookNumber}_${chapterNumber}_$verseNumber';

  Future<void> removeFavorite(String id) async {
    final db = await DatabaseHelper.instance.database;
    await db.delete('favorites', where: 'id = ?', whereArgs: [id]);
  }

  Future<Set<int>> getFavoriteVerseNumbers({
    required String translationId,
    required int bookNumber,
    required int chapterNumber,
  }) async {
    final db = await DatabaseHelper.instance.database;
    final rows = await db.query(
      'favorites',
      columns: ['verse_number'],
      where: 'translation_id = ? AND book_number = ? AND chapter_number = ?',
      whereArgs: [translationId, bookNumber, chapterNumber],
    );
    return rows.map((r) => r['verse_number'] as int).toSet();
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

  Future<void> recordReading(
    int bookNumber,
    int chapterNumber, {
    String translationId = 'NVI',
    int verseNumber = 0,
  }) async {
    final db = await DatabaseHelper.instance.database;
    await db.insert('reading_progress', {
      'book_number': bookNumber,
      'chapter_number': chapterNumber,
      'verse_number': verseNumber,
      'translation_id': translationId,
      'read_at': DateTime.now().toIso8601String(),
    });
  }

  Future<void> updateLastVerse(int verseNumber) async {
    final db = await DatabaseHelper.instance.database;
    final last = await db.query('reading_progress', orderBy: 'id DESC', limit: 1);
    if (last.isEmpty) return;
    await db.update(
      'reading_progress',
      {
        'verse_number': verseNumber,
        'read_at': DateTime.now().toIso8601String(),
      },
      where: 'id = ?',
      whereArgs: [last.first['id']],
    );
  }

  Future<LastReading?> getLastReading() async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.query(
      'reading_progress',
      orderBy: 'id DESC',
      limit: 1,
    );
    if (result.isEmpty) return null;
    final row = result.first;
    return LastReading(
      bookNumber: row['book_number'] as int,
      chapterNumber: row['chapter_number'] as int,
      verseNumber: (row['verse_number'] as int?) ?? 0,
      translationId: (row['translation_id'] as String?)?.trim().isNotEmpty == true
          ? row['translation_id'] as String
          : 'NVI',
    );
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

  Future<List<OfflineVerse>> getChapterVerses(
    String translationId,
    int bookNumber,
    int chapterNumber,
  ) async {
    final raw = await getCachedChapter(translationId, bookNumber, chapterNumber);
    if (raw == null || raw.isEmpty) return [];
    return parseChapterJson(raw);
  }

  Future<bool> hasAnyCachedChapters() async {
    return (await getTotalCachedChapters()) > 0;
  }

  Future<Set<int>> getDownloadedChapterNumbers(String translationId, int bookNumber) async {
    final db = await DatabaseHelper.instance.database;
    final result = await db.query(
      'chapters',
      columns: ['chapter_number'],
      where: 'translation_id = ? AND book_number = ?',
      whereArgs: [translationId, bookNumber],
    );
    return result.map((r) => r['chapter_number'] as int).toSet();
  }

  static List<OfflineVerse> parseChapterJson(String raw) {
    try {
      final decoded = jsonDecode(raw);
      final list = _extractVerseList(decoded);
      final verses = <OfflineVerse>[];
      for (var i = 0; i < list.length; i++) {
        final item = list[i];
        if (item is String) {
          verses.add(OfflineVerse(number: i + 1, text: item));
          continue;
        }
        if (item is Map) {
          final n = item['number'] ?? item['numero'] ?? item['verse'] ?? item['n'] ?? (i + 1);
          final t = item['text'] ?? item['texto'] ?? item['content'] ?? '';
          verses.add(OfflineVerse(
            number: n is int ? n : int.tryParse('$n') ?? i + 1,
            text: '$t'.trim(),
          ));
        }
      }
      return verses.where((v) => v.text.isNotEmpty).toList();
    } catch (e) {
      debugPrint('parseChapterJson: $e');
      return [];
    }
  }

  static List<dynamic> _extractVerseList(dynamic decoded) {
    if (decoded is List) return decoded;
    if (decoded is! Map) return [];
    final map = Map<String, dynamic>.from(decoded);
    for (final key in ['verses', 'versiculos', 'data', 'chapter']) {
      final v = map[key];
      if (v is List) return v;
      if (v is Map) {
        final nested = _extractVerseList(v);
        if (nested.isNotEmpty) return nested;
      }
    }
    if (map['texto'] is List) return map['texto'] as List;
    if (map['data'] is Map) {
      final nested = Map<String, dynamic>.from(map['data'] as Map);
      if (nested['verses'] is List) return nested['verses'] as List;
    }
    return [];
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
