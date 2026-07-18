import 'package:flutter/material.dart';

import '../../models/comentario.dart';
import '../../services/comentario_service.dart';
import '../../services/api_client.dart';
import '../../config/api_config.dart';

class CommentaryScreen extends StatefulWidget {
  final String referencia;

  const CommentaryScreen({super.key, required this.referencia});

  @override
  State<CommentaryScreen> createState() => _CommentaryScreenState();
}

class _CommentaryScreenState extends State<CommentaryScreen> {
  List<Comentario> _comentarios = [];
  bool _carregando = false;
  String? _erro;
  double _tamanhoFonte = 15.0;
  final Set<int> _expandidos = {};

  @override
  void initState() {
    super.initState();
    _carregarComentarios();
  }

  Future<void> _carregarComentarios() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });

    try {
      final apiClient = ApiClient(ApiConfig.baseUrl);
      final service = ComentarioService(apiClient);
      final comentarios = await service.buscarPorVersiculo(widget.referencia);

      if (mounted) {
        setState(() {
          _comentarios = comentarios;
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

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Comentários', style: TextStyle(fontSize: 18)),
            Text(
              widget.referencia.toUpperCase(),
              style: theme.textTheme.bodySmall,
            ),
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

    if (_erro != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: Colors.red),
              const SizedBox(height: 16),
              Text('Erro ao carregar comentários:', style: theme.textTheme.bodyLarge),
              const SizedBox(height: 8),
              Text(_erro!, style: theme.textTheme.bodySmall, textAlign: TextAlign.center),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _carregarComentarios,
                icon: const Icon(Icons.refresh),
                label: const Text('Tentar novamente'),
              ),
            ],
          ),
        ),
      );
    }

    if (_comentarios.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.comment_bank_outlined,
              size: 48,
              color: theme.colorScheme.onSurface.withOpacity(0.3),
            ),
            const SizedBox(height: 16),
            Text(
              'Nenhum comentário disponível para este versículo.',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Comentários de teólogos como Matthew Henry, Adam Clarke,\ne João Calvino estarão disponíveis em breve.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.4),
              ),
              textAlign: TextAlign.center,
            ),
          ],
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
    return Colors.grey;
  }
}
