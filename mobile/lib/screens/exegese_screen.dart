import 'package:flutter/material.dart';
import '../models/biblia_models.dart';
import '../services/api_service.dart';

class ExegeseScreen extends StatefulWidget {
  const ExegeseScreen({super.key});

  @override
  State<ExegeseScreen> createState() => _ExegeseScreenState();
}

class _ExegeseScreenState extends State<ExegeseScreen>
    with SingleTickerProviderStateMixin {
  final ApiService _api = apiService;

  static const Color _bgDark = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);

  late TabController _tabController;

  bool _carregando = true;
  String? _erro;

  List<Testamento> _testamentos = [];
  List<Livro> _livros = [];
  List<int> _capitulos = [];
  List<Versiculo> _versiculos = [];

  Testamento? _testamentoSel;
  Livro? _livroSel;
  int? _capSel;
  int? _versSel;

  List<Versiculo> _versiculos3Traducoes = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _carregarTestamentos();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _carregarTestamentos() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      final dados = await _api.getTestamentos();
      setState(() {
        _testamentos = dados;
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  Future<void> _carregarLivros(Testamento t) async {
    setState(() {
      _carregando = true;
      _erro = null;
      _testamentoSel = t;
      _livroSel = null;
      _capSel = null;
      _versSel = null;
    });
    try {
      final dados = await _api.getLivros(testamentoId: t.id);
      setState(() {
        _livros = dados;
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  Future<void> _carregarCapitulos(Livro livro) async {
    setState(() {
      _carregando = true;
      _erro = null;
      _livroSel = livro;
      _capSel = null;
      _versSel = null;
    });
    try {
      final caps = await _api.getCapitulos(livro.id);
      setState(() {
        _capitulos = caps.map((c) => c.numero).toList();
        if (_capitulos.isEmpty && livro.capitulos != null) {
          _capitulos = List<int>.generate(livro.capitulos!, (i) => i + 1);
        }
        _carregando = false;
      });
    } catch (e) {
      final total = livro.capitulos ?? 0;
      setState(() {
        _capitulos = List<int>.generate(total, (i) => i + 1);
        _carregando = false;
      });
    }
  }

  Future<void> _carregarVersiculos(int capitulo) async {
    if (_livroSel == null) return;
    setState(() {
      _carregando = true;
      _erro = null;
      _capSel = capitulo;
      _versSel = null;
    });
    try {
      final dados = await _api.getVersiculos(_livroSel!.id, capitulo);
      setState(() {
        _versiculos = dados;
        _versiculos3Traducoes = dados;
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  void _selecionarVersiculo(Versiculo v) {
    setState(() => _versSel = v.numero);
  }

  bool get _mostrandoNavegador =>
      _testamentoSel == null ||
      _livroSel == null ||
      _capSel == null ||
      _versiculos.isEmpty;

  String get _titulo {
    if (_versSel != null) {
      return '${_livroSel?.nome ?? ''} ${_capSel}:$_versSel';
    }
    if (_capSel != null) return '${_livroSel?.nome ?? ''} $_capSel';
    if (_livroSel != null) return _livroSel!.nome;
    if (_testamentoSel != null) return _testamentoSel!.nome;
    return 'Exegese Bíblica';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bgDark,
      appBar: AppBar(
        backgroundColor: _surface,
        centerTitle: true,
        title: Text(
          _titulo,
          style: const TextStyle(
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
      body: _carregando
          ? const Center(
              child: CircularProgressIndicator(color: _accent, strokeWidth: 2))
          : _erro != null
              ? _buildErro()
              : _mostrandoNavegador
                  ? _buildNavegador()
                  : _buildExegese(),
    );
  }

  Widget _buildErro() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.cloud_off_rounded, size: 48, color: Colors.white38),
          const SizedBox(height: 12),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Text(
              _erro!,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withOpacity(0.6),
              ),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _carregarTestamentos,
            style: ElevatedButton.styleFrom(backgroundColor: _accent),
            child: const Text('Tentar novamente'),
          ),
        ],
      ),
    );
  }

  Widget _buildNavegador() {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        if (_testamentoSel == null) ...[
          _buildSectionTitle('Selecione o Testamento'),
          const SizedBox(height: 12),
          ..._testamentos.map((t) => _buildOptionTile(
                icon: Icons.menu_book_rounded,
                title: t.nome,
                subtitle: t.abreviacao ?? '',
                onTap: () => _carregarLivros(t),
              )),
        ] else if (_livroSel == null) ...[
          _buildSectionTitle('Selecione o Livro'),
          const SizedBox(height: 12),
          ..._livros.map((l) => _buildOptionTile(
                icon: Icons.article_outlined,
                title: l.nome,
                subtitle: l.abreviacao ?? '',
                onTap: () => _carregarCapitulos(l),
              )),
        ] else if (_capSel == null) ...[
          _buildSectionTitle('Selecione o Capítulo'),
          const SizedBox(height: 12),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 5,
              childAspectRatio: 1,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
            ),
            itemCount: _capitulos.length,
            itemBuilder: (context, i) {
              final n = _capitulos[i];
              return InkWell(
                onTap: () => _carregarVersiculos(n),
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: _surface,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.white.withOpacity(0.08)),
                  ),
                  child: Text(
                    '$n',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              );
            },
          ),
        ] else ...[
          _buildSectionTitle('Selecione o Versículo'),
          const SizedBox(height: 12),
          ..._versiculos.map((v) => _buildOptionTile(
                icon: Icons.format_quote_rounded,
                title: 'Versículo ${v.numero}',
                subtitle: v.texto.length > 60
                    ? '${v.texto.substring(0, 60)}...'
                    : v.texto,
                onTap: () => _selecionarVersiculo(v),
              )),
        ],
      ],
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title.toUpperCase(),
      style: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w700,
        color: Colors.white38,
        letterSpacing: 1.5,
      ),
    );
  }

  Widget _buildOptionTile({
    required IconData icon,
    required String title,
    String? subtitle,
    required VoidCallback onTap,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: _surface,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Row(
              children: [
                Icon(icon, color: _accent, size: 22),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                      if (subtitle != null && subtitle.isNotEmpty) ...[
                        const SizedBox(height: 2),
                        Text(
                          subtitle,
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.white.withOpacity(0.4),
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ],
                  ),
                ),
                Icon(
                  Icons.chevron_right_rounded,
                  color: Colors.white.withOpacity(0.3),
                  size: 20,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildExegese() {
    final versoAtual = _versiculos.firstWhere(
      (v) => v.numero == _versSel,
      orElse: () => _versiculos.first,
    );

    return Column(
      children: [
        Container(
          color: _surface,
          child: TabBar(
            controller: _tabController,
            indicatorColor: _accent,
            indicatorWeight: 3,
            labelColor: _accent,
            unselectedLabelColor: Colors.white.withOpacity(0.4),
            labelStyle: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
            ),
            tabs: const [
              Tab(text: 'Texto'),
              Tab(text: 'Contexto'),
              Tab(text: 'Palavras'),
            ],
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              _buildTabTexto(versoAtual),
              _buildTabContexto(),
              _buildTabPalavras(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTabTexto(Versiculo versoAtual) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Referência'),
          const SizedBox(height: 8),
          Text(
            '${_livroSel?.nome ?? ''} ${_capSel}:${_versSel}',
            style: const TextStyle(
              fontFamily: 'serif',
              fontSize: 22,
              fontWeight: FontWeight.w700,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 20),
          _buildSectionTitle('Texto Bíblico — 3 Traduções'),
          const SizedBox(height: 12),
          _buildTranslationCard(
            'NVI',
            versoAtual.texto,
            const Color(0xFFC9A96E),
          ),
          const SizedBox(height: 10),
          _buildTranslationCard(
            'ACF',
            versoAtual.texto,
            const Color(0xFF4A6FA5),
          ),
          const SizedBox(height: 10),
          _buildTranslationCard(
            'KJV',
            versoAtual.texto,
            const Color(0xFF5D8A5D),
          ),
          const SizedBox(height: 20),
          _buildSectionTitle('Versículos Anteriores'),
          const SizedBox(height: 8),
          ..._versiculos
              .where((v) => v.numero < (_versSel ?? 0))
              .take(3)
              .map((v) => Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Text(
                      '${v.numero}. ${v.texto}',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.white.withOpacity(0.5),
                        height: 1.5,
                      ),
                    ),
                  )),
        ],
      ),
    );
  }

  Widget _buildTranslationCard(String traducao, String texto, Color color) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.15)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  traducao,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: color,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            texto,
            style: const TextStyle(
              fontFamily: 'serif',
              fontSize: 15,
              color: Colors.white,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabContexto() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Contexto Histórico'),
          const SizedBox(height: 12),
          _buildInfoCard(
            icon: Icons.history_edu_rounded,
            title: 'Período',
            value: 'Primeiro Século',
            color: const Color(0xFFC9A96E),
          ),
          const SizedBox(height: 10),
          _buildInfoCard(
            icon: Icons.language_rounded,
            title: 'Localização',
            value: 'Judeia e Galileia',
            color: const Color(0xFF4A6FA5),
          ),
          const SizedBox(height: 20),
          _buildSectionTitle('Gênero Literário'),
          const SizedBox(height: 12),
          _buildInfoCard(
            icon: Icons.auto_stories_rounded,
            title: 'Tipo',
            value: 'Narrativa / Ensino',
            color: const Color(0xFF5D8A5D),
          ),
          const SizedBox(height: 20),
          _buildSectionTitle('Autor e Data'),
          const SizedBox(height: 12),
          _buildInfoCard(
            icon: Icons.person_outline_rounded,
            title: 'Autor',
            value: 'João',
            color: const Color(0xFFE07A4A),
          ),
          const SizedBox(height: 10),
          _buildInfoCard(
            icon: Icons.calendar_today_rounded,
            title: 'Data',
            value: 'c. 90-100 d.C.',
            color: const Color(0xFF8B5A3C),
          ),
          const SizedBox(height: 20),
          _buildSectionTitle('Observações'),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: _surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white.withOpacity(0.06)),
            ),
            child: Text(
              'Esta passagem faz parte do Evangelho de João, escrito em Éfeso por volta de 90-100 d.C. O autor testemunhou pessoalmente os eventos descritos.',
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withOpacity(0.6),
                height: 1.6,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoCard({
    required IconData icon,
    required String title,
    required String value,
    required Color color,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.1)),
      ),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: color.withOpacity(0.12),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: color, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 11,
                    color: Colors.white.withOpacity(0.4),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabPalavras() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Palavras Originais'),
          const SizedBox(height: 12),
          _buildPalavraCard(
            palavra: 'λόγος',
            transliteracao: 'logos',
            strong: 'G3056',
            significado: 'Palavra, razão, princípio',
            definicao:
                'No contexto joanino, refere-se ao Verbo divino, a segunda pessoa da Trindade.',
            cor: const Color(0xFFC9A96E),
          ),
          const SizedBox(height: 10),
          _buildPalavraCard(
            palavra: 'θεός',
            transliteracao: 'theos',
            strong: 'G2316',
            significado: 'Deus, divindade',
            definicao:
              'Título de Deus, usado here para afirmar a natureza divina de Cristo.',
            cor: const Color(0xFF4A6FA5),
          ),
          const SizedBox(height: 10),
          _buildPalavraCard(
            palavra: 'πιστεύω',
            transliteracao: 'pisteuō',
            strong: 'G4100',
            significado: 'Crer, confiar, ter fé',
            definicao:
              'Verbo que indica fé ativa e confiança pessoal, não apenas concordância intelectual.',
            cor: const Color(0xFF5D8A5D),
          ),
          const SizedBox(height: 10),
          _buildPalavraCard(
            palavra: 'ζωή',
            transliteracao: 'zōē',
            strong: 'G2222',
            significado: 'Vida, vida eterna',
            definicao:
              'Vida no sentido pleno — existência divina, qualidade de vida eterna.',
            cor: const Color(0xFFE07A4A),
          ),
          const SizedBox(height: 10),
          _buildPalavraCard(
            palavra: 'ἀγαπάω',
            transliteracao: 'agapaō',
            strong: 'G25',
            significado: 'Amar (amor sacrificial)',
            definicao:
              'O verbo mais usado para descrever o amor divino — amor incondicional e sacrificial.',
            cor: const Color(0xFFD4A574),
          ),
        ],
      ),
    );
  }

  Widget _buildPalavraCard({
    required String palavra,
    required String transliteracao,
    required String strong,
    required String significado,
    required String definicao,
    required Color cor,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cor.withOpacity(0.15)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                palavra,
                style: TextStyle(
                  fontFamily: 'serif',
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: cor,
                ),
              ),
              const SizedBox(width: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: cor.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  strong,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: cor,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            '$transliteracao — $significado',
            style: TextStyle(
              fontSize: 13,
              color: Colors.white.withOpacity(0.6),
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            definicao,
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withOpacity(0.7),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
