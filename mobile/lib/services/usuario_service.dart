import '../config/api_config.dart';
import '../models/usuario.dart';
import 'api_client.dart';

class UsuarioService {
  final ApiClient _client;

  UsuarioService(this._client);

  dynamic _unwrap(dynamic data) {
    if (data is Map<String, dynamic> && data.containsKey('data') && data.containsKey('success')) {
      return data['data'];
    }
    return data;
  }

  Future<Usuario?> getPerfil() async {
    final response = await _client.get(ApiConfig.endpoint('usuario_perfil'));
    final data = _unwrap(response.data);
    if (data is Map<String, dynamic>) {
      return Usuario.fromJson(data);
    }
    return null;
  }

  Future<Usuario?> atualizarPerfil({String? nome, String? avatar}) async {
    final payload = <String, dynamic>{};
    if (nome != null) payload['nome'] = nome;
    if (avatar != null) payload['avatar'] = avatar;
    if (payload.isEmpty) return null;

    final response = await _client.put(
      ApiConfig.endpoint('usuario_perfil'),
      data: payload,
    );
    final data = _unwrap(response.data);
    if (data is Map<String, dynamic>) {
      return Usuario.fromJson(data);
    }
    return null;
  }

  Future<Map<String, dynamic>?> atualizarPreferencias(Map<String, dynamic> preferencias) async {
    final response = await _client.put(
      ApiConfig.endpoint('usuario_preferencias'),
      data: preferencias,
    );
    final data = _unwrap(response.data);
    if (data is Map<String, dynamic>) {
      return data;
    }
    return null;
  }

  Future<List<String>> getFavoritos() async {
    final response = await _client.get(ApiConfig.endpoint('favoritos'));
    final data = _unwrap(response.data);
    if (data is List) {
      return List<String>.from(data);
    }
    return [];
  }

  Future<void> adicionarFavorito(String referencia) async {
    await _client.post(
      ApiConfig.endpoint('favoritos'),
      data: {'referencia': referencia},
    );
  }

  Future<void> removerFavorito(String referencia) async {
    await _client.delete(
      '${ApiConfig.endpoint('favoritos')}/$referencia',
    );
  }

  Future<bool> isFavorito(String referencia) async {
    final favoritos = await getFavoritos();
    return favoritos.contains(referencia);
  }

  Future<List<Map<String, dynamic>>> getNotas() async {
    final response = await _client.get(ApiConfig.endpoint('notas'));
    final data = _unwrap(response.data);
    if (data is List) {
      return List<Map<String, dynamic>>.from(data);
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
    final data = _unwrap(response.data);
    if (data is Map<String, dynamic>) {
      return data;
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
}
