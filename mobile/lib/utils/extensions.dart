extension StringExtensions on String {
  String get capitalize {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }

  String get capitalizeWords {
    return split(' ').map((word) => word.capitalize).join(' ');
  }

  bool get isNumeric {
    return double.tryParse(this) != null;
  }

  String removeHtmlTags() {
    final exp = RegExp(r'<[^>]*>');
    return replaceAll(exp, '').trim();
  }

  String truncate(int maxLength) {
    if (length <= maxLength) return this;
    return '${substring(0, maxLength)}...';
  }

  String? get nullIfEmpty {
    return isEmpty ? null : this;
  }
}

extension DateTimeExtensions on DateTime {
  String get timeAgo {
    final difference = DateTime.now().difference(this);
    if (difference.inDays > 365) {
      return '${(difference.inDays / 365).floor()} atras';
    }
    if (difference.inDays > 30) {
      return '${(difference.inDays / 30).floor()} mes(es) atras';
    }
    if (difference.inDays > 0) {
      return '${difference.inDays} dia(s) atras';
    }
    if (difference.inHours > 0) {
      return '${difference.inHours} hora(s) atras';
    }
    if (difference.inMinutes > 0) {
      return '${difference.inMinutes} min(s) atras';
    }
    return 'agora';
  }

  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  bool get isYesterday {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return year == yesterday.year &&
        month == yesterday.month &&
        day == yesterday.day;
  }

  DateTime get startOfDay => DateTime(year, month, day);

  DateTime get endOfDay => DateTime(year, month, day, 23, 59, 59);
}

extension ListExtensions<T> on List<T> {
  List<T> separate(T separator) {
    if (length <= 1) return this;
    final result = <T>[];
    for (var i = 0; i < length; i++) {
      result.add(this[i]);
      if (i < length - 1) result.add(separator);
    }
    return result;
  }
}
