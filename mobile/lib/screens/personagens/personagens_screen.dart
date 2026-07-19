import 'package:flutter/material.dart';

import '../../models/personagem.dart';
import '../../services/personagens_service.dart';
import '../../widgets/character_avatar.dart';
import '../../widgets/empty_state.dart';
import 'personagem_detail_screen.dart';

class PersonagensScreen extends StatefulWidget {
  const PersonagensScreen({super.key});

  @override
  State<PersonagensScreen> createState() => _PersonagensScreenState();
}

class _PersonagensScreenState extends State<PersonagensScreen>
    with SingleTickerProviderStateMixin {
  final PersonagensService _service = PersonagensService();
  late TabController _tabController;
  String _busca = '';
  String _filtroPeriodo = 'Todos';
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
    _personagens = _service.getPersonagens();
    _aplicarFiltros();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
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
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_filtrados.isEmpty) {
      return const EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Conteúdo não disponível',
        message: 'Tente outro testamento ou nome.',
      );
    }

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
}
