import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/providers.dart';

class ConfiguracoesScreen extends ConsumerStatefulWidget {
  const ConfiguracoesScreen({super.key});

  @override
  ConsumerState<ConfiguracoesScreen> createState() => _ConfiguracoesScreenState();
}

class _ConfiguracoesScreenState extends ConsumerState<ConfiguracoesScreen> {
  String _themeMode = 'dark';
  bool _lembreteDiario = false;

  static const Color _accent = Color(0xFFC9A96E);

  @override
  Widget build(BuildContext context) {
    final settings = ref.watch(settingsProviderInstance);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A14) : const Color(0xFFF8F6F0);
    final card = isDark ? const Color(0xFF1A1A2E) : Colors.white;
    final surface = isDark ? const Color(0xFF12121E) : const Color(0xFFF0EDE6);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A2E);
    final textSecondary = isDark ? Colors.white54 : const Color(0xFF6B7280);

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
          'Configurações',
          style: GoogleFonts.merriweather(
            color: textPrimary,
            fontSize: 17,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionHeader('APARÊNCIA', textSecondary),
            const SizedBox(height: 12),
            _buildThemeSection(card, textPrimary, textSecondary),
            const SizedBox(height: 12),
            _buildFontSection(card, textPrimary, textSecondary, settings.fontSize),
            const SizedBox(height: 28),

            _buildSectionHeader('BÍBLIA', textSecondary),
            const SizedBox(height: 12),
            _buildTranslationSection(card, textPrimary, textSecondary, settings.traducaoPadrao),
            const SizedBox(height: 28),

            _buildSectionHeader('NOTIFICAÇÕES', textSecondary),
            const SizedBox(height: 12),
            _buildNotificationSection(card, textPrimary, textSecondary, settings.notificacoesAtivadas),
            const SizedBox(height: 28),

            _buildSectionHeader('IDIOMA', textSecondary),
            const SizedBox(height: 12),
            _buildLanguageSection(card, textPrimary, textSecondary, settings.idioma),
            const SizedBox(height: 28),

            _buildSectionHeader('SOBRE', textSecondary),
            const SizedBox(height: 12),
            _buildAboutSection(card, textPrimary, textSecondary),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title, Color textSecondary) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 11,
        fontWeight: FontWeight.w700,
        color: textSecondary,
        letterSpacing: 1.5,
      ),
    );
  }

  Widget _buildThemeSection(Color card, Color textPrimary, Color textSecondary) {
    return Container(
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _buildThemeOption('Claro', Icons.light_mode_rounded, 'light', textPrimary),
          _buildDivider(textSecondary),
          _buildThemeOption('Escuro', Icons.dark_mode_rounded, 'dark', textPrimary),
          _buildDivider(textSecondary),
          _buildThemeOption('Sistema', Icons.brightness_auto_rounded, 'system', textPrimary),
        ],
      ),
    );
  }

  Widget _buildThemeOption(String label, IconData icon, String value, Color textPrimary) {
    final selected = _themeMode == value;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => setState(() => _themeMode = value),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Icon(icon, size: 22, color: selected ? _accent : Colors.grey),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: selected ? _accent : textPrimary,
                  ),
                ),
              ),
              if (selected)
                const Icon(Icons.check_circle_rounded, color: _accent, size: 22)
              else
                Icon(Icons.circle_outlined, color: Colors.grey.withOpacity(0.4), size: 22),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFontSection(Color card, Color textPrimary, Color textSecondary, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.format_size_rounded, size: 22, color: Colors.grey),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  'Tamanho da Fonte',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: textPrimary,
                  ),
                ),
              ),
              Text(
                '${fontSize.toInt()}px',
                style: TextStyle(fontSize: 13, color: _accent, fontWeight: FontWeight.w600),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SliderTheme(
            data: SliderThemeData(
              activeTrackColor: _accent,
              inactiveTrackColor: Colors.grey.withOpacity(0.2),
              thumbColor: _accent,
              overlayColor: _accent.withOpacity(0.1),
            ),
            child: Slider(
              value: fontSize,
              min: 12,
              max: 24,
              divisions: 12,
              onChanged: (v) => ref.read(settingsProviderInstance).setFontSize(v),
            ),
          ),
          Text(
            'Exemplo de texto bíblico nesta fonte',
            style: TextStyle(
              fontSize: fontSize,
              fontFamily: 'serif',
              color: textPrimary,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTranslationSection(Color card, Color textPrimary, Color textSecondary, String traducaoAtual) {
    final traducoes = ['NVI', 'ACF', 'KJV', 'NAA', 'TB', 'WEB', 'ARC'];
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.translate_rounded, size: 22, color: Colors.grey),
              const SizedBox(width: 14),
              Text(
                'Tradução Padrão',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                  color: textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: traducoes.map((t) {
              final selected = traducaoAtual == t;
              return GestureDetector(
                onTap: () => ref.read(settingsProviderInstance).setTraducao(t),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: selected ? _accent.withOpacity(0.15) : Colors.grey.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: selected ? _accent.withOpacity(0.5) : Colors.grey.withOpacity(0.2),
                    ),
                  ),
                  child: Text(
                    t,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                      color: selected ? _accent : textSecondary,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationSection(Color card, Color textPrimary, Color textSecondary, bool notificacoesAtivadas) {
    return Container(
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _buildSwitchTile(
            Icons.notifications_none_rounded,
            'Notificações push',
            notificacoesAtivadas,
            (v) => ref.read(settingsProviderInstance).toggleNotificacoes(),
            textPrimary,
          ),
          _buildDivider(textSecondary),
          _buildSwitchTile(
            Icons.wb_sunny_outlined,
            'Lembrete diário',
            _lembreteDiario,
            (v) => setState(() => _lembreteDiario = v),
            textPrimary,
          ),
        ],
      ),
    );
  }

  Widget _buildSwitchTile(
    IconData icon,
    String title,
    bool value,
    ValueChanged<bool> onChanged,
    Color textPrimary,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Icon(icon, size: 22, color: Colors.grey),
          const SizedBox(width: 14),
          Expanded(
            child: Text(
              title,
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w500,
                color: textPrimary,
              ),
            ),
          ),
          Switch.adaptive(
            value: value,
            onChanged: onChanged,
            activeColor: _accent,
            activeTrackColor: _accent.withOpacity(0.3),
          ),
        ],
      ),
    );
  }

  Widget _buildLanguageSection(Color card, Color textPrimary, Color textSecondary, String idiomaAtual) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _buildLanguageOption('Português', 'pt', '🇧🇷', textPrimary, idiomaAtual),
          _buildLanguageOption('English', 'en', '🇺🇸', textPrimary, idiomaAtual),
          _buildLanguageOption('Español', 'es', '🇪🇸', textPrimary, idiomaAtual),
        ],
      ),
    );
  }

  Widget _buildLanguageOption(String label, String value, String flag, Color textPrimary, String idiomaAtual) {
    final selected = idiomaAtual == value;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => ref.read(settingsProviderInstance).setIdioma(value),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12),
          child: Row(
            children: [
              Text(flag, style: const TextStyle(fontSize: 22)),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: selected ? _accent : textPrimary,
                  ),
                ),
              ),
              if (selected)
                const Icon(Icons.check_circle_rounded, color: _accent, size: 22),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAboutSection(Color card, Color textPrimary, Color textSecondary) {
    return Container(
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _buildAboutTile(Icons.info_outline_rounded, 'Sobre o app', 'v1.0.0', textPrimary),
          _buildDivider(textSecondary),
          _buildAboutTile(Icons.description_outlined, 'Termos de uso', null, textPrimary),
          _buildDivider(textSecondary),
          _buildAboutTile(Icons.privacy_tip_outlined, 'Política de privacidade', null, textPrimary),
          _buildDivider(textSecondary),
          _buildAboutTile(Icons.star_border_rounded, 'Avaliar o app', null, textPrimary),
          _buildDivider(textSecondary),
          _buildAboutTile(Icons.share_rounded, 'Compartilhar', null, textPrimary),
        ],
      ),
    );
  }

  Widget _buildAboutTile(IconData icon, String title, String? trailing, Color textPrimary) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Icon(icon, size: 22, color: Colors.grey),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: textPrimary,
                  ),
                ),
              ),
              if (trailing != null)
                Text(trailing, style: TextStyle(fontSize: 13, color: Colors.grey)),
              const SizedBox(width: 4),
              Icon(Icons.chevron_right_rounded, size: 18, color: Colors.grey.withOpacity(0.5)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDivider(Color textSecondary) {
    return Divider(
      height: 1,
      indent: 52,
      color: Colors.grey.withOpacity(0.15),
    );
  }
}
