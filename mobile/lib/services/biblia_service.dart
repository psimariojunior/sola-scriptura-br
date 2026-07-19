import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;

import '../models/livro.dart';
import '../models/traducao.dart';
import '../models/versiculo.dart';

class BibliaService {
  static const List<String> traducoesDisponiveis = [
    'arc', 'ara', 'acf', 'kjv', 'nvi', 'web',
  ];

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

  static final List<Livro> _livros = [];
  static final List<Traducao> _traducoesInfo = [];
  static final Map<String, Map<String, dynamic>> _biblia = {};
  static bool _initialized = false;

  BibliaService();

  static Future<void> init() async {
    if (_initialized) return;

    final livrosRaw = json.decode(
      await rootBundle.loadString('assets/data/livros.json'),
    ) as Map<String, dynamic>;
    final livrosList = livrosRaw.entries.map((e) {
      final v = e.value as Map<String, dynamic>;
      return Livro(
        abreviacao: v['abreviacao'] as String? ?? '',
        slug: e.key,
        nome: v['nome'] as String? ?? '',
        testamento: v['testamento'] as String? ?? '',
        capitulos: v['capitulos'] as int? ?? 0,
        ordem: v['ordem'] as int? ?? 0,
      );
    }).toList()
      ..sort((a, b) => a.ordem.compareTo(b.ordem));
    _livros
      ..clear()
      ..addAll(livrosList);

    final traducoesRaw = json.decode(
      await rootBundle.loadString('assets/data/traducoes.json'),
    ) as Map<String, dynamic>;
    final traducoesList = traducoesRaw.entries.map((e) {
      final v = e.value as Map<String, dynamic>;
      return Traducao(
        id: e.key,
        nome: v['nome'] as String? ?? '',
        abreviacao: v['abreviacao'] as String? ?? '',
        idioma: v['idioma'] as String? ?? 'pt',
      );
    }).toList();
    _traducoesInfo
      ..clear()
      ..addAll(traducoesList);

    // Carrega só a primeira tradução (ARC) no init
    // As demais são carregadas sob demanda
    if (traducoesDisponiveis.isNotEmpty) {
      await _carregarTraducao(traducoesDisponiveis.first);
    }

    _initialized = true;
  }

  static bool get isInitialized => _initialized;

  static List<Livro> get livros => List.unmodifiable(_livros);

  static List<String> fetchCapitulo(String traducao, String slug, int capitulo) {
    return getCapituloStatic(traducao, slug, capitulo);
  }

  static Future<void> _carregarTraducao(String traducao) async {
    if (_biblia.containsKey(traducao)) return;
    final raw = await rootBundle.loadString('assets/data/biblia-$traducao.json');
    _biblia[traducao] = json.decode(raw) as Map<String, dynamic>;
  }

  static Future<void> garantirTraducao(String traducao) async {
    if (!_biblia.containsKey(traducao)) {
      await _carregarTraducao(traducao);
    }
  }

  static List<String> getCapituloStatic(
    String traducao,
    String slug,
    int capitulo,
  ) {
    final biblia = _biblia[traducao];
    if (biblia == null) return const [];
    final livro = biblia[slug];
    if (livro is! Map<String, dynamic>) return const [];
    final cap = livro['$capitulo'];
    if (cap is! List) return const [];
    return cap.map((e) => e is String ? e : '').toList(growable: false);
  }

  static String? getTextoVersiculoStatic(
    String traducao,
    String slug,
    int capitulo,
    int versiculo,
  ) {
    final cap = getCapituloStatic(traducao, slug, capitulo);
    if (versiculo < 1 || versiculo > cap.length) return null;
    return cap[versiculo - 1];
  }

  List<Traducao> get traducoes => getTraducoesInfo();

  List<Livro> getLivros() => livros;

  List<String> getCapitulo(String traducao, String slug, int capitulo) {
    return getCapituloStatic(traducao, slug, capitulo);
  }

  String? getTextoVersiculo(
    String traducao,
    String slug,
    int capitulo,
    int versiculo,
  ) {
    return getTextoVersiculoStatic(traducao, slug, capitulo, versiculo);
  }

  List<Versiculo> getVersiculos({
    required String traducao,
    required String livro,
    required int capitulo,
  }) {
    final slug = slugFromAbrev(livro);
    final textos = getCapitulo(traducao, slug, capitulo);
    return List.generate(textos.length, (i) {
      return Versiculo(
        numero: i + 1,
        texto: textos[i],
        traducao: traducao,
        livro: livro,
        capitulo: capitulo,
      );
    });
  }

  List<String> getTextosVersiculos({
    required String traducao,
    required String livro,
    required int capitulo,
  }) {
    return getCapitulo(traducao, slugFromAbrev(livro), capitulo);
  }

  List<Traducao> getTraducoesInfo() => List.unmodifiable(_traducoesInfo);
}
