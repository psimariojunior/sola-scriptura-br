import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'config/theme.dart';
import 'screens/splash_screen.dart';
import 'screens/settings_screen.dart';
import 'widgets/onboarding_tour.dart';
import 'services/notification_service.dart';
import 'services/app_lock_service.dart';

const platform = MethodChannel('com.solascriptura/deeplink');

void main() {
  WidgetsFlutterBinding.ensureInitialized();

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
  NotificationService().initialize();

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

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sola Scriptura BR',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      navigatorKey: _navigatorKey,
      routes: {
        '/settings': (_) => const SettingsScreen(),
      },
      home: _showOnboarding
          ? OnboardingTour(onComplete: _completeOnboarding)
          : SplashScreen(initialPath: _initialPath),
    );
  }
}
