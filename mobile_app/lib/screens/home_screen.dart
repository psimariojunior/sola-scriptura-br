import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../config/constants.dart';
import '../config/theme.dart';
import '../services/webview_service.dart';
import '../services/connectivity_service.dart';
import '../services/share_service.dart';
import '../widgets/offline_banner.dart';
import '../widgets/error_screen.dart';
import '../widgets/loading_indicator.dart';
import '../bridges/js_bridge.dart';

class HomeScreen extends StatefulWidget {
  final WebViewService webViewService;
  final String? initialPath;

  const HomeScreen({super.key, required this.webViewService, this.initialPath});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final WebViewService _webView;
  late final ConnectivityService _connectivity;
  late final ShareService _share;

  bool _isLoading = true;
  bool _isOffline = false;
  bool _hasError = false;
  String? _errorMessage;
  DateTime? _lastBackPress;
  String? _pendingDeepLink;

  @override
  void initState() {
    super.initState();
    _webView = widget.webViewService;
    _connectivity = ConnectivityService();
    _share = ShareService();
    _pendingDeepLink = widget.initialPath;

    _setupServices();
    _loadWebsite();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _handleIncomingIntent();
  }

  void _handleIncomingIntent() {
    final uri = ModalRoute.of(context)?.settings.arguments as Uri?;
    if (uri != null) {
      final path = uri.path;
      if (path.isNotEmpty && path != '/') {
        final targetUrl = '${AppConstants.baseUrl}$path';
        _webView.loadUrl(targetUrl);
        return;
      }
      // Handle custom scheme: sola-scriptura://some/path
      if (uri.scheme == 'sola-scriptura' && uri.host.isNotEmpty) {
        final targetUrl = '${AppConstants.baseUrl}/${uri.host}${uri.path}';
        _webView.loadUrl(targetUrl);
      }
    }
  }

  String _resolveInitialUrl() {
    if (_pendingDeepLink != null) {
      final path = _pendingDeepLink!;
      _pendingDeepLink = null;
      if (path.startsWith('/')) {
        return '${AppConstants.baseUrl}$path';
      }
      return '${AppConstants.baseUrl}/$path';
    }
    return AppConstants.baseUrl;
  }

  void _setupServices() {
    _webView.onLoadingChanged = (loading) {
      if (mounted) setState(() => _isLoading = loading);
    };

    _webView.onError = (error) {
      if (mounted) {
        setState(() {
          _hasError = error != null;
          _errorMessage = error;
        });
      }
    };

    _webView.onPageLoaded = (url) {
      if (mounted) {
        setState(() {
          _hasError = false;
          _errorMessage = null;
        });
        JsBridge.injectPerformanceOptimizations(_webView.controller);
        JsBridge.injectOfflineSupport(_webView.controller);
      }
    };

    _connectivity.initialize();
    _connectivity.statusStream.listen((status) {
      if (!mounted) return;
      final wasOffline = _isOffline;
      setState(() {
        _isOffline = status == ConnectivityStatus.offline;
      });
      _webView.setOnlineStatus(!_isOffline);
      if (wasOffline && !_isOffline) {
        _webView.reload();
      }
    });

    setState(() {
      _isOffline = _connectivity.isOffline;
    });
  }

  Future<void> _loadWebsite() async {
    final url = _resolveInitialUrl();
    await _webView.loadUrl(url);
  }

  Future<void> _handleRetry() async {
    setState(() {
      _hasError = false;
      _errorMessage = null;
      _isLoading = true;
    });
    await _webView.reload();
  }

  Future<bool> _handleBackButton() async {
    if (await _webView.canGoBack()) {
      await _webView.goBack();
      return false;
    }

    final now = DateTime.now();
    if (_lastBackPress == null ||
        now.difference(_lastBackPress!) > AppConstants.backPressExitDelay) {
      _lastBackPress = now;

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text(
              'Pressione novamente para sair',
              style: TextStyle(color: Colors.white, fontSize: 13),
            ),
            backgroundColor: AppTheme.surfaceLight,
            duration: AppConstants.backPressExitDelay,
            behavior: SnackBarBehavior.floating,
            margin: const EdgeInsets.all(16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        );
      }
      return false;
    }

    SystemNavigator.pop();
    return true;
  }

  @override
  void dispose() {
    _connectivity.dispose();
    _webView.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        await _handleBackButton();
      },
      child: Scaffold(
        body: SafeArea(
          top: false,
          child: Column(
            children: [
              if (_isOffline) OfflineBanner(onRetry: _handleRetry),
              Expanded(
                child: _hasError
                    ? ErrorScreen(
                        title: _isOffline
                            ? 'Sem conexão'
                            : 'Não foi possível carregar',
                        message:
                            _errorMessage ??
                            'Verifique sua conexão com a internet e tente novamente.',
                        onRetry: _handleRetry,
                      )
                    : Stack(
                        children: [
                          if (_webView.isInitialized)
                            WebViewWidget(controller: _webView.controller),
                          if (_isLoading)
                            const LoadingOverlay(
                              isLoading: true,
                              child: SizedBox.expand(),
                            ),
                        ],
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
