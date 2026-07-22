package com.solascriptura.app

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.SharedPreferences
import android.widget.RemoteViews
import android.net.Uri
import android.content.Intent
import android.app.PendingIntent

class VerseWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId)
        }
    }

    companion object {
        fun updateWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val prefs: SharedPreferences = context.getSharedPreferences("widget_verses", Context.MODE_PRIVATE)
            val verse = prefs.getString("verse_text", "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito") ?: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito"
            val reference = prefs.getString("verse_reference", "João 3:16") ?: "João 3:16"

            val views = RemoteViews(context.packageName, R.layout.widget_verse)
            views.setTextViewText(R.id.widget_verse_text, "\"$verse\"")
            views.setTextViewText(R.id.widget_verse_reference, "— $reference")

            val intent = Intent(context, MainActivity::class.java)
            intent.action = Intent.ACTION_VIEW
            intent.data = Uri.parse("https://solascripturabr.com.br/biblia")
            val pendingIntent = PendingIntent.getActivity(
                context, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_container, pendingIntent)

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
