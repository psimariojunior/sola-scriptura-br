import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../theme/app_theme.dart';

class TemaProvider extends ChangeNotifier {
  static const String _chave = 'tema_selecionado';

  String _tema = AppTheme.light;

  String get tema => _tema;

  ThemeData get themeData => AppTheme.themeData(_tema);

  TemaProvider() {
    _carregar();
  }

  Future<void> _carregar() async {
    final prefs = await SharedPreferences.getInstance();
    final salvo = prefs.getString(_chave);
    if (salvo != null) {
      _tema = salvo;
      notifyListeners();
    }
  }

  Future<void> setTema(String novoTema) async {
    if (novoTema == _tema) return;
    _tema = novoTema;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_chave, novoTema);
  }
}
