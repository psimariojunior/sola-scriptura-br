import 'dart:async';
import 'dart:convert';

import '../config/api_config.dart';
import 'api_client.dart';

class IaService {
  final ApiClient _client;

  IaService(this._client);

  dynamic _unwrap(dynamic data) {
    if (data is Map<String, dynamic> && data.containsKey('data') && data.containsKey('success')) {
      return data['data'];
    }
    return data;
  }

  Future<String> perguntar(String pergunta, {String? traducao}) async {
    final payload = <String, dynamic>{'consulta': pergunta};
    if (traducao != null) payload['tradicao'] = traducao;

    final response = await _client.post(
      ApiConfig.endpoint('ia_perguntar'),
      data: payload,
    );
    final result = _unwrap(response.data);
    if (result is Map<String, dynamic>) {
      return result['resposta'] as String? ?? result['response'] as String? ?? '';
    }
    if (result is String) return result;
    return '';
  }

  Stream<String> streamPergunta(String pergunta, {String? traducao}) async* {
    final payload = <String, dynamic>{'consulta': pergunta};
    if (traducao != null) payload['tradicao'] = traducao;

    final dioResponse = await _client.dio.post<List<int>>(
      ApiConfig.endpoint('ia_stream'),
      data: payload,
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

  Future<String> exegese({required String versiculoId, String? texto}) async {
    final payload = <String, dynamic>{'versiculoId': versiculoId};
    if (texto != null) payload['texto'] = texto;

    final response = await _client.post(
      ApiConfig.endpoint('ia_exegese'),
      data: payload,
    );
    final result = _unwrap(response.data);
    if (result is Map<String, dynamic>) {
      return result['analise'] as String? ?? result['response'] as String? ?? '';
    }
    if (result is String) return result;
    return '';
  }

  Future<String> comparar(List<String> passagens) async {
    final response = await _client.post(
      ApiConfig.endpoint('ia_comparar'),
      data: {'passagens': passagens},
    );
    final result = _unwrap(response.data);
    if (result is Map<String, dynamic>) {
      return result['analise'] as String? ?? result['response'] as String? ?? '';
    }
    if (result is String) return result;
    return '';
  }
}
