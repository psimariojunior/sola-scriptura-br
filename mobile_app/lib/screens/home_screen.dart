import 'dart:async';
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

  const HomeScreen({super.key, required this.webViewService});

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

  @override
  void initState() {
    super.initState();
    _webView = widget.webViewService;
    _connectivity = ConnectivityService();
    _share = ShareService();

    _setupServices();
    _loadWebsite();
  }

  void _setupServices() {
    // WebView callbacks
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
        // Inject performance optimizations
        JsBridge.injectPerformanceOptimizations(_webView.controller);
      }
    };

    // Connectivity monitoring
    _connectivity.initialize();
    _connectivity.statusStream.listen((status) {
      if (!mounted) return;
      final wasOffline = _isOffline;
      setState(() {
        _isOffline = status == ConnectivityStatus.offline;
      });
      // Auto-reload when coming back online
      if (wasOffline && !_isOffline) {
        _webView.reload();
      }
    });

    // Initial connectivity check
    setState(() {
      _isOffline = _connectivity.isOffline;
    });
  }

  Future<void> _loadWebsite() async {
    if (_connectivity.isOffline) {
      setState(() {
        _hasError = true;
        _errorMessage = 'Sem conexão com a internet';
      });
      return;
    }
    await _webView.loadUrl(AppConstants.baseUrl);
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
    // Check if WebView can go back
    if (await _webView.canGoBack()) {
      await _webView.goBack();
      return false; // Don't exit
    }

    // Double-press to exit
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
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      }
      return false; // Don't exit yet
    }

    // Exit app
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
          top: false, // Full screen WebView
          child: Column(
            children: [
              // Offline banner
              if (_isOffline)
                OfflineBanner(onRetry: _handleRetry),

              // WebView or Error
              Expanded(
                child: _hasError
                    ? ErrorScreen(
                        title: _isOffline
                            ? 'Sem conexão'
                            : 'Não foi possível carregar',
                        message: _errorMessage ??
                            'Verifique sua conexão com a internet e tente novamente.',
                        onRetry: _handleRetry,
                      )
                    : Stack(
                        children: [
                          // WebView
                          if (_webView.isInitialized)
                            WebViewWidget(controller: _webView.controller),

                          // Loading overlay
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
