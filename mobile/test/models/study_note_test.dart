import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/models/study_note.dart';

void main() {
  group('StudyNote', () {
    test('fromMap converte mapa SQLite', () {
      final map = {
        'id': 1,
        'livro': 'gn',
        'capitulo': 1,
        'versiculo': 1,
        'conteudo': 'No principio...',
        'criado_em': 1700000000000,
        'atualizado_em': 1700000001000,
        'traducao': 'arc',
      };

      final n = StudyNote.fromMap(map);

      expect(n.id, 1);
      expect(n.livro, 'gn');
      expect(n.capitulo, 1);
      expect(n.versiculo, 1);
      expect(n.texto, 'No principio...');
      expect(n.createdAt, 1700000000000);
      expect(n.updatedAt, 1700000001000);
      expect(n.traducao, 'arc');
    });

    test('fromMap aceita nomes em ingles', () {
      final map = {
        'livro': 'gn',
        'capitulo': 1,
        'versiculo': 1,
        'texto': 'Hello',
        'created_at': 1700000000000,
        'updated_at': 1700000001000,
        'traducao': 'arc',
      };

      final n = StudyNote.fromMap(map);
      expect(n.texto, 'Hello');
      expect(n.createdAt, 1700000000000);
    });

    test('referenciaCurta omite nome do livro', () {
      const n = StudyNote(
        livro: 'gn',
        capitulo: 1,
        versiculo: 5,
        texto: 'A',
        createdAt: 0,
        updatedAt: 0,
        traducao: 'arc',
      );
      expect(n.referenciaCurta, '1:5');
      expect(n.referencia, 'gn 1:5');
    });

    test('toMap inclui versiculo_ref para sincronizacao', () {
      const n = StudyNote(
        id: 1,
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'A',
        createdAt: 0,
        updatedAt: 0,
        traducao: 'arc',
      );
      final map = n.toMap();
      expect(map['livro'], 'gn');
      expect(map['capitulo'], 1);
      expect(map['versiculo'], 1);
      expect(map['conteudo'], 'A');
    });

    test('equality por livro/capitulo/versiculo/traducao', () {
      const a = StudyNote(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'A',
        createdAt: 0,
        updatedAt: 0,
        traducao: 'arc',
      );
      const b = StudyNote(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'B',
        createdAt: 0,
        updatedAt: 0,
        traducao: 'arc',
      );
      expect(a, equals(b));
    });

    test('copyWith mantem campos nao modificados', () {
      const original = StudyNote(
        livro: 'gn',
        capitulo: 1,
        versiculo: 1,
        texto: 'Original',
        createdAt: 0,
        updatedAt: 0,
        traducao: 'arc',
      );
      final copia = original.copyWith(texto: 'Atualizado');
      expect(copia.texto, 'Atualizado');
      expect(copia.livro, 'gn');
      expect(copia.versiculo, 1);
    });
  });
}
