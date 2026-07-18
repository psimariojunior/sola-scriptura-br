import 'package:flutter/material.dart';

class SolaTextField extends StatefulWidget {
  final TextEditingController? controller;
  final String? label;
  final String? hint;
  final IconData? prefixIcon;
  final Widget? suffixIcon;
  final bool obscureText;
  final TextInputType? keyboardType;
  final String? Function(String?)? validator;
  final void Function(String)? onChanged;
  final void Function(String)? onSubmitted;
  final int maxLines;
  final bool enabled;
  final int? maxLength;
  final String? initialValue;
  final FocusNode? focusNode;
  final TextInputAction? textInputAction;

  const SolaTextField({
    super.key,
    this.controller,
    this.label,
    this.hint,
    this.prefixIcon,
    this.suffixIcon,
    this.obscureText = false,
    this.keyboardType,
    this.validator,
    this.onChanged,
    this.onSubmitted,
    this.maxLines = 1,
    this.enabled = true,
    this.maxLength,
    this.initialValue,
    this.focusNode,
    this.textInputAction,
  });

  @override
  State<SolaTextField> createState() => _SolaTextFieldState();
}

class _SolaTextFieldState extends State<SolaTextField> {
  bool _hasError = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      child: TextFormField(
        controller: widget.controller,
        initialValue: widget.initialValue,
        focusNode: widget.focusNode,
        decoration: InputDecoration(
          labelText: widget.label,
          hintText: widget.hint,
          prefixIcon: widget.prefixIcon != null
              ? Icon(widget.prefixIcon, size: 20)
              : null,
          suffixIcon: widget.suffixIcon,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.outline,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.primary,
              width: 2,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.error,
              width: 1.5,
            ),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.error,
              width: 2,
            ),
          ),
          disabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(
              color: theme.colorScheme.outline.withOpacity(0.4),
            ),
          ),
          filled: true,
          fillColor: widget.enabled
              ? theme.colorScheme.surfaceContainerHighest.withOpacity(0.2)
              : theme.colorScheme.surfaceContainerHighest.withOpacity(0.1),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          labelStyle: TextStyle(
            color: _hasError
                ? theme.colorScheme.error
                : theme.colorScheme.onSurface.withOpacity(0.6),
          ),
          floatingLabelStyle: TextStyle(
            color: _hasError
                ? theme.colorScheme.error
                : theme.colorScheme.primary,
            fontWeight: FontWeight.w500,
          ),
          hintStyle: TextStyle(
            color: theme.colorScheme.onSurface.withOpacity(0.35),
          ),
          counterStyle: TextStyle(
            color: theme.colorScheme.onSurface.withOpacity(0.5),
            fontSize: 11,
          ),
        ),
        obscureText: widget.obscureText,
        keyboardType: widget.keyboardType,
        validator: (value) {
          final error = widget.validator?.call(value);
          setState(() => _hasError = error != null);
          return error;
        },
        onChanged: widget.onChanged,
        onFieldSubmitted: widget.onSubmitted,
        maxLines: widget.maxLines,
        maxLength: widget.maxLength,
        enabled: widget.enabled,
        textInputAction: widget.textInputAction,
        style: TextStyle(
          color: widget.enabled
              ? theme.colorScheme.onSurface
              : theme.colorScheme.onSurface.withOpacity(0.5),
        ),
      ),
    );
  }
}
