import 'package:flutter/material.dart';

import '../../models/lexicon.dart';
import '../../services/lexicon_service.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/search_bar_widget.dart';
import 'palavra_detail_screen.dart';
import 'dicionario_screen.dart';

class IdiomasScreen extends StatefulWidget {
  const IdiomasScreen({super.key});

  @override
  State<IdiomasScreen> createState() => _IdiomasScreenState();
}

class _IdiomasScreenState extends State<IdiomasScreen>
    with SingleTickerProviderStateMixin {
  final LexiconService _lexiconService = LexiconService();
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();

  List<PalavraLexicon> _palavrasGrego = [];
  List<PalavraLexicon> _palavrasHebraico = [];
  List<PalavraLexicon> _palavrasAramaico = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _carregarPalavras();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _carregarPalavras() {
    _palavrasGrego = _lexiconService.buscar('', 'grego');
    _palavrasHebraico = _lexiconService.buscar('', 'hebraico');
    _palavrasAramaico = [];
    setState(() {});
  }

  void _buscar(String query) {
    if (query.trim().isEmpty) {
      _carregarPalavras();
      return;
    }
    final idioma = ['grego', 'hebraico', 'aramaico'][_tabController.index];
    if (idioma == 'grego') {
      _palavrasGrego = _lexiconService.buscar(query, 'grego');
    } else if (idioma == 'hebraico') {
      _palavrasHebraico = _lexiconService.buscar(query, 'hebraico');
    } else {
      _palavrasAramaico = _lexiconService.buscar(query, 'todos')
          .where((p) => !p.isGrego && !p.isHebraico)
          .toList();
    }
    setState(() {});
  }

  void _abrirDetalhe(PalavraLexicon palavra) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PalavraDetailScreen(palavra: palavra),
      ),
    );
  }

  void _abrirDicionario() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const DicionarioScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Idiomas Biblicos'),
        actions: [
          IconButton(
            icon: const Icon(Icons.book),
            tooltip: 'Dicionario',
            onPressed: _abrirDicionario,
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          onTap: (_) => setState(() {}),
          tabs: const [
            Tab(text: 'Grego', icon: Icon(Icons.language)),
            Tab(text: 'Hebraico', icon: Icon(Icons.translate)),
            Tab(text: 'Aramaico', icon: Icon(Icons.spellcheck)),
          ],
        ),
      ),
      body: Column(
        children: [
          SearchBarWidget(
            hint: 'Buscar palavra...',
            controller: _searchController,
            autofocus: false,
            onSubmitted: _buscar,
            onClear: () {
              _searchController.clear();
              _carregarPalavras();
            },
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildPalavras(_palavrasGrego),
                _buildPalavras(_palavrasHebraico),
                _buildPalavras(_palavrasAramaico),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPalavras(List<PalavraLexicon> palavras) {
    if (palavras.isEmpty) {
      return const EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Conteúdo não disponível',
        message: 'Tente buscar por outra palavra.',
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: palavras.length,
      separatorBuilder: (_, __) => const Divider(height: 1),
      itemBuilder: (context, index) {
        final palavra = palavras[index];
        return ListTile(
          leading: _buildStrongBadge(palavra),
          title: Text(
            palavra.palavra,
            style: const TextStyle(fontSize: 18),
          ),
          subtitle: Text(
            palavra.transliteracao,
            style: const TextStyle(fontSize: 13),
          ),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => _abrirDetalhe(palavra),
        );
      },
    );
  }

  Widget _buildStrongBadge(PalavraLexicon palavra) {
    final isGrego = palavra.isGrego;
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        color: isGrego
            ? Colors.blue.withValues(alpha: 0.12)
            : Colors.teal.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(8),
      ),
      alignment: Alignment.center,
      child: Text(
        palavra.strong,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: isGrego ? Colors.blue : Colors.teal,
        ),
      ),
    );
  }
}
