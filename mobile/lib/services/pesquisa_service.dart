import '../config/api_config.dart';
import '../models/pesquisa.dart';
import 'api_client.dart';

class PesquisaService {
  final ApiClient _client;

  PesquisaService(this._client);

  Future<List<ResultadoPesquisa>> pesquisar(String query, {String? tipo}) async {
    final queryParams = <String, dynamic>{'q': query};
    if (tipo != null) queryParams['tipo'] = tipo;

    final response = await _client.get(
      ApiConfig.endpoint('pesquisa'),
      queryParameters: queryParams,
    );

    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] is List) {
      return (data['data'] as List)
          .map((e) => ResultadoPesquisa.fromJson(e as Map<String, dynamic>))
          .toList();
    }
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
