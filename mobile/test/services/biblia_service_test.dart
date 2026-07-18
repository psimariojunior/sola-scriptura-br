import 'package:flutter_test/flutter_test.dart';
import 'package:sola_scriptura_br/services/biblia_service.dart';
import 'package:sola_scriptura_br/models/livro.dart';
import 'package:sola_scriptura_br/models/versiculo.dart';
import 'package:sola_scriptura_br/services/api_client.dart';

void main() {
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

    group('BibliaService instancia', () {
      late ApiClient apiClient;
      late BibliaService bibliaService;

      setUp(() {
        apiClient = ApiClient();
        apiClient.dispose();
        apiClient = ApiClient();
        bibliaService = BibliaService(apiClient);
      });

      tearDown(() {
        apiClient.dispose();
      });

      test('deve retornar lista de traducoes', () {
        final traducoes = bibliaService.traducoes;
        expect(traducoes, isNotEmpty);
        expect(traducoes.length, greaterThanOrEqualTo(6));
      });

      test('deve conter traducao ARC', () {
        final traducoes = bibliaService.traducoes;
        final arc = traducoes.firstWhere((t) => t.id == 'arc');
        expect(arc.nome, 'Almeida Revista e Corrigida');
      });

      test('deve conter traducao NVI', () {
        final traducoes = bibliaService.traducoes;
        final nvi = traducoes.firstWhere((t) => t.id == 'nvi');
        expect(nvi.nome, 'Nova Versao Internacional');
      });
    });
  });
}
