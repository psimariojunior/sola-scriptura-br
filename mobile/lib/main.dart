import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/tema_provider.dart';
import 'screens/biblia_reader_screen.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => TemaProvider(),
      child: Builder(
        builder: (context) {
          final tema = Provider.of<TemaProvider>(context);
          return MaterialApp(
            title: 'Sola Scriptura BR',
            debugShowCheckedModeBanner: false,
            theme: tema.themeData,
            home: const BibliaReaderScreen(),
          );
        },
      ),
    );
  }
}
