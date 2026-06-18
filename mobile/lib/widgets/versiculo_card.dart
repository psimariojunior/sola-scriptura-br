import 'package:flutter/material.dart';
import '../models/biblia_models.dart';

class VersiculoCard extends StatelessWidget {
  final Versiculo versiculo;
  final bool isFavorito;
  final VoidCallback? onFavorito;
  final VoidCallback? onNota;

  const VersiculoCard({
    super.key,
    required this.versiculo,
    this.isFavorito = false,
    this.onFavorito,
    this.onNota,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      color: theme.colorScheme.surface,
      elevation: 0.5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(6),
        side: BorderSide(color: theme.dividerColor.withOpacity(0.4)),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: const EdgeInsets.only(top: 4, right: 8),
              width: 24,
              height: 24,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: theme.primaryColor.withOpacity(0.12),
                shape: BoxShape.circle,
              ),
              child: Text(
                '${versiculo.numero}',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  color: theme.primaryColor,
                ),
              ),
            ),
            Expanded(
              child: SelectableText(
                versiculo.texto,
                style: TextStyle(
                  fontSize: 16,
                  height: 1.5,
                  fontFamily: 'serif',
                  color: theme.textTheme.bodyMedium?.color,
                ),
              ),
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  visualDensity: VisualDensity.compact,
                  iconSize: 20,
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                  onPressed: onFavorito,
                  icon: Icon(
                    isFavorito ? Icons.bookmark : Icons.bookmark_border,
                    color: isFavorito ? theme.primaryColor : theme.disabledColor,
                  ),
                ),
                IconButton(
                  visualDensity: VisualDensity.compact,
                  iconSize: 20,
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                  onPressed: onNota,
                  icon: Icon(
                    Icons.note_add_outlined,
                    color: theme.disabledColor,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
