import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../config/api_config.dart';

class ApiException implements Exception {
  final int? statusCode;
  final String message;
  final dynamic data;

  ApiException({this.statusCode, required this.message, this.data});

  @override
  String toString() => 'ApiException($statusCode): $message';
}

class ApiClient {
  static ApiClient? _instance;
  late final Dio _dio;
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  String? _accessToken;
  String? _refreshToken;
  bool _isRefreshing = false;
  final List<Completer<void>> _pendingRequests = [];

  ApiClient._() {
    _dio = Dio(BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: ApiConfig.connectTimeout,
      receiveTimeout: ApiConfig.receiveTimeout,
      sendTimeout: ApiConfig.sendTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));
    _dio.interceptors.add(_AuthInterceptor(this));
    _dio.interceptors.add(_ErrorInterceptor());
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (obj) => print('[API] $obj'),
    ));
  }

  factory ApiClient() {
    _instance ??= ApiClient._();
    return _instance!;
  }

  Dio get dio => _dio;
  String? get accessToken => _accessToken;
  String? get refreshToken => _refreshToken;

  Future<void> loadTokens() async {
    _accessToken = await _secureStorage.read(key: 'access_token');
    _refreshToken = await _secureStorage.read(key: 'refresh_token');
    if (_accessToken != null) {
      _dio.options.headers['Authorization'] = 'Bearer $_accessToken';
    }
  }

  Future<void> setTokens({required String accessToken, String? refreshToken}) async {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
    await _secureStorage.write(key: 'access_token', value: accessToken);
    if (refreshToken != null) {
      await _secureStorage.write(key: 'refresh_token', value: refreshToken);
    }
    _dio.options.headers['Authorization'] = 'Bearer $accessToken';
  }

  Future<void> clearTokens() async {
    _accessToken = null;
    _refreshToken = null;
    await _secureStorage.delete(key: 'access_token');
    await _secureStorage.delete(key: 'refresh_token');
    _dio.options.headers.remove('Authorization');
  }

  Future<bool> tryRefreshToken() async {
    if (_refreshToken == null) return false;
    if (_isRefreshing) {
      final completer = Completer<void>();
      _pendingRequests.add(completer);
      await completer.future;
      return _accessToken != null;
    }

    _isRefreshing = true;
    try {
      final response = await _dio.post(
        ApiConfig.endpoint('auth_refresh'),
        data: {'refreshToken': _refreshToken},
        options: Options(
          headers: {'Authorization': null},
        ),
      );
      final responseData = _unwrapEnvelope(response.data);
      if (responseData is Map<String, dynamic>) {
        final newAccess = responseData['accessToken'] as String?;
        final newRefresh = responseData['refreshToken'] as String?;
        if (newAccess != null) {
          await setTokens(
            accessToken: newAccess,
            refreshToken: newRefresh ?? _refreshToken,
          );
          return true;
        }
      }
      return false;
    } catch (_) {
      await clearTokens();
      return false;
    } finally {
      _isRefreshing = false;
      for (final c in _pendingRequests) {
        if (!c.isCompleted) c.complete();
      }
      _pendingRequests.clear();
    }
  }

  dynamic _unwrapEnvelope(dynamic data) {
    if (data is Map<String, dynamic>) {
      if (data.containsKey('data') && data.containsKey('success')) {
        return data['data'];
      }
    }
    return data;
  }

  Future<Response<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    CancelToken? cancelToken,
  }) {
    return _dio.get<T>(
      path,
      queryParameters: queryParameters,
      cancelToken: cancelToken,
    );
  }

  Future<Response<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    CancelToken? cancelToken,
  }) {
    return _dio.post<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      cancelToken: cancelToken,
    );
  }

  Future<Response<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
  }) {
    return _dio.put<T>(
      path,
      data: data,
      queryParameters: queryParameters,
    );
  }

  Future<Response<T>> patch<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
  }) {
    return _dio.patch<T>(
      path,
      data: data,
      queryParameters: queryParameters,
    );
  }

  Future<Response<T>> delete<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
  }) {
    return _dio.delete<T>(
      path,
      queryParameters: queryParameters,
    );
  }

  void dispose() {
    _dio.close();
    _instance = null;
  }
}

class _AuthInterceptor extends Interceptor {
  final ApiClient _client;

  _AuthInterceptor(this._client);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (_client._accessToken != null) {
      options.headers['Authorization'] = 'Bearer ${_client._accessToken}';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401 && _client._refreshToken != null) {
      final refreshed = await _client.tryRefreshToken();
      if (refreshed) {
        err.requestOptions.headers['Authorization'] =
            'Bearer ${_client._accessToken}';
        try {
          final response = await _client._dio.fetch(err.requestOptions);
          handler.resolve(response);
          return;
        } catch (_) {}
      }
    }
    handler.next(err);
  }
}

class _ErrorInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    final statusCode = err.response?.statusCode;
    final data = err.response?.data;

    String message;
    if (data is Map<String, dynamic>) {
      message = data['message'] as String? ?? data['error'] as String? ?? 'Erro desconhecido';
    } else {
      message = err.message ?? 'Erro de conexao';
    }

    if (statusCode == 429) {
      message = 'Muitas requisicoes. Aguarde alguns segundos.';
    }

    handler.next(DioException(
      requestOptions: err.requestOptions,
      response: err.response,
      type: err.type,
      error: ApiException(statusCode: statusCode, message: message, data: data),
    ));
  }
}
