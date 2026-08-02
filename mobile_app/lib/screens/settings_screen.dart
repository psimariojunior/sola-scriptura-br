import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/app_lock_service.dart';
import '../services/notification_service.dart';
import '../services/streak_service.dart';
import '../services/streak_notification_service.dart';
import '../services/offline_sync_service.dart';
import '../config/theme.dart';
import 'streak_screen.dart';

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
  bool _dailyNotificationEnabled = false;
  int _notificationHour = 8;
  int _notificationMinute = 0;
  bool _streakRemindersEnabled = true;
  int _streakReminderHour = 20;
  int _streakReminderMinute = 0;
  int _cachedChapters = 0;
  DateTime? _lastSync;
  int _currentStreak = 0;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    final biometricsAvailable = await _appLock.isBiometricsAvailable();
    final cached = await OfflineSyncService.getCachedChapterCount();
    final lastSync = await OfflineSyncService.getLastSyncTime();
    final streak = await StreakService.getCurrentStreak();

    setState(() {
      _appLockEnabled = prefs.getBool('ssb_app_lock_enabled') ?? false;
      _biometricsAvailable = biometricsAvailable;
      _selectedTheme = prefs.getString('ssb_theme') ?? 'dark';
      _dailyNotificationEnabled = prefs.getBool('ssb_daily_notif_enabled') ?? false;
      _notificationHour = prefs.getInt('ssb_notif_hour') ?? 8;
      _notificationMinute = prefs.getInt('ssb_notif_minute') ?? 0;
      _streakRemindersEnabled = prefs.getBool('ssb_streak_reminders_enabled') ?? true;
      _streakReminderHour = prefs.getInt('ssb_streak_reminder_hour') ?? 20;
      _streakReminderMinute = prefs.getInt('ssb_streak_reminder_minute') ?? 0;
      _cachedChapters = cached;
      _lastSync = lastSync;
      _currentStreak = streak;
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
            title: 'Minha Sequência',
            children: [
              ListTile(
                leading: const Icon(Icons.local_fire_department, color: AppTheme.goldPrimary),
                title: Text(
                  '🔥 $_currentStreak dias seguidos',
                  style: const TextStyle(color: Colors.white),
                ),
                subtitle: const Text('Toque para ver detalhes', style: TextStyle(color: Colors.white54)),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const StreakScreen()),
                  );
                },
              ),
            ],
          ),
          const SizedBox(height: 16),
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
            title: 'Notificações',
            children: [
              SwitchListTile(
                title: const Text('Versículo do Dia', style: TextStyle(color: Colors.white)),
                subtitle: Text(
                  _dailyNotificationEnabled
                      ? 'Todo dia às ${_notificationHour.toString().padLeft(2, '0')}:${_notificationMinute.toString().padLeft(2, '0')}'
                      : 'Desativado',
                  style: const TextStyle(color: Colors.white54),
                ),
                value: _dailyNotificationEnabled,
                activeColor: AppTheme.goldPrimary,
                onChanged: (value) async {
                  if (value) {
                    await NotificationService().scheduleDailyVerseReminder(
                      hour: _notificationHour,
                      minute: _notificationMinute,
                    );
                  } else {
                    await NotificationService().cancelDailyVerseReminder();
                  }
                  setState(() => _dailyNotificationEnabled = value);
                },
              ),
              if (_dailyNotificationEnabled)
                ListTile(
                  title: const Text('Horário', style: TextStyle(color: Colors.white54)),
                  trailing: Text(
                    '${_notificationHour.toString().padLeft(2, '0')}:${_notificationMinute.toString().padLeft(2, '0')}',
                    style: const TextStyle(color: AppTheme.goldPrimary),
                  ),
                  onTap: () async {
                    final time = await showTimePicker(
                      context: context,
                      initialTime: TimeOfDay(hour: _notificationHour, minute: _notificationMinute),
                    );
                    if (time != null) {
                      setState(() {
                        _notificationHour = time.hour;
                        _notificationMinute = time.minute;
                      });
                      await NotificationService().scheduleDailyVerseReminder(
                        hour: time.hour,
                        minute: time.minute,
                      );
                    }
                  },
                ),
              SwitchListTile(
                title: const Text('Lembretes de Sequência', style: TextStyle(color: Colors.white)),
                subtitle: Text(
                  _streakRemindersEnabled
                      ? 'Todo dia às ${_streakReminderHour.toString().padLeft(2, '0')}:${_streakReminderMinute.toString().padLeft(2, '0')}'
                      : 'Desativado',
                  style: const TextStyle(color: Colors.white54),
                ),
                value: _streakRemindersEnabled,
                activeColor: AppTheme.goldPrimary,
                onChanged: (value) async {
                  await StreakNotificationService().setEnabled(value);
                  setState(() => _streakRemindersEnabled = value);
                },
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
            title: 'Offline',
            children: [
              ListTile(
                leading: const Icon(Icons.cloud_download, color: AppTheme.goldPrimary),
                title: const Text('Capítulos em Cache', style: TextStyle(color: Colors.white)),
                subtitle: Text('$_cachedChapters capítulos salvos', style: const TextStyle(color: Colors.white54)),
              ),
              if (_lastSync != null)
                ListTile(
                  leading: const Icon(Icons.sync, color: AppTheme.goldPrimary),
                  title: const Text('Última Sincronização', style: TextStyle(color: Colors.white)),
                  subtitle: Text(_formatDate(_lastSync!), style: const TextStyle(color: Colors.white54)),
                ),
              ListTile(
                leading: const Icon(Icons.cloud_upload, color: AppTheme.goldPrimary),
                title: const Text('Sincronizar Agora', style: TextStyle(color: Colors.white)),
                subtitle: const Text('Enviar dados para o servidor', style: TextStyle(color: Colors.white54)),
                onTap: () async {
                  await OfflineSyncService.syncWithServer();
                  await _loadSettings();
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Sincronização concluída!')),
                    );
                  }
                },
              ),
              ListTile(
                leading: const Icon(Icons.delete_outline, color: Colors.red),
                title: const Text('Limpar Cache', style: TextStyle(color: Colors.red)),
                subtitle: const Text('Remover capítulos salvos', style: TextStyle(color: Colors.white54)),
                onTap: () async {
                  final confirm = await showDialog<bool>(
                    context: context,
                    builder: (context) => AlertDialog(
                      backgroundColor: AppTheme.surfaceDark,
                      title: const Text('Limpar Cache?', style: TextStyle(color: Colors.white)),
                      content: const Text('Isso removerá todos os capítulos salvos offline.', style: TextStyle(color: Colors.white70)),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(context, false),
                          child: const Text('Cancelar'),
                        ),
                        TextButton(
                          onPressed: () => Navigator.pop(context, true),
                          child: const Text('Limpar', style: TextStyle(color: Colors.red)),
                        ),
                      ],
                    ),
                  );
                  if (confirm == true) {
                    await OfflineSyncService.clearCache();
                    await _loadSettings();
                    if (mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Cache limpo!')),
                      );
                    }
                  }
                },
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSection(
            title: 'Sobre',
            children: [
              const ListTile(
                title: Text('Versão', style: TextStyle(color: Colors.white)),
                subtitle: Text('1.3.0', style: TextStyle(color: Colors.white54)),
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
            color: Colors.white.withValues(alpha: 0.05),
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

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final diff = now.difference(date);
    if (diff.inMinutes < 1) return 'Agora';
    if (diff.inMinutes < 60) return '${diff.inMinutes} minutos atrás';
    if (diff.inHours < 24) return '${diff.inHours} horas atrás';
    return '${diff.inDays} dias atrás';
  }
}
