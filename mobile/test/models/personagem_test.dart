import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/models/personagem.dart';

void main() {
  group('Personagem', () {
    group('fromJson', () {
      test('deve criar personagem a partir de JSON com todos os campos', () {
        final json = {
          'slug': 'abraao',
          'nome': 'Abraão',
          'resumo': 'Pai da fe, chamado por Deus para sair de Ur.',
          'testamento': 'AT',
          'referencias': ['Gênesis 12:1-3', 'Gênesis 15:6', 'Hebreus 11:8'],
        };

        final personagem = Personagem.fromJson(json);

        expect(personagem.slug, 'abraao');
        expect(personagem.nome, 'Abraão');
        expect(personagem.resumo, 'Pai da fe, chamado por Deus para sair de Ur.');
        expect(personagem.testamento, 'AT');
        expect(personagem.referencias, ['Gênesis 12:1-3', 'Gênesis 15:6', 'Hebreus 11:8']);
      });

      test('deve criar personagem usando chaves em ingles', () {
        final json = {
          'slug': 'paulo',
          'name': 'Paulo',
          'summary': 'Apostol das gentios.',
          'testament': 'NT',
          'references': ['Atos 9:1-19', 'Romanos 1:1'],
        };

        final personagem = Personagem.fromJson(json);

        expect(personagem.slug, 'paulo');
        expect(personagem.nome, 'Paulo');
        expect(personagem.resumo, 'Apostol das gentios.');
        expect(personagem.testamento, 'NT');
        expect(personagem.referencias, ['Atos 9:1-19', 'Romanos 1:1']);
      });

      test('deve criar personagem com referencias vazias', () {
        final json = {
          'slug': 'moises',
          'nome': 'Moisés',
          'resumo': 'Libertador de Israel.',
          'testamento': 'AT',
        };

        final personagem = Personagem.fromJson(json);

        expect(personagem.slug, 'moises');
        expect(personagem.referencias, isEmpty);
      });

      test('deve retornar valores padrao para campos ausentes', () {
        final json = <String, dynamic>{};

        final personagem = Personagem.fromJson(json);

        expect(personagem.slug, '');
        expect(personagem.nome, '');
        expect(personagem.resumo, '');
        expect(personagem.testamento, '');
        expect(personagem.referencias, isEmpty);
      });
    });

    group('toJson', () {
      test('deve serializar todos os campos', () {
        const personagem = Personagem(
          slug: 'abraao',
          nome: 'Abraão',
          resumo: 'Pai da fe.',
          testamento: 'AT',
          referencias: ['Gênesis 12:1-3'],
        );

        final json = personagem.toJson();

        expect(json['slug'], 'abraao');
        expect(json['nome'], 'Abraão');
        expect(json['resumo'], 'Pai da fe.');
        expect(json['testamento'], 'AT');
        expect(json['referencias'], ['Gênesis 12:1-3']);
      });
    });

    group('roundtrip fromJson/toJson', () {
      test('deve manter dados apos serializacao e desserializacao', () {
        const original = Personagem(
          slug: 'abraao',
          nome: 'Abraão',
          resumo: 'Pai da fe, chamado por Deus.',
          testamento: 'AT',
          referencias: ['Gênesis 12:1-3', 'Gênesis 15:6'],
        );

        final json = original.toJson();
        final restaurado = Personagem.fromJson(json);

        expect(restaurado.slug, original.slug);
        expect(restaurado.nome, original.nome);
        expect(restaurado.resumo, original.resumo);
        expect(restaurado.testamento, original.testamento);
        expect(restaurado.referencias, original.referencias);
      });

      test('deve manter referencias vazias apos roundtrip', () {
        const original = Personagem(
          slug: 'moises',
          nome: 'Moisés',
          resumo: 'Libertador.',
          testamento: 'AT',
        );

        final json = original.toJson();
        final restaurado = Personagem.fromJson(json);

        expect(restaurado.referencias, isEmpty);
      });
    });

    group('testamento', () {
      test('deve identificar Antigo Testamento', () {
        const personagem = Personagem(
          slug: 'abraao',
          nome: 'Abraão',
          resumo: 'Pai da fe.',
          testamento: 'AT',
        );

        expect(personagem.isAntigoTestamento, isTrue);
        expect(personagem.isNovoTestamento, isFalse);
      });

      test('deve identificar Novo Testamento', () {
        const personagem = Personagem(
          slug: 'paulo',
          nome: 'Paulo',
          resumo: 'Apostol.',
          testamento: 'NT',
        );

        expect(personagem.isAntigoTestamento, isFalse);
        expect(personagem.isNovoTestamento, isTrue);
      });
    });

    group('equality', () {
      test('deve ser igual para personagens com mesmo slug', () {
        const p1 = Personagem(
          slug: 'abraao',
          nome: 'Abraão',
          resumo: 'Resumo A',
          testamento: 'AT',
        );
        const p2 = Personagem(
          slug: 'abraao',
          nome: 'Abraão Filho',
          resumo: 'Resumo B',
          testamento: 'NT',
        );

        expect(p1, equals(p2));
      });

      test('deve ser diferente para personagens com slugs diferentes', () {
        const p1 = Personagem(
          slug: 'abraao',
          nome: 'Abraão',
          resumo: 'Resumo',
          testamento: 'AT',
        );
        const p2 = Personagem(
          slug: 'isaque',
          nome: 'Isaque',
          resumo: 'Resumo',
          testamento: 'AT',
        );

        expect(p1, isNot(equals(p2)));
      });
    });
  });
}
