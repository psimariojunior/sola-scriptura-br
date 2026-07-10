import 'package:flutter/material.dart';
import '../models/biblia_models.dart';
import '../services/api_service.dart';

class MapasScreen extends StatefulWidget {
  const MapasScreen({super.key});

  @override
  State<MapasScreen> createState() => _MapasScreenState();
}

class _MapasScreenState extends State<MapasScreen> {
  final ApiService _api = apiService;

  static const Color _bgDark = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);

  bool _isLoading = true;
  String _selectedCategory = 'Todos';

  List<Localizacao> _localizacoes = [];
  Localizacao? _selectedLocation;

  static const List<Map<String, dynamic>> _categories = [
    {'nome': 'Todos', 'icone': Icons.all_inclusive_rounded},
    {'nome': 'Cidades', 'icone': Icons.location_city_rounded},
    {'nome': 'Montanhas', 'icone': Icons.terrain_rounded},
    {'nome': 'Rios', 'icone': Icons.waves_rounded},
    {'nome': 'Desertos', 'icone': Icons.wb_sunny_outlined},
    {'nome': 'Lagos', 'icone': Icons.water_rounded},
    {'nome': 'Países', 'icone': Icons.flag_rounded},
    {'nome': 'Outros', 'icone': Icons.place_rounded},
  ];

  @override
  void initState() {
    super.initState();
    _carregarLocalizacoes();
  }

  Future<void> _carregarLocalizacoes() async {
    setState(() => _isLoading = true);
    try {
      final dados = await _api.getLocalizacoes();
      setState(() {
        _localizacoes = dados;
        _isLoading = false;
      });
    } catch (_) {
      setState(() {
        _localizacoes = _mockLocalizacoes();
        _isLoading = false;
      });
    }
  }

  List<Localizacao> _mockLocalizacoes() {
    return [
      Localizacao(
        id: 1,
        nome: 'Jerusalém',
        descricao: 'Cidade sagrada, capital de Israel. Local do Templo e centro da vida religiosa.',
        latitude: 31.7683,
        longitude: 35.2137,
        epoca: 'Antigo e Novo Testamento',
      ),
      Localizacao(
        id: 2,
        nome: 'Belém',
        descricao: 'Cidade natal de Davi e local do nascimento de Jesus Cristo.',
        latitude: 31.7054,
        longitude: 35.2076,
        epoca: 'Novo Testamento',
      ),
      Localizacao(
        id: 3,
        nome: 'Nazaré',
        descricao: 'Cidade onde Jesus cresceu e começou Seu ministério público.',
        latitude: 32.6996,
        longitude: 35.3035,
        epoca: 'Novo Testamento',
      ),
      Localizacao(
        id: 4,
        nome: 'Rio Jordão',
        descricao: 'Rio onde Jesus foi batizado por João Batista.',
        latitude: 31.8568,
        longitude: 35.5459,
        epoca: 'Antigo e Novo Testamento',
      ),
      Localizacao(
        id: 5,
        nome: 'Monte Sinai',
        descricao: 'Local onde Moisés recebeu os Dez Mandamentos.',
        latitude: 28.5392,
        longitude: 33.9753,
        epoca: 'Antigo Testamento',
      ),
      Localizacao(
        id: 6,
        nome: 'Babilônia',
        descricao: 'Império que destruiu Jerusalém e levou Israel ao exílio.',
        latitude: 32.5363,
        longitude: 44.4209,
        epoca: 'Antigo Testamento',
      ),
      Localizacao(
        id: 7,
        nome: 'Éfeso',
        descricao: 'Cidade onde o apóstolo João viveu e escreveu o Evangelho.',
        latitude: 37.9411,
        longitude: 27.3420,
        epoca: 'Novo Testamento',
      ),
      Localizacao(
        id: 8,
        nome: 'Mar da Galileia',
        descricao: 'Lago onde Jesus caminhou sobre as águas e chamou os primeiros discípulos.',
        latitude: 32.8333,
        longitude: 35.5833,
        epoca: 'Novo Testamento',
      ),
      Localizacao(
        id: 9,
        nome: 'Monte das Oliveiras',
        descricao: 'Local da Ascensão de Jesus e lugar de oração frequente.',
        latitude: 31.7784,
        longitude: 35.2435,
        epoca: 'Novo Testamento',
      ),
      Localizacao(
        id: 10,
        nome: 'Rio Eufrates',
        descricao: 'Um dos rios do Éden, limite da terra prometida.',
        latitude: 33.1000,
        longitude: 44.0000,
        epoca: 'Antigo Testamento',
      ),
      Localizacao(
        id: 11,
        nome: 'Samaria',
        descricao: 'Capital do Reino do Norte, centro do sincretismo religioso.',
        latitude: 32.2770,
        longitude: 35.1892,
        epoca: 'Antigo Testamento',
      ),
      Localizacao(
        id: 12,
        nome: 'Deserto do Sinai',
        descricao: 'Local da peregrinação de Israel por 40 anos após o Êxodo.',
        latitude: 29.5000,
        longitude: 34.0000,
        epoca: 'Antigo Testamento',
      ),
    ];
  }

  List<Localizacao> get _filteredLocalizacoes {
    if (_selectedCategory == 'Todos') return _localizacoes;
    return _localizacoes.where((l) {
      final desc = (l.descricao ?? '').toLowerCase();
      final nome = l.nome.toLowerCase();
      switch (_selectedCategory) {
        case 'Cidades':
          return nome.contains('cidade') || nome.contains('jerusalém') ||
              nome.contains('belém') || nome.contains('nazaré') ||
              nome.contains('éfeso') || nome.contains('samaria');
        case 'Montanhas':
          return nome.contains('monte') || desc.contains('montanha');
        case 'Rios':
          return nome.contains('rio');
        case 'Desertos':
          return nome.contains('deserto');
        case 'Lagos':
          return nome.contains('mar') || nome.contains('lago');
        case 'Países':
          return nome.contains('babilônia') || nome.contains('egito');
        default:
          return true;
      }
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
          'Mapas Bíblicos',
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
          _buildMapPlaceholder(),
          _buildCategoryChips(),
          Expanded(
            child: _isLoading
                ? const Center(
                    child: CircularProgressIndicator(
                        color: _accent, strokeWidth: 2))
                : _buildLocationsList(),
          ),
        ],
      ),
    );
  }

  Widget _buildMapPlaceholder() {
    return Container(
      width: double.infinity,
      height: 200,
      margin: const EdgeInsets.fromLTRB(20, 16, 20, 0),
      decoration: BoxDecoration(
        color: _surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            _card,
            _surface,
          ],
        ),
      ),
      child: Stack(
        children: [
          // Grid lines to simulate a map
          ...List.generate(
            6,
            (i) => Positioned(
              left: 0,
              right: 0,
              top: (i * 34).toDouble(),
              child: Container(
                height: 1,
                color: Colors.white.withOpacity(0.04),
              ),
            ),
          ),
          ...List.generate(
            8,
            (i) => Positioned(
              top: 0,
              bottom: 0,
              left: (i * 50).toDouble(),
              child: Container(
                width: 1,
                color: Colors.white.withOpacity(0.04),
              ),
            ),
          ),
          // Decorative map markers
          Positioned(
            left: 60,
            top: 50,
            child: _buildMapMarker(const Color(0xFFC9A96E)),
          ),
          Positioned(
            left: 140,
            top: 80,
            child: _buildMapMarker(const Color(0xFF4A6FA5)),
          ),
          Positioned(
            right: 80,
            top: 60,
            child: _buildMapMarker(const Color(0xFF5D8A5D)),
          ),
          Positioned(
            left: 100,
            bottom: 50,
            child: _buildMapMarker(const Color(0xFFE07A4A)),
          ),
          Positioned(
            right: 120,
            bottom: 40,
            child: _buildMapMarker(const Color(0xFF8B5A3C)),
          ),
          // Center label
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.map_rounded,
                  size: 40,
                  color: _accent.withOpacity(0.3),
                ),
                const SizedBox(height: 8),
                Text(
                  'Terra Santa',
                  style: TextStyle(
                    fontFamily: 'serif',
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: _accent.withOpacity(0.5),
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${_filteredLocalizacoes.length} locais bíblicos',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.white.withOpacity(0.3),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMapMarker(Color color) {
    return Container(
      width: 12,
      height: 12,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.4),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryChips() {
    return SizedBox(
      height: 52,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        itemCount: _categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final c = _categories[i];
          final selected = _selectedCategory == c['nome'];
          return AnimatedContainer(
            duration: const Duration(milliseconds: 250),
            curve: Curves.easeOut,
            child: FilterChip(
              avatar: Icon(
                c['icone'] as IconData,
                size: 16,
                color: selected ? _accent : Colors.white.withOpacity(0.4),
              ),
              label: Text(c['nome'] as String),
              selected: selected,
              onSelected: (_) =>
                  setState(() => _selectedCategory = c['nome'] as String),
              backgroundColor: _bgDark,
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

  Widget _buildLocationsList() {
    if (_filteredLocalizacoes.isEmpty) {
      return _buildEmptyState();
    }
    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 40),
      itemCount: _filteredLocalizacoes.length,
      itemBuilder: (context, index) {
        final loc = _filteredLocalizacoes[index];
        return _buildLocationCard(loc);
      },
    );
  }

  Widget _buildLocationCard(Localizacao loc) {
    final isSelected = _selectedLocation?.id == loc.id;
    final color = _corFromEpoca(loc.epoca);

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        decoration: BoxDecoration(
          color: isSelected ? color.withOpacity(0.08) : _card,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSelected
                ? color.withOpacity(0.4)
                : Colors.white.withOpacity(0.04),
          ),
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(14),
            onTap: () {
              setState(() {
                _selectedLocation = isSelected ? null : loc;
              });
            },
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Icon(
                          _iconeFromLocation(loc),
                          color: color,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              loc.nome,
                              style: const TextStyle(
                                fontFamily: 'serif',
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              loc.epoca ?? '',
                              style: TextStyle(
                                fontSize: 11,
                                color: color.withOpacity(0.7),
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (loc.latitude != null && loc.longitude != null)
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.05),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            '${loc.latitude!.toStringAsFixed(2)}°, ${loc.longitude!.toStringAsFixed(2)}°',
                            style: TextStyle(
                              fontSize: 10,
                              color: Colors.white.withOpacity(0.4),
                              fontFamily: 'monospace',
                            ),
                          ),
                        ),
                    ],
                  ),
                  if (isSelected && loc.descricao != null) ...[
                    const SizedBox(height: 12),
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
                        loc.descricao!,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.white.withOpacity(0.6),
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Color _corFromEpoca(String? epoca) {
    if (epoca == null) return _accent;
    if (epoca.contains('Novo')) return const Color(0xFF4A6FA5);
    if (epoca.contains('Antigo')) return const Color(0xFF5D8A5D);
    return _accent;
  }

  IconData _iconeFromLocation(Localizacao loc) {
    final nome = loc.nome.toLowerCase();
    if (nome.contains('rio')) return Icons.waves_rounded;
    if (nome.contains('mar') || nome.contains('lago')) return Icons.water_rounded;
    if (nome.contains('monte')) return Icons.terrain_rounded;
    if (nome.contains('deserto')) return Icons.wb_sunny_outlined;
    if (nome.contains('babilônia')) return Icons.flag_rounded;
    return Icons.place_rounded;
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
                Icons.map_rounded,
                size: 48,
                color: _accent.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Nenhum local encontrado',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Selecione outra categoria para ver os locais',
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
