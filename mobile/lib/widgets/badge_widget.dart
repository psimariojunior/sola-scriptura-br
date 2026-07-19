import 'package:flutter/material.dart';

enum BadgeVariant { primary, success, warning, error, info }

class BadgeWidget extends StatelessWidget {
  final int? count;
  final String? label;
  final BadgeVariant variant;
  final Widget child;
  final bool showBadge;
  final bool isDot;
  final double? top;
  final double? end;

  const BadgeWidget({
    super.key,
    this.count,
    this.label,
    this.variant = BadgeVariant.primary,
    required this.child,
    this.showBadge = true,
    this.isDot = false,
    this.top,
    this.end,
  });

  const BadgeWidget.dot({
    super.key,
    this.variant = BadgeVariant.error,
    required this.child,
    this.showBadge = true,
    this.top,
    this.end,
  })  : count = null,
        label = null,
        isDot = true;

  const BadgeWidget.count({
    super.key,
    required this.count,
    this.variant = BadgeVariant.primary,
    required this.child,
    this.showBadge = true,
    this.top,
    this.end,
  })  : label = null,
        isDot = false;

  const BadgeWidget.label({
    super.key,
    required this.label,
    this.variant = BadgeVariant.primary,
    required this.child,
    this.showBadge = true,
    this.top,
    this.end,
  })  : count = null,
        isDot = false;

  @override
  Widget build(BuildContext context) {
    if (!showBadge) return child;

    final badge = _buildBadge(context);

    return Stack(
      clipBehavior: Clip.none,
      children: [
        child,
        Positioned(
          top: top ?? -4,
          right: end ?? -4,
          child: badge,
        ),
      ],
    );
  }

  Widget _buildBadge(BuildContext context) {
    final color = _getColor(context);

    if (isDot) {
      return Container(
        width: 10,
        height: 10,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
          border: Border.all(
            color: Theme.of(context).colorScheme.surface,
            width: 2,
          ),
        ),
      );
    }

    final displayText = label ?? (count != null ? _formatCount(count!) : '');

    if (displayText.isEmpty) return const SizedBox.shrink();

    return Container(
      constraints: const BoxConstraints(minWidth: 20, minHeight: 20),
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: Theme.of(context).colorScheme.surface,
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.3),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Text(
        displayText,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
          fontWeight: FontWeight.w700,
          height: 1.2,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }

  Color _getColor(BuildContext context) {
    final theme = Theme.of(context);

    switch (variant) {
      case BadgeVariant.primary:
        return theme.colorScheme.primary;
      case BadgeVariant.success:
        return const Color(0xFF2E7D32);
      case BadgeVariant.warning:
        return const Color(0xFFF57C00);
      case BadgeVariant.error:
        return const Color(0xFFD32F2F);
      case BadgeVariant.info:
        return const Color(0xFF1565C0);
    }
  }

  String _formatCount(int value) {
    if (value > 999) {
      return '${(value / 1000).toStringAsFixed(1)}k';
    }
    return value.toString();
  }
}
