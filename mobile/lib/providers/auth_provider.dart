import 'package:flutter/material.dart';

import '../models/usuario.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService;

  bool _isLoading = false;
  String? _error;

  AuthProvider(this._authService);

  bool get isAuthenticated => _authService.isAuthenticated;
  bool get isLoading => _isLoading;
  String? get error => _error;
  Usuario? get currentUser => _authService.currentUser;
  String? get token => _authService.currentToken;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final user = await _authService.login(email, password);
      _isLoading = false;
      notifyListeners();
      return user != null;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(String nome, String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final user = await _authService.register(nome, email, password);
      _isLoading = false;
      notifyListeners();
      return user != null;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> loginWithGoogle() async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final user = await _authService.loginWithGoogle();
      _isLoading = false;
      notifyListeners();
      return user != null;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    await _authService.logout();
    notifyListeners();
  }

  Future<void> restoreSession(String token) async {
    _isLoading = true;
    notifyListeners();
    await _authService.restoreSession(token);
    _isLoading = false;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
