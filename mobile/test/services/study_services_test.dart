import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/database/database_helper.dart';
import 'package:sola_scriptura_br/services/bookmarks_service.dart';
import 'package:sola_scriptura_br/services/favorites_service.dart';
import 'package:sola_scriptura_br/services/notes_service.dart';
import 'package:sola_scriptura_br/services/reading_history_service.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  sqfliteFfiInit();
  databaseFactory = databaseFactoryFfi;

  setUp(() async {
    final db = await DatabaseHelper().database;
    await db.delete('bookmarks');
    await db.delete('notas');
    await db.delete('favoritos');
    await db.delete('reading_history');
  });

  group('NotesService', () {
    final service = NotesService();

    test('adiciona nota', () async {
      final id = await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'Minha reflexao',
        traducao: 'arc',
      );
      expect(id, isPositive);

      final list = await service.getAll();
      expect(list, hasLength(1));
      expect(list.first.texto, 'Minha reflexao');
    });

    test('atualiza texto da nota', () async {
      final id = await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'Original',
        traducao: 'arc',
      );
      await service.update(id, 'Atualizado');

      final list = await service.getAll();
      expect(list.first.texto, 'Atualizado');
    });

    test('remove nota por id', () async {
      final id = await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'X',
        traducao: 'arc',
      );
      final removidos = await service.delete(id);
      expect(removidos, 1);
      expect(await service.getAll(), isEmpty);
    });

    test('getNoteForVerse retorna nota ou null', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'Anotacao',
        traducao: 'arc',
      );

      final nota = await service.getNoteForVerse(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      expect(nota, isNotNull);
      expect(nota!.texto, 'Anotacao');

      final vazio = await service.getNoteForVerse(
        livro: 'gn',
        capitulo: 1,
        versiculo: 99,
        traducao: 'arc',
      );
      expect(vazio, isNull);
    });

    test('search filtra notas por texto', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'Deus criou os ceus',
        traducao: 'arc',
      );
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 2,
        texto: 'A terra era sem forma',
        traducao: 'arc',
      );

      final resultados = await service.search('Deus');
      expect(resultados, hasLength(1));
      expect(resultados.first.texto, contains('Deus'));
    });

    test('hasNoteForVerse retorna true/false corretamente', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'X',
        traducao: 'arc',
      );

      expect(
        await service.hasNoteForVerse(
          livro: 'gn',
          capitulo: 1,
          versiculo: 1,
          traducao: 'arc',
        ),
        isTrue,
      );
      expect(
        await service.hasNoteForVerse(
          livro: 'gn',
          capitulo: 1,
          versiculo: 99,
          traducao: 'arc',
        ),
        isFalse,
      );
    });
  });

  group('FavoritesService', () {
    final service = FavoritesService();

    test('adiciona e verifica favorito', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );

      final isFav = await service.isFavorite(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      expect(isFav, isTrue);
    });

    test('remove favorito', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      final removed = await service.remove(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      expect(removed, 1);

      final isFav = await service.isFavorite(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      expect(isFav, isFalse);
    });

    test('traducoes diferentes sao independentes', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );

      final arcFav = await service.isFavorite(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'arc',
      );
      final nviFav = await service.isFavorite(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        traducao: 'nvi',
      );
      expect(arcFav, isTrue);
      expect(nviFav, isFalse);
    });
  });

  group('BookmarksService', () {
    final service = BookmarksService();

    test('adiciona marcador e verifica', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        nota: 'Marcador inicial',
      );

      final exists = await service.hasBookmark(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
      );
      expect(exists, isTrue);
    });

    test('atualiza nota do marcador', () async {
      final id = await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        nota: 'Original',
      );
      await service.updateNota(id, 'Atualizado');

      final b = await service.getByReference(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
      );
      expect(b?.nota, 'Atualizado');
    });

    test('remove marcador por referencia', () async {
      await service.add(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
      );
      final removed = await service.removeByReference(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
      );
      expect(removed, 1);
    });
  });

  group('ReadingHistoryService', () {
    final service = ReadingHistoryService();

    test('saveProgress e getLastRead', () async {
      await service.saveProgress(livro: 'gn', capitulo: 1);
      await service.saveProgress(livro: 'gn', capitulo: 2);
      await service.saveProgress(livro: 'ex', capitulo: 1);

      final last = await service.getLastRead();
      expect(last, isNotNull);
    });

    test('saveProgress atualiza timestamp em vez de duplicar', () async {
      await service.saveProgress(livro: 'gn', capitulo: 1);
      await Future<void>.delayed(const Duration(milliseconds: 5));
      await service.saveProgress(livro: 'gn', capitulo: 1);

      final history = await service.getHistory();
      expect(history, hasLength(1));
      expect(history.first.livro, 'gn');
      expect(history.first.capitulo, 1);
    });

    test('clear remove todo o historico', () async {
      await service.saveProgress(livro: 'gn', capitulo: 1);
      await service.saveProgress(livro: 'ex', capitulo: 1);
      await service.clear();
      expect(await service.getHistory(), isEmpty);
    });
  });
}
