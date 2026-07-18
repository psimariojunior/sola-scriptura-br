import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
          seed: const Color(0xFF6B9B7D),
          background: const Color(0xFF121212),
          surface: const Color(0xFF1E1E1E),
          surfaceContainer: const Color(0xFF252525),
          onBackground: Colors.white,
          onSurface: Colors.white,
          primary: const Color(0xFF6B9B7D),
          primaryContainer: const Color(0xFF2D4A3A),
          onPrimary: Colors.white,
          outline: const Color(0xFF404040),
        );
      case sepia:
        return _base(
          brightness: Brightness.light,
          seed: const Color(0xFF8B6914),
          background: const Color(0xFFF5ECD7),
          surface: const Color(0xFFEFE3C8),
          surfaceContainer: const Color(0xFFE8D9B5),
          onBackground: const Color(0xFF3E2723),
          onSurface: const Color(0xFF3E2723),
          primary: const Color(0xFF8B6914),
          primaryContainer: const Color(0xFFD4A843),
          onPrimary: Colors.white,
          outline: const Color(0xFFBCA88A),
        );
      case noturno:
        return _base(
          brightness: Brightness.dark,
          seed: const Color(0xFFD4A843),
          background: const Color(0xFF000000),
          surface: const Color(0xFF0A0A0A),
          surfaceContainer: const Color(0xFF111111),
          onBackground: const Color(0xFFE0E0E0),
          onSurface: const Color(0xFFE0E0E0),
          primary: const Color(0xFFD4A843),
          primaryContainer: const Color(0xFF3D2F10),
          onPrimary: Colors.black,
          outline: const Color(0xFF222222),
        );
      case light:
      default:
        return _base(
          brightness: Brightness.light,
          seed: const Color(0xFF1A6B52),
          background: const Color(0xFFFAFAFA),
          surface: const Color(0xFFFFFFFF),
          surfaceContainer: const Color(0xFFF0F0F0),
          onBackground: const Color(0xFF1A1A1A),
          onSurface: const Color(0xFF1A1A1A),
          primary: const Color(0xFF1A6B52),
          primaryContainer: const Color(0xFFD0EDE4),
          onPrimary: Colors.white,
          outline: const Color(0xFFD0D0D0),
        );
    }
  }

  static TextTheme _buildTextThemes(Color onBackground) {
    final bodyColor = onBackground;
    final mutedColor = onBackground.withOpacity(0.6);

    final bodyTextTheme = GoogleFonts.nunitoTextTheme(
      TextTheme(
        displayLarge: TextStyle(color: bodyColor),
        displayMedium: TextStyle(color: bodyColor),
        displaySmall: TextStyle(color: bodyColor),
        headlineLarge: TextStyle(color: bodyColor),
        headlineMedium: TextStyle(color: bodyColor),
        headlineSmall: TextStyle(color: bodyColor),
        titleLarge: TextStyle(color: bodyColor),
        titleMedium: TextStyle(color: bodyColor),
        titleSmall: TextStyle(color: bodyColor),
        bodyLarge: TextStyle(color: bodyColor),
        bodyMedium: TextStyle(color: bodyColor),
        bodySmall: TextStyle(color: mutedColor),
        labelLarge: TextStyle(color: bodyColor),
        labelMedium: TextStyle(color: bodyColor),
        labelSmall: TextStyle(color: mutedColor),
      ),
    );

    return bodyTextTheme.copyWith(
      displayLarge: GoogleFonts.montserrat(
        fontSize: 32,
        fontWeight: FontWeight.w700,
        color: bodyColor,
        height: 1.2,
      ),
      displayMedium: GoogleFonts.montserrat(
        fontSize: 28,
        fontWeight: FontWeight.w700,
        color: bodyColor,
        height: 1.2,
      ),
      displaySmall: GoogleFonts.montserrat(
        fontSize: 24,
        fontWeight: FontWeight.w700,
        color: bodyColor,
        height: 1.3,
      ),
      headlineLarge: GoogleFonts.montserrat(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.3,
      ),
      headlineMedium: GoogleFonts.montserrat(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.4,
      ),
      headlineSmall: GoogleFonts.montserrat(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.4,
      ),
      titleLarge: GoogleFonts.montserrat(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.4,
      ),
      titleMedium: GoogleFonts.nunito(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.5,
      ),
      titleSmall: GoogleFonts.nunito(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.5,
      ),
      bodyLarge: GoogleFonts.nunito(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: bodyColor,
        height: 1.6,
      ),
      bodyMedium: GoogleFonts.nunito(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: bodyColor,
        height: 1.5,
      ),
      bodySmall: GoogleFonts.nunito(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        color: mutedColor,
        height: 1.4,
      ),
      labelLarge: GoogleFonts.nunito(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.4,
      ),
      labelMedium: GoogleFonts.nunito(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        color: bodyColor,
        height: 1.4,
      ),
      labelSmall: GoogleFonts.nunito(
        fontSize: 10,
        fontWeight: FontWeight.w600,
        color: mutedColor,
        height: 1.3,
      ),
    );
  }

  static ThemeData _base({
    required Brightness brightness,
    required Color seed,
    required Color background,
    required Color surface,
    required Color surfaceContainer,
    required Color onBackground,
    required Color onSurface,
    required Color primary,
    required Color primaryContainer,
    required Color onPrimary,
    required Color outline,
  }) {
    final colorScheme = ColorScheme(
      brightness: brightness,
      primary: primary,
      onPrimary: onPrimary,
      primaryContainer: primaryContainer,
      onPrimaryContainer: onPrimary,
      secondary: primary.withOpacity(0.7),
      onSecondary: onPrimary,
      secondaryContainer: primaryContainer.withOpacity(0.5),
      onSecondaryContainer: onPrimary,
      tertiary: seed,
      onTertiary: onPrimary,
      tertiaryContainer: primaryContainer,
      onTertiaryContainer: onPrimary,
      error: const Color(0xFFBA1A1A),
      onError: Colors.white,
      errorContainer: const Color(0xFFFFDAD6),
      onErrorContainer: const Color(0xFF410002),
      surface: surface,
      onSurface: onSurface,
      surfaceContainerHighest: surfaceContainer,
      surfaceContainerHigh: surfaceContainer.withOpacity(0.8),
      surfaceContainerMedium: surfaceContainer.withOpacity(0.6),
      surfaceContainerLow: surfaceContainer.withOpacity(0.4),
      surfaceContainer: surfaceContainer,
      onSurfaceVariant: onSurface.withOpacity(0.7),
      outline: outline,
      outlineVariant: outline.withOpacity(0.5),
      shadow: Colors.black.withOpacity(0.15),
      scrim: Colors.black.withOpacity(0.3),
      inverseSurface: onSurface,
      onInverseSurface: surface,
      inversePrimary: primary.withOpacity(0.7),
      surfaceTint: primary.withOpacity(0.05),
    );

    final textTheme = _buildTextThemes(onBackground);

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: background,
      textTheme: textTheme,
      appBarTheme: AppBarTheme(
        backgroundColor: surface,
        foregroundColor: onBackground,
        elevation: 0,
        scrolledUnderElevation: 1,
        centerTitle: false,
        titleTextStyle: GoogleFonts.montserrat(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: onBackground,
        ),
      ),
      cardTheme: CardTheme(
        color: surface,
        elevation: 0,
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: outline.withOpacity(0.3), width: 1),
        ),
        clipBehavior: Clip.antiAlias,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: onPrimary,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.nunito(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primary,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          side: BorderSide(color: primary, width: 1.5),
          textStyle: GoogleFonts.nunito(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: primary,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          textStyle: GoogleFonts.nunito(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceContainer.withOpacity(0.3),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: outline),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: outline),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFBA1A1A), width: 1.5),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFBA1A1A), width: 2),
        ),
        labelStyle: GoogleFonts.nunito(
          fontSize: 14,
          color: onSurface.withOpacity(0.7),
        ),
        hintStyle: GoogleFonts.nunito(
          fontSize: 14,
          color: onSurface.withOpacity(0.4),
        ),
        prefixIconColor: onSurface.withOpacity(0.6),
        suffixIconColor: onSurface.withOpacity(0.6),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: surface,
        elevation: 0,
        height: 64,
        indicatorColor: primary.withOpacity(0.15),
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return GoogleFonts.nunito(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: primary,
            );
          }
          return GoogleFonts.nunito(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: onSurface.withOpacity(0.6),
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return IconThemeData(color: primary, size: 24);
          }
          return IconThemeData(color: onSurface.withOpacity(0.6), size: 24);
        }),
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: primary,
        foregroundColor: onPrimary,
        elevation: 4,
        focusElevation: 6,
        hoverElevation: 6,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      dividerTheme: DividerThemeData(
        color: outline.withOpacity(0.3),
        thickness: 1,
        space: 1,
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: onBackground,
        contentTextStyle: GoogleFonts.nunito(
          fontSize: 14,
          color: background,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        behavior: SnackBarBehavior.floating,
      ),
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: surface,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        showDragHandle: true,
        dragHandleColor: outline.withOpacity(0.4),
      ),
      dialogTheme: DialogTheme(
        backgroundColor: surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        titleTextStyle: GoogleFonts.montserrat(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: onBackground,
        ),
        contentTextStyle: GoogleFonts.nunito(
          fontSize: 14,
          color: onBackground.withOpacity(0.8),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: surfaceContainer.withOpacity(0.5),
        labelStyle: GoogleFonts.nunito(
          fontSize: 13,
          color: onSurface,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: BorderSide(color: outline.withOpacity(0.3)),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      ),
      listTileTheme: ListTileThemeData(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
        titleTextStyle: GoogleFonts.nunito(
          fontSize: 15,
          fontWeight: FontWeight.w500,
          color: onSurface,
        ),
        subtitleTextStyle: GoogleFonts.nunito(
          fontSize: 13,
          color: onSurface.withOpacity(0.6),
        ),
        iconColor: onSurface.withOpacity(0.7),
      ),
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: primary,
        linearTrackColor: outline.withOpacity(0.2),
      ),
      splashFactory: InkRipple.splashFactory,
      splashColor: primary.withOpacity(0.08),
      highlightColor: primary.withOpacity(0.04),
    );
  }
}
