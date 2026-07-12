import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsProvider extends ChangeNotifier {
  static const String _traducaoKey = 'traducao_padrao';
  static const String _fontSizeKey = 'font_size';
  static const String _notificacoesKey = 'notificacoes';
  static const String _idiomaKey = 'idioma';

  String _traducaoPadrao = 'NVI';
  double _fontSize = 16.0;
  bool _notificacoesAtivadas = true;
  String _idioma = 'pt';

  String get traducaoPadrao => _traducaoPadrao;
  double get fontSize => _fontSize;
  bool get notificacoesAtivadas => _notificacoesAtivadas;
  String get idioma => _idioma;

  SettingsProvider() {
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _traducaoPadrao = prefs.getString(_traducaoKey) ?? 'NVI';
    _fontSize = prefs.getDouble(_fontSizeKey) ?? 16.0;
    _notificacoesAtivadas = prefs.getBool(_notificacoesKey) ?? true;
    _idioma = prefs.getString(_idiomaKey) ?? 'pt';
    notifyListeners();
  }

  Future<void> setTraducao(String traducao) async {
    _traducaoPadrao = traducao;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_traducaoKey, traducao);
    notifyListeners();
  }

  Future<void> setFontSize(double size) async {
    _fontSize = size;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble(_fontSizeKey, size);
    notifyListeners();
  }

  Future<void> toggleNotificacoes() async {
    _notificacoesAtivadas = !_notificacoesAtivadas;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_notificacoesKey, _notificacoesAtivadas);
    notifyListeners();
  }

  Future<void> setIdioma(String idioma) async {
    _idioma = idioma;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_idiomaKey, idioma);
    notifyListeners();
  }
}
