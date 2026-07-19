import 'package:flutter/material.dart';

import '../../models/comentario.dart';
import '../../services/comentario_service.dart';

class CommentaryScreen extends StatefulWidget {
  final String livro;
  final int capitulo;
  final int versiculo;

  const CommentaryScreen({
    super.key,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
  });

  factory CommentaryScreen.fromReferencia({
    Key? key,
    required String referencia,
  }) {
    final parts = referencia.split(RegExp(r'\s+'));
    final livro = parts.isNotEmpty ? parts[0].toLowerCase() : 'gn';
    final cvParts = (parts.length > 1 ? parts[1] : '1:1').split(':');
    final capitulo = int.tryParse(cvParts[0]) ?? 1;
    final versiculo = int.tryParse(cvParts.length > 1 ? cvParts[1] : '1') ?? 1;
    return CommentaryScreen(
      key: key,
      livro: livro,
      capitulo: capitulo,
      versiculo: versiculo,
    );
  }

  @override
  State<CommentaryScreen> createState() => _CommentaryScreenState();
}

class _CommentaryScreenState extends State<CommentaryScreen> {
  final ComentarioService _service = ComentarioService();
  List<Comentario> _comentarios = [];
  bool _carregando = true;
  double _tamanhoFonte = 15.0;
  final Set<int> _expandidos = {};

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _carregarComentarios());
  }

  void _carregarComentarios() {
    final result = _service.getComentariosPorVersiculo(
      widget.livro,
      widget.capitulo,
      widget.versiculo,
    );
    if (mounted) {
      setState(() {
        _comentarios = result;
        _carregando = false;
      });
    }
  }

  void _toggleExpandido(int index) {
    setState(() {
      if (_expandidos.contains(index)) {
        _expandidos.remove(index);
      } else {
        _expandidos.add(index);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final referencia =
        '${widget.livro.toUpperCase()} ${widget.capitulo}:${widget.versiculo}';

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Comentários', style: TextStyle(fontSize: 18)),
            Text(referencia, style: theme.textTheme.bodySmall),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.text_decrease),
            tooltip: 'Diminuir fonte',
            onPressed: () {
              setState(() {
                _tamanhoFonte = (_tamanhoFonte - 1.0).clamp(12.0, 24.0);
              });
            },
          ),
          IconButton(
            icon: const Icon(Icons.text_increase),
            tooltip: 'Aumentar fonte',
            onPressed: () {
              setState(() {
                _tamanhoFonte = (_tamanhoFonte + 1.0).clamp(12.0, 24.0);
              });
            },
          ),
        ],
      ),
      body: _buildBody(theme),
    );
  }

  Widget _buildBody(ThemeData theme) {
    if (_carregando) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_comentarios.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.menu_book_outlined,
                size: 48,
                color: theme.colorScheme.onSurface.withValues(alpha: 0.3),
              ),
              const SizedBox(height: 16),
              Text(
                'Conteúdo não disponível',
                style: theme.textTheme.titleMedium,
              ),
              const SizedBox(height: 8),
              Text(
                'Comentários para este versículo serão adicionados em breve.',
                textAlign: TextAlign.center,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Column(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            children: [
              Icon(Icons.info_outline, size: 16, color: theme.colorScheme.primary),
              const SizedBox(width: 8),
              Text(
                '${_comentarios.length} comentário${_comentarios.length > 1 ? "s" : ""}',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.primary,
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: _comentarios.length,
            itemBuilder: (context, index) {
              final comentario = _comentarios[index];
              final expandido = _expandidos.contains(index);
              return _buildComentarioCard(theme, comentario, index, expandido);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildComentarioCard(
    ThemeData theme,
    Comentario comentario,
    int index,
    bool expandido,
  ) {
    final textoLongo = comentario.texto.length > 300;
    final textoExibido = expandido || !textoLongo
        ? comentario.texto
        : '${comentario.texto.substring(0, 300)}...';

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: textoLongo ? () => _toggleExpandido(index) : null,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 4,
                    height: 40,
                    decoration: BoxDecoration(
                      color: _corAutor(comentario.autor),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          comentario.autor,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: _corAutor(comentario.autor),
                          ),
                        ),
                        if (comentario.fonte != null)
                          Text(
                            comentario.fonte!,
                            style: theme.textTheme.bodySmall?.copyWith(
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                textoExibido,
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontSize: _tamanhoFonte,
                  height: 1.6,
                ),
              ),
              if (textoLongo) ...[
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      expandido ? 'Recolher' : 'Ler mais',
                      style: TextStyle(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Icon(
                      expandido ? Icons.expand_less : Icons.expand_more,
                      color: theme.colorScheme.primary,
                      size: 18,
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Color _corAutor(String autor) {
    final lower = autor.toLowerCase();
    if (lower.contains('henry') || lower.contains('matthew')) return Colors.blue;
    if (lower.contains('clarke') || lower.contains('adam')) return Colors.green;
    if (lower.contains('calvin') || lower.contains('calvino')) return Colors.purple;
    if (lower.contains('gill')) return Colors.orange;
    if (lower.contains('spurgeon')) return Colors.teal;
    if (lower.contains('barnes')) return Colors.brown;
    return Colors.grey;
  }
}
