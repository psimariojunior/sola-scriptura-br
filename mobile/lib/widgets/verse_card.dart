import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/versiculo.dart';

class VerseCard extends StatelessWidget {
  final Versiculo versiculo;
  final bool selecionado;
  final double tamanhoFonte;
  final bool mostraIndicadores;
  final int? crossRefCount;
  final bool? temComentario;
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
    this.onTap,
    this.onLongPress,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

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
          color: selecionado
              ? theme.colorScheme.primaryContainer.withOpacity(0.6)
              : theme.cardColor,
          borderRadius: BorderRadius.circular(12),
          border: selecionado
              ? Border.all(
                  color: theme.colorScheme.primary.withOpacity(0.5),
                  width: 1.5,
                )
              : null,
          boxShadow: selecionado
              ? [
                  BoxShadow(
                    color: theme.colorScheme.primary.withOpacity(0.15),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ]
              : null,
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildNumeroVersiculo(theme),
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

  Widget _buildNumeroVersiculo(ThemeData theme) {
    return Container(
      width: 30,
      height: 30,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: selecionado
            ? theme.colorScheme.primary
            : theme.colorScheme.primary.withOpacity(0.12),
        shape: BoxShape.circle,
      ),
      child: Text(
        '${versiculo.numero}',
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: selecionado
              ? Colors.white
              : theme.colorScheme.primary,
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
        color: color.withOpacity(0.1),
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
