import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppLockService {
  static final AppLockService _instance = AppLockService._();
  factory AppLockService() => _instance;
  AppLockService._();

  final LocalAuthentication _auth = LocalAuthentication();
  bool _isEnabled = false;
  bool _isAuthenticated = false;

  bool get isEnabled => _isEnabled;
  bool get isAuthenticated => _isAuthenticated;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _isEnabled = prefs.getBool('ssb_app_lock_enabled') ?? false;
    if (_isEnabled) {
      _isAuthenticated = false;
    } else {
      _isAuthenticated = true;
    }
  }

  Future<bool> isBiometricsAvailable() async {
    try {
      final bool canCheck = await _auth.canCheckBiometrics;
      final bool isDeviceSupported = await _auth.isDeviceSupported();
      return canCheck && isDeviceSupported;
    } on PlatformException {
      return false;
    }
  }

  Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _auth.getAvailableBiometrics();
    } on PlatformException {
      return [];
    }
  }

  Future<bool> authenticate({String reason = 'Desbloqueie para acessar o Sola Scriptura'}) async {
    if (!_isEnabled || _isAuthenticated) return true;

    try {
      final bool didAuthenticate = await _auth.authenticate(
        localizedReason: reason,
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: false,
          useErrorDialogs: true,
        ),
      );
      if (didAuthenticate) {
        _isAuthenticated = true;
      }
      return didAuthenticate;
    } on PlatformException {
      return false;
    }
  }

  Future<void> setEnabled(bool enabled) async {
    final prefs = await SharedPreferences.getInstance();
    _isEnabled = enabled;
    await prefs.setBool('ssb_app_lock_enabled', enabled);
    if (!enabled) {
      _isAuthenticated = true;
    }
  }

  void lock() {
    if (_isEnabled) {
      _isAuthenticated = false;
    }
  }

  void unlock() {
    _isAuthenticated = true;
  }
}
