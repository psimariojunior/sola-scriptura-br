import 'package:flutter/foundation.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../config/constants.dart';
import '../bridges/js_bridge.dart';

class WebViewService {
  late final WebViewController controller;
  bool _isInitialized = false;
  bool _isLoading = true;
  String? _currentUrl;
  String? _errorDescription;

  bool get isInitialized => _isInitialized;
  bool get isLoading => _isLoading;
  String? get currentUrl => _currentUrl;
  String? get errorDescription => _errorDescription;

  void Function(bool isLoading)? onLoadingChanged;
  void Function(String? error)? onError;
  void Function(String url)? onPageLoaded;

  Future<void> initialize() async {
    if (_isInitialized) return;

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setUserAgent(AppConstants.userAgent)
      ..setNavigationDelegate(_createNavigationDelegate())
      ..setOnConsoleMessage(_onConsoleMessage);

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
        final uri = Uri.parse(request.url);
        final allowed = AppConstants.allowedDomains.any(
          (domain) => uri.host == domain || uri.host.endsWith('.$domain'),
        );
        return allowed ? NavigationDecision.navigate : NavigationDecision.prevent;
      },
    );
  }

  void _onConsoleMessage(JavaScriptConsoleMessage message) {
    debugPrint('WebView Console [${message.level.name}]: ${message.message}');
  }

  Future<void> loadUrl(String url) async {
    if (!_isInitialized) return;
    _errorDescription = null;
    await controller.loadRequest(Uri.parse(url));
  }

  Future<void> reload() async {
    if (!_isInitialized) return;
    _errorDescription = null;
    await controller.reload();
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
