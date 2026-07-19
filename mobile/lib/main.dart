import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'database/database_helper.dart';
import 'providers/auth_provider.dart';
import 'providers/biblia_provider.dart';
import 'providers/offline_provider.dart';
import 'providers/pesquisa_provider.dart';
import 'providers/tema_provider.dart';
import 'router/app_router.dart';
import 'services/api_client.dart';
import 'services/biblia_service.dart';
import 'services/pesquisa_service.dart';
import 'services/auth_service.dart';
import 'services/search_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await DatabaseHelper().database;
  await BibliaService.init();
  unawaited(SearchService.init());

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final ApiClient _apiClient;
  late final BibliaService _bibliaService;
  late final PesquisaService _pesquisaService;
  late final AuthService _authService;
  late final AppRouter _appRouter;
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    _apiClient = ApiClient();
    _bibliaService = BibliaService();
    _pesquisaService = PesquisaService(_apiClient);
    _authService = AuthService(_apiClient);
    _appRouter = AppRouter(AuthProvider(_authService));
    _initAsync();
  }

  Future<void> _initAsync() async {
    await _authService.init();
    if (mounted) {
      setState(() => _initialized = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_initialized) {
      return const MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: Center(
            child: CircularProgressIndicator(),
          ),
        ),
      );
    }

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => TemaProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider(_authService)),
        ChangeNotifierProvider(create: (_) => BibliaProvider(_bibliaService)),
        ChangeNotifierProvider(create: (_) => PesquisaProvider(_pesquisaService)),
        ChangeNotifierProvider(create: (_) => OfflineProvider()..init()),
      ],
      child: Builder(
        builder: (context) {
          final tema = Provider.of<TemaProvider>(context);
          return MaterialApp.router(
            title: 'Sola Scriptura BR',
            debugShowCheckedModeBanner: false,
            theme: tema.themeData,
            routerConfig: _appRouter.router,
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    _apiClient.dispose();
    super.dispose();
  }
}
