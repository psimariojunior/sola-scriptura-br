import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/models/estudo.dart';

void main() {
  group('Estudo', () {
    group('fromJson', () {
      test('deve criar estudo a partir de JSON com todos os campos', () {
        final json = {
          'slug': 'genesis-creacao',
          'titulo': 'A Criacao no Livro de Genesis',
          'autor': 'Dr. Joao Silva',
          'data': '2024-01-15',
          'contexto': 'O livro de Genesis apresenta a narrativa da criacao.',
          'versiculos_chave': ['Gênesis 1:1', 'Gênesis 1:27', 'Gênesis 2:7'],
        };

        final estudo = Estudo.fromJson(json);

        expect(estudo.slug, 'genesis-creacao');
        expect(estudo.titulo, 'A Criacao no Livro de Genesis');
        expect(estudo.autor, 'Dr. Joao Silva');
        expect(estudo.data, '2024-01-15');
        expect(estudo.contexto, 'O livro de Genesis apresenta a narrativa da criacao.');
        expect(estudo.versiculosChave, ['Gênesis 1:1', 'Gênesis 1:27', 'Gênesis 2:7']);
      });

      test('deve criar estudo usando chaves em ingles', () {
        final json = {
          'slug': 'romans-justification',
          'title': 'Justification by Faith in Romans',
          'author': 'Paulo Apóstolo',
          'date': '2024-03-20',
          'context': 'Romanos discute a justificacao pela fe.',
          'key_verses': ['Romanos 1:17', 'Romanos 3:28', 'Romanos 5:1'],
        };

        final estudo = Estudo.fromJson(json);

        expect(estudo.slug, 'romans-justification');
        expect(estudo.titulo, 'Justification by Faith in Romans');
        expect(estudo.autor, 'Paulo Apóstolo');
        expect(estudo.data, '2024-03-20');
        expect(estudo.contexto, 'Romanos discute a justificacao pela fe.');
        expect(estudo.versiculosChave, ['Romanos 1:17', 'Romanos 3:28', 'Romanos 5:1']);
      });

      test('deve criar estudo com campos obrigatorios apenas', () {
        final json = {
          'slug': 'joao-amor',
          'titulo': 'O Amor em João',
          'autor': 'Maria Santos',
        };

        final estudo = Estudo.fromJson(json);

        expect(estudo.slug, 'joao-amor');
        expect(estudo.titulo, 'O Amor em João');
        expect(estudo.autor, 'Maria Santos');
        expect(estudo.data, isNull);
        expect(estudo.contexto, isNull);
        expect(estudo.versiculosChave, isEmpty);
      });

      test('deve retornar valores padrao para campos ausentes', () {
        final json = <String, dynamic>{};

        final estudo = Estudo.fromJson(json);

        expect(estudo.slug, '');
        expect(estudo.titulo, '');
        expect(estudo.autor, '');
        expect(estudo.data, isNull);
        expect(estudo.contexto, isNull);
        expect(estudo.versiculosChave, isEmpty);
      });
    });

    group('toJson', () {
      test('deve serializar todos os campos', () {
        const estudo = Estudo(
          slug: 'genesis-creacao',
          titulo: 'A Criacao',
          autor: 'Dr. Joao',
          data: '2024-01-15',
          contexto: 'Contexto do estudo.',
          versiculosChave: ['Gênesis 1:1'],
        );

        final json = estudo.toJson();

        expect(json['slug'], 'genesis-creacao');
        expect(json['titulo'], 'A Criacao');
        expect(json['autor'], 'Dr. Joao');
        expect(json['data'], '2024-01-15');
        expect(json['contexto'], 'Contexto do estudo.');
        expect(json['versiculos_chave'], ['Gênesis 1:1']);
      });

      test('deve omitir campos opcionais quando nulos', () {
        const estudo = Estudo(
          slug: 'estudo-simples',
          titulo: 'Estudo Simples',
          autor: 'Autor',
        );

        final json = estudo.toJson();

        expect(json.containsKey('data'), isFalse);
        expect(json.containsKey('contexto'), isFalse);
      });
    });

    group('roundtrip fromJson/toJson', () {
      test('deve manter dados apos serializacao e desserializacao', () {
        const original = Estudo(
          slug: 'genesis-creacao',
          titulo: 'A Criacao no Livro de Genesis',
          autor: 'Dr. Joao Silva',
          data: '2024-01-15',
          contexto: 'Contexto do estudo.',
          versiculosChave: ['Gênesis 1:1', 'Gênesis 1:27'],
        );

        final json = original.toJson();
        final restaurado = Estudo.fromJson(json);

        expect(restaurado.slug, original.slug);
        expect(restaurado.titulo, original.titulo);
        expect(restaurado.autor, original.autor);
        expect(restaurado.data, original.data);
        expect(restaurado.contexto, original.contexto);
        expect(restaurado.versiculosChave, original.versiculosChave);
      });

      test('deve manter campos obrigatorios apos roundtrip', () {
        const original = Estudo(
          slug: 'estudo-simples',
          titulo: 'Estudo Simples',
          autor: 'Autor',
        );

        final json = original.toJson();
        final restaurado = Estudo.fromJson(json);

        expect(restaurado.slug, original.slug);
        expect(restaurado.titulo, original.titulo);
        expect(restaurado.autor, original.autor);
        expect(restaurado.data, isNull);
        expect(restaurado.contexto, isNull);
      });
    });

    group('equality', () {
      test('deve ser igual para estudos com mesmo slug', () {
        const e1 = Estudo(
          slug: 'genesis-creacao',
          titulo: 'Titulo A',
          autor: 'Autor A',
        );
        const e2 = Estudo(
          slug: 'genesis-creacao',
          titulo: 'Titulo B',
          autor: 'Autor B',
        );

        expect(e1, equals(e2));
      });

      test('deve ser diferente para estudos com slugs diferentes', () {
        const e1 = Estudo(
          slug: 'genesis-creacao',
          titulo: 'Titulo',
          autor: 'Autor',
        );
        const e2 = Estudo(
          slug: 'romans-faith',
          titulo: 'Titulo',
          autor: 'Autor',
        );

        expect(e1, isNot(equals(e2)));
      });
    });
  });
}
