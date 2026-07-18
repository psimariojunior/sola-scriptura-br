import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/tema_provider.dart';
import '../theme/app_theme.dart';
import 'biblia_reader_screen.dart';
import 'mais_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  final PageController _pageController = PageController();

  static const _tabs = [
    _TabConfig(icon: Icons.menu_book, label: 'Biblia'),
    _TabConfig(icon: Icons.search, label: 'Pesquisar'),
    _TabConfig(icon: Icons.school, label: 'Estudar'),
    _TabConfig(icon: Icons.psychology, label: 'IA'),
    _TabConfig(icon: Icons.more_horiz, label: 'Mais'),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onTabTapped(int index) {
    _pageController.jumpToPage(index);
    setState(() => _currentIndex = index);
  }

  void _trocarTema() {
    final tema = Provider.of<TemaProvider>(context, listen: false);
    final opcoes = [
      AppTheme.light,
      AppTheme.dark,
      AppTheme.sepia,
      AppTheme.noturno,
    ];
    showDialog<String>(
      context: context,
      builder: (context) => SimpleDialog(
        title: const Text('Tema'),
        children: opcoes
            .map((t) => SimpleDialogOption(
                  onPressed: () => Navigator.pop(context, t),
                  child: Text(_nomeTema(t)),
                ))
            .toList(),
      ),
    ).then((escolhido) {
      if (escolhido != null) {
        tema.setTema(escolhido);
      }
    });
  }

  String _nomeTema(String t) {
    switch (t) {
      case AppTheme.dark:
        return 'Escuro';
      case AppTheme.sepia:
        return 'Sepia';
      case AppTheme.noturno:
        return 'Noturno';
      case AppTheme.light:
      default:
        return 'Claro';
    }
  }

  void _mostrarAcoesRapidas() {
    showModalBottomSheet(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.bookmark),
              title: const Text('Favoritos'),
              onTap: () {
                Navigator.pop(context);
                context.push('/favoritos');
              },
            ),
            ListTile(
              leading: const Icon(Icons.note),
              title: const Text('Notas'),
              onTap: () {
                Navigator.pop(context);
                context.push('/notas');
              },
            ),
            ListTile(
              leading: const Icon(Icons.person),
              title: const Text('Minha Conta'),
              onTap: () {
                Navigator.pop(context);
                context.push('/conta');
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sola Scriptura'),
        actions: [
          IconButton(
            icon: const Icon(Icons.palette),
            tooltip: 'Tema',
            onPressed: _trocarTema,
          ),
        ],
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) => setState(() => _currentIndex = index),
        children: const [
          BibliaReaderScreen(),
          _PesquisaPlaceholder(),
          _EstudarPlaceholder(),
          _IaPlaceholder(),
          MaisScreen(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _mostrarAcoesRapidas,
        tooltip: 'Acoes rapidas',
        child: const Icon(Icons.flash_on),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: _onTabTapped,
        destinations: _tabs
            .map((t) => NavigationDestination(
                  icon: Icon(t.icon),
                  label: t.label,
                ))
            .toList(),
      ),
    );
  }
}

class _TabConfig {
  final IconData icon;
  final String label;

  const _TabConfig({required this.icon, required this.label});
}

class _PesquisaPlaceholder extends StatelessWidget {
  const _PesquisaPlaceholder();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search, size: 64, color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 16),
          Text(
            'Pesquisa Avancada',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          Text(
            'Busque versiculos, palavras e conceitos',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ],
      ),
    );
  }
}

class _EstudarPlaceholder extends StatelessWidget {
  const _EstudarPlaceholder();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.school, size: 64, color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 16),
          Text(
            'Estudos',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          Text(
            'Exegese, teologia e estudos por livro',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ],
      ),
    );
  }
}

class _IaPlaceholder extends StatelessWidget {
  const _IaPlaceholder();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.psychology, size: 64, color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 16),
          Text(
            'Assistente IA',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          Text(
            'Pergunte sobre a Biblia',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ],
      ),
    );
  }
}
