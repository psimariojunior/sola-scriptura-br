import 'package:flutter/material.dart';

import '../models/pesquisa.dart';
import '../services/pesquisa_service.dart';

class PesquisaProvider extends ChangeNotifier {
  final PesquisaService _pesquisaService;

  String _query = '';
  List<ResultadoPesquisa> _resultados = [];
  bool _isLoading = false;
  String? _error;
  List<String> _historico = [];

  PesquisaProvider(this._pesquisaService);

  String get query => _query;
  List<ResultadoPesquisa> get resultados => _resultados;
  bool get isLoading => _isLoading;
  String? get error => _error;
  List<String> get historico => List.unmodifiable(_historico);

  Future<void> pesquisar(String query) async {
    if (query.trim().isEmpty) return;
    _query = query;
    _isLoading = true;
    _error = null;
    _adicionarHistorico(query);
    notifyListeners();

    try {
      _resultados = await _pesquisaService.pesquisar(query);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> pesquisarPorTipo(String query, String tipo) async {
    if (query.trim().isEmpty) return;
    _query = query;
    _isLoading = true;
    _error = null;
    _adicionarHistorico(query);
    notifyListeners();

    try {
      _resultados = await _pesquisaService.pesquisar(query, tipo: tipo);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  void limpar() {
    _query = '';
    _resultados = [];
    _error = null;
    notifyListeners();
  }

  void _adicionarHistorico(String query) {
    _historico.remove(query);
    _historico.insert(0, query);
    if (_historico.length > 20) {
      _historico = _historico.sublist(0, 20);
    }
  }
}
