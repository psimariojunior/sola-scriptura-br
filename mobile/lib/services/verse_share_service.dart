import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';

import '../models/livro.dart';
import '../models/versiculo.dart';

class VerseShareService {
  VerseShareService._();

  static const String appName = 'Sola Scriptura BR';
  static const String webOrigin = 'https://solascripturabr.com.br';

  /// Gera o link canonico do versiculo no site.
  ///
  /// Exemplo: `https://solascripturabr.com.br/biblia/joao/3#v16`
  static String buildWebLink({
    required String livroAbreviacao,
    required int capitulo,
    required int versiculo,
  }) {
    final slug = _bookSlug(livroAbreviacao);
    return '$webOrigin/biblia/$slug/$capitulo#v$versiculo';
  }

  /// Formata o texto para compartilhamento, incluindo link do app/site.
  static String formatShareText({
    required String livroNome,
    required int capitulo,
    required Versiculo versiculo,
    required String traducaoAbrev,
    String? mensagemExtra,
  }) {
    final referencia = '$livroNome $capitulo:${versiculo.numero}';
    final link = versiculo.livro != null
        ? buildWebLink(
            livroAbreviacao: versiculo.livro!,
            capitulo: versiculo.capitulo ?? capitulo,
            versiculo: versiculo.numero,
          )
        : '$webOrigin/biblia';
    final buffer = StringBuffer();
    buffer.writeln('$referencia (${traducaoAbrev.toUpperCase()})');
    buffer.writeln();
    buffer.writeln(versiculo.texto.trim());
    if (mensagemExtra != null && mensagemExtra.trim().isNotEmpty) {
      buffer
        ..writeln()
        ..writeln(mensagemExtra.trim());
    }
    buffer
      ..writeln()
      ..writeln('— $appName')
      ..writeln(link);
    return buffer.toString();
  }

  /// Formata varios versiculos (capitulo inteiro ou range) para compartilhamento.
  static String formatRangeText({
    required String livroNome,
    required int capitulo,
    required List<Versiculo> versiculos,
    required String traducaoAbrev,
  }) {
    if (versiculos.isEmpty) return '';
    final buffer = StringBuffer();
    final primeiros = versiculos.first;
    final ultimos = versiculos.last;
    final referencia = primeiros.numero == ultimos.numero
        ? '$livroNome $capitulo:${primeiros.numero}'
        : '$livroNome $capitulo:${primeiros.numero}-${ultimos.numero}';
    buffer.writeln('$referencia (${traducaoAbrev.toUpperCase()})');
    buffer.writeln();
    for (final v in versiculos) {
      buffer.writeln('${v.numero}. ${v.texto.trim()}');
      buffer.writeln();
    }
    final link = primeiros.livro != null
        ? buildWebLink(
            livroAbreviacao: primeiros.livro!,
            capitulo: primeiros.capitulo ?? capitulo,
            versiculo: primeiros.numero,
          )
        : '$webOrigin/biblia';
    buffer.writeln('— $appName');
    buffer.writeln(link);
    return buffer.toString();
  }

  /// Copia o texto formatado para a area de transferencia.
  static Future<void> copyToClipboard(String text) async {
    await Clipboard.setData(ClipboardData(text: text));
  }

  /// Abre o dialog nativo de compartilhamento do sistema (share sheet).
  static Future<ShareResult> shareText(String text, {String? subject}) {
    return Share.share(text, subject: subject);
  }

  /// Compartilha um arquivo (imagem do versiculo) via share sheet nativo.
  static Future<ShareResult> shareFile(
    String filePath, {
    String? text,
    String? subject,
  }) {
    return Share.shareXFiles(
      [XFile(filePath, mimeType: 'image/png')],
      text: text,
      subject: subject,
    );
  }

  /// Atalho para gerar URL do WhatsApp web (fallback para Android antigo).
  static String whatsappUrl(String text) {
    return 'https://wa.me/?text=${Uri.encodeQueryComponent(text)}';
  }

  /// Atalho para gerar URL do Twitter/X.
  static String twitterUrl({
    required String text,
    String? url,
    String? via,
  }) {
    final params = <String, String>{
      'text': text,
      if (url != null) 'url': url,
      if (via != null) 'via': via,
    };
    final qs = params.entries
        .map((e) =>
            '${e.key}=${Uri.encodeQueryComponent(e.value).replaceAll("+", "%20")}')
        .join('&');
    return 'https://twitter.com/intent/tweet?$qs';
  }

  /// Atalho para gerar URL do Telegram.
  static String telegramUrl({required String text, String? url}) {
    final params = <String, String>{
      'text': text,
      if (url != null) 'url': url,
    };
    final qs = params.entries
        .map((e) => '${e.key}=${Uri.encodeComponent(e.value)}')
        .join('&');
    return 'https://t.me/share/url?$qs';
  }

  /// Atalho para URL do Facebook.
  static String facebookUrl({required String url, String? quote}) {
    final params = <String, String>{
      'u': url,
      if (quote != null) 'quote': quote,
    };
    final qs = params.entries
        .map((e) => '${e.key}=${Uri.encodeComponent(e.value)}')
        .join('&');
    return 'https://www.facebook.com/sharer/sharer.php?$qs';
  }

  static String _bookSlug(String abrev) {
    final lower = abrev.toLowerCase();
    final mapping = <String, String>{
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
    return mapping[lower] ?? lower;
  }
}

class ShareableVerse {
  final String livroNome;
  final String livroAbreviacao;
  final int capitulo;
  final List<Versiculo> versiculos;
  final String traducaoAbrev;
  final String? livroSlug;

  const ShareableVerse({
    required this.livroNome,
    required this.livroAbreviacao,
    required this.capitulo,
    required this.versiculos,
    required this.traducaoAbrev,
    this.livroSlug,
  });

  String get referenciaCurta {
    if (versiculos.isEmpty) return '$livroNome $capitulo';
    final primeiro = versiculos.first.numero;
    final ultimo = versiculos.last.numero;
    if (primeiro == ultimo) {
      return '$livroNome $capitulo:$primeiro';
    }
    return '$livroNome $capitulo:$primeiro-$ultimo';
  }

  String get link {
    if (versiculos.isEmpty) return VerseShareService.webOrigin;
    final v = versiculos.first;
    return VerseShareService.buildWebLink(
      livroAbreviacao: livroAbreviacao,
      capitulo: v.capitulo ?? capitulo,
      versiculo: v.numero,
    );
  }

  factory ShareableVerse.fromLivro({
    required Livro livro,
    required int capitulo,
    required List<Versiculo> versiculos,
    required String traducaoAbrev,
  }) {
    return ShareableVerse(
      livroNome: livro.nome,
      livroAbreviacao: livro.abreviacao,
      livroSlug: livro.slug.isNotEmpty ? livro.slug : null,
      capitulo: capitulo,
      versiculos: versiculos,
      traducaoAbrev: traducaoAbrev,
    );
  }
}
