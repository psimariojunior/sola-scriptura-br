import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

import '../../models/livro.dart';
import '../../services/biblia_service.dart';

class CrossReference {
  final String referencia;
  final String? texto;
  final String tipo;

  const CrossReference({
    required this.referencia,
    this.texto,
    this.tipo = 'paralela',
  });
}

class CrossReferencesScreen extends StatefulWidget {
  final String livro;
  final int capitulo;
  final int versiculo;

  const CrossReferencesScreen({
    super.key,
    required this.livro,
    required this.capitulo,
    required this.versiculo,
  });

  @override
  State<CrossReferencesScreen> createState() => _CrossReferencesScreenState();
}

class _CrossReferencesScreenState extends State<CrossReferencesScreen> {
  List<CrossReference> _referencias = [];
  bool _carregando = false;
  String? _erro;

  @override
  void initState() {
    super.initState();
    _carregarReferencias();
  }

  Future<void> _carregarReferencias() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });

    try {
      // Simulate API call — in real app would fetch from cross-references endpoint
      await Future.delayed(const Duration(milliseconds: 500));

      final referencias = _getMockReferences();
      if (mounted) {
        setState(() {
          _referencias = referencias;
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

  List<CrossReference> _getMockReferences() {
    final livro = BibliaService.abrevFromSlug(widget.livro);
    return [
      CrossReference(
        referencia: '$livro ${widget.capitulo}:${widget.versiculo + 1}',
        tipo: 'paralela',
      ),
      CrossReference(
        referencia: '$livro ${widget.capitulo}:${widget.versiculo + 2}',
        tipo: 'profecia',
      ),
      CrossReference(
        referencia: 'jo 3:16',
        tipo: 'cumprimento',
      ),
    ];
  }

  String _nomeTipo(String tipo) {
    switch (tipo) {
      case 'paralela':
        return 'Paralela';
      case 'profecia':
        return 'Profecia';
      case 'cumprimento':
        return 'Cumprimento';
      case 'tematica':
        return 'Temática';
      case 'citacao':
        return 'Citação';
      default:
        return tipo;
    }
  }

  IconData _iconeTipo(String tipo) {
    switch (tipo) {
      case 'paralela':
        return Icons.compare_arrows;
      case 'profecia':
        return Icons.auto_stories;
      case 'cumprimento':
        return Icons.check_circle_outline;
      case 'tematica':
        return Icons.category;
      case 'citacao':
        return Icons.format_quote;
      default:
        return Icons.link;
    }
  }

  Color _corTipo(String tipo) {
    switch (tipo) {
      case 'paralela':
        return Colors.blue;
      case 'profecia':
        return Colors.purple;
      case 'cumprimento':
        return Colors.green;
      case 'tematica':
        return Colors.orange;
      case 'citacao':
        return Colors.teal;
      default:
        return Colors.grey;
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
            const Text('Referências Cruzadas', style: TextStyle(fontSize: 18)),
            Text(
              referencia,
              style: theme.textTheme.bodySmall,
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
              Text('Erro ao carregar referências: $_erro'),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _carregarReferencias,
                icon: const Icon(Icons.refresh),
                label: const Text('Tentar novamente'),
              ),
            ],
          ),
        ),
      );
    }

    if (_referencias.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.link_off, size: 48, color: theme.colorScheme.onSurface.withOpacity(0.3)),
            const SizedBox(height: 16),
            Text(
              'Nenhuma referência cruzada encontrada.',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
            ),
          ],
        ),
      );
    }

    final agrupadas = <String, List<CrossReference>>{};
    for (final ref in _referencias) {
      agrupadas.putIfAbsent(ref.tipo, () => []).add(ref);
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: agrupadas.keys.length,
      itemBuilder: (context, index) {
        final tipo = agrupadas.keys.elementAt(index);
        final refs = agrupadas[tipo]!;
        return _buildGrupo(theme, tipo, refs);
      },
    );
  }

  Widget _buildGrupo(ThemeData theme, String tipo, List<CrossReference> refs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            children: [
              Icon(
                _iconeTipo(tipo),
                size: 18,
                color: _corTipo(tipo),
              ),
              const SizedBox(width: 8),
              Text(
                _nomeTipo(tipo),
                style: theme.textTheme.titleSmall?.copyWith(
                  color: _corTipo(tipo),
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: _corTipo(tipo).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '${refs.length}',
                  style: TextStyle(
                    fontSize: 12,
                    color: _corTipo(tipo),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
        ...refs.map((ref) => _buildReferencia(theme, ref)),
        const SizedBox(height: 8),
      ],
    );
  }

  Widget _buildReferencia(ThemeData theme, CrossReference ref) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Container(
          width: 4,
          height: 40,
          decoration: BoxDecoration(
            color: _corTipo(ref.tipo),
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        title: Text(
          ref.referencia.toUpperCase(),
          style: theme.textTheme.bodyLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        subtitle: ref.texto != null
            ? Text(
                ref.texto!,
                style: theme.textTheme.bodySmall,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              )
            : null,
        trailing: IconButton(
          icon: const Icon(Icons.content_copy, size: 18),
          tooltip: 'Copiar referência',
          onPressed: () {
            Clipboard.setData(ClipboardData(text: ref.referencia));
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Referência copiada: ${ref.referencia}'),
                duration: const Duration(seconds: 1),
              ),
            );
          },
        ),
        onTap: () {
          _navegarParaVersiculo(ref.referencia);
        },
      ),
    );
  }

  void _navegarParaVersiculo(String referencia) {
    final parts = referencia.split(RegExp(r'[:\s]'));
    if (parts.length >= 3) {
      final livro = parts[0].toLowerCase();
      final capitulo = int.tryParse(parts[1]) ?? 1;
      context.push('/biblia/$livro/$capitulo');
    }
  }
}
