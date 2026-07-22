import 'package:webview_flutter/webview_flutter.dart';

class JsBridge {
  JsBridge._();

  static const String _bridgeScript = '''
    (function() {
      if (window.__SSB_NATIVE) return;
      
      window.__SSB_NATIVE = true;
      window.__SSB_VERSION = '1.0.0';
      window.__SSB_PLATFORM = 'flutter';
      
      window.__SSB_SHARE = function(text, url) {
        var shareText = text || document.title;
        var shareUrl = url || window.location.href;
        var encoded = encodeURIComponent(shareText + ' ' + shareUrl);
        window.location.href = 'ssb-share://' + encoded;
      };
      
      window.__SSB_READY = true;
      window.dispatchEvent(new CustomEvent('ssb:ready', { detail: { platform: 'flutter' } }));
    })();
  ''';

  static const String _performanceScript = '''
    (function() {
      // Optimize scroll performance
      document.addEventListener('touchstart', function() {}, { passive: true });
      document.addEventListener('touchmove', function() {}, { passive: true });
      document.addEventListener('wheel', function() {}, { passive: true });
      
      // Prevent double-tap zoom on interactive elements
      var style = document.createElement('style');
      style.textContent = 'button, a, input, select, textarea, [role="button"] { touch-action: manipulation; }';
      document.head.appendChild(style);
    })();
  ''';

  static Future<void> injectBridge(WebViewController controller) async {
    try {
      await controller.runJavaScript(_bridgeScript);
    } catch (e) {
      // Bridge may already be injected
    }
  }

  static Future<void> injectPerformanceOptimizations(WebViewController controller) async {
    try {
      await controller.runJavaScript(_performanceScript);
    } catch (e) {
      // Ignore errors
    }
  }

  static Future<void> scrollToTop(WebViewController controller) async {
    try {
      await controller.runJavaScript('window.scrollTo({ top: 0, behavior: "smooth" })');
    } catch (_) {}
  }

  static Future<void> scrollToElement(WebViewController controller, String selector) async {
    try {
      await controller.runJavaScript(
        'var el = document.querySelector("$selector"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });',
      );
    } catch (_) {}
  }

  static Future<String?> getCurrentPath(WebViewController controller) async {
    try {
      final result = await controller.runJavaScriptReturningResult('window.location.pathname');
      return result?.toString();
    } catch (_) {
      return null;
    }
  }
}
