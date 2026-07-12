import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'theme_provider.dart';
import 'auth_provider.dart';
import 'settings_provider.dart';
import 'devocional_provider.dart';
import 'flashcard_provider.dart';

final themeProviderInstance = ChangeNotifierProvider<ThemeProvider>((ref) {
  return ThemeProvider();
});

final authProviderInstance = ChangeNotifierProvider<AuthProvider>((ref) {
  return AuthProvider();
});

final settingsProviderInstance = ChangeNotifierProvider<SettingsProvider>((ref) {
  return SettingsProvider();
});

final devocionalProviderInstance = ChangeNotifierProvider<DevocionalProvider>((ref) {
  return DevocionalProvider();
});

final flashcardProviderInstance = ChangeNotifierProvider<FlashcardProvider>((ref) {
  return FlashcardProvider();
});
