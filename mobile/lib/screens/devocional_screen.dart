import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/providers.dart';

class DevocionalScreen extends ConsumerStatefulWidget {
  const DevocionalScreen({super.key});

  @override
  ConsumerState<DevocionalScreen> createState() => _DevocionalScreenState();
}

class _DevocionalScreenState extends ConsumerState<DevocionalScreen> {
  int _currentIndex = 0;

  static const List<Color> _cores = [
    Color(0xFFC9A96E),
    Color(0xFF4A6FA5),
    Color(0xFF5D8A5D),
    Color(0xFFE07A4A),
    Color(0xFF8B5A3C),
  ];

  @override
  Widget build(BuildContext context) {
    final devocionalProvider = ref.watch(devocionalProviderInstance);
    final devocionais = devocionalProvider.devocionais;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A14) : const Color(0xFFF8F6F0);
    final card = isDark ? const Color(0xFF1A1A2E) : Colors.white;
    final surface = isDark ? const Color(0xFF12121E) : const Color(0xFFF0EDE6);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A2E);
    final textSecondary = isDark ? Colors.white54 : const Color(0xFF6B7280);

    if (devocionais.isEmpty) {
      return Scaffold(
        backgroundColor: bg,
        appBar: AppBar(
          backgroundColor: surface,
          elevation: 0,
          centerTitle: true,
          leading: IconButton(
            icon: Icon(Icons.arrow_back_rounded, color: textSecondary),
            onPressed: () => Navigator.pop(context),
          ),
          title: Text(
            'Devocional Diário',
            style: GoogleFonts.merriweather(
              color: textPrimary,
              fontSize: 17,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final safeIndex = _currentIndex.clamp(0, devocionais.length - 1);
    final dev = devocionais[safeIndex];
    final cor = _cores[safeIndex % _cores.length];

    return Scaffold(
      backgroundColor: bg,
      appBar: AppBar(
        backgroundColor: surface,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded, color: textSecondary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Devocional Diário',
          style: GoogleFonts.merriweather(
            color: textPrimary,
            fontSize: 17,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.share_rounded, color: textSecondary),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          _buildPageIndicator(textSecondary, cor, devocionais.length),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: cor.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        'Devocional ${safeIndex + 1} de ${devocionais.length}',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: cor,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Center(
                    child: Text(
                      dev.titulo,
                      textAlign: TextAlign.center,
                      style: GoogleFonts.merriweather(
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: textPrimary,
                        height: 1.3,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: cor.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: cor.withOpacity(0.2)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.menu_book_rounded, color: cor, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              dev.versiculoReferencia,
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                                color: cor,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          dev.versiculoTexto,
                          style: GoogleFonts.merriweather(
                            fontSize: 16,
                            fontStyle: FontStyle.italic,
                            color: textPrimary,
                            height: 1.6,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),
                  _buildSectionTitle('Reflexão', textSecondary),
                  const SizedBox(height: 12),
                  Text(
                    dev.reflexao,
                    style: TextStyle(
                      fontSize: 15,
                      color: textPrimary,
                      height: 1.7,
                    ),
                  ),
                  const SizedBox(height: 28),
                  _buildSectionTitle('Oração', textSecondary),
                  const SizedBox(height: 12),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: card,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.grey.withOpacity(0.15)),
                    ),
                    child: Text(
                      dev.oracao,
                      style: TextStyle(
                        fontSize: 15,
                        fontStyle: FontStyle.italic,
                        color: textPrimary,
                        height: 1.6,
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
          _buildNavigationBar(bg, surface, textPrimary, textSecondary, devocionais.length),
        ],
      ),
    );
  }

  Widget _buildPageIndicator(Color textSecondary, Color cor, int total) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(
          total,
          (index) => AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            margin: const EdgeInsets.symmetric(horizontal: 3),
            width: _currentIndex == index ? 24 : 8,
            height: 8,
            decoration: BoxDecoration(
              color: _currentIndex == index ? cor : textSecondary.withOpacity(0.2),
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title, Color textSecondary) {
    return Text(
      title.toUpperCase(),
      style: TextStyle(
        fontSize: 11,
        fontWeight: FontWeight.w700,
        color: textSecondary,
        letterSpacing: 1.5,
      ),
    );
  }

  Widget _buildNavigationBar(
    Color bg,
    Color surface,
    Color textPrimary,
    Color textSecondary,
    int total,
  ) {
    return Container(
      padding: EdgeInsets.fromLTRB(
        20,
        12,
        20,
        MediaQuery.of(context).padding.bottom + 12,
      ),
      decoration: BoxDecoration(
        color: surface,
        border: Border(top: BorderSide(color: Colors.grey.withOpacity(0.15), width: 0.5)),
      ),
      child: Row(
        children: [
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _currentIndex > 0
                  ? () => setState(() => _currentIndex--)
                  : null,
              icon: Icon(Icons.arrow_back_rounded, size: 18, color: textSecondary),
              label: Text('Anterior', style: TextStyle(color: textSecondary)),
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: Colors.grey.withOpacity(0.3)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: ElevatedButton.icon(
              onPressed: _currentIndex < total - 1
                  ? () => setState(() => _currentIndex++)
                  : null,
              icon: const Icon(Icons.arrow_forward_rounded, size: 18, color: Colors.white),
              label: const Text('Próximo', style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFC9A96E),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(vertical: 14),
                elevation: 0,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
