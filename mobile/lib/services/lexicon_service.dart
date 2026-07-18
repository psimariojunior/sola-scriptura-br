import '../config/api_config.dart';
import '../models/lexicon.dart';
import 'api_client.dart';

class LexiconService {
  final ApiClient _client;

  LexiconService(this._client);

  Future<List<PalavraLexicon>> buscar(String query, {String? idioma}) async {
    final queryParams = <String, dynamic>{'q': query};
    if (idioma != null) queryParams['idioma'] = idioma;

    final response = await _client.get(
      ApiConfig.endpoint('lexicon'),
      queryParameters: queryParams,
    );

    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] is List) {
      return (data['data'] as List)
          .map((e) => PalavraLexicon.fromJson(e as Map<String, dynamic>))
          .toList();
    }
    return [];
  }

  Future<List<PalavraLexicon>> buscarGrego(String query) async {
    return buscar(query, idioma: 'grego');
  }

  Future<List<PalavraLexicon>> buscarHebraico(String query) async {
    return buscar(query, idioma: 'hebraico');
  }

  Future<PalavraLexicon?> buscarPorStrong(String strong) async {
    final response = await _client.get('${ApiConfig.endpoint('lexicon')}/$strong');
    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] != null) {
      return PalavraLexicon.fromJson(data['data'] as Map<String, dynamic>);
    }
    return null;
  }
}
