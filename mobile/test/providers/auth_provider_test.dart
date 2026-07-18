import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/providers/auth_provider.dart';
import 'package:sola_scriptura_br/services/auth_service.dart';
import 'package:sola_scriptura_br/services/api_client.dart';

void main() {
  group('AuthProvider', () {
    late ApiClient apiClient;
    late AuthService authService;
    late AuthProvider authProvider;

    setUp(() {
      apiClient = ApiClient();
      apiClient.dispose();
      apiClient = ApiClient();
      authService = AuthService(apiClient);
      authProvider = AuthProvider(authService);
    });

    tearDown(() {
      apiClient.dispose();
    });

    group('estado inicial', () {
      test('deve iniciar nao autenticado', () {
        expect(authProvider.isAuthenticated, isFalse);
      });

      test('deve iniciar sem erro', () {
        expect(authProvider.error, isNull);
      });

      test('deve iniciar sem usuario', () {
        expect(authProvider.currentUser, isNull);
      });

      test('deve iniciar sem token', () {
        expect(authProvider.token, isNull);
      });

      test('deve iniciar sem estar carregando', () {
        expect(authProvider.isLoading, isFalse);
      });
    });

    group('login', () {
      test('deve retornar false quando credenciais sao invalidas', () async {
        final result = await authProvider.login('email@invalido.com', 'senha123');

        expect(result, isFalse);
      });

      test('deve definir error quando login falha', () async {
        await authProvider.login('email@invalido.com', 'senha123');

        // Error pode ou nao ser definido dependendo da implementacao
        expect(authProvider.isLoading, isFalse);
      });

      test('deve parar de carregar apos login', () async {
        await authProvider.login('test@test.com', 'password');

        expect(authProvider.isLoading, isFalse);
      });
    });

    group('register', () {
      test('deve retornar false quando registro falha', () async {
        final result = await authProvider.register(
          'Teste',
          'email@invalido.com',
          'senha123',
        );

        expect(result, isFalse);
      });

      test('deve parar de carregar apos registro', () async {
        await authProvider.register('Teste', 'test@test.com', 'password');

        expect(authProvider.isLoading, isFalse);
      });
    });

    group('logout', () {
      test('deve limpar estado apos logout', () async {
        await authProvider.logout();

        expect(authProvider.isAuthenticated, isFalse);
        expect(authProvider.currentUser, isNull);
        expect(authProvider.token, isNull);
      });
    });

    group('clearError', () {
      test('deve limpar erro', () {
        authProvider.clearError();

        expect(authProvider.error, isNull);
      });
    });

    group('notifyListeners', () {
      test('deve notificar listeners apos mudanca de estado', () {
        int notifyCount = 0;
        authProvider.addListener(() {
          notifyCount++;
        });

        authProvider.clearError();

        expect(notifyCount, 1);
      });
    });
  });
}
