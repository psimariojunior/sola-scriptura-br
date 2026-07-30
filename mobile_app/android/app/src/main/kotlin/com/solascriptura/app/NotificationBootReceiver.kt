package com.solascriptura.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.app.AlarmManager
import android.app.PendingIntent
import android.os.Build
import java.util.Calendar

class NotificationBootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED ||
            intent.action == "android.intent.action.QUICKBOOT_POWERON") {
            // Reschedule will happen when Flutter app starts via rescheduleFromPrefs()
            // This receiver just ensures the app knows to reschedule
            val prefs = context.getSharedPreferences("FlutterSharedPreferences", Context.MODE_PRIVATE)
            val enabled = prefs.getBoolean("flutter.ssb_daily_notif_enabled", false)
            if (enabled) {
                // Mark that reschedule is needed on next app open
                prefs.edit().putBoolean("ssb_needs_reschedule", true).apply()
            }
        }
    }
}
