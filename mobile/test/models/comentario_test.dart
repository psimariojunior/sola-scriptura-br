import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/models/comentario.dart';

void main() {
  group('Comentario', () {
    group('fromJson', () {
      test('deve criar comentario a partir de JSON com todos os campos', () {
        final json = {
          'id': 'com-001',
          'versiculo_ref': 'Gênesis 1:1',
          'autor': 'Matthew Henry',
          'texto': 'No principio - isso se refere ao principio da criacao.',
          'fonte': 'Commentary on the Whole Bible',
        };

        final comentario = Comentario.fromJson(json);

        expect(comentario.id, 'com-001');
        expect(comentario.versiculoRef, 'Gênesis 1:1');
        expect(comentario.autor, 'Matthew Henry');
        expect(comentario.texto, 'No principio - isso se refere ao principio da criacao.');
        expect(comentario.fonte, 'Commentary on the Whole Bible');
      });

      test('deve criar comentario usando chaves em ingles', () {
        final json = {
          'id': 'com-002',
          'verseRef': 'João 3:16',
          'author': 'Calvino',
          'text': 'Deus amou o mundo de tal maneira.',
          'source': 'Harmony of the Gospels',
        };

        final comentario = Comentario.fromJson(json);

        expect(comentario.id, 'com-002');
        expect(comentario.versiculoRef, 'João 3:16');
        expect(comentario.autor, 'Calvino');
        expect(comentario.texto, 'Deus amou o mundo de tal maneira.');
        expect(comentario.fonte, 'Harmony of the Gospels');
      });

      test('deve criar comentario com campos obrigatorios apenas', () {
        final json = {
          'id': 'com-003',
          'versiculo_ref': 'Romanos 8:28',
          'autor': 'Adam Clarke',
          'texto': 'Todas as coisas contribuem juntamente para bem.',
        };

        final comentario = Comentario.fromJson(json);

        expect(comentario.id, 'com-003');
        expect(comentario.versiculoRef, 'Romanos 8:28');
        expect(comentario.autor, 'Adam Clarke');
        expect(comentario.texto, 'Todas as coisas contribuem juntamente para bem.');
        expect(comentario.fonte, isNull);
      });

      test('deve retornar valores padrao para campos ausentes', () {
        final json = <String, dynamic>{};

        final comentario = Comentario.fromJson(json);

        expect(comentario.id, '');
        expect(comentario.versiculoRef, '');
        expect(comentario.autor, '');
        expect(comentario.texto, '');
      });
    });

    group('toJson', () {
      test('deve serializar todos os campos', () {
        const comentario = Comentario(
          id: 'com-001',
          versiculoRef: 'Gênesis 1:1',
          autor: 'Matthew Henry',
          texto: 'Comentario sobre Genesis.',
          fonte: 'Commentary on the Whole Bible',
        );

        final json = comentario.toJson();

        expect(json['id'], 'com-001');
        expect(json['versiculo_ref'], 'Gênesis 1:1');
        expect(json['autor'], 'Matthew Henry');
        expect(json['texto'], 'Comentario sobre Genesis.');
        expect(json['fonte'], 'Commentary on the Whole Bible');
      });

      test('deve omitir campo fonte quando nulo', () {
        const comentario = Comentario(
          id: 'com-002',
          versiculoRef: 'João 3:16',
          autor: 'Calvino',
          texto: 'Texto do comentario.',
        );

        final json = comentario.toJson();

        expect(json.containsKey('fonte'), isFalse);
      });
    });

    group('roundtrip fromJson/toJson', () {
      test('deve manter dados apos serializacao e desserializacao', () {
        const original = Comentario(
          id: 'com-001',
          versiculoRef: 'Gênesis 1:1',
          autor: 'Matthew Henry',
          texto: 'No principio criou Deus os ceus e a terra.',
          fonte: 'Commentary on the Whole Bible',
        );

        final json = original.toJson();
        final restaurado = Comentario.fromJson(json);

        expect(restaurado.id, original.id);
        expect(restaurado.versiculoRef, original.versiculoRef);
        expect(restaurado.autor, original.autor);
        expect(restaurado.texto, original.texto);
        expect(restaurado.fonte, original.fonte);
      });

      test('deve manter dados sem fonte apos roundtrip', () {
        const original = Comentario(
          id: 'com-003',
          versiculoRef: 'Romanos 8:28',
          autor: 'Adam Clarke',
          texto: 'Texto do comentario.',
        );

        final json = original.toJson();
        final restaurado = Comentario.fromJson(json);

        expect(restaurado.id, original.id);
        expect(restaurado.fonte, isNull);
      });
    });

    group('equality', () {
      test('deve ser igual para comentarios com mesmo id', () {
        const c1 = Comentario(
          id: 'com-001',
          versiculoRef: 'Gênesis 1:1',
          autor: 'Autor A',
          texto: 'Texto A',
        );
        const c2 = Comentario(
          id: 'com-001',
          versiculoRef: 'João 3:16',
          autor: 'Autor B',
          texto: 'Texto B',
        );

        expect(c1, equals(c2));
      });

      test('deve ser diferente para comentarios com ids diferentes', () {
        const c1 = Comentario(
          id: 'com-001',
          versiculoRef: 'Gênesis 1:1',
          autor: 'Autor',
          texto: 'Texto',
        );
        const c2 = Comentario(
          id: 'com-002',
          versiculoRef: 'Gênesis 1:1',
          autor: 'Autor',
          texto: 'Texto',
        );

        expect(c1, isNot(equals(c2)));
      });
    });
  });
}
