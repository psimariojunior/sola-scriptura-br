import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'config/theme.dart';
import 'screens/splash_screen.dart';

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

  runApp(const SolaScripturaApp());
}

class SolaScripturaApp extends StatefulWidget {
  const SolaScripturaApp({super.key});

  @override
  State<SolaScripturaApp> createState() => _SolaScripturaAppState();
}

class _SolaScripturaAppState extends State<SolaScripturaApp> {
  String? _initialPath;
  final GlobalKey<NavigatorState> _navigatorKey = GlobalKey<NavigatorState>();

  @override
  void initState() {
    super.initState();
    _retrieveInitialLink();
    _listenForNewLinks();
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
      home: SplashScreen(initialPath: _initialPath),
    );
  }
}
