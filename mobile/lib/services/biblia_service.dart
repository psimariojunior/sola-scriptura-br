import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/livro.dart';
import '../models/versiculo.dart';

class BibliaService {
  static const String _baseUrl = 'https://api.midvash.com/v1';

  static const Map<String, String> abrevParaMidvash = {
    'gn': 'genesis',
    'ex': 'exodo',
    'lv': 'levitico',
    'nm': 'numeros',
    'dt': 'deuteronomio',
    'js': 'josue',
    'jz': 'juizes',
    'rt': 'rute',
    '1sm': '1-samuel',
    '2sm': '2-samuel',
    '1rs': '1-reis',
    '2rs': '2-reis',
    '1cr': '1-cronicas',
    '2cr': '2-cronicas',
    'ed': 'esdras',
    'ne': 'neemias',
    'et': 'ester',
    'jó': 'jo',
    'sl': 'salmos',
    'pv': 'proverbios',
    'ec': 'eclesiastes',
    'ct': 'canticos',
    'is': 'isaias',
    'jr': 'jeremias',
    'lm': 'lamentacoes',
    'ez': 'ezequiel',
    'dn': 'daniel',
    'os': 'oseias',
    'jl': 'joel',
    'am': 'amos',
    'ob': 'obadias',
    'jn': 'jonas',
    'mq': 'miqueias',
    'na': 'naum',
    'hc': 'habacuque',
    'sf': 'sofonias',
    'ag': 'ageu',
    'zc': 'zacarias',
    'ml': 'malaquias',
    'mt': 'mateus',
    'mc': 'marcos',
    'lc': 'lucas',
    'jo': 'joao',
    'at': 'atos',
    'rm': 'romanos',
    '1co': '1-corintios',
    '2co': '2-corintios',
    'gl': 'galatas',
    'ef': 'efesios',
    'fp': 'filipenses',
    'cl': 'colossenses',
    '1ts': '1-tessalonicenses',
    '2ts': '2-tessalonicenses',
    '1tm': '1-timoteo',
    '2tm': '2-timoteo',
    'tt': 'tito',
    'fm': 'filemom',
    'hb': 'hebreus',
    'tg': 'tiago',
    '1pe': '1-pedro',
    '2pe': '2-pedro',
    '1jo': '1-joao',
    '2jo': '2-joao',
    '3jo': '3-joao',
    'jd': 'judas',
    'ap': 'apocalipse',
  };

  static const List<Livro> livros = [
    Livro(abreviacao: 'gn', slug: 'genesis', nome: 'Gênesis', testamento: 'AT', capitulos: 50),
    Livro(abreviacao: 'ex', slug: 'exodo', nome: 'Êxodo', testamento: 'AT', capitulos: 40),
    Livro(abreviacao: 'lv', slug: 'levitico', nome: 'Levítico', testamento: 'AT', capitulos: 27),
    Livro(abreviacao: 'nm', slug: 'numeros', nome: 'Números', testamento: 'AT', capitulos: 36),
    Livro(abreviacao: 'dt', slug: 'deuteronomio', nome: 'Deuteronômio', testamento: 'AT', capitulos: 34),
    Livro(abreviacao: 'js', slug: 'josue', nome: 'Josué', testamento: 'AT', capitulos: 24),
    Livro(abreviacao: 'jz', slug: 'juizes', nome: 'Juízes', testamento: 'AT', capitulos: 21),
    Livro(abreviacao: 'rt', slug: 'rute', nome: 'Rute', testamento: 'AT', capitulos: 4),
    Livro(abreviacao: '1sm', slug: '1-samuel', nome: '1 Samuel', testamento: 'AT', capitulos: 31),
    Livro(abreviacao: '2sm', slug: '2-samuel', nome: '2 Samuel', testamento: 'AT', capitulos: 24),
    Livro(abreviacao: '1rs', slug: '1-reis', nome: '1 Reis', testamento: 'AT', capitulos: 22),
    Livro(abreviacao: '2rs', slug: '2-reis', nome: '2 Reis', testamento: 'AT', capitulos: 25),
    Livro(abreviacao: '1cr', slug: '1-cronicas', nome: '1 Crônicas', testamento: 'AT', capitulos: 29),
    Livro(abreviacao: '2cr', slug: '2-cronicas', nome: '2 Crônicas', testamento: 'AT', capitulos: 36),
    Livro(abreviacao: 'ed', slug: 'esdras', nome: 'Esdras', testamento: 'AT', capitulos: 10),
    Livro(abreviacao: 'ne', slug: 'neemias', nome: 'Neemias', testamento: 'AT', capitulos: 13),
    Livro(abreviacao: 'et', slug: 'ester', nome: 'Ester', testamento: 'AT', capitulos: 10),
    Livro(abreviacao: 'jó', slug: 'jo', nome: 'Jó', testamento: 'AT', capitulos: 42),
    Livro(abreviacao: 'sl', slug: 'salmos', nome: 'Salmos', testamento: 'AT', capitulos: 150),
    Livro(abreviacao: 'pv', slug: 'proverbios', nome: 'Provérbios', testamento: 'AT', capitulos: 31),
    Livro(abreviacao: 'ec', slug: 'eclesiastes', nome: 'Eclesiastes', testamento: 'AT', capitulos: 12),
    Livro(abreviacao: 'ct', slug: 'canticos', nome: 'Cantares', testamento: 'AT', capitulos: 8),
    Livro(abreviacao: 'is', slug: 'isaias', nome: 'Isaías', testamento: 'AT', capitulos: 66),
    Livro(abreviacao: 'jr', slug: 'jeremias', nome: 'Jeremias', testamento: 'AT', capitulos: 52),
    Livro(abreviacao: 'lm', slug: 'lamentacoes', nome: 'Lamentações', testamento: 'AT', capitulos: 5),
    Livro(abreviacao: 'ez', slug: 'ezequiel', nome: 'Ezequiel', testamento: 'AT', capitulos: 48),
    Livro(abreviacao: 'dn', slug: 'daniel', nome: 'Daniel', testamento: 'AT', capitulos: 12),
    Livro(abreviacao: 'os', slug: 'oseias', nome: 'Oseias', testamento: 'AT', capitulos: 14),
    Livro(abreviacao: 'jl', slug: 'joel', nome: 'Joel', testamento: 'AT', capitulos: 3),
    Livro(abreviacao: 'am', slug: 'amos', nome: 'Amós', testamento: 'AT', capitulos: 9),
    Livro(abreviacao: 'ob', slug: 'obadias', nome: 'Obadias', testamento: 'AT', capitulos: 1),
    Livro(abreviacao: 'jn', slug: 'jonas', nome: 'Jonas', testamento: 'AT', capitulos: 4),
    Livro(abreviacao: 'mq', slug: 'miqueias', nome: 'Miquéias', testamento: 'AT', capitulos: 7),
    Livro(abreviacao: 'na', slug: 'naum', nome: 'Naum', testamento: 'AT', capitulos: 3),
    Livro(abreviacao: 'hc', slug: 'habacuque', nome: 'Habacuque', testamento: 'AT', capitulos: 3),
    Livro(abreviacao: 'sf', slug: 'sofonias', nome: 'Sofonias', testamento: 'AT', capitulos: 3),
    Livro(abreviacao: 'ag', slug: 'ageu', nome: 'Ageu', testamento: 'AT', capitulos: 2),
    Livro(abreviacao: 'zc', slug: 'zacarias', nome: 'Zacarias', testamento: 'AT', capitulos: 14),
    Livro(abreviacao: 'ml', slug: 'malaquias', nome: 'Malaquias', testamento: 'AT', capitulos: 4),
    Livro(abreviacao: 'mt', slug: 'mateus', nome: 'Mateus', testamento: 'NT', capitulos: 28),
    Livro(abreviacao: 'mc', slug: 'marcos', nome: 'Marcos', testamento: 'NT', capitulos: 16),
    Livro(abreviacao: 'lc', slug: 'lucas', nome: 'Lucas', testamento: 'NT', capitulos: 24),
    Livro(abreviacao: 'jo', slug: 'joao', nome: 'João', testamento: 'NT', capitulos: 21),
    Livro(abreviacao: 'at', slug: 'atos', nome: 'Atos', testamento: 'NT', capitulos: 28),
    Livro(abreviacao: 'rm', slug: 'romanos', nome: 'Romanos', testamento: 'NT', capitulos: 16),
    Livro(abreviacao: '1co', slug: '1-corintios', nome: '1 Coríntios', testamento: 'NT', capitulos: 16),
    Livro(abreviacao: '2co', slug: '2-corintios', nome: '2 Coríntios', testamento: 'NT', capitulos: 13),
    Livro(abreviacao: 'gl', slug: 'galatas', nome: 'Gálatas', testamento: 'NT', capitulos: 6),
    Livro(abreviacao: 'ef', slug: 'efesios', nome: 'Efésios', testamento: 'NT', capitulos: 6),
    Livro(abreviacao: 'fp', slug: 'filipenses', nome: 'Filipenses', testamento: 'NT', capitulos: 4),
    Livro(abreviacao: 'cl', slug: 'colossenses', nome: 'Colossenses', testamento: 'NT', capitulos: 4),
    Livro(abreviacao: '1ts', slug: '1-tessalonicenses', nome: '1 Tessalonicenses', testamento: 'NT', capitulos: 5),
    Livro(abreviacao: '2ts', slug: '2-tessalonicenses', nome: '2 Tessalonicenses', testamento: 'NT', capitulos: 3),
    Livro(abreviacao: '1tm', slug: '1-timoteo', nome: '1 Timóteo', testamento: 'NT', capitulos: 6),
    Livro(abreviacao: '2tm', slug: '2-timoteo', nome: '2 Timóteo', testamento: 'NT', capitulos: 4),
    Livro(abreviacao: 'tt', slug: 'tito', nome: 'Tito', testamento: 'NT', capitulos: 3),
    Livro(abreviacao: 'fm', slug: 'filemom', nome: 'Filêmon', testamento: 'NT', capitulos: 1),
    Livro(abreviacao: 'hb', slug: 'hebreus', nome: 'Hebreus', testamento: 'NT', capitulos: 13),
    Livro(abreviacao: 'tg', slug: 'tiago', nome: 'Tiago', testamento: 'NT', capitulos: 5),
    Livro(abreviacao: '1pe', slug: '1-pedro', nome: '1 Pedro', testamento: 'NT', capitulos: 5),
    Livro(abreviacao: '2pe', slug: '2-pedro', nome: '2 Pedro', testamento: 'NT', capitulos: 3),
    Livro(abreviacao: '1jo', slug: '1-joao', nome: '1 João', testamento: 'NT', capitulos: 5),
    Livro(abreviacao: '2jo', slug: '2-joao', nome: '2 João', testamento: 'NT', capitulos: 1),
    Livro(abreviacao: '3jo', slug: '3-joao', nome: '3 João', testamento: 'NT', capitulos: 1),
    Livro(abreviacao: 'jd', slug: 'judas', nome: 'Judas', testamento: 'NT', capitulos: 1),
    Livro(abreviacao: 'ap', slug: 'apocalipse', nome: 'Apocalipse', testamento: 'NT', capitulos: 22),
  ];

  static Livro? livroPorAbreviacao(String abreviacao) {
    for (final l in livros) {
      if (l.abreviacao == abreviacao) return l;
    }
    return null;
  }

  /// Busca um capítulo de uma tradução via API Midvash.
  /// Retorna a lista de textos dos versículos (na ordem do capítulo).
  static Future<List<String>> fetchCapitulo(
    String traducao,
    String slug,
    int capitulo,
  ) async {
    final uri = Uri.parse('$_baseUrl/$traducao/$slug/$capitulo');
    final response = await http.get(uri);

    if (response.statusCode != 200) {
      throw Exception(
        'Falha ao carregar capítulo (status ${response.statusCode})',
      );
    }

    final decoded = json.decode(response.body);
    if (decoded is! Map<String, dynamic>) {
      throw Exception('Resposta inesperada da API');
    }

    final data = decoded['data'];
    if (data is! Map<String, dynamic>) {
      throw Exception('Campo "data" ausente na resposta');
    }

    final verses = data['verses'];
    if (verses is! List) {
      throw Exception('Campo "verses" ausente na resposta');
    }

    final List<String> textos = [];
    for (final v in verses) {
      if (v is Map<String, dynamic>) {
        final text = v['text'];
        textos.add(text is String ? text : '');
      } else {
        textos.add('');
      }
    }
    return textos;
  }
}
