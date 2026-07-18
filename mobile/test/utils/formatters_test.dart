import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/utils/formatters.dart';

void main() {
  group('Formatters', () {
    group('formatDate', () {
      test('deve formatar data no padrao dd/MM/yyyy', () {
        final date = DateTime(2024, 3, 15);
        expect(Formatters.formatDate(date), '15/03/2024');
      });

      test('deve formatar primeiro dia do ano', () {
        final date = DateTime(2024, 1, 1);
        expect(Formatters.formatDate(date), '01/01/2024');
      });

      test('deve formatar ultimo dia do ano', () {
        final date = DateTime(2024, 12, 31);
        expect(Formatters.formatDate(date), '31/12/2024');
      });

      test('deve formatar dia com um digito', () {
        final date = DateTime(2024, 5, 5);
        expect(Formatters.formatDate(date), '05/05/2024');
      });
    });

    group('formatDateTime', () {
      test('deve formatar data e hora no padrao dd/MM/yyyy HH:mm', () {
        final date = DateTime(2024, 3, 15, 14, 30);
        expect(Formatters.formatDateTime(date), '15/03/2024 14:30');
      });

      test('deve formatar meia-noite', () {
        final date = DateTime(2024, 1, 1, 0, 0);
        expect(Formatters.formatDateTime(date), '01/01/2024 00:00');
      });

      test('deve formatar horario com um digito', () {
        final date = DateTime(2024, 6, 15, 9, 5);
        expect(Formatters.formatDateTime(date), '15/06/2024 09:05');
      });
    });

    group('verseReference', () {
      test('deve gerar referencia de versiculo', () {
        expect(
          Formatters.verseReference('Gênesis', 1, 1),
          'Gênesis 1:1',
        );
      });

      test('deve gerar referencia para livro de um nome', () {
        expect(
          Formatters.verseReference('João', 3, 16),
          'João 3:16',
        );
      });

      test('deve gerar referencia para versiculo alto', () {
        expect(
          Formatters.verseReference('Salmos', 119, 105),
          'Salmos 119:105',
        );
      });

      test('deve gerar referencia para livro com numero', () {
        expect(
          Formatters.verseReference('1 Coríntios', 13, 4),
          '1 Coríntios 13:4',
        );
      });
    });

    group('verseRange', () {
      test('deve gerar range de versiculos', () {
        expect(
          Formatters.verseRange('Gênesis', 1, 1, 3),
          'Gênesis 1:1-3',
        );
      });

      test('deve gerar range para versiculos altos', () {
        expect(
          Formatters.verseRange('Salmos', 119, 100, 105),
          'Salmos 119:100-105',
        );
      });
    });

    group('capitalize', () {
      test('deve colocar primeira letra em maiuscula', () {
        expect(Formatters.capitalize('hello'), 'Hello');
      });

      test('deve manter maiusculas existentes', () {
        expect(Formatters.capitalize('Hello'), 'Hello');
      });

      test('deve retornar string vazia para input vazio', () {
        expect(Formatters.capitalize(''), '');
      });

      test('deve colocar apenas primeira letra em maiuscula', () {
        expect(Formatters.capitalize('hello world'), 'Hello world');
      });

      test('deve funcionar com caracteres especiais', () {
        expect(Formatters.capitalize('ãlpha'), 'Ãlpha');
      });
    });

    group('truncate', () {
      test('deve truncar texto longo', () {
        expect(
          Formatters.truncate('Texto muito longo para exibir', 10),
          'Texto muito ...',
        );
      });

      test('deve retornar texto original se menor que maximo', () {
        expect(
          Formatters.truncate('Curto', 10),
          'Curto',
        );
      });

      test('deve retornar texto original se igual ao maximo', () {
        expect(
          Formatters.truncate('1234567890', 10),
          '1234567890',
        );
      });

      test('deve adicionar reticencias quando truncado', () {
        final result = Formatters.truncate('Texto longo', 5);
        expect(result, endsWith('...'));
      });
    });

    group('stripHtml', () {
      test('deve remover tags HTML simples', () {
        expect(
          Formatters.stripHtml('<p>Texto</p>'),
          'Texto',
        );
      });

      test('deve remover tags HTML com atributos', () {
        expect(
          Formatters.stripHtml('<div class="test">Conteudo</div>'),
          'Conteudo',
        );
      });

      test('deve remover multiplas tags', () {
        expect(
          Formatters.stripHtml('<b><i>Texto</i></b>'),
          'Texto',
        );
      });

      test('deve retornar texto vazio quando so tem tags', () {
        expect(Formatters.stripHtml('<br><hr>'), '');
      });

      test('deve manter texto sem tags', () {
        expect(Formatters.stripHtml('Texto sem tags'), 'Texto sem tags');
      });

      test('deve remover espacos em branco extras', () {
        expect(
          Formatters.stripHtml('  <p> Texto </p>  '),
          'Texto',
        );
      });
    });
  });
}
