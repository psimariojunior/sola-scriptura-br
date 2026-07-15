import 'package:flutter/material.dart';
import '../models/biblia_models.dart';
import '../services/api_service.dart';

class TeologiaScreen extends StatefulWidget {
  const TeologiaScreen({super.key});

  @override
  State<TeologiaScreen> createState() => _TeologiaScreenState();
}

class _TeologiaScreenState extends State<TeologiaScreen> {
  final ApiService _api = apiService;
  final TextEditingController _searchController = TextEditingController();

  static const Color _bgDark = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);

  String _searchQuery = '';
  String _selectedCategory = 'Todas';
  bool _isLoading = true;

  List<Doutrina> _doutrinas = [];
  final Set<int> _expandedCards = {};

  static const List<String> _categories = [
    'Todas',
    'Deus',
    'Cristo',
    'Espírito Santo',
    'Salvação',
    'Igreja',
    'Escatologia',
    'Bíblia',
  ];

  @override
  void initState() {
    super.initState();
    _carregarDoutrinas();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _carregarDoutrinas() async {
    setState(() => _isLoading = true);
    try {
      final dados = await _api.getDoutrinas(
        categoria: _selectedCategory == 'Todas' ? null : _selectedCategory,
      );
      setState(() {
        _doutrinas = dados;
        _isLoading = false;
      });
    } catch (_) {
      setState(() {
        _doutrinas = _mockDoutrinas();
        _isLoading = false;
      });
    }
  }

  List<Doutrina> _mockDoutrinas() {
    return [
      Doutrina(
        id: 1,
        nome: 'Trindade',
        descricao:
            'A doutrina da Trindade afirma que Deus existe em três pessoas distintas e coeternas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, mas há um só Deus.',
        categoria: 'Deus',
        tradicao: 'Universal',
      ),
      Doutrina(
        id: 2,
        nome: 'Justificação pela Fé',
        descricao:
            'O ser humano é declarado justo diante de Deus somente pela fé em Jesus Cristo, não por obras. É um ato gratuito de Deus baseado na obra redentora de Cristo.',
        categoria: 'Salvação',
        tradicao: 'Reformada',
      ),
      Doutrina(
        id: 3,
        nome: 'Inerrância Bíblica',
        descricao:
            'A Bíblia é a Palavra de Deus infalível e inerrante no que afirma em todas as suas declarações, sendo a autoridade suprema de fé e prática.',
        categoria: 'Bíblia',
        tradicao: 'Evangélica',
      ),
      Doutrina(
        id: 4,
        nome: 'Encarnação',
        descricao:
            'Jesus Cristo é completamente Deus e completamente homem. O Verbo se fez carne, unindo natureza divina e humana em uma só pessoa sem confusão ou mudança.',
        categoria: 'Cristo',
        tradicao: 'Universal',
      ),
      Doutrina(
        id: 5,
        nome: 'Ressurreição',
        descricao:
            'Cristo ressuscitou fisicamente dos mortos no terceiro dia, vencendo a morte e o pecado. A ressurreição é fundamental para a fé cristã.',
        categoria: 'Cristo',
        tradicao: 'Universal',
      ),
      Doutrina(
        id: 6,
        nome: 'Pecado Original',
        descricao:
            'Todo ser humano nasce em pecado, afetado pela queda de Adão. A natureza humana está corrompida e incapaz de se salvar por si mesma.',
        categoria: 'Salvação',
        tradicao: 'Reformada',
      ),
      Doutrina(
        id: 7,
        nome: 'Batismo no Espírito Santo',
        descricao:
            'O batismo no Espírito Santo é uma experiência posterior à salvação que capacita o crente para testemunho e dons espirituais.',
        categoria: 'Espírito Santo',
        tradicao: 'Pentecostal',
      ),
      Doutrina(
        id: 8,
        nome: 'Segunda Vinda de Cristo',
        descricao:
            'Cristo voltará visivelmente e pessoalmente para julgar os vivos e os mortos, estabelecer Seu reino eterno e renovar todas as coisas.',
        categoria: 'Escatologia',
        tradicao: 'Universal',
      ),
      Doutrina(
        id: 9,
        nome: 'Eucaristia',
        descricao:
            'O pão e o vinho são os meios de graça através dos quais o crente participa do corpo e sangue de Cristo, de forma sacramental.',
        categoria: 'Igreja',
        tradicao: 'Católica',
      ),
      Doutrina(
        id: 10,
        nome: 'Graça Irresistível',
        descricao:
            'Quando Deus decide salvar alguém, Ele efetivamente o faz, superando toda resistência. A graça de Deus é suficiente e eficaz.',
        categoria: 'Salvação',
        tradicao: 'Reformada',
      ),
    ];
  }

  List<Doutrina> get _filteredDoutrinas {
    return _doutrinas.where((d) {
      final matchesSearch = _searchQuery.isEmpty ||
          d.nome.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          (d.descricao ?? '').toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesCategory = _selectedCategory == 'Todas' ||
          d.categoria == _selectedCategory;
      return matchesSearch && matchesCategory;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bgDark,
      appBar: AppBar(
        backgroundColor: _surface,
        centerTitle: true,
        title: const Text(
          'Teologia Sistemática',
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
      body: CustomScrollView(
        slivers: [
          _buildSearchBar(),
          _buildCategoryChips(),
          if (_isLoading)
            const SliverFillRemaining(
              child: Center(
                child: CircularProgressIndicator(color: _accent, strokeWidth: 2),
              ),
            )
          else if (_filteredDoutrinas.isEmpty)
            SliverFillRemaining(child: _buildEmptyState())
          else
            _buildDoctrineList(),
        ],
      ),
    );
  }

  Widget _buildSearchBar() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
        child: Container(
          decoration: BoxDecoration(
            color: _surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: _searchQuery.isNotEmpty
                  ? _accent.withOpacity(0.4)
                  : Colors.white.withOpacity(0.06),
            ),
          ),
          child: TextField(
            controller: _searchController,
            style: const TextStyle(color: Colors.white, fontSize: 15),
            onChanged: (v) => setState(() => _searchQuery = v),
            decoration: InputDecoration(
              hintText: 'Buscar doutrinas...',
              hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
              prefixIcon: Icon(
                Icons.search_rounded,
                color: _searchQuery.isNotEmpty
                    ? _accent
                    : Colors.white.withOpacity(0.3),
                size: 22,
              ),
              suffixIcon: _searchQuery.isNotEmpty
                  ? IconButton(
                      icon: Icon(
                        Icons.close_rounded,
                        color: Colors.white.withOpacity(0.4),
                        size: 20,
                      ),
                      onPressed: () {
                        _searchController.clear();
                        setState(() => _searchQuery = '');
                      },
                    )
                  : null,
              border: InputBorder.none,
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryChips() {
    return SliverToBoxAdapter(
      child: SizedBox(
        height: 52,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          itemCount: _categories.length,
          separatorBuilder: (_, __) => const SizedBox(width: 8),
          itemBuilder: (context, i) {
            final selected = _selectedCategory == _categories[i];
            return AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              curve: Curves.easeOut,
              child: FilterChip(
                label: Text(_categories[i]),
                selected: selected,
                onSelected: (_) {
                  setState(() => _selectedCategory = _categories[i]);
                  _carregarDoutrinas();
                },
                backgroundColor: _surface,
                selectedColor: _accent.withOpacity(0.2),
                checkmarkColor: _accent,
                side: BorderSide(
                  color: selected
                      ? _accent.withOpacity(0.5)
                      : Colors.white.withOpacity(0.08),
                ),
                labelStyle: TextStyle(
                  color: selected ? _accent : Colors.white.withOpacity(0.5),
                  fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                  fontSize: 13,
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
      ),
    );
  }

  Widget _buildDoctrineList() {
    return SliverPadding(
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 40),
      sliver: SliverList.separated(
        itemCount: _filteredDoutrinas.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, i) => _buildDoctrineCard(_filteredDoutrinas[i]),
      ),
    );
  }

  Widget _buildDoctrineCard(Doutrina doutrina) {
    final isExpanded = _expandedCards.contains(doutrina.id);

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOut,
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isExpanded
              ? _accent.withOpacity(0.3)
              : Colors.white.withOpacity(0.04),
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            setState(() {
              if (isExpanded) {
                _expandedCards.remove(doutrina.id);
              } else {
                _expandedCards.add(doutrina.id);
              }
            });
          },
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: _accent.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(
                        Icons.auto_stories_rounded,
                        color: _accent,
                        size: 20,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            doutrina.nome,
                            style: const TextStyle(
                              fontFamily: 'serif',
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            doutrina.categoria ?? 'Geral',
                            style: TextStyle(
                              fontSize: 12,
                              color: _accent.withOpacity(0.7),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                    AnimatedRotation(
                      turns: isExpanded ? 0.5 : 0,
                      duration: const Duration(milliseconds: 300),
                      child: Icon(
                        Icons.expand_more_rounded,
                        color: Colors.white.withOpacity(0.4),
                        size: 22,
                      ),
                    ),
                  ],
                ),
                AnimatedCrossFade(
                  firstChild: const SizedBox.shrink(),
                  secondChild: Padding(
                    padding: const EdgeInsets.only(top: 14),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.03),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                              color: Colors.white.withOpacity(0.06),
                            ),
                          ),
                          child: Text(
                            doutrina.descricao ?? 'Sem descrição disponível.',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white.withOpacity(0.7),
                              height: 1.6,
                              fontFamily: 'serif',
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            _buildTag(
                              doutrina.tradicao ?? 'Geral',
                              _accent.withOpacity(0.8),
                            ),
                            const SizedBox(width: 8),
                            _buildTag(
                              doutrina.categoria ?? 'Geral',
                              const Color(0xFF4A6FA5),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  crossFadeState: isExpanded
                      ? CrossFadeState.showSecond
                      : CrossFadeState.showFirst,
                  duration: const Duration(milliseconds: 300),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTag(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
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
                Icons.auto_stories_rounded,
                size: 48,
                color: _accent.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Nenhuma doutrina encontrada',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Tente buscar por outro termo ou categoria',
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
