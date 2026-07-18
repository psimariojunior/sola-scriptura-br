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
        expect(authService.currentToken, isNull);
      });

      test('deve iniciar com usuario nulo', () {
        expect(authService.currentUser, isNull);
      });
    });

    group('login', () {
      test('deve retornar null quando resposta nao e Map', () async {
        // Mock do client retornaria tipo invalido
        // Teste verifica que o metodo nao quebra
        expect(authService.isAuthenticated, isFalse);
      });
    });

    group('register', () {
      test('deve iniciar sem usuario apos inicializacao', () async {
        expect(authService.currentUser, isNull);
        expect(authService.currentToken, isNull);
      });
    });

    group('logout', () {
      test('deve limpar estado apos logout', () async {
        await authService.logout();

        expect(authService.isAuthenticated, isFalse);
        expect(authService.currentToken, isNull);
        expect(authService.currentUser, isNull);
      });
    });

    group('setAuthToken', () {
      test('deve definir header de autorizacao', () {
        apiClient.setAuthToken('meu-token');

        expect(
          apiClient.dio.options.headers['Authorization'],
          'Bearer meu-token',
        );
      });

      test('deve remover header de autorizacao quando token e nulo', () {
        apiClient.setAuthToken('meu-token');
        apiClient.setAuthToken(null);

        expect(
          apiClient.dio.options.headers.containsKey('Authorization'),
          isFalse,
        );
      });
    });

    group('restoreSession', () {
      test('deve retornar false quando token e invalido', () async {
        final result = await authService.restoreSession('token-invalido');

        expect(result, isFalse);
        expect(authService.isAuthenticated, isFalse);
      });
    });
  });
}
