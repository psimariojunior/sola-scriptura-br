import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  bool _initialized = false;

  Future<void> initialize() async {
    if (_initialized) return;

    try {
      const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
      const iosSettings = DarwinInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
      );
      const initSettings = InitializationSettings(android: androidSettings, iOS: iosSettings);
      await _localNotifications.initialize(initSettings);

      // Create notification channel for Android
      const androidChannel = AndroidNotificationChannel(
        'ssb_channel',
        'Sola Scriptura BR',
        description: 'Notificações do Sola Scriptura BR',
        importance: Importance.high,
      );
      await _localNotifications
          .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
          ?.createNotificationChannel(androidChannel);

      _initialized = true;
      debugPrint('Notification service initialized');
    } catch (e) {
      debugPrint('Notification service init error: $e');
    }
  }

  Future<void> showNotification({
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    if (!_initialized) return;

    const androidDetails = AndroidNotificationDetails(
      'ssb_channel',
      'Sola Scriptura BR',
      channelDescription: 'Notificações do Sola Scriptura BR',
      importance: Importance.high,
      priority: Priority.high,
    );
    const details = NotificationDetails(android: androidDetails);
    await _localNotifications.show(
      DateTime.now().millisecondsSinceEpoch.remainder(100000),
      title,
      body,
      details,
    );
  }

  Future<void> scheduleDailyVerse({
    required String title,
    required String body,
    int hour = 8,
    int minute = 0,
  }) async {
    if (!_initialized) return;

    // Schedule daily notification at specified time
    // This is a simplified version - in production, use timezone-aware scheduling
    debugPrint('Daily verse scheduled for $hour:$minute');
  }

  Future<void> cancelAll() async {
    await _localNotifications.cancelAll();
  }
}
