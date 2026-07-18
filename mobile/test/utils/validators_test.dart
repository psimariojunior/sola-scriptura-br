import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/utils/validators.dart';

void main() {
  group('Validators', () {
    group('email', () {
      test('deve retornar null para email valido', () {
        expect(Validators.email('teste@exemplo.com'), isNull);
      });

      test('deve retornar null para email com subdominio', () {
        expect(Validators.email('user@mail.example.com'), isNull);
      });

      test('deve retornar erro para email nulo', () {
        expect(Validators.email(null), 'Email obrigatorio');
      });

      test('deve retornar erro para email vazio', () {
        expect(Validators.email(''), 'Email obrigatorio');
      });

      test('deve retornar erro para email com espacos', () {
        expect(Validators.email('   '), 'Email obrigatorio');
      });

      test('deve retornar erro para email sem @', () {
        expect(Validators.email('testeexemplo.com'), 'Email invalido');
      });

      test('deve retornar erro para email sem dominio', () {
        expect(Validators.email('teste@'), 'Email invalido');
      });

      test('deve retornar erro para email sem TLD', () {
        expect(Validators.email('teste@exemplo'), 'Email invalido');
      });

      test('deve retornar erro para email com espacos', () {
        expect(Validators.email('teste @exemplo.com'), 'Email invalido');
      });

      test('deve aceitar email com numeros', () {
        expect(Validators.email('user123@exemplo.com'), isNull);
      });

      test('deve aceitar email com hifens', () {
        expect(Validators.email('user-name@exemplo.com'), isNull);
      });
    });

    group('password', () {
      test('deve retornar null para senha valida', () {
        expect(Validators.password('senha1234'), isNull);
      });

      test('deve retornar null para senha com 8 caracteres', () {
        expect(Validators.password('12345678'), isNull);
      });

      test('deve retornar erro para senha nula', () {
        expect(Validators.password(null), 'Senha obrigatoria');
      });

      test('deve retornar erro para senha vazia', () {
        expect(Validators.password(''), 'Senha obrigatoria');
      });

      test('deve retornar erro para senha com menos de 8 caracteres', () {
        expect(Validators.password('1234567'), 'Minimo 8 caracteres');
      });

      test('deve retornar erro para senha com 1 caractere', () {
        expect(Validators.password('a'), 'Minimo 8 caracteres');
      });

      test('deve aceitar senha longa', () {
        expect(
          Validators.password('uma_senha_muito_longa_e_segura_123'),
          isNull,
        );
      });
    });

    group('required', () {
      test('deve retornar null para valor valido', () {
        expect(Validators.required('valor'), isNull);
      });

      test('deve retornar erro para valor nulo', () {
        expect(Validators.required(null), 'Campo obrigatorio');
      });

      test('deve retornar erro para valor vazio', () {
        expect(Validators.required(''), 'Campo obrigatorio');
      });

      test('deve retornar erro para valor com espacos apenas', () {
        expect(Validators.required('   '), 'Campo obrigatorio');
      });

      test('deve usar nome do campo na mensagem de erro', () {
        expect(Validators.required(null, 'Nome'), 'Nome obrigatorio');
      });

      test('deve usar nome do campo para valor vazio', () {
        expect(Validators.required('', 'Email'), 'Email obrigatorio');
      });
    });

    group('confirmPassword', () {
      test('deve retornar null quando senhas conferem', () {
        expect(Validators.confirmPassword('senha123', 'senha123'), isNull);
      });

      test('deve retornar erro quando confirmacao e nula', () {
        expect(
          Validators.confirmPassword(null, 'senha123'),
          'Confirmacao obrigatoria',
        );
      });

      test('deve retornar erro quando confirmacao e vazia', () {
        expect(
          Validators.confirmPassword('', 'senha123'),
          'Confirmacao obrigatoria',
        );
      });

      test('deve retornar erro quando senhas nao conferem', () {
        expect(
          Validators.confirmPassword('outra_senha', 'senha123'),
          'Senhas nao conferem',
        );
      });
    });

    group('minLength', () {
      test('deve retornar null quando valor atinge tamanho minimo', () {
        expect(Validators.minLength('abcde', 5), isNull);
      });

      test('deve retornar erro quando valor e menor que minimo', () {
        expect(
          Validators.minLength('abc', 5),
          'Campo deve ter no minimo 5 caracteres',
        );
      });

      test('deve retornar erro quando valor e nulo', () {
        expect(
          Validators.minLength(null, 5),
          'Campo deve ter no minimo 5 caracteres',
        );
      });

      test('deve usar nome do campo na mensagem', () {
        expect(
          Validators.minLength('ab', 5, 'Nome'),
          'Nome deve ter no minimo 5 caracteres',
        );
      });
    });

    group('maxLength', () {
      test('deve retornar null quando valor nao excede maximo', () {
        expect(Validators.maxLength('abc', 5), isNull);
      });

      test('deve retornar null quando valor e nulo', () {
        expect(Validators.maxLength(null, 5), isNull);
      });

      test('deve retornar erro quando valor excede maximo', () {
        expect(
          Validators.maxLength('abcdef', 5),
          'Campo deve ter no maximo 5 caracteres',
        );
      });

      test('deve usar nome do campo na mensagem', () {
        expect(
          Validators.maxLength('abcdef', 5, 'Descricao'),
          'Descricao deve ter no maximo 5 caracteres',
        );
      });
    });
  });
}
