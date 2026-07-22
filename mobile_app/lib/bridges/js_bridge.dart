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
      document.addEventListener('touchstart', function() {}, { passive: true });
      document.addEventListener('touchmove', function() {}, { passive: true });
      document.addEventListener('wheel', function() {}, { passive: true });
      
      var style = document.createElement('style');
      style.textContent = 'button, a, input, select, textarea, [role="button"] { touch-action: manipulation; }';
      document.head.appendChild(style);
    })();
  ''';

  static const String _offlineSupportScript = '''
    (function() {
      if (window.__SSB_OFFLINE_INIT) return;
      window.__SSB_OFFLINE_INIT = true;

      function createOfflineBanner() {
        if (document.getElementById('ssb-offline-banner')) return;
        var banner = document.createElement('div');
        banner.id = 'ssb-offline-banner';
        banner.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;z-index:99999;padding:8px 16px;background:#B91C1C;color:white;text-align:center;font-size:13px;font-family:system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:transform 0.3s ease;">⚡ Você está offline — conteúdo em cache pode estar disponível</div>';
        document.body.appendChild(banner);
      }

      function removeOfflineBanner() {
        var banner = document.getElementById('ssb-offline-banner');
        if (banner) banner.remove();
      }

      function updateOnlineStatus() {
        if (navigator.onLine) {
          removeOfflineBanner();
          document.body.style.paddingTop = '0';
        } else {
          createOfflineBanner();
          document.body.style.paddingTop = '36px';
        }
      }

      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
      updateOnlineStatus();

      window.__SSB_CACHE_VERSE = async function(reference, text) {
        try {
          if ('caches' in window) {
            var cache = await caches.open('ssb-versicles-v1');
            var response = new Response(text, { headers: { 'Content-Type': 'text/plain', 'X-Reference': reference } });
            await cache.put('/versicle/' + encodeURIComponent(reference), response);
          }
        } catch (e) {}
      };

      window.__SSB_GET_CACHED_VERSE = async function(reference) {
        try {
          if ('caches' in window) {
            var cache = await caches.open('ssb-versicles-v1');
            var response = await cache.match('/versicle/' + encodeURIComponent(reference));
            if (response) return await response.text();
          }
        } catch (e) {}
        return null;
      };
    })();
  ''';

  static Future<void> injectBridge(WebViewController controller) async {
    try {
      await controller.runJavaScript(_bridgeScript);
    } catch (e) {
      // Bridge may already be injected
    }
  }

  static Future<void> injectPerformanceOptimizations(
    WebViewController controller,
  ) async {
    try {
      await controller.runJavaScript(_performanceScript);
    } catch (e) {
      // Ignore errors
    }
  }

  static Future<void> injectOfflineSupport(WebViewController controller) async {
    try {
      await controller.runJavaScript(_offlineSupportScript);
    } catch (e) {
      // Ignore errors
    }
  }

  static Future<void> scrollToTop(WebViewController controller) async {
    try {
      await controller.runJavaScript(
        'window.scrollTo({ top: 0, behavior: "smooth" })',
      );
    } catch (_) {}
  }

  static Future<void> scrollToElement(
    WebViewController controller,
    String selector,
  ) async {
    try {
      await controller.runJavaScript(
        'var el = document.querySelector("$selector"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });',
      );
    } catch (_) {}
  }

  static Future<String?> getCurrentPath(WebViewController controller) async {
    try {
      final result = await controller.runJavaScriptReturningResult(
        'window.location.pathname',
      );
      return result?.toString();
    } catch (_) {
      return null;
    }
  }
}
