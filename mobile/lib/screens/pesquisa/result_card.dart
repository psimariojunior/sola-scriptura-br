import 'package:flutter/material.dart';

import '../../models/pesquisa.dart';

class ResultCard extends StatelessWidget {
  final ResultadoPesquisa resultado;
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
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTypeIcon(theme),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildTitle(theme),
                    if (resultado.subtitulo != null) ...[
                      const SizedBox(height: 4),
                      _buildSubtitle(theme),
                    ],
                  ],
                ),
              ),
              if (resultado.score > 0) ...[
                const SizedBox(width: 8),
                _buildScoreBadge(theme),
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
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Icon(icon, color: color, size: 22),
    );
  }

  (IconData, Color) _iconForType(String tipo) {
    switch (tipo) {
      case 'versiculo':
      case 'verse':
        return (Icons.menu_book, Colors.blue);
      case 'lexicon':
        return (Icons.translate, Colors.teal);
      case 'comentario':
      case 'commentary':
        return (Icons.comment, Colors.orange);
      case 'estudo':
      case 'study':
        return (Icons.school, Colors.purple);
      default:
        return (Icons.article, Colors.grey);
    }
  }

  Widget _buildTitle(ThemeData theme) {
    return Text(
      resultado.titulo,
      style: theme.textTheme.bodyLarge?.copyWith(
        fontWeight: FontWeight.w600,
      ),
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget _buildSubtitle(ThemeData theme) {
    final text = resultado.subtitulo!;
    return Text(
      highlightQuery != null ? _highlightText(text, highlightQuery!) : text,
      style: theme.textTheme.bodyMedium?.copyWith(
        color: theme.colorScheme.onSurfaceVariant,
      ),
      maxLines: 3,
      overflow: TextOverflow.ellipsis,
    );
  }

  String _highlightText(String text, String query) {
    if (query.isEmpty) return text;
    return text;
  }

  Widget _buildScoreBadge(ThemeData theme) {
    final percentage = (resultado.score * 100).round();
    if (percentage <= 0) return const SizedBox.shrink();

    Color badgeColor;
    if (percentage >= 80) {
      badgeColor = Colors.green;
    } else if (percentage >= 50) {
      badgeColor = Colors.orange;
    } else {
      badgeColor = theme.colorScheme.onSurfaceVariant.withOpacity(0.5);
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: badgeColor.withOpacity(0.12),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        '$percentage%',
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: badgeColor,
        ),
      ),
    );
  }
}
