import '../config/api_config.dart';
import '../models/lexicon.dart';
import 'api_client.dart';

class LexiconService {
  final ApiClient _client;

  LexiconService(this._client);

  dynamic _unwrap(dynamic data) {
    if (data is Map<String, dynamic> && data.containsKey('data') && data.containsKey('success')) {
      return data['data'];
    }
    return data;
  }

  Future<PalavraLexicon?> buscarGregoPorStrong(String strong) async {
    final path = '${ApiConfig.endpoint('grego_strong')}/$strong';
    final response = await _client.get(path);
    final data = _unwrap(response.data);
    if (data is Map<String, dynamic>) {
      return PalavraLexicon.fromJson(data);
    }
    return null;
  }

  Future<List<PalavraLexicon>> buscarGrego(String query) async {
    final response = await _client.get(
      ApiConfig.endpoint('grego_buscar'),
      queryParameters: {'q': query},
    );
    final data = _unwrap(response.data);
    if (data is List) {
      return data
          .map((e) => PalavraLexicon.fromJson(e as Map<String, dynamic>))
          .toList();
    }
    return [];
  }

  Future<List<PalavraLexicon>> gregosFrequentes() async {
    final response = await _client.get(ApiConfig.endpoint('grego_frequentes'));
    final data = _unwrap(response.data);
    if (data is List) {
      return data
          .map((e) => PalavraLexicon.fromJson(e as Map<String, dynamic>))
          .toList();
    }
    return [];
  }

  Future<PalavraLexicon?> buscarHebraicoPorStrong(String strong) async {
    final path = '${ApiConfig.endpoint('hebraico_strong')}/$strong';
    final response = await _client.get(path);
    final data = _unwrap(response.data);
    if (data is Map<String, dynamic>) {
      return PalavraLexicon.fromJson(data);
    }
    return null;
  }

  Future<List<PalavraLexicon>> buscarHebraico(String query) async {
    final response = await _client.get(
      ApiConfig.endpoint('hebraico_buscar'),
      queryParameters: {'q': query},
    );
    final data = _unwrap(response.data);
    if (data is List) {
      return data
          .map((e) => PalavraLexicon.fromJson(e as Map<String, dynamic>))
          .toList();
    }
    return [];
  }

  Future<List<PalavraLexicon>> buscarHebraicoPorRaiz(String raiz) async {
    final path = '${ApiConfig.endpoint('hebraico_raiz')}/$raiz';
    final response = await _client.get(path);
    final data = _unwrap(response.data);
    if (data is List) {
      return data
          .map((e) => PalavraLexicon.fromJson(e as Map<String, dynamic>))
          .toList();
    }
    return [];
  }
}
