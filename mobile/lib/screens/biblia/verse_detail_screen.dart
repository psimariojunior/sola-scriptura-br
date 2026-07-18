import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/versiculo.dart';
import '../../models/comentario.dart';
import '../../models/lexicon.dart';
import '../../providers/biblia_provider.dart';
import '../../services/comentario_service.dart';
import '../../services/lexicon_service.dart';
import '../../services/api_client.dart';
import '../../config/api_config.dart';
import 'cross_references_screen.dart';
import 'commentary_screen.dart';
import 'lexicon_screen.dart';

class VerseDetailScreen extends StatefulWidget {
  final Versiculo versiculo;
  final String? livroNome;

  const VerseDetailScreen({
    super.key,
    required this.versiculo,
    this.livroNome,
  });

  @override
  State<VerseDetailScreen> createState() => _VerseDetailScreenState();
}

class _VerseDetailScreenState extends State<VerseDetailScreen> {
  List<Comentario> _comentarios = [];
  List<PalavraLexicon> _palavras = [];
  bool _carregandoComentarios = false;
  bool _carregandoPalavras = false;

  @override
  void initState() {
    super.initState();
    _carregarDados();
  }

  Future<void> _carregarDados() async {
    final apiClient = ApiClient(ApiConfig.baseUrl);
    final comentarioService = ComentarioService(apiClient);
    final lexiconService = LexiconService(apiClient);

    setState(() {
      _carregandoComentarios = true;
      _carregandoPalavras = true;
    });

    try {
      final comentarios = await comentarioService.buscarPorVersiculo(
        widget.versiculo.referencia,
      );
      if (mounted) {
        setState(() {
          _comentarios = comentarios;
          _carregandoComentarios = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _carregandoComentarios = false);
    }

    try {
      final palavras = await lexiconService.buscar(
        widget.versiculo.texto,
      );
      if (mounted) {
        setState(() {
          _palavras = palavras;
          _carregandoPalavras = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _carregandoPalavras = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final referencia = '${widget.livroNome ?? widget.versiculo.livro ?? ""} '
        '${widget.versiculo.capitulo ?? ""}:${widget.versiculo.numero}';

    return Scaffold(
      appBar: AppBar(
        title: Text(referencia),
        actions: [
          IconButton(
            icon: const Icon(Icons.headphones),
            tooltip: 'Ouvir áudio',
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.share),
            tooltip: 'Compartilhar',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Versículo copiado!')),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: theme.colorScheme.primaryContainer.withOpacity(0.3),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  referencia,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  widget.versiculo.texto,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    fontSize: 22,
                    height: 1.7,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          _buildSection(
            context,
            'Referências Cruzadas',
            Icons.link,
            () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => CrossReferencesScreen(
                  livro: widget.versiculo.livro ?? 'gn',
                  capitulo: widget.versiculo.capitulo ?? 1,
                  versiculo: widget.versiculo.numero,
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          _buildSection(
            context,
            'Comentários',
            Icons.comment,
            () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => CommentaryScreen(referencia: referencia),
              ),
            ),
          ),
          if (_carregandoComentarios)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 16),
              child: Center(child: CircularProgressIndicator()),
            )
          else if (_comentarios.isNotEmpty)
            ..._comentarios.take(2).map((c) => _buildComentarioPreview(c)),
          const SizedBox(height: 16),
          _buildSection(
            context,
            'Léxico (Grego/Hebraico)',
            Icons.translate,
            () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => LexiconScreen(
                  livro: widget.versiculo.livro ?? 'gn',
                  capitulo: widget.versiculo.capitulo ?? 1,
                  versiculo: widget.versiculo.numero,
                ),
              ),
            ),
          ),
          if (_carregandoPalavras)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 16),
              child: Center(child: CircularProgressIndicator()),
            )
          else if (_palavras.isNotEmpty)
            ..._palavras.take(3).map((p) => _buildPalavraPreview(p)),
          const SizedBox(height: 16),
          _buildSection(
            context,
            'Notas Pessoais',
            Icons.note_add,
            () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Editor de notas em breve!')),
              );
            },
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildSection(
    BuildContext context,
    String title,
    IconData icon,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.all(color: theme.dividerColor),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Icon(icon, color: theme.colorScheme.primary),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Icon(Icons.chevron_right, color: theme.colorScheme.onSurface.withOpacity(0.5)),
          ],
        ),
      ),
    );
  }

  Widget _buildComentarioPreview(Comentario comentario) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.cardColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            comentario.autor,
            style: theme.textTheme.bodySmall?.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colorScheme.primary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            comentario.texto.length > 200
                ? '${comentario.texto.substring(0, 200)}...'
                : comentario.texto,
            style: theme.textTheme.bodyMedium,
            maxLines: 4,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildPalavraPreview(PalavraLexicon palavra) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.cardColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: palavra.isGrego
                  ? Colors.blue.withOpacity(0.1)
                  : Colors.orange.withOpacity(0.1),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              palavra.strong,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: palavra.isGrego ? Colors.blue : Colors.orange,
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
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  palavra.transliteracao.isNotEmpty
                      ? palavra.transliteracao
                      : palavra.definicao,
                  style: theme.textTheme.bodySmall,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          Icon(Icons.chevron_right, color: theme.colorScheme.onSurface.withOpacity(0.5)),
        ],
      ),
    );
  }
}
