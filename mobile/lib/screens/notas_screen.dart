import 'package:flutter/material.dart';

import '../services/usuario_service.dart';
import '../services/api_client.dart';
import '../widgets/empty_state.dart';
import '../widgets/error_display.dart';
import '../widgets/loading_shimmer.dart';
import '../widgets/sola_card.dart';

class NotasScreen extends StatefulWidget {
  const NotasScreen({super.key});

  @override
  State<NotasScreen> createState() => _NotasScreenState();
}

class _NotasScreenState extends State<NotasScreen> {
  late final UsuarioService _usuarioService;
  List<Map<String, dynamic>> _notas = [];
  List<Map<String, dynamic>> _notasFiltradas = [];
  bool _carregando = true;
  String? _erro;
  String _busca = '';
  final _buscaController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _usuarioService = UsuarioService(ApiClient());
    _carregar();
  }

  @override
  void dispose() {
    _buscaController.dispose();
    super.dispose();
  }

  Future<void> _carregar() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      final notas = await _usuarioService.getNotas();
      if (mounted) {
        setState(() {
          _notas = notas;
          _notasFiltradas = notas;
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

  void _filtrar(String query) {
    setState(() {
      _busca = query;
      if (query.isEmpty) {
        _notasFiltradas = _notas;
      } else {
        _notasFiltradas = _notas.where((nota) {
          final texto = (nota['texto'] as String? ?? '').toLowerCase();
          final ref = (nota['referencia'] as String? ?? '').toLowerCase();
          return texto.contains(query.toLowerCase()) ||
              ref.contains(query.toLowerCase());
        }).toList();
      }
    });
  }

  Future<void> _remover(String notaId) async {
    try {
      await _usuarioService.removerNota(notaId);
      if (mounted) {
        setState(() {
          _notas.removeWhere((n) => n['id'] == notaId);
          _filtrar(_busca);
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Nota excluida')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao excluir: $e'),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      }
    }
  }

  void _editarNota(Map<String, dynamic> nota) {
    final textoController = TextEditingController(
      text: nota['texto'] as String? ?? '',
    );

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(nota['referencia'] as String? ?? 'Editar Nota'),
        content: TextField(
          controller: textoController,
          maxLines: 5,
          decoration: const InputDecoration(
            hintText: 'Escreva sua nota...',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () async {
              final novoTexto = textoController.text.trim();
              if (novoTexto.isEmpty) return;

              try {
                await _usuarioService.atualizarNota(
                  notaId: nota['id'] as String,
                  texto: novoTexto,
                );
                if (mounted) {
                  Navigator.pop(ctx);
                  _carregar();
                }
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Erro ao salvar: $e'),
                      backgroundColor: Theme.of(context).colorScheme.error,
                    ),
                  );
                }
              }
            },
            child: const Text('Salvar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notas'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _carregar,
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _buscaController,
              decoration: InputDecoration(
                hintText: 'Buscar notas...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _busca.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _buscaController.clear();
                          _filtrar('');
                        },
                      )
                    : null,
                border: const OutlineInputBorder(),
                filled: true,
              ),
              onChanged: _filtrar,
            ),
          ),
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return const LoadingShimmer(count: 6);
    }

    if (_erro != null) {
      return ErrorDisplay(
        message: _erro!,
        onRetry: _carregar,
      );
    }

    if (_notas.isEmpty) {
      return EmptyState(
        icon: Icons.note_outlined,
        title: 'Nenhuma nota',
        message: 'Crie anotacoes enquanto estuda a Biblia',
      );
    }

    if (_notasFiltradas.isEmpty) {
      return EmptyState(
        icon: Icons.search_off,
        title: 'Nenhum resultado',
        message: 'Nenhuma nota encontrada para "$_busca"',
      );
    }

    return RefreshIndicator(
      onRefresh: _carregar,
      child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: _notasFiltradas.length,
        itemBuilder: (context, index) {
          final nota = _notasFiltradas[index];
          final referencia = nota['referencia'] as String? ?? '';
          final texto = nota['texto'] as String? ?? '';
          final data = nota['data'] as String? ?? '';

          return Dismissible(
            key: Key(nota['id']?.toString() ?? '$index'),
            direction: DismissDirection.endToStart,
            background: Container(
              alignment: Alignment.centerRight,
              padding: const EdgeInsets.only(right: 16),
              color: Theme.of(context).colorScheme.error,
              child: const Icon(Icons.delete, color: Colors.white),
            ),
            onDismissed: (_) => _remover(nota['id'] as String),
            child: SolaCard(
              onTap: () => _editarNota(nota),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                        Icons.note,
                        size: 16,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        referencia,
                        style: Theme.of(context).textTheme.titleSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                      ),
                      const Spacer(),
                      if (data.isNotEmpty)
                        Text(
                          data,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color:
                                    Theme.of(context).colorScheme.onSurfaceVariant,
                              ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    texto,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
