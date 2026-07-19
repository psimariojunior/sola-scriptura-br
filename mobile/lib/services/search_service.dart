import 'dart:async';
import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/services.dart' show rootBundle;

import '../models/livro.dart';
import '../models/search_result.dart';
import 'biblia_service.dart';

typedef SearchProgressCallback = void Function(int loaded, int total, String phase);

class SearchService {
  static const List<String> _traducoes = [
    'arc', 'ara', 'acf', 'kjv', 'nvi', 'web',
  ];

  static const Map<String, String> _abrevParaNomeLivro = {
    'gn': 'Gênesis', 'ex': 'Êxodo', 'lv': 'Levítico', 'nm': 'Números',
    'dt': 'Deuteronômio', 'js': 'Josué', 'jz': 'Juízes', 'rt': 'Rute',
    '1sm': '1 Samuel', '2sm': '2 Samuel', '1rs': '1 Reis', '2rs': '2 Reis',
    '1cr': '1 Crônicas', '2cr': '2 Crônicas', 'ed': 'Esdras', 'ne': 'Neemias',
    'et': 'Ester', 'jó': 'Jó', 'sl': 'Salmos', 'pv': 'Provérbios',
    'ec': 'Eclesiastes', 'ct': 'Cânticos', 'is': 'Isaías', 'jr': 'Jeremias',
    'lm': 'Lamentações', 'ez': 'Ezequiel', 'dn': 'Daniel', 'os': 'Oseias',
    'jl': 'Joel', 'am': 'Amós', 'ob': 'Obadias', 'jn': 'Jonas',
    'mq': 'Miqueias', 'na': 'Naum', 'hc': 'Habacuque', 'sf': 'Sofonias',
    'ag': 'Ageu', 'zc': 'Zacarias', 'ml': 'Malaquias',
    'mt': 'Mateus', 'mc': 'Marcos', 'lc': 'Lucas', 'jo': 'João',
    'at': 'Atos', 'rm': 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios',
    'gl': 'Gálatas', 'ef': 'Efésios', 'fp': 'Filipenses', 'cl': 'Colossenses',
    '1ts': '1 Tessalonicenses', '2ts': '2 Tessalonicenses',
    '1tm': '1 Timóteo', '2tm': '2 Timóteo', 'tt': 'Tito', 'fm': 'Filemom',
    'hb': 'Hebreus', 'tg': 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
    '1jo': '1 João', '2jo': '2 João', '3jo': '3 João', 'jd': 'Judas',
    'ap': 'Apocalipse',
  };

  static const Set<String> _stopWords = {
    'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas',
    'de', 'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas',
    'em', 'por', 'para', 'com', 'sem', 'sob', 'sobre',
    'e', 'ou', 'mas', 'que', 'se', 'pois', 'porem', 'porém',
    'eu', 'tu', 'ele', 'ela', 'nós', 'vos', 'vós', 'eles', 'elas',
    'meu', 'minha', 'teu', 'tua', 'seu', 'sua', 'nosso', 'nossa',
    'este', 'esta', 'isto', 'esse', 'essa', 'isso', 'aquele', 'aquela', 'aquilo',
    'ao', 'aos', 'à', 'às',
  };

  final Map<String, List<int>> _invertedIndex = <String, List<int>>{};
  final List<_IndexedDoc> _docs = <_IndexedDoc>[];
  final Map<int, int> _docLengths = <int, int>{};
  bool _initialized = false;
  bool get isInitialized => _initialized;
  int get docCount => _docs.length;
  int get tokenCount => _invertedIndex.length;
  double get avgDocLength => _docCount == 0 ? 0 : _totalLength / _docCount;
  int _docCount = 0;
  int _totalLength = 0;

  static SearchService? _instance;
  static SearchService get instance => _instance ??= SearchService._();
  SearchService._();

  static Future<void> init({SearchProgressCallback? onProgress}) async {
    if (_instance != null && _instance!._initialized) return;
    final svc = instance;
    await svc._buildIndex(onProgress: onProgress);
  }

  static void reset() {
    _instance?._clear();
    _instance = null;
  }

  void _clear() {
    _invertedIndex.clear();
    _docs.clear();
    _docLengths.clear();
    _docCount = 0;
    _totalLength = 0;
    _initialized = false;
  }

  Future<void> _buildIndex({SearchProgressCallback? onProgress}) async {
    if (!BibliaService.isInitialized) {
      await BibliaService.init();
    }

    onProgress?.call(0, 100, 'Iniciando...');
    final t0 = DateTime.now();

    await _indexBible(onProgress);
    await _indexComentarios(onProgress);
    await _indexLexico(onProgress);
    await _indexPersonagens(onProgress);
    await _indexTeologia(onProgress);
    await _indexEstudos(onProgress);
    await _indexIntroducoes(onProgress);
    await _indexCriticaTextual(onProgress);
    await _indexCronologia(onProgress);
    await _indexSinopticos(onProgress);
    await _indexPericopes(onProgress);

    _docCount = _docs.length;
    _totalLength = _docLengths.values.fold(0, (a, b) => a + b);

    _initialized = true;
    final elapsed = DateTime.now().difference(t0).inMilliseconds;
    onProgress?.call(100, 100, 'Pronto em ${elapsed}ms');
  }

  Future<void> _indexBible(SearchProgressCallback? onProgress) async {
    onProgress?.call(5, 100, 'Indexando Bíblia...');

    final livros = BibliaService.livros;
    final livroPorSlug = <String, Livro>{
      for (final l in livros) l.slug: l,
    };

    int count = 0;
    for (final t in _traducoes) {
      final raw = await rootBundle.loadString('assets/data/biblia-$t.json');
      final data = json.decode(raw) as Map<String, dynamic>;

      for (final livro in livros) {
        final livroData = data[livro.slug];
        if (livroData is! Map<String, dynamic>) continue;
        for (final entry in livroData.entries) {
          final cap = int.tryParse(entry.key);
          if (cap == null) continue;
          final versiculos = entry.value;
          if (versiculos is! List) continue;

          for (int i = 0; i < versiculos.length; i++) {
            final texto = versiculos[i];
            if (texto is! String || texto.trim().isEmpty) continue;
            final ref = '${livro.abreviacao}:$cap:${i + 1}';
            final displayText = texto;
            final indexableText = texto;
            _addDoc(
              type: SearchResultType.verse,
              titulo: '${_abrevParaNomeLivro[livro.abreviacao] ?? livro.nome} $cap:${i + 1}',
              text: indexableText,
              displayText: displayText,
              reference: ref,
              traducao: t,
              livroOrdem: livro.ordem,
              capitulo: cap,
              versiculo: i + 1,
            );
            count++;
          }
        }
      }
    }
    onProgress?.call(45, 100, 'Bíblia: $count versículos');
  }

  Future<void> _indexComentarios(SearchProgressCallback? onProgress) async {
    onProgress?.call(48, 100, 'Indexando comentários...');
    final raw = await rootBundle.loadString('assets/data/comentarios.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final livro = item['livro'] as String? ?? '';
      final cap = item['capitulo'] as int? ?? 0;
      final ver = item['versiculo'] as int? ?? 0;
      final autor = item['autor'] as String? ?? '';
      final texto = item['texto'] as String? ?? '';
      final tipo = item['tipo'] as String? ?? '';
      if (texto.isEmpty) continue;
      final ref = '$livro:$cap:$ver';
      final titulo = '${_abrevParaNomeLivro[livro] ?? livro} $cap:$ver';
      final text = '$titulo. $autor ($tipo). $texto';
      _addDoc(
        type: SearchResultType.commentary,
        titulo: titulo,
        text: text,
        displayText: texto,
        reference: ref,
        autor: autor,
        livroOrdem: _ordemLivroPorAbrev(livro),
        capitulo: cap,
        versiculo: ver,
      );
      count++;
    }
    onProgress?.call(55, 100, 'Comentários: $count');
  }

  Future<void> _indexLexico(SearchProgressCallback? onProgress) async {
    onProgress?.call(57, 100, 'Indexando léxico...');
    int count = 0;
    for (final lang in const ['grego', 'hebraico']) {
      final raw = await rootBundle.loadString('assets/data/lexicon-$lang.json');
      final list = json.decode(raw) as List<dynamic>;
      for (final item in list) {
        if (item is! Map<String, dynamic>) continue;
        final strong = item['strong'] as String? ?? '';
        final palavra = item['palavra'] as String? ?? '';
        final transliteracao = item['transliteracao'] as String? ?? '';
        final definicao = item['definicao'] as String? ?? '';
        final definicaoResumida = item['definicaoResumida'] as String? ?? '';
        final uso = item['uso'] as String? ?? '';
        final notas = item['notas'] as String? ?? '';
        final categoria = item['categoria'] as String? ?? '';
        final morfologia = item['morfologia'] as String? ?? '';
        if (definicao.isEmpty && palavra.isEmpty && transliteracao.isEmpty) continue;
        final idiomaLabel = lang == 'grego' ? 'Grego' : 'Hebraico';
        final titulo = '$palavra ($transliteracao)';
        final displayText = definicaoResumida.isNotEmpty
            ? definicaoResumida
            : (morfologia.isNotEmpty ? morfologia : definicao);
        final text = '$titulo. $categoria $definicao $morfologia $uso $notas';
        _addDoc(
          type: SearchResultType.lexicon,
          titulo: titulo,
          text: text,
          displayText: displayText,
          reference: strong,
          strong: strong,
          idioma: lang,
          idiomaLabel: idiomaLabel,
        );
        count++;
      }
    }
    onProgress?.call(63, 100, 'Léxico: $count');
  }

  Future<void> _indexPersonagens(SearchProgressCallback? onProgress) async {
    onProgress?.call(65, 100, 'Indexando personagens...');
    final raw = await rootBundle.loadString('assets/data/personagens.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final slug = item['slug'] as String? ?? '';
      final nome = item['nome'] as String? ?? '';
      final resumo = item['resumo'] as String? ?? '';
      final testamento = item['testamento'] as String? ?? '';
      final nomeHebraico = item['nomeHebraico'] as String? ?? '';
      if (nome.isEmpty) continue;
      final text = '$nome. $nomeHebraico. $resumo';
      _addDoc(
        type: SearchResultType.character,
        titulo: nome,
        text: text,
        displayText: resumo,
        reference: slug,
      );
      count++;
    }
    onProgress?.call(70, 100, 'Personagens: $count');
  }

  Future<void> _indexTeologia(SearchProgressCallback? onProgress) async {
    onProgress?.call(72, 100, 'Indexando teologia...');
    final raw = await rootBundle.loadString('assets/data/teologia-sistematica.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final cat in list) {
      if (cat is! Map<String, dynamic>) continue;
      final slug = cat['slug'] as String? ?? '';
      final titulo = cat['titulo'] as String? ?? '';
      final subtitulo = cat['subtitulo'] as String? ?? '';
      final descricao = cat['descricao'] as String? ?? '';
      final capitulos = cat['capitulos'];
      if (titulo.isEmpty) continue;

      final text = '$titulo. $subtitulo. $descricao';
      _addDoc(
        type: SearchResultType.theology,
        titulo: titulo,
        text: text,
        displayText: subtitulo.isNotEmpty ? subtitulo : descricao,
        reference: slug,
      );
      count++;

      if (capitulos is List) {
        for (final cap in capitulos) {
          if (cap is! Map<String, dynamic>) continue;
          final numero = cap['numero'] as int? ?? 0;
          final capTitulo = cap['titulo'] as String? ?? '';
          final resumo = cap['resumo'] as String? ?? '';
          final conteudo = cap['conteudo'] as String? ?? '';
          if (capTitulo.isEmpty) continue;
          final capText = '$titulo $capTitulo. $resumo $conteudo';
          _addDoc(
            type: SearchResultType.theology,
            titulo: '$titulo - Cap. $numero: $capTitulo',
            text: capText,
            displayText: resumo.isNotEmpty ? resumo : conteudo,
            reference: '$slug/$numero',
          );
          count++;
        }
      }
    }
    onProgress?.call(78, 100, 'Teologia: $count');
  }

  Future<void> _indexEstudos(SearchProgressCallback? onProgress) async {
    onProgress?.call(80, 100, 'Indexando estudos...');
    final raw = await rootBundle.loadString('assets/data/estudos-teologicos.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final livro = item['livro'] as String? ?? '';
      final cap = item['capitulo'] as int? ?? 0;
      final ver = item['versiculo'] as int? ?? 0;
      final tema = item['tema'] as String? ?? '';
      final contexto = item['contexto'] as String? ?? '';
      final interpretacoes = item['interpretacoes'];
      final ref = '$livro:$cap:$ver';
      final titulo = '${_abrevParaNomeLivro[livro] ?? livro} $cap:$ver — $tema';
      final buf = StringBuffer('$titulo. $contexto. ');
      if (interpretacoes is List) {
        for (final interp in interpretacoes) {
          if (interp is! Map<String, dynamic>) continue;
          final teologo = interp['teologo'] as String? ?? '';
          final resumo = interp['resumo'] as String? ?? '';
          final visao = interp['visao'] as String? ?? '';
          buf.write('$teologo ($visao): $resumo. ');
        }
      }
      final text = buf.toString();
      _addDoc(
        type: SearchResultType.study,
        titulo: titulo,
        text: text,
        displayText: contexto,
        reference: ref,
        livroOrdem: _ordemLivroPorAbrev(livro),
        capitulo: cap,
        versiculo: ver,
      );
      count++;
    }
    onProgress?.call(83, 100, 'Estudos: $count');
  }

  Future<void> _indexIntroducoes(SearchProgressCallback? onProgress) async {
    onProgress?.call(84, 100, 'Indexando introduções...');
    final raw = await rootBundle.loadString('assets/data/introducoes.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final nome = item['nome'] as String? ?? '';
      final livro = item['livro'] as String? ?? '';
      final autor = item['autor'] as String? ?? '';
      final temaPrincipal = item['temaPrincipal'] as String? ?? '';
      final contextoHistorico = item['contextoHistorico'] as String? ?? '';
      final contribuicaoTeologica = item['contribuicaoTeologica'] as String? ?? '';
      if (nome.isEmpty) continue;
      final text = '$nome. $autor. $temaPrincipal $contextoHistorico $contribuicaoTeologica';
      _addDoc(
        type: SearchResultType.introduction,
        titulo: 'Introdução: $nome',
        text: text,
        displayText: temaPrincipal,
        reference: livro,
        livroOrdem: _ordemLivroPorAbrev(livro),
      );
      count++;
    }
    onProgress?.call(86, 100, 'Introduções: $count');
  }

  Future<void> _indexCriticaTextual(SearchProgressCallback? onProgress) async {
    onProgress?.call(87, 100, 'Indexando crítica textual...');
    final raw = await rootBundle.loadString('assets/data/critica-textual.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final id = item['id'] as String? ?? '';
      final ref = item['referencia'] as String? ?? '';
      final pericope = item['pericope'] as String? ?? '';
      final descricao = item['descricao'] as String? ?? '';
      final tipo = item['tipo'] as String? ?? '';
      if (descricao.isEmpty) continue;
      final titulo = 'Crítica Textual: $pericope';
      final text = '$titulo ($tipo). $descricao';
      _addDoc(
        type: SearchResultType.textualCriticism,
        titulo: titulo,
        text: text,
        displayText: descricao,
        reference: id,
      );
      count++;
    }
    onProgress?.call(88, 100, 'Crítica textual: $count');
  }

  Future<void> _indexCronologia(SearchProgressCallback? onProgress) async {
    onProgress?.call(89, 100, 'Indexando cronologia...');
    final raw = await rootBundle.loadString('assets/data/cronologia.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final evento = item['evento'] as String? ?? '';
      final ano = item['ano'] as String? ?? '';
      final referencia = item['referencia'] as String? ?? '';
      final tipo = item['tipo'] as String? ?? '';
      if (evento.isEmpty) continue;
      final text = '$evento. $ano. $tipo';
      _addDoc(
        type: SearchResultType.chronology,
        titulo: evento,
        text: text,
        displayText: '$ano — $evento',
        reference: referencia,
      );
      count++;
    }
    onProgress?.call(90, 100, 'Cronologia: $count');
  }

  Future<void> _indexSinopticos(SearchProgressCallback? onProgress) async {
    onProgress?.call(91, 100, 'Indexando sinópticos...');
    final raw = await rootBundle.loadString('assets/data/sinopticos.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final id = item['id'] as String? ?? '';
      final titulo = item['titulo'] as String? ?? '';
      final categoria = item['categoria'] as String? ?? '';
      final notas = item['notas'] as String? ?? '';
      if (titulo.isEmpty) continue;
      final text = '$titulo. $categoria. $notas';
      _addDoc(
        type: SearchResultType.synoptic,
        titulo: titulo,
        text: text,
        displayText: notas,
        reference: id,
      );
      count++;
    }
    onProgress?.call(92, 100, 'Sinópticos: $count');
  }

  Future<void> _indexPericopes(SearchProgressCallback? onProgress) async {
    onProgress?.call(93, 100, 'Indexando perícopes...');
    final raw = await rootBundle.loadString('assets/data/pericopes.json');
    final list = json.decode(raw) as List<dynamic>;
    int count = 0;
    for (final item in list) {
      if (item is! Map<String, dynamic>) continue;
      final id = item['id'] as String? ?? '';
      final livro = item['livro'] as String? ?? '';
      final titulo = item['titulo'] as String? ?? '';
      final tema = item['tema'] as String? ?? '';
      final genero = item['genero'] as String? ?? '';
      if (titulo.isEmpty) continue;
      final text = '$titulo. $tema. $genero';
      _addDoc(
        type: SearchResultType.pericope,
        titulo: 'Perícope: $titulo',
        text: text,
        displayText: '$livro — $titulo',
        reference: id,
      );
      count++;
    }
    onProgress?.call(95, 100, 'Perícopas: $count');
  }

  int _addDoc({
    required SearchResultType type,
    required String titulo,
    required String text,
    required String displayText,
    String? reference,
    String? traducao,
    String? autor,
    String? strong,
    String? idioma,
    String? idiomaLabel,
    int? livroOrdem,
    int? capitulo,
    int? versiculo,
  }) {
    final id = _docs.length;
    final doc = _IndexedDoc(
      id: id,
      type: type,
      titulo: titulo,
      text: text,
      displayText: displayText,
      reference: reference,
      traducao: traducao,
      autor: autor,
      strong: strong,
      idioma: idioma,
      idiomaLabel: idiomaLabel,
      livroOrdem: livroOrdem,
      capitulo: capitulo,
      versiculo: versiculo,
    );
    _docs.add(doc);

    final tokens = tokenize(text);
    _docLengths[id] = tokens.length;

    final counts = <String, int>{};
    for (final tok in tokens) {
      if (tok.length < 2) continue;
      counts[tok] = (counts[tok] ?? 0) + 1;
    }

    for (final entry in counts.entries) {
      final list = _invertedIndex.putIfAbsent(entry.key, () => <int>[]);
      list.add(id);
    }

    return id;
  }

  int _ordemLivroPorAbrev(String abrev) {
    for (final livro in BibliaService.livros) {
      if (livro.abreviacao == abrev) return livro.ordem;
    }
    return 9999;
  }

  static List<String> tokenize(String input) {
    if (input.isEmpty) return const [];
    final lower = input.toLowerCase();
    final normalized = _stripAccents(lower);
    final tokens = <String>[];
    final buf = StringBuffer();
    for (var i = 0; i < normalized.length; i++) {
      final ch = normalized.codeUnitAt(i);
      final isLetter = (ch >= 0x61 && ch <= 0x7a) ||
          (ch >= 0x00C0 && ch <= 0x024F) ||
          ch == 0x00B7;
      if (isLetter) {
        buf.writeCharCode(ch);
      } else if (buf.isNotEmpty) {
        final t = buf.toString();
        if (t.length >= 2 && !_stopWords.contains(t)) {
          tokens.add(t);
        }
        buf.clear();
      }
    }
    if (buf.isNotEmpty) {
      final t = buf.toString();
      if (t.length >= 2 && !_stopWords.contains(t)) {
        tokens.add(t);
      }
    }
    return tokens;
  }

  static String _stripAccents(String input) {
    final sb = StringBuffer();
    for (var i = 0; i < input.length; i++) {
      final ch = input[i];
      final decomposed = _decomposeChar(ch);
      for (final c in decomposed) {
        if (_isCombiningMark(c)) continue;
        sb.write(c);
      }
    }
    return sb.toString();
  }

  static List<String> _decomposeChar(String ch) {
    final code = ch.codeUnitAt(0);
    final replacement = _accentMap[code];
    if (replacement != null) {
      return [replacement];
    }
    return [ch];
  }

  static const Map<int, String> _accentMap = {
    0x00E1: 'a', 0x00E0: 'a', 0x00E2: 'a', 0x00E3: 'a', 0x00E4: 'a', 0x00E5: 'a',
    0x00E7: 'c',
    0x00E9: 'e', 0x00E8: 'e', 0x00EA: 'e', 0x00EB: 'e',
    0x00ED: 'i', 0x00EC: 'i', 0x00EE: 'i', 0x00EF: 'i',
    0x00F1: 'n',
    0x00F3: 'o', 0x00F2: 'o', 0x00F4: 'o', 0x00F5: 'o', 0x00F6: 'o',
    0x00FA: 'u', 0x00F9: 'u', 0x00FB: 'u', 0x00FC: 'u',
    0x00FD: 'y', 0x00FF: 'y',
    0x00E6: 'a', 0x0153: 'o',
    0x00C1: 'a', 0x00C0: 'a', 0x00C2: 'a', 0x00C3: 'a', 0x00C4: 'a', 0x00C5: 'a',
    0x00C7: 'c',
    0x00C9: 'e', 0x00C8: 'e', 0x00CA: 'e', 0x00CB: 'e',
    0x00CD: 'i', 0x00CC: 'i', 0x00CE: 'i', 0x00CF: 'i',
    0x00D1: 'n',
    0x00D3: 'o', 0x00D2: 'o', 0x00D4: 'o', 0x00D5: 'o', 0x00D6: 'o',
    0x00DA: 'u', 0x00D9: 'u', 0x00DB: 'u', 0x00DC: 'u',
    0x00DD: 'y',
    0x00C6: 'a', 0x0152: 'o',
    0x00DF: 's',
  };

  static bool _isCombiningMark(String c) {
    if (c.isEmpty) return false;
    final code = c.codeUnitAt(0);
    return code >= 0x0300 && code <= 0x036F;
  }

  List<SearchResult> search(
    String query, {
    Set<SearchResultType>? filter,
    int limit = 50,
  }) {
    if (!_initialized) return const [];
    final tokens = tokenize(query);
    if (tokens.isEmpty) return const [];

    final candidates = _retrieveCandidates(tokens);

    final scores = <int, double>{};
    final k1 = 1.2;
    final b = 0.75;
    final avgDl = avgDocLength == 0 ? 1.0 : avgDocLength;
    final N = _docCount.toDouble();
    for (final token in tokens) {
      final posting = _invertedIndex[token];
      if (posting == null || posting.isEmpty) continue;
      final df = posting.length;
      final idf = math.log(1 + (N - df + 0.5) / (df + 0.5));
      for (final docId in posting) {
        if (candidates != null && !candidates.contains(docId)) continue;
        final dl = _docLengths[docId] ?? 1;
        final tf = _getTermFreq(docId, token);
        final norm = 1 - b + b * dl / avgDl;
        final bm25 = (tf * (k1 + 1)) / (tf + k1 * norm);
        scores[docId] = (scores[docId] ?? 0) + bm25 * idf;
      }
    }

    final maxScore = scores.values.isEmpty
        ? 1.0
        : scores.values.reduce(math.max);

    final filterSet = filter;
    final results = <SearchResult>[];
    final sortedKeys = scores.keys.toList()
      ..sort((a, b) {
        final cmp = scores[b]!.compareTo(scores[a]!);
        if (cmp != 0) return cmp;
        return _docs[a].compareTo(_docs[b]);
      });

    for (final docId in sortedKeys) {
      if (results.length >= limit) break;
      final doc = _docs[docId];
      if (filterSet != null && filterSet.isNotEmpty && !filterSet.contains(doc.type)) {
        continue;
      }
      final snippet = _buildSnippet(doc, tokens);
      results.add(SearchResult(
        tipo: doc.type,
        titulo: doc.titulo,
        trecho: snippet,
        referencia: doc.reference,
        relevancia: maxScore == 0 ? 0 : scores[docId]! / maxScore,
        traducao: doc.traducao,
        autor: doc.autor,
        strong: doc.strong,
        idioma: doc.idioma,
        livroOrdem: doc.livroOrdem,
        capitulo: doc.capitulo,
        versiculo: doc.versiculo,
      ));
    }

    return results;
  }

  Set<int>? _retrieveCandidates(List<String> tokens) {
    final postings = <List<int>>[];
    for (final tok in tokens) {
      final list = _invertedIndex[tok];
      if (list == null) return null;
      postings.add(list);
    }
    postings.sort((a, b) => a.length.compareTo(b.length));
    final result = <int>{...postings[0]};
    for (var i = 1; i < postings.length; i++) {
      result.retainAll(postings[i]);
      if (result.isEmpty) return result;
    }
    return result;
  }

  int _getTermFreq(int docId, String token) {
    final doc = _docs[docId];
    final tokens = tokenize(doc.text);
    var count = 0;
    for (final t in tokens) {
      if (t == token) count++;
    }
    return count;
  }

  String _buildSnippet(_IndexedDoc doc, List<String> tokens) {
    final text = doc.displayText.isNotEmpty ? doc.displayText : doc.text;
    if (text.isEmpty) return doc.titulo;
    final lower = _stripAccents(text.toLowerCase());
    int bestPos = -1;
    String? bestToken;
    for (final tok in tokens) {
      final idx = lower.indexOf(tok);
      if (idx >= 0 && (bestPos < 0 || idx < bestPos)) {
        bestPos = idx;
        bestToken = tok;
      }
    }
    if (bestPos < 0) {
      final truncated = text.length > 200 ? '${text.substring(0, 200)}...' : text;
      return truncated;
    }
    const beforeLen = 60;
    const afterLen = 140;
    final start = math.max(0, bestPos - beforeLen);
    final end = math.min(text.length, bestPos + bestToken!.length + afterLen);
    final prefix = start > 0 ? '...' : '';
    final suffix = end < text.length ? '...' : '';
    return '$prefix${text.substring(start, end)}$suffix';
  }

  List<String> suggest(String prefix, {int limit = 8}) {
    if (!_initialized || prefix.isEmpty) return const [];
    final normalized = tokenize(prefix).join(' ');
    if (normalized.isEmpty) return const [];

    final tokens = normalized.split(' ');
    final lastToken = tokens.last;
    final results = <String>[];

    for (final token in _invertedIndex.keys) {
      if (token.startsWith(lastToken) && token != lastToken) {
        final suggestion = [...tokens.sublist(0, tokens.length - 1), token].join(' ');
        results.add(suggestion);
        if (results.length >= limit) break;
      }
    }
    return results;
  }
}

class _IndexedDoc {
  final int id;
  final SearchResultType type;
  final String titulo;
  final String text;
  final String displayText;
  final String? reference;
  final String? traducao;
  final String? autor;
  final String? strong;
  final String? idioma;
  final String? idiomaLabel;
  final int? livroOrdem;
  final int? capitulo;
  final int? versiculo;

  const _IndexedDoc({
    required this.id,
    required this.type,
    required this.titulo,
    required this.text,
    required this.displayText,
    this.reference,
    this.traducao,
    this.autor,
    this.strong,
    this.idioma,
    this.idiomaLabel,
    this.livroOrdem,
    this.capitulo,
    this.versiculo,
  });

  int compareTo(_IndexedDoc other) {
    int c = (livroOrdem ?? 9999).compareTo(other.livroOrdem ?? 9999);
    if (c != 0) return c;
    c = (capitulo ?? 0).compareTo(other.capitulo ?? 0);
    if (c != 0) return c;
    c = (versiculo ?? 0).compareTo(other.versiculo ?? 0);
    if (c != 0) return c;
    return titulo.compareTo(other.titulo);
  }
}
