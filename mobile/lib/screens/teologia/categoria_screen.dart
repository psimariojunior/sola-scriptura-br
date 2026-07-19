import 'package:flutter/material.dart';

import '../../models/teologia.dart';
import '../../services/teologia_service.dart';
import '../../widgets/empty_state.dart';
import 'doutrina_screen.dart';

class CategoriaScreen extends StatefulWidget {
  final String nome;
  final String descricao;
  final Color cor;

  const CategoriaScreen({
    super.key,
    required this.nome,
    this.descricao = '',
    this.cor = Colors.blue,
  });

  factory CategoriaScreen.fromSlug({Key? key, required String slug}) {
    final service = TeologiaService();
    final categorias = service.getCategorias();
    final match = categorias.where(
      (c) =>
          c.id == slug ||
          c.nome.toLowerCase() == slug.toLowerCase() ||
          c.id.contains(slug),
    );
    if (match.isNotEmpty) {
      final c = match.first;
      return CategoriaScreen(
        key: key,
        nome: c.nome,
        descricao: c.descricao,
        cor: Color(c.corValue),
      );
    }
    return CategoriaScreen(key: key, nome: slug);
  }

  @override
  State<CategoriaScreen> createState() => _CategoriaScreenState();
}

class _CategoriaScreenState extends State<CategoriaScreen> {
  late final TeologiaService _service;
  List<Doutrina> _doutrinas = [];
  bool _carregando = true;

  @override
  void initState() {
    super.initState();
    _service = TeologiaService();
    WidgetsBinding.instance.addPostFrameCallback((_) => _carregarDoutrinas());
  }

  void _carregarDoutrinas() {
    final result = _service.getDoutrinas(widget.nome);
    if (mounted) {
      setState(() {
        _doutrinas = result;
        _carregando = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.nome),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            color: widget.cor.withValues(alpha: 0.08),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(
                  _iconeCategoria(),
                  color: widget.cor,
                  size: 32,
                ),
                const SizedBox(height: 8),
                Text(
                  widget.nome,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  widget.descricao,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${_doutrinas.length} doutrinas',
                  style: theme.textTheme.labelMedium?.copyWith(
                    color: widget.cor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: _carregando
                ? const Center(child: CircularProgressIndicator())
                : _doutrinas.isEmpty
                    ? const EmptyState(
                        icon: Icons.menu_book_outlined,
                        title: 'Conteúdo não disponível',
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        itemCount: _doutrinas.length,
                        separatorBuilder: (_, __) =>
                            const Divider(height: 1),
                        itemBuilder: (context, index) {
                          return _buildCardDoutrina(context, _doutrinas[index]);
                        },
                      ),
          ),
        ],
      ),
    );
  }

  Widget _buildCardDoutrina(BuildContext context, Doutrina doutrina) {
    final theme = Theme.of(context);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => DoutrinaScreen(doutrina: doutrina),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                doutrina.nome,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                doutrina.descricao,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              if (doutrina.versiculos.isNotEmpty) ...[
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: doutrina.versiculos.take(3).map((v) {
                    return Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: widget.cor.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        v,
                        style: TextStyle(
                          fontSize: 11,
                          color: widget.cor,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  IconData _iconeCategoria() {
    final n = widget.nome;
    if (n.contains('Própria')) return Icons.account_tree;
    if (n.contains('Biblio')) return Icons.auto_stories;
    if (n.contains('Cristo')) return Icons.person;
    if (n.contains('Pneuma')) return Icons.air;
    if (n.contains('Soterio')) return Icons.favorite;
    if (n.contains('Hamart')) return Icons.warning_amber;
    if (n.contains('Eclesio')) return Icons.groups;
    if (n.contains('Angelo')) return Icons.flutter_dash;
    if (n.contains('Demono')) return Icons.dangerous;
    if (n.contains('Escato')) return Icons.account_balance;
    if (n.contains('Antropo')) return Icons.face;
    if (n.contains('Satano')) return Icons.report_problem;
    if (n.contains('Covena')) return Icons.handshake;
    return Icons.book;
  }
}
