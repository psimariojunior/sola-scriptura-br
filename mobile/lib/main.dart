import 'package:flutter/material.dart';
import 'screens/biblia_screen.dart';
import 'screens/estudos_screen.dart';
import 'screens/ia_screen.dart';
import 'screens/conta_screen.dart';

const String API_URL = 'https://api-production-bb96.up.railway.app/api/v1';

void main() {
  runApp(const SolaScripturaApp());
}

class SolaScripturaApp extends StatelessWidget {
  const SolaScripturaApp({super.key});

  static const Color primary = Color(0xFF4A3728);
  static const Color pergaminho = Color(0xFFF5F0E8);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sola Scriptura',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: primary,
        scaffoldBackgroundColor: pergaminho,
        colorScheme: ColorScheme.fromSeed(
          seedColor: primary,
          background: pergaminho,
          surface: Colors.white,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          centerTitle: true,
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.w600,
            fontFamily: 'serif',
          ),
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: Colors.white,
          selectedItemColor: primary,
          unselectedItemColor: Color(0xFF8A7A6B),
          type: BottomNavigationBarType.fixed,
          selectedLabelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
        ),
        textTheme: const TextTheme(
          bodyMedium: TextStyle(fontFamily: 'serif'),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: primary,
            foregroundColor: Colors.white,
          ),
        ),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _indiceAtual = 0;

  final List<Widget> _telas = const [
    BibliaScreen(),
    EstudosScreen(),
    IaScreen(),
    ContaScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _indiceAtual,
        children: _telas,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _indiceAtual,
        onTap: (i) => setState(() => _indiceAtual = i),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.menu_book),
            label: 'Biblia',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            label: 'Estudos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.auto_awesome),
            label: 'IA',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Conta',
          ),
        ],
      ),
    );
  }
}
