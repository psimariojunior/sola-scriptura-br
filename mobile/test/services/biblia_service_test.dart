import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/services/biblia_service.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await BibliaService.init();
  });

  group('BibliaService', () {
    group('livros estaticos', () {
      test('deve conter 66 livros da biblia', () {
        expect(BibliaService.livros.length, 66);
      });

      test('deve comecar com Genesis', () {
        expect(BibliaService.livros.first.abreviacao, 'gn');
        expect(BibliaService.livros.first.nome, 'Gênesis');
        expect(BibliaService.livros.first.testamento, 'AT');
      });

      test('deve terminar com Apocalipse', () {
        expect(BibliaService.livros.last.abreviacao, 'ap');
        expect(BibliaService.livros.last.nome, 'Apocalipse');
        expect(BibliaService.livros.last.testamento, 'NT');
      });

      test('deve conter livros do Antigo Testamento', () {
        final atBooks = BibliaService.livros
            .where((l) => l.testamento == 'AT')
            .toList();
        expect(atBooks.length, 39);
      });

      test('deve conter livros do Novo Testamento', () {
        final ntBooks = BibliaService.livros
            .where((l) => l.testamento == 'NT')
            .toList();
        expect(ntBooks.length, 27);
      });

      test('Genesis deve ter 50 capitulos', () {
        final genesis = BibliaService.livros.firstWhere((l) => l.abreviacao == 'gn');
        expect(genesis.capitulos, 50);
      });

      test('Salmo deve ter 150 capitulos', () {
        final salmos = BibliaService.livros.firstWhere((l) => l.abreviacao == 'sl');
        expect(salmos.capitulos, 150);
      });

      test('Mateus deve ter 28 capitulos', () {
        final mateus = BibliaService.livros.firstWhere((l) => l.abreviacao == 'mt');
        expect(mateus.capitulos, 28);
      });
    });

    group('slugFromAbrev', () {
      test('deve converter abreviacao para slug corretamente', () {
        expect(BibliaService.slugFromAbrev('gn'), 'genesis');
        expect(BibliaService.slugFromAbrev('ex'), 'exodo');
        expect(BibliaService.slugFromAbrev('mt'), 'mateus');
        expect(BibliaService.slugFromAbrev('jo'), 'joao');
        expect(BibliaService.slugFromAbrev('ap'), 'apocalipse');
      });

      test('deve retornar a propria abreviacao se nao encontrar mapeamento', () {
        expect(BibliaService.slugFromAbrev('xx'), 'xx');
      });
    });

    group('abrevFromSlug', () {
      test('deve converter slug para abreviacao corretamente', () {
        expect(BibliaService.abrevFromSlug('genesis'), 'gn');
        expect(BibliaService.abrevFromSlug('exodo'), 'ex');
        expect(BibliaService.abrevFromSlug('mateus'), 'mt');
        expect(BibliaService.abrevFromSlug('joao'), 'jo');
        expect(BibliaService.abrevFromSlug('apocalipse'), 'ap');
      });

      test('deve retornar o proprio slug se nao encontrar mapeamento', () {
        expect(BibliaService.abrevFromSlug('livro-inexistente'), 'livro-inexistente');
      });

      test('deve ser inverso de slugFromAbrev', () {
        final abbrevs = ['gn', 'ex', 'lv', 'mt', 'mc', 'lc', 'jo', 'rm', 'ap'];
        for (final abbr in abbrevs) {
          final slug = BibliaService.slugFromAbrev(abbr);
          final backToAbbr = BibliaService.abrevFromSlug(slug);
          expect(backToAbbr, abbr,
              reason: 'Roundtrip falhou para $abbr -> $slug -> $backToAbbr');
        }
      });
    });

    group('traducoesDisponiveis', () {
      test('deve listar 6 traducoes', () {
        expect(BibliaService.traducoesDisponiveis.length, 6);
      });

      test('deve incluir arc, ara, acf, kjv, nvi, web', () {
        for (final t in ['arc', 'ara', 'acf', 'kjv', 'nvi', 'web']) {
          expect(BibliaService.traducoesDisponiveis, contains(t));
        }
      });
    });

    group('BibliaService instancia', () {
      late BibliaService bibliaService;

      setUp(() {
        bibliaService = BibliaService();
      });

      test('getTraducoesInfo deve retornar lista com 6 traducoes', () {
        final traducoes = bibliaService.getTraducoesInfo();
        expect(traducoes.length, 6);
      });

      test('getTraducoesInfo deve conter ARC', () {
        final arc = bibliaService
            .getTraducoesInfo()
            .firstWhere((t) => t.id == 'arc');
        expect(arc.nome, 'Almeida Revista e Corrigida');
      });

      test('getTraducoesInfo deve conter NVI', () {
        final nvi = bibliaService
            .getTraducoesInfo()
            .firstWhere((t) => t.id == 'nvi');
        expect(nvi.nome, 'Nova Versão Internacional');
      });

      test('getLivros deve retornar mesma lista de BibliaService.livros', () {
        expect(bibliaService.getLivros().length, BibliaService.livros.length);
      });

      test('getCapitulo deve retornar 31 versiculos para Salmos 23', () {
        final textos = bibliaService.getCapitulo('arc', 'salmos', 23);
        expect(textos.length, 31);
      });

      test('getCapitulo deve retornar vazio para traducao inexistente', () {
        final textos = bibliaService.getCapitulo('xyz', 'genesis', 1);
        expect(textos, isEmpty);
      });

      test('getTextoVersiculo deve retornar Gn 1:1', () {
        final texto = bibliaService.getTextoVersiculo('arc', 'genesis', 1, 1);
        expect(texto, isNotNull);
        expect(texto, contains('princípio'));
      });

      test('getTextoVersiculo deve retornar null para versiculo inexistente', () {
        final texto = bibliaService.getTextoVersiculo('arc', 'genesis', 1, 9999);
        expect(texto, isNull);
      });

      test('getVersiculos deve popular numero, livro e capitulo', () {
        final versiculos = bibliaService.getVersiculos(
          traducao: 'arc',
          livro: 'gn',
          capitulo: 1,
        );
        expect(versiculos, isNotEmpty);
        expect(versiculos.first.numero, 1);
        expect(versiculos.first.livro, 'gn');
        expect(versiculos.first.capitulo, 1);
        expect(versiculos.first.traducao, 'arc');
      });

      test('getTextosVersiculos deve aceitar abreviacao de livro', () {
        final textos = bibliaService.getTextosVersiculos(
          traducao: 'arc',
          livro: 'gn',
          capitulo: 1,
        );
        expect(textos, isNotEmpty);
      });
    });
  });
}
