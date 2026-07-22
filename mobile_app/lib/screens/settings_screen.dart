import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/app_lock_service.dart';
import '../config/theme.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final AppLockService _appLock = AppLockService();
  bool _appLockEnabled = false;
  bool _biometricsAvailable = false;
  String _selectedTheme = 'dark';

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    final biometricsAvailable = await _appLock.isBiometricsAvailable();
    setState(() {
      _appLockEnabled = prefs.getBool('ssb_app_lock_enabled') ?? false;
      _biometricsAvailable = biometricsAvailable;
      _selectedTheme = prefs.getString('ssb_theme') ?? 'dark';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.bgDark,
        title: const Text('Configurações', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: AppTheme.goldPrimary),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSection(
            title: 'Segurança',
            children: [
              if (_biometricsAvailable)
                SwitchListTile(
                  title: const Text('Bloqueio por Biometria', style: TextStyle(color: Colors.white)),
                  subtitle: const Text('Use impressão digital ou reconhecimento facial', style: TextStyle(color: Colors.white54)),
                  value: _appLockEnabled,
                  activeColor: AppTheme.goldPrimary,
                  onChanged: (value) async {
                    await _appLock.setEnabled(value);
                    setState(() => _appLockEnabled = value);
                  },
                ),
              if (!_biometricsAvailable)
                const ListTile(
                  title: Text('Biometria', style: TextStyle(color: Colors.white54)),
                  subtitle: Text('Não disponível neste dispositivo', style: TextStyle(color: Colors.white38)),
                ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSection(
            title: 'Aparência',
            children: [
              _buildThemeTile('dark', 'Escuro'),
              _buildThemeTile('light', 'Claro'),
              _buildThemeTile('sepia', 'Sépia'),
              _buildThemeTile('dim', 'Dim'),
            ],
          ),
          const SizedBox(height: 16),
          _buildSection(
            title: 'Sobre',
            children: [
              const ListTile(
                title: Text('Versão', style: TextStyle(color: Colors.white)),
                subtitle: Text('1.1.0', style: TextStyle(color: Colors.white54)),
              ),
              const ListTile(
                title: Text('Desenvolvido com', style: TextStyle(color: Colors.white)),
                subtitle: Text('Flutter + WebView', style: TextStyle(color: Colors.white54)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSection({required String title, required List<Widget> children}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: AppTheme.goldPrimary,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.05),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(children: children),
        ),
      ],
    );
  }

  Widget _buildThemeTile(String theme, String label) {
    return RadioListTile<String>(
      title: Text(label, style: const TextStyle(color: Colors.white)),
      value: theme,
      groupValue: _selectedTheme,
      activeColor: AppTheme.goldPrimary,
      onChanged: (value) async {
        if (value != null) {
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('ssb_theme', value);
          setState(() => _selectedTheme = value);
        }
      },
    );
  }
}
