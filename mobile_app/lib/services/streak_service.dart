import 'package:shared_preferences/shared_preferences.dart';
import 'verse_widget_service.dart';

class StreakService {
  static const _streakKey = 'ssb_streak_count';
  static const _lastReadKey = 'ssb_last_read_date';
  static const _bestStreakKey = 'ssb_best_streak';
  static const _totalDaysKey = 'ssb_total_reading_days';
  static const _weeklyGoalKey = 'ssb_weekly_goal';
  static const _weeklyProgressKey = 'ssb_weekly_progress';
  static const _historyKey = 'ssb_streak_history';

  static Future<int> getCurrentStreak() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final lastRead = prefs.getString(_lastReadKey);
      final streak = prefs.getInt(_streakKey) ?? 0;

      if (lastRead == null) return 0;

      final lastDate = DateTime.parse(lastRead);
      final now = DateTime.now();
      final today = DateTime(now.year, now.month, now.day);
      final lastDay = DateTime(lastDate.year, lastDate.month, lastDate.day);
      final diff = today.difference(lastDay).inDays;

      if (diff == 0) return streak;
      if (diff == 1) return streak;
      return 0;
    } catch (e) {
      return 0;
    }
  }

  static Future<int> recordReading() async {
    final prefs = await SharedPreferences.getInstance();
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day).toIso8601String();
    final lastRead = prefs.getString(_lastReadKey);

    int newStreak = 1;

    if (lastRead != null) {
      final lastDate = DateTime.parse(lastRead);
      final lastDay = DateTime(lastDate.year, lastDate.month, lastDate.day);
      final todayDate = DateTime(now.year, now.month, now.day);
      final diff = todayDate.difference(lastDay).inDays;

      if (diff == 0) {
        return prefs.getInt(_streakKey) ?? 0;
      }
      if (diff == 1) {
        newStreak = (prefs.getInt(_streakKey) ?? 0) + 1;
      }
    }

    await prefs.setInt(_streakKey, newStreak);
    await prefs.setString(_lastReadKey, today);
    await _updateBestStreak(newStreak);
    await _updateTotalDays();
    await _recordHistoryEntry(now);

    try {
      await VerseWidgetService.updateStreakWidget();
    } catch (e) {
      debugPrint('Failed to update widget: $e');
    }

    return newStreak;
  }

  static Future<void> _updateBestStreak(int current) async {
    final prefs = await SharedPreferences.getInstance();
    final best = prefs.getInt(_bestStreakKey) ?? 0;
    if (current > best) {
      await prefs.setInt(_bestStreakKey, current);
    }
  }

  static Future<void> _updateTotalDays() async {
    final prefs = await SharedPreferences.getInstance();
    final total = prefs.getInt(_totalDaysKey) ?? 0;
    await prefs.setInt(_totalDaysKey, total + 1);
  }

  static Future<void> _recordHistoryEntry(DateTime date) async {
    final prefs = await SharedPreferences.getInstance();
    final history = prefs.getStringList(_historyKey) ?? [];
    final dateStr = '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
    if (!history.contains(dateStr)) {
      history.add(dateStr);
      if (history.length > 365) {
        history.removeAt(0);
      }
      await prefs.setStringList(_historyKey, history);
    }
  }

  static Future<int> getBestStreak() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_bestStreakKey) ?? 0;
  }

  static Future<int> getTotalDays() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_totalDaysKey) ?? 0;
  }

  static Future<int> getWeeklyGoal() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_weeklyGoalKey) ?? 7;
  }

  static Future<void> setWeeklyGoal(int days) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_weeklyGoalKey, days);
  }

  static Future<int> getWeeklyProgress() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_weeklyProgressKey) ?? 0;
  }

  static Future<Map<String, dynamic>> getStreakStats() async {
    try {
      final current = await getCurrentStreak();
      final best = await getBestStreak();
      final total = await getTotalDays();
      final weeklyGoal = await getWeeklyGoal();
      final weeklyProgress = await getWeeklyProgress();

      return {
        'currentStreak': current,
        'bestStreak': best,
        'totalDays': total,
        'weeklyGoal': weeklyGoal,
        'weeklyProgress': weeklyProgress,
        'motivation': _getMotivation(current),
      };
    } catch (e) {
      return {
        'currentStreak': 0,
        'bestStreak': 0,
        'totalDays': 0,
        'weeklyGoal': 7,
        'weeklyProgress': 0,
        'motivation': _getMotivation(0),
      };
    }
  }

  static String _getMotivation(int streak) {
    if (streak == 0) return 'Comece sua jornada hoje!';
    if (streak == 1) return 'Primeiro dia! Continue amanhã!';
    if (streak < 7) return 'Você está no caminho! $streak dias seguidos!';
    if (streak < 30) return 'Incrível! $streak dias de consistência!';
    if (streak < 100) return 'Mestre da Palavra! $streak dias!';
    return 'Lenda! $streak dias de estudo!';
  }

  static Future<List<String>> getMonthHistory() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final history = prefs.getStringList(_historyKey) ?? [];
      final now = DateTime.now();
      final monthAgo = DateTime(now.year, now.month - 1, now.day);

      return history.where((dateStr) {
        final date = DateTime.parse(dateStr);
        return date.isAfter(monthAgo);
      }).toList();
    } catch (e) {
      return [];
    }
  }
}
