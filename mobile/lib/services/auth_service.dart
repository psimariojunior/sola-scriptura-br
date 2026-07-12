import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/biblia_models.dart';
import 'api_service.dart';

class AuthService {
  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  final ApiService _api;

  AuthService(this._api);

  Future<bool> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(_tokenKey);
    if (token == null) return false;

    _api.setToken(token);
    try {
      await _api.getPerfil();
      return true;
    } catch (_) {
      _api.setToken(null);
      await prefs.remove(_tokenKey);
      await prefs.remove(_userKey);
      return false;
    }
  }

  Future<Perfil> login(String email, String senha) async {
    final data = await _api.login(email, senha);
    final user = data['usuario'] ?? data['user'];
    await _saveSession(data);
    if (user != null) {
      return Perfil.fromJson(user as Map<String, dynamic>);
    }
    return Perfil(nome: email, email: email);
  }

  Future<Perfil> cadastrar(String nome, String email, String senha) async {
    final data = await _api.cadastrar(nome, email, senha);
    final user = data['usuario'] ?? data['user'];
    await _saveSession(data);
    if (user != null) {
      return Perfil.fromJson(user as Map<String, dynamic>);
    }
    return Perfil(nome: nome, email: email);
  }

  Future<void> logout() async {
    _api.setToken(null);
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_userKey);
  }

  Future<void> _saveSession(Map<String, dynamic> data) async {
    final token = data['token']?.toString();
    if (token != null) {
      _api.setToken(token);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_tokenKey, token);
      await prefs.setString(_userKey, jsonEncode(data));
    }
  }

  String? get currentToken => _api.token;
  bool get isLoggedIn => _api.token != null;
}
