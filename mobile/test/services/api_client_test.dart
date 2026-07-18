import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/config/api_config.dart';

void main() {
  group('ApiConfig', () {
    group('baseUrl', () {
      test('deve retornar URL base da API', () {
        expect(ApiConfig.baseUrl, 'https://api.solascripturabr.com.br/api/v1');
      });
    });

    group('endpoint', () {
      test('deve retornar endpoint correto para login', () {
        expect(ApiConfig.endpoint('auth_login'), '/auth/login');
      });

      test('deve retornar endpoint correto para cadastro', () {
        expect(ApiConfig.endpoint('auth_register'), '/auth/cadastrar');
      });

      test('deve retornar endpoint correto para logout', () {
        expect(ApiConfig.endpoint('auth_logout'), '/auth/logout');
      });

      test('deve retornar endpoint correto para livros', () {
        expect(ApiConfig.endpoint('biblia_livros'), '/biblia/livros');
      });

      test('deve retornar endpoint correto para versiculos', () {
        expect(ApiConfig.endpoint('biblia_versiculo'), '/biblia/versiculos');
      });

      test('deve retornar endpoint correto para pesquisa', () {
        expect(ApiConfig.endpoint('pesquisa'), '/pesquisa');
      });

      test('deve retornar endpoint correto para IA', () {
        expect(ApiConfig.endpoint('ia_perguntar'), '/ia/perguntar');
      });

      test('deve retornar fallback para chave desconhecida', () {
        expect(ApiConfig.endpoint('chave_desconhecida'), '/chave_desconhecida');
      });
    });

    group('endpoints', () {
      test('deve conter todos os endpoints obrigatórios', () {
        final requiredEndpoints = [
          'auth_login',
          'auth_register',
          'auth_logout',
          'auth_google',
          'biblia_livros',
          'biblia_versiculo',
          'pesquisa',
          'ia_perguntar',
          'ia_stream',
        ];

        for (final endpoint in requiredEndpoints) {
          expect(
            ApiConfig.endpoints.containsKey(endpoint),
            isTrue,
            reason: 'Endpoint "$endpoint" nao encontrado',
          );
        }
      });

      test('deve conter endpoints de autenticacao', () {
        expect(ApiConfig.endpoints.containsKey('auth_login'), isTrue);
        expect(ApiConfig.endpoints.containsKey('auth_register'), isTrue);
        expect(ApiConfig.endpoints.containsKey('auth_refresh'), isTrue);
        expect(ApiConfig.endpoints.containsKey('auth_logout'), isTrue);
        expect(ApiConfig.endpoints.containsKey('auth_google'), isTrue);
        expect(ApiConfig.endpoints.containsKey('auth_me'), isTrue);
      });

      test('deve conter endpoints da biblia', () {
        expect(ApiConfig.endpoints.containsKey('biblia_livros'), isTrue);
        expect(ApiConfig.endpoints.containsKey('biblia_capitulo'), isTrue);
        expect(ApiConfig.endpoints.containsKey('biblia_versiculo'), isTrue);
        expect(ApiConfig.endpoints.containsKey('biblia_traducoes'), isTrue);
      });
    });

    group('timeouts', () {
      test('deve ter timeout de conexao de 15 segundos', () {
        expect(ApiConfig.connectTimeout, const Duration(seconds: 15));
      });

      test('deve ter timeout de recebimento de 30 segundos', () {
        expect(ApiConfig.receiveTimeout, const Duration(seconds: 30));
      });

      test('deve ter timeout de envio de 15 segundos', () {
        expect(ApiConfig.sendTimeout, const Duration(seconds: 15));
      });
    });
  });
}
