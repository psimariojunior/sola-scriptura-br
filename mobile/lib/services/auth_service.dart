import 'dart:async';

import '../config/api_config.dart';
import '../models/usuario.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _client;
  String? _currentToken;
  Usuario? _currentUser;

  AuthService(this._client);

  String? get currentToken => _currentToken;
  Usuario? get currentUser => _currentUser;
  bool get isAuthenticated => _currentToken != null;

  Future<Usuario?> login(String email, String password) async {
    final response = await _client.post(
      ApiConfig.endpoint('auth_login'),
      data: {'email': email, 'senha': password},
    );
    final data = response.data;
    if (data is Map<String, dynamic>) {
      _currentToken = data['token'] as String?;
      final userData = data['usuario'] as Map<String, dynamic>?;
      if (userData != null) {
        _currentUser = Usuario.fromJson(userData);
      }
      if (_currentToken != null) {
        _client.setAuthToken(_currentToken);
      }
      return _currentUser;
    }
    return null;
  }

  Future<Usuario?> register(String nome, String email, String password) async {
    final response = await _client.post(
      ApiConfig.endpoint('auth_register'),
      data: {'nome': nome, 'email': email, 'senha': password},
    );
    final data = response.data;
    if (data is Map<String, dynamic>) {
      _currentToken = data['token'] as String?;
      final userData = data['usuario'] as Map<String, dynamic>?;
      if (userData != null) {
        _currentUser = Usuario.fromJson(userData);
      }
      if (_currentToken != null) {
        _client.setAuthToken(_currentToken);
      }
      return _currentUser;
    }
    return null;
  }

  Future<Usuario?> loginWithGoogle() async {
    // Google Sign-In flow would be implemented here
    // For now, call backend with the Google token
    final response = await _client.post(
      ApiConfig.endpoint('auth_google'),
      data: {'provider': 'google'},
    );
    final data = response.data;
    if (data is Map<String, dynamic>) {
      _currentToken = data['token'] as String?;
      final userData = data['usuario'] as Map<String, dynamic>?;
      if (userData != null) {
        _currentUser = Usuario.fromJson(userData);
      }
      if (_currentToken != null) {
        _client.setAuthToken(_currentToken);
      }
      return _currentUser;
    }
    return null;
  }

  Future<void> logout() async {
    try {
      await _client.post(ApiConfig.endpoint('auth_logout'));
    } catch (_) {}
    _currentToken = null;
    _currentUser = null;
    _client.setAuthToken(null);
  }

  Future<bool> restoreSession(String token) async {
    _currentToken = token;
    _client.setAuthToken(token);
    try {
      final response = await _client.get(ApiConfig.endpoint('auth_session'));
      final data = response.data;
      if (data is Map<String, dynamic>) {
        final userData = data['usuario'] as Map<String, dynamic>?;
        if (userData != null) {
          _currentUser = Usuario.fromJson(userData);
          return true;
        }
      }
    } catch (_) {
      _currentToken = null;
      _currentUser = null;
      _client.setAuthToken(null);
    }
    return false;
  }

  Future<void> updateProfile({String? nome, String? avatar}) async {
    final data = <String, dynamic>{};
    if (nome != null) data['nome'] = nome;
    if (avatar != null) data['avatar'] = avatar;
    if (data.isEmpty) return;

    final response = await _client.put(
      ApiConfig.endpoint('usuario'),
      data: data,
    );
    final result = response.data;
    if (result is Map<String, dynamic> && _currentUser != null) {
      _currentUser = _currentUser!.copyWith(
        nome: nome ?? _currentUser!.nome,
        avatar: avatar ?? _currentUser!.avatar,
      );
    }
  }
}
