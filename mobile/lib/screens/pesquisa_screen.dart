import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PesquisaScreen extends StatefulWidget {
  const PesquisaScreen({super.key});

  @override
  State<PesquisaScreen> createState() => _PesquisaScreenState();
}

class _PesquisaScreenState extends State<PesquisaScreen> {
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  String _query = '';
  bool _isSearching = false;
  List<Map<String, dynamic>> _results = [];

  static const Color _accent = Color(0xFFC9A96E);

  @override
  void initState() {
    super.initState();
    _focusNode.requestFocus();
  }

  @override
  void dispose() {
    _searchController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  Future<void> _pesquisar() async {
    if (_query.trim().isEmpty) return;
    setState(() => _isSearching = true);

    await Future.delayed(const Duration(milliseconds: 800));

    setState(() {
      _isSearching = false;
      _results = _mockResults();
    });
  }

  List<Map<String, dynamic>> _mockResults() {
    return [
      {
        'referencia': 'João 3:16',
        'texto': 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...',
        'livro': 'João',
        'traducoes': ['NVI', 'ACF', 'KJV'],
      },
      {
        'referencia': 'Romanos 8:28',
        'texto': 'E sabemos que todas as coisas contribuem juntamente para o bem...',
        'livro': 'Romanos',
        'traducoes': ['NVI', 'ACF'],
      },
      {
        'referencia': 'Filipenses 4:13',
        'texto': 'Posso todas as coisas naquele que me fortalece.',
        'livro': 'Filipenses',
        'traducoes': ['NVI', 'ACF', 'KJV'],
      },
    ];
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A14) : const Color(0xFFF8F6F0);
    final card = isDark ? const Color(0xFF1A1A2E) : Colors.white;
    final surface = isDark ? const Color(0xFF12121E) : const Color(0xFFF0EDE6);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A2E);
    final textSecondary = isDark ? Colors.white54 : const Color(0xFF6B7280);

    return Scaffold(
      backgroundColor: bg,
      appBar: AppBar(
        backgroundColor: surface,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded, color: textSecondary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Pesquisa Bíblica',
          style: GoogleFonts.merriweather(
            color: textPrimary,
            fontSize: 17,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            color: surface,
            child: Container(
              decoration: BoxDecoration(
                color: card,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: _query.isNotEmpty
                      ? _accent.withOpacity(0.4)
                      : Colors.grey.withOpacity(0.2),
                ),
              ),
              child: TextField(
                controller: _searchController,
                focusNode: _focusNode,
                style: TextStyle(color: textPrimary, fontSize: 15),
                textInputAction: TextInputAction.search,
                onSubmitted: (_) => _pesquisar(),
                onChanged: (v) => setState(() => _query = v),
                decoration: InputDecoration(
                  hintText: 'Buscar versículos, palavras, temas...',
                  hintStyle: TextStyle(color: textSecondary.withOpacity(0.6)),
                  prefixIcon: Icon(
                    Icons.search_rounded,
                    color: _query.isNotEmpty ? _accent : textSecondary,
                    size: 22,
                  ),
                  suffixIcon: _query.isNotEmpty
                      ? IconButton(
                          icon: Icon(Icons.close_rounded, color: textSecondary, size: 20),
                          onPressed: () {
                            _searchController.clear();
                            setState(() {
                              _query = '';
                              _results = [];
                            });
                          },
                        )
                      : null,
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
              ),
            ),
          ),
          if (_query.isNotEmpty && !_isSearching && _results.isEmpty)
            Padding(
              padding: const EdgeInsets.all(40),
              child: Column(
                children: [
                  Icon(Icons.search_off_rounded, size: 64, color: textSecondary.withOpacity(0.3)),
                  const SizedBox(height: 16),
                  Text(
                    'Nenhum resultado encontrado',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Tente buscar com outros termos',
                    style: TextStyle(fontSize: 14, color: textSecondary),
                  ),
                ],
              ),
            )
          else if (_isSearching)
            const Expanded(
              child: Center(
                child: CircularProgressIndicator(color: _accent, strokeWidth: 2),
              ),
            )
          else if (_results.isNotEmpty)
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: _results.length,
                itemBuilder: (context, index) {
                  final r = _results[index];
                  return _buildResultCard(r, card, textPrimary, textSecondary);
                },
              ),
            )
          else
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'SUGESTÕES DE BUSCA',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: textSecondary,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildSuggestionChip('Graça', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Salvação', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Amor', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Fé', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Reino de Deus', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Promessas', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Oração', card, textPrimary, textSecondary),
                    _buildSuggestionChip('Liberdade', card, textPrimary, textSecondary),
                    const SizedBox(height: 32),
                    Text(
                      'TRADUÇÕES DISPONÍVEIS',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: textSecondary,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildTranslationInfo('NVI', 'Nova Versão Internacional', card, textPrimary),
                    _buildTranslationInfo('ACF', 'Almeida Corrigida Fiel', card, textPrimary),
                    _buildTranslationInfo('KJV', 'King James Version', card, textPrimary),
                    _buildTranslationInfo('NAA', 'Nova Almeida Atualizada', card, textPrimary),
                    _buildTranslationInfo('TB', 'Tradução Brasileira', card, textPrimary),
                    _buildTranslationInfo('WEB', 'World English Bible', card, textPrimary),
                    _buildTranslationInfo('ARC', 'Actualizada Revisão Corrigida', card, textPrimary),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildResultCard(
    Map<String, dynamic> r,
    Color card,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: _accent.withOpacity(0.1)),
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(14),
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: () {},
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: _accent.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        r['referencia'],
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: _accent,
                        ),
                      ),
                    ),
                    const Spacer(),
                    Icon(Icons.chevron_right_rounded, color: textSecondary, size: 20),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  r['texto'],
                  style: TextStyle(
                    fontFamily: 'serif',
                    fontSize: 15,
                    color: textPrimary,
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    ...((r['traducoes'] as List).map((t) => Padding(
                          padding: const EdgeInsets.only(right: 6),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.grey.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              t,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.w600,
                                color: textSecondary,
                              ),
                            ),
                          ),
                        ))),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSuggestionChip(
    String label,
    Color card,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: card,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () {
            _searchController.text = label;
            setState(() => _query = label);
            _pesquisar();
          },
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                Icon(Icons.search_rounded, color: _accent, size: 18),
                const SizedBox(width: 12),
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: textPrimary,
                  ),
                ),
                const Spacer(),
                Icon(Icons.arrow_forward_ios_rounded, color: textSecondary, size: 14),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTranslationInfo(
    String abbr,
    String name,
    Color card,
    Color textPrimary,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: _accent.withOpacity(0.12),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Text(
                abbr,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                  color: _accent,
                ),
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Text(
              name,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: textPrimary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
