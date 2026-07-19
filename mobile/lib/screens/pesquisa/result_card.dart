import 'package:flutter/material.dart';

import '../../models/search_result.dart';

class ResultCard extends StatelessWidget {
  final SearchResult resultado;
  final VoidCallback? onTap;
  final String? highlightQuery;

  const ResultCard({
    super.key,
    required this.resultado,
    this.onTap,
    this.highlightQuery,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      elevation: 0,
      color: theme.colorScheme.surfaceContainerLow,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
        ),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildTypeIcon(theme),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildTitle(theme),
                        if (resultado.traducao != null || resultado.autor != null) ...[
                          const SizedBox(height: 4),
                          _buildBadges(theme),
                        ],
                      ],
                    ),
                  ),
                  if (resultado.relevancia > 0) _buildRelevanceBadge(theme),
                ],
              ),
              const SizedBox(height: 8),
              _buildSnippet(theme),
              if (resultado.referencia != null) ...[
                const SizedBox(height: 6),
                _buildReference(theme),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTypeIcon(ThemeData theme) {
    final (icon, color) = _iconForType(resultado.tipo);

    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Icon(icon, color: color, size: 22),
    );
  }

  (IconData, Color) _iconForType(SearchResultType tipo) {
    switch (tipo) {
      case SearchResultType.verse:
        return (Icons.menu_book, const Color(0xFF1976D2));
      case SearchResultType.lexicon:
        return (Icons.translate, const Color(0xFF00897B));
      case SearchResultType.commentary:
        return (Icons.comment, const Color(0xFFE65100));
      case SearchResultType.character:
        return (Icons.person, const Color(0xFFC2185B));
      case SearchResultType.theology:
        return (Icons.account_balance, const Color(0xFF6A1B9A));
      case SearchResultType.study:
        return (Icons.school, const Color(0xFF4527A0));
      case SearchResultType.introduction:
        return (Icons.book, const Color(0xFF00695C));
      case SearchResultType.textualCriticism:
        return (Icons.compare_arrows, const Color(0xFFD84315));
      case SearchResultType.chronology:
        return (Icons.timeline, const Color(0xFF455A64));
      case SearchResultType.pericope:
        return (Icons.format_align_left, const Color(0xFF7B1FA2));
      case SearchResultType.synoptic:
        return (Icons.view_column, const Color(0xFF0277BD));
    }
  }

  Widget _buildTitle(ThemeData theme) {
    return Text(
      resultado.titulo,
      style: theme.textTheme.titleSmall?.copyWith(
        fontWeight: FontWeight.w600,
        color: theme.colorScheme.onSurface,
      ),
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _buildBadges(ThemeData theme) {
    return Wrap(
      spacing: 6,
      runSpacing: 4,
      children: [
        if (resultado.traducao != null)
          _buildBadge(theme, resultado.traducao!.toUpperCase(), _traducaoColor(resultado.traducao!)),
        if (resultado.autor != null)
          _buildBadge(theme, resultado.autor!, Colors.orange),
        if (resultado.strong != null)
          _buildBadge(theme, resultado.strong!, Colors.teal),
        if (resultado.idioma != null)
          _buildBadge(
            theme,
            resultado.idioma == 'grego' ? 'Grego' : 'Hebraico',
            Colors.indigo,
          ),
      ],
    );
  }

  Widget _buildBadge(ThemeData theme, String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w600,
          color: color,
          letterSpacing: 0.3,
        ),
      ),
    );
  }

  Color _traducaoColor(String traducao) {
    switch (traducao.toLowerCase()) {
      case 'arc':
        return const Color(0xFF1976D2);
      case 'nvi':
        return const Color(0xFF2E7D32);
      case 'ara':
        return const Color(0xFF6A1B9A);
      case 'acf':
        return const Color(0xFFC2185B);
      case 'kjv':
        return const Color(0xFFEF6C00);
      case 'web':
        return const Color(0xFF00695C);
      default:
        return Colors.grey;
    }
  }

  Widget _buildSnippet(ThemeData theme) {
    final text = resultado.trecho;
    if (text.isEmpty) return const SizedBox.shrink();
    final spans = highlightQuery != null
        ? _buildHighlightedSpans(text, highlightQuery!, theme)
        : [TextSpan(text: text, style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
            height: 1.4,
          ))];

    return RichText(
      text: TextSpan(children: spans),
      maxLines: 3,
      overflow: TextOverflow.ellipsis,
    );
  }

  List<InlineSpan> _buildHighlightedSpans(
    String text,
    String query,
    ThemeData theme,
  ) {
    final baseStyle = theme.textTheme.bodyMedium?.copyWith(
      color: theme.colorScheme.onSurfaceVariant,
      height: 1.4,
    );
    final highlightStyle = theme.textTheme.bodyMedium?.copyWith(
      color: theme.colorScheme.primary,
      fontWeight: FontWeight.w700,
      backgroundColor: theme.colorScheme.primary.withValues(alpha: 0.12),
    );

    final queryWords = query
        .toLowerCase()
        .split(RegExp(r'\s+'))
        .where((w) => w.isNotEmpty)
        .toList();
    if (queryWords.isEmpty) {
      return [TextSpan(text: text, style: baseStyle)];
    }

    final spans = <InlineSpan>[];
    final lowerText = text.toLowerCase();
    int current = 0;
    while (current < text.length) {
      int? matchStart;
      int? matchEnd;
      for (final word in queryWords) {
        final idx = lowerText.indexOf(word, current);
        if (idx >= 0 && (matchStart == null || idx < matchStart)) {
          matchStart = idx;
          matchEnd = idx + word.length;
        }
      }
      if (matchStart == null || matchEnd == null) {
        spans.add(TextSpan(text: text.substring(current), style: baseStyle));
        break;
      }
      if (matchStart > current) {
        spans.add(TextSpan(
          text: text.substring(current, matchStart),
          style: baseStyle,
        ));
      }
      spans.add(TextSpan(
        text: text.substring(matchStart, matchEnd),
        style: highlightStyle,
      ));
      current = matchEnd;
    }
    return spans;
  }

  Widget _buildReference(ThemeData theme) {
    final ref = resultado.referencia!;
    String display;
    if (resultado.tipo == SearchResultType.lexicon) {
      display = 'Strong: $ref';
    } else {
      display = ref;
    }
    return Row(
      children: [
        Icon(Icons.link, size: 12, color: theme.colorScheme.outline),
        const SizedBox(width: 4),
        Text(
          display,
          style: theme.textTheme.bodySmall?.copyWith(
            color: theme.colorScheme.outline,
            fontSize: 11,
          ),
        ),
      ],
    );
  }

  Widget _buildRelevanceBadge(ThemeData theme) {
    final percentage = (resultado.relevancia * 100).round();
    if (percentage <= 0) return const SizedBox.shrink();

    Color badgeColor;
    if (percentage >= 80) {
      badgeColor = Colors.green;
    } else if (percentage >= 50) {
      badgeColor = Colors.orange;
    } else {
      badgeColor = theme.colorScheme.outline;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: badgeColor.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        '$percentage%',
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w700,
          color: badgeColor,
        ),
      ),
    );
  }
}
