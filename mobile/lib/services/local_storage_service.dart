import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class LocalStorageService {
  static const String _favoritosKey = 'favoritos_cache';
  static const String _notasKey = 'notas_cache';
  static const String _historicoKey = 'historico_leitura';
  static const String _configKey = 'configuracoes';

  Future<void> salvarFavoritos(List<Map<String, dynamic>> favoritos) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_favoritosKey, jsonEncode(favoritos));
  }

  Future<List<Map<String, dynamic>>> carregarFavoritos() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_favoritosKey);
    if (data == null) return [];
    final List decoded = jsonDecode(data);
    return decoded.cast<Map<String, dynamic>>();
  }

  Future<void> salvarNota(String referencia, String nota) async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_notasKey);
    Map<String, String> notas = {};
    if (data != null) {
      notas = Map<String, String>.from(jsonDecode(data));
    }
    notas[referencia] = nota;
    await prefs.setString(_notasKey, jsonEncode(notas));
  }

  Future<String?> carregarNota(String referencia) async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_notasKey);
    if (data == null) return null;
    final Map<String, dynamic> notas = jsonDecode(data);
    return notas[referencia] as String?;
  }

  Future<Map<String, String>> carregarTodasNotas() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_notasKey);
    if (data == null) return {};
    return Map<String, String>.from(jsonDecode(data));
  }

  Future<void> salvarHistoricoLeitura(Map<String, dynamic> historico) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_historicoKey, jsonEncode(historico));
  }

  Future<Map<String, dynamic>> carregarHistoricoLeitura() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_historicoKey);
    if (data == null) return {};
    return Map<String, dynamic>.from(jsonDecode(data));
  }

  Future<void> salvarConfiguracoes(Map<String, dynamic> config) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_configKey, jsonEncode(config));
  }

  Future<Map<String, dynamic>> carregarConfiguracoes() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_configKey);
    if (data == null) return {};
    return Map<String, dynamic>.from(jsonDecode(data));
  }

  Future<void> limparTudo() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_favoritosKey);
    await prefs.remove(_notasKey);
    await prefs.remove(_historicoKey);
    await prefs.remove(_configKey);
  }
}
