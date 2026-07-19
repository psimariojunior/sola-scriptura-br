import 'package:flutter/material.dart';

import '../../data/introducoes_data.dart';
import '../../models/livro.dart';
import '../../services/biblia_service.dart';
import '../../services/introducoes_service.dart';
import '../../widgets/book_selector.dart';
import '../../widgets/empty_state.dart';

class IntroducoesScreen extends StatefulWidget {
  const IntroducoesScreen({super.key});

  @override
  State<IntroducoesScreen> createState() => _IntroducoesScreenState();
}

class _IntroducoesScreenState extends State<IntroducoesScreen> {
  final IntroducoesService _service = IntroducoesService();
  Livro? _livro;

  @override
  void initState() {
    super.initState();
    _livro = BibliaService.livros.first;
  }

  void _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(
        builder: (_) => BookSelector(
          livroSelecionado: _livro?.abreviacao,
          onSelecionado: (l) => Navigator.of(context).pop(l),
        ),
      ),
    );
    if (resultado != null && mounted) {
      setState(() => _livro = resultado);
    }
  }

  @override
  Widget build(BuildContext context) {
    final intro = _livro != null
        ? _service.getIntroducao(_livro!.abreviacao)
        : null;

    return Scaffold(
      appBar: AppBar(title: const Text('Introduções')),
      body: Column(
        children: [
          InkWell(
            onTap: _abrirLivros,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.menu_book, size: 18),
                  const SizedBox(width: 8),
                  Text(
                    _livro?.nome ?? 'Selecionar livro',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const Icon(Icons.expand_more),
                ],
              ),
            ),
          ),
          Expanded(
            child: intro != null
                ? _IntroContent(intro: intro)
                : const EmptyState(
                    icon: Icons.menu_book_outlined,
                    title: 'Conteúdo não disponível',
                    message: 'A introdução para este livro ainda não está disponível.',
                  ),
          ),
        ],
      ),
    );
  }
}

class _IntroContent extends StatelessWidget {
  final IntroducaoLivro intro;

  const _IntroContent({required this.intro});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Introdução a ${intro.nome}',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            '${intro.categoria} • ${intro.testamento}',
            style: TextStyle(
              fontSize: 12,
              color: Theme.of(context).colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        const SizedBox(height: 20),
        _SecaoWidget(
          titulo: 'Autor',
          conteudo: intro.autor,
          icon: Icons.person_outline,
        ),
        _SecaoWidget(
          titulo: 'Data',
          conteudo: intro.data,
          icon: Icons.calendar_today_outlined,
        ),
        _SecaoWidget(
          titulo: 'Tema Principal',
          conteudo: intro.temaPrincipal,
          icon: Icons.lightbulb_outline,
        ),
        _SecaoWidget(
          titulo: 'Contexto Histórico',
          conteudo: intro.contextoHistorico,
          icon: Icons.history_edu_outlined,
        ),
        _SecaoWidget(
          titulo: 'Estrutura',
          conteudo: intro.estrutura,
          icon: Icons.account_tree_outlined,
        ),
        _SecaoWidget(
          titulo: 'Público-Alvo',
          conteudo: intro.publicoAlvo,
          icon: Icons.people_outline,
        ),
        _SecaoWidget(
          titulo: 'Contribuição Teológica',
          conteudo: intro.contribuicaoTeologica,
          icon: Icons.school_outlined,
        ),
        _SecaoWidget(
          titulo: 'Resumo',
          conteudo: intro.resumo,
          icon: Icons.summarize_outlined,
        ),
        if (intro.versiculosChave.isNotEmpty) ...[
          Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.format_quote, size: 18, color: Theme.of(context).colorScheme.primary),
                      const SizedBox(width: 8),
                      Text(
                        'Versículos Chave',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ...intro.versiculosChave.map((v) => Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Icon(Icons.chevron_right, size: 16, color: Theme.of(context).colorScheme.onSurfaceVariant),
                            const SizedBox(width: 4),
                            Expanded(
                              child: Text(
                                v,
                                style: Theme.of(context).textTheme.bodyMedium,
                              ),
                            ),
                          ],
                        ),
                      )),
                ],
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _SecaoWidget extends StatelessWidget {
  final String titulo;
  final String conteudo;
  final IconData icon;

  const _SecaoWidget({
    required this.titulo,
    required this.conteudo,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, size: 18, color: Theme.of(context).colorScheme.primary),
                const SizedBox(width: 8),
                Text(
                  titulo,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              conteudo,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
