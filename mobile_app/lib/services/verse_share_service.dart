import 'package:share_plus/share_plus.dart';
import 'package:flutter/services.dart';

class VerseShareService {
  static final VerseShareService _instance = VerseShareService._();
  factory VerseShareService() => _instance;
  VerseShareService._();

  Future<void> shareVerseText({
    required String texto,
    required String referencia,
    String? traducao,
  }) async {
    final traducaoText = traducao != null ? ' ($traducao)' : '';
    final text = '"$texto"\n\n— $referencia$traducaoText\n📖 Sola Scriptura';

    await Share.share(
      text,
      subject: '$referencia — Sola Scriptura',
    );
  }

  Future<void> shareVerseToWhatsApp({
    required String texto,
    required String referencia,
    String? traducao,
  }) async {
    final traducaoText = traducao != null ? ' ($traducao)' : '';
    final text = '📖 *$referencia$traducaoText*\n\n"$texto"\n\n— Sola Scriptura';

    await Share.share(
      text,
      subject: '$referencia — Sola Scriptura',
    );
  }

  Future<void> copyVerseText({
    required String texto,
    required String referencia,
    String? traducao,
  }) async {
    final traducaoText = traducao != null ? ' ($traducao)' : '';
    final text = '"$texto"\n\n— $referencia$traducaoText\n📖 Sola Scriptura';

    await Clipboard.setData(ClipboardData(text: text));
  }
}
