import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config/api_config.dart';
import '../models/livro.dart';
import '../models/traducao.dart';
import '../models/versiculo.dart';
import '../services/cache_service.dart';
import 'api_client.dart';

class BibliaService {
  final ApiClient _client;
  final CacheService _cache = CacheService();

  BibliaService(this._client);

  static const Map<String, String> abrevParaMidvash = {
    'gn': 'genesis', 'ex': 'exodo', 'lv': 'levitico', 'nm': 'numeros',
    'dt': 'deuteronomio', 'js': 'josue', 'jz': 'juizes', 'rt': 'rute',
    '1sm': '1-samuel', '2sm': '2-samuel', '1rs': '1-reis', '2rs': '2-reis',
    '1cr': '1-cronicas', '2cr': '2-cronicas', 'ed': 'esdras', 'ne': 'neemias',
    'et': 'ester', 'jó': 'jo', 'sl': 'salmos', 'pv': 'proverbios',
    'ec': 'eclesiastes', 'ct': 'canticos', 'is': 'isaias', 'jr': 'jeremias',
    'lm': 'lamentacoes', 'ez': 'ezequiel', 'dn': 'daniel', 'os': 'oseias',
    'jl': 'joel', 'am': 'amos', 'ob': 'obadias', 'jn': 'jonas',
    'mq': 'miqueias', 'na': 'naum', 'hc': 'habacuque', 'sf': 'sofonias',
    'ag': 'ageu', 'zc': 'zacarias', 'ml': 'malaquias',
    'mt': 'mateus', 'mc': 'marcos', 'lc': 'lucas', 'jo': 'joao',
    'at': 'atos', 'rm': 'romanos', '1co': '1-corintios', '2co': '2-corintios',
    'gl': 'galatas', 'ef': 'efesios', 'fp': 'filipenses', 'cl': 'colossenses',
    '1ts': '1-tessalonicenses', '2ts': '2-tessalonicenses',
    '1tm': '1-timoteo', '2tm': '2-timoteo', 'tt': 'tito', 'fm': 'filemom',
    'hb': 'hebreus', 'tg': 'tiago', '1pe': '1-pedro', '2pe': '2-pedro',
    '1jo': '1-joao', '2jo': '2-joao', '3jo': '3-joao', 'jd': 'judas',
    'ap': 'apocalipse',
  };

  static String slugFromAbrev(String abrev) => abrevParaMidvash[abrev] ?? abrev;
  static String abrevFromSlug(String slug) {
    for (final entry in abrevParaMidvash.entries) {
      if (entry.value == slug) return entry.key;
    }
    return slug;
  }

  static const String _midvashBaseUrl = 'https://api.midvash.com/v1';

  static Future<List<String>> fetchCapitulo(
    String traducao,
    String slug,
    int capitulo,
  ) async {
    final uri = Uri.parse('$_midvashBaseUrl/$traducao/$slug/$capitulo');
    final response = await http.get(uri);
    if (response.statusCode != 200) {
      throw Exception('Falha ao carregar capitulo (status ${response.statusCode})');
    }
    final decoded = json.decode(response.body);
    if (decoded is! Map<String, dynamic>) throw Exception('Resposta inesperada da API');
    final data = decoded['data'];
    if (data is! Map<String, dynamic>) throw Exception('Campo "data" ausente');
    final verses = data['verses'];
    if (verses is! List) throw Exception('Campo "verses" ausente');
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

  static List<Livro> get livros => _livros;
  List<Traducao> get traducoes => Traducoes.lista;

  Future<List<Livro>> getLivros() async {
    // Try cache first
    final cached = await _cache.getCachedLivros();
    if (cached.isNotEmpty) {
      return cached.map((e) => Livro.fromJson(e)).toList();
    }

    // Fallback to API
    try {
      final response = await _client.get(ApiConfig.endpoint('livros'));
      final data = response.data;
      if (data is Map<String, dynamic> && data['data'] is List) {
        final livros = (data['data'] as List)
            .map((e) => Livro.fromJson(e as Map<String, dynamic>))
            .toList();
        // Cache the result
        await _cache.cacheLivros(
          (data['data'] as List).cast<Map<String, dynamic>>(),
        );
        return livros;
      }
    } catch (_) {}
    return _livros;
  }

  Future<List<Versiculo>> getVersiculos({
    required String traducao,
    required String livro,
    required int capitulo,
  }) async {
    final slug = slugFromAbrev(livro);

    // Try cache first
    final cached = await _cache.getCachedVersiculos(
      livro: slug,
      capitulo: capitulo,
      traducao: traducao,
    );
    if (cached.isNotEmpty) {
      return cached.map((e) => Versiculo.fromJson({
        'numero': e['versiculo'],
        'texto': e['texto'],
        'traducao': e['traducao'],
        'livro': e['livro'],
        'capitulo': e['capitulo'],
      })).toList();
    }

    // Fallback to API
    try {
      final path = '${ApiConfig.endpoint('versiculos')}/$traducao/$slug/$capitulo';
      final response = await _client.get(path);
      final data = response.data;
      if (data is Map<String, dynamic> && data['data'] is List) {
        final versiculos = (data['data'] as List)
            .map((e) => Versiculo.fromJson(e as Map<String, dynamic>))
            .toList();
        // Cache the result
        await _cache.cacheVersiculos(
          livro: slug,
          capitulo: capitulo,
          traducao: traducao,
          versiculos: (data['data'] as List).cast<Map<String, dynamic>>(),
        );
        return versiculos;
      }
    } catch (_) {}
    return [];
  }

  Future<List<String>> getTextosVersiculos({
    required String traducao,
    required String livro,
    required int capitulo,
  }) async {
    final versiculos = await getVersiculos(
      traducao: traducao,
      livro: livro,
      capitulo: capitulo,
    );
    return versiculos.map((v) => v.texto).toList();
  }

  static final List<Livro> _livros = [
    const Livro(abreviacao: 'gn', slug: 'genesis', nome: 'Gênesis', testamento: 'AT', capitulos: 50, ordem: 1),
    const Livro(abreviacao: 'ex', slug: 'exodo', nome: 'Êxodo', testamento: 'AT', capitulos: 40, ordem: 2),
    const Livro(abreviacao: 'lv', slug: 'levitico', nome: 'Levítico', testamento: 'AT', capitulos: 27, ordem: 3),
    const Livro(abreviacao: 'nm', slug: 'numeros', nome: 'Números', testamento: 'AT', capitulos: 36, ordem: 4),
    const Livro(abreviacao: 'dt', slug: 'deuteronomio', nome: 'Deuteronômio', testamento: 'AT', capitulos: 34, ordem: 5),
    const Livro(abreviacao: 'js', slug: 'josue', nome: 'Josué', testamento: 'AT', capitulos: 24, ordem: 6),
    const Livro(abreviacao: 'jz', slug: 'juizes', nome: 'Juízes', testamento: 'AT', capitulos: 21, ordem: 7),
    const Livro(abreviacao: 'rt', slug: 'rute', nome: 'Rute', testamento: 'AT', capitulos: 4, ordem: 8),
    const Livro(abreviacao: '1sm', slug: '1-samuel', nome: '1 Samuel', testamento: 'AT', capitulos: 31, ordem: 9),
    const Livro(abreviacao: '2sm', slug: '2-samuel', nome: '2 Samuel', testamento: 'AT', capitulos: 24, ordem: 10),
    const Livro(abreviacao: '1rs', slug: '1-reis', nome: '1 Reis', testamento: 'AT', capitulos: 22, ordem: 11),
    const Livro(abreviacao: '2rs', slug: '2-reis', nome: '2 Reis', testamento: 'AT', capitulos: 25, ordem: 12),
    const Livro(abreviacao: '1cr', slug: '1-cronicas', nome: '1 Crônicas', testamento: 'AT', capitulos: 29, ordem: 13),
    const Livro(abreviacao: '2cr', slug: '2-cronicas', nome: '2 Crônicas', testamento: 'AT', capitulos: 36, ordem: 14),
    const Livro(abreviacao: 'ed', slug: 'esdras', nome: 'Esdras', testamento: 'AT', capitulos: 10, ordem: 15),
    const Livro(abreviacao: 'ne', slug: 'neemias', nome: 'Neemias', testamento: 'AT', capitulos: 13, ordem: 16),
    const Livro(abreviacao: 'et', slug: 'ester', nome: 'Ester', testamento: 'AT', capitulos: 10, ordem: 17),
    const Livro(abreviacao: 'jó', slug: 'jo', nome: 'Jó', testamento: 'AT', capitulos: 42, ordem: 18),
    const Livro(abreviacao: 'sl', slug: 'salmos', nome: 'Salmos', testamento: 'AT', capitulos: 150, ordem: 19),
    const Livro(abreviacao: 'pv', slug: 'proverbios', nome: 'Provérbios', testamento: 'AT', capitulos: 31, ordem: 20),
    const Livro(abreviacao: 'ec', slug: 'eclesiastes', nome: 'Eclesiastes', testamento: 'AT', capitulos: 12, ordem: 21),
    const Livro(abreviacao: 'ct', slug: 'canticos', nome: 'Cantares', testamento: 'AT', capitulos: 8, ordem: 22),
    const Livro(abreviacao: 'is', slug: 'isaias', nome: 'Isaías', testamento: 'AT', capitulos: 66, ordem: 23),
    const Livro(abreviacao: 'jr', slug: 'jeremias', nome: 'Jeremias', testamento: 'AT', capitulos: 52, ordem: 24),
    const Livro(abreviacao: 'lm', slug: 'lamentacoes', nome: 'Lamentações', testamento: 'AT', capitulos: 5, ordem: 25),
    const Livro(abreviacao: 'ez', slug: 'ezequiel', nome: 'Ezequiel', testamento: 'AT', capitulos: 48, ordem: 26),
    const Livro(abreviacao: 'dn', slug: 'daniel', nome: 'Daniel', testamento: 'AT', capitulos: 12, ordem: 27),
    const Livro(abreviacao: 'os', slug: 'oseias', nome: 'Oseias', testamento: 'AT', capitulos: 14, ordem: 28),
    const Livro(abreviacao: 'jl', slug: 'joel', nome: 'Joel', testamento: 'AT', capitulos: 3, ordem: 29),
    const Livro(abreviacao: 'am', slug: 'amos', nome: 'Amós', testamento: 'AT', capitulos: 9, ordem: 30),
    const Livro(abreviacao: 'ob', slug: 'obadias', nome: 'Obadias', testamento: 'AT', capitulos: 1, ordem: 31),
    const Livro(abreviacao: 'jn', slug: 'jonas', nome: 'Jonas', testamento: 'AT', capitulos: 4, ordem: 32),
    const Livro(abreviacao: 'mq', slug: 'miqueias', nome: 'Miquéias', testamento: 'AT', capitulos: 7, ordem: 33),
    const Livro(abreviacao: 'na', slug: 'naum', nome: 'Naum', testamento: 'AT', capitulos: 3, ordem: 34),
    const Livro(abreviacao: 'hc', slug: 'habacuque', nome: 'Habacuque', testamento: 'AT', capitulos: 3, ordem: 35),
    const Livro(abreviacao: 'sf', slug: 'sofonias', nome: 'Sofonias', testamento: 'AT', capitulos: 3, ordem: 36),
    const Livro(abreviacao: 'ag', slug: 'ageu', nome: 'Ageu', testamento: 'AT', capitulos: 2, ordem: 37),
    const Livro(abreviacao: 'zc', slug: 'zacarias', nome: 'Zacarias', testamento: 'AT', capitulos: 14, ordem: 38),
    const Livro(abreviacao: 'ml', slug: 'malaquias', nome: 'Malaquias', testamento: 'AT', capitulos: 4, ordem: 39),
    const Livro(abreviacao: 'mt', slug: 'mateus', nome: 'Mateus', testamento: 'NT', capitulos: 28, ordem: 40),
    const Livro(abreviacao: 'mc', slug: 'marcos', nome: 'Marcos', testamento: 'NT', capitulos: 16, ordem: 41),
    const Livro(abreviacao: 'lc', slug: 'lucas', nome: 'Lucas', testamento: 'NT', capitulos: 24, ordem: 42),
    const Livro(abreviacao: 'jo', slug: 'joao', nome: 'João', testamento: 'NT', capitulos: 21, ordem: 43),
    const Livro(abreviacao: 'at', slug: 'atos', nome: 'Atos', testamento: 'NT', capitulos: 28, ordem: 44),
    const Livro(abreviacao: 'rm', slug: 'romanos', nome: 'Romanos', testamento: 'NT', capitulos: 16, ordem: 45),
    const Livro(abreviacao: '1co', slug: '1-corintios', nome: '1 Coríntios', testamento: 'NT', capitulos: 16, ordem: 46),
    const Livro(abreviacao: '2co', slug: '2-corintios', nome: '2 Coríntios', testamento: 'NT', capitulos: 13, ordem: 47),
    const Livro(abreviacao: 'gl', slug: 'galatas', nome: 'Gálatas', testamento: 'NT', capitulos: 6, ordem: 48),
    const Livro(abreviacao: 'ef', slug: 'efesios', nome: 'Efésios', testamento: 'NT', capitulos: 6, ordem: 49),
    const Livro(abreviacao: 'fp', slug: 'filipenses', nome: 'Filipenses', testamento: 'NT', capitulos: 4, ordem: 50),
    const Livro(abreviacao: 'cl', slug: 'colossenses', nome: 'Colossenses', testamento: 'NT', capitulos: 4, ordem: 51),
    const Livro(abreviacao: '1ts', slug: '1-tessalonicenses', nome: '1 Tessalonicenses', testamento: 'NT', capitulos: 5, ordem: 52),
    const Livro(abreviacao: '2ts', slug: '2-tessalonicenses', nome: '2 Tessalonicenses', testamento: 'NT', capitulos: 3, ordem: 53),
    const Livro(abreviacao: '1tm', slug: '1-timoteo', nome: '1 Timóteo', testamento: 'NT', capitulos: 6, ordem: 54),
    const Livro(abreviacao: '2tm', slug: '2-timoteo', nome: '2 Timóteo', testamento: 'NT', capitulos: 4, ordem: 55),
    const Livro(abreviacao: 'tt', slug: 'tito', nome: 'Tito', testamento: 'NT', capitulos: 3, ordem: 56),
    const Livro(abreviacao: 'fm', slug: 'filemom', nome: 'Filêmon', testamento: 'NT', capitulos: 1, ordem: 57),
    const Livro(abreviacao: 'hb', slug: 'hebreus', nome: 'Hebreus', testamento: 'NT', capitulos: 13, ordem: 58),
    const Livro(abreviacao: 'tg', slug: 'tiago', nome: 'Tiago', testamento: 'NT', capitulos: 5, ordem: 59),
    const Livro(abreviacao: '1pe', slug: '1-pedro', nome: '1 Pedro', testamento: 'NT', capitulos: 5, ordem: 60),
    const Livro(abreviacao: '2pe', slug: '2-pedro', nome: '2 Pedro', testamento: 'NT', capitulos: 3, ordem: 61),
    const Livro(abreviacao: '1jo', slug: '1-joao', nome: '1 João', testamento: 'NT', capitulos: 5, ordem: 62),
    const Livro(abreviacao: '2jo', slug: '2-joao', nome: '2 João', testamento: 'NT', capitulos: 1, ordem: 63),
    const Livro(abreviacao: '3jo', slug: '3-joao', nome: '3 João', testamento: 'NT', capitulos: 1, ordem: 64),
    const Livro(abreviacao: 'jd', slug: 'judas', nome: 'Judas', testamento: 'NT', capitulos: 1, ordem: 65),
    const Livro(abreviacao: 'ap', slug: 'apocalipse', nome: 'Apocalipse', testamento: 'NT', capitulos: 22, ordem: 66),
  ];
}
