import 'package:flutter/material.dart';
import '../services/streak_service.dart';
import '../config/theme.dart';

class StreakScreen extends StatefulWidget {
  const StreakScreen({super.key});

  @override
  State<StreakScreen> createState() => _StreakScreenState();
}

class _StreakScreenState extends State<StreakScreen> {
  Map<String, dynamic> _stats = {};
  List<String> _monthHistory = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadStats();
  }

  Future<void> _loadStats() async {
    try {
      final stats = await StreakService.getStreakStats();
      final history = await StreakService.getMonthHistory();
      if (mounted) {
        setState(() {
          _stats = stats;
          _monthHistory = history;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary)),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        title: const Text('Minha Sequência'),
        backgroundColor: AppTheme.bgDark,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            _buildStreakCard(),
            const SizedBox(height: 20),
            _buildWeekGrid(),
            const SizedBox(height: 20),
            _buildStatsRow(),
            const SizedBox(height: 20),
            _buildMotivationCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildStreakCard() {
    final streak = _stats['currentStreak'] ?? 0;
    final motivation = _stats['motivation'] ?? '';

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppTheme.goldDark, AppTheme.goldPrimary],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppTheme.goldPrimary.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            '🔥',
            style: TextStyle(fontSize: 60),
          ),
          const SizedBox(height: 10),
          Text(
            '$streak',
            style: const TextStyle(
              fontSize: 72,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const Text(
            'dias seguidos',
            style: TextStyle(
              fontSize: 18,
              color: Colors.white70,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            motivation,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 14,
              color: Colors.white,
              fontStyle: FontStyle.italic,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWeekGrid() {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final startOfWeek = today.subtract(Duration(days: today.weekday - 1));

    final days = List.generate(7, (i) {
      final date = startOfWeek.add(Duration(days: i));
      final dateStr = '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
      final isRead = _monthHistory.contains(dateStr);
      final isToday = date.isAtSameMomentAs(today);

      return _buildDayCell(date, isRead, isToday);
    });

    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          const Text(
            'Esta Semana',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: days,
          ),
        ],
      ),
    );
  }

  Widget _buildDayCell(DateTime date, bool isRead, bool isToday) {
    final dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    final dayIndex = (date.weekday - 1) % 7;

    return Column(
      children: [
        Text(
          dayNames[dayIndex],
          style: TextStyle(
            fontSize: 12,
            color: Colors.white54,
          ),
        ),
        const SizedBox(height: 5),
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: isRead
                ? AppTheme.goldPrimary
                : isToday
                    ? AppTheme.goldPrimary.withOpacity(0.3)
                    : Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
            border: isToday
                ? Border.all(color: AppTheme.goldPrimary, width: 2)
                : null,
          ),
          child: Center(
            child: isRead
                ? const Icon(Icons.check, color: Colors.white, size: 18)
                : Text(
                    '${date.day}',
                    style: TextStyle(
                      color: isToday ? Colors.white : Colors.white54,
                      fontWeight: isToday ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
          ),
        ),
      ],
    );
  }

  Widget _buildStatsRow() {
    return Row(
      children: [
        _buildStatCard('Melhor', '${_stats['bestStreak'] ?? 0} dias', Icons.emoji_events),
        const SizedBox(width: 10),
        _buildStatCard('Total', '${_stats['totalDays'] ?? 0} dias', Icons.calendar_today),
        const SizedBox(width: 10),
        _buildStatCard('Meta', '${_stats['weeklyGoal'] ?? 7} dias', Icons.flag),
      ],
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(15),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Icon(icon, color: AppTheme.goldPrimary, size: 24),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                color: Colors.white54,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMotivationCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(
          color: AppTheme.goldPrimary.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          const Icon(Icons.auto_stories, color: AppTheme.goldPrimary, size: 40),
          const SizedBox(height: 10),
          const Text(
            'Dica do Dia',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            _getDailyTip(),
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 14,
              color: Colors.white70,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  String _getDailyTip() {
    final tips = [
      'Estude um versículo por dia e medite nele durante o dia.',
      'Use o modo imersão para ler sem distrações.',
      'Anote suas reflexões no bloco de notas.',
      'Compartilhe um versículo com um amigo hoje.',
      'Use a busca semântica para entender palavras difíceis.',
      'Ouça a pronúncia das palavras hebraicas e gregas.',
      'Faça um quiz para testar seus conhecimentos.',
    ];
    final now = DateTime.now();
    return tips[now.day % tips.length];
  }
}
