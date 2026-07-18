import 'package:flutter/material.dart';

import '../../models/personagem.dart';
import '../../services/biblia_service.dart';
import '../../widgets/character_avatar.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
import 'personagem_detail_screen.dart';

class PersonagensScreen extends StatefulWidget {
  const PersonagensScreen({super.key});

  @override
  State<PersonagensScreen> createState() => _PersonagensScreenState();
}

class _PersonagensScreenState extends State<PersonagensScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _busca = '';
  String _filtroPeriodo = 'Todos';
  bool _carregando = true;
  String? _erro;
  List<Personagem> _personagens = [];
  List<Personagem> _filtrados = [];

  final List<String> _periodos = [
    'Todos',
    'Criação',
    'Patriarcas',
    'Êxodo',
    'Juízes',
    'Reinos',
    'Exílio',
    'Retorno',
    'Ministério',
    'Igreja Primitiva',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _carregarPersonagens();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _carregarPersonagens() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      await Future.delayed(const Duration(milliseconds: 400));
      _personagens = _gerarPersonagensDemo();
      _aplicarFiltros();
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

  void _aplicarFiltros() {
    final testamento = _tabController.index == 0 ? 'AT' : 'NT';
    _filtrados = _personagens.where((p) {
      final testeOk = p.testamento == testamento;
      final buscaOk = _busca.isEmpty ||
          p.nome.toLowerCase().contains(_busca.toLowerCase());
      return testeOk && buscaOk;
    }).toList();
  }

  String _iniciais(String nome) {
    final partes = nome.split(' ');
    if (partes.length >= 2) {
      return '${partes.first[0]}${partes.last[0]}';
    }
    return nome.substring(0, nome.length.clamp(0, 2));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Personagens'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Antigo Testamento'),
            Tab(text: 'Novo Testamento'),
          ],
          onTap: (_) => setState(() => _aplicarFiltros()),
        ),
      ),
      body: Column(
        children: [
          // Search
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Buscar personagens...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              onChanged: (valor) {
                setState(() {
                  _busca = valor;
                  _aplicarFiltros();
                });
              },
            ),
          ),

          // Period filter
          SizedBox(
            height: 40,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              itemCount: _periodos.length,
              separatorBuilder: (_, __) => const SizedBox(width: 6),
              itemBuilder: (context, index) {
                final periodo = _periodos[index];
                final selecionado = periodo == _filtroPeriodo;
                return ChoiceChip(
                  label: Text(periodo, style: const TextStyle(fontSize: 12)),
                  selected: selecionado,
                  onSelected: (_) {
                    setState(() => _filtroPeriodo = periodo);
                  },
                );
              },
            ),
          ),

          // List
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return const LoadingShimmer(count: 8, height: 60);
    }
    if (_erro != null) {
      return ErrorDisplay(
        message: _erro!,
        onRetry: _carregarPersonagens,
      );
    }
    if (_filtrados.isEmpty) {
      return const EmptyState(
        icon: Icons.people_outline,
        title: 'Nenhum personagem encontrado',
        message: 'Tente buscar por outro nome ou período.',
      );
    }

    // Group alphabetically
    final Map<String, List<Personagem>> agrupados = {};
    for (final p in _filtrados) {
      final letra = p.nome[0].toUpperCase();
      agrupados.putIfAbsent(letra, () => []).add(p);
    }
    final letras = agrupados.keys.toList()..sort();

    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: letras.length,
      itemBuilder: (context, index) {
        final letra = letras[index];
        final personagens = agrupados[letra]!;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
              child: Text(
                letra,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
            ),
            ...personagens.map((p) => _buildItemPersonagem(p)),
          ],
        );
      },
    );
  }

  Widget _buildItemPersonagem(Personagem personagem) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 3),
      child: ListTile(
        leading: CharacterAvatar(
          initials: _iniciais(personagem.nome),
          testamento: personagem.testamento,
        ),
        title: Text(
          personagem.nome,
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
        subtitle: Text(
          personagem.resumo,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => PersonagemDetailScreen(personagem: personagem),
            ),
          );
        },
      ),
    );
  }

  List<Personagem> _gerarPersonagensDemo() {
    return const [
      Personagem(
        slug: 'abraao',
        nome: 'Abraão',
        resumo: 'Pai de todos os que creem',
        testamento: 'AT',
        referencias: ['Gênesis 12:1-3', 'Hebreus 11:8'],
      ),
      Personagem(
        slug: 'moises',
        nome: 'Moisés',
        resumo: 'Libertador de Israel e legislador',
        testamento: 'AT',
        referencias: ['Êxodo 3:10', 'Deuteronômio 34:10'],
      ),
      Personagem(
        slug: 'davi',
        nome: 'Davi',
        resumo: 'Rei selonho o coração de Deus',
        testamento: 'AT',
        referencias: ['1 Samuel 16:7', 'Atos 13:22'],
      ),
      Personagem(
        slug: 'daniel',
        nome: 'Daniel',
        resumo: 'Profeta de fidelidade na Babilônia',
        testamento: 'AT',
        referencias: ['Daniel 6:23', 'Daniel 2:28'],
      ),
      Personagem(
        slug: 'pedro',
        nome: 'Pedro',
        resumo: 'Apóstolo e líder da igreja primitiva',
        testamento: 'NT',
        referencias: ['Mateus 16:18', 'Atos 2:14'],
      ),
      Personagem(
        slug: 'paulo',
        nome: 'Paulo',
        resumo: 'Apóstolo dos gentios',
        testamento: 'NT',
        referencias: ['Atos 9:15', 'Romanos 1:1'],
      ),
      Personagem(
        slug: 'maria-mae',
        nome: 'Maria',
        resumo: 'Mãe de Jesus',
        testamento: 'NT',
        referencias: ['Lucas 1:38', 'João 19:25'],
      ),
      Personagem(
        slug: 'joao-batista',
        nome: 'João Batista',
        resumo: 'Precursor do Messias',
        testamento: 'NT',
        referencias: ['Mateus 3:1', 'João 1:29'],
      ),
    ];
  }
}
