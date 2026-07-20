class AppConstants {
  AppConstants._();

  // URLs
  static const String baseUrl = 'https://solascripturabr.com.br';
  static const String apiBaseUrl = 'https://api.solascripturabr.com.br';

  // Allowed domains for navigation
  static const List<String> allowedDomains = [
    'solascripturabr.com.br',
    'api.solascripturabr.com.br',
    'accounts.google.com',
    'google.com',
    'github.com',
    'midvash.com',
  ];

  // Timing
  static const Duration splashDuration = Duration(seconds: 2);
  static const Duration splashAnimationDuration = Duration(milliseconds: 1200);
  static const Duration backPressExitDelay = Duration(seconds: 2);
  static const Duration connectivityCheckInterval = Duration(seconds: 5);

  // WebView
  static const String userAgent =
      'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 SolaScriptura/1.0';

  // Cache
  static const int maxCacheSize = 50 * 1024 * 1024; // 50MB
}
