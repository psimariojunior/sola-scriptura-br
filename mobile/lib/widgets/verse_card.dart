import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/highlight.dart';
import '../models/versiculo.dart';

class VerseCard extends StatelessWidget {
  final Versiculo versiculo;
  final bool selecionado;
  final double tamanhoFonte;
  final bool mostraIndicadores;
  final int? crossRefCount;
  final bool? temComentario;
  final Highlight? highlight;
  final bool temNota;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const VerseCard({
    super.key,
    required this.versiculo,
    this.selecionado = false,
    this.tamanhoFonte = 18.0,
    this.mostraIndicadores = false,
    this.crossRefCount,
    this.temComentario,
    this.highlight,
    this.temNota = false,
    this.onTap,
    this.onLongPress,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final highlightColor = highlight?.colorData;
    final hasHighlight = highlightColor != null;

    Color cardColor = theme.cardColor;
    if (hasHighlight) {
      cardColor = highlightColor.color.withValues(alpha: 0.22);
    }
    if (selecionado) {
      cardColor = theme.colorScheme.primaryContainer.withValues(alpha: 0.6);
    }

    return GestureDetector(
      onTap: onTap,
      onLongPress: onLongPress != null
          ? () {
              HapticFeedback.mediumImpact();
              onLongPress!();
            }
          : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        margin: const EdgeInsets.symmetric(vertical: 3, horizontal: 8),
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
        decoration: BoxDecoration(
          color: cardColor,
          borderRadius: BorderRadius.circular(12),
          border: hasHighlight
              ? Border(
                  left: BorderSide(
                    color: highlightColor.color,
                    width: 4,
                  ),
                )
              : selecionado
                  ? Border.all(
                      color:
                          theme.colorScheme.primary.withValues(alpha: 0.5),
                      width: 1.5,
                    )
                  : null,
          boxShadow: hasHighlight
              ? [
                  BoxShadow(
                    color: highlightColor.color.withValues(alpha: 0.15),
                    blurRadius: 6,
                    offset: const Offset(0, 1),
                  ),
                ]
              : selecionado
                  ? [
                      BoxShadow(
                        color: theme.colorScheme.primary
                            .withValues(alpha: 0.15),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ]
                  : null,
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildNumeroVersiculo(theme, hasHighlight, highlightColor),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    versiculo.texto,
                    style: theme.textTheme.bodyLarge?.copyWith(
                      fontSize: tamanhoFonte,
                      height: 1.6,
                    ),
                  ),
                  if (mostraIndicadores) ...[
                    const SizedBox(height: 6),
                    _buildIndicadores(theme),
                  ],
                ],
              ),
            ),
            if (temNota)
              Padding(
                padding: const EdgeInsets.only(left: 6, top: 2),
                child: Tooltip(
                  message: 'Este versiculo tem nota',
                  child: Icon(
                    Icons.sticky_note_2,
                    size: 16,
                    color: theme.colorScheme.primary.withValues(alpha: 0.7),
                  ),
                ),
              ),
            if (selecionado)
              Padding(
                padding: const EdgeInsets.only(left: 8),
                child: Icon(
                  Icons.check_circle,
                  color: theme.colorScheme.primary,
                  size: 20,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildNumeroVersiculo(
    ThemeData theme,
    bool hasHighlight,
    HighlightColor? highlightColor,
  ) {
    final bgColor = hasHighlight
        ? highlightColor!.color
        : selecionado
            ? theme.colorScheme.primary
            : theme.colorScheme.primary.withValues(alpha: 0.12);
    final fgColor = hasHighlight
        ? highlightColor!.onColor
        : selecionado
            ? Colors.white
            : theme.colorScheme.primary;

    return Container(
      width: 30,
      height: 30,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: bgColor,
        shape: BoxShape.circle,
      ),
      child: Text(
        '${versiculo.numero}',
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: fgColor,
        ),
      ),
    );
  }

  Widget _buildIndicadores(ThemeData theme) {
    return Row(
      children: [
        if (crossRefCount != null && crossRefCount! > 0) ...[
          _buildBadge(
            theme,
            icon: Icons.link,
            label: '$crossRefCount',
            color: Colors.blue,
          ),
          const SizedBox(width: 8),
        ],
        if (temComentario == true) ...[
          _buildBadge(
            theme,
            icon: Icons.comment,
            label: '',
            color: Colors.green,
          ),
        ],
      ],
    );
  }

  Widget _buildBadge(
    ThemeData theme, {
    required IconData icon,
    required String label,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: color),
          if (label.isNotEmpty) ...[
            const SizedBox(width: 3),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
