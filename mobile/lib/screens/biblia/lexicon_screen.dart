import 'package:flutter/material.dart';

import '../../models/lexicon.dart';
import '../../services/lexicon_service.dart';
import '../../services/api_client.dart';
import '../../config/api_config.dart';

class LexiconScreen extends StatefulWidget {
  final String livro;
  final int capitulo;
  final int versiculo;

  const LexiconScreen({
    super.key,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
  });

  @override
  State<LexiconScreen> createState() => _LexiconScreenState();
}

class _LexiconScreenState extends State<LexiconScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<PalavraLexicon> _palavrasGregas = [];
  List<PalavraLexicon> _palavrasHebraicas = [];
  bool _carregando = false;
  String? _erro;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _carregarPalavras();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _carregarPalavras() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });

    try {
      final apiClient = ApiClient(ApiConfig.baseUrl);
      final service = LexiconService(apiClient);

      final referencia = '${widget.livro} ${widget.capitulo}:${widget.versiculo}';

      final gregas = await service.buscarGrego(referencia);
      final hebraicas = await service.buscarHebraico(referencia);

      if (mounted) {
        setState(() {
          _palavrasGregas = gregas;
          _palavrasHebraicas = hebraicas;
          _carregando = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _erro = e.toString();
          _carregando = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final referencia = '${widget.livro.toUpperCase()} ${widget.capitulo}:${widget.versiculo}';

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Léxico Bíblico', style: TextStyle(fontSize: 18)),
            Text(
              'Palavras de $referencia',
              style: theme.textTheme.bodySmall,
            ),
          ],
        ),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.language, size: 16),
                  const SizedBox(width: 6),
                  Text('Grego (${_palavrasGregas.length})'),
                ],
              ),
            ),
            Tab(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.translate, size: 16),
                  const SizedBox(width: 6),
                  Text('Hebraico (${_palavrasHebraicas.length})'),
                ],
              ),
            ),
          ],
        ),
      ),
      body: _buildBody(theme),
    );
  }

  Widget _buildBody(ThemeData theme) {
    if (_carregando) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_erro != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: Colors.red),
              const SizedBox(height: 16),
              Text('Erro ao carregar léxico: $_erro'),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _carregarPalavras,
                icon: const Icon(Icons.refresh),
                label: const Text('Tentar novamente'),
              ),
            ],
          ),
        ),
      );
    }

    return TabBarView(
      controller: _tabController,
      children: [
        _buildListaPalavras(theme, _palavrasGregas, 'grego'),
        _buildListaPalavras(theme, _palavrasHebraicas, 'hebraico'),
      ],
    );
  }

  Widget _buildListaPalavras(
    ThemeData theme,
    List<PalavraLexicon> palavras,
    String idioma,
  ) {
    if (palavras.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.translate,
              size: 48,
              color: theme.colorScheme.onSurface.withOpacity(0.3),
            ),
            const SizedBox(height: 16),
            Text(
              idioma == 'grego'
                  ? 'Nenhuma palavra grega encontrada.'
                  : 'Nenhuma palavra hebraica encontrada.',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'O léxico original será disponibilizado em breve.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.4),
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: palavras.length,
      itemBuilder: (context, index) {
        final palavra = palavras[index];
        return _buildPalavraCard(theme, palavra, idioma);
      },
    );
  }

  Widget _buildPalavraCard(ThemeData theme, PalavraLexicon palavra, String idioma) {
    final corIdioma = idioma == 'grego' ? Colors.blue : Colors.orange;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () => _mostrarDetalhePalavra(palavra, idioma),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: corIdioma.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      palavra.strong,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: corIdioma,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          palavra.palavra,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        if (palavra.transliteracao.isNotEmpty)
                          Text(
                            palavra.transliteracao,
                            style: theme.textTheme.bodySmall?.copyWith(
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                      ],
                    ),
                  ),
                  Icon(
                    Icons.chevron_right,
                    color: theme.colorScheme.onSurface.withOpacity(0.5),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                palavra.definicao,
                style: theme.textTheme.bodyMedium,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  _buildBadge(theme, 'Strong ${palavra.strong}', corIdioma),
                  const SizedBox(width: 8),
                  _buildBadge(
                    theme,
                    palavra.isGrego ? 'Grego' : 'Hebraico',
                    corIdioma,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBadge(ThemeData theme, String texto, Color cor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: cor.withOpacity(0.08),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        texto,
        style: TextStyle(
          fontSize: 11,
          color: cor,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  void _mostrarDetalhePalavra(PalavraLexicon palavra, String idioma) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (ctx) => _DetalhePalavraSheet(palavra: palavra, idioma: idioma),
    );
  }
}

class _DetalhePalavraSheet extends StatelessWidget {
  final PalavraLexicon palavra;
  final String idioma;

  const _DetalhePalavraSheet({required this.palavra, required this.idioma});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final corIdioma = idioma == 'grego' ? Colors.blue : Colors.orange;

    return DraggableScrollableSheet(
      initialChildSize: 0.7,
      minChildSize: 0.3,
      maxChildSize: 0.95,
      expand: false,
      builder: (context, scrollController) {
        return Container(
          decoration: BoxDecoration(
            color: theme.scaffoldBackgroundColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: ListView(
            controller: scrollController,
            padding: const EdgeInsets.all(24),
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  margin: const EdgeInsets.only(bottom: 24),
                  decoration: BoxDecoration(
                    color: theme.dividerColor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                    decoration: BoxDecoration(
                      color: corIdioma.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      palavra.strong,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: corIdioma,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      palavra.palavra,
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              if (palavra.transliteracao.isNotEmpty) ...[
                const SizedBox(height: 12),
                Text(
                  palavra.transliteracao,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    fontStyle: FontStyle.italic,
                    color: theme.colorScheme.primary,
                  ),
                ),
              ],
              const SizedBox(height: 24),
              _buildDetailSection(theme, 'Definição', palavra.definicao),
              const SizedBox(height: 16),
              _buildDetailSection(
                theme,
                'Tipo',
                palavra.isGrego ? 'Palavra Grega (Novo Testamento)' : 'Palavra Hebraica (Antigo Testamento)',
              ),
              const SizedBox(height: 16),
              _buildDetailSection(
                theme,
                'Número Strong',
                '${palavra.strong} — Usado para identificar esta palavra em concordâncias e léxicos',
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Ocorrências de ${palavra.palavra} serão buscadas em breve.'),
                          ),
                        );
                      },
                      icon: const Icon(Icons.search, size: 18),
                      label: const Text('Outras ocorrências'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                      icon: const Icon(Icons.close, size: 18),
                      label: const Text('Fechar'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildDetailSection(ThemeData theme, String titulo, String conteudo) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titulo,
          style: theme.textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colorScheme.primary,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          conteudo,
          style: theme.textTheme.bodyLarge?.copyWith(height: 1.5),
        ),
      ],
    );
  }
}
