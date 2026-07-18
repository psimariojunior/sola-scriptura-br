import 'package:flutter/material.dart';

import '../../models/traducao.dart';

class TranslationSelectorScreen extends StatelessWidget {
  final String traducaoAtual;

  const TranslationSelectorScreen({super.key, required this.traducaoAtual});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Selecionar Tradução'),
      ),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            color: theme.colorScheme.primaryContainer.withOpacity(0.3),
            child: Row(
              children: [
                Icon(Icons.info_outline, color: theme.colorScheme.primary, size: 20),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Selecione a tradução para leitura. Cada tradução possui características próprias de fidelidade e linguagem.',
                    style: theme.textTheme.bodySmall,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: Traducoes.lista.length,
              itemBuilder: (context, index) {
                final traducao = Traducoes.lista[index];
                final selecionada = traducao.id == traducaoAtual;
                return _buildTraducaoCard(theme, traducao, selecionada, context);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTraducaoCard(
    ThemeData theme,
    Traducao traducao,
    bool selecionada,
    BuildContext context,
  ) {
    final idiomaNome = traducao.idioma == 'pt' ? 'Português' : 'Inglês';

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      color: selecionada
          ? theme.colorScheme.primaryContainer.withOpacity(0.5)
          : null,
      child: InkWell(
        onTap: () {
          Navigator.of(context).pop(traducao.id);
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: selecionada
                      ? theme.colorScheme.primary
                      : theme.colorScheme.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: Text(
                    traducao.abreviacao,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: selecionada
                          ? Colors.white
                          : theme.colorScheme.primary,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      traducao.nome,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: selecionada ? theme.colorScheme.primary : null,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: _corIdioma(traducao.idioma).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            idiomaNome,
                            style: TextStyle(
                              fontSize: 11,
                              color: _corIdioma(traducao.idioma),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          _descricaoTraducao(traducao.id),
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurface.withOpacity(0.5),
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              if (selecionada)
                Icon(
                  Icons.check_circle,
                  color: theme.colorScheme.primary,
                )
              else
                Icon(
                  Icons.chevron_right,
                  color: theme.colorScheme.onSurface.withOpacity(0.3),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Color _corIdioma(String idioma) {
    return idioma == 'pt' ? Colors.green : Colors.blue;
  }

  String _descricaoTraducao(String id) {
    switch (id) {
      case 'arc':
        return 'Clássica e fiel ao texto original';
      case 'nvi':
        return 'Contemporânea e de fácil compreensão';
      case 'ara':
        return 'Equilíbrio entre fidelidade e clareza';
      case 'acf':
        return 'Fiel ao texto hebraico e grego';
      case 'kjv':
        return 'Clássica inglesa do séc. XVII';
      case 'web':
        return 'Domínio público, tradução literal';
      case 'naa':
        return 'Atualização da Almeida';
      case 'ntlh':
        return 'Linguagem acessível para todos';
      default:
        return '';
    }
  }
}
