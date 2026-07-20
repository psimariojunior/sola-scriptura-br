import 'package:flutter/material.dart';
import '../config/constants.dart';
import '../config/theme.dart';
import '../services/webview_service.dart';
import 'home_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fadeAnimation;
  late final Animation<double> _scaleAnimation;
  late final Animation<double> _subtitleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppConstants.splashAnimationDuration,
    );

    _fadeAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0, 0.5, curve: Curves.easeOut)),
    );
    _scaleAnimation = Tween<double>(begin: 0.8, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.2, 0.7, curve: Curves.easeOutBack)),
    );
    _subtitleAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.5, 1, curve: Curves.easeOut)),
    );

    _controller.forward();
    _navigateToHome();
  }

  Future<void> _navigateToHome() async {
    // Pre-initialize WebView during splash
    final webViewService = WebViewService();
    await webViewService.initialize();

    await Future.delayed(AppConstants.splashDuration);

    if (!mounted) return;

    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) => HomeScreen(
          webViewService: webViewService,
        ),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
        transitionDuration: const Duration(milliseconds: 400),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
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
            colors: [
              AppTheme.bgDark,
              AppTheme.bgMedium,
              AppTheme.bgLight,
            ],
          ),
        ),
        child: Center(
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Book icon
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: ScaleTransition(
                      scale: _scaleAnimation,
                      child: Container(
                        width: 100,
                        height: 100,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            colors: [
                              AppTheme.goldLight.withOpacity(0.3),
                              AppTheme.gold.withOpacity(0.1),
                            ],
                          ),
                          border: Border.all(
                            color: AppTheme.gold.withOpacity(0.3),
                            width: 1,
                          ),
                        ),
                        child: const Icon(
                          Icons.auto_stories_rounded,
                          size: 48,
                          color: AppTheme.goldLight,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),

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
                              fontSize: 36,
                              fontWeight: FontWeight.w300,
                              color: AppTheme.textPrimary,
                              letterSpacing: 2,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'B R',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: AppTheme.gold,
                              letterSpacing: 8,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Subtitle
                  FadeTransition(
                    opacity: _subtitleAnimation,
                    child: const Text(
                      'Estudo Bíblico Acadêmico',
                      style: TextStyle(
                        fontSize: 14,
                        color: AppTheme.textSecondary,
                        letterSpacing: 2,
                      ),
                    ),
                  ),
                  const SizedBox(height: 48),

                  // Loading
                  FadeTransition(
                    opacity: _subtitleAnimation,
                    child: const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(AppTheme.gold),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
