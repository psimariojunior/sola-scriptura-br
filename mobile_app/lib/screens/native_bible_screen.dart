import 'package:flutter/material.dart';
import '../config/theme.dart';

class BibleBook {
  final int number;
  final String name;
  final String abbreviation;
  final int chapters;
  final String testament;

  const BibleBook({
    required this.number,
    required this.name,
    required this.abbreviation,
    required this.chapters,
    required this.testament,
  });
}

class NativeBibleScreen extends StatefulWidget {
  final Function(String translation, int book, int chapter) onChapterSelected;

  const NativeBibleScreen({super.key, required this.onChapterSelected});

  @override
  State<NativeBibleScreen> createState() => _NativeBibleScreenState();
}

class _NativeBibleScreenState extends State<NativeBibleScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedTranslation = 'ARC';
  int? _selectedBook;

  static const List<BibleBook> _oldTestament = [
    BibleBook(number: 1, name: 'Gênesis', abbreviation: 'Gn', chapters: 50, testament: 'AT'),
    BibleBook(number: 2, name: 'Êxodo', abbreviation: 'Ex', chapters: 40, testament: 'AT'),
    BibleBook(number: 3, name: 'Levítico', abbreviation: 'Lv', chapters: 27, testament: 'AT'),
    BibleBook(number: 4, name: 'Números', abbreviation: 'Nm', chapters: 36, testament: 'AT'),
    BibleBook(number: 5, name: 'Deuteronômio', abbreviation: 'Dt', chapters: 34, testament: 'AT'),
    BibleBook(number: 6, name: 'Josué', abbreviation: 'Js', chapters: 24, testament: 'AT'),
    BibleBook(number: 7, name: 'Juízes', abbreviation: 'Jz', chapters: 21, testament: 'AT'),
    BibleBook(number: 8, name: 'Rute', abbreviation: 'Rt', chapters: 4, testament: 'AT'),
    BibleBook(number: 9, name: '1 Samuel', abbreviation: '1Sm', chapters: 31, testament: 'AT'),
    BibleBook(number: 10, name: '2 Samuel', abbreviation: '2Sm', chapters: 24, testament: 'AT'),
    BibleBook(number: 11, name: '1 Reis', abbreviation: '1Rs', chapters: 22, testament: 'AT'),
    BibleBook(number: 12, name: '2 Reis', abbreviation: '2Rs', chapters: 25, testament: 'AT'),
    BibleBook(number: 13, name: '1 Crônicas', abbreviation: '1Cr', chapters: 29, testament: 'AT'),
    BibleBook(number: 14, name: '2 Crônicas', abbreviation: '2Cr', chapters: 36, testament: 'AT'),
    BibleBook(number: 15, name: 'Esdras', abbreviation: 'Ed', chapters: 10, testament: 'AT'),
    BibleBook(number: 16, name: 'Neemias', abbreviation: 'Ne', chapters: 13, testament: 'AT'),
    BibleBook(number: 17, name: 'Ester', abbreviation: 'Et', chapters: 10, testament: 'AT'),
    BibleBook(number: 18, name: 'Jó', abbreviation: 'Jó', chapters: 42, testament: 'AT'),
    BibleBook(number: 19, name: 'Salmos', abbreviation: 'Sl', chapters: 150, testament: 'AT'),
    BibleBook(number: 20, name: 'Provérbios', abbreviation: 'Pv', chapters: 31, testament: 'AT'),
    BibleBook(number: 21, name: 'Eclesiastes', abbreviation: 'Ec', chapters: 12, testament: 'AT'),
    BibleBook(number: 22, name: 'Cânticos', abbreviation: 'Ct', chapters: 8, testament: 'AT'),
    BibleBook(number: 23, name: 'Isaías', abbreviation: 'Is', chapters: 66, testament: 'AT'),
    BibleBook(number: 24, name: 'Jeremias', abbreviation: 'Jr', chapters: 52, testament: 'AT'),
    BibleBook(number: 25, name: 'Lamentações', abbreviation: 'Lm', chapters: 5, testament: 'AT'),
    BibleBook(number: 26, name: 'Ezequiel', abbreviation: 'Ez', chapters: 48, testament: 'AT'),
    BibleBook(number: 27, name: 'Daniel', abbreviation: 'Dn', chapters: 12, testament: 'AT'),
    BibleBook(number: 28, name: 'Oséias', abbreviation: 'Os', chapters: 14, testament: 'AT'),
    BibleBook(number: 29, name: 'Joel', abbreviation: 'Jl', chapters: 3, testament: 'AT'),
    BibleBook(number: 30, name: 'Amós', abbreviation: 'Am', chapters: 9, testament: 'AT'),
    BibleBook(number: 31, name: 'Obadias', abbreviation: 'Ob', chapters: 1, testament: 'AT'),
    BibleBook(number: 32, name: 'Jonas', abbreviation: 'Jn', chapters: 4, testament: 'AT'),
    BibleBook(number: 33, name: 'Miquéias', abbreviation: 'Mq', chapters: 7, testament: 'AT'),
    BibleBook(number: 34, name: 'Naum', abbreviation: 'Na', chapters: 3, testament: 'AT'),
    BibleBook(number: 35, name: 'Habacuque', abbreviation: 'Hb', chapters: 3, testament: 'AT'),
    BibleBook(number: 36, name: 'Sofonias', abbreviation: 'Sf', chapters: 3, testament: 'AT'),
    BibleBook(number: 37, name: 'Ageu', abbreviation: 'Ag', chapters: 2, testament: 'AT'),
    BibleBook(number: 38, name: 'Zacarias', abbreviation: 'Zc', chapters: 14, testament: 'AT'),
    BibleBook(number: 39, name: 'Malaquias', abbreviation: 'Ml', chapters: 4, testament: 'AT'),
  ];

  static const List<BibleBook> _newTestament = [
    BibleBook(number: 40, name: 'Mateus', abbreviation: 'Mt', chapters: 28, testament: 'NT'),
    BibleBook(number: 41, name: 'Marcos', abbreviation: 'Mc', chapters: 16, testament: 'NT'),
    BibleBook(number: 42, name: 'Lucas', abbreviation: 'Lc', chapters: 24, testament: 'NT'),
    BibleBook(number: 43, name: 'João', abbreviation: 'Jo', chapters: 21, testament: 'NT'),
    BibleBook(number: 44, name: 'Atos', abbreviation: 'At', chapters: 28, testament: 'NT'),
    BibleBook(number: 45, name: 'Romanos', abbreviation: 'Rm', chapters: 16, testament: 'NT'),
    BibleBook(number: 46, name: '1 Coríntios', abbreviation: '1Co', chapters: 16, testament: 'NT'),
    BibleBook(number: 47, name: '2 Coríntios', abbreviation: '2Co', chapters: 13, testament: 'NT'),
    BibleBook(number: 48, name: 'Gálatas', abbreviation: 'Gl', chapters: 6, testament: 'NT'),
    BibleBook(number: 49, name: 'Efésios', abbreviation: 'Ef', chapters: 6, testament: 'NT'),
    BibleBook(number: 50, name: 'Filipenses', abbreviation: 'Fp', chapters: 4, testament: 'NT'),
    BibleBook(number: 51, name: 'Colossenses', abbreviation: 'Cl', chapters: 4, testament: 'NT'),
    BibleBook(number: 52, name: '1 Tessalonicenses', abbreviation: '1Ts', chapters: 5, testament: 'NT'),
    BibleBook(number: 53, name: '2 Tessalonicenses', abbreviation: '2Ts', chapters: 3, testament: 'NT'),
    BibleBook(number: 54, name: '1 Timóteo', abbreviation: '1Tm', chapters: 6, testament: 'NT'),
    BibleBook(number: 55, name: '2 Timóteo', abbreviation: '2Tm', chapters: 4, testament: 'NT'),
    BibleBook(number: 56, name: 'Tito', abbreviation: 'Tt', chapters: 3, testament: 'NT'),
    BibleBook(number: 57, name: 'Filemom', abbreviation: 'Fm', chapters: 1, testament: 'NT'),
    BibleBook(number: 58, name: 'Hebreus', abbreviation: 'Hb', chapters: 13, testament: 'NT'),
    BibleBook(number: 59, name: 'Tiago', abbreviation: 'Tg', chapters: 5, testament: 'NT'),
    BibleBook(number: 60, name: '1 Pedro', abbreviation: '1Pd', chapters: 5, testament: 'NT'),
    BibleBook(number: 61, name: '2 Pedro', abbreviation: '2Pd', chapters: 3, testament: 'NT'),
    BibleBook(number: 62, name: '1 João', abbreviation: '1Jo', chapters: 5, testament: 'NT'),
    BibleBook(number: 63, name: '2 João', abbreviation: '2Jo', chapters: 1, testament: 'NT'),
    BibleBook(number: 64, name: '3 João', abbreviation: '3Jo', chapters: 1, testament: 'NT'),
    BibleBook(number: 65, name: 'Judas', abbreviation: 'Jd', chapters: 1, testament: 'NT'),
    BibleBook(number: 66, name: 'Apocalipse', abbreviation: 'Ap', chapters: 22, testament: 'NT'),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      body: Column(
        children: [
          _buildHeader(),
          _buildTranslationSelector(),
          _buildTabBar(),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildBookList(_oldTestament),
                _buildBookList(_newTestament),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
      child: const Row(
        children: [
          Icon(Icons.menu_book_rounded, color: AppTheme.goldPrimary, size: 24),
          SizedBox(width: 10),
          Text(
            'Bíblia',
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTranslationSelector() {
    final translations = ['ARC', 'ARA', 'ACF', 'KJV', 'NVI', 'WEB'];
    return Container(
      height: 40,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: translations.length,
        itemBuilder: (context, index) {
          final t = translations[index];
          final isSelected = t == _selectedTranslation;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(t),
              selected: isSelected,
              selectedColor: AppTheme.goldPrimary,
              backgroundColor: Colors.white.withValues(alpha: 0.08),
              labelStyle: TextStyle(
                color: isSelected ? Colors.white : AppTheme.textSecondary,
                fontSize: 13,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
              onSelected: (selected) {
                setState(() => _selectedTranslation = t);
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(10),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          color: AppTheme.goldPrimary,
          borderRadius: BorderRadius.circular(10),
        ),
        indicatorSize: TabBarIndicatorSize.tab,
        dividerColor: Colors.transparent,
        labelColor: Colors.white,
        unselectedLabelColor: AppTheme.textMuted,
        labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
        unselectedLabelStyle: const TextStyle(fontSize: 14),
        tabs: const [
          Tab(text: 'Antigo Testamento'),
          Tab(text: 'Novo Testamento'),
        ],
      ),
    );
  }

  Widget _buildBookList(List<BibleBook> books) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: books.length,
      itemBuilder: (context, index) {
        final book = books[index];
        return _buildBookTile(book);
      },
    );
  }

  Widget _buildBookTile(BibleBook book) {
    final isSelected = _selectedBook == book.number;
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      margin: const EdgeInsets.only(bottom: 4),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            if (_selectedBook == book.number) {
              setState(() => _selectedBook = null);
            } else {
              setState(() => _selectedBook = book.number);
            }
          },
          borderRadius: BorderRadius.circular(10),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            decoration: BoxDecoration(
              color: isSelected
                  ? AppTheme.goldPrimary.withValues(alpha: 0.1)
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(10),
              border: isSelected
                  ? Border.all(color: AppTheme.goldPrimary.withValues(alpha: 0.3))
                  : null,
            ),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: isSelected
                        ? AppTheme.goldPrimary.withValues(alpha: 0.2)
                        : Colors.white.withValues(alpha: 0.05),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      book.abbreviation,
                      style: TextStyle(
                        color: isSelected ? AppTheme.goldPrimary : AppTheme.textSecondary,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        book.name,
                        style: TextStyle(
                          color: isSelected ? Colors.white : AppTheme.textPrimary,
                          fontSize: 15,
                          fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                        ),
                      ),
                      Text(
                        '${book.chapters} capítulos',
                        style: TextStyle(
                          color: AppTheme.textMuted,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  isSelected ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_right,
                  color: isSelected ? AppTheme.goldPrimary : AppTheme.textMuted,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
