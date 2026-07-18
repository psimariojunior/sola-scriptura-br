import 'package:flutter/material.dart';

class SuggestedQuestions extends StatelessWidget {
  final List<String> perguntas;
  final ValueChanged<String> onPerguntaSelecionada;

  const SuggestedQuestions({
    super.key,
    required this.perguntas,
    required this.onPerguntaSelecionada,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            'Perguntas sugeridas',
            style: theme.textTheme.titleSmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 44,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 4),
            itemCount: perguntas.length,
            separatorBuilder: (_, __) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final pergunta = perguntas[index];
              return ActionChip(
                label: Text(
                  pergunta,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                avatar: const Icon(Icons.chat_bubble_outline, size: 16),
                onPressed: () => onPerguntaSelecionada(pergunta),
                backgroundColor: theme.colorScheme.surfaceContainerHigh,
                side: BorderSide(
                  color: theme.colorScheme.outline.withOpacity(0.3),
                ),
                labelStyle: TextStyle(
                  color: theme.colorScheme.onSurfaceVariant,
                  fontSize: 13,
                ),
                padding: const EdgeInsets.symmetric(horizontal: 8),
                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              );
            },
          ),
        ),
      ],
    );
  }
}
