import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/timezone.dart' as tz;
import 'streak_service.dart';

class StreakNotificationService {
  static final StreakNotificationService _instance = StreakNotificationService._internal();
  factory StreakNotificationService() => _instance;
  StreakNotificationService._internal();

  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  static const _streakChannel = 'ssb_streak_reminders';
  static const _motivationChannel = 'ssb_motivation';
  static const _streakReminderId = 100;
  static const _motivationId = 101;

  static const _streakMessages = [
    '🔥 Não quebre sua sequência de {streak} dias!',
    '📖 Hora de estudar! Você está com {streak} dias seguidos!',
    '💪 Continue firme! {streak} dias de estudo bíblico!',
    '⭐ Você é especial! Mantenha os {streak} dias!',
    '🌟 Sua consistência inspira! {streak} dias seguidos!',
  ];

  static const _motivationMessages = [
    '💡 "Estudai para vos apresentardes a Deus aprovados" - 2 Timóteo 2:15',
    '📖 "Bem-aventurado o homem que não anda segundo o conselho dos ímpios" - Salmo 1:1',
    '✝️ "A Palavra de Deus é viva e eficaz" - Hebreus 4:12',
    '🙏 "Ainda que eu andasse pelo vale da sombra da morte..." - Salmo 23:4',
    '💪 "Posso todas as coisas naquele que me fortalece" - Filipenses 4:13',
  ];

  Future<void> initialize() async {
    try {
      final androidPlugin = _localNotifications
          .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();

      await androidPlugin?.createNotificationChannel(
        const AndroidNotificationChannel(
          _streakChannel,
          'Lembretes de Sequência',
          description: 'Lembretes para manter sua sequência de estudo',
          importance: Importance.high,
          enableVibration: true,
          enableLights: true,
        ),
      );

      await androidPlugin?.createNotificationChannel(
        const AndroidNotificationChannel(
          _motivationChannel,
          'Motivação Diária',
          description: 'Versículos motivacionais para seu dia',
          importance: Importance.defaultImportance,
          enableVibration: false,
        ),
      );
    } catch (e) {
      debugPrint('[StreakNotificationService] Init error: $e');
    }
  }

  Future<void> scheduleStreakReminders() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final enabled = prefs.getBool('ssb_streak_reminders_enabled') ?? true;
      if (!enabled) return;

      final streak = await StreakService.getCurrentStreak();
      final hour = prefs.getInt('ssb_streak_reminder_hour') ?? 20;
      final minute = prefs.getInt('ssb_streak_reminder_minute') ?? 0;

      if (streak > 0) {
        await _scheduleDailyReminder(hour, minute, streak);
      }

      await _scheduleMotivationNotification();
    } catch (e) {
      debugPrint('[StreakNotificationService] Schedule error: $e');
    }
  }

  Future<void> _scheduleDailyReminder(int hour, int minute, int streak) async {
    final now = tz.TZDateTime.now(tz.local);
    var scheduled = tz.TZDateTime(tz.local, now.year, now.month, now.day, hour, minute);
    if (scheduled.isBefore(now)) {
      scheduled = scheduled.add(const Duration(days: 1));
    }

    final message = _streakMessages[streak % _streakMessages.length]
        .replaceAll('{streak}', streak.toString());

    const androidDetails = AndroidNotificationDetails(
      _streakChannel,
      'Lembretes de Sequência',
      channelDescription: 'Lembretes para manter sua sequência de estudo',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
      enableVibration: true,
    );
    const details = NotificationDetails(android: androidDetails);

    await _localNotifications.zonedSchedule(
      _streakReminderId,
      '🔥 Sua Sequência: $streak dias',
      message,
      scheduled,
      details,
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
      matchDateTimeComponents: DateTimeComponents.time,
      payload: '/biblia',
    );
  }

  Future<void> _scheduleMotivationNotification() async {
    final now = tz.TZDateTime.now(tz.local);
    var scheduled = tz.TZDateTime(tz.local, now.year, now.month, now.day, 7, 0);
    if (scheduled.isBefore(now)) {
      scheduled = scheduled.add(const Duration(days: 1));
    }

    final message = _motivationMessages[now.day % _motivationMessages.length];

    const androidDetails = AndroidNotificationDetails(
      _motivationChannel,
      'Motivação Diária',
      channelDescription: 'Versículos motivacionais para seu dia',
      importance: Importance.defaultImportance,
      icon: '@mipmap/ic_launcher',
    );
    const details = NotificationDetails(android: androidDetails);

    await _localNotifications.zonedSchedule(
      _motivationId,
      '☀️ Bom dia! Palavra para o seu coração',
      message,
      scheduled,
      details,
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
      matchDateTimeComponents: DateTimeComponents.time,
      payload: '/biblia',
    );
  }

  Future<void> sendStreakWarning() async {
    final streak = await StreakService.getCurrentStreak();
    if (streak <= 1) return;

    final now = tz.TZDateTime.now(tz.local);
    var scheduled = tz.TZDateTime(tz.local, now.year, now.month, now.day, 21, 0);
    if (scheduled.isBefore(now)) {
      scheduled = scheduled.add(const Duration(days: 1));
    }

    const androidDetails = AndroidNotificationDetails(
      _streakChannel,
      'Lembretes de Sequência',
      channelDescription: 'Lembretes para manter sua sequência de estudo',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
    );
    const details = NotificationDetails(android: androidDetails);

    await _localNotifications.zonedSchedule(
      _streakReminderId + 1,
      '⚠️ Não perca sua sequência!',
      'Faltam poucas horas para meia-noite. Estude agora para manter seus $streak dias!',
      scheduled,
      details,
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
      payload: '/biblia',
    );
  }

  Future<void> cancelStreakReminders() async {
    await _localNotifications.cancel(_streakReminderId);
    await _localNotifications.cancel(_streakReminderId + 1);
  }

  Future<void> cancelMotivation() async {
    await _localNotifications.cancel(_motivationId);
  }

  Future<void> setReminderTime(int hour, int minute) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('ssb_streak_reminder_hour', hour);
    await prefs.setInt('ssb_streak_reminder_minute', minute);
    await scheduleStreakReminders();
  }

  Future<void> setEnabled(bool enabled) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('ssb_streak_reminders_enabled', enabled);
    if (enabled) {
      await scheduleStreakReminders();
    } else {
      await cancelStreakReminders();
    }
  }
}
