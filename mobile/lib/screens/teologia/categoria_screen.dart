import 'package:flutter/material.dart';

import '../../models/teologia.dart';
import '../../widgets/empty_state.dart';
import 'doutrina_screen.dart';

class CategoriaScreen extends StatelessWidget {
  final String nome;
  final String descricao;
  final Color cor;

  const CategoriaScreen({
    super.key,
    required this.nome,
    required this.descricao,
    required this.cor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final doutrinas = _doutrinasPorCategoria();

    return Scaffold(
      appBar: AppBar(
        title: Text(nome),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            color: cor.withOpacity(0.08),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(
                  _iconeCategoria(),
                  color: cor,
                  size: 32,
                ),
                const SizedBox(height: 8),
                Text(
                  nome,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  descricao,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${doutrinas.length} doutrinas',
                  style: theme.textTheme.labelMedium?.copyWith(
                    color: cor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),

          // Doctrines list
          Expanded(
            child: doutrinas.isEmpty
                ? const EmptyState(
                    icon: Icons.menu_book_outlined,
                    title: 'Nenhuma doutrina encontrada',
                  )
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    itemCount: doutrinas.length,
                    separatorBuilder: (_, __) => const Divider(height: 1),
                    itemBuilder: (context, index) {
                      return _buildCardDoutrina(context, doutrinas[index]);
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
                        color: cor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        v,
                        style: TextStyle(
                          fontSize: 11,
                          color: cor,
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
    if (nome.contains('Própria')) return Icons.account_tree;
    if (nome.contains('Biblio')) return Icons.auto_stories;
    if (nome.contains('Cristo')) return Icons.person;
    if (nome.contains('Pneuma')) return Icons.air;
    if (nome.contains('Soterio')) return Icons.favorite;
    if (nome.contains('Hamart')) return Icons.warning_amber;
    if (nome.contains('Eclesio')) return Icons.groups;
    if (nome.contains('Angelo')) return Icons.flutter_dash;
    if (nome.contains('Demono')) return Icons.dangerous;
    if (nome.contains('Escato')) return Icons.skyline;
    if (nome.contains('Antropo')) return Icons.face;
    if (nome.contains('Satano')) return Icons.report_problem;
    if (nome.contains('Covena')) return Icons.handshake;
    return Icons.book;
  }

  List<Doutrina> _doutrinasPorCategoria() {
    // Demo data — in production, fetch from API
    final Map<String, List<Doutrina>> dados = {
      'Teologia Própria': [
        const Doutrina(
          id: 'trinitarianismo',
          nome: 'Trindade',
          categoria: 'Teologia Própria',
          descricao:
              'Deus é um só em essência, subsistindo em três pessoas distinctas: Pai, Filho e Espírito Santo.',
          versiculos: ['Mateus 28:19', '2 Coríntios 13:14'],
        ),
        const Doutrina(
          id: 'atributos-deus',
          nome: 'Atributos de Deus',
          categoria: 'Teologia Própria',
          descricao:
              'As características essenciais da natureza divina: onisciência, onipotência, onipresença, santidade, amor e justiça.',
          versiculos: ['Êxodo 34:6', 'Salmos 139:1'],
        ),
      ],
      'Cristologia': [
        const Doutrina(
          id: 'encarnacao',
          nome: 'Encarnação',
          categoria: 'Cristologia',
          descricao:
              'O Verbo se fez carne e habitou entre nós, sendo Jesus totalmente Deus e totalmente homem.',
          versiculos: ['João 1:14', 'Filipenses 2:5-8'],
        ),
        const Doutrina(
          id: 'ressurreicao',
          nome: 'Ressurreição',
          categoria: 'Cristologia',
          descricao:
              'Jesus ressuscitou dos mortos no terceiro dia, vencendo a morte e o pecado.',
          versiculos: ['1 Coríntios 15:3-4', 'Mateus 28:5-6'],
        ),
      ],
      'Soteriologia': [
        const Doutrina(
          id: 'justificacao',
          nome: 'Justificação',
          categoria: 'Soteriologia',
          descricao:
              'O crente é declarado justo diante de Deus somente pela fé em Jesus Cristo.',
          versiculos: ['Romanos 5:1', 'Efésios 2:8-9'],
        ),
        const Doutrina(
          id: 'regeneracao',
          nome: 'Regeneração',
          categoria: 'Soteriologia',
          descricao:
              'O novo nascimento espiritual pelo Espírito Santo que transforma o coração do crente.',
          versiculos: ['João 3:3', 'Tito 3:5'],
        ),
      ],
    };

    return dados[nome] ?? [];
  }
}
