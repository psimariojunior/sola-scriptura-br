import 'dart:async';
import 'dart:convert';

import '../config/api_config.dart';
import 'api_client.dart';

class IaService {
  final ApiClient _client;

  IaService(this._client);

  Future<String> perguntar(String pergunta, {String? contexto}) async {
    final data = <String, dynamic>{'pergunta': pergunta};
    if (contexto != null) data['contexto'] = contexto;

    final response = await _client.post(
      ApiConfig.endpoint('ia_chat'),
      data: data,
    );

    final result = response.data;
    if (result is Map<String, dynamic>) {
      return result['resposta'] as String? ?? result['response'] as String? ?? '';
    }
    return '';
  }

  Stream<String> streamPergunta(String pergunta, {String? contexto}) async* {
    final data = <String, dynamic>{'pergunta': pergunta};
    if (contexto != null) data['contexto'] = contexto;

    final dioResponse = await _client.dio.post<List<int>>(
      ApiConfig.endpoint('ia_stream'),
      data: data,
      options: ResponseType.stream,
    );

    final stream = dioResponse.data;
    if (stream != null) {
      String buffer = '';
      await for (final chunk in stream) {
        buffer += utf8.decode(chunk);
        final lines = buffer.split('\n');
        buffer = lines.removeLast();
        for (final line in lines) {
          if (line.startsWith('data: ')) {
            final jsonStr = line.substring(6);
            if (jsonStr == '[DONE]') return;
            try {
              final json = jsonDecode(jsonStr) as Map<String, dynamic>;
              final delta = json['delta'] as String?;
              if (delta != null) yield delta;
            } catch (_) {}
          }
        }
      }
    }
  }

  Future<String> exegese(String referencia) async {
    final response = await _client.post(
      ApiConfig.endpoint('exegese'),
      data: {'referencia': referencia},
    );
    final result = response.data;
    if (result is Map<String, dynamic>) {
      return result['analise'] as String? ?? result['response'] as String? ?? '';
    }
    return '';
  }

  Future<String> gerarEstudo(String tema) async {
    final response = await _client.post(
      ApiConfig.endpoint('ia_estudo'),
      data: {'tema': tema},
    );
    final result = response.data;
    if (result is Map<String, dynamic>) {
      return result['estudo'] as String? ?? result['response'] as String? ?? '';
    }
    return '';
  }
}
