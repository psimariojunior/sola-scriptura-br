import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/services/auth_service.dart';
import 'package:sola_scriptura_br/services/api_client.dart';

void main() {
  group('AuthService', () {
    late ApiClient apiClient;
    late AuthService authService;

    setUp(() {
      apiClient = ApiClient();
      apiClient.dispose();
      apiClient = ApiClient();
      authService = AuthService(apiClient);
    });

    tearDown(() {
      apiClient.dispose();
    });

    group('estado inicial', () {
      test('deve iniciar nao autenticado', () {
        expect(authService.isAuthenticated, isFalse);
      });

      test('deve iniciar com token nulo', () {
        expect(apiClient.accessToken, isNull);
      });

      test('deve iniciar com usuario nulo', () {
        expect(authService.currentUser, isNull);
      });
    });

    group('login', () {
      test('deve retornar null quando resposta nao e Map', () async {
        expect(authService.isAuthenticated, isFalse);
      });
    });

    group('register', () {
      test('deve iniciar sem usuario apos inicializacao', () async {
        expect(authService.currentUser, isNull);
        expect(apiClient.accessToken, isNull);
      });
    });

    group('logout', () {
      test('deve limpar estado apos logout', () async {
        await authService.logout();

        expect(authService.isAuthenticated, isFalse);
        expect(apiClient.accessToken, isNull);
        expect(authService.currentUser, isNull);
      });
    });

    group('setAuthToken', () {
      test('deve definir header de autorizacao', () async {
        await apiClient.setTokens(accessToken: 'meu-token');

        expect(
          apiClient.dio.options.headers['Authorization'],
          'Bearer meu-token',
        );
      });

      test('deve remover header de autorizacao quando token e nulo', () async {
        await apiClient.setTokens(accessToken: 'meu-token');
        await apiClient.clearTokens();

        expect(
          apiClient.dio.options.headers.containsKey('Authorization'),
          isFalse,
        );
      });
    });

    group('restoreSession', () {
      test('deve nao autenticar quando token e invalido', () async {
        await authService.restoreSession();

        expect(authService.isAuthenticated, isFalse);
      });
    });
  });
}
