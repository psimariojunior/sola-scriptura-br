import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:gal/gal.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:screenshot/screenshot.dart';

import 'verse_share_service.dart';

/// Estilos disponiveis para o cartao de imagem do versiculo.
enum VerseImageStyle {
  /// Gradiente dourado com texto escuro.
  gold,

  /// Fundo escuro premium com texto dourado.
  darkGold,

  /// Estilo sepia classico, ideal para leitura longa.
  sepia,

  /// Azul profundo com reflexos.
  ocean,

  /// Verde floresta, natureza.
  forest,
}

extension VerseImageStyleLabel on VerseImageStyle {
  String get label {
    switch (this) {
      case VerseImageStyle.gold:
        return 'Dourado';
      case VerseImageStyle.darkGold:
        return 'Noite';
      case VerseImageStyle.sepia:
        return 'Sepia';
      case VerseImageStyle.ocean:
        return 'Oceano';
      case VerseImageStyle.forest:
        return 'Floresta';
    }
  }
}

/// Formato de saida da imagem.
enum VerseImageFormat {
  /// 1080x1080 - Instagram quadrado / WhatsApp.
  square,

  /// 1080x1920 - Stories / Reels.
  story,
}

class VerseImagePalette {
  final List<Color> gradient;
  final Color text;
  final Color reference;
  final Color accent;
  final Color overlay;
  final Color frame;

  const VerseImagePalette({
    required this.gradient,
    required this.text,
    required this.reference,
    required this.accent,
    required this.overlay,
    required this.frame,
  });

  static const VerseImagePalette gold = VerseImagePalette(
    gradient: [Color(0xFFE8C56B), Color(0xFFA17A2C), Color(0xFF6A4A18)],
    text: Color(0xFF1C1917),
    reference: Color(0xFF4A2E0A),
    accent: Color(0xFF4A2E0A),
    overlay: Color(0x33FFFFFF),
    frame: Color(0xFF4A2E0A),
  );

  static const VerseImagePalette darkGold = VerseImagePalette(
    gradient: [Color(0xFF161412), Color(0xFF0A0908), Color(0xFF1F1812)],
    text: Color(0xFFF5F1E8),
    reference: Color(0xFFD4A843),
    accent: Color(0xFFD4A843),
    overlay: Color(0x33D4A843),
    frame: Color(0xFFD4A843),
  );

  static const VerseImagePalette sepia = VerseImagePalette(
    gradient: [Color(0xFFF5ECD7), Color(0xFFE8D9B5), Color(0xFFD4C9A8)],
    text: Color(0xFF3A2E1C),
    reference: Color(0xFF8B6914),
    accent: Color(0xFF8B6914),
    overlay: Color(0x33FFFFFF),
    frame: Color(0xFF8B6914),
  );

  static const VerseImagePalette ocean = VerseImagePalette(
    gradient: [Color(0xFF082F49), Color(0xFF0C4A6E), Color(0xFF075985)],
    text: Color(0xFFE0F2FE),
    reference: Color(0xFF7DD3FC),
    accent: Color(0xFF38BDF8),
    overlay: Color(0x3338BDF8),
    frame: Color(0xFF7DD3FC),
  );

  static const VerseImagePalette forest = VerseImagePalette(
    gradient: [Color(0xFF0F2417), Color(0xFF14532D), Color(0xFF064E3B)],
    text: Color(0xFFECFDF5),
    reference: Color(0xFF6EE7B7),
    accent: Color(0xFF6EE7B7),
    overlay: Color(0x336EE7B7),
    frame: Color(0xFF6EE7B7),
  );

  static VerseImagePalette forStyle(VerseImageStyle style) {
    switch (style) {
      case VerseImageStyle.gold:
        return gold;
      case VerseImageStyle.darkGold:
        return darkGold;
      case VerseImageStyle.sepia:
        return sepia;
      case VerseImageStyle.ocean:
        return ocean;
      case VerseImageStyle.forest:
        return forest;
    }
  }
}

/// Widget renderizado em 1080px para virar imagem.
/// E exibido off-screen (via `RepaintBoundary`) pelo `VerseImageService`.
class VerseImageCard extends StatelessWidget {
  final String livroNome;
  final int capitulo;
  final int versiculoInicio;
  final int? versiculoFim;
  final String texto;
  final String traducaoAbrev;
  final String webLink;
  final VerseImageStyle style;
  final VerseImageFormat format;
  final bool showQrCode;

  const VerseImageCard({
    super.key,
    required this.livroNome,
    required this.capitulo,
    required this.versiculoInicio,
    this.versiculoFim,
    required this.texto,
    required this.traducaoAbrev,
    required this.webLink,
    this.style = VerseImageStyle.darkGold,
    this.format = VerseImageFormat.square,
    this.showQrCode = true,
  });

  Size get _size {
    switch (format) {
      case VerseImageFormat.square:
        return const Size(1080, 1080);
      case VerseImageFormat.story:
        return const Size(1080, 1920);
    }
  }

  @override
  Widget build(BuildContext context) {
    final palette = VerseImagePalette.forStyle(style);
    final w = _size.width;
    final h = _size.height;

    final referencia = versiculoFim != null && versiculoFim != versiculoInicio
        ? '$livroNome $capitulo:$versiculoInicio-$versiculoFim'
        : '$livroNome $capitulo:$versiculoInicio';

    return Material(
      type: MaterialType.transparency,
      child: SizedBox(
        width: w,
        height: h,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Gradiente base
            DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: palette.gradient,
                ),
              ),
            ),
            // Overlay radial para profundidade
            DecoratedBox(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: const Alignment(-0.6, -0.6),
                  radius: 1.2,
                  colors: [
                    palette.overlay,
                    Colors.transparent,
                  ],
                ),
              ),
            ),
            // Quadro decorativo interno
            Positioned.fill(
              child: Padding(
                padding: EdgeInsets.all(h * 0.07),
                child: CustomPaint(
                  painter: _FramePainter(
                    color: palette.frame,
                    radius: 28,
                  ),
                ),
              ),
            ),
            // Conteudo central
            Padding(
              padding: EdgeInsets.symmetric(horizontal: w * 0.10),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    '\u{201C}',
                    style: GoogleFonts.crimsonPro(
                      fontSize: w * 0.18,
                      fontWeight: FontWeight.w700,
                      color: palette.accent,
                      height: 1,
                    ),
                  ),
                  SizedBox(height: h * 0.02),
                  // Texto do versiculo
                  Flexible(
                    child: Text(
                      texto,
                      textAlign: TextAlign.center,
                      style: GoogleFonts.crimsonPro(
                        fontSize: _fontSizeFor(texto.length, w),
                        fontWeight: FontWeight.w400,
                        fontStyle: FontStyle.italic,
                        color: palette.text,
                        height: 1.4,
                        letterSpacing: 0.2,
                      ),
                    ),
                  ),
                  SizedBox(height: h * 0.04),
                  // Referencia
                  Container(
                    height: 2,
                    width: w * 0.15,
                    color: palette.accent,
                  ),
                  SizedBox(height: h * 0.025),
                  Text(
                    referencia.toUpperCase(),
                    textAlign: TextAlign.center,
                    style: GoogleFonts.inter(
                      fontSize: w * 0.034,
                      fontWeight: FontWeight.w700,
                      color: palette.reference,
                      letterSpacing: 2,
                    ),
                  ),
                  SizedBox(height: h * 0.012),
                  Text(
                    traducaoAbrev.toUpperCase(),
                    style: GoogleFonts.inter(
                      fontSize: w * 0.022,
                      fontWeight: FontWeight.w500,
                      color: palette.text.withValues(alpha: 0.6),
                      letterSpacing: 3,
                    ),
                  ),
                ],
              ),
            ),
            // Rodape: QR + branding
            Positioned(
              left: 0,
              right: 0,
              bottom: h * 0.08,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: w * 0.10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    if (showQrCode)
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: QrImageView(
                          data: webLink,
                          version: QrVersions.auto,
                          size: h * 0.08,
                          backgroundColor: Colors.white,
                          padding: EdgeInsets.zero,
                        ),
                      ),
                    if (showQrCode) SizedBox(width: w * 0.04),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'SOLA SCRIPTURA',
                            style: GoogleFonts.inter(
                              fontSize: w * 0.026,
                              fontWeight: FontWeight.w800,
                              color: palette.text,
                              letterSpacing: 4,
                            ),
                          ),
                          SizedBox(height: h * 0.005),
                          Text(
                            'Estudo biblico academico',
                            style: GoogleFonts.inter(
                              fontSize: w * 0.018,
                              fontWeight: FontWeight.w400,
                              color: palette.text.withValues(alpha: 0.7),
                              letterSpacing: 0.5,
                            ),
                          ),
                          SizedBox(height: h * 0.005),
                          Text(
                            webLink.replaceFirst('https://', ''),
                            style: GoogleFonts.inter(
                              fontSize: w * 0.016,
                              fontWeight: FontWeight.w500,
                              color: palette.accent,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  double _fontSizeFor(int length, double width) {
    if (length > 360) return width * 0.040;
    if (length > 240) return width * 0.048;
    if (length > 160) return width * 0.055;
    if (length > 100) return width * 0.062;
    return width * 0.070;
  }
}

class _FramePainter extends CustomPainter {
  final Color color;
  final double radius;

  _FramePainter({required this.color, required this.radius});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..color = color.withValues(alpha: 0.7);
    final rect = Rect.fromLTWH(0, 0, size.width, size.height);
    final rrect = RRect.fromRectAndRadius(rect, Radius.circular(radius));
    canvas.drawRRect(rrect, paint);

    // Cantoneiras decorativas
    final cornerLen = size.shortestSide * 0.06;
    final cornerPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 5
      ..strokeCap = StrokeCap.round
      ..color = color;
    void drawCorner(Offset origin, Offset dx, Offset dy) {
      canvas.drawLine(origin, origin + dx, cornerPaint);
      canvas.drawLine(origin, origin + dy, cornerPaint);
    }

    drawCorner(const Offset(0, 0), Offset(cornerLen, 0), Offset(0, cornerLen));
    drawCorner(Offset(size.width, 0), Offset(-cornerLen, 0), Offset(0, cornerLen));
    drawCorner(Offset(0, size.height), Offset(cornerLen, 0), Offset(0, -cornerLen));
    drawCorner(
      Offset(size.width, size.height),
      Offset(-cornerLen, 0),
      Offset(0, -cornerLen),
    );
  }

  @override
  bool shouldRepaint(covariant _FramePainter old) => old.color != color;
}

class VerseImageResult {
  final String filePath;
  final Uint8List bytes;
  final VerseImageStyle style;
  final VerseImageFormat format;

  const VerseImageResult({
    required this.filePath,
    required this.bytes,
    required this.style,
    required this.format,
  });
}

class VerseImageService {
  VerseImageService._();

  static const String _folder = 'sola_scriptura_verses';

  /// Captura o [VerseImageCard] off-screen e salva em arquivo temporario.
  ///
  /// O parametro [pixelRatio] controla a qualidade. Padrao 1.0 (1080x1080).
  /// Use valores maiores para impressao ou menor para preview rapido.
  static Future<VerseImageResult> generateImage({
    required BuildContext context,
    required String livroNome,
    required String livroAbreviacao,
    required int capitulo,
    required int versiculoInicio,
    int? versiculoFim,
    required String texto,
    required String traducaoAbrev,
    VerseImageStyle style = VerseImageStyle.darkGold,
    VerseImageFormat format = VerseImageFormat.square,
    double pixelRatio = 1.0,
    bool showQrCode = true,
  }) async {
    final webLink = VerseShareService.buildWebLink(
      livroAbreviacao: livroAbreviacao,
      capitulo: capitulo,
      versiculo: versiculoInicio,
    );

    final controller = ScreenshotController();
    final widget = RepaintBoundary(
      key: const ValueKey('verse-image-boundary'),
      child: Offstage(
        offstage: false,
        child: VerseImageCard(
          livroNome: livroNome,
          capitulo: capitulo,
          versiculoInicio: versiculoInicio,
          versiculoFim: versiculoFim,
          texto: texto,
          traducaoAbrev: traducaoAbrev,
          webLink: webLink,
          style: style,
          format: format,
          showQrCode: showQrCode,
        ),
      ),
    );

    // Render off-screen com Overlay para nao interferir na UI.
    final overlay = OverlayEntry(
      builder: (_) => Positioned(
        left: -2000,
        top: 0,
        child: Material(
          type: MaterialType.transparency,
          child: widget,
        ),
      ),
    );
    final overlayState = Overlay.of(context, rootOverlay: true);
    overlayState.insert(overlay);

    try {
      // Aguarda 2 frames para garantir renderizacao completa
      await Future<void>.delayed(const Duration(milliseconds: 50));
      await WidgetsBinding.instance.endOfFrame;
      await Future<void>.delayed(const Duration(milliseconds: 50));

      if (!context.mounted) {
        throw Exception('Contexto invalido ao capturar imagem.');
      }

      final bytes = await controller.captureFromWidget(
        widget,
        pixelRatio: pixelRatio,
        context: context,
        delay: const Duration(milliseconds: 20),
        targetSize: format == VerseImageFormat.square
            ? const Size(1080, 1080)
            : const Size(1080, 1920),
      );

      final dir = await getTemporaryDirectory();
      final outDir = Directory(p.join(dir.path, _folder));
      if (!await outDir.exists()) {
        await outDir.create(recursive: true);
      }
      final fileName =
          'sola_scriptura_${livroAbreviacao}_${capitulo}_$versiculoInicio'
          '_${DateTime.now().millisecondsSinceEpoch}.png';
      final file = File(p.join(outDir.path, fileName));
      await file.writeAsBytes(bytes, flush: true);

      return VerseImageResult(
        filePath: file.path,
        bytes: bytes,
        style: style,
        format: format,
      );
    } finally {
      overlay.remove();
    }
  }

  /// Gera a imagem em bytes sem tocar no filesystem.
  static Future<Uint8List> generateBytes({
    required BuildContext context,
    required String livroNome,
    required String livroAbreviacao,
    required int capitulo,
    required int versiculoInicio,
    int? versiculoFim,
    required String texto,
    required String traducaoAbrev,
    VerseImageStyle style = VerseImageStyle.darkGold,
    VerseImageFormat format = VerseImageFormat.square,
    double pixelRatio = 1.0,
    bool showQrCode = true,
  }) async {
    final result = await generateImage(
      context: context,
      livroNome: livroNome,
      livroAbreviacao: livroAbreviacao,
      capitulo: capitulo,
      versiculoInicio: versiculoInicio,
      versiculoFim: versiculoFim,
      texto: texto,
      traducaoAbrev: traducaoAbrev,
      style: style,
      format: format,
      pixelRatio: pixelRatio,
      showQrCode: showQrCode,
    );
    return result.bytes;
  }

  /// Salva a imagem do versiculo na galeria do dispositivo.
  static Future<String> saveToGallery(VerseImageResult result,
      {String? album}) async {
    final hasAccess = await Gal.hasAccess(toAlbum: true);
    if (!hasAccess) {
      final granted = await Gal.requestAccess(toAlbum: true);
      if (!granted) {
        throw Exception(
          'Permissao negada para acessar a galeria. Habilite em configuracoes.',
        );
      }
    }
    await Gal.putImage(result.filePath, album: album ?? 'Sola Scriptura');
    return result.filePath;
  }

  /// Tenta decodificar os bytes para validacao rapida.
  static Future<bool> isValidPng(Uint8List bytes) async {
    try {
      final codec = await ui.instantiateImageCodec(bytes);
      await codec.getNextFrame();
      return true;
    } catch (_) {
      return false;
    }
  }
}
