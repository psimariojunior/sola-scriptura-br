import 'dart:async';

import 'package:url_launcher/url_launcher.dart';

import '../config/api_config.dart';
import '../models/usuario.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _client;
  Usuario? _currentUser;

  AuthService(this._client);

  Usuario? get currentUser => _currentUser;
  bool get isAuthenticated => _client.accessToken != null;
  String? get currentToken => _client.accessToken;

  Future<void> init() async {
    await _client.loadTokens();
    if (_client.accessToken != null) {
      await _fetchCurrentUser();
    }
  }

  Future<Usuario?> login(String email, String senha) async {
    final response = await _client.post(
      ApiConfig.endpoint('auth_login'),
      data: {'email': email, 'senha': senha},
    );
    final rawData = response.data;
    final data = _unwrap(rawData);
    if (data is Map<String, dynamic>) {
      return _handleAuthResponse(data);
    }
    return null;
  }

  Future<Usuario?> register(String nome, String email, String senha) async {
    final response = await _client.post(
      ApiConfig.endpoint('auth_register'),
      data: {'nome': nome, 'email': email, 'senha': senha},
    );
    final rawData = response.data;
    final data = _unwrap(rawData);
    if (data is Map<String, dynamic>) {
      return _handleAuthResponse(data);
    }
    return null;
  }

  Future<void> logout() async {
    try {
      await _client.post(ApiConfig.endpoint('auth_logout'));
    } catch (_) {}
    _currentUser = null;
    await _client.clearTokens();
  }

  Future<void> loginWithGoogle() async {
    final url = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.endpoint('auth_google')}');
    if (await canLaunchUrl(url)) {
      await launchUrl(url, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> handleGoogleCallback(String accessToken, String refreshToken) async {
    await _client.setTokens(accessToken: accessToken, refreshToken: refreshToken);
    await _fetchCurrentUser();
  }

  Future<Usuario?> _fetchCurrentUser() async {
    try {
      final response = await _client.get(ApiConfig.endpoint('usuario_perfil'));
      final rawData = response.data;
      final data = _unwrap(rawData);
      if (data is Map<String, dynamic>) {
        _currentUser = Usuario.fromJson(data);
        return _currentUser;
      }
    } catch (_) {
      await _client.clearTokens();
    }
    return null;
  }

  Future<void> restoreSession() async {
    await _client.loadTokens();
    if (_client.accessToken != null) {
      await _fetchCurrentUser();
    }
  }

  Future<void> updateProfile({String? nome, String? avatar}) async {
    final payload = <String, dynamic>{};
    if (nome != null) payload['nome'] = nome;
    if (avatar != null) payload['avatar'] = avatar;
    if (payload.isEmpty) return;

    final response = await _client.put(
      ApiConfig.endpoint('usuario_perfil'),
      data: payload,
    );
    final rawData = response.data;
    final data = _unwrap(rawData);
    if (data is Map<String, dynamic> && _currentUser != null) {
      _currentUser = _currentUser!.copyWith(
        nome: nome ?? _currentUser!.nome,
        avatar: avatar ?? _currentUser!.avatar,
      );
    }
  }

  dynamic _unwrap(dynamic data) {
    if (data is Map<String, dynamic> && data.containsKey('data') && data.containsKey('success')) {
      return data['data'];
    }
    return data;
  }

  Usuario? _handleAuthResponse(Map<String, dynamic> data) {
    final accessToken = data['accessToken'] as String?;
    final refreshToken = data['refreshToken'] as String?;
    final userData = data['usuario'] as Map<String, dynamic>?;

    if (accessToken != null) {
      _client.setTokens(accessToken: accessToken, refreshToken: refreshToken);
    }

    if (userData != null) {
      _currentUser = Usuario.fromJson(userData);
    }
    return _currentUser;
  }
}
