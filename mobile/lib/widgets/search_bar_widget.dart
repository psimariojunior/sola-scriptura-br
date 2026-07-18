import 'dart:async';

import 'package:flutter/material.dart';

class SearchBarWidget extends StatefulWidget {
  final String? hint;
  final String? initialValue;
  final bool autofocus;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final VoidCallback? onClear;
  final List<SearchFilterChip>? filters;
  final String? selectedFilter;
  final ValueChanged<String?>? onFilterChanged;
  final TextEditingController? controller;

  const SearchBarWidget({
    super.key,
    this.hint,
    this.initialValue,
    this.autofocus = false,
    this.onChanged,
    this.onSubmitted,
    this.onClear,
    this.filters,
    this.selectedFilter,
    this.onFilterChanged,
    this.controller,
  });

  @override
  State<SearchBarWidget> createState() => _SearchBarWidgetState();
}

class _SearchBarWidgetState extends State<SearchBarWidget> {
  late final TextEditingController _controller;
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    _debounce?.cancel();
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }

  void _onSearchChanged(String value) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 400), () {
      widget.onChanged?.call(value);
    });
  }

  void _onSubmitted(String value) {
    _debounce?.cancel();
    widget.onSubmitted?.call(value);
  }

  void _onClear() {
    _controller.clear();
    widget.onClear?.call();
    widget.onChanged?.call('');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasFilters = widget.filters != null && widget.filters!.isNotEmpty;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
          child: TextField(
            controller: _controller,
            autofocus: widget.autofocus,
            onChanged: _onSearchChanged,
            onSubmitted: _onSubmitted,
            decoration: InputDecoration(
              hintText: widget.hint ?? 'Pesquisar...',
              prefixIcon: const Icon(Icons.search),
              suffixIcon: _controller.text.isNotEmpty
                  ? IconButton(
                      icon: const Icon(Icons.clear),
                      onPressed: _onClear,
                    )
                  : null,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              filled: true,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 12,
              ),
            ),
          ),
        ),
        if (hasFilters) ...[
          const SizedBox(height: 8),
          SizedBox(
            height: 40,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              itemCount: widget.filters!.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final filter = widget.filters![index];
                final isSelected = widget.selectedFilter == filter.value;
                return FilterChip(
                  label: Text(filter.label),
                  selected: isSelected,
                  onSelected: (selected) {
                    widget.onFilterChanged?.call(
                      selected ? filter.value : null,
                    );
                  },
                  avatar: filter.icon != null
                      ? Icon(filter.icon, size: 18)
                      : null,
                  selectedColor: theme.colorScheme.primaryContainer,
                  labelStyle: TextStyle(
                    color: isSelected
                        ? theme.colorScheme.onPrimaryContainer
                        : theme.colorScheme.onSurfaceVariant,
                  ),
                );
              },
            ),
          ),
        ],
      ],
    );
  }
}

class SearchFilterChip {
  final String label;
  final String value;
  final IconData? icon;

  const SearchFilterChip({
    required this.label,
    required this.value,
    this.icon,
  });
}
