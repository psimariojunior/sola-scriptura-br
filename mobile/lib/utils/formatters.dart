import 'package:intl/intl.dart';

class Formatters {
  Formatters._();

  static final DateFormat _dateFormat = DateFormat('dd/MM/yyyy');
  static final DateFormat _dateTimeFormat = DateFormat('dd/MM/yyyy HH:mm');
  static final DateFormat _monthYear = DateFormat('MMMM yyyy', 'pt_BR');
  static final DateFormat _dayMonth = DateFormat('dd MMM', 'pt_BR');

  static String formatDate(DateTime date) => _dateFormat.format(date);

  static String formatDateTime(DateTime date) => _dateTimeFormat.format(date);

  static String formatMonthYear(DateTime date) => _monthYear.format(date);

  static String formatDayMonth(DateTime date) => _dayMonth.format(date);

  static String verseReference(String book, int chapter, int verse) {
    return '$book $chapter:$verse';
  }

  static String verseRange(String book, int chapter, int start, int end) {
    return '$book $chapter:$start-$end';
  }

  static String capitalize(String text) {
    if (text.isEmpty) return text;
    return '${text[0].toUpperCase()}${text.substring(1)}';
  }

  static String truncate(String text, int maxLength) {
    if (text.length <= maxLength) return text;
    return '${text.substring(0, maxLength)}...';
  }

  static String stripHtml(String html) {
    final exp = RegExp(r'<[^>]*>');
    return html.replaceAll(exp, '').trim();
  }
}
