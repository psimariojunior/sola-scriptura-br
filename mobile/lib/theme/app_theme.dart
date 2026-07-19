import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Paleta de cores Sola Scriptura BR — espelha tokens semanticos do
/// `src/app/globals.css` (light, dark, sepia, noturno).
class AppColors {
  AppColors._();

  // === Light (manha premium dourado/creme) ===
  static const Color lightBackground = Color(0xFFFAFAF7);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightSurfaceSunken = Color(0xFFF4F1EA);
  static const Color lightPrimary = Color(0xFFA17A2C);
  static const Color lightPrimaryHover = Color(0xFF8A6923);
  static const Color lightPrimaryEmphasis = Color(0xFFC49A4D);
  static const Color lightTextPrimary = Color(0xFF1C1917);
  static const Color lightTextSecondary = Color(0xFF57534E);
  static const Color lightTextMuted = Color(0xFFA8A29E);
  static const Color lightBorder = Color(0xFFE5E5E5);
  static const Color lightAccentWarm = Color(0xFFB45309);
  static const Color lightAccentDanger = Color(0xFFB91C1C);
  static const Color lightOnPrimary = Color(0xFFFFFFFF);

  // === Dark (noite dourada) ===
  static const Color darkBackground = Color(0xFF0A0908);
  static const Color darkSurface = Color(0xFF161412);
  static const Color darkSurfaceSunken = Color(0xFF0F0D0B);
  static const Color darkPrimary = Color(0xFFD4A843);
  static const Color darkPrimaryHover = Color(0xFFE0B558);
  static const Color darkPrimaryEmphasis = Color(0xFFE8C56B);
  static const Color darkTextPrimary = Color(0xFFF5F1E8);
  static const Color darkTextSecondary = Color(0xFFB8B0A4);
  static const Color darkTextMuted = Color(0xFF7A7368);
  static const Color darkBorder = Color(0xFF2A2724);
  static const Color darkAccentWarm = Color(0xFFE07A30);
  static const Color darkAccentDanger = Color(0xFFEF4444);
  static const Color darkOnPrimary = Color(0xFF0A0908);

  // === Sepia (leitura classica) ===
  static const Color sepiaBackground = Color(0xFFF5ECD7);
  static const Color sepiaSurface = Color(0xFFEFE3C8);
  static const Color sepiaSurfaceSunken = Color(0xFFE8D9B5);
  static const Color sepiaPrimary = Color(0xFF8B6914);
  static const Color sepiaPrimaryHover = Color(0xFF6A4612);
  static const Color sepiaPrimaryEmphasis = Color(0xFFA07420);
  static const Color sepiaTextPrimary = Color(0xFF3A2E1C);
  static const Color sepiaTextSecondary = Color(0xFF6B5A42);
  static const Color sepiaTextMuted = Color(0xFF9A8A6E);
  static const Color sepiaBorder = Color(0xFFD4C9A8);
  static const Color sepiaAccentWarm = Color(0xFFA04020);
  static const Color sepiaAccentDanger = Color(0xFF9B2C2C);
  static const Color sepiaOnPrimary = Color(0xFFF5ECD7);

  // === Noturno (OLED puro) ===
  static const Color noturnoBackground = Color(0xFF000000);
  static const Color noturnoSurface = Color(0xFF0A0908);
  static const Color noturnoSurfaceSunken = Color(0xFF050505);
  static const Color noturnoPrimary = Color(0xFFC8A668);
  static const Color noturnoPrimaryHover = Color(0xFFD4B47A);
  static const Color noturnoPrimaryEmphasis = Color(0xFFDCC089);
  static const Color noturnoTextPrimary = Color(0xFFC4B5A0);
  static const Color noturnoTextSecondary = Color(0xFF8A7D6B);
  static const Color noturnoTextMuted = Color(0xFF5A5044);
  static const Color noturnoBorder = Color(0xFF1F1F1F);
  static const Color noturnoAccentWarm = Color(0xFFA06030);
  static const Color noturnoAccentDanger = Color(0xFF8A3030);
  static const Color noturnoOnPrimary = Color(0xFF000000);
}

/// Tema do app Sola Scriptura BR — dourado premium, 4 variantes (light, dark,
/// sepia, noturno), com tipografia `Inter` (UI) + `Crimson Pro` (corpo).
class AppTheme {
  AppTheme._();

  static const String light = 'light';
  static const String dark = 'dark';
  static const String sepia = 'sepia';
  static const String noturno = 'noturno';

  // Raios — espelham --radius-{sm,md,lg,xl} do site.
  static const double radiusSm = 4;
  static const double radiusMd = 8;
  static const double radiusLg = 12;
  static const double radiusXl = 20;

  static ThemeData themeData(String tema) {
    switch (tema) {
      case dark:
        return _build(
          brightness: Brightness.dark,
          background: AppColors.darkBackground,
          surface: AppColors.darkSurface,
          surfaceSunken: AppColors.darkSurfaceSunken,
          primary: AppColors.darkPrimary,
          primaryHover: AppColors.darkPrimaryHover,
          primaryEmphasis: AppColors.darkPrimaryEmphasis,
          textPrimary: AppColors.darkTextPrimary,
          textSecondary: AppColors.darkTextSecondary,
          textMuted: AppColors.darkTextMuted,
          border: AppColors.darkBorder,
          accentWarm: AppColors.darkAccentWarm,
          accentDanger: AppColors.darkAccentDanger,
          onPrimary: AppColors.darkOnPrimary,
        );
      case sepia:
        return _build(
          brightness: Brightness.light,
          background: AppColors.sepiaBackground,
          surface: AppColors.sepiaSurface,
          surfaceSunken: AppColors.sepiaSurfaceSunken,
          primary: AppColors.sepiaPrimary,
          primaryHover: AppColors.sepiaPrimaryHover,
          primaryEmphasis: AppColors.sepiaPrimaryEmphasis,
          textPrimary: AppColors.sepiaTextPrimary,
          textSecondary: AppColors.sepiaTextSecondary,
          textMuted: AppColors.sepiaTextMuted,
          border: AppColors.sepiaBorder,
          accentWarm: AppColors.sepiaAccentWarm,
          accentDanger: AppColors.sepiaAccentDanger,
          onPrimary: AppColors.sepiaOnPrimary,
        );
      case noturno:
        return _build(
          brightness: Brightness.dark,
          background: AppColors.noturnoBackground,
          surface: AppColors.noturnoSurface,
          surfaceSunken: AppColors.noturnoSurfaceSunken,
          primary: AppColors.noturnoPrimary,
          primaryHover: AppColors.noturnoPrimaryHover,
          primaryEmphasis: AppColors.noturnoPrimaryEmphasis,
          textPrimary: AppColors.noturnoTextPrimary,
          textSecondary: AppColors.noturnoTextSecondary,
          textMuted: AppColors.noturnoTextMuted,
          border: AppColors.noturnoBorder,
          accentWarm: AppColors.noturnoAccentWarm,
          accentDanger: AppColors.noturnoAccentDanger,
          onPrimary: AppColors.noturnoOnPrimary,
        );
      case light:
      default:
        return _build(
          brightness: Brightness.light,
          background: AppColors.lightBackground,
          surface: AppColors.lightSurface,
          surfaceSunken: AppColors.lightSurfaceSunken,
          primary: AppColors.lightPrimary,
          primaryHover: AppColors.lightPrimaryHover,
          primaryEmphasis: AppColors.lightPrimaryEmphasis,
          textPrimary: AppColors.lightTextPrimary,
          textSecondary: AppColors.lightTextSecondary,
          textMuted: AppColors.lightTextMuted,
          border: AppColors.lightBorder,
          accentWarm: AppColors.lightAccentWarm,
          accentDanger: AppColors.lightAccentDanger,
          onPrimary: AppColors.lightOnPrimary,
        );
    }
  }

  static TextTheme _buildTextTheme({
    required Color textPrimary,
    required Color textSecondary,
    required Color textMuted,
  }) {
    final crimson = GoogleFonts.crimsonProTextTheme();
    final inter = GoogleFonts.interTextTheme();

    return crimson.copyWith(
      // Display — Inter, leve, alto contraste (telas/titulos hero).
      displayLarge: inter.displayLarge?.copyWith(
        fontSize: 36,
        fontWeight: FontWeight.w300,
        color: textPrimary,
        height: 1.1,
        letterSpacing: -0.5,
      ),
      displayMedium: inter.displayMedium?.copyWith(
        fontSize: 30,
        fontWeight: FontWeight.w300,
        color: textPrimary,
        height: 1.15,
        letterSpacing: -0.4,
      ),
      displaySmall: inter.displaySmall?.copyWith(
        fontSize: 26,
        fontWeight: FontWeight.w400,
        color: textPrimary,
        height: 1.2,
        letterSpacing: -0.3,
      ),
      // Headlines — Inter, peso medio (secoes).
      headlineLarge: inter.headlineLarge?.copyWith(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        height: 1.25,
      ),
      headlineMedium: inter.headlineMedium?.copyWith(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        height: 1.3,
      ),
      headlineSmall: inter.headlineSmall?.copyWith(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        height: 1.3,
      ),
      // Titles — Inter (cards, dialogs, listas).
      titleLarge: inter.titleLarge?.copyWith(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        height: 1.35,
      ),
      titleMedium: inter.titleMedium?.copyWith(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        height: 1.4,
      ),
      titleSmall: inter.titleSmall?.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        height: 1.4,
      ),
      // Body — Crimson Pro, serif premium para leitura (versiculos, estudos).
      bodyLarge: crimson.bodyLarge?.copyWith(
        fontSize: 17,
        fontWeight: FontWeight.w400,
        color: textPrimary,
        height: 1.6,
      ),
      bodyMedium: crimson.bodyMedium?.copyWith(
        fontSize: 15,
        fontWeight: FontWeight.w400,
        color: textPrimary,
        height: 1.55,
      ),
      bodySmall: crimson.bodySmall?.copyWith(
        fontSize: 13,
        fontWeight: FontWeight.w400,
        color: textMuted,
        height: 1.5,
      ),
      // Labels — Inter, UPPERCASE-style tracking (botoes, tabs, chips).
      labelLarge: inter.labelLarge?.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        letterSpacing: 0.1,
      ),
      labelMedium: inter.labelMedium?.copyWith(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        color: textSecondary,
        letterSpacing: 0.2,
      ),
      labelSmall: inter.labelSmall?.copyWith(
        fontSize: 11,
        fontWeight: FontWeight.w600,
        color: textMuted,
        letterSpacing: 0.4,
      ),
    );
  }

  static ThemeData _build({
    required Brightness brightness,
    required Color background,
    required Color surface,
    required Color surfaceSunken,
    required Color primary,
    required Color primaryHover,
    required Color primaryEmphasis,
    required Color textPrimary,
    required Color textSecondary,
    required Color textMuted,
    required Color border,
    required Color accentWarm,
    required Color accentDanger,
    required Color onPrimary,
  }) {
    final isDark = brightness == Brightness.dark;

    // Cor de tinta: no light theme e gold no dark/sepia/noturno.
    final appBarBg = isDark ? surface : primary;
    final appBarFg = isDark ? primary : onPrimary;

    final colorScheme = ColorScheme(
      brightness: brightness,
      primary: primary,
      onPrimary: onPrimary,
      primaryContainer: primaryEmphasis,
      onPrimaryContainer: isDark ? background : surface,
      secondary: accentWarm,
      onSecondary: isDark ? background : Colors.white,
      secondaryContainer: accentWarm.withValues(alpha: 0.15),
      onSecondaryContainer: accentWarm,
      tertiary: primaryEmphasis,
      onTertiary: isDark ? background : Colors.white,
      tertiaryContainer: primary.withValues(alpha: 0.20),
      onTertiaryContainer: primary,
      error: accentDanger,
      onError: isDark ? background : Colors.white,
      errorContainer: accentDanger.withValues(alpha: 0.15),
      onErrorContainer: accentDanger,
      surface: surface,
      onSurface: textPrimary,
      surfaceContainerHighest: surfaceSunken,
      surfaceContainerHigh: surfaceSunken.withValues(alpha: 0.7),
      surfaceContainerLow: surface,
      surfaceContainer: surfaceSunken,
      onSurfaceVariant: textSecondary,
      outline: border,
      outlineVariant: border.withValues(alpha: 0.5),
      shadow: Colors.black.withValues(alpha: isDark ? 0.45 : 0.10),
      scrim: Colors.black.withValues(alpha: 0.5),
      inverseSurface: textPrimary,
      onInverseSurface: surface,
      inversePrimary: primaryEmphasis,
      surfaceTint: primary.withValues(alpha: 0.08),
    );

    final textTheme = _buildTextTheme(
      textPrimary: textPrimary,
      textSecondary: textSecondary,
      textMuted: textMuted,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: background,
      canvasColor: background,
      dividerColor: border.withValues(alpha: 0.5),
      textTheme: textTheme,
      primaryTextTheme: textTheme,
      iconTheme: IconThemeData(color: textPrimary, size: 22),
      primaryIconTheme: IconThemeData(color: onPrimary, size: 22),
      splashFactory: InkSparkle.splashFactory,
      splashColor: primary.withValues(alpha: 0.10),
      highlightColor: primary.withValues(alpha: 0.06),
      hoverColor: primary.withValues(alpha: 0.05),
      appBarTheme: AppBarTheme(
        backgroundColor: appBarBg,
        foregroundColor: appBarFg,
        elevation: 0,
        scrolledUnderElevation: isDark ? 0.5 : 2,
        centerTitle: false,
        titleSpacing: 16,
        toolbarHeight: 56,
        shape: const Border(),
        titleTextStyle: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: appBarFg,
          letterSpacing: 0,
        ),
        iconTheme: IconThemeData(color: appBarFg, size: 22),
        actionsIconTheme: IconThemeData(color: appBarFg, size: 22),
        systemOverlayStyle: null,
      ),
      cardTheme: CardThemeData(
        color: surface,
        surfaceTintColor: Colors.transparent,
        shadowColor: Colors.black.withValues(alpha: isDark ? 0.4 : 0.06),
        elevation: 0.5,
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusLg),
          side: BorderSide(color: border.withValues(alpha: 0.6), width: 1),
        ),
        clipBehavior: Clip.antiAlias,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: onPrimary,
          disabledBackgroundColor: primary.withValues(alpha: 0.4),
          disabledForegroundColor: onPrimary.withValues(alpha: 0.7),
          elevation: 0,
          shadowColor: primary.withValues(alpha: 0.3),
          surfaceTintColor: Colors.transparent,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radiusMd),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.1,
          ),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: onPrimary,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radiusMd),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.1,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primary,
          side: BorderSide(color: primary, width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radiusMd),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.1,
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: primary,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          minimumSize: const Size(0, 40),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radiusSm + 2),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.1,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceSunken.withValues(alpha: isDark ? 0.4 : 0.5),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: GoogleFonts.crimsonPro(
          fontSize: 15,
          color: textMuted,
          fontWeight: FontWeight.w400,
        ),
        labelStyle: GoogleFonts.inter(
          fontSize: 14,
          color: textSecondary,
          fontWeight: FontWeight.w500,
        ),
        floatingLabelStyle: GoogleFonts.inter(
          fontSize: 13,
          color: primary,
          fontWeight: FontWeight.w600,
        ),
        helperStyle: GoogleFonts.crimsonPro(
          fontSize: 13,
          color: textMuted,
        ),
        errorStyle: GoogleFonts.inter(
          fontSize: 12,
          color: accentDanger,
          fontWeight: FontWeight.w500,
        ),
        prefixIconColor: textMuted,
        suffixIconColor: textMuted,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          borderSide: BorderSide(color: border, width: 1),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          borderSide: BorderSide(color: border, width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          borderSide: BorderSide(color: primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          borderSide: BorderSide(color: accentDanger, width: 1.5),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          borderSide: BorderSide(color: accentDanger, width: 2),
        ),
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          borderSide: BorderSide(color: border.withValues(alpha: 0.5), width: 1),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: surface,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        height: 68,
        indicatorColor: primary.withValues(alpha: 0.18),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return GoogleFonts.inter(
            fontSize: 11,
            fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
            color: selected ? primary : textMuted,
            letterSpacing: 0.2,
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return IconThemeData(
            color: selected ? primary : textMuted,
            size: 24,
          );
        }),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: primary,
        unselectedItemColor: textMuted,
        selectedLabelStyle: GoogleFonts.inter(
          fontSize: 11,
          fontWeight: FontWeight.w600,
        ),
        unselectedLabelStyle: GoogleFonts.inter(
          fontSize: 11,
          fontWeight: FontWeight.w500,
        ),
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: primary,
        foregroundColor: onPrimary,
        elevation: 4,
        focusElevation: 6,
        hoverElevation: 6,
        highlightElevation: 8,
        disabledElevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        extendedTextStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
      ),
      dividerTheme: DividerThemeData(
        color: border.withValues(alpha: 0.5),
        thickness: 1,
        space: 1,
        indent: 0,
        endIndent: 0,
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: isDark ? textPrimary : const Color(0xFF1C1917),
        contentTextStyle: GoogleFonts.inter(
          fontSize: 14,
          color: isDark ? background : Colors.white,
          fontWeight: FontWeight.w500,
        ),
        actionTextColor: primaryEmphasis,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
        ),
        behavior: SnackBarBehavior.floating,
        elevation: 4,
      ),
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: surface,
        surfaceTintColor: Colors.transparent,
        modalBackgroundColor: surface,
        modalBarrierColor: Colors.black.withValues(alpha: 0.5),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(radiusXl)),
        ),
        showDragHandle: true,
        dragHandleColor: textMuted.withValues(alpha: 0.5),
        elevation: 8,
        modalElevation: 12,
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: surface,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusXl),
        ),
        elevation: 8,
        titleTextStyle: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: textPrimary,
        ),
        contentTextStyle: GoogleFonts.crimsonPro(
          fontSize: 15,
          color: textSecondary,
          height: 1.5,
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: surfaceSunken.withValues(alpha: 0.6),
        selectedColor: primary.withValues(alpha: 0.18),
        disabledColor: border.withValues(alpha: 0.3),
        labelStyle: GoogleFonts.inter(
          fontSize: 13,
          color: textPrimary,
          fontWeight: FontWeight.w500,
        ),
        secondaryLabelStyle: GoogleFonts.inter(
          fontSize: 13,
          color: primary,
          fontWeight: FontWeight.w600,
        ),
        iconTheme: IconThemeData(color: textSecondary, size: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMd + 2),
          side: BorderSide(color: border.withValues(alpha: 0.4)),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        labelPadding: const EdgeInsets.symmetric(horizontal: 4),
      ),
      listTileTheme: ListTileThemeData(
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        minVerticalPadding: 8,
        iconColor: textSecondary,
        textColor: textPrimary,
        titleTextStyle: GoogleFonts.inter(
          fontSize: 15,
          fontWeight: FontWeight.w500,
          color: textPrimary,
          height: 1.4,
        ),
        subtitleTextStyle: GoogleFonts.crimsonPro(
          fontSize: 13,
          color: textMuted,
          height: 1.4,
        ),
        leadingAndTrailingTextStyle: GoogleFonts.inter(
          fontSize: 13,
          color: textMuted,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMd),
        ),
      ),
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: primary,
        linearTrackColor: border.withValues(alpha: 0.3),
        circularTrackColor: border.withValues(alpha: 0.3),
        linearMinHeight: 4,
      ),
      sliderTheme: SliderThemeData(
        activeTrackColor: primary,
        inactiveTrackColor: border.withValues(alpha: 0.5),
        thumbColor: primary,
        overlayColor: primary.withValues(alpha: 0.15),
        valueIndicatorColor: primary,
        valueIndicatorTextStyle: GoogleFonts.inter(
          fontSize: 12,
          color: onPrimary,
          fontWeight: FontWeight.w600,
        ),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return primary;
          return textMuted;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return primary.withValues(alpha: 0.35);
          }
          return border.withValues(alpha: 0.6);
        }),
        trackOutlineColor: WidgetStateProperty.all(Colors.transparent),
      ),
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return primary;
          return Colors.transparent;
        }),
        checkColor: WidgetStateProperty.all(onPrimary),
        side: BorderSide(color: textMuted, width: 1.5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
      ),
      radioTheme: RadioThemeData(
        fillColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return primary;
          return textMuted;
        }),
      ),
      tabBarTheme: TabBarThemeData(
        labelColor: primary,
        unselectedLabelColor: textMuted,
        labelStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
        unselectedLabelStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.1,
        ),
        indicator: UnderlineTabIndicator(
          borderSide: BorderSide(color: primary, width: 2.5),
          insets: const EdgeInsets.symmetric(horizontal: 12),
        ),
        indicatorSize: TabBarIndicatorSize.label,
        dividerColor: border.withValues(alpha: 0.5),
        dividerHeight: 1,
      ),
      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: isDark ? textPrimary : const Color(0xFF1C1917),
          borderRadius: BorderRadius.circular(radiusSm + 2),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 12,
          color: isDark ? background : Colors.white,
          fontWeight: FontWeight.w500,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        preferBelow: true,
        waitDuration: const Duration(milliseconds: 400),
      ),
      pageTransitionsTheme: PageTransitionsTheme(
        builders: {
          TargetPlatform.android: PredictiveBackPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }
}
