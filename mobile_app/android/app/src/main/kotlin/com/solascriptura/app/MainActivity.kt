package com.solascriptura.app

import android.content.Intent
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    private val CHANNEL = "com.solascriptura/deeplink"
    private var initialLink: String? = null

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        initialLink = extractLinkFromIntent(intent)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL)
            .setMethodCallHandler { call, result ->
                if (call.method == "getInitialLink") {
                    result.success(initialLink)
                    initialLink = null
                } else {
                    result.notImplemented()
                }
            }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        val link = extractLinkFromIntent(intent)
        if (link != null) {
            val channel = MethodChannel(
                flutterEngine?.dartExecutor?.binaryMessenger ?: return,
                CHANNEL
            )
            channel.invokeMethod("onNewLink", link)
        }
    }

    private fun extractLinkFromIntent(intent: Intent?): String? {
        if (intent == null) return null
        val data = intent.data ?: return null
        val host = data.host ?: return null
        val path = data.path ?: ""
        return if (data.scheme == "sola-scriptura") {
            "/$host$path"
        } else {
            path.ifEmpty { null }
        }
    }
}
