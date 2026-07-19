import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/search_result.dart';
import '../services/pesquisa_service.dart';
import '../services/search_service.dart';

class PesquisaProvider extends ChangeNotifier {
  static const int maxHistory = 10;
  static const String _historyKey = 'search_history_v1';

  final PesquisaService _pesquisaService;

  String _query = '';
  List<SearchResult> _resultados = [];
  bool _isLoading = false;
  String? _error;
  List<String> _historico = [];
  SearchResultType? _tipoFilter;
  bool _indexReady = false;

  PesquisaProvider(this._pesquisaService) {
    _init();
  }

  String get query => _query;
  List<SearchResult> get resultados => List.unmodifiable(_resultados);
  bool get isLoading => _isLoading;
  String? get error => _error;
  List<String> get historico => List.unmodifiable(_historico);
  SearchResultType? get tipoFilter => _tipoFilter;
  bool get indexReady => _indexReady;

  Future<void> _init() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _historico = prefs.getStringList(_historyKey) ?? [];
      notifyListeners();
    } catch (_) {}
  }

  Future<void> pesquisar(String query) async {
    if (query.trim().isEmpty) {
      _resultados = [];
      _query = '';
      notifyListeners();
      return;
    }
    _query = query;
    _isLoading = true;
    _error = null;
    notifyListeners();

    if (SearchService.instance.isInitialized) {
      _executarBuscaLocal(query);
    } else {
      try {
        await SearchService.init();
        _executarBuscaLocal(query);
      } catch (e) {
        _error = 'Erro ao carregar índice de busca.';
        _isLoading = false;
        notifyListeners();
      }
    }
  }

  Future<void> pesquisarPorTipo(String query, SearchResultType tipo) async {
    _tipoFilter = tipo;
    await pesquisar(query);
  }

  Future<void> _executarBuscaLocal(String query) async {
    await _adicionarHistorico(query);

    if (!SearchService.instance.isInitialized) {
      await SearchService.init();
    }

    final filterSet = _tipoFilter == null ? null : <SearchResultType>{_tipoFilter!};
    final results = SearchService.instance.search(
      query,
      filter: filterSet,
      limit: 100,
    );

    _resultados = results;
    _indexReady = true;
    _isLoading = false;
    _error = null;
    notifyListeners();
  }

  void setTipoFilter(SearchResultType? tipo) {
    _tipoFilter = tipo;
    if (_query.isNotEmpty) {
      pesquisar(_query);
    }
  }

  List<String> getSuggestions(String prefix) {
    if (!SearchService.instance.isInitialized) return const [];
    return SearchService.instance.suggest(prefix, limit: 6);
  }

  void limpar() {
    _query = '';
    _resultados = [];
    _error = null;
    _tipoFilter = null;
    notifyListeners();
  }

  Future<void> _adicionarHistorico(String query) async {
    final q = query.trim();
    if (q.isEmpty) return;
    _historico.remove(q);
    _historico.insert(0, q);
    if (_historico.length > maxHistory) {
      _historico = _historico.sublist(0, maxHistory);
    }
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList(_historyKey, _historico);
    } catch (_) {}
  }

  Future<void> limparHistorico() async {
    _historico.clear();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_historyKey);
    } catch (_) {}
    notifyListeners();
  }
}
