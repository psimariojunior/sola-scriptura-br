import '../config/api_config.dart';
import '../models/pesquisa.dart';
import '../services/cache_service.dart';
import 'api_client.dart';

class PesquisaService {
  final ApiClient _client;
  final CacheService _cache = CacheService();

  PesquisaService(this._client);

  Future<List<ResultadoPesquisa>> pesquisar(String query, {String? tipo}) async {
    // Try cache first
    final cached = await _cache.getCachedPesquisa('$query${tipo != null ? '_$tipo' : ''}');
    if (cached != null && cached.isNotEmpty) {
      return cached.map((e) => ResultadoPesquisa.fromJson(e)).toList();
    }

    // Fallback to API
    try {
      final queryParams = <String, dynamic>{'q': query};
      if (tipo != null) queryParams['tipo'] = tipo;

      final response = await _client.get(
        ApiConfig.endpoint('pesquisa'),
        queryParameters: queryParams,
      );

      final data = response.data;
      if (data is Map<String, dynamic> && data['data'] is List) {
        final resultados = (data['data'] as List)
            .map((e) => ResultadoPesquisa.fromJson(e as Map<String, dynamic>))
            .toList();

        // Cache the result
        await _cache.cachePesquisa(
          '$query${tipo != null ? '_$tipo' : ''}',
          (data['data'] as List).cast<Map<String, dynamic>>(),
        );

        return resultados;
      }
    } catch (_) {}
    return [];
  }

  Future<List<ResultadoPesquisa>> pesquisarVersiculos(String query) async {
    return pesquisar(query, tipo: 'versiculo');
  }

  Future<List<ResultadoPesquisa>> pesquisarComentarios(String query) async {
    return pesquisar(query, tipo: 'comentario');
  }

  Future<List<ResultadoPesquisa>> pesquisarLexicon(String query) async {
    return pesquisar(query, tipo: 'lexicon');
  }
}
