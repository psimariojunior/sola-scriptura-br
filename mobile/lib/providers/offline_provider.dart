import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OfflineProvider extends ChangeNotifier {
  static const String _cacheKey = 'offline_cache';
  Map<String, dynamic> _cache = {};
  bool _isLoaded = false;

  bool get isLoaded => _isLoaded;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    final cached = prefs.getString(_cacheKey);
    if (cached != null) {
      _cache = jsonDecode(cached) as Map<String, dynamic>;
    }
    _isLoaded = true;
    notifyListeners();
  }

  Future<void> cacheVersiculos(
      String key, List<Map<String, dynamic>> versiculos) async {
    _cache[key] = {
      'data': versiculos,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
    };
    await _salvar();
  }

  List<Map<String, dynamic>> getCachedVersiculos(String key) {
    final entry = _cache[key];
    if (entry == null) return [];
    final timestamp = entry['timestamp'] as int? ?? 0;
    final age = DateTime.now().millisecondsSinceEpoch - timestamp;
    if (age > 24 * 60 * 60 * 1000) {
      _cache.remove(key);
      return [];
    }
    return List<Map<String, dynamic>>.from(entry['data'] as List? ?? []);
  }

  Future<void> cacheData(String key, dynamic data) async {
    _cache[key] = {
      'data': data,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
    };
    await _salvar();
  }

  dynamic getCachedData(String key) {
    final entry = _cache[key];
    if (entry == null) return null;
    final timestamp = entry['timestamp'] as int? ?? 0;
    final age = DateTime.now().millisecondsSinceEpoch - timestamp;
    if (age > 24 * 60 * 60 * 1000) {
      _cache.remove(key);
      return null;
    }
    return entry['data'];
  }

  Future<void> limparCache() async {
    _cache.clear();
    await _salvar();
    notifyListeners();
  }

  int get cacheSize => _cache.length;

  Future<void> _salvar() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_cacheKey, jsonEncode(_cache));
  }
}
