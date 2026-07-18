import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/versiculo.dart';

class VerseSelectionToolbar extends StatefulWidget {
  final List<Versiculo> versiculos;
  final VoidCallback? onLimpar;

  const VerseSelectionToolbar({
    super.key,
    required this.versiculos,
    this.onLimpar,
  });

  @override
  State<VerseSelectionToolbar> createState() => _VerseSelectionToolbarState();
}

class _VerseSelectionToolbarState extends State<VerseSelectionToolbar>
    with SingleTickerProviderStateMixin {
  late AnimationController _animacaoController;
  late Animation<Offset> _animacaoSlide;
  late Animation<double> _animacaoOpacidade;

  @override
  void initState() {
    super.initState();
    _animacaoController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 250),
    );
    _animacaoSlide = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animacaoController,
      curve: Curves.easeOutCubic,
    ));
    _animacaoOpacidade = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(
      parent: _animacaoController,
      curve: Curves.easeOut,
    ));
    _animacaoController.forward();
  }

  @override
  void dispose() {
    _animacaoController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(VerseSelectionToolbar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.versiculos.isNotEmpty && oldWidget.versiculos.isEmpty) {
      _animacaoController.forward(from: 0);
    }
  }

  void _copiarVersiculos() {
    final texto = widget.versiculos
        .map((v) => '${v.numero}. ${v.texto}')
        .join('\n');
    Clipboard.setData(ClipboardData(text: texto));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          '${widget.versiculos.length} versículo(s) copiado(s)!',
        ),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _compartilhar() {
    final texto = widget.versiculos
        .map((v) => '${v.numero}. ${v.texto}')
        .join('\n');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Função de compartilhamento em breve!'),
        action: SnackBarAction(
          label: 'OK',
          onPressed: () {},
        ),
      ),
    );
  }

  void _adicionarNota() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Editor de notas em breve!'),
      ),
    );
  }

  void _destacarVersiculos() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Versículos destacados!'),
      ),
    );
  }

  void _compararTraducoes() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Comparação de traduções em breve!'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final quantidade = widget.versiculos.length;

    return SlideTransition(
      position: _animacaoSlide,
      child: FadeTransition(
        opacity: _animacaoOpacidade,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: theme.colorScheme.primaryContainer,
            border: Border(
              top: BorderSide(
                color: theme.colorScheme.primary.withOpacity(0.3),
                width: 1,
              ),
            ),
          ),
          child: SafeArea(
            top: false,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      Icon(
                        Icons.check_circle,
                        size: 18,
                        color: theme.colorScheme.primary,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '$quantidade versículo${quantidade > 1 ? 's' : ''} selecionado${quantidade > 1 ? 's' : ''}',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      const Spacer(),
                      TextButton.icon(
                        onPressed: widget.onLimpar,
                        icon: const Icon(Icons.close, size: 18),
                        label: const Text('Limpar'),
                      ),
                    ],
                  ),
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _buildActionChip(
                        context,
                        icon: Icons.copy,
                        label: 'Copiar',
                        onTap: _copiarVersiculos,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.share,
                        label: 'Compartilhar',
                        onTap: _compartilhar,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.note_add,
                        label: 'Nota',
                        onTap: _adicionarNota,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.highlight,
                        label: 'Destacar',
                        onTap: _destacarVersiculos,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.compare_arrows,
                        label: 'Comparar',
                        onTap: _compararTraducoes,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionChip(
    BuildContext context, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: theme.scaffoldBackgroundColor,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: theme.colorScheme.outline.withOpacity(0.3),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 16, color: theme.colorScheme.primary),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: theme.colorScheme.onSurface,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
