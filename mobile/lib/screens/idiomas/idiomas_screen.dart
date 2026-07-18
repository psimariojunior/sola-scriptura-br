import 'package:flutter/material.dart';

import '../../models/lexicon.dart';
import '../../services/lexicon_service.dart';
import '../../services/api_client.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
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
  late TabController _tabController;
  late final LexiconService _lexiconService;
  final TextEditingController _searchController = TextEditingController();

  List<PalavraLexicon> _palavrasGrego = [];
  List<PalavraLexicon> _palavrasHebraico = [];
  List<PalavraLexicon> _palavrasAramaico = [];
  bool _isLoadingGrego = false;
  bool _isLoadingHebraico = false;
  bool _isLoadingAramaico = false;
  String? _erroGrego;
  String? _erroHebraico;
  String? _erroAramaico;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _lexiconService = LexiconService(ApiClient());
    _carregarPalavras();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _carregarPalavras() async {
    _carregarGrego();
    _carregarHebraico();
  }

  Future<void> _carregarGrego() async {
    setState(() {
      _isLoadingGrego = true;
      _erroGrego = null;
    });
    try {
      final palavras = await _lexiconService.buscarGrego('');
      if (mounted) {
        setState(() {
          _palavrasGrego = palavras;
          _isLoadingGrego = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _erroGrego = e.toString();
          _isLoadingGrego = false;
        });
      }
    }
  }

  Future<void> _carregarHebraico() async {
    setState(() {
      _isLoadingHebraico = true;
      _erroHebraico = null;
    });
    try {
      final palavras = await _lexiconService.buscarHebraico('');
      if (mounted) {
        setState(() {
          _palavrasHebraico = palavras;
          _isLoadingHebraico = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _erroHebraico = e.toString();
          _isLoadingHebraico = false;
        });
      }
    }
  }

  Future<void> _buscar(String query) async {
    if (query.trim().isEmpty) {
      _carregarPalavras();
      return;
    }
    final idioma = ['grego', 'hebraico', 'aramaico'][_tabController.index];
    setState(() {
      if (_tabController.index == 0) _isLoadingGrego = true;
      if (_tabController.index == 1) _isLoadingHebraico = true;
      if (_tabController.index == 2) _isLoadingAramaico = true;
    });
    try {
      final palavras = await _lexiconService.buscar(query, idioma: idioma);
      if (mounted) {
        setState(() {
          if (_tabController.index == 0) {
            _palavrasGrego = palavras;
            _isLoadingGrego = false;
          } else if (_tabController.index == 1) {
            _palavrasHebraico = palavras;
            _isLoadingHebraico = false;
          } else {
            _palavrasAramaico = palavras;
            _isLoadingAramaico = false;
          }
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          if (_tabController.index == 0) {
            _erroGrego = e.toString();
            _isLoadingGrego = false;
          } else if (_tabController.index == 1) {
            _erroHebraico = e.toString();
            _isLoadingHebraico = false;
          } else {
            _erroAramaico = e.toString();
            _isLoadingAramaico = false;
          }
        });
      }
    }
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
    final theme = Theme.of(context);

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
            onClear: () => _carregarPalavras(),
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildPalavras(
                  _palavrasGrego,
                  _isLoadingGrego,
                  _erroGrego,
                ),
                _buildPalavras(
                  _palavrasHebraico,
                  _isLoadingHebraico,
                  _erroHebraico,
                ),
                _buildPalavras(
                  _palavrasAramaico,
                  _isLoadingAramaico,
                  _erroAramaico,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPalavras(
    List<PalavraLexicon> palavras,
    bool isLoading,
    String? erro,
  ) {
    if (isLoading) {
      return const Padding(
        padding: EdgeInsets.all(16),
        child: LoadingShimmer(count: 8),
      );
    }

    if (erro != null) {
      return ErrorDisplay(
        message: erro,
        onRetry: _carregarPalavras,
      );
    }

    if (palavras.isEmpty) {
      return EmptyState(
        icon: Icons.search_off,
        title: 'Nenhuma palavra encontrada',
        message: 'Tente buscar por outra palavra',
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
            ? Colors.blue.withOpacity(0.12)
            : Colors.teal.withOpacity(0.12),
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
