import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'biblia_screen.dart';
import 'estudos_screen.dart';
import 'ia_screen.dart';
import 'conta_screen.dart';
import 'pesquisa_screen.dart';
import 'devocional_screen.dart';
import 'flashcards_screen.dart';
import 'teologia_screen.dart';
import 'exegese_screen.dart';
import 'cronologia_screen.dart';
import 'mapas_screen.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          _HomeTab(),
          _BibliaNavTab(),
          _EstudosTab(),
          _IaNavTab(),
          _ContaNavTab(),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          onDestinationSelected: (i) => setState(() => _currentIndex = i),
          backgroundColor: isDark ? const Color(0xFF12121E) : Colors.white,
          indicatorColor: const Color(0xFFC9A96E).withOpacity(0.15),
          labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
          height: 65,
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home, color: Color(0xFFC9A96E)),
              label: 'Início',
            ),
            NavigationDestination(
              icon: Icon(Icons.menu_book_outlined),
              selectedIcon: Icon(Icons.menu_book, color: Color(0xFFC9A96E)),
              label: 'Bíblia',
            ),
            NavigationDestination(
              icon: Icon(Icons.school_outlined),
              selectedIcon: Icon(Icons.school, color: Color(0xFFC9A96E)),
              label: 'Estudos',
            ),
            NavigationDestination(
              icon: Icon(Icons.auto_awesome_outlined),
              selectedIcon: Icon(Icons.auto_awesome, color: Color(0xFFC9A96E)),
              label: 'IA',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outline),
              selectedIcon: Icon(Icons.person, color: Color(0xFFC9A96E)),
              label: 'Conta',
            ),
          ],
        ),
      ),
    );
  }
}

class _HomeTab extends StatelessWidget {
  const _HomeTab();

  static const Color _accent = Color(0xFFC9A96E);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A14) : const Color(0xFFF8F6F0);
    final card = isDark ? const Color(0xFF1A1A2E) : Colors.white;
    final surface = isDark ? const Color(0xFF12121E) : const Color(0xFFF0EDE6);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A2E);
    final textSecondary = isDark ? Colors.white54 : const Color(0xFF6B7280);

    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 8),
            Text(
              'Sola Scriptura',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 30,
                fontWeight: FontWeight.w700,
                color: textPrimary,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Estudo bíblico aprofundado',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 14,
                color: textSecondary,
              ),
            ),
            const SizedBox(height: 28),

            _QuickAction(
              icon: Icons.menu_book_rounded,
              title: 'Leitura Diária',
              subtitle: 'Continue de onde parou',
              color: _accent,
              card: card,
              textPrimary: textPrimary,
              textSecondary: textSecondary,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const BibliaScreen()),
              ),
            ),
            const SizedBox(height: 12),

            _QuickAction(
              icon: Icons.auto_stories_rounded,
              title: 'Devocional',
              subtitle: 'Reflexão do dia',
              color: const Color(0xFF4A6FA5),
              card: card,
              textPrimary: textPrimary,
              textSecondary: textSecondary,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const DevocionalScreen()),
              ),
            ),
            const SizedBox(height: 12),

            _QuickAction(
              icon: Icons.style_rounded,
              title: 'Flashcards',
              subtitle: 'Memorize versículos',
              color: const Color(0xFF5D8A5D),
              card: card,
              textPrimary: textPrimary,
              textSecondary: textSecondary,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const FlashcardsScreen()),
              ),
            ),
            const SizedBox(height: 28),

            Text(
              'Ferramentas',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 20,
                fontWeight: FontWeight.w700,
                color: textPrimary,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Estudo bíblico aprofundado',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 13,
                color: textSecondary,
              ),
            ),
            const SizedBox(height: 16),

            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.5,
              ),
              itemCount: _ferramentas.length,
              itemBuilder: (context, index) {
                final f = _ferramentas[index];
                return Material(
                  color: card,
                  borderRadius: BorderRadius.circular(14),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(14),
                    onTap: () {
                      final screen = f['screen'] as Widget Function();
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => screen()),
                      );
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(
                            f['icone'] as IconData,
                            color: f['cor'] as Color,
                            size: 24,
                          ),
                          const Spacer(),
                          Text(
                            f['titulo'] as String,
                            style: TextStyle(
                              color: textPrimary,
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            f['descricao'] as String,
                            style: TextStyle(
                              color: textSecondary,
                              fontSize: 11,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  static final List<Map<String, dynamic>> _ferramentas = [
    {
      'titulo': 'Teologia',
      'descricao': 'Doutrinas e estudo sistemático',
      'icone': Icons.auto_stories_rounded,
      'cor': Color(0xFFC9A96E),
      'screen': () => const TeologiaScreen(),
    },
    {
      'titulo': 'Pesquisa',
      'descricao': 'Busca em traduções',
      'icone': Icons.search_rounded,
      'cor': Color(0xFF6B9BD2),
      'screen': () => const PesquisaScreen(),
    },
    {
      'titulo': 'Exegese',
      'descricao': 'Análise bíblica aprofundada',
      'icone': Icons.analytics_rounded,
      'cor': Color(0xFF7BC67E),
      'screen': () => const ExegeseScreen(),
    },
    {
      'titulo': 'Cronologia',
      'descricao': 'Linha do tempo bíblica',
      'icone': Icons.timeline_rounded,
      'cor': Color(0xFFE07A4A),
      'screen': () => const CronologiaScreen(),
    },
    {
      'titulo': 'Mapas',
      'descricao': 'Locais bíblicos interativos',
      'icone': Icons.map_rounded,
      'cor': Color(0xFF8B5A3C),
      'screen': () => const MapasScreen(),
    },
  ];
}

class _QuickAction extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final Color card;
  final Color textPrimary;
  final Color textSecondary;
  final VoidCallback onTap;

  const _QuickAction({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.card,
    required this.textPrimary,
    required this.textSecondary,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: card,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: color, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        color: textPrimary,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: TextStyle(
                        color: textSecondary,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right_rounded, color: textSecondary, size: 22),
            ],
          ),
        ),
      ),
    );
  }
}

class _BibliaNavTab extends StatelessWidget {
  const _BibliaNavTab();

  @override
  Widget build(BuildContext context) {
    return const BibliaScreen();
  }
}

class _EstudosTab extends StatelessWidget {
  const _EstudosTab();

  @override
  Widget build(BuildContext context) {
    return const EstudosScreen();
  }
}

class _IaNavTab extends StatelessWidget {
  const _IaNavTab();

  @override
  Widget build(BuildContext context) {
    return const IaScreen();
  }
}

class _ContaNavTab extends StatelessWidget {
  const _ContaNavTab();

  @override
  Widget build(BuildContext context) {
    return const ContaScreen();
  }
}
