import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/database/database_helper.dart';
import 'package:sola_scriptura_br/models/highlight.dart';

void main() {
  group('Highlight', () {
    test('fromMap converte mapa SQLite para objeto', () {
      final map = {
        'id': 1,
        'livro': 'gn',
        'capitulo': 1,
        'versiculo': 1,
        'cor': 'yellow',
        'created_at': 1700000000000,
        'traducao': 'arc',
      };

      final h = Highlight.fromMap(map);

      expect(h.id, 1);
      expect(h.livro, 'gn');
      expect(h.capitulo, 1);
      expect(h.versiculo, 1);
      expect(h.cor, 'yellow');
      expect(h.createdAt, 1700000000000);
      expect(h.traducao, 'arc');
    });

    test('fromMap com campos nulos usa valores padrao', () {
      final h = Highlight.fromMap({});
      expect(h.livro, '');
      expect(h.capitulo, 0);
      expect(h.versiculo, 0);
      expect(h.cor, 'yellow');
    });

    test('toMap serializa todos os campos', () {
      final h = Highlight(
        id: 5,
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'green',
        createdAt: 1700000000000,
        traducao: 'arc',
      );
      final map = h.toMap();
      expect(map['id'], 5);
      expect(map['livro'], 'gn');
      expect(map['capitulo'], 1);
      expect(map['versiculo'], 1);
      expect(map['cor'], 'green');
      expect(map['created_at'], 1700000000000);
      expect(map['traducao'], 'arc');
    });

    test('toMap omite id quando nulo', () {
      final h = Highlight(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        createdAt: 0,
        traducao: 'arc',
      );
      final map = h.toMap();
      expect(map.containsKey('id'), isFalse);
    });

    test('copyWith retorna nova instancia com campos alterados', () {
      const original = Highlight(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        createdAt: 0,
        traducao: 'arc',
      );
      final copia = original.copyWith(cor: 'green');
      expect(copia.cor, 'green');
      expect(copia.livro, 'gn');
      expect(copia.versiculo, 1);
    });

    test('referencia gera string formatada', () {
      const h = Highlight(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        createdAt: 0,
        traducao: 'arc',
      );
      expect(h.referencia, 'gn 1:1');
    });

    test('equality considera livro, capitulo, versiculo e traducao', () {
      const a = Highlight(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        createdAt: 0,
        traducao: 'arc',
      );
      const b = Highlight(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'blue',
        createdAt: 1,
        traducao: 'arc',
      );
      expect(a, equals(b));
    });

    test('colorData retorna HighlightColor correto', () {
      const h = Highlight(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'blue',
        createdAt: 0,
        traducao: 'arc',
      );
      expect(h.colorData.id, 'blue');
    });
  });

  group('HighlightColor', () {
    test('fromId retorna cor correta', () {
      expect(HighlightColor.fromId('yellow').id, 'yellow');
      expect(HighlightColor.fromId('green').id, 'green');
      expect(HighlightColor.fromId('blue').id, 'blue');
      expect(HighlightColor.fromId('pink').id, 'pink');
    });

    test('fromId retorna amarelo para id invalido', () {
      expect(HighlightColor.fromId(null).id, 'yellow');
      expect(HighlightColor.fromId('invalido').id, 'yellow');
    });

    test('all contem 4 cores', () {
      expect(HighlightColor.all, hasLength(4));
    });
  });
}
