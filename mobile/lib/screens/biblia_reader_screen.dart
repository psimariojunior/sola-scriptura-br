import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/livro.dart';
import '../models/traducao.dart';
import '../models/versiculo.dart';
import '../providers/tema_provider.dart';
import '../services/biblia_service.dart';
import '../theme/app_theme.dart';
import '../widgets/book_selector.dart';
import '../widgets/chapter_grid.dart';
import '../widgets/verse_card.dart';

class BibliaReaderScreen extends StatefulWidget {
  const BibliaReaderScreen({super.key});

  @override
  State<BibliaReaderScreen> createState() => _BibliaReaderScreenState();
}

class _BibliaReaderScreenState extends State<BibliaReaderScreen> {
  Livro? _livro;
  int _capitulo = 1;
  String _traducao = Traducoes.lista.first.id;
  List<Versiculo> _versiculos = [];
  bool _carregando = false;
  String? _erro;

  @override
  void initState() {
    super.initState();
    _livro = BibliaService.livros.first;
    _carregarCapitulo();
  }

  Future<void> _carregarCapitulo() async {
    if (_livro == null) return;
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      final slug = BibliaService.abrevParaMidvash[_livro!.abreviacao] ??
          _livro!.slug;
      final textos = await BibliaService.fetchCapitulo(
        _traducao,
        slug,
        _capitulo,
      );
      final versos = <Versiculo>[];
      for (int i = 0; i < textos.length; i++) {
        versos.add(Versiculo(numero: i + 1, texto: textos[i]));
      }
      if (mounted) {
        setState(() {
          _versiculos = versos;
          _carregando = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _erro = e.toString();
          _carregando = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro: ${e.toString()}'),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      }
    }
  }

  void _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(builder: (_) => BookSelector(
        livroSelecionado: _livro?.abreviacao,
        onSelecionado: (l) => Navigator.of(context).pop(l),
      )),
    );
    if (resultado != null && mounted) {
      setState(() {
        _livro = resultado;
        _capitulo = 1;
      });
      _carregarCapitulo();
    }
  }

  void _abrirCapitulos() async {
    if (_livro == null) return;
    final resultado = await Navigator.of(context).push<int>(
      MaterialPageRoute(builder: (_) => Scaffold(
        appBar: AppBar(title: Text('Capítulos — ${_livro!.nome}')),
        body: ChapterGrid(
          total: _livro!.capitulos,
          capituloSelecionado: _capitulo,
          onSelecionado: (c) => Navigator.of(context).pop(c),
        ),
      )),
    );
    if (resultado != null && mounted) {
      setState(() {
        _capitulo = resultado;
      });
      _carregarCapitulo();
    }
  }

  void _trocarTraducao(String? nova) {
    if (nova == null || nova == _traducao) return;
    setState(() {
      _traducao = nova;
    });
    _carregarCapitulo();
  }

  void _trocarTema() async {
    final tema = Provider.of<TemaProvider>(context, listen: false);
    final opcoes = [
      AppTheme.light,
      AppTheme.dark,
      AppTheme.sepia,
      AppTheme.noturno,
    ];
    final escolhido = await showDialog<String>(
      context: context,
      builder: (context) => SimpleDialog(
        title: const Text('Tema'),
        children: opcoes
            .map((t) => SimpleDialogOption(
                  onPressed: () => Navigator.pop(context, t),
                  child: Text(_nomeTema(t)),
                ))
            .toList(),
      ),
    );
    if (escolhido != null) {
      await tema.setTema(escolhido);
    }
  }

  String _nomeTema(String t) {
    switch (t) {
      case AppTheme.dark:
        return 'Escuro';
      case AppTheme.sepia:
        return 'Sépia';
      case AppTheme.noturno:
        return 'Noturno';
      case AppTheme.light:
      default:
        return 'Claro';
    }
  }

  @override
  Widget build(BuildContext context) {
    final traducaoNome = Traducoes.lista
        .firstWhere((t) => t.id == _traducao,
            orElse: () => Traducoes.lista.first)
        .nome;

    return Scaffold(
      appBar: AppBar(
        title: GestureDetector(
          onTap: _abrirLivros,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _livro?.nome ?? 'Selecione um livro',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                traducaoNome,
                style: const TextStyle(fontSize: 12),
              ),
            ],
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.palette),
            tooltip: 'Tema',
            onPressed: _trocarTema,
          ),
          PopupMenuButton<String>(
            onSelected: _trocarTraducao,
            itemBuilder: (context) => Traducoes.lista
                .map((t) => PopupMenuItem(
                      value: t.id,
                      child: Text(t.nome),
                    ))
                .toList(),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  Text(_traducao.toUpperCase()),
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
            onTap: _abrirCapitulos,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
              color: Theme.of(context)
                  .colorScheme
                  .primaryContainer
                  .withOpacity(0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Capítulo $_capitulo',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 15,
                    ),
                  ),
                  const Icon(Icons.expand_more),
                ],
              ),
            ),
          ),
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
      floatingActionButton: _livro != null
          ? FloatingActionButton(
              onPressed: _abrirLivros,
              tooltip: 'Livros',
              child: const Icon(Icons.menu_book),
            )
          : null,
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_erro != null && _versiculos.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Text(
            'Não foi possível carregar este capítulo.\n\n$_erro',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }
    if (_versiculos.isEmpty) {
      return const Center(child: Text('Nenhum versículo.'));
    }
    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: _versiculos.length,
      itemBuilder: (context, index) => VerseCard(
        versiculo: _versiculos[index],
      ),
    );
  }
}
