import '../config/api_config.dart';
import '../models/comentario.dart';
import 'api_client.dart';

class ComentarioService {
  final ApiClient _client;

  ComentarioService(this._client);

  Future<List<Comentario>> buscarPorVersiculo(String referencia) async {
    final response = await _client.get(
      ApiConfig.endpoint('comentarios'),
      queryParameters: {'referencia': referencia},
    );

    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] is List) {
      return (data['data'] as List)
          .map((e) => Comentario.fromJson(e as Map<String, dynamic>))
          .toList();
    }
    return [];
  }

  Future<List<Comentario>> buscarPorAutor(String autor) async {
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
    return [];
  }
}
