import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';
import 'config/theme.dart';
import 'screens/splash_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/streak_screen.dart';
import 'widgets/onboarding_tour.dart';
import 'services/notification_service.dart';
import 'services/app_lock_service.dart';
import 'services/verse_widget_service.dart';
import 'services/streak_service.dart';
import 'services/streak_notification_service.dart';
import 'services/background_update_service.dart';

const platform = MethodChannel('com.solascriptura/deeplink');

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();

  final notif = message.notification;
  if (notif != null) {
    final androidPlugin = FlutterLocalNotificationsPlugin()
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();

    const channel = AndroidNotificationChannel(
      'ssb_fcm',
      'Sola Scriptura BR',
      description: 'Notificações do aplicativo',
      importance: Importance.high,
    );
    await androidPlugin?.createNotificationChannel(channel);

    const details = NotificationDetails(
      android: AndroidNotificationDetails(
        'ssb_fcm',
        'Sola Scriptura BR',
        channelDescription: 'Notificações do aplicativo',
        importance: Importance.high,
        priority: Priority.high,
        icon: '@mipmap/ic_launcher',
      ),
    );

    await FlutterLocalNotificationsPlugin().show(
      DateTime.now().millisecondsSinceEpoch.remainder(100000),
      notif.title ?? 'Sola Scriptura BR',
      notif.body ?? '',
      details,
      payload: message.data['route'] ?? '/',
    );
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp();

  // Crashlytics: catch Flutter errors
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;

  // Analytics
  final analytics = FirebaseAnalytics.instance;

  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: AppTheme.bgDark,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  AppLockService().init();
  final notifService = NotificationService();
  await notifService.initialize();
  await notifService.rescheduleFromPrefs();

  final streakNotifService = StreakNotificationService();
  await streakNotifService.initialize();
  await streakNotifService.scheduleStreakReminders();

  await BackgroundUpdateService.initialize();
  await BackgroundUpdateService.schedulePeriodicUpdate();

  VerseWidgetService.updateWithDailyVerse();

  runApp(const SolaScripturaApp());
}

class SolaScripturaApp extends StatefulWidget {
  const SolaScripturaApp({super.key});

  @override
  State<SolaScripturaApp> createState() => _SolaScripturaAppState();
}

class _SolaScripturaAppState extends State<SolaScripturaApp> with WidgetsBindingObserver {
  String? _initialPath;
  final GlobalKey<NavigatorState> _navigatorKey = GlobalKey<NavigatorState>();
  bool _showOnboarding = false;
  final AppLockService _appLock = AppLockService();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _checkOnboarding();
    _retrieveInitialLink();
    _listenForNewLinks();
    _setupFCM();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused) {
      _appLock.lock();
    } else if (state == AppLifecycleState.resumed) {
      if (_appLock.isEnabled && !_appLock.isAuthenticated) {
        _authenticate();
      }
      // Reschedule notifications on every resume (handles alarm loss)
      NotificationService().rescheduleFromPrefs();
    }
  }

  Future<void> _authenticate() async {
    final authenticated = await _appLock.authenticate();
    if (!authenticated && mounted) {
      SystemNavigator.pop();
    }
  }

  Future<void> _checkOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    final onboardingDone = prefs.getBool('ssb_onboarding_done') ?? false;
    if (!onboardingDone) {
      setState(() => _showOnboarding = true);
    }
  }

  Future<void> _completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('ssb_onboarding_done', true);
    setState(() => _showOnboarding = false);
  }

  Future<void> _retrieveInitialLink() async {
    try {
      final String? path = await platform.invokeMethod('getInitialLink');
      if (path != null && path.isNotEmpty) {
        setState(() => _initialPath = path);
      }
    } on PlatformException {
      // No deep link on cold start
    }
  }

  void _listenForNewLinks() {
    platform.setMethodCallHandler((call) async {
      if (call.method == 'onNewLink') {
        final String? path = call.arguments as String?;
        if (path != null && _navigatorKey.currentState != null) {
          _navigatorKey.currentState!.pushAndRemoveUntil(
            MaterialPageRoute(builder: (_) => SplashScreen(initialPath: path)),
            (route) => false,
          );
        }
      }
    });
  }

  Future<void> _setupFCM() async {
    final messaging = FirebaseMessaging.instance;
    final settings = await messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      final token = await messaging.getToken();
      debugPrint('FCM Token: $token');

      if (token != null) {
        try {
          final response = await http.post(
            Uri.parse('https://api.solascripturabr.com.br/api/notifications/register'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({'fcmToken': token, 'platform': Platform.isIOS ? 'ios' : 'android'}),
          );
          debugPrint('FCM token registered: ${response.statusCode}');
        } catch (e) {
          debugPrint('Failed to register FCM token: $e');
        }
      }

      messaging.onTokenRefresh.listen((newToken) async {
        debugPrint('FCM Token refreshed: $newToken');
        try {
          await http.post(
            Uri.parse('https://api.solascripturabr.com.br/api/notifications/register'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({'fcmToken': newToken, 'platform': 'android'}),
          );
        } catch (_) {}
      });
    }

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      debugPrint('Foreground FCM: ${message.notification?.title}');
      final notif = message.notification;
      if (notif != null) {
        NotificationService().showNotificationFromFCM(
          title: notif.title ?? 'Sola Scriptura BR',
          body: notif.body ?? '',
          payload: message.data['route'] ?? '/',
        );
      }
    });

    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      debugPrint('Notification opened: ${message.data}');
      final route = message.data['route'];
      if (route != null && route is String && mounted) {
        _navigatorKey.currentState?.pushAndRemoveUntil(
          MaterialPageRoute(builder: (_) => SplashScreen(initialPath: route)),
          (route) => false,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sola Scriptura BR',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      navigatorKey: _navigatorKey,
      routes: {
        '/settings': (_) => const SettingsScreen(),
        '/streak': (_) => const StreakScreen(),
      },
      home: _showOnboarding
          ? OnboardingTour(onComplete: _completeOnboarding)
          : SplashScreen(initialPath: _initialPath),
    );
  }
}
