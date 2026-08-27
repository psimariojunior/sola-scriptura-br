import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../config/theme.dart';
import '../config/constants.dart';
import '../services/webview_service.dart';
import '../services/connectivity_service.dart';
import '../widgets/offline_banner.dart';
import '../widgets/loading_indicator.dart';
import '../bridges/js_bridge.dart';

class AppShell extends StatefulWidget {
  final WebViewService webViewService;
  final String? initialPath;

  const AppShell({
    super.key,
    required this.webViewService,
    this.initialPath,
  });

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  bool _isOffline = false;
  bool _isLoading = true;
  bool _hasError = false;
  DateTime? _lastBackPress;

  late final ConnectivityService _connectivity;

  @override
  void initState() {
    super.initState();
    _connectivity = ConnectivityService();
    _isLoading = widget.webViewService.isLoading;
    _setupWebView();
    _setupConnectivity();
    _loadInitialUrl();
  }

  void _loadInitialUrl() {
    final path = widget.initialPath ?? '/';
    final url = '${AppConstants.baseUrl}$path';
    final current = widget.webViewService.currentUrl;
    if (current != null) {
      final currentUri = Uri.tryParse(current);
      final targetUri = Uri.tryParse(url);
      final currentPath = currentUri?.path ?? '';
      final targetPath = targetUri?.path.isEmpty == true ? '/' : (targetUri?.path ?? '/');
      if (currentPath == targetPath || current.startsWith(url.split('?').first)) {
        return;
      }
    }
    widget.webViewService.loadUrl(url).catchError((e) {
      debugPrint('[AppShell] LoadUrl error: $e');
    });
  }

  void _setupWebView() {
    widget.webViewService.onLoadingChanged = (loading) {
      if (mounted) setState(() => _isLoading = loading);
    };

    widget.webViewService.onPageLoaded = (url) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = false;
        });
        JsBridge.injectPerformanceOptimizations(widget.webViewService.controller);
        JsBridge.injectOfflineSupport(widget.webViewService.controller);
      }
    };

    widget.webViewService.onError = (error) {
      if (mounted && error != null) {
        setState(() {
          _hasError = true;
          _isLoading = false;
        });
      }
    };

    widget.webViewService.onDeepLink = (url) {
      if (!mounted) return;
      if (url.startsWith('ssb-share://')) {
        final encoded = url.replaceFirst('ssb-share://', '');
        final decoded = Uri.decodeComponent(encoded);
        Share.share(decoded);
      } else if (url.startsWith('ssb-share-image://')) {
        _handleShareImage(url);
      }
    };

    if (!widget.webViewService.isLoading && widget.webViewService.currentUrl != null) {
      _isLoading = false;
      JsBridge.injectPerformanceOptimizations(widget.webViewService.controller);
      JsBridge.injectOfflineSupport(widget.webViewService.controller);
    }
  }

  void _handleShareImage(String url) {
    try {
      final withoutScheme = url.replaceFirst('ssb-share-image://', '');
      final parts = withoutScheme.split('?name=');
      final dataUrl = Uri.decodeComponent(parts[0]);
      final base64Data = dataUrl.split(',').last;
      final bytes = base64Decode(base64Data);

      final tempDir = Directory.systemTemp;
      final file = File('${tempDir.path}/versiculo.png');
      file.writeAsBytesSync(bytes);

      Share.shareXFiles(
        [XFile(file.path)],
        text: 'Sola Scriptura\nhttps://solascripturabr.com.br',
      );
    } catch (e) {
      debugPrint('Share image error: $e');
    }
  }

  void _setupConnectivity() {
    _connectivity.initialize();
    _connectivity.statusStream.listen((status) {
      if (!mounted) return;
      final wasOffline = _isOffline;
      setState(() {
        _isOffline = status == ConnectivityStatus.offline;
      });
      widget.webViewService.setOnlineStatus(!_isOffline);
      if (wasOffline && !_isOffline) {
        widget.webViewService.reload();
      }
    });

    setState(() {
      _isOffline = _connectivity.isOffline;
    });
  }

  Future<bool> _handleBackButton() async {
    try {
      if (await widget.webViewService.canGoBack()) {
        await widget.webViewService.goBack();
        return false;
      }
    } catch (e) {
      debugPrint('[AppShell] Back button error: $e');
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
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      }
      return false;
    }

    SystemNavigator.pop();
    return true;
  }

  void _retry() {
    setState(() {
      _hasError = false;
      _isLoading = true;
    });
    widget.webViewService.reload();
  }

  @override
  void dispose() {
    _connectivity.dispose();
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
        backgroundColor: AppTheme.bgDark,
        body: Stack(
          children: [
            if (widget.webViewService.isInitialized && !_hasError)
              WebViewWidget(controller: widget.webViewService.controller),
            if (_isOffline)
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: OfflineBanner(onRetry: () => widget.webViewService.reload()),
              ),
            if (_isLoading && !_hasError)
              const LoadingOverlay(
                isLoading: true,
                child: SizedBox.expand(),
              ),
            if (_hasError)
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(32),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.cloud_off_rounded, color: AppTheme.textMuted, size: 64),
                      const SizedBox(height: 16),
                      const Text(
                        'Falha ao carregar',
                        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Verifique sua conexão com a internet',
                        style: TextStyle(color: AppTheme.textMuted, fontSize: 14),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 24),
                      ElevatedButton.icon(
                        onPressed: _retry,
                        icon: const Icon(Icons.refresh, size: 18),
                        label: const Text('Tentar novamente'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.goldPrimary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
