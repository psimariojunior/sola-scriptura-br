import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  // Brand colors
  static const Color gold = Color(0xFFA17A2C);
  static const Color goldLight = Color(0xFFD4A843);
  static const Color goldDark = Color(0xFF8B6914);
  static const Color goldSubtle = Color(0x1AA17A2C);
  static const Color goldPrimary = gold;

  // Background colors
  static const Color bgDark = Color(0xFF0A0908);
  static const Color bgMedium = Color(0xFF1A1814);
  static const Color bgLight = Color(0xFF3D2F10);
  static const Color surface = Color(0xFF1C1A17);
  static const Color surfaceLight = Color(0xFF2A2722);

  // Text colors
  static const Color textPrimary = Color(0xFFF5F1E8);
  static const Color textSecondary = Color(0xFFB8B0A0);
  static const Color textMuted = Color(0xFF78716C);

  // Error colors
  static const Color error = Color(0xFFB91C1C);
  static const Color errorLight = Color(0xFFEF4444);

  static ThemeData get darkTheme => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorSchemeSeed: gold,
        scaffoldBackgroundColor: bgDark,
        appBarTheme: const AppBarTheme(
          backgroundColor: bgDark,
          elevation: 0,
          centerTitle: true,
          titleTextStyle: TextStyle(
            fontFamily: 'serif',
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: textPrimary,
          ),
        ),
        textTheme: const TextTheme(
          headlineLarge: TextStyle(
            fontFamily: 'serif',
            fontSize: 28,
            fontWeight: FontWeight.w300,
            color: textPrimary,
            letterSpacing: -0.5,
          ),
          bodyLarge: TextStyle(
            fontSize: 16,
            color: textPrimary,
            height: 1.6,
          ),
          bodyMedium: TextStyle(
            fontSize: 14,
            color: textSecondary,
            height: 1.5,
          ),
          labelSmall: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            letterSpacing: 1.2,
            color: textMuted,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: gold,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: OutlinedButton.styleFrom(
            foregroundColor: gold,
            side: const BorderSide(color: gold, width: 1.5),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      );
}
