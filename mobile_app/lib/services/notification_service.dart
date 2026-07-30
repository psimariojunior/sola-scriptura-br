import 'dart:math';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz_data;

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  bool _initialized = false;

  static const _dailyVerseChannel = 'ssb_daily_verse';
  static const _fcmChannel = 'ssb_fcm';
  static const _scheduledKeyId = 0;
  static const _prefsKeyHour = 'ssb_notif_hour';
  static const _prefsKeyMinute = 'ssb_notif_minute';
  static const _prefsKeyEnabled = 'ssb_daily_notif_enabled';

  static const _dailyVerses = [
    {'ref': 'João 3:16', 'text': 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.'},
    {'ref': 'Filipenses 4:13', 'text': 'Posso todas as coisas naquele que me fortalece.'},
    {'ref': 'Jeremias 29:11', 'text': 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o SENHOR; pensamentos de paz, e não de mal, para vos dar o fim que esperais.'},
    {'ref': 'Salmos 23:1', 'text': 'O SENHOR é o meu pastor; nada me faltará.'},
    {'ref': 'Romanos 8:28', 'text': 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.'},
    {'ref': 'Isaías 41:10', 'text': 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.'},
    {'ref': 'Provérbios 3:5-6', 'text': 'Confia no SENHOR de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.'},
    {'ref': 'Mateus 11:28', 'text': 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.'},
    {'ref': '2 Timóteo 1:7', 'text': 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.'},
    {'ref': 'Hebreus 11:1', 'text': 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.'},
    {'ref': 'Salmos 46:10', 'text': 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.'},
    {'ref': 'Efésios 2:8-9', 'text': 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.'},
    {'ref': 'Romanos 12:2', 'text': 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável, e perfeita vontade de Deus.'},
    {'ref': 'Lamentações 3:22-23', 'text': 'As misericórdias do SENHOR são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; novas são cada manhã. Grande é a tua fidelidade.'},
    {'ref': '1 Coríntios 10:13', 'text': 'Nenhuma tentação vos sobreveio, senão humana; mas Deus é fiel, que não vos deixará ser tentados acima do que podeis; mas fará também, juntamente com a tentação, o caminho da saída, para que a possais suportar.'},
    {'ref': 'Salmos 91:1-2', 'text': 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do SENHOR: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.'},
    {'ref': 'Josué 1:9', 'text': 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o SENHOR teu Deus é contigo, por onde quer que andares.'},
    {'ref': 'Gálatas 5:22-23', 'text': 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança. Contra estas coisas não há lei.'},
    {'ref': 'Mateus 6:33', 'text': 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.'},
    {'ref': 'Apocalipse 21:4', 'text': 'E enxugará toda lágrima dos seus olhos; e a morte não haverá mais, nem haverá mais luto, nem clamor, nem dor; porque já as primeiras coisas passaram.'},
  ];

  Future<void> initialize() async {
    if (_initialized) return;

    try {
      const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
      const iosSettings = DarwinInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
      );
      final initSettings = InitializationSettings(
        android: androidSettings,
        iOS: iosSettings,
      );
      await _localNotifications.initialize(
        initSettings,
        onDidReceiveNotificationResponse: _onNotificationTapped,
      );

      final androidPlugin = _localNotifications
          .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();

      await androidPlugin?.createNotificationChannel(
        const AndroidNotificationChannel(
          _dailyVerseChannel,
          'Versículo do Dia',
          description: 'Lembrete diário para ler um versículo',
          importance: Importance.high,
          enableVibration: true,
          enableLights: true,
        ),
      );

      await androidPlugin?.createNotificationChannel(
        const AndroidNotificationChannel(
          _fcmChannel,
          'Sola Scriptura BR',
          description: 'Notificações do aplicativo',
          importance: Importance.high,
          enableVibration: true,
          enableLights: true,
        ),
      );

      tz_data.initializeTimeZones();

      // Request POST_NOTIFICATIONS permission on Android 13+
      try {
        final notifPermPlugin = _localNotifications
            .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
        final granted = await notifPermPlugin?.requestNotificationsPermission();
        debugPrint('[NotificationService] POST_NOTIFICATIONS permission: $granted');
      } catch (e) {
        debugPrint('[NotificationService] Permission request error: $e');
      }

      _initialized = true;
      debugPrint('[NotificationService] Initialized OK');
    } catch (e) {
      debugPrint('[NotificationService] Init error: $e');
    }
  }

  Future<bool> checkPermission() async {
    final androidPlugin = _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
    final granted = await androidPlugin?.areNotificationsEnabled();
    debugPrint('[NotificationService] Permission check: $granted');
    return granted ?? false;
  }

  void _onNotificationTapped(NotificationResponse response) {
    debugPrint('[NotificationService] Tapped: ${response.payload}');
  }

  Future<void> showNotificationFromFCM({
    required String title,
    required String body,
    String? payload,
  }) async {
    if (!_initialized) return;

    const androidDetails = AndroidNotificationDetails(
      _fcmChannel,
      'Sola Scriptura BR',
      channelDescription: 'Notificações do aplicativo',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
    );
    const details = NotificationDetails(android: androidDetails);
    await _localNotifications.show(
      DateTime.now().millisecondsSinceEpoch.remainder(100000),
      title,
      body,
      details,
      payload: payload,
    );
  }

  Future<void> showDailyVerseNotification() async {
    if (!_initialized) return;

    final verse = _dailyVerses[Random().nextInt(_dailyVerses.length)];

    const androidDetails = AndroidNotificationDetails(
      _dailyVerseChannel,
      'Versículo do Dia',
      channelDescription: 'Lembrete diário para ler um versículo',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
      styleInformation: BigTextStyleInformation(''),
    );
    const details = NotificationDetails(android: androidDetails);
    await _localNotifications.show(
      _scheduledKeyId,
      '📖 ${verse['ref']}',
      verse['text'],
      details,
      payload: '/biblia',
    );
  }

  Future<void> scheduleDailyVerseReminder({int hour = 8, int minute = 0}) async {
    if (!_initialized) {
      await initialize();
    }
    if (!_initialized) {
      debugPrint('[NotificationService] Cannot schedule: not initialized');
      return;
    }

    // Check permission first
    final hasPermission = await checkPermission();
    if (!hasPermission) {
      debugPrint('[NotificationService] No notification permission! Requesting...');
      final notifPermPlugin = _localNotifications
          .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      final granted = await notifPermPlugin?.requestNotificationsPermission();
      debugPrint('[NotificationService] Permission re-request result: $granted');
      if (granted != true) {
        debugPrint('[NotificationService] Permission denied - cannot schedule');
        return;
      }
    }

    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_prefsKeyHour, hour);
    await prefs.setInt(_prefsKeyMinute, minute);
    await prefs.setBool(_prefsKeyEnabled, true);

    // Cancel any previous scheduled notification
    await _localNotifications.cancel(_scheduledKeyId);

    final verse = _dailyVerses[Random().nextInt(_dailyVerses.length)];
    final title = '📖 ${verse['ref']}';
    final body = verse['text'];

    const androidDetails = AndroidNotificationDetails(
      _dailyVerseChannel,
      'Versículo do Dia',
      channelDescription: 'Lembrete diário para ler um versículo',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
      enableVibration: true,
      enableLights: true,
      largeIcon: DrawableResourceAndroidBitmap('@mipmap/ic_launcher'),
    );
    const details = NotificationDetails(
      android: androidDetails,
      iOS: const DarwinNotificationDetails(
        presentAlert: true,
        presentBadge: true,
        presentSound: true,
      ),
    );

    // Calculate next occurrence
    final now = tz.TZDateTime.now(tz.local);
    var scheduled = tz.TZDateTime(tz.local, now.year, now.month, now.day, hour, minute);
    if (scheduled.isBefore(now) || scheduled.isAtSameMomentAs(now)) {
      scheduled = scheduled.add(const Duration(days: 1));
    }

    debugPrint('[NotificationService] Scheduling for: $scheduled (now=$now, hour=$hour, minute=$minute)');

    try {
      // Try exact alarm first
      await _localNotifications.zonedSchedule(
        _scheduledKeyId,
        title,
        body,
        scheduled,
        details,
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
        uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
        matchDateTimeComponents: DateTimeComponents.time,
        payload: '/biblia',
      );
      debugPrint('[NotificationService] Scheduled OK for $hour:${minute.toString().padLeft(2, '0')}');
    } catch (e) {
      debugPrint('[NotificationService] Exact alarm failed: $e');
      // Fallback: try without exact alarm
      try {
        await _localNotifications.zonedSchedule(
          _scheduledKeyId,
          title,
          body,
          scheduled,
          details,
          androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
          uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
          matchDateTimeComponents: DateTimeComponents.time,
          payload: '/biblia',
        );
        debugPrint('[NotificationService] Scheduled (inexact) for $hour:${minute.toString().padLeft(2, '0')}');
      } catch (e2) {
        debugPrint('[NotificationService] Inexact alarm also failed: $e2');
      }
    }

    // Show a test notification immediately to confirm it works
    await _showTestNotification(hour, minute);
  }

  Future<void> _showTestNotification(int hour, int minute) async {
    try {
      const androidDetails = AndroidNotificationDetails(
        _dailyVerseChannel,
        'Versículo do Dia',
        channelDescription: 'Lembrete diário para ler um versículo',
        importance: Importance.high,
        priority: Priority.high,
        icon: '@mipmap/ic_launcher',
      );
      const details = NotificationDetails(android: androidDetails);
      await _localNotifications.show(
        99999,
        '✅ Notificação ativada!',
        'Você receberá um versículo todo dia às $hour:${minute.toString().padLeft(2, '0')}',
        details,
      );
      debugPrint('[NotificationService] Test notification sent');
    } catch (e) {
      debugPrint('[NotificationService] Test notification failed: $e');
    }
  }

  Future<void> rescheduleFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final enabled = prefs.getBool(_prefsKeyEnabled) ?? false;
    if (!enabled) return;

    final hour = prefs.getInt(_prefsKeyHour) ?? 8;
    final minute = prefs.getInt(_prefsKeyMinute) ?? 0;
    await scheduleDailyVerseReminder(hour: hour, minute: minute);
  }

  Future<void> cancelDailyVerseReminder() async {
    await _localNotifications.cancel(_scheduledKeyId);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_prefsKeyEnabled, false);
    debugPrint('[NotificationService] Daily verse cancelled');
  }

  Future<void> cancelAll() async {
    await _localNotifications.cancelAll();
  }
}
