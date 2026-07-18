import '../config/api_config.dart';
import '../models/comentario.dart';
import '../services/cache_service.dart';
import 'api_client.dart';

class ComentarioService {
  final ApiClient _client;
  final CacheService _cache = CacheService();

  ComentarioService(this._client);

  Future<List<Comentario>> buscarPorVersiculo(String referencia) async {
    // Try cache first
    final cached = await _cache.getCachedComentarios(referencia);
    if (cached.isNotEmpty) {
      return cached.map((e) => Comentario(
        id: '',
        versiculoRef: e['referencia'] as String? ?? referencia,
        autor: e['autor'] as String? ?? '',
        texto: e['conteudo'] as String? ?? '',
        fonte: e['fonte'] as String?,
      )).toList();
    }

    // Fallback to API
    try {
      final response = await _client.get(
        ApiConfig.endpoint('comentarios'),
        queryParameters: {'referencia': referencia},
      );

      final data = response.data;
      if (data is Map<String, dynamic> && data['data'] is List) {
        final comentarios = (data['data'] as List)
            .map((e) => Comentario.fromJson(e as Map<String, dynamic>))
            .toList();

        // Cache the result
        await _cache.cacheComentarios(
          referencia: referencia,
          comentarios: (data['data'] as List).cast<Map<String, dynamic>>(),
        );

        return comentarios;
      }
    } catch (_) {}
    return [];
  }

  Future<List<Comentario>> buscarPorAutor(String autor) async {
    try {
      final response = await _client.get(
        ApiConfig.endpoint('comentarios'),
        queryParameters: {'autor': autor},
      );

      final data = response.data;
      if (data is Map<String, dynamic> && data['data'] is List) {
        return (data['data'] as List)
            .map((e) => Comentario.fromJson(e as Map<String, dynamic>))
            .toList();
      }
    } catch (_) {}
    return [];
  }
}
