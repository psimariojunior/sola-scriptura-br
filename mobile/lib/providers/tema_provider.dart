import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../theme/app_theme.dart';

class TemaProvider extends ChangeNotifier {
  static const String _chave = 'tema_selecionado';

  String _tema = AppTheme.light;
  double _fontSize = 18.0;
  bool _isLoaded = false;

  String get tema => _tema;
  double get fontSize => _fontSize;
  bool get isLoaded => _isLoaded;
  ThemeData get themeData => AppTheme.themeData(_tema);

  bool get isDark =>
      _tema == AppTheme.dark ||
      _tema == AppTheme.sepia ||
      _tema == AppTheme.noturno;

  TemaProvider() {
    _carregar();
  }

  Future<void> _carregar() async {
    final prefs = await SharedPreferences.getInstance();
    final salvo = prefs.getString(_chave);
    if (salvo != null) {
      _tema = salvo;
    }
    _fontSize = prefs.getDouble('font_size') ?? 18.0;
    _isLoaded = true;
    notifyListeners();
  }

  Future<void> setTema(String novoTema) async {
    if (novoTema == _tema) return;
    _tema = novoTema;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_chave, novoTema);
  }

  Future<void> setFontSize(double size) async {
    if (size == _fontSize) return;
    _fontSize = size;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble('font_size', size);
  }
}
