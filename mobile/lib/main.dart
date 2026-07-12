import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'providers/providers.dart';
import 'screens/splash_screen.dart';

const String API_URL = 'https://api-production-bb96.up.railway.app/api/v1';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
  ));
  runApp(
    const ProviderScope(
      child: SolaScripturaApp(),
    ),
  );
}

class SolaScripturaApp extends ConsumerWidget {
  const SolaScripturaApp({super.key});

  static const Color primary = Color(0xFF1A1A2E);
  static const Color accent = Color(0xFFC9A96E);
  static const Color background = Color(0xFFF8F6F0);
  static const Color surface = Colors.white;
  static const Color textPrimary = Color(0xFF1A1A2E);
  static const Color textSecondary = Color(0xFF6B7280);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeProvider = ref.watch(themeProviderInstance);

    return MaterialApp(
      title: 'Sola Scriptura',
      debugShowCheckedModeBanner: false,
      themeMode: themeProvider.themeMode,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        primaryColor: primary,
        scaffoldBackgroundColor: background,
        colorScheme: ColorScheme.fromSeed(
          seedColor: accent,
          brightness: Brightness.light,
          primary: primary,
          secondary: accent,
          surface: surface,
          background: background,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          centerTitle: true,
          elevation: 0,
          systemOverlayStyle: SystemUiOverlayStyle.light,
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: Colors.white,
          selectedItemColor: primary,
          unselectedItemColor: textSecondary,
          type: BottomNavigationBarType.fixed,
          elevation: 8,
          selectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
          unselectedLabelStyle: TextStyle(fontSize: 11),
        ),
        cardTheme: CardTheme(
          elevation: 0,
          color: surface,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(color: Colors.grey.shade100),
          ),
        ),
        textTheme: const TextTheme(
          displayLarge: TextStyle(fontFamily: 'serif', color: textPrimary),
          displayMedium: TextStyle(fontFamily: 'serif', color: textPrimary),
          displaySmall: TextStyle(fontFamily: 'serif', color: textPrimary),
          headlineLarge: TextStyle(fontFamily: 'serif', color: textPrimary),
          headlineMedium: TextStyle(fontFamily: 'serif', color: textPrimary),
          headlineSmall: TextStyle(fontFamily: 'serif', color: textPrimary),
          titleLarge: TextStyle(fontFamily: 'serif', color: textPrimary),
          titleMedium: TextStyle(fontFamily: 'serif', color: textPrimary),
          titleSmall: TextStyle(fontFamily: 'serif', color: textPrimary),
          bodyLarge: TextStyle(fontFamily: 'serif', color: textPrimary, height: 1.6),
          bodyMedium: TextStyle(fontFamily: 'serif', color: textPrimary, height: 1.5),
          bodySmall: TextStyle(fontFamily: 'serif', color: textSecondary),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: primary,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.grey.shade50,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: accent, width: 2),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        primaryColor: primary,
        scaffoldBackgroundColor: const Color(0xFF0A0A14),
        colorScheme: ColorScheme.fromSeed(
          seedColor: accent,
          brightness: Brightness.dark,
          primary: primary,
          secondary: accent,
          surface: const Color(0xFF12121E),
          background: const Color(0xFF0A0A14),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF12121E),
          foregroundColor: Colors.white,
          centerTitle: true,
          elevation: 0,
          systemOverlayStyle: SystemUiOverlayStyle.light,
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: Color(0xFF12121E),
          selectedItemColor: accent,
          unselectedItemColor: Colors.white54,
          type: BottomNavigationBarType.fixed,
          elevation: 8,
          selectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
          unselectedLabelStyle: TextStyle(fontSize: 11),
        ),
        cardTheme: CardTheme(
          elevation: 0,
          color: const Color(0xFF1A1A2E),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(color: Colors.white.withOpacity(0.05)),
          ),
        ),
        textTheme: TextTheme(
          displayLarge: const TextStyle(fontFamily: 'serif', color: Colors.white),
          displayMedium: const TextStyle(fontFamily: 'serif', color: Colors.white),
          displaySmall: const TextStyle(fontFamily: 'serif', color: Colors.white),
          headlineLarge: const TextStyle(fontFamily: 'serif', color: Colors.white),
          headlineMedium: const TextStyle(fontFamily: 'serif', color: Colors.white),
          headlineSmall: const TextStyle(fontFamily: 'serif', color: Colors.white),
          titleLarge: const TextStyle(fontFamily: 'serif', color: Colors.white),
          titleMedium: const TextStyle(fontFamily: 'serif', color: Colors.white),
          titleSmall: const TextStyle(fontFamily: 'serif', color: Colors.white),
          bodyLarge: const TextStyle(fontFamily: 'serif', color: Colors.white, height: 1.6),
          bodyMedium: const TextStyle(fontFamily: 'serif', color: Colors.white, height: 1.5),
          bodySmall: TextStyle(fontFamily: 'serif', color: Colors.white.withOpacity(0.5)),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: accent,
            foregroundColor: const Color(0xFF0A0A14),
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: const Color(0xFF12121E),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: accent, width: 2),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
