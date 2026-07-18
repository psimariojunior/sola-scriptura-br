import 'package:flutter/material.dart';

import '../../models/livro.dart';
import '../../models/traducao.dart';
import '../../services/biblia_service.dart';
import '../../widgets/empty_state.dart';

class CompararScreen extends StatefulWidget {
  const CompararScreen({super.key});

  @override
  State<CompararScreen> createState() => _CompararScreenState();
}

class _CompararScreenState extends State<CompararScreen> {
  Livro? _livro;
  int _capitulo = 3;
  int _versiculo = 16;
  final Map<String, String> _versoes = {};
  bool _carregando = false;

  @override
  void initState() {
    super.initState();
    _livro = BibliaService.livros.firstWhere((l) => l.abreviacao == 'jo');
    _carregarVersoes();
  }

  Future<void> _carregarVersoes() async {
    setState(() {
      _carregando = true;
      _versoes.clear();
    });

    await Future.delayed(const Duration(milliseconds: 500));

    for (final t in Traducoes.lista) {
      _versoes[t.abreviacao] = _mockTextoVersiculo(t.abreviacao);
    }

    if (mounted) {
      setState(() => _carregando = false);
    }
  }

  String _mockTextoVersiculo(String traducao) {
    final textos = {
      'ARC': 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      'NVI': 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo o que crer nele não pereça, mas tenha a vida eterna.',
      'ARA': 'Porque Deus amou o mundo de tal maneira, que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      'ACF': 'Porque Deus amou o mundo de tal sorte, que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      'KJV': 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      'WEB': 'For God loved the world so much, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.',
      'NAA': 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo o que crer nele não pereça, mas tenha a vida eterna.',
      'NTLH': 'Deus amou o mundo de um jeito tão especial, que deu o seu Filho unigênito. Qualquer pessoa que crê nele não será destruída, mas terá a vida que dura para sempre.',
    };
    return textos[traducao] ?? 'Texto não disponível.';
  }

  void _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(
        builder: (_) => _SelecionadorLivro(livroAtual: _livro),
      ),
    );
    if (resultado != null && mounted) {
      setState(() => _livro = resultado);
      _carregarVersoes();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Comparar Traduções')),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.3),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: _abrirLivros,
                        child: Text(
                          _livro?.nome ?? 'Selecionar',
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                      Text(
                        '$_capitulo:$_versiculo',
                        style: TextStyle(fontSize: 13, color: Theme.of(context).colorScheme.primary),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: _abrirLivros,
                  tooltip: 'Selecionar versículo',
                ),
              ],
            ),
          ),
          Expanded(
            child: _carregando
                ? const Center(child: CircularProgressIndicator())
                : _versoes.isEmpty
                    ? const EmptyState(
                        icon: Icons.compare_arrows,
                        title: 'Nenhuma versão disponível',
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.all(8),
                        itemCount: _versoes.length,
                        itemBuilder: (context, index) {
                          final entrada = _versoes.entries.elementAt(index);
                          return Card(
                            margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                            child: Padding(
                              padding: const EdgeInsets.all(14),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: Theme.of(context).colorScheme.primaryContainer,
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Text(
                                          entrada.key,
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                            color: Theme.of(context).colorScheme.primary,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: Text(
                                          Traducoes.porId(entrada.key.toLowerCase())?.nome ?? entrada.key,
                                          style: TextStyle(
                                            fontSize: 11,
                                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 10),
                                  Text(
                                    entrada.value,
                                    style: Theme.of(context).textTheme.bodyLarge,
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}

class _SelecionadorLivro extends StatelessWidget {
  final Livro? livroAtual;

  const _SelecionadorLivro({required this.livroAtual});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Selecionar livro'),
          bottom: const TabBar(
            tabs: [Tab(text: 'AT'), Tab(text: 'NT')],
          ),
        ),
        body: TabBarView(
          children: [
            _grid(context, BibliaService.livros.where((l) => l.testamento == 'AT').toList()),
            _grid(context, BibliaService.livros.where((l) => l.testamento == 'NT').toList()),
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
        return InkWell(
          onTap: () => Navigator.pop(context, livro),
          borderRadius: BorderRadius.circular(10),
          child: Container(
            decoration: BoxDecoration(
              color: livro.abreviacao == livroAtual?.abreviacao
                  ? Theme.of(context).colorScheme.primaryContainer
                  : Theme.of(context).cardColor,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Theme.of(context).dividerColor.withOpacity(0.3)),
            ),
            alignment: Alignment.center,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(livro.abreviacao, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 2),
                Text(livro.nome, style: const TextStyle(fontSize: 10), maxLines: 1, overflow: TextOverflow.ellipsis),
              ],
            ),
          ),
        );
      },
    );
  }
}
