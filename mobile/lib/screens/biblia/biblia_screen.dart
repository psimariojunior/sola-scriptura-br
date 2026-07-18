import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../models/livro.dart';
import '../../models/traducao.dart';
import '../../models/versiculo.dart';
import '../../providers/biblia_provider.dart';
import '../../widgets/verse_card.dart';
import '../../widgets/bottom_action_bar.dart';
import '../../widgets/verse_selection_toolbar.dart';
import '../../widgets/book_selector.dart';
import '../../widgets/chapter_grid.dart';
import 'cross_references_screen.dart';
import 'commentary_screen.dart';
import 'lexicon_screen.dart';
import 'audio_player_screen.dart';
import 'translation_selector_screen.dart';

class BibliaScreen extends StatefulWidget {
  final String? livroInicial;
  final int? capituloInicial;

  const BibliaScreen({super.key, this.livroInicial, this.capituloInicial});

  @override
  State<BibliaScreen> createState() => _BibliaScreenState();
}

class _BibliaScreenState extends State<BibliaScreen> {
  final ScrollController _scrollController = ScrollController();
  final Set<int> _versiculosSelecionados = {};
  bool _modoSelecao = false;
  double _tamanhoFonte = 18.0;
  Versiculo? _versiculoDestaque;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final provider = context.read<BibliaProvider>();
      if (widget.livroInicial != null) {
        provider.selecionarLivro(widget.livroInicial!);
        if (widget.capituloInicial != null) {
          provider.carregarCapitulo(widget.livroInicial!, widget.capituloInicial!);
        }
      } else if (provider.livroAtual == null) {
        provider.selecionarLivro('gn');
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onVersiculoTap(Versiculo versiculo) {
    if (_modoSelecao) {
      setState(() {
        if (_versiculosSelecionados.contains(versiculo.numero)) {
          _versiculosSelecionados.remove(versiculo.numero);
          if (_versiculosSelecionados.isEmpty) _modoSelecao = false;
        } else {
          _versiculosSelecionados.add(versiculo.numero);
        }
      });
    } else {
      _mostrarDetalheVersiculo(versiculo);
    }
  }

  void _onVersiculoLongPress(Versiculo versiculo) {
    HapticFeedback.mediumImpact();
    setState(() {
      _modoSelecao = true;
      _versiculosSelecionados.add(versiculo.numero);
    });
  }

  void _mostrarDetalheVersiculo(Versiculo versiculo) {
    final provider = context.read<BibliaProvider>();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (ctx) => _VerseDetailPanel(
        versiculo: versiculo,
        livroNome: provider.livroAtual?.nome ?? '',
      ),
    );
  }

  void _abrirSelecaoTraducao() async {
    final provider = context.read<BibliaProvider>();
    final resultado = await Navigator.of(context).push<String>(
      MaterialPageRoute(
        builder: (_) => TranslationSelectorScreen(
          traducaoAtual: provider.traducaoAtual,
        ),
      ),
    );
    if (resultado != null) {
      provider.setTraducao(resultado);
    }
  }

  void _abrirLivros() async {
    final provider = context.read<BibliaProvider>();
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(
        builder: (_) => BookSelector(
          livroSelecionado: provider.livroAtual?.abreviacao,
          onSelecionado: (l) => Navigator.of(context).pop(l),
        ),
      ),
    );
    if (resultado != null) {
      provider.selecionarLivro(resultado.abreviacao);
    }
  }

  void _abrirCapitulos() async {
    final provider = context.read<BibliaProvider>();
    if (provider.livroAtual == null) return;
    final resultado = await Navigator.of(context).push<int>(
      MaterialPageRoute(
        builder: (_) => Scaffold(
          appBar: AppBar(title: Text('Capítulos — ${provider.livroAtual!.nome}')),
          body: ChapterGrid(
            total: provider.livroAtual!.capitulos,
            capituloSelecionado: provider.capituloAtual,
            onSelecionado: (c) => Navigator.of(context).pop(c),
          ),
        ),
      ),
    );
    if (resultado != null) {
      provider.carregarCapitulo(provider.livroAtual!.abreviacao, resultado);
    }
  }

  void _navegarAnterior() {
    final provider = context.read<BibliaProvider>();
    provider.capituloAnterior();
  }

  void _navegarProximo() {
    final provider = context.read<BibliaProvider>();
    provider.proximoCapitulo();
  }

  void _cancelarSelecao() {
    setState(() {
      _modoSelecao = false;
      _versiculosSelecionados.clear();
    });
  }

  void _aumentarFonte() {
    setState(() {
      _tamanhoFonte = (_tamanhoFonte + 1.0).clamp(12.0, 32.0);
    });
  }

  void _diminuirFonte() {
    setState(() {
      _tamanhoFonte = (_tamanhoFonte - 1.0).clamp(12.0, 32.0);
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: GestureDetector(
          onTap: _abrirLivros,
          child: Consumer<BibliaProvider>(
            builder: (context, provider, _) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    provider.livroAtual?.nome ?? 'Selecione um livro',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    Traducoes.porId(provider.traducaoAtual)?.nome ?? provider.traducaoAtual.toUpperCase(),
                    style: const TextStyle(fontSize: 12),
                  ),
                ],
              );
            },
          ),
        ),
        actions: [
          if (_modoSelecao)
            IconButton(
              icon: const Icon(Icons.close),
              tooltip: 'Cancelar seleção',
              onPressed: _cancelarSelecao,
            )
          else ...[
            IconButton(
              icon: const Icon(Icons.remove),
              tooltip: 'Diminuir fonte',
              onPressed: _diminuirFonte,
            ),
            IconButton(
              icon: const Icon(Icons.add),
              tooltip: 'Aumentar fonte',
              onPressed: _aumentarFonte,
            ),
            IconButton(
              icon: const Icon(Icons.translate),
              tooltip: 'Tradução',
              onPressed: _abrirSelecaoTraducao,
            ),
          ],
        ],
      ),
      body: Column(
        children: [
          _buildCapituloSelector(theme),
          Expanded(
            child: _buildBody(theme),
          ),
          if (_modoSelecao && _versiculosSelecionados.isNotEmpty)
            VerseSelectionToolbar(
              versiculos: context.read<BibliaProvider>().versiculos
                  .where((v) => _versiculosSelecionados.contains(v.numero))
                  .toList(),
              onLimpar: _cancelarSelecao,
            ),
          if (!_modoSelecao)
            BottomActionBar(
              onCrossRefs: () => _abrirAbaReferencias(),
              onComentarios: () => _abrirComentarios(),
              onLexicon: () => _abrirLexicon(),
              onAudio: () => _abrirAudio(),
              onCompartilhar: () => _compartilharVersiculos(),
            ),
        ],
      ),
    );
  }

  Widget _buildCapituloSelector(ThemeData theme) {
    return Consumer<BibliaProvider>(
      builder: (context, provider, _) {
        return GestureDetector(
          onTap: _abrirCapitulos,
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
            color: theme.colorScheme.primaryContainer.withOpacity(0.3),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Capítulo ${provider.capituloAtual}',
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(width: 4),
                const Icon(Icons.expand_more, size: 20),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildBody(ThemeData theme) {
    return Consumer<BibliaProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (provider.error != null && provider.versiculos.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.error_outline, size: 48, color: Colors.red),
                  const SizedBox(height: 16),
                  Text(
                    'Não foi possível carregar este capítulo.',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    provider.error!,
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodySmall,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => provider.carregarCapitulo(
                      provider.livroAtual!.abreviacao,
                      provider.capituloAtual,
                    ),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Tentar novamente'),
                  ),
                ],
              ),
            ),
          );
        }

        if (provider.versiculos.isEmpty) {
          return const Center(child: Text('Nenhum versículo encontrado.'));
        }

        return NotificationListener<ScrollNotification>(
          onNotification: (notification) {
            if (notification is ScrollEndNotification) {
              if (notification.metrics.pixels >= notification.metrics.maxScrollExtent - 200) {
                // Preload next chapter if near bottom
              }
            }
            return false;
          },
          child: RefreshIndicator(
            onRefresh: () async {
              await provider.carregarCapitulo(
                provider.livroAtual!.abreviacao,
                provider.capituloAtual,
              );
            },
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: provider.versiculos.length,
              itemBuilder: (context, index) {
                final versiculo = provider.versiculos[index];
                return GestureDetector(
                  onTap: () => _onVersiculoTap(versiculo),
                  onLongPress: () => _onVersiculoLongPress(versiculo),
                  child: VerseCard(
                    versiculo: versiculo,
                    selecionado: _versiculosSelecionados.contains(versiculo.numero),
                    tamanhoFonte: _tamanhoFonte,
                    mostraIndicadores: true,
                  ),
                );
              },
            ),
          ),
        );
      },
    );
  }

  void _abrirAbaReferencias() {
    final provider = context.read<BibliaProvider>();
    if (provider.versiculos.isEmpty) return;
    final versiculo = provider.versiculos.first;
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => CrossReferencesScreen(
          livro: provider.livroAtual?.abreviacao ?? 'gn',
          capitulo: provider.capituloAtual,
          versiculo: versiculo.numero,
        ),
      ),
    );
  }

  void _abrirComentarios() {
    final provider = context.read<BibliaProvider>();
    if (provider.versiculos.isEmpty) return;
    final versiculo = provider.versiculos.first;
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => CommentaryScreen(
          referencia: '${provider.livroAtual?.abreviacao ?? 'gn'} ${provider.capituloAtual}:${versiculo.numero}',
        ),
      ),
    );
  }

  void _abrirLexicon() {
    final provider = context.read<BibliaProvider>();
    if (provider.versiculos.isEmpty) return;
    final versiculo = provider.versiculos.first;
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => LexiconScreen(
          livro: provider.livroAtual?.abreviacao ?? 'gn',
          capitulo: provider.capituloAtual,
          versiculo: versiculo.numero,
        ),
      ),
    );
  }

  void _abrirAudio() {
    final provider = context.read<BibliaProvider>();
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => AudioPlayerScreen(
          livro: provider.livroAtual?.abreviacao ?? 'gn',
          capitulo: provider.capituloAtual,
          traducao: provider.traducaoAtual,
        ),
      ),
    );
  }

  void _compartilharVersiculos() {
    final provider = context.read<BibliaProvider>();
    final selecionados = provider.versiculos
        .where((v) => _versiculosSelecionados.contains(v.numero))
        .toList();

    if (selecionados.isEmpty) {
      final texto = provider.versiculos
          .map((v) => '${v.numero}. ${v.texto}')
          .join('\n');
      _compartilhar(
        '${provider.livroAtual?.nome ?? ""} ${provider.capituloAtual}\n\n$texto\n\n— Sola Scriptura BR',
      );
    } else {
      final texto = selecionados
          .map((v) => '${v.numero}. ${v.texto}')
          .join('\n');
      _compartilhar(
        '${provider.livroAtual?.nome ?? ""} ${provider.capituloAtual}:${selecionados.map((v) => v.numero).join(",")}\n\n$texto\n\n— Sola Scriptura BR',
      );
    }
  }

  void _compartilhar(String texto) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Texto copiado para compartilhar!'),
        action: SnackBarAction(
          label: 'OK',
          onPressed: () {},
        ),
      ),
    );
  }
}

class _VerseDetailPanel extends StatelessWidget {
  final Versiculo versiculo;
  final String livroNome;

  const _VerseDetailPanel({
    required this.versiculo,
    required this.livroNome,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final referencia = '$livroNome ${versiculo.capitulo ?? ""}:${versiculo.numero}';

    return DraggableScrollableSheet(
      initialChildSize: 0.6,
      minChildSize: 0.3,
      maxChildSize: 0.9,
      expand: false,
      builder: (context, scrollController) {
        return Container(
          decoration: BoxDecoration(
            color: theme.scaffoldBackgroundColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: ListView(
            controller: scrollController,
            padding: const EdgeInsets.all(20),
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  margin: const EdgeInsets.only(bottom: 20),
                  decoration: BoxDecoration(
                    color: theme.dividerColor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              Text(
                referencia,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                versiculo.texto,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontSize: 22,
                  height: 1.7,
                ),
              ),
              const SizedBox(height: 24),
              const Divider(),
              const SizedBox(height: 12),
              _buildActionRow(context, 'Referências Cruzadas', Icons.link, () {
                Navigator.of(context).pop();
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => CrossReferencesScreen(
                      livro: versiculo.livro ?? 'gn',
                      capitulo: versiculo.capitulo ?? 1,
                      versiculo: versiculo.numero,
                    ),
                  ),
                );
              }),
              _buildActionRow(context, 'Comentários', Icons.comment, () {
                Navigator.of(context).pop();
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => CommentaryScreen(referencia: referencia),
                  ),
                );
              }),
              _buildActionRow(context, 'Léxico (Grego/Hebraico)', Icons.translate, () {
                Navigator.of(context).pop();
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => LexiconScreen(
                      livro: versiculo.livro ?? 'gn',
                      capitulo: versiculo.capitulo ?? 1,
                      versiculo: versiculo.numero,
                    ),
                  ),
                );
              }),
              _buildActionRow(context, 'Áudio', Icons.headphones, () {
                Navigator.of(context).pop();
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => AudioPlayerScreen(
                      livro: versiculo.livro ?? 'gn',
                      capitulo: versiculo.capitulo ?? 1,
                      traducao: versiculo.traducao ?? 'arc',
                    ),
                  ),
                );
              }),
              _buildActionRow(context, 'Compartilhar', Icons.share, () {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Versículo copiado!')),
                );
              }),
              _buildActionRow(context, 'Adicionar nota', Icons.note_add, () {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Nota salva!')),
                );
              }),
            ],
          ),
        );
      },
    );
  }

  Widget _buildActionRow(
    BuildContext context,
    String label,
    IconData icon,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);
    return ListTile(
      leading: Icon(icon, color: theme.colorScheme.primary),
      title: Text(label),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
      contentPadding: EdgeInsets.zero,
    );
  }
}
