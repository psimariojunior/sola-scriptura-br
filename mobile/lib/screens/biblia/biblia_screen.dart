import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/livro.dart';
import '../../models/traducao.dart';
import '../../models/versiculo.dart';
import '../../providers/biblia_provider.dart';
import '../../services/biblia_service.dart';
import '../../widgets/verse_card.dart';

class BibliaScreen extends StatefulWidget {
  final String? livroInicial;
  final int? capituloInicial;

  const BibliaScreen({super.key, this.livroInicial, this.capituloInicial});

  @override
  State<BibliaScreen> createState() => _BibliaScreenState();
}

class _BibliaScreenState extends State<BibliaScreen> {
  List<Versiculo> _versiculos = [];
  Livro? _livro;
  int _capitulo = 1;
  String _traducao = 'arc';
  String? _erro;
  bool _carregou = false;

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  void _carregar() {
    if (!BibliaService.isInitialized || BibliaService.livros.isEmpty) {
      _erro = 'Bíblia não carregada. Tente novamente.';
      _carregou = true;
      if (mounted) setState(() {});
      return;
    }
    final slug = widget.livroInicial ?? 'gn';
    _livro = BibliaService.livros.firstWhere(
      (l) => l.abreviacao == slug || l.slug == slug,
      orElse: () => BibliaService.livros.first,
    );
    _capitulo = widget.capituloInicial ?? 1;
    final slugReal = BibliaService.abrevParaMidvash[_livro!.abreviacao] ?? _livro!.slug;
    final textos = BibliaService.fetchCapitulo(_traducao, slugReal, _capitulo);
    if (textos.isNotEmpty) {
      _versiculos = List.generate(textos.length,
        (i) => Versiculo(numero: i + 1, texto: textos[i], livro: _livro!.abreviacao, capitulo: _capitulo, traducao: _traducao),
      );
    } else {
      _erro = 'Capítulo vazio. Gênesis 1 contém 31 versículos em todas as traduções.';
    }
    _carregou = true;
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final traducaoNome = Traducoes.porId(_traducao)?.nome ?? _traducao.toUpperCase();

    if (!_carregou) {
      return Scaffold(
        appBar: AppBar(title: const Text('Bíblia')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    if (_erro != null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Bíblia')),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.error_outline, size: 64, color: theme.colorScheme.error),
                const SizedBox(height: 16),
                Text(_erro!, textAlign: TextAlign.center, style: theme.textTheme.bodyLarge),
                const SizedBox(height: 24),
                ElevatedButton.icon(
                  onPressed: () { _erro = null; _carregou = false; if (mounted) setState(() {}); _carregar(); },
                  icon: const Icon(Icons.refresh),
                  label: const Text('Tentar novamente'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(_livro?.nome ?? 'Bíblia', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text(traducaoNome, style: const TextStyle(fontSize: 12)),
          ],
        ),
        actions: [
          PopupMenuButton<String>(
            onSelected: (t) {
              _traducao = t;
              _carregou = false;
              if (mounted) setState(() {});
              _carregar();
            },
            itemBuilder: (_) => Traducoes.lista
              .where((t) => BibliaService.traducoesDisponiveis.contains(t.id))
              .map((t) => PopupMenuItem(value: t.id, child: Text('${t.nome} (${t.abreviacao})')))
              .toList(),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  Text(_traducao.toUpperCase(), style: const TextStyle(fontWeight: FontWeight.w600)),
                  const Icon(Icons.arrow_drop_down),
                ],
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          InkWell(
            onTap: () => _mostrarSeletorCapitulo(),
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
              color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Capítulo $_capitulo', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                  const SizedBox(width: 4),
                  Text('(${_versiculos.length} versículos)', style: TextStyle(fontSize: 12, color: theme.colorScheme.onSurfaceVariant)),
                  const Icon(Icons.expand_more, size: 20),
                ],
              ),
            ),
          ),
          Expanded(
            child: _versiculos.isEmpty
              ? Center(child: Text('Nenhum versículo.', style: theme.textTheme.bodyMedium))
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  itemCount: _versiculos.length,
                  itemBuilder: (_, i) => VerseCard(versiculo: _versiculos[i]),
                ),
          ),
        ],
      ),
    );
  }

  void _mostrarSeletorCapitulo() {
    if (_livro == null) return;
    showModalBottomSheet(
      context: context,
      builder: (ctx) => SizedBox(
        height: 300,
        child: GridView.builder(
          padding: const EdgeInsets.all(16),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 5, childAspectRatio: 1, crossAxisSpacing: 6, mainAxisSpacing: 6,
          ),
          itemCount: _livro!.capitulos,
          itemBuilder: (_, i) {
            final cap = i + 1;
            return Material(
              color: cap == _capitulo ? Theme.of(ctx).colorScheme.primary : null,
              borderRadius: BorderRadius.circular(8),
              child: InkWell(
                borderRadius: BorderRadius.circular(8),
                onTap: () {
                  Navigator.pop(ctx);
                  _capitulo = cap;
                  _carregou = false;
                  if (mounted) setState(() {});
                  _carregar();
                },
                child: Center(
                  child: Text('$cap', style: TextStyle(
                    color: cap == _capitulo ? Theme.of(ctx).colorScheme.onPrimary : null,
                    fontWeight: FontWeight.w600,
                  )),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
