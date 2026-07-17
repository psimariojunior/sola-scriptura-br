import 'package:flutter/material.dart';

class ChapterGrid extends StatelessWidget {
  final int total;
  final int? capituloSelecionado;
  final ValueChanged<int> onSelecionado;

  const ChapterGrid({
    super.key,
    required this.total,
    required this.capituloSelecionado,
    required this.onSelecionado,
  });

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(12),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 5,
        childAspectRatio: 1.1,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: total,
      itemBuilder: (context, index) {
        final cap = index + 1;
        final ativo = cap == capituloSelecionado;
        return InkWell(
          onTap: () => onSelecionado(cap),
          borderRadius: BorderRadius.circular(10),
          child: Container(
            decoration: BoxDecoration(
              color: ativo
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).cardColor,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: Theme.of(context).dividerColor.withOpacity(0.3),
              ),
            ),
            alignment: Alignment.center,
            child: Text(
              '$cap',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: ativo
                    ? Theme.of(context).colorScheme.onPrimary
                    : null,
              ),
            ),
          ),
        );
      },
    );
  }
}
