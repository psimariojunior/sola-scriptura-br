import 'package:flutter/foundation.dart';
import 'package:share_plus/share_plus.dart';

class ShareService {
  Future<void> shareText(String text, {String? subject}) async {
    try {
      await Share.share(text, subject: subject);
    } catch (e) {
      debugPrint('Share error: $e');
    }
  }

  Future<void> shareUrl(String url, {String? subject}) async {
    try {
      await Share.shareUri(Uri.parse(url));
    } catch (e) {
      debugPrint('Share URL error: $e');
    }
  }

  bool isShareUrl(String url) {
    return url.startsWith('ssb-share://');
  }

  String? extractShareText(String url) {
    if (!isShareUrl(url)) return null;
    try {
      final encoded = url.replaceFirst('ssb-share://', '');
      return Uri.decodeComponent(encoded);
    } catch (_) {
      return null;
    }
  }
}
