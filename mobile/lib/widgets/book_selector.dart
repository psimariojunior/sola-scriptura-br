import 'package:flutter/material.dart';

import '../models/livro.dart';
import '../services/biblia_service.dart';

class BookSelector extends StatelessWidget {
  final String? livroSelecionado;
  final ValueChanged<Livro> onSelecionado;

  const BookSelector({
    super.key,
    required this.livroSelecionado,
    required this.onSelecionado,
  });

  @override
  Widget build(BuildContext context) {
    final at = BibliaService.livros
        .where((l) => l.testamento == 'AT')
        .toList();
    final nt = BibliaService.livros
        .where((l) => l.testamento == 'NT')
        .toList();

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Escolher livro'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Antigo Testamento'),
              Tab(text: 'Novo Testamento'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _grid(context, at),
            _grid(context, nt),
          ],
        ),
      ),
    );
  }

  Widget _grid(BuildContext context, List<Livro> livros) {
    return GridView.builder(
      padding: const EdgeInsets.all(12),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        childAspectRatio: 2.2,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: livros.length,
      itemBuilder: (context, index) {
        final livro = livros[index];
        final ativo = livro.abreviacao == livroSelecionado;
        return InkWell(
          onTap: () => onSelecionado(livro),
          borderRadius: BorderRadius.circular(10),
          child: Container(
            decoration: BoxDecoration(
              color: ativo
                  ? Theme.of(context).colorScheme.primaryContainer
                  : Theme.of(context).cardColor,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: Theme.of(context).dividerColor.withValues(alpha: 0.3),
              ),
            ),
            alignment: Alignment.center,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  livro.abreviacao,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  livro.nome,
                  style: const TextStyle(fontSize: 10),
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
