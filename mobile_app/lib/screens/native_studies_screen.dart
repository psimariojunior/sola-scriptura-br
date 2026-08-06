import 'package:flutter/material.dart';
import '../config/theme.dart';

class StudyItem {
  final IconData icon;
  final String title;
  final String subtitle;
  final String route;
  final Color color;

  const StudyItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.route,
    required this.color,
  });
}

class NativeStudiesScreen extends StatelessWidget {
  final Function(String route) onNavigate;

  const NativeStudiesScreen({super.key, required this.onNavigate});

  static const List<StudyItem> _quickAccess = [
    StudyItem(
      icon: Icons.auto_stories_rounded,
      title: 'Planos de Leitura',
      subtitle: 'Planos diários e temáticos',
      route: '/planos',
      color: Color(0xFF3B82F6),
    ),
    StudyItem(
      icon: Icons.psychology_rounded,
      title: 'Quiz Bíblico',
      subtitle: 'Teste seus conhecimentos',
      route: '/quiz',
      color: Color(0xFF10B981),
    ),
    StudyItem(
      icon: Icons.style_rounded,
      title: 'Flashcards',
      subtitle: 'Memorize versículos',
      route: '/flashcards',
      color: Color(0xFFF59E0B),
    ),
    StudyItem(
      icon: Icons.compare_arrows_rounded,
      title: 'Harmonia Sinótica',
      subtitle: 'Mateus, Marcos, Lucas e João',
      route: '/harmonia',
      color: Color(0xFF8B5CF6),
    ),
    StudyItem(
      icon: Icons.map_rounded,
      title: 'Atlas Bíblico',
      subtitle: 'Locais bíblicos interativos',
      route: '/atlas',
      color: Color(0xFFEF4444),
    ),
    StudyItem(
      icon: Icons.history_rounded,
      title: 'Cronologia',
      subtitle: 'Linha do tempo bíblica',
      route: '/cronologia',
      color: Color(0xFF06B6D4),
    ),
  ];

  static const List<StudyItem> _deepStudy = [
    StudyItem(
      icon: Icons.translate_rounded,
      title: 'Interlinear',
      subtitle: 'Hebraico e Grego palavra-a-palavra',
      route: '/biblia/interlinear',
      color: Color(0xFFA17A2C),
    ),
    StudyItem(
      icon: Icons.search_rounded,
      title: 'Concordância',
      subtitle: 'Encontre palavras no texto',
      route: '/ferramentas/concordancia',
      color: Color(0xFF3B82F6),
    ),
    StudyItem(
      icon: Icons.link_rounded,
      title: 'Referências Cruzadas',
      subtitle: '29.000+ conexões',
      route: '/referencias',
      color: Color(0xFF10B981),
    ),
    StudyItem(
      icon: Icons.comment_bank_rounded,
      title: 'Comentários',
      subtitle: '8 teólogos clássicos',
      route: '/comparar-comentarios',
      color: Color(0xFFF59E0B),
    ),
    StudyItem(
      icon: Icons.auto_awesome_rounded,
      title: 'Estudo com IA',
      subtitle: 'Pergunte qualquer coisa',
      route: '/ia',
      color: Color(0xFF8B5CF6),
    ),
    StudyItem(
      icon: Icons.category_rounded,
      title: 'Teologia Sistemática',
      subtitle: '13 categorias doutrinárias',
      route: '/teologia',
      color: Color(0xFFEF4444),
    ),
  ];

  static const List<StudyItem> _extras = [
    StudyItem(
      icon: Icons.star_rounded,
      title: 'Favoritos',
      subtitle: 'Versículos salvos',
      route: '/favorites',
      color: Color(0xFFF59E0B),
    ),
    StudyItem(
      icon: Icons.note_alt_rounded,
      title: 'Notas Pessoais',
      subtitle: 'Suas anotações',
      route: '/notes',
      color: Color(0xFF3B82F6),
    ),
    StudyItem(
      icon: Icons.download_rounded,
      title: 'Traduções Offline',
      subtitle: 'Baixar para ler sem internet',
      route: '/offline-translations',
      color: Color(0xFF10B981),
    ),
    StudyItem(
      icon: Icons.leaderboard_rounded,
      title: 'Meu Progresso',
      subtitle: 'Sequência e estatísticas',
      route: '/streak',
      color: Color(0xFFEF4444),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 80),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeader(),
          _buildSection('Acesso Rápido', _quickAccess),
          _buildSection('Estudo Profundo', _deepStudy),
          _buildSection('Meus Dados', _extras),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
      child: const Row(
        children: [
          Icon(Icons.school_rounded, color: AppTheme.goldPrimary, size: 24),
          SizedBox(width: 10),
          Text(
            'Estudos',
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSection(String title, List<StudyItem> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Text(
            title,
            style: const TextStyle(
              color: AppTheme.goldPrimary,
              fontSize: 13,
              fontWeight: FontWeight.bold,
              letterSpacing: 1,
            ),
          ),
        ),
        SizedBox(
          height: 115,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            itemCount: items.length,
            itemBuilder: (context, index) {
              return _buildStudyCard(items[index]);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildStudyCard(StudyItem item) {
    return GestureDetector(
      onTap: () => onNavigate(item.route),
      child: Container(
        width: 140,
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.04),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: item.color.withValues(alpha: 0.15),
            width: 0.5,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: item.color.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(item.icon, color: item.color, size: 24),
            ),
            const SizedBox(height: 10),
            Text(
              item.title,
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              item.subtitle,
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: AppTheme.textMuted,
                fontSize: 9,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
