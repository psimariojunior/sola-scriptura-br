import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/models/livro.dart';

void main() {
  group('Livro', () {
    group('fromJson', () {
      test('deve criar livro a partir de JSON com todos os campos', () {
        final json = {
          'abreviacao': 'gn',
          'slug': 'genesis',
          'nome': 'Gênesis',
          'testamento': 'AT',
          'capitulos': 50,
          'ordem': 1,
        };

        final livro = Livro.fromJson(json);

        expect(livro.abreviacao, 'gn');
        expect(livro.slug, 'genesis');
        expect(livro.nome, 'Gênesis');
        expect(livro.testamento, 'AT');
        expect(livro.capitulos, 50);
        expect(livro.ordem, 1);
      });

      test('deve criar livro usando chaves em ingles', () {
        final json = {
          'abbreviation': 'mt',
          'slug': 'mateus',
          'name': 'Mateus',
          'testament': 'NT',
          'chapters': 28,
          'order': 40,
        };

        final livro = Livro.fromJson(json);

        expect(livro.abreviacao, 'mt');
        expect(livro.slug, 'mateus');
        expect(livro.nome, 'Mateus');
        expect(livro.testamento, 'NT');
        expect(livro.capitulos, 28);
        expect(livro.ordem, 40);
      });

      test('deve retornar valores padrao para campos ausentes', () {
        final json = <String, dynamic>{};

        final livro = Livro.fromJson(json);

        expect(livro.abreviacao, '');
        expect(livro.slug, '');
        expect(livro.nome, '');
        expect(livro.testamento, '');
        expect(livro.capitulos, 0);
        expect(livro.ordem, 0);
      });
    });

    group('toJson', () {
      test('deve serializar todos os campos', () {
        const livro = Livro(
          abreviacao: 'gn',
          slug: 'genesis',
          nome: 'Gênesis',
          testamento: 'AT',
          capitulos: 50,
          ordem: 1,
        );

        final json = livro.toJson();

        expect(json['abreviacao'], 'gn');
        expect(json['slug'], 'genesis');
        expect(json['nome'], 'Gênesis');
        expect(json['testamento'], 'AT');
        expect(json['capitulos'], 50);
        expect(json['ordem'], 1);
      });
    });

    group('roundtrip fromJson/toJson', () {
      test('deve manter dados apos serializacao e desserializacao', () {
        const original = Livro(
          abreviacao: 'gn',
          slug: 'genesis',
          nome: 'Gênesis',
          testamento: 'AT',
          capitulos: 50,
          ordem: 1,
        );

        final json = original.toJson();
        final restaurado = Livro.fromJson(json);

        expect(restaurado.abreviacao, original.abreviacao);
        expect(restaurado.slug, original.slug);
        expect(restaurado.nome, original.nome);
        expect(restaurado.testamento, original.testamento);
        expect(restaurado.capitulos, original.capitulos);
        expect(restaurado.ordem, original.ordem);
      });
    });

    group('capitulos', () {
      test('deve retornar numero correto de capitulos para Genesis', () {
        const livro = Livro(
          abreviacao: 'gn',
          slug: 'genesis',
          nome: 'Gênesis',
          testamento: 'AT',
          capitulos: 50,
        );

        expect(livro.capitulos, 50);
      });

      test('deve retornar numero correto de capitulos para Salmo', () {
        const livro = Livro(
          abreviacao: 'sl',
          slug: 'salmos',
          nome: 'Salmos',
          testamento: 'AT',
          capitulos: 150,
        );

        expect(livro.capitulos, 150);
      });

      test('deve retornar 1 capitulo para Obadias', () {
        const livro = Livro(
          abreviacao: 'ob',
          slug: 'obadias',
          nome: 'Obadias',
          testamento: 'AT',
          capitulos: 1,
        );

        expect(livro.capitulos, 1);
      });
    });

    group('testamento', () {
      test('deve identificar Antigo Testamento', () {
        const livro = Livro(
          abreviacao: 'gn',
          slug: 'genesis',
          nome: 'Gênesis',
          testamento: 'AT',
          capitulos: 50,
        );

        expect(livro.isAntigoTestamento, isTrue);
        expect(livro.isNovoTestamento, isFalse);
      });

      test('deve identificar Novo Testamento', () {
        const livro = Livro(
          abreviacao: 'mt',
          slug: 'mateus',
          nome: 'Mateus',
          testamento: 'NT',
          capitulos: 28,
        );

        expect(livro.isAntigoTestamento, isFalse);
        expect(livro.isNovoTestamento, isTrue);
      });
    });

    group('equality', () {
      test('deve ser igual para livros com mesma abreviacao', () {
        const l1 = Livro(
          abreviacao: 'gn',
          slug: 'genesis',
          nome: 'Gênesis',
          testamento: 'AT',
          capitulos: 50,
        );
        const l2 = Livro(
          abreviacao: 'gn',
          slug: 'outro-slug',
          nome: 'Outro Nome',
          testamento: 'AT',
          capitulos: 99,
        );

        expect(l1, equals(l2));
      });

      test('deve ser diferente para livros com abreviacoes diferentes', () {
        const l1 = Livro(
          abreviacao: 'gn',
          slug: 'genesis',
          nome: 'Gênesis',
          testamento: 'AT',
          capitulos: 50,
        );
        const l2 = Livro(
          abreviacao: 'ex',
          slug: 'exodo',
          nome: 'Êxodo',
          testamento: 'AT',
          capitulos: 40,
        );

        expect(l1, isNot(equals(l2)));
      });
    });
  });
}
