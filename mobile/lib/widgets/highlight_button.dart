import 'package:flutter/material.dart';

import '../models/highlight.dart';

class HighlightColorPicker extends StatelessWidget {
  final String? selectedColorId;
  final ValueChanged<String> onColorSelected;
  final bool allowClear;

  const HighlightColorPicker({
    super.key,
    this.selectedColorId,
    required this.onColorSelected,
    this.allowClear = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Wrap(
      spacing: 12,
      runSpacing: 8,
      children: [
        for (final c in HighlightColor.all)
          _buildColorChip(
            context,
            color: c,
            selected: c.id == selectedColorId,
            onTap: () => onColorSelected(c.id),
          ),
        if (allowClear && selectedColorId != null)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: TextButton.icon(
              onPressed: () => onColorSelected(''),
              icon: const Icon(Icons.delete_outline, size: 18),
              label: const Text('Remover'),
              style: TextButton.styleFrom(
                foregroundColor: theme.colorScheme.error,
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildColorChip(
    BuildContext context, {
    required HighlightColor color,
    required bool selected,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: color.color,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: selected
                ? theme.colorScheme.primary
                : theme.colorScheme.outline.withValues(alpha: 0.3),
            width: selected ? 2.5 : 1,
          ),
          boxShadow: selected
              ? [
                  BoxShadow(
                    color: color.color.withValues(alpha: 0.5),
                    blurRadius: 8,
                    spreadRadius: 1,
                  ),
                ]
              : null,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              selected ? Icons.check : Icons.format_color_fill,
              size: 16,
              color: color.onColor,
            ),
            const SizedBox(width: 6),
            Text(
              color.label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: color.onColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class HighlightButton extends StatelessWidget {
  final String? currentColorId;
  final ValueChanged<String> onColorSelected;

  const HighlightButton({
    super.key,
    this.currentColorId,
    required this.onColorSelected,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final color = currentColorId != null
        ? HighlightColor.fromId(currentColorId)
        : null;

    return InkWell(
      onTap: () => _showPicker(context),
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: color?.color ??
              theme.colorScheme.surfaceContainerHighest
                  .withValues(alpha: 0.6),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: theme.colorScheme.outline.withValues(alpha: 0.3),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.format_color_fill,
              size: 16,
              color: color?.onColor ?? theme.colorScheme.onSurface,
            ),
            const SizedBox(width: 6),
            Text(
              color?.label ?? 'Destacar',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: color?.onColor ?? theme.colorScheme.onSurface,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 40,
                  height: 4,
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: Theme.of(ctx)
                        .colorScheme
                        .outline
                        .withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                Text(
                  'Cor do destaque',
                  style: Theme.of(ctx).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                ),
                const SizedBox(height: 16),
                HighlightColorPicker(
                  selectedColorId: currentColorId,
                  onColorSelected: (id) {
                    Navigator.of(ctx).pop();
                    onColorSelected(id);
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
