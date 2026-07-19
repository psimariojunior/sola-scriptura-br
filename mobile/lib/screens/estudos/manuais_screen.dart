import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';

class ManuaisScreen extends StatefulWidget {
  const ManuaisScreen({super.key});

  @override
  State<ManuaisScreen> createState() => _ManuaisScreenState();
}

class _ManuaisScreenState extends State<ManuaisScreen> {
  String _nivelSelecionado = 'Todos';
  final List<String> _niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

  static const List<Map<String, dynamic>> _manuais = [
    {
      'titulo': 'Fundamentos da Fé Cristã',
      'nivel': 'Iniciante',
      'descricao': 'Conceitos básicos do cristianismo para novos convertidos.',
      'modulos': 8,
      'icone': Icons.foundation,
      'cor': Color(0xFF4CAF50),
    },
    {
      'titulo': 'Como Estudar a Bíblia',
      'nivel': 'Iniciante',
      'descricao': 'Métodos práticos de estudo bíblico pessoal e em grupo.',
      'modulos': 6,
      'icone': Icons.menu_book,
      'cor': Color(0xFF2196F3),
    },
    {
      'titulo': 'Doutrinas Essenciais',
      'nivel': 'Intermediário',
      'descricao': 'Estudo aprofundado das principais doutrinas cristãs.',
      'modulos': 12,
      'icone': Icons.account_balance,
      'cor': Color(0xFF9C27B0),
    },
    {
      'titulo': 'Hermenêutica Prática',
      'nivel': 'Intermediário',
      'descricao': 'Princípios de interpretação bíblica aplicados.',
      'modulos': 10,
      'icone': Icons.search,
      'cor': Color(0xFFFF9800),
    },
    {
      'titulo': 'Teologia Sistemática',
      'nivel': 'Avançado',
      'descricao': 'Estudo organizado de todas as áreas da teologia.',
      'modulos': 20,
      'icone': Icons.auto_stories,
      'cor': Color(0xFFF44336),
    },
    {
      'titulo': 'Exegese do Novo Testamento',
      'nivel': 'Avançado',
      'descricao': 'Análise exegeta dos livros do Novo Testamento.',
      'modulos': 16,
      'icone': Icons.science,
      'cor': Color(0xFF00BCD4),
    },
  ];

  List<Map<String, dynamic>> get _manuaisFiltrados {
    if (_nivelSelecionado == 'Todos') return _manuais;
    return _manuais.where((m) => m['nivel'] == _nivelSelecionado).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Level filter
        SizedBox(
          height: 48,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            itemCount: _niveis.length,
            separatorBuilder: (_, __) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final nivel = _niveis[index];
              final selecionado = nivel == _nivelSelecionado;
              return ChoiceChip(
                label: Text(nivel),
                selected: selecionado,
                onSelected: (_) {
                  setState(() => _nivelSelecionado = nivel);
                },
              );
            },
          ),
        ),

        // Manuals list
        Expanded(
          child: _manuaisFiltrados.isEmpty
              ? const EmptyState(
                  icon: Icons.school_outlined,
                  title: 'Nenhum manual encontrado',
                  message: 'Selecione outro nível para ver manuais disponíveis.',
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(12),
                  itemCount: _manuaisFiltrados.length,
                  itemBuilder: (context, index) =>
                      _buildCardManual(_manuaisFiltrados[index]),
                ),
        ),
      ],
    );
  }

  Widget _buildCardManual(Map<String, dynamic> manual) {
    final theme = Theme.of(context);
    final cor = manual['cor'] as Color;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => _iniciarManual(manual),
        child: Row(
          children: [
            Container(
              width: 80,
              height: 100,
              color: cor.withValues(alpha: 0.12),
              child: Icon(
                manual['icone'] as IconData,
                color: cor,
                size: 32,
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            manual['titulo'] as String,
                            style: theme.textTheme.titleSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        _buildNivelBadge(
                            manual['nivel'] as String, cor),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      manual['descricao'] as String,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(Icons.view_module,
                            size: 14,
                            color: theme.colorScheme.onSurfaceVariant),
                        const SizedBox(width: 4),
                        Text(
                          '${manual['modulos']} módulos',
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        const Spacer(),
                        Icon(Icons.play_circle_outline,
                            size: 20, color: cor),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNivelBadge(String nivel, Color cor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: cor.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        nivel,
        style: TextStyle(
          fontSize: 10,
          color: cor,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  void _iniciarManual(Map<String, dynamic> manual) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Iniciando: ${manual['titulo']}'),
        duration: const Duration(seconds: 2),
      ),
    );
  }
}
