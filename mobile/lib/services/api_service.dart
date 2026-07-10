import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/biblia_models.dart';

class ApiService {
  static const String baseUrl = 'https://api-production-bb96.up.railway.app/api/v1';

  String? _token;

  String? get token => _token;

  void setToken(String? token) {
    _token = token;
  }

  Map<String, String> get _headers {
    final headers = <String, String>{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (_token != null) {
      headers['Authorization'] = 'Bearer $_token';
    }
    return headers;
  }

  Exception _tratarErro(http.Response response) {
    String mensagem = 'Erro ${response.statusCode}';
    try {
      final body = jsonDecode(response.body);
      if (body is Map && body['message'] != null) {
        mensagem = body['message'].toString();
      } else if (body is Map && body['error'] != null) {
        mensagem = body['error'].toString();
      }
    } catch (_) {}
    return Exception(mensagem);
  }

  Future<List<Testamento>> getTestamentos() async {
    final response = await http.get(
      Uri.parse('$baseUrl/testamentos'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Testamento.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<Livro>> getLivros({int? testamentoId}) async {
    final uri = Uri.parse('$baseUrl/livros').replace(
      queryParameters: testamentoId != null ? {'testamento_id': testamentoId.toString()} : null,
    );
    final response = await http.get(uri, headers: _headers);
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Livro.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<Capitulo>> getCapitulos(int livroId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/livros/$livroId/capitulos'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Capitulo.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<Versiculo>> getVersiculos(int livroId, int capitulo) async {
    final uri = Uri.parse('$baseUrl/versiculos').replace(
      queryParameters: {
        'livro_id': livroId.toString(),
        'capitulo': capitulo.toString(),
      },
    );
    final response = await http.get(uri, headers: _headers);
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Versiculo.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<ResultadoPesquisa>> pesquisar(String termo) async {
    final uri = Uri.parse('$baseUrl/pesquisar').replace(
      queryParameters: {'q': termo},
    );
    final response = await http.get(uri, headers: _headers);
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => ResultadoPesquisa.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<Map<String, dynamic>> getPerguntasIA(String pergunta, {String? tradicao}) async {
    final response = await http.post(
      Uri.parse('$baseUrl/ia/perguntar'),
      headers: _headers,
      body: jsonEncode({
        'pergunta': pergunta,
        if (tradicao != null) 'tradicao': tradicao,
      }),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    }
    throw _tratarErro(response);
  }

  Future<List<Personagem>> getPersonagens() async {
    final response = await http.get(
      Uri.parse('$baseUrl/personagens'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Personagem.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<Doutrina>> getDoutrinas({String? categoria}) async {
    final uri = Uri.parse('$baseUrl/doutrinas').replace(
      queryParameters: categoria != null ? {'categoria': categoria} : null,
    );
    final response = await http.get(uri, headers: _headers);
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Doutrina.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<Localizacao>> getLocalizacoes() async {
    final response = await http.get(
      Uri.parse('$baseUrl/localizacoes'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Localizacao.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<List<EventoHistorico>> getEventosHistoricos() async {
    final response = await http.get(
      Uri.parse('$baseUrl/eventos-historicos'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => EventoHistorico.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<Map<String, dynamic>> login(String email, String senha) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: _headers,
      body: jsonEncode({'email': email, 'senha': senha}),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final t = data['token'];
      if (t != null) {
        _token = t.toString();
      }
      return data;
    }
    throw _tratarErro(response);
  }

  Future<Map<String, dynamic>> cadastrar(String nome, String email, String senha) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/cadastrar'),
      headers: _headers,
      body: jsonEncode({'nome': nome, 'email': email, 'senha': senha}),
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final t = data['token'];
      if (t != null) {
        _token = t.toString();
      }
      return data;
    }
    throw _tratarErro(response);
  }

  Future<Perfil> getPerfil() async {
    final response = await http.get(
      Uri.parse('$baseUrl/auth/perfil'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return Perfil.fromJson(data);
    }
    throw _tratarErro(response);
  }

  Future<List<Favorito>> getFavoritos() async {
    final response = await http.get(
      Uri.parse('$baseUrl/favoritos'),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Favorito.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw _tratarErro(response);
  }

  Future<void> adicionarFavorito(String referencia, String texto, {String? nota}) async {
    final response = await http.post(
      Uri.parse('$baseUrl/favoritos'),
      headers: _headers,
      body: jsonEncode({
        'referencia': referencia,
        'texto': texto,
        if (nota != null) 'nota': nota,
      }),
    );
    if (response.statusCode != 200 && response.statusCode != 201) {
      throw _tratarErro(response);
    }
  }

  Future<void> removerFavorito(int id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/favoritos/$id'),
      headers: _headers,
    );
    if (response.statusCode != 200 && response.statusCode != 204) {
      throw _tratarErro(response);
    }
  }
}

final ApiService apiService = ApiService();
