import 'package:flutter/material.dart';

import '../../models/cronologia.dart';
import '../../services/cronologia_service.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/timeline_tile.dart';

class CronologiaScreen extends StatefulWidget {
  const CronologiaScreen({super.key});

  @override
  State<CronologiaScreen> createState() => _CronologiaScreenState();
}

class _CronologiaScreenState extends State<CronologiaScreen> {
  final CronologiaService _service = CronologiaService();
  String _eraSelecionada = 'Todas';
  List<EventoCronologico> _eventos = [];
  List<EventoCronologico> _filtrados = [];

  static const Map<String, Color> _eraColors = {
    'Criação': Color(0xFF8BC34A),
    'Patriarcas': Color(0xFF4CAF50),
    'Êxodo': Color(0xFFFF9800),
    'Conquista': Color(0xFFFF5722),
    'Juízes': Color(0xFF795548),
    'Reinos': Color(0xFF2196F3),
    'Exílio': Color(0xFFF44336),
    'Retorno': Color(0xFF9C27B0),
    'Intertestamentário': Color(0xFF607D8B),
    'Ministério': Color(0xFF00BCD4),
    'Igreja Primitiva': Color(0xFF3F51B5),
    'Apocalipse': Color(0xFFE91E63),
  };

  List<String> get _eras => ['Todas', ..._eraColors.keys];

  @override
  void initState() {
    super.initState();
    _eventos = _service.getEventos();
    _aplicarFiltro();
  }

  void _aplicarFiltro() {
    _filtrados = _service.getEventosPorPeriodo(_eraSelecionada);
  }

  Color _corEra(String periodo) {
    return _eraColors[periodo] ?? Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cronologia Bíblica'),
      ),
      body: Column(
        children: [
          SizedBox(
            height: 52,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              itemCount: _eras.length,
              separatorBuilder: (_, __) => const SizedBox(width: 6),
              itemBuilder: (context, index) {
                final era = _eras[index];
                final selecionado = era == _eraSelecionada;
                final cor = _eraColors[era];
                return ChoiceChip(
                  label: Text(era, style: const TextStyle(fontSize: 12)),
                  selected: selecionado,
                  selectedColor: cor?.withValues(alpha: 0.2),
                  onSelected: (_) {
                    setState(() {
                      _eraSelecionada = era;
                      _aplicarFiltro();
                    });
                  },
                );
              },
            ),
          ),
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_filtrados.isEmpty) {
      return const EmptyState(
        icon: Icons.timeline,
        title: 'Conteúdo não disponível',
        message: 'Selecione outra era para ver eventos.',
      );
    }

    final Map<String, List<EventoCronologico>> agrupados = {};
    for (final evento in _filtrados) {
      agrupados.putIfAbsent(evento.periodo, () => []).add(evento);
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      itemCount: _gerarListaFlat(agrupados).length,
      itemBuilder: (context, index) {
        final item = _gerarListaFlat(agrupados)[index];
        if (item is String) {
          return _buildEraHeader(item);
        } else {
          final evento = item as EventoCronologico;
          final listaEventos = agrupados[evento.periodo]!;
          final isFirst = listaEventos.first == evento;
          final isLast = listaEventos.last == evento;
          return TimelineTile(
            evento: evento,
            isFirst: isFirst,
            isLast: isLast,
            eraColor: _corEra(evento.periodo),
            onTap: () => _mostrarDetalhes(evento),
          );
        }
      },
    );
  }

  List<dynamic> _gerarListaFlat(Map<String, List<EventoCronologico>> agrupados) {
    final lista = <dynamic>[];
    for (final entry in agrupados.entries) {
      lista.add(entry.key);
      lista.addAll(entry.value);
    }
    return lista;
  }

  Widget _buildEraHeader(String era) {
    final theme = Theme.of(context);
    final cor = _corEra(era);

    return Container(
      margin: const EdgeInsets.only(top: 16, bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: cor.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: cor.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          Icon(Icons.circle, size: 12, color: cor),
          const SizedBox(width: 8),
          Text(
            era,
            style: theme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.bold,
              color: cor,
            ),
          ),
        ],
      ),
    );
  }

  void _mostrarDetalhes(EventoCronologico evento) {
    final theme = Theme.of(context);
    final cor = _corEra(evento.periodo);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.4,
          minChildSize: 0.2,
          maxChildSize: 0.7,
          expand: false,
          builder: (context, scrollController) {
            return SingleChildScrollView(
              controller: scrollController,
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      decoration: BoxDecoration(
                        color: theme.dividerColor,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: cor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      evento.periodo,
                      style: TextStyle(
                        color: cor,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    evento.evento,
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(Icons.calendar_today,
                          size: 16, color: theme.colorScheme.onSurfaceVariant),
                      const SizedBox(width: 4),
                      Text(
                        evento.data,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  if (evento.detalhes != null) ...[
                    const SizedBox(height: 16),
                    Text(
                      evento.detalhes!,
                      style: theme.textTheme.bodyLarge,
                    ),
                  ],
                ],
              ),
            );
          },
        );
      },
    );
  }
}
