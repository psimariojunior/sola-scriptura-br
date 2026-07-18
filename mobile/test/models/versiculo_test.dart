import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/models/versiculo.dart';

void main() {
  group('Versiculo', () {
    group('fromJson', () {
      test('deve criar versiculo a partir de JSON com todos os campos', () {
        final json = {
          'numero': 1,
          'texto': 'No principio criou Deus os ceus e a terra.',
          'traducao': 'ARC',
          'livro': 'Gênesis',
          'capitulo': 1,
        };

        final versiculo = Versiculo.fromJson(json);

        expect(versiculo.numero, 1);
        expect(versiculo.texto, 'No principio criou Deus os ceus e a terra.');
        expect(versiculo.traducao, 'ARC');
        expect(versiculo.livro, 'Gênesis');
        expect(versiculo.capitulo, 1);
      });

      test('deve criar versiculo com campos nulos usando chaves em ingles', () {
        final json = {
          'verse': 3,
          'text': 'E disse Deus: Haja luz; e houve luz.',
          'translation': 'NVI',
          'book': 'Gênesis',
          'chapter': 1,
        };

        final versiculo = Versiculo.fromJson(json);

        expect(versiculo.numero, 3);
        expect(versiculo.texto, 'E disse Deus: Haja luz; e houve luz.');
        expect(versiculo.traducao, 'NVI');
        expect(versiculo.livro, 'Gênesis');
        expect(versiculo.capitulo, 1);
      });

      test('deve criar versiculo com campos obrigatorios apenas', () {
        final json = {
          'numero': 1,
          'texto': 'Texto do versiculo',
        };

        final versiculo = Versiculo.fromJson(json);

        expect(versiculo.numero, 1);
        expect(versiculo.texto, 'Texto do versiculo');
        expect(versiculo.traducao, isNull);
        expect(versiculo.livro, isNull);
        expect(versiculo.capitulo, isNull);
      });

      test('deve retornar valores padrao para campos ausentes', () {
        final json = <String, dynamic>{};

        final versiculo = Versiculo.fromJson(json);

        expect(versiculo.numero, 0);
        expect(versiculo.texto, '');
      });
    });

    group('toJson', () {
      test('deve serializar todos os campos', () {
        const versiculo = Versiculo(
          numero: 1,
          texto: 'No principio criou Deus os ceus e a terra.',
          traducao: 'ARC',
          livro: 'Gênesis',
          capitulo: 1,
        );

        final json = versiculo.toJson();

        expect(json['numero'], 1);
        expect(json['texto'], 'No principio criou Deus os ceus e a terra.');
        expect(json['traducao'], 'ARC');
        expect(json['livro'], 'Gênesis');
        expect(json['capitulo'], 1);
      });

      test('deve omitir campos nulos na serializacao', () {
        const versiculo = Versiculo(
          numero: 5,
          texto: 'Texto',
        );

        final json = versiculo.toJson();

        expect(json.containsKey('traducao'), isFalse);
        expect(json.containsKey('livro'), isFalse);
        expect(json.containsKey('capitulo'), isFalse);
      });
    });

    group('roundtrip fromJson/toJson', () {
      test('deve manter dados apos serializacao e desserializacao', () {
        const original = Versiculo(
          numero: 1,
          texto: 'No principio criou Deus os ceus e a terra.',
          traducao: 'ARC',
          livro: 'Gênesis',
          capitulo: 1,
        );

        final json = original.toJson();
        final restaurado = Versiculo.fromJson(json);

        expect(restaurado.numero, original.numero);
        expect(restaurado.texto, original.texto);
        expect(restaurado.traducao, original.traducao);
        expect(restaurado.livro, original.livro);
        expect(restaurado.capitulo, original.capitulo);
      });

      test('deve manter dados sem campos opcionais apos roundtrip', () {
        const original = Versiculo(
          numero: 10,
          texto: 'Texto simples',
        );

        final json = original.toJson();
        final restaurado = Versiculo.fromJson(json);

        expect(restaurado.numero, original.numero);
        expect(restaurado.texto, original.texto);
        expect(restaurado.traducao, isNull);
        expect(restaurado.livro, isNull);
        expect(restaurado.capitulo, isNull);
      });
    });

    group('referencia', () {
      test('deve gerar referencia completa com todos os campos', () {
        const versiculo = Versiculo(
          numero: 3,
          texto: 'Texto',
          livro: 'Gênesis',
          capitulo: 1,
        );

        expect(versiculo.referencia, 'Gênesis 1 3');
      });

      test('deve gerar referencia apenas com numero', () {
        const versiculo = Versiculo(
          numero: 1,
          texto: 'Texto',
        );

        expect(versiculo.referencia, '1');
      });
    });

    group('copyWith', () {
      test('deve copiar com campos modificados', () {
        const original = Versiculo(
          numero: 1,
          texto: 'Texto original',
          traducao: 'ARC',
        );

        final copia = original.copyWith(
          texto: 'Texto modificado',
          traducao: 'NVI',
        );

        expect(copia.numero, 1);
        expect(copia.texto, 'Texto modificado');
        expect(copia.traducao, 'NVI');
      });

      test('deve manter campos nao modificados', () {
        const original = Versiculo(
          numero: 1,
          texto: 'Texto',
          traducao: 'ARC',
          livro: 'Gênesis',
          capitulo: 1,
        );

        final copia = original.copyWith(numero: 5);

        expect(copia.numero, 5);
        expect(copia.texto, original.texto);
        expect(copia.traducao, original.traducao);
        expect(copia.livro, original.livro);
        expect(copia.capitulo, original.capitulo);
      });
    });

    group('equality', () {
      test('deve ser igual para versiculos com mesmo numero, livro e capitulo', () {
        const v1 = Versiculo(numero: 1, texto: 'A', livro: 'Gênesis', capitulo: 1);
        const v2 = Versiculo(numero: 1, texto: 'B', livro: 'Gênesis', capitulo: 1);

        expect(v1, equals(v2));
      });

      test('deve ser diferente para versiculos com numeros diferentes', () {
        const v1 = Versiculo(numero: 1, texto: 'A', livro: 'Gênesis', capitulo: 1);
        const v2 = Versiculo(numero: 2, texto: 'A', livro: 'Gênesis', capitulo: 1);

        expect(v1, isNot(equals(v2)));
      });
    });
  });
}
