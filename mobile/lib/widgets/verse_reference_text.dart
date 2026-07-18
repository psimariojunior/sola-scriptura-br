import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class VerseReferenceText extends StatelessWidget {
  final String text;
  final void Function(String reference)? onReferenceTap;

  const VerseReferenceText({
    super.key,
    required this.text,
    this.onReferenceTap,
  });

  static final RegExp _verseRefRegex = RegExp(
    r'\b(\d?\s?[A-Za-zÀ-ú]+)\s+(\d+):(\d+(?:-\d+)?)\b',
    caseSensitive: false,
  );

  @override
  Widget build(BuildContext context) {
    if (onReferenceTap == null) {
      return SelectableText(text, style: Theme.of(context).textTheme.bodyLarge);
    }

    final matches = _verseRefRegex.allMatches(text).toList();
    if (matches.isEmpty) {
      return SelectableText(text, style: Theme.of(context).textTheme.bodyLarge);
    }

    final spans = <InlineSpan>[];
    int lastIndex = 0;

    for (final match in matches) {
      if (match.start > lastIndex) {
        spans.add(TextSpan(
          text: text.substring(lastIndex, match.start),
        ));
      }

      final ref = match.group(0)!;
      spans.add(WidgetSpan(
        child: GestureDetector(
          onTap: () {
            Clipboard.setData(ClipboardData(text: ref));
            onReferenceTap!(ref);
          },
          child: Text(
            ref,
            style: TextStyle(
              color: Theme.of(context).colorScheme.primary,
              fontWeight: FontWeight.w600,
              decoration: TextDecoration.underline,
              decorationColor: Theme.of(context).colorScheme.primary.withOpacity(0.4),
            ),
          ),
        ),
      ));
      lastIndex = match.end;
    }

    if (lastIndex < text.length) {
      spans.add(TextSpan(text: text.substring(lastIndex)));
    }

    return RichText(
      text: TextSpan(
        style: Theme.of(context).textTheme.bodyLarge,
        children: spans,
      ),
    );
  }
}
