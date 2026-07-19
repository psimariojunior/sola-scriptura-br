import 'dart:async';
import 'dart:convert';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';

import '../services/api_client.dart';
import '../services/cache_service.dart';
import '../config/api_config.dart';

class OfflineProvider extends ChangeNotifier {
  final CacheService _cache = CacheService();
  final Connectivity _connectivity = Connectivity();

  bool _isOnline = true;
  bool _isLoaded = false;
  List<Map<String, dynamic>> _acoesPendentes = [];
  StreamSubscription<List<ConnectivityResult>>? _connectivitySubscription;

  bool get isOnline => _isOnline;
  bool get isLoaded => _isLoaded;
  List<Map<String, dynamic>> get acoesPendentes => _acoesPendentes;
  bool get hasPendingActions => _acoesPendentes.isNotEmpty;

  Future<void> init() async {
    final result = await _connectivity.checkConnectivity();
    _isOnline = result != ConnectivityResult.none;

    _acoesPendentes = await _cache.getAcoesPendentes();
    _isLoaded = true;
    notifyListeners();

    _connectivitySubscription = _connectivity.onConnectivityChanged.listen(
      _onConnectivityChanged,
    );
  }

  Future<void> _onConnectivityChanged(List<ConnectivityResult> results) async {
    final wasOffline = !_isOnline;
    _isOnline = results.any((r) => r != ConnectivityResult.none);
    notifyListeners();

    if (wasOffline && _isOnline) {
      await sincronizarPendentes();
    }
  }

  Future<void> sincronizarPendentes() async {
    if (!_isOnline || _acoesPendentes.isEmpty) return;

    final client = ApiClient();
    final toRemove = <int>[];

    for (final acao in _acoesPendentes) {
      final id = acao['id'] as int;
      final tipo = acao['tipo'] as String;
      final dados = jsonDecode(acao['dados'] as String) as Map<String, dynamic>;
      final tentativas = acao['tentativas'] as int? ?? 0;

      if (tentativas >= 3) {
        toRemove.add(id);
        continue;
      }

      try {
        switch (tipo) {
          case 'favorito_adicionar':
            await client.post(
              ApiConfig.endpoint('favoritos'),
              data: dados,
            );
            break;
          case 'favorito_remover':
            await client.delete(
              '${ApiConfig.endpoint('favoritos')}/${dados['versiculo_ref']}',
            );
            break;
          case 'nota_adicionar':
          case 'nota_atualizar':
            await client.post(
              ApiConfig.endpoint('notas'),
              data: dados,
            );
            break;
        }
        toRemove.add(id);
      } catch (e) {
        await _cache.incrementarTentativa(id);
      }
    }

    for (final id in toRemove) {
      await _cache.removeAcaoPendente(id);
    }

    _acoesPendentes = await _cache.getAcoesPendentes();
    notifyListeners();
  }

  Future<void> enqueueFavoritoAdicionar(String versiculoRef, {String? nota}) async {
    await _cache.addFavorito(versiculoRef, nota: nota);
    await _cache.addAcaoPendente('favorito_adicionar', {
      'versiculo_ref': versiculoRef,
      if (nota != null) 'nota': nota,
    });
    _acoesPendentes = await _cache.getAcoesPendentes();
    notifyListeners();

    if (_isOnline) await sincronizarPendentes();
  }

  Future<void> enqueueFavoritoRemover(String versiculoRef) async {
    await _cache.removeFavorito(versiculoRef);
    await _cache.addAcaoPendente('favorito_remover', {
      'versiculo_ref': versiculoRef,
    });
    _acoesPendentes = await _cache.getAcoesPendentes();
    notifyListeners();

    if (_isOnline) await sincronizarPendentes();
  }

  Future<void> enqueueNota({
    required String versiculoRef,
    required String conteudo,
  }) async {
    await _cache.addNota(versiculoRef: versiculoRef, conteudo: conteudo);
    await _cache.addAcaoPendente('nota_adicionar', {
      'versiculo_ref': versiculoRef,
      'conteudo': conteudo,
    });
    _acoesPendentes = await _cache.getAcoesPendentes();
    notifyListeners();

    if (_isOnline) await sincronizarPendentes();
  }

  Future<void> enqueueNotaEstruturada({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String conteudo,
    required String traducao,
  }) async {
    await _cache.addNota(versiculoRef: '$livro $capitulo:$versiculo', conteudo: conteudo);
    await _cache.addAcaoPendente('nota_adicionar', {
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'traducao': traducao,
      'conteudo': conteudo,
    });
    _acoesPendentes = await _cache.getAcoesPendentes();
    notifyListeners();

    if (_isOnline) await sincronizarPendentes();
  }

  Future<void> enqueueFavoritoEstruturado({
    required String livro,
    required int capitulo,
    required int versiculo,
    required String traducao,
    String? nota,
  }) async {
    await _cache.addFavorito('$livro $capitulo:$versiculo', nota: nota);
    await _cache.addAcaoPendente('favorito_adicionar', {
      'livro': livro,
      'capitulo': capitulo,
      'versiculo': versiculo,
      'traducao': traducao,
      if (nota != null) 'nota': nota,
    });
    _acoesPendentes = await _cache.getAcoesPendentes();
    notifyListeners();

    if (_isOnline) await sincronizarPendentes();
  }

  Future<void> updatePreferencia(String chave, String valor) async {
    await _cache.setPreferencia(chave, valor);
  }

  Future<String?> getPreferencia(String chave) async {
    return await _cache.getPreferencia(chave);
  }

  Future<void> limparCache() async {
    await _cache.clearAllCache();
    notifyListeners();
  }

  int get cacheSize => _acoesPendentes.length;

  @override
  void dispose() {
    _connectivitySubscription?.cancel();
    super.dispose();
  }
}
