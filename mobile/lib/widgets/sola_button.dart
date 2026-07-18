import 'package:flutter/material.dart';

enum SolaButtonVariant { primary, secondary, outline, text }

class SolaButton extends StatefulWidget {
  final String label;
  final VoidCallback? onPressed;
  final bool isLoading;
  final SolaButtonVariant variant;
  final IconData? icon;
  final Color? color;
  final bool compact;

  const SolaButton({
    super.key,
    required this.label,
    this.onPressed,
    this.isLoading = false,
    this.variant = SolaButtonVariant.primary,
    this.icon,
    this.color,
    this.compact = false,
  });

  const SolaButton.outlined({
    super.key,
    required this.label,
    this.onPressed,
    this.isLoading = false,
    this.icon,
    this.color,
    this.compact = false,
  })  : variant = SolaButtonVariant.outline,
        assert(label.isNotEmpty);

  const SolaButton.secondary({
    super.key,
    required this.label,
    this.onPressed,
    this.isLoading = false,
    this.icon,
    this.color,
    this.compact = false,
  })  : variant = SolaButtonVariant.secondary,
        assert(label.isNotEmpty);

  const SolaButton.text({
    super.key,
    required this.label,
    this.onPressed,
    this.isLoading = false,
    this.icon,
    this.color,
    this.compact = false,
  })  : variant = SolaButtonVariant.text,
        assert(label.isNotEmpty);

  @override
  State<SolaButton> createState() => _SolaButtonState();
}

class _SolaButtonState extends State<SolaButton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 100),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = widget.color ?? theme.colorScheme.primary;
    final isDisabled = widget.onPressed == null || widget.isLoading;

    Widget button;

    switch (widget.variant) {
      case SolaButtonVariant.primary:
        button = ElevatedButton(
          onPressed: isDisabled ? null : _handleTap,
          style: ElevatedButton.styleFrom(
            backgroundColor: primaryColor,
            foregroundColor: theme.colorScheme.onPrimary,
            disabledBackgroundColor: primaryColor.withOpacity(0.4),
            disabledForegroundColor: theme.colorScheme.onPrimary.withOpacity(0.6),
            minimumSize: Size(
              double.infinity,
              widget.compact ? 40 : 48,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 20),
          ),
          child: _buildChild(theme, isPrimary: true),
        );
        break;

      case SolaButtonVariant.secondary:
        button = ElevatedButton(
          onPressed: isDisabled ? null : _handleTap,
          style: ElevatedButton.styleFrom(
            backgroundColor: primaryColor.withOpacity(0.1),
            foregroundColor: primaryColor,
            disabledBackgroundColor: primaryColor.withOpacity(0.05),
            disabledForegroundColor: primaryColor.withOpacity(0.3),
            elevation: 0,
            minimumSize: Size(
              double.infinity,
              widget.compact ? 40 : 48,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 20),
          ),
          child: _buildChild(theme),
        );
        break;

      case SolaButtonVariant.outline:
        button = OutlinedButton(
          onPressed: isDisabled ? null : _handleTap,
          style: OutlinedButton.styleFrom(
            foregroundColor: primaryColor,
            disabledForegroundColor: primaryColor.withOpacity(0.3),
            minimumSize: Size(
              double.infinity,
              widget.compact ? 40 : 48,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 20),
            side: BorderSide(
              color: isDisabled
                  ? primaryColor.withOpacity(0.2)
                  : primaryColor.withOpacity(0.6),
              width: 1.5,
            ),
          ),
          child: _buildChild(theme),
        );
        break;

      case SolaButtonVariant.text:
        button = TextButton(
          onPressed: isDisabled ? null : _handleTap,
          style: TextButton.styleFrom(
            foregroundColor: primaryColor,
            disabledForegroundColor: primaryColor.withOpacity(0.3),
            minimumSize: Size(
              widget.compact ? 0 : 80,
              widget.compact ? 32 : 40,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 12),
          ),
          child: _buildChild(theme),
        );
        break;
    }

    return ScaleTransition(
      scale: _scaleAnimation,
      child: button,
    );
  }

  void _handleTap() {
    _controller.forward().then((_) {
      _controller.reverse();
    });
    widget.onPressed?.call();
  }

  Widget _buildChild(ThemeData theme, {bool isPrimary = false}) {
    if (widget.isLoading) {
      return SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(
          strokeWidth: 2,
          color: isPrimary
              ? theme.colorScheme.onPrimary
              : theme.colorScheme.primary,
        ),
      );
    }

    if (widget.icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(widget.icon, size: 18),
          const SizedBox(width: 8),
          Text(widget.label),
        ],
      );
    }

    return Text(widget.label);
  }
}
