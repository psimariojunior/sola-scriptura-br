import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class OfflineSyncService {
  static const _cachePrefix = 'ssb_offline_chapter_';
  static const _lastSyncKey = 'ssb_last_sync';
  static const _favoritesKey = 'ssb_offline_favorites';
  static const _notesKey = 'ssb_offline_notes';
  static const _settingsKey = 'ssb_offline_settings';
  static const _maxCachedChapters = 100;

  static Future<void> cacheChapter({
    required String translation,
    required int book,
    required int chapter,
    required Map<String, dynamic> data,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final key = '${_cachePrefix}${translation}_${book}_$chapter';
    final jsonStr = jsonEncode(data);
    await prefs.setString(key, jsonStr);
    await _cleanupOldCache();
  }

  static Future<Map<String, dynamic>?> getCachedChapter({
    required String translation,
    required int book,
    required int chapter,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final key = '${_cachePrefix}${translation}_${book}_$chapter';
    final jsonStr = prefs.getString(key);
    if (jsonStr == null) return null;
    return jsonDecode(jsonStr) as Map<String, dynamic>;
  }

  static Future<void> _cleanupOldCache() async {
    final prefs = await SharedPreferences.getInstance();
    final allKeys = prefs.getKeys();
    final chapterKeys = allKeys.where((k) => k.startsWith(_cachePrefix)).toList();

    if (chapterKeys.length > _maxCachedChapters) {
      final toRemove = chapterKeys.take(chapterKeys.length - _maxCachedChapters);
      for (final key in toRemove) {
        await prefs.remove(key);
      }
    }
  }

  static Future<void> cacheChapterFromAPI({
    required String translation,
    required int book,
    required int chapter,
  }) async {
    try {
      final url = Uri.parse(
        'https://api.solascripturabr.com.br/api/v1/biblia/traducoes/$translation/livros/$book/capitulos/$chapter',
      );
      final response = await http.get(url).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await cacheChapter(
          translation: translation,
          book: book,
          chapter: chapter,
          data: data,
        );
      }
    } catch (e) {
      debugPrint('Failed to cache chapter: $e');
    }
  }

  static Future<void> precacheChapters({
    required String translation,
    required int book,
    required int startChapter,
    required int endChapter,
  }) async {
    for (var i = startChapter; i <= endChapter; i++) {
      await cacheChapterFromAPI(
        translation: translation,
        book: book,
        chapter: i,
      );
      await Future.delayed(const Duration(milliseconds: 200));
    }
  }

  static Future<void> saveFavorite(Map<String, dynamic> verse) async {
    final prefs = await SharedPreferences.getInstance();
    final favorites = await getFavorites();
    final id = '${verse['book']}_${verse['chapter']}_${verse['verse']}';
    final exists = favorites.any((f) => '${f['book']}_${f['chapter']}_${f['verse']}' == id);

    if (!exists) {
      favorites.add({...verse, 'id': id, 'savedAt': DateTime.now().toIso8601String()});
      await prefs.setString(_favoritesKey, jsonEncode(favorites));
    }
  }

  static Future<List<Map<String, dynamic>>> getFavorites() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonStr = prefs.getString(_favoritesKey);
    if (jsonStr == null) return [];
    final list = jsonDecode(jsonStr) as List;
    return list.cast<Map<String, dynamic>>();
  }

  static Future<void> removeFavorite(String id) async {
    final prefs = await SharedPreferences.getInstance();
    final favorites = await getFavorites();
    favorites.removeWhere((f) => f['id'] == id);
    await prefs.setString(_favoritesKey, jsonEncode(favorites));
  }

  static Future<void> saveNote(Map<String, dynamic> note) async {
    final prefs = await SharedPreferences.getInstance();
    final notes = await getNotes();
    notes.add({...note, 'createdAt': DateTime.now().toIso8601String()});
    await prefs.setString(_notesKey, jsonEncode(notes));
  }

  static Future<List<Map<String, dynamic>>> getNotes() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonStr = prefs.getString(_notesKey);
    if (jsonStr == null) return [];
    final list = jsonDecode(jsonStr) as List;
    return list.cast<Map<String, dynamic>>();
  }

  static Future<void> saveSettings(Map<String, dynamic> settings) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_settingsKey, jsonEncode(settings));
  }

  static Future<Map<String, dynamic>> getSettings() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonStr = prefs.getString(_settingsKey);
    if (jsonStr == null) return {};
    return jsonDecode(jsonStr) as Map<String, dynamic>;
  }

  static Future<void> syncWithServer() async {
    try {
      final favorites = await getFavorites();
      final notes = await getNotes();

      await http.post(
        Uri.parse('https://api.solascripturabr.com.br/api/v1/sync'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'favorites': favorites,
          'notes': notes,
          'timestamp': DateTime.now().toIso8601String(),
        }),
      ).timeout(const Duration(seconds: 10));

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_lastSyncKey, DateTime.now().toIso8601String());
    } catch (e) {
      debugPrint('Sync failed: $e');
    }
  }

  static Future<DateTime?> getLastSyncTime() async {
    final prefs = await SharedPreferences.getInstance();
    final syncStr = prefs.getString(_lastSyncKey);
    if (syncStr == null) return null;
    return DateTime.parse(syncStr);
  }

  static Future<int> getCachedChapterCount() async {
    final prefs = await SharedPreferences.getInstance();
    final allKeys = prefs.getKeys();
    return allKeys.where((k) => k.startsWith(_cachePrefix)).length;
  }

  static Future<void> clearCache() async {
    final prefs = await SharedPreferences.getInstance();
    final allKeys = prefs.getKeys();
    final chapterKeys = allKeys.where((k) => k.startsWith(_cachePrefix));
    for (final key in chapterKeys) {
      await prefs.remove(key);
    }
  }
}
