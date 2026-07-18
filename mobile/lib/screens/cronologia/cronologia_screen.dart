import 'package:flutter/material.dart';

import '../../models/cronologia.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
import '../../widgets/timeline_tile.dart';

class CronologiaScreen extends StatefulWidget {
  const CronologiaScreen({super.key});

  @override
  State<CronologiaScreen> createState() => _CronologiaScreenState();
}

class _CronologiaScreenState extends State<CronologiaScreen> {
  String _eraSelecionada = 'Todas';
  bool _carregando = true;
  String? _erro;
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
    _carregarEventos();
  }

  Future<void> _carregarEventos() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      await Future.delayed(const Duration(milliseconds: 500));
      _eventos = _gerarEventosDemo();
      _aplicarFiltro();
      if (mounted) setState(() => _carregando = false);
    } catch (e) {
      if (mounted) {
        setState(() {
          _erro = e.toString();
          _carregando = false;
        });
      }
    }
  }

  void _aplicarFiltro() {
    if (_eraSelecionada == 'Todas') {
      _filtrados = List.from(_eventos);
    } else {
      _filtrados =
          _eventos.where((e) => e.periodo == _eraSelecionada).toList();
    }
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
          // Era filter chips
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
                  selectedColor: cor?.withOpacity(0.2),
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

          // Timeline
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return const LoadingShimmer(count: 10, height: 60);
    }
    if (_erro != null) {
      return ErrorDisplay(
        message: _erro!,
        onRetry: _carregarEventos,
      );
    }
    if (_filtrados.isEmpty) {
      return const EmptyState(
        icon: Icons.timeline,
        title: 'Nenhum evento encontrado',
        message: 'Selecione outra era para ver eventos.',
      );
    }

    // Group events by era
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
          // Era header
          return _buildEraHeader(item);
        } else {
          // Event tile
          final evento = item as EventoCronologico;
          final listaEventos =
              agrupados[evento.periodo]!;
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
      lista.add(entry.key); // era header
      lista.addAll(entry.value); // events
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
        color: cor.withOpacity(0.12),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: cor.withOpacity(0.3)),
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
                      color: cor.withOpacity(0.12),
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

  List<EventoCronologico> _gerarEventosDemo() {
    return const [
      EventoCronologico(
        data: '~4004 a.C.',
        evento: 'Criação do mundo',
        periodo: 'Criação',
        detalhes: 'Deus cria os céus, a terra e tudo que neles há em seis dias.',
      ),
      EventoCronologico(
        data: '~2300 a.C.',
        evento: 'Chamado de Abraão',
        periodo: 'Patriarcas',
        detalhes: 'Deus chama Abraão para sair de Ur e ir para a terra prometida.',
      ),
      EventoCronologico(
        data: '~1446 a.C.',
        evento: 'Êxodo do Egito',
        periodo: 'Êxodo',
        detalhes:
            'Moisés lidera Israel para fora do Egito com mão poderosa.',
      ),
      EventoCronologico(
        data: '~1406 a.C.',
        evento: 'Conquista de Canaã',
        periodo: 'Conquista',
        detalhes: 'Josué lidera Israel na conquista da terra prometida.',
      ),
      EventoCronologico(
        data: '~1050 a.C.',
        evento: 'Unção de Saul como rei',
        periodo: 'Juízes',
        detalhes: 'Israel pede um rei e Saul é ungido por Samuel.',
      ),
      EventoCronologico(
        data: '~1010 a.C.',
        evento: 'Davi ungido rei',
        periodo: 'Reinos',
        detalhes: 'Davi é ungido rei de Israel, inaugurando a dinastia davídica.',
      ),
      EventoCronologico(
        data: '~586 a.C.',
        evento: 'Queda de Jerusalém',
        periodo: 'Exílio',
        detalhes:
            'Babilônia destrói o templo e leva Israel ao exílio.',
      ),
      EventoCronologico(
        data: '~538 a.C.',
        evento: 'Retorno do exílio',
        periodo: 'Retorno',
        detalhes:
            'Ciro, rei da Pérsia, permite o retorno e a reconstrução do templo.',
      ),
      EventoCronologico(
        data: '~4 a.C.',
        evento: 'Nascimento de Jesus',
        periodo: 'Ministério',
        detalhes: 'Jesus nasce em Belém, cumprindo as profecias messiânicas.',
      ),
      EventoCronologico(
        data: '~30 d.C.',
        evento: 'Crucificação e Ressurreição',
        periodo: 'Ministério',
        detalhes:
            'Jesus morre na cruz e ressuscita ao terceiro dia.',
      ),
      EventoCronologico(
        data: '~33 d.C.',
        evento: 'Pentecostes',
        periodo: 'Igreja Primitiva',
        detalhes:
            'O Espírito Santo descende sobre os discípulos, marcando o início da igreja.',
      ),
      EventoCronologico(
        data: '~95 d.C.',
        evento: 'Apocalipse de João',
        periodo: 'Apocalipse',
        detalhes:
            'João recebe a visão apocalíptica na ilha de Patmos.',
      ),
    ];
  }
}
