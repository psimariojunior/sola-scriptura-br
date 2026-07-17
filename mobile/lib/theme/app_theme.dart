import 'package:flutter/material.dart';

class AppTheme {
  static const String light = 'light';
  static const String dark = 'dark';
  static const String sepia = 'sepia';
  static const String noturno = 'noturno';

  static ThemeData themeData(String tema) {
    switch (tema) {
      case dark:
        return _base(
          brightness: Brightness.dark,
          seed: Colors.blueGrey,
          background: const Color(0xFF121212),
          surface: const Color(0xFF1E1E1E),
        );
      case sepia:
        return _base(
          brightness: Brightness.light,
          seed: Colors.brown,
          background: const Color(0xFFF4ECD8),
          surface: const Color(0xFFEBE0C8),
        );
      case noturno:
        return _base(
          brightness: Brightness.dark,
          seed: Colors.indigo,
          background: const Color(0xFF000000),
          surface: const Color(0xFF0A0A0A),
        );
      case light:
      default:
        return _base(
          brightness: Brightness.light,
          seed: Colors.teal,
          background: const Color(0xFFFAFAFA),
          surface: const Color(0xFFFFFFFF),
        );
    }
  }

  static ThemeData _base({
    required Brightness brightness,
    required Color seed,
    required Color background,
    required Color surface,
  }) {
    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: ColorScheme.fromSeed(
        seedColor: seed,
        brightness: brightness,
      ),
      scaffoldBackgroundColor: background,
      cardTheme: CardTheme(
        color: surface,
        elevation: 1,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: surface,
        foregroundColor:
            brightness == Brightness.dark ? Colors.white : Colors.black87,
        elevation: 0,
      ),
      textTheme: const TextTheme(
        bodyLarge: TextStyle(fontSize: 18, height: 1.6),
        bodyMedium: TextStyle(fontSize: 16, height: 1.5),
      ),
    );
  }
}
