import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../services/usuario_service.dart';
import '../services/api_client.dart';
import '../widgets/empty_state.dart';
import '../widgets/error_display.dart';
import '../widgets/loading_shimmer.dart';
import '../widgets/sola_card.dart';

class FavoritosScreen extends StatefulWidget {
  const FavoritosScreen({super.key});

  @override
  State<FavoritosScreen> createState() => _FavoritosScreenState();
}

class _FavoritosScreenState extends State<FavoritosScreen> {
  late final UsuarioService _usuarioService;
  List<String> _favoritos = [];
  bool _carregando = true;
  String? _erro;

  @override
  void initState() {
    super.initState();
    _usuarioService = UsuarioService(ApiClient());
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      final favoritos = await _usuarioService.getFavoritos();
      if (mounted) {
        setState(() {
          _favoritos = favoritos;
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

  Future<void> _remover(String ref) async {
    try {
      await _usuarioService.removerFavorito(ref);
      if (mounted) {
        setState(() {
          _favoritos.remove(ref);
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Removido dos favoritos')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao remover: $e'),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      }
    }
  }

  Map<String, List<String>> _agruparPorLivro() {
    final agrupado = <String, List<String>>{};
    for (final fav in _favoritos) {
      final partes = fav.split(' ');
      final livro = partes.isNotEmpty ? partes.first : 'Desconhecido';
      agrupado.putIfAbsent(livro, () => []).add(fav);
    }
    return agrupado;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Favoritos'),
        actions: [
          if (_favoritos.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: _carregar,
            ),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return const LoadingShimmer(count: 8);
    }

    if (_erro != null) {
      return ErrorDisplay(
        message: _erro!,
        onRetry: _carregar,
      );
    }

    if (_favoritos.isEmpty) {
      return EmptyState(
        icon: Icons.bookmark_border,
        title: 'Nenhum favorito',
        message: 'Salve versiculos clicando no icone de favorito na leitura da Biblia',
      );
    }

    final agrupado = _agruparPorLivro();
    final livros = agrupado.keys.toList();

    return RefreshIndicator(
      onRefresh: _carregar,
      child: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 8),
        itemCount: livros.length,
        itemBuilder: (context, index) {
          final livro = livros[index];
          final versiculos = agrupado[livro]!;

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Text(
                  livro.toUpperCase(),
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                ),
              ),
              ...versiculos.map((ref) => Dismissible(
                    key: Key(ref),
                    direction: DismissDirection.endToStart,
                    background: Container(
                      alignment: Alignment.centerRight,
                      padding: const EdgeInsets.only(right: 16),
                      color: Theme.of(context).colorScheme.error,
                      child: const Icon(
                        Icons.delete,
                        color: Colors.white,
                      ),
                    ),
                    onDismissed: (_) => _remover(ref),
                    child: SolaCard(
                      onTap: () => context.push('/biblia/$ref'),
                      child: Row(
                        children: [
                          Icon(
                            Icons.bookmark,
                            color: Theme.of(context).colorScheme.primary,
                            size: 20,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              ref,
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                          ),
                          Icon(
                            Icons.chevron_right,
                            color:
                                Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                        ],
                      ),
                    ),
                  )),
            ],
          );
        },
      ),
    );
  }
}
