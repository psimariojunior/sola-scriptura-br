import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../config/constants.dart';
import '../bridges/js_bridge.dart';
import 'notification_service.dart';
import 'bible_offline_service.dart';

class WebViewService {
  late final WebViewController controller;
  bool _isInitialized = false;
  bool _isLoading = true;
  String? _currentUrl;
  String? _errorDescription;
  bool _isOnline = true;

  bool get isInitialized => _isInitialized;
  bool get isLoading => _isLoading;
  String? get currentUrl => _currentUrl;
  String? get errorDescription => _errorDescription;

  void Function(bool isLoading)? onLoadingChanged;
  void Function(String? error)? onError;
  void Function(String url)? onPageLoaded;
  void Function(String url)? onDeepLink;

  Future<void> initialize() async {
    if (_isInitialized) return;

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setUserAgent(AppConstants.userAgent)
      ..setNavigationDelegate(_createNavigationDelegate())
      ..setOnConsoleMessage(_onConsoleMessage)
      ..addJavaScriptChannel('SSBNotification', onMessageReceived: _onNotificationMessage)
      ..addJavaScriptChannel('SSBStreak', onMessageReceived: _onStreakMessage)
      ..addJavaScriptChannel('SSBOffline', onMessageReceived: _onOfflineMessage)
      ..addJavaScriptChannel('SSBFavorite', onMessageReceived: _onFavoriteMessage)
      ..addJavaScriptChannel('SSBNote', onMessageReceived: _onNoteMessage);

    _isInitialized = true;
  }

  NavigationDelegate _createNavigationDelegate() {
    return NavigationDelegate(
      onPageStarted: (url) {
        _isLoading = true;
        _currentUrl = url;
        _errorDescription = null;
        onLoadingChanged?.call(true);
        onError?.call(null);
      },
      onPageFinished: (url) async {
        _isLoading = false;
        _currentUrl = url;
        onLoadingChanged?.call(false);
        onPageLoaded?.call(url);

        // Inject JS bridge
        try {
          await JsBridge.injectBridge(controller);
        } catch (e) {
          debugPrint('JS bridge injection error: $e');
        }

        // Only update SW registration — never unregister (preserves offline cache)
        try {
          await controller.runJavaScript('''
            (async () => {
              if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                for (const reg of regs) {
                  if (reg.installing) {
                    reg.installing.postMessage({ type: 'SKIP_WAITING' });
                  }
                }
              }
            })();
          ''');
        } catch (e) {
          debugPrint('SW update check error: $e');
        }
      },
      onWebResourceError: (error) {
        if (error.isForMainFrame ?? true) {
          _errorDescription = error.description;
          _isLoading = false;
          onLoadingChanged?.call(false);
          onError?.call(error.description);
        }
      },
      onNavigationRequest: (request) async {
        final url = request.url;

        // Handle deep links to external apps
        if (url.startsWith('whatsapp://') ||
            url.startsWith('tg://') ||
            url.startsWith('twitter://') ||
            url.startsWith('fb://') ||
            url.startsWith('instagram://') ||
            url.startsWith('mailto:') ||
            url.startsWith('tel:') ||
            url.startsWith('sms:')) {
          onDeepLink?.call(url);
          return NavigationDecision.prevent;
        }

        // Handle SSB custom schemes
        if (url.startsWith('ssb-share://') || url.startsWith('ssb-download://') || url.startsWith('ssb-share-image://')) {
          onDeepLink?.call(url);
          return NavigationDecision.prevent;
        }

        final uri = Uri.parse(url);
        final allowed = AppConstants.allowedDomains.any(
          (domain) => uri.host == domain || uri.host.endsWith('.$domain'),
        );
        return allowed
            ? NavigationDecision.navigate
            : NavigationDecision.prevent;
      },
    );
  }

  void _onConsoleMessage(JavaScriptConsoleMessage message) {
    debugPrint('WebView Console [${message.level.name}]: ${message.message}');
  }

  void _onNotificationMessage(JavaScriptMessage message) {
    try {
      final data = message.message.split('|');
      final action = data[0];
      final enabled = data[1] == 'true';
      final hour = int.tryParse(data[2]) ?? 8;
      final minute = int.tryParse(data[3]) ?? 0;

      debugPrint('[WebViewService] Notification: $action enabled=$enabled hour=$hour');

      final notifService = NotificationService();
      if (enabled) {
        notifService.scheduleDailyVerseReminder(hour: hour, minute: minute);
      } else {
        notifService.cancelDailyVerseReminder();
      }
    } catch (e) {
      debugPrint('[WebViewService] Notification message error: $e');
    }
  }

  void _onStreakMessage(JavaScriptMessage message) {
    try {
      final data = message.message.split('|');
      final action = data[0];

      debugPrint('[WebViewService] Streak: $action');

      if (action == 'record') {
        BibleOfflineService.instance.recordStreakDay();
      } else if (action == 'getStats') {
        _getStreakStatsAndReply();
      }
    } catch (e) {
      debugPrint('[WebViewService] Streak message error: $e');
    }
  }

  Future<void> _getStreakStatsAndReply() async {
    try {
      final streak = await BibleOfflineService.instance.getCurrentStreak();
      final stats = {
        'currentStreak': streak,
        'bestStreak': 0,
        'totalDays': 0,
      };
      await controller.runJavaScript(
        'window.__SSB_STREAK_RESOLVE && window.__SSB_STREAK_RESOLVE(${stats.toString()})',
      );
    } catch (e) {
      debugPrint('[WebViewService] Get streak stats error: $e');
    }
  }

  void _onOfflineMessage(JavaScriptMessage message) {
    try {
      final data = message.message.split('|');
      final action = data[0];

      debugPrint('[WebViewService] Offline: $action');

      if (action == 'cache' && data.length >= 5) {
        final translation = data[1];
        final book = int.tryParse(data[2]) ?? 1;
        final chapter = int.tryParse(data[3]) ?? 1;
        final chapterData = data[4];
        BibleOfflineService.instance.cacheChapter(translation, book, chapter, chapterData);
      } else if (action == 'get' && data.length >= 4) {
        final translation = data[1];
        final book = int.tryParse(data[2]) ?? 1;
        final chapter = int.tryParse(data[3]) ?? 1;
        _getCachedChapterAndReply(translation, book, chapter);
      } else if (action == 'sync') {
        _syncOfflineData();
      }
    } catch (e) {
      debugPrint('[WebViewService] Offline message error: $e');
    }
  }

  Future<void> _getCachedChapterAndReply(String translation, int book, int chapter) async {
    try {
      final data = await BibleOfflineService.instance.getCachedChapter(translation, book, chapter);
      await controller.runJavaScript(
        'window.__SSB_OFFLINE_RESOLVE && window.__SSB_OFFLINE_RESOLVE(${data ?? 'null'})',
      );
    } catch (e) {
      debugPrint('[WebViewService] Get cached chapter error: $e');
    }
  }

  Future<void> _syncOfflineData() async {
    try {
      final favorites = await BibleOfflineService.instance.getUnsyncedFavorites();
      final notes = await BibleOfflineService.instance.getUnsyncedNotes();

      debugPrint('[WebViewService] Syncing ${favorites.length} favorites, ${notes.length} notes');

      for (final fav in favorites) {
        await BibleOfflineService.instance.markFavoriteSynced(fav['id']);
      }
      for (final note in notes) {
        await BibleOfflineService.instance.markNoteSynced(note['id']);
      }
    } catch (e) {
      debugPrint('[WebViewService] Sync offline data error: $e');
    }
  }

  void _onFavoriteMessage(JavaScriptMessage message) {
    try {
      final data = message.message.split('|');
      final action = data[0];

      debugPrint('[WebViewService] Favorite: $action');

      if (action == 'save' && data.length >= 8) {
        final book = int.tryParse(data[1]) ?? 1;
        final chapter = int.tryParse(data[2]) ?? 1;
        final verse = int.tryParse(data[3]) ?? 1;
        final translation = data[4];
        final text = data[5];
        final reference = data[6];
        final color = data[7];

        BibleOfflineService.instance.saveFavorite(
          bookNumber: book,
          chapterNumber: chapter,
          verseNumber: verse,
          translationId: translation,
          text: text,
          reference: reference,
          color: color,
        );
      } else if (action == 'getAll') {
        _getFavoritesAndReply();
      } else if (action == 'remove' && data.length >= 2) {
        BibleOfflineService.instance.removeFavorite(data[1]);
      }
    } catch (e) {
      debugPrint('[WebViewService] Favorite message error: $e');
    }
  }

  Future<void> _getFavoritesAndReply() async {
    try {
      final favorites = await BibleOfflineService.instance.getFavorites();
      final favoritesJson = favorites.map((f) => {
        'id': f['id'],
        'book': f['book_number'],
        'chapter': f['chapter_number'],
        'verse': f['verse_number'],
        'translation': f['translation_id'],
        'text': f['text'],
        'reference': f['reference'],
        'color': f['color'],
      }).toList();
      await controller.runJavaScript(
        'window.__SSB_FAVORITES_RESOLVE && window.__SSB_FAVORITES_RESOLVE(${favoritesJson.toString()})',
      );
    } catch (e) {
      debugPrint('[WebViewService] Get favorites error: $e');
    }
  }

  void _onNoteMessage(JavaScriptMessage message) {
    try {
      final data = message.message.split('|');
      final action = data[0];

      debugPrint('[WebViewService] Note: $action');

      if (action == 'save' && data.length >= 8) {
        final book = int.tryParse(data[1]) ?? 1;
        final chapter = int.tryParse(data[2]) ?? 1;
        final verse = data[3].isNotEmpty ? int.tryParse(data[3]) : null;
        final translation = data[4].isNotEmpty ? data[4] : null;
        final title = data[5].isNotEmpty ? data[5] : null;
        final content = data[6];
        final tags = data[7].isNotEmpty ? data[7].split(',') : null;

        BibleOfflineService.instance.saveNote(
          bookNumber: book,
          chapterNumber: chapter,
          verseNumber: verse,
          translationId: translation,
          title: title,
          content: content,
          tags: tags,
        );
      } else if (action == 'getAll') {
        final book = data.length >= 2 && data[1].isNotEmpty ? int.tryParse(data[1]) : null;
        final chapter = data.length >= 3 && data[2].isNotEmpty ? int.tryParse(data[2]) : null;
        _getNotesAndReply(book, chapter);
      } else if (action == 'remove' && data.length >= 2) {
        BibleOfflineService.instance.deleteNote(data[1]);
      }
    } catch (e) {
      debugPrint('[WebViewService] Note message error: $e');
    }
  }

  Future<void> _getNotesAndReply(int? book, int? chapter) async {
    try {
      final notes = await BibleOfflineService.instance.getNotes(
        bookNumber: book,
        chapterNumber: chapter,
      );
      final notesJson = notes.map((n) => {
        'id': n['id'],
        'book': n['book_number'],
        'chapter': n['chapter_number'],
        'verse': n['verse_number'],
        'title': n['title'],
        'content': n['content'],
        'tags': n['tags'],
        'createdAt': n['created_at'],
        'updatedAt': n['updated_at'],
      }).toList();
      await controller.runJavaScript(
        'window.__SSB_NOTES_RESOLVE && window.__SSB_NOTES_RESOLVE(${notesJson.toString()})',
      );
    } catch (e) {
      debugPrint('[WebViewService] Get notes error: $e');
    }
  }

  void setOnlineStatus(bool isOnline) {
    _isOnline = isOnline;
  }

  Future<String?> _getOfflineData(String url) async {
    try {
      final uri = Uri.parse(url);
      final path = uri.path;

      // Check if it's a Bible chapter URL
      // Format: /biblia/ARC/1/1 (translation/book/chapter)
      final pathSegments = path.split('/').where((s) => s.isNotEmpty).toList();

      if (pathSegments.length >= 4 && pathSegments[0] == 'biblia') {
        final translation = pathSegments[1];
        final bookNumber = int.tryParse(pathSegments[2]);
        final chapterNumber = int.tryParse(pathSegments[3]);

        if (bookNumber != null && chapterNumber != null) {
          final cachedData = await BibleOfflineService.instance.getCachedChapter(
            translation,
            bookNumber,
            chapterNumber,
          );

          if (cachedData != null) {
            // Convert JSON to HTML for display
            return _chapterJsonToHtml(cachedData, translation, bookNumber, chapterNumber);
          }
        }
      }
    } catch (e) {
      debugPrint('[WebViewService] Offline data error: $e');
    }
    return null;
  }

  String _chapterJsonToHtml(String jsonData, String translation, int book, int chapter) {
    try {
      final data = Map<String, dynamic>.from(
        const JsonDecoder().convert(jsonData) as Map,
      );

      final bookName = data['bookName'] ?? data['book'] ?? 'Livro $book';
      final verses = data['verses'] ?? data['versiculos'] ?? [];

      final versesHtml = (verses as List).map((v) {
        final number = v['number'] ?? v['numero'] ?? '';
        final text = v['text'] ?? v['texto'] ?? '';
        return '<p><sup>$number</sup> $text</p>';
      }).join('\n');

      return '''
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$bookName $chapter - $translation</title>
  <style>
    body { font-family: serif; padding: 16px; color: #F5F1E8; background: #0A0908; }
    h1 { color: #A17A2C; font-size: 20px; }
    p { font-size: 16px; line-height: 1.6; }
    sup { color: #A17A2C; font-weight: bold; }
    .offline-badge { background: #A17A2C; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="offline-badge">📡 Offline</div>
  <h1>$bookName $chapter</h1>
  <div>$versesHtml</div>
</body>
</html>
''';
    } catch (e) {
      return '<html><body style="color:white;background:#0A0908;padding:16px;"><h2>Erro ao carregar offline</h2><p>$e</p></body></html>';
    }
  }

  Future<void> loadUrl(String url) async {
    if (!_isInitialized) return;
    _errorDescription = null;
    if (!_isOnline) {
      // When offline, try to load from SQLite first
      final offlineData = await _getOfflineData(url);
      if (offlineData != null) {
        await controller.loadHtmlString(offlineData, baseUrl: url);
      } else {
        // Fallback to cache
        await controller.loadRequest(
          Uri.parse(url),
          headers: {'Cache-Control': 'max-stale=31536000'},
        );
      }
    } else {
      // Use normal cache policy — let SW handle caching
      await controller.loadRequest(Uri.parse(url));
    }
  }

  Future<void> reload() async {
    if (!_isInitialized) return;
    _errorDescription = null;
    if (!_isOnline) {
      // Offline reload: try to load current URL from cache
      if (_currentUrl != null) {
        await controller.loadRequest(
          Uri.parse(_currentUrl!),
          headers: {'Cache-Control': 'max-stale=31536000'},
        );
      }
    } else {
      await controller.reload();
    }
  }

  Future<bool> canGoBack() async {
    if (!_isInitialized) return false;
    return controller.canGoBack();
  }

  Future<void> goBack() async {
    if (!_isInitialized) return;
    if (await canGoBack()) {
      await controller.goBack();
    }
  }

  void dispose() {
    _isInitialized = false;
  }
}
