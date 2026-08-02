package com.solascriptura.app

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.SharedPreferences
import android.widget.RemoteViews
import android.net.Uri
import android.content.Intent
import android.app.PendingIntent

class ProgressWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_UPDATE_PROGRESS) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val ids = appWidgetManager.getAppWidgetIds(
                android.content.ComponentName(context, ProgressWidgetProvider::class.java)
            )
            onUpdate(context, appWidgetManager, ids)
        }
    }

    companion object {
        const val ACTION_UPDATE_PROGRESS = "com.solascriptura.UPDATE_PROGRESS"

        fun updateWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val prefs: SharedPreferences = context.getSharedPreferences("widget_verses", Context.MODE_PRIVATE)
            val streak = prefs.getInt("streak_count", 0)
            val bestStreak = prefs.getInt("best_streak", 0)
            val totalDays = prefs.getInt("total_days", 0)

            val views = RemoteViews(context.packageName, R.layout.widget_progress)
            views.setTextViewText(R.id.widget_progress_streak, streak.toString())
            views.setTextViewText(R.id.widget_progress_best, bestStreak.toString())
            views.setTextViewText(R.id.widget_progress_total, totalDays.toString())

            val motivation = when {
                streak == 0 -> "Comece sua jornada!"
                streak == 1 -> "Primeiro dia!"
                streak < 7 -> "$streak dias!"
                streak < 30 -> "Incrível!"
                else -> "Lenda!"
            }
            views.setTextViewText(R.id.widget_progress_label, motivation)

            val intent = Intent(context, MainActivity::class.java)
            intent.action = Intent.ACTION_VIEW
            intent.data = Uri.parse("https://solascripturabr.com.br/biblia")
            val pendingIntent = PendingIntent.getActivity(
                context, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_progress_container, pendingIntent)

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }

        fun updateStats(context: Context, streak: Int, bestStreak: Int, totalDays: Int) {
            val prefs: SharedPreferences = context.getSharedPreferences("widget_verses", Context.MODE_PRIVATE)
            prefs.edit()
                .putInt("streak_count", streak)
                .putInt("best_streak", bestStreak)
                .putInt("total_days", totalDays)
                .apply()

            val intent = Intent(context, ProgressWidgetProvider::class.java)
            intent.action = ACTION_UPDATE_PROGRESS
            context.sendBroadcast(intent)
        }
    }
}
