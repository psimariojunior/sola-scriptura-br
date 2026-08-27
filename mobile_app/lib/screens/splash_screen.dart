import 'dart:math';
import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../config/constants.dart';
import '../data/versiculos_splash.dart';
import '../services/webview_service.dart';
import 'app_shell.dart';

class SplashScreen extends StatefulWidget {
  final String? initialPath;

  const SplashScreen({super.key, this.initialPath});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late final AnimationController _mainController;
  late final AnimationController _glowController;
  late final AnimationController _verseController;

  late final Animation<double> _fadeAnimation;
  late final Animation<double> _scaleAnimation;
  late final Animation<double> _subtitleAnimation;
  late final Animation<double> _verseFadeIn;
  late final Animation<double> _verseFadeOut;
  late final Animation<double> _glowAnimation;
  late final Animation<Offset> _verseSlideAnimation;

  late final Map<String, String> _selectedVerse;

  @override
  void initState() {
    super.initState();
    _selectedVerse = VersiculosSplash
        .versiculos[Random().nextInt(VersiculosSplash.versiculos.length)];

    // Main animation controller — curto, o site já carrega em paralelo
    _mainController = AnimationController(
      vsync: this,
      duration: AppConstants.splashDuration,
    );

    // Glow/pulse controller (loops)
    _glowController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );

    // Verse slide-up controller
    _verseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );

    // Logo fade in
    _fadeAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(
        parent: _mainController,
        curve: const Interval(0, 0.25, curve: Curves.easeOut),
      ),
    );

    // Logo scale with bounce
    _scaleAnimation = Tween<double>(begin: 0.5, end: 1).animate(
      CurvedAnimation(
        parent: _mainController,
        curve: const Interval(0.05, 0.4, curve: Curves.elasticOut),
      ),
    );

    // Glow pulse
    _glowAnimation = Tween<double>(begin: 0.3, end: 0.8).animate(
      CurvedAnimation(parent: _glowController, curve: Curves.easeInOut),
    );

    // Subtitle fade in
    _subtitleAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(
        parent: _mainController,
        curve: const Interval(0.25, 0.45, curve: Curves.easeOut),
      ),
    );

    // Verse fade in
    _verseFadeIn = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(
        parent: _mainController,
        curve: const Interval(0.4, 0.6, curve: Curves.easeOut),
      ),
    );

    // Verse slide up
    _verseSlideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
        parent: _mainController,
        curve: const Interval(0.4, 0.65, curve: Curves.easeOutCubic),
      ),
    );

    // Everything fade out
    _verseFadeOut = Tween<double>(begin: 1, end: 0).animate(
      CurvedAnimation(
        parent: _mainController,
        curve: const Interval(0.8, 1.0, curve: Curves.easeIn),
      ),
    );

    _mainController.forward();
    _glowController.repeat(reverse: true);
    _navigateToHome();
  }

  Future<void> _navigateToHome() async {
    final webViewService = WebViewService();
    final path = widget.initialPath ?? '/';
    final url = '${AppConstants.baseUrl}$path';

    final preload = () async {
      try {
        await webViewService.initialize();
        await webViewService.loadUrl(url);
      } catch (e) {
        debugPrint('[SplashScreen] WebView init/load error: $e');
      }
    }();

    await Future.wait([
      Future.delayed(AppConstants.splashDuration),
      preload.timeout(
        const Duration(seconds: 8),
        onTimeout: () {
          debugPrint('[SplashScreen] Preload timeout — abrindo mesmo assim');
        },
      ),
    ]);

    if (!mounted) return;

    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) => AppShell(
          webViewService: webViewService,
          initialPath: widget.initialPath,
        ),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
        transitionDuration: const Duration(milliseconds: 280),
      ),
    );
  }

  @override
  void dispose() {
    _mainController.dispose();
    _glowController.dispose();
    _verseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [AppTheme.bgDark, AppTheme.bgMedium, AppTheme.bgLight],
          ),
        ),
        child: Center(
          child: AnimatedBuilder(
            animation: _mainController,
            builder: (context, child) {
              return Opacity(
                opacity: _verseFadeOut.value,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Spacer(flex: 3),

                    // Decorative line above
                    FadeTransition(
                      opacity: _fadeAnimation,
                      child: Container(
                        width: 40 * _scaleAnimation.value,
                        height: 1,
                        color: AppTheme.goldPrimary,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Book icon with glow
                    FadeTransition(
                      opacity: _fadeAnimation,
                      child: ScaleTransition(
                        scale: _scaleAnimation,
                        child: AnimatedBuilder(
                          animation: _glowController,
                          builder: (context, child) {
                            return Container(
                              width: 110,
                              height: 110,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: RadialGradient(
                                  colors: [
                                    AppTheme.goldLight.withValues(alpha: _glowAnimation.value * 0.4),
                                    AppTheme.gold.withValues(alpha: _glowAnimation.value * 0.15),
                                    Colors.transparent,
                                  ],
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: AppTheme.goldPrimary.withValues(alpha: _glowAnimation.value * 0.3),
                                    blurRadius: 40,
                                    spreadRadius: 5,
                                  ),
                                ],
                              ),
                              child: Container(
                                margin: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  gradient: RadialGradient(
                                    colors: [
                                      AppTheme.bgMedium,
                                      AppTheme.bgDark,
                                    ],
                                  ),
                                  border: Border.all(
                                    color: AppTheme.goldPrimary.withValues(alpha: 0.4),
                                    width: 1.5,
                                  ),
                                ),
                                child: ClipOval(
                                  child: Image.asset(
                                    'assets/app_icon.png',
                                    width: 80,
                                    height: 80,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 28),

                    // App name
                    FadeTransition(
                      opacity: _fadeAnimation,
                      child: ScaleTransition(
                        scale: _scaleAnimation,
                        child: const Column(
                          children: [
                            Text(
                              'Sola Scriptura',
                              style: TextStyle(
                                fontFamily: 'serif',
                                fontSize: 38,
                                fontWeight: FontWeight.w300,
                                color: AppTheme.textPrimary,
                                letterSpacing: 3,
                              ),
                            ),
                            SizedBox(height: 6),
                            Text(
                              'B R',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                                color: AppTheme.gold,
                                letterSpacing: 10,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Subtitle
                    FadeTransition(
                      opacity: _subtitleAnimation,
                      child: const Text(
                        'Estudo Bíblico Acadêmico',
                        style: TextStyle(
                          fontSize: 13,
                          color: AppTheme.textSecondary,
                          letterSpacing: 3,
                        ),
                      ),
                    ),

                    const Spacer(flex: 2),

                    // Decorative line
                    FadeTransition(
                      opacity: _fadeAnimation,
                      child: Container(
                        width: 60,
                        height: 1,
                        color: AppTheme.goldPrimary.withValues(alpha: 0.5),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Random verse with slide
                    SlideTransition(
                      position: _verseSlideAnimation,
                      child: FadeTransition(
                        opacity: _verseFadeIn,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 40),
                          child: Column(
                            children: [
                              Text(
                                '"${_selectedVerse['texto']}"',
                                textAlign: TextAlign.center,
                                maxLines: 4,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontFamily: 'serif',
                                  fontSize: 15,
                                  fontStyle: FontStyle.italic,
                                  color: AppTheme.textSecondary,
                                  height: 1.6,
                                ),
                              ),
                              const SizedBox(height: 14),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppTheme.goldPrimary.withValues(alpha: 0.1),
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(
                                    color: AppTheme.goldPrimary.withValues(alpha: 0.3),
                                    width: 0.5,
                                  ),
                                ),
                                child: Text(
                                  _selectedVerse['referencia']!,
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.gold,
                                    letterSpacing: 1,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Loading indicator
                    FadeTransition(
                      opacity: _verseFadeIn,
                      child: const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(
                          strokeWidth: 1.5,
                          valueColor: AlwaysStoppedAnimation<Color>(
                            AppTheme.gold,
                          ),
                        ),
                      ),
                    ),
                    const Spacer(flex: 2),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
