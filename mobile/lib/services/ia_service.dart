import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

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
    final payload = <String, dynamic>{'pergunta': pergunta};
    if (traducao != null) payload['tradicao'] = traducao;

    final dioResponse = await _client.dio.post(
      ApiConfig.endpoint('ia_stream'),
      data: payload,
      options: Options(
        responseType: ResponseType.stream,
        headers: const {
          'Accept': 'text/event-stream',
          'Content-Type': 'application/json',
        },
        // Respostas LLM podem levar varios minutos: desabilita receive timeout
        receiveTimeout: Duration.zero,
        sendTimeout: ApiConfig.sendTimeout,
      ),
    );

    final status = dioResponse.statusCode ?? 0;
    if (status < 200 || status >= 300) {
      String errorMessage = 'Servidor retornou status $status';
      final stream = dioResponse.data;
      if (stream is Stream<List<int>>) {
        try {
          final bytes = await stream
              .fold<List<int>>(<int>[], (acc, chunk) => acc..addAll(chunk));
          final body = utf8.decode(bytes, allowMalformed: true);
          if (body.isNotEmpty) {
            try {
              final parsed = jsonDecode(body);
              if (parsed is Map<String, dynamic>) {
                errorMessage = parsed['message'] as String? ??
                    parsed['erro'] as String? ??
                    parsed['error'] as String? ??
                    body;
              } else if (parsed is String) {
                errorMessage = parsed;
              } else {
                errorMessage = body;
              }
            } catch (_) {
              errorMessage = body;
            }
          }
        } catch (_) {}
      }
      throw ApiException(statusCode: status, message: errorMessage);
    }

    final stream = dioResponse.data;
    if (stream is! Stream<List<int>>) {
      throw ApiException(
        message: 'Resposta invalida do servidor (stream esperado)',
      );
    }

    final decoder = utf8.decoder;
    String buffer = '';
    String? currentEvent;

    try {
      await for (final chunk in stream) {
        buffer += decoder.convert(chunk);
        final linhas = buffer.split('\n');
        buffer = linhas.removeLast();

        for (final linhaCompleta in linhas) {
          var linha = linhaCompleta;
          if (linha.endsWith('\r')) linha = linha.substring(0, linha.length - 1);

          if (linha.isEmpty) {
            currentEvent = null;
            continue;
          }

          if (linha.startsWith('data:')) {
            final data = linha.substring(5).trimLeft();
            if (data == '[DONE]') return;
            try {
              final parsed = jsonDecode(data);
              if (parsed is Map<String, dynamic>) {
                final dados = parsed['dados'];
                if (dados is Map<String, dynamic>) {
                  final token = dados['token'];
                  if (token is String) {
                    yield token;
                    continue;
                  }
                  if (currentEvent == 'erro' && dados['message'] is String) {
                    throw ApiException(message: dados['message'] as String);
                  }
                }
                for (final key in const [
                  'chunk',
                  'delta',
                  'text',
                  'content',
                  'resposta',
                ]) {
                  final v = parsed[key];
                  if (v is String && v.isNotEmpty) {
                    yield v;
                    break;
                  }
                }
              }
            } catch (e) {
              if (e is ApiException) rethrow;
              if (kDebugMode) {
                debugPrint('[IA] SSE parse error: $e');
              }
            }
          } else if (linha.startsWith('event:')) {
            currentEvent = linha.substring(6).trim();
          } else if (linha.startsWith(':')) {
            // SSE comment (heartbeat) - ignorar
          }
        }
      }
    } finally {
      // decoder doesn't need explicit close
    }
  }

  Stream<String> perguntarComFallback(String pergunta, {String? traducao}) async* {
    try {
      yield* streamPergunta(pergunta, traducao: traducao);
    } catch (e) {
      if (kDebugMode) {
        debugPrint('[IA] Streaming falhou, usando fallback: $e');
      }
      final resposta = await perguntar(pergunta, traducao: traducao);
      if (resposta.isEmpty) rethrow;
      yield resposta;
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
