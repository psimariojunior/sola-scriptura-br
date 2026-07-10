import 'package:flutter/material.dart';
import '../models/biblia_models.dart';
import '../services/api_service.dart';

class CronologiaScreen extends StatefulWidget {
  const CronologiaScreen({super.key});

  @override
  State<CronologiaScreen> createState() => _CronologiaScreenState();
}

class _CronologiaScreenState extends State<CronologiaScreen> {
  final ApiService _api = apiService;

  static const Color _bgDark = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);

  String _selectedPeriod = 'Todos';
  bool _isLoading = true;

  List<EventoHistorico> _eventos = [];

  static const List<Map<String, dynamic>> _periodos = [
    {'nome': 'Todos', 'cor': _accent, 'icone': Icons.all_inclusive_rounded},
    {'nome': 'Criação', 'cor': Color(0xFF5D8A5D), 'icone': Icons.eco_rounded},
    {'nome': 'Patriarcas', 'cor': Color(0xFF8B5A3C), 'icone': Icons.people_rounded},
    {'nome': 'Lei', 'cor': Color(0xFFC9A96E), 'icone': Icons.gavel_rounded},
    {'nome': 'Reis', 'cor': Color(0xFFD4AF37), 'icone': Icons.account_balance_rounded},
    {'nome': 'Profetas', 'cor': Color(0xFF4A6FA5), 'icone': Icons.record_voice_over_rounded},
    {'nome': 'Exílio', 'cor': Color(0xFFE07A4A), 'icone': Icons.flight_takeoff_rounded},
    {'nome': 'Vinda', 'cor': Color(0xFF7BC67E), 'icone': Icons.wb_sunny_rounded},
    {'nome': 'Igreja', 'cor': Color(0xFF6B9BD2), 'icone': Icons.church_rounded},
  ];

  @override
  void initState() {
    super.initState();
    _carregarEventos();
  }

  Future<void> _carregarEventos() async {
    setState(() => _isLoading = true);
    try {
      final dados = await _api.getEventosHistoricos();
      setState(() {
        _eventos = dados;
        _isLoading = false;
      });
    } catch (_) {
      setState(() {
        _eventos = _mockEventos();
        _isLoading = false;
      });
    }
  }

  List<EventoHistorico> _mockEventos() {
    return [
      EventoHistorico(
        id: 1,
        titulo: 'Criação do Mundo',
        descricao: 'Deus cria os céus, a terra, os animais e o ser humano à Sua imagem.',
        data: '~4004 a.C.',
        periodo: 'Criação',
      ),
      EventoHistorico(
        id: 2,
        titulo: 'Queda do Homem',
        descricao: 'Adão e Eva pecam ao comer do fruto proibido, entrando em desobediência.',
        data: '~4000 a.C.',
        periodo: 'Criação',
      ),
      EventoHistorico(
        id: 3,
        titulo: 'Aliança com Abraão',
        descricao: 'Deus faz uma aliança com Abraão, prometendo descendência e terra.',
        data: '~2000 a.C.',
        periodo: 'Patriarcas',
      ),
      EventoHistorico(
        id: 4,
        titulo: 'Sacrifício de Isaac',
        descricao: 'Abraão obedece a Deus e está pronto para sacrificar seu filho único.',
        data: '~1900 a.C.',
        periodo: 'Patriarcas',
      ),
      EventoHistorico(
        id: 5,
        titulo: 'Êxodo do Egito',
        descricao: 'Moisés lidera o povo de Israel para fora da escravidão egípcia.',
        data: '~1446 a.C.',
        periodo: 'Lei',
      ),
      EventoHistorico(
        id: 6,
        titulo: 'Entrega da Lei no Sinai',
        descricao: 'Deus entrega os Dez Mandamentos e a Lei a Israel.',
        data: '~1445 a.C.',
        periodo: 'Lei',
      ),
      EventoHistorico(
        id: 7,
        titulo: 'Construção do Templo',
        descricao: 'Salomão constrói o Templo em Jerusalém para a adoração a Deus.',
        data: '~966 a.C.',
        periodo: 'Reis',
      ),
      EventoHistorico(
        id: 8,
        titulo: 'Reino Dividido',
        descricao: 'Após a morte de Salomão, o reino se divide em Israel e Judá.',
        data: '~930 a.C.',
        periodo: 'Reis',
      ),
      EventoHistorico(
        id: 9,
        titulo: 'Ministério de Elias',
        descricao: 'Elias profetiza contra a idolatria e realiza milagres em Israel.',
        data: '~860 a.C.',
        periodo: 'Profetas',
      ),
      EventoHistorico(
        id: 10,
        titulo: 'Queda de Samaria',
        descricao: 'O Reino do Norte cai diante da Assíria (722 a.C.).',
        data: '722 a.C.',
        periodo: 'Exílio',
      ),
      EventoHistorico(
        id: 11,
        titulo: 'Queda de Jerusalém',
        descricao: 'Babilônia destrói o Templo e leva o povo ao exílio.',
        data: '586 a.C.',
        periodo: 'Exílio',
      ),
      EventoHistorico(
        id: 12,
        titulo: 'Retorno do Exílio',
        descricao: 'Ciro, rei da Pérsia, permite que Israel volte e reconstrua o Templo.',
        data: '538 a.C.',
        periodo: 'Exílio',
      ),
      EventoHistorico(
        id: 13,
        titulo: 'Nascimento de Jesus',
        descricao: 'Jesus nasce em Belém, cumprindo as profecias messiânicas.',
        data: '~4 a.C.',
        periodo: 'Vinda',
      ),
      EventoHistorico(
        id: 14,
        titulo: 'Crucificação e Ressurreição',
        descricao: 'Jesus morre na cruz pelos pecados humanos e ressuscita ao terceiro dia.',
        data: '~30 d.C.',
        periodo: 'Vinda',
      ),
      EventoHistorico(
        id: 15,
        titulo: 'Pentecostes',
        descricao: 'O Espírito Santo desce sobre os discípulos, inaugurando a Igreja.',
        data: '~30 d.C.',
        periodo: 'Igreja',
      ),
      EventoHistorico(
        id: 16,
        titulo: 'Conversão de Paulo',
        descricao: 'Saulo é convertido e se torna o apóstolo aos gentios.',
        data: '~33 d.C.',
        periodo: 'Igreja',
      ),
      EventoHistorico(
        id: 17,
        titulo: 'Destruição do Templo',
        descricao: 'Roma destrói Jerusalém e o Templo em 70 d.C.',
        data: '70 d.C.',
        periodo: 'Igreja',
      ),
    ];
  }

  List<EventoHistorico> get _filteredEventos {
    if (_selectedPeriod == 'Todos') return _eventos;
    return _eventos.where((e) => e.periodo == _selectedPeriod).toList();
  }

  Color _corPeriodo(String? periodo) {
    final match = _periodos.firstWhere(
      (p) => p['nome'] == periodo,
      orElse: () => _periodos[0],
    );
    return match['cor'] as Color;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bgDark,
      appBar: AppBar(
        backgroundColor: _surface,
        centerTitle: true,
        title: const Text(
          'Cronologia Bíblica',
          style: TextStyle(
            color: Colors.white,
            fontSize: 17,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.3,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, color: Colors.white70),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          _buildPeriodChips(),
          Expanded(
            child: _isLoading
                ? const Center(
                    child: CircularProgressIndicator(
                        color: _accent, strokeWidth: 2))
                : _filteredEventos.isEmpty
                    ? _buildEmptyState()
                    : _buildTimeline(),
          ),
        ],
      ),
    );
  }

  Widget _buildPeriodChips() {
    return Container(
      height: 52,
      color: _surface,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        itemCount: _periodos.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final p = _periodos[i];
          final selected = _selectedPeriod == p['nome'];
          final cor = p['cor'] as Color;

          return AnimatedContainer(
            duration: const Duration(milliseconds: 250),
            curve: Curves.easeOut,
            child: FilterChip(
              avatar: Icon(
                p['icone'] as IconData,
                size: 16,
                color: selected ? cor : Colors.white.withOpacity(0.4),
              ),
              label: Text(p['nome'] as String),
              selected: selected,
              onSelected: (_) => setState(() => _selectedPeriod = p['nome'] as String),
              backgroundColor: _bgDark,
              selectedColor: cor.withOpacity(0.2),
              checkmarkColor: cor,
              side: BorderSide(
                color: selected
                    ? cor.withOpacity(0.5)
                    : Colors.white.withOpacity(0.08),
              ),
              labelStyle: TextStyle(
                color: selected ? cor : Colors.white.withOpacity(0.5),
                fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                fontSize: 12,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              visualDensity: VisualDensity.compact,
            ),
          );
        },
      ),
    );
  }

  Widget _buildTimeline() {
    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(20, 24, 20, 40),
      itemCount: _filteredEventos.length,
      itemBuilder: (context, index) {
        final evento = _filteredEventos[index];
        final isLeft = index % 2 == 0;
        final cor = _corPeriodo(evento.periodo);
        final isLast = index == _filteredEventos.length - 1;

        return _buildTimelineItem(
          evento: evento,
          isLeft: isLeft,
          cor: cor,
          isLast: isLast,
        );
      },
    );
  }

  Widget _buildTimelineItem({
    required EventoHistorico evento,
    required bool isLeft,
    required Color cor,
    required bool isLast,
  }) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!isLeft) const Spacer(flex: 1),
          if (!isLeft) _buildEmptyCard(),
          Expanded(
            flex: isLeft ? 1 : 1,
            child: Column(
              children: [
                _buildEventCard(evento, cor),
                if (!isLast) _buildConnectorLine(cor),
              ],
            ),
          ),
          _buildTimelineNode(cor, isLast),
          Expanded(
            flex: isLeft ? 1 : 1,
            child: Column(
              children: [
                if (isLeft) _buildEmptyCard(),
                if (!isLast) _buildConnectorLine(cor),
              ],
            ),
          ),
          if (isLeft) _buildEmptyCard(),
          if (isLeft) const Spacer(flex: 1),
        ],
      ),
    );
  }

  Widget _buildEventCard(EventoHistorico evento, Color cor) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: cor.withOpacity(0.2)),
        boxShadow: [
          BoxShadow(
            color: cor.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: cor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  evento.data ?? '',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: cor,
                  ),
                ),
              ),
              const SizedBox(width: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  evento.periodo ?? '',
                  style: TextStyle(
                    fontSize: 10,
                    color: Colors.white.withOpacity(0.4),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            evento.titulo,
            style: const TextStyle(
              fontFamily: 'serif',
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            evento.descricao ?? '',
            style: TextStyle(
              fontSize: 13,
              color: Colors.white.withOpacity(0.5),
              height: 1.5,
            ),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineNode(Color cor) {
    return Column(
      children: [
        Container(
          width: 14,
          height: 14,
          margin: const EdgeInsets.symmetric(horizontal: 4),
          decoration: BoxDecoration(
            color: _bgDark,
            shape: BoxShape.circle,
            border: Border.all(color: cor, width: 3),
            boxShadow: [
              BoxShadow(
                color: cor.withOpacity(0.3),
                blurRadius: 6,
                offset: const Offset(0, 0),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildConnectorLine(Color cor) {
    return Expanded(
      child: Container(
        width: 2,
        margin: const EdgeInsets.symmetric(horizontal: 10),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              cor.withOpacity(0.4),
              cor.withOpacity(0.1),
            ],
          ),
          borderRadius: BorderRadius.circular(1),
        ),
      ),
    );
  }

  Widget _buildEmptyCard() {
    return const Expanded(child: SizedBox());
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: _surface,
                shape: BoxShape.circle,
                border: Border.all(
                  color: _accent.withOpacity(0.1),
                  width: 2,
                ),
              ),
              child: Icon(
                Icons.timeline_rounded,
                size: 48,
                color: _accent.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Nenhum evento encontrado',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Selecione outro período para ver os eventos',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withOpacity(0.4),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
