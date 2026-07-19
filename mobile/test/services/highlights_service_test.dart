import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/database/database_helper.dart';
import 'package:sola_scriptura_br/services/highlights_service.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  sqfliteFfiInit();
  databaseFactory = databaseFactoryFfi;

  setUp(() async {
    final db = await DatabaseHelper().database;
    await db.delete('highlights');
  });

  group('HighlightsService', () {
    final service = HighlightsService();

    test('adiciona destaque e persiste no SQLite', () async {
      final id = await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );

      expect(id, isPositive);

      final all = await service.getAll();
      expect(all, hasLength(1));
      expect(all.first.livro, 'gn');
      expect(all.first.capitulo, 1);
      expect(all.first.versiculo, 1);
      expect(all.first.cor, 'yellow');
      expect(all.first.traducao, 'arc');
    });

    test('atualiza cor do destaque ao adicionar novamente', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'green',
        traducao: 'arc',
      );

      final found = await service.getHighlightForVerse(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );

      expect(found, isNotNull);
      expect(found!.cor, 'green');
    });

    test('getByChapter retorna apenas versiculos do capitulo', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 5,
        cor: 'blue',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 2,
        versiculo: 1,
        cor: 'pink',
        traducao: 'arc',
      );

      final list = await service.getByChapter(
        livro: 'gn',
        capitulo: 1,
        traducao: 'arc',
      );

      expect(list, hasLength(2));
      expect(list.map((h) => h.versiculo).toList(), [1, 5]);
    });

    test('getByColor filtra corretamente', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 2,
        cor: 'green',
        traducao: 'arc',
      );
      await service.add(
        livro: 'ex',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );

      final amarelos = await service.getByColor('yellow');
      expect(amarelos, hasLength(2));

      final verdes = await service.getByColor('green');
      expect(verdes, hasLength(1));
      expect(verdes.first.livro, 'gn');
    });

    test('remove destaque por referencia', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 2,
        cor: 'blue',
        traducao: 'arc',
      );

      final removidos = await service.remove(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );

      expect(removidos, 1);

      final restantes = await service.getAll();
      expect(restantes, hasLength(1));
      expect(restantes.first.versiculo, 2);
    });

    test('count retorna total de destaques', () async {
      expect(await service.count(), 0);
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 2,
        cor: 'blue',
        traducao: 'arc',
      );
      expect(await service.count(), 2);
    });

    test('countByColor retorna total por cor', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 2,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 3,
        cor: 'blue',
        traducao: 'arc',
      );

      expect(await service.countByColor('yellow'), 2);
      expect(await service.countByColor('blue'), 1);
      expect(await service.countByColor('green'), 0);
    });

    test('getHighlightForVerse retorna null quando nao ha destaque', () async {
      final hl = await service.getHighlightForVerse(
        livro: 'gn',
        capitulo: 1,
        versiculo: 99,
        traducao: 'arc',
      );
      expect(hl, isNull);
    });

    test('traducoes diferentes sao tratadas independentemente', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'yellow',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        cor: 'blue',
        traducao: 'nvi',
      );

      final arcHl = await service.getHighlightForVerse(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      final nviHl = await service.getHighlightForVerse(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'nvi',
      );

      expect(arcHl?.cor, 'yellow');
      expect(nviHl?.cor, 'blue');
    });
  });
}
