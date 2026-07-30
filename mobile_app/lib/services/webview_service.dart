import 'package:flutter/foundation.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../config/constants.dart';
import '../bridges/js_bridge.dart';
import 'notification_service.dart';

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
      ..clearCache()
      ..clearLocalStorage();

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

        // Clear old SW caches if version changed
        try {
          await controller.runJavaScript('''
            (async () => {
              if ('caches' in window) {
                const keys = await caches.keys();
                const stale = keys.filter(k => k.includes('ssb-') && !k.includes('v9'));
                for (const k of stale) { await caches.delete(k); }
              }
              if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                for (const reg of regs) { await reg.unregister(); }
              }
            })();
          ''');
        } catch (e) {
          debugPrint('SW cache clear error: $e');
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

  void setOnlineStatus(bool isOnline) {
    _isOnline = isOnline;
  }

  Future<void> loadUrl(String url) async {
    if (!_isInitialized) return;
    _errorDescription = null;
    if (!_isOnline) {
      // When offline, load from cache if available
      await controller.loadRequest(
        Uri.parse(url),
        headers: {'Cache-Control': 'max-stale=31536000'},
      );
    } else {
      // Force revalidation to pick up new SW/cache version
      await controller.loadRequest(
        Uri.parse(url),
        headers: {'Cache-Control': 'no-cache, no-store, must-revalidate'},
      );
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
