import '../config/api_config.dart';
import '../models/usuario.dart';
import 'api_client.dart';

class UsuarioService {
  final ApiClient _client;

  UsuarioService(this._client);

  Future<Usuario?> getPerfil() async {
    final response = await _client.get(ApiConfig.endpoint('usuario'));
    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] != null) {
      return Usuario.fromJson(data['data'] as Map<String, dynamic>);
    }
    return null;
  }

  Future<List<String>> getFavoritos() async {
    final response = await _client.get(ApiConfig.endpoint('favoritos'));
    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] is List) {
      return List<String>.from(data['data'] as List);
    }
    return [];
  }

  Future<void> adicionarFavorito(String versiculoRef) async {
    await _client.post(
      ApiConfig.endpoint('favoritos'),
      data: {'referencia': versiculoRef},
    );
  }

  Future<void> removerFavorito(String versiculoRef) async {
    await _client.delete(
      '${ApiConfig.endpoint('favoritos')}/$versiculoRef',
    );
  }

  Future<bool> isFavorito(String versiculoRef) async {
    final favoritos = await getFavoritos();
    return favoritos.contains(versiculoRef);
  }

  Future<List<Map<String, dynamic>>> getNotas() async {
    final response = await _client.get(ApiConfig.endpoint('notas'));
    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] is List) {
      return List<Map<String, dynamic>>.from(data['data'] as List);
    }
    return [];
  }

  Future<Map<String, dynamic>> criarNota({
    required String versiculoRef,
    required String texto,
  }) async {
    final response = await _client.post(
      ApiConfig.endpoint('notas'),
      data: {'referencia': versiculoRef, 'texto': texto},
    );
    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] != null) {
      return data['data'] as Map<String, dynamic>;
    }
    return {};
  }

  Future<void> atualizarNota({
    required String notaId,
    required String texto,
  }) async {
    await _client.put(
      '${ApiConfig.endpoint('notas')}/$notaId',
      data: {'texto': texto},
    );
  }

  Future<void> removerNota(String notaId) async {
    await _client.delete('${ApiConfig.endpoint('notas')}/$notaId');
  }

  Future<List<Map<String, dynamic>>> getPlanosLeitura() async {
    final response = await _client.get(ApiConfig.endpoint('planos'));
    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] is List) {
      return List<Map<String, dynamic>>.from(data['data'] as List);
    }
    return [];
  }
}
