import 'package:background_fetch/background_fetch.dart';
import 'package:flutter/foundation.dart';
import 'verse_widget_service.dart';
import 'streak_service.dart';
import 'streak_notification_service.dart';

class BackgroundUpdateService {
  static const _taskId = 'com.solascriptura.background.update';
  static const _androidTaskId = 'com.solascriptura.android.background.update';

  static Future<void> initialize() async {
    try {
      await BackgroundFetch.configure(
        BackgroundFetchConfig(
          minimumFetchInterval: 60,
          stopOnTerminate: false,
          enableHeadless: true,
          startOnBoot: true,
          requiresBatteryNotLow: false,
          requiresCharging: false,
          requiresStorageNotLow: false,
          requiresDeviceIdle: false,
        ),
        _onBackgroundFetch,
        _onBackgroundFetchTimeout,
      );

      debugPrint('[BackgroundUpdateService] Configured successfully');
    } catch (e) {
      debugPrint('[BackgroundUpdateService] Configuration error: $e');
    }
  }

  static void _onBackgroundFetch(String taskId) async {
    debugPrint('[BackgroundUpdateService] Background fetch: $taskId');

    try {
      await VerseWidgetService.updateWithDailyVerse();

      final streak = await StreakService.getCurrentStreak();
      if (streak > 0) {
        await StreakNotificationService().scheduleStreakReminders();
      }

      debugPrint('[BackgroundUpdateService] Update completed');
    } catch (e) {
      debugPrint('[BackgroundUpdateService] Update error: $e');
    }

    BackgroundFetch.finish(taskId);
  }

  static void _onBackgroundFetchTimeout(String taskId) {
    debugPrint('[BackgroundUpdateService] Timeout: $taskId');
    BackgroundFetch.finish(taskId);
  }

  static Future<void> schedulePeriodicUpdate() async {
    try {
      await BackgroundFetch.scheduleTask(
        TaskConfig(
          taskId: _androidTaskId,
          delay: 3600000,
          periodic: true,
          forceAlarmManager: false,
          stopOnTerminate: false,
          startOnBoot: true,
          enableHeadless: true,
          requiresNetworkConnectivity: true,
        ),
      );
      debugPrint('[BackgroundUpdateService] Periodic update scheduled');
    } catch (e) {
      debugPrint('[BackgroundUpdateService] Schedule error: $e');
    }
  }

  static Future<void> cancelAll() async {
    try {
      await BackgroundFetch.stop();
      debugPrint('[BackgroundUpdateService] All tasks cancelled');
    } catch (e) {
      debugPrint('[BackgroundUpdateService] Cancel error: $e');
    }
  }

  static Future<void> forceUpdate() async {
    try {
      debugPrint('[BackgroundUpdateService] Force update triggered');
      await VerseWidgetService.updateWithDailyVerse();
    } catch (e) {
      debugPrint('[BackgroundUpdateService] Force update error: $e');
    }
  }
}
