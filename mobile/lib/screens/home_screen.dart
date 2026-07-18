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
    if (index == _currentIndex) return;
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
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
    showModalBottomSheet(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 8),
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.outline.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'Tema',
                style: Theme.of(context).textTheme.titleLarge,
              ),
            ),
            const SizedBox(height: 8),
            ...opcoes.map((t) => _TemaOption(
                  tema: t,
                  nome: _nomeTema(t),
                  selecionado: tema.tema == t,
                  onTap: () {
                    Navigator.pop(context);
                    tema.setTema(t);
                  },
                )),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
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
            const SizedBox(height: 8),
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.outline.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'Acoes rapidas',
                style: Theme.of(context).textTheme.titleLarge,
              ),
            ),
            const SizedBox(height: 8),
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
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Sola Scriptura'),
        actions: [
          PopupMenuButton<String>(
            icon: Icon(
              Icons.palette,
              color: theme.colorScheme.onSurface,
            ),
            tooltip: 'Tema',
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            onSelected: (value) {
              Provider.of<TemaProvider>(context, listen: false).setTema(value);
            },
            itemBuilder: (context) => [
              _buildTemaMenuItem(AppTheme.light, 'Claro', Icons.light_mode),
              _buildTemaMenuItem(AppTheme.dark, 'Escuro', Icons.dark_mode),
              _buildTemaMenuItem(AppTheme.sepia, 'Sepia', Icons.auto_stories),
              _buildTemaMenuItem(
                  AppTheme.noturno, 'Noturno', Icons.nightlight_round),
            ],
          ),
        ],
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) => setState(() => _currentIndex = index),
        physics: const BouncingScrollPhysics(),
        children: const [
          BibliaReaderScreen(),
          _PesquisaPlaceholder(),
          _EstudarPlaceholder(),
          _IaPlaceholder(),
          MaisScreen(),
        ],
      ),
      floatingActionButton: AnimatedScale(
        scale: 1.0,
        duration: const Duration(milliseconds: 200),
        child: FloatingActionButton(
          onPressed: _mostrarAcoesRapidas,
          tooltip: 'Acoes rapidas',
          child: const Icon(Icons.flash_on),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: _onTabTapped,
        animationDuration: const Duration(milliseconds: 400),
        destinations: _tabs
            .map((t) => NavigationDestination(
                  icon: Icon(t.icon),
                  selectedIcon: Icon(t.icon),
                  label: t.label,
                ))
            .toList(),
      ),
    );
  }

  PopupMenuItem<String> _buildTemaMenuItem(
      String value, String label, IconData icon) {
    final tema = Provider.of<TemaProvider>(context, listen: false);
    final isSelected = tema.tema == value;

    return PopupMenuItem<String>(
      value: value,
      child: Row(
        children: [
          Icon(
            icon,
            size: 20,
            color: isSelected
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).colorScheme.onSurface.withOpacity(0.6),
          ),
          const SizedBox(width: 12),
          Text(
            label,
            style: TextStyle(
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              color: isSelected
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).colorScheme.onSurface,
            ),
          ),
          if (isSelected) ...[
            const Spacer(),
            Icon(
              Icons.check,
              size: 18,
              color: Theme.of(context).colorScheme.primary,
            ),
          ],
        ],
      ),
    );
  }
}

class _TemaOption extends StatelessWidget {
  final String tema;
  final String nome;
  final bool selecionado;
  final VoidCallback onTap;

  const _TemaOption({
    required this.tema,
    required this.nome,
    required this.selecionado,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return ListTile(
      leading: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: _corTema(tema),
          shape: BoxShape.circle,
          border: Border.all(
            color: isDark ? Colors.white24 : Colors.black12,
            width: 2,
          ),
        ),
      ),
      title: Text(
        nome,
        style: TextStyle(
          fontWeight: selecionado ? FontWeight.w600 : FontWeight.w400,
        ),
      ),
      trailing: selecionado
          ? Icon(
              Icons.check_circle,
              color: theme.colorScheme.primary,
            )
          : null,
      onTap: onTap,
    );
  }

  Color _corTema(String t) {
    switch (t) {
      case AppTheme.dark:
        return const Color(0xFF1E1E1E);
      case AppTheme.sepia:
        return const Color(0xFFF4ECD8);
      case AppTheme.noturno:
        return const Color(0xFF000000);
      case AppTheme.light:
      default:
        return const Color(0xFFFFFFFF);
    }
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
    final theme = Theme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.search,
                size: 48,
                color: theme.colorScheme.primary,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Pesquisa Avancada',
              style: theme.textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              'Busque versiculos, palavras e conceitos em toda a Biblia',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class _EstudarPlaceholder extends StatelessWidget {
  const _EstudarPlaceholder();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.school,
                size: 48,
                color: theme.colorScheme.primary,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Estudos',
              style: theme.textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              'Exegese, teologia e estudos por livro',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class _IaPlaceholder extends StatelessWidget {
  const _IaPlaceholder();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.psychology,
                size: 48,
                color: theme.colorScheme.primary,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Assistente IA',
              style: theme.textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              'Pergunte sobre a Biblia e receba respostas fundamentadas',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
