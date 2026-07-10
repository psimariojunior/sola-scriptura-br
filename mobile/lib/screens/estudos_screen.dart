import 'package:flutter/material.dart';

class EstudosScreen extends StatefulWidget {
  const EstudosScreen({super.key});

  @override
  State<EstudosScreen> createState() => _EstudosScreenState();
}

class _EstudosScreenState extends State<EstudosScreen>
    with SingleTickerProviderStateMixin {
  static const Color _bgDark = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);
  static const Color _error = Color(0xFFEF4444);

  late AnimationController _animController;
  late Animation<double> _fadeAnim;

  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedFilter = 'Todos';

  List<_Estudo> _estudos = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _fadeAnim = CurvedAnimation(
      parent: _animController,
      curve: Curves.easeOut,
    );
    _carregarEstudos();
  }

  @override
  void dispose() {
    _animController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _carregarEstudos() {
    setState(() => _isLoading = true);
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() {
          _estudos = _mockEstudos();
          _isLoading = false;
        });
        _animController.forward();
      }
    });
  }

  List<_Estudo> _mockEstudos() {
    return [
      _Estudo(
        id: 1,
        titulo: 'Estudo sobre Romanos',
        descricao: 'Análise dos capítulos 8-12',
        referencia: 'Romanos 8-12',
        ultimaLeitura: DateTime.now().subtract(const Duration(hours: 2)),
        progresso: 0.65,
        totalVersiculos: 120,
        versiculosLidos: 78,
        cor: _accent,
        favorito: true,
      ),
      _Estudo(
        id: 2,
        titulo: 'Parábolas de Jesus',
        descricao: 'Todas as parábolas dos Evangelhos',
        referencia: 'Mateus 13 / Lucas 15',
        ultimaLeitura: DateTime.now().subtract(const Duration(days: 1)),
        progresso: 0.42,
        totalVersiculos: 85,
        versiculosLidos: 36,
        cor: const Color(0xFF4A6FA5),
        favorito: false,
      ),
      _Estudo(
        id: 3,
        titulo: 'Gênesis - Criação',
        descricao: 'Os sete dias da criação',
        referencia: 'Gênesis 1-2',
        ultimaLeitura: DateTime.now().subtract(const Duration(days: 3)),
        progresso: 1.0,
        totalVersiculos: 67,
        versiculosLidos: 67,
        cor: const Color(0xFF5D8A5D),
        favorito: true,
      ),
      _Estudo(
        id: 4,
        titulo: 'Salmos de Louvor',
        descricao: 'Seleção de salmos de adoração',
        referencia: 'Salmos 100-150',
        ultimaLeitura: DateTime.now().subtract(const Duration(days: 7)),
        progresso: 0.23,
        totalVersiculos: 200,
        versiculosLidos: 46,
        cor: const Color(0xFF8B5A3C),
        favorito: false,
      ),
    ];
  }

  List<_Estudo> get _estudosFiltrados {
    return _estudos.where((e) {
      final busca = _searchQuery.toLowerCase();
      final titulo = e.titulo.toLowerCase().contains(busca);
      final ref = e.referencia.toLowerCase().contains(busca);
      final desc = e.descricao.toLowerCase().contains(busca);
      final filtro = _selectedFilter == 'Todos' ||
          (_selectedFilter == 'Favoritos' && e.favorito) ||
          (_selectedFilter == 'Concluídos' && e.progresso >= 1.0) ||
          (_selectedFilter == 'Em andamento' && e.progresso < 1.0);
      return (titulo || ref || desc) && filtro;
    }).toList();
  }

  int get _totalEstudos => _estudos.length;
  int get _estudosConcluidos =>
      _estudos.where((e) => e.progresso >= 1.0).length;
  int get _totalVersiculos =>
      _estudos.fold(0, (s, e) => s + e.versiculosLidos);
  int get _diasSequencia => 12;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bgDark,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            _buildHeader(),
            _buildStatsSection(),
            _buildSearchBar(),
            _buildFilterChips(),
            if (_isLoading)
              const SliverFillRemaining(
                child: Center(
                  child: CircularProgressIndicator(
                    color: _accent,
                    strokeWidth: 2,
                  ),
                ),
              )
            else if (_estudosFiltrados.isEmpty)
              SliverFillRemaining(child: _buildEmptyState())
            else
              _buildStudiesList(),
          ],
        ),
      ),
      floatingActionButton: _buildFab(),
    );
  }

  Widget _buildHeader() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Meus Estudos',
                    style: TextStyle(
                      fontFamily: 'serif',
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Continue sua jornada de estudo',
                    style: TextStyle(
                      fontFamily: 'serif',
                      fontSize: 14,
                      color: Colors.white.withOpacity(0.5),
                    ),
                  ),
                ],
              ),
            ),
            _buildNovoEstudoButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildNovoEstudoButton() {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [_accent, Color(0xFFB8945F)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: _accent.withOpacity(0.3),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => _showSnackBar('Criar novo estudo'),
          child: const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.add_rounded, color: Colors.white, size: 20),
                SizedBox(width: 6),
                Text(
                  'Novo Estudo',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStatsSection() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
        child: Row(
          children: [
            _buildStatCard(
              icon: Icons.menu_book_rounded,
              value: '$_totalEstudos',
              label: 'Estudos',
              color: _accent,
            ),
            const SizedBox(width: 12),
            _buildStatCard(
              icon: Icons.check_circle_rounded,
              value: '$_estudosConcluidos',
              label: 'Concluídos',
              color: const Color(0xFF5D8A5D),
            ),
            const SizedBox(width: 12),
            _buildStatCard(
              icon: Icons.article_rounded,
              value: '$_totalVersiculos',
              label: 'Versículos',
              color: const Color(0xFF4A6FA5),
            ),
            const SizedBox(width: 12),
            _buildStatCard(
              icon: Icons.local_fire_department_rounded,
              value: '$_diasSequencia',
              label: 'Sequência',
              color: const Color(0xFFE07A4A),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard({
    required IconData icon,
    required String value,
    required String label,
    required Color color,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
        decoration: BoxDecoration(
          color: _surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.15)),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(height: 10),
            Text(
              value,
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 20,
                fontWeight: FontWeight.w700,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                color: Colors.white.withOpacity(0.5),
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchBar() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
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
              hintText: 'Buscar estudos...',
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

  Widget _buildFilterChips() {
    final filters = ['Todos', 'Favoritos', 'Em andamento', 'Concluídos'];
    return SliverToBoxAdapter(
      child: SizedBox(
        height: 52,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          itemCount: filters.length,
          separatorBuilder: (_, __) => const SizedBox(width: 8),
          itemBuilder: (context, i) {
            final selected = _selectedFilter == filters[i];
            return AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              curve: Curves.easeOut,
              child: FilterChip(
                label: Text(filters[i]),
                selected: selected,
                onSelected: (_) =>
                    setState(() => _selectedFilter = filters[i]),
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

  Widget _buildStudiesList() {
    return SliverPadding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 100),
      sliver: SliverList.separated(
        itemCount: _estudosFiltrados.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, i) {
          final estudo = _estudosFiltrados[i];
          return FadeTransition(
            opacity: _fadeAnim,
            child: _buildStudyCard(estudo, i),
          );
        },
      ),
    );
  }

  Widget _buildStudyCard(_Estudo estudo, int index) {
    final progressColor =
        estudo.progresso >= 1.0 ? const Color(0xFF5D8A5D) : _accent;
    final timeAgo = _formatTimeAgo(estudo.ultimaLeitura);

    return Dismissible(
      key: ValueKey(estudo.id),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 24),
        decoration: BoxDecoration(
          color: _error.withOpacity(0.15),
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Icon(Icons.delete_rounded, color: _error, size: 26),
      ),
      confirmDismiss: (_) => _showDeleteDialog(estudo),
      child: Container(
        decoration: BoxDecoration(
          color: _card,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withOpacity(0.04)),
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () => _showSnackBar('Abrir: ${estudo.titulo}'),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: estudo.cor.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          Icons.menu_book_rounded,
                          color: estudo.cor,
                          size: 22,
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    estudo.titulo,
                                    style: const TextStyle(
                                      fontFamily: 'serif',
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.white,
                                    ),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                if (estudo.favorito)
                                  Icon(
                                    Icons.star_rounded,
                                    color: _accent,
                                    size: 18,
                                  ),
                              ],
                            ),
                            const SizedBox(height: 3),
                            Text(
                              estudo.descricao,
                              style: TextStyle(
                                fontSize: 13,
                                color: Colors.white.withOpacity(0.4),
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      PopupMenuButton<String>(
                        icon: Icon(
                          Icons.more_vert_rounded,
                          color: Colors.white.withOpacity(0.3),
                          size: 20,
                        ),
                        color: _surface,
                        surfaceTintColor: Colors.transparent,
                        onSelected: (v) => _handleMenuAction(v, estudo),
                        itemBuilder: (_) => [
                          _menuItem('editar', 'Editar', Icons.edit_rounded),
                          _menuItem(
                              'favorito',
                              estudo.favorito
                                  ? 'Remover favorito'
                                  : 'Favoritar',
                              estudo.favorito
                                  ? Icons.star_rounded
                                  : Icons.star_border_rounded),
                          _menuItem('compartilhar', 'Compartilhar',
                              Icons.share_rounded),
                          _menuItem('excluir', 'Excluir', Icons.delete_rounded,
                              color: _error),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      Icon(
                        Icons.menu_book_rounded,
                        size: 13,
                        color: Colors.white.withOpacity(0.3),
                      ),
                      const SizedBox(width: 5),
                      Text(
                        estudo.referencia,
                        style: TextStyle(
                          fontSize: 12,
                          color: _accent.withOpacity(0.8),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const Spacer(),
                      Icon(
                        Icons.access_time_rounded,
                        size: 13,
                        color: Colors.white.withOpacity(0.25),
                      ),
                      const SizedBox(width: 5),
                      Text(
                        timeAgo,
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.white.withOpacity(0.35),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: estudo.progresso,
                            backgroundColor: Colors.white.withOpacity(0.06),
                            valueColor:
                                AlwaysStoppedAnimation<Color>(progressColor),
                            minHeight: 5,
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Text(
                        '${(estudo.progresso * 100).toInt()}%',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: progressColor,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Text(
                        '${estudo.versiculosLidos} de ${estudo.totalVersiculos} versículos',
                        style: TextStyle(
                          fontSize: 11,
                          color: Colors.white.withOpacity(0.35),
                        ),
                      ),
                      const Spacer(),
                      if (estudo.progresso >= 1.0)
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFF5D8A5D).withOpacity(0.15),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'Concluído',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF5D8A5D),
                            ),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ),
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
              padding: const EdgeInsets.all(28),
              decoration: BoxDecoration(
                color: _surface,
                shape: BoxShape.circle,
                border: Border.all(
                  color: _accent.withOpacity(0.1),
                  width: 2,
                ),
              ),
              child: Icon(
                Icons.menu_book_rounded,
                size: 56,
                color: _accent.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 28),
            const Text(
              'Nenhum estudo ainda',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Comece criando seu primeiro estudo\npara organizar suas análises bíblicas',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withOpacity(0.4),
                height: 1.5,
              ),
            ),
            const SizedBox(height: 28),
            Container(
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [_accent, Color(0xFFB8945F)],
                ),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: _accent.withOpacity(0.25),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  borderRadius: BorderRadius.circular(12),
                  onTap: () => _showSnackBar('Criar novo estudo'),
                  child: const Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: 28, vertical: 14),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.add_rounded,
                            color: Colors.white, size: 22),
                        SizedBox(width: 8),
                        Text(
                          'Criar Primeiro Estudo',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFab() {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [_accent, Color(0xFFB8945F)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: _accent.withOpacity(0.35),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: FloatingActionButton(
        onPressed: () => _showSnackBar('Criar novo estudo'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        child: const Icon(Icons.add_rounded, color: Colors.white, size: 28),
      ),
    );
  }

  String _formatTimeAgo(DateTime date) {
    final diff = DateTime.now().difference(date);
    if (diff.inMinutes < 60) return '${diff.inMinutes}min atrás';
    if (diff.inHours < 24) return '${diff.inHours}h atrás';
    if (diff.inDays < 7) return '${diff.inDays}d atrás';
    final d = date.day.toString().padLeft(2, '0');
    final m = date.month.toString().padLeft(2, '0');
    final y = date.year.toString().substring(2);
    return '$d/$m/$y';
  }

  PopupMenuItem<String> _menuItem(String value, String label, IconData icon,
      {Color? color}) {
    return PopupMenuItem(
      value: value,
      child: Row(
        children: [
          Icon(icon, size: 18, color: color ?? Colors.white.withOpacity(0.5)),
          const SizedBox(width: 10),
          Text(
            label,
            style: TextStyle(
              fontSize: 14,
              color: color ?? Colors.white.withOpacity(0.8),
            ),
          ),
        ],
      ),
    );
  }

  void _handleMenuAction(String action, _Estudo estudo) {
    switch (action) {
      case 'editar':
        _showSnackBar('Editar: ${estudo.titulo}');
        break;
      case 'favorito':
        setState(() => estudo.favorito = !estudo.favorito);
        _showSnackBar(
          estudo.favorito ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
        );
        break;
      case 'compartilhar':
        _showSnackBar('Compartilhar: ${estudo.titulo}');
        break;
      case 'excluir':
        _showDeleteDialog(estudo);
        break;
    }
  }

  Future<bool?> _showDeleteDialog(_Estudo estudo) {
    return showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: _surface,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text(
          'Excluir estudo?',
          style: TextStyle(
            fontFamily: 'serif',
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
        content: Text(
          'Deseja excluir "${estudo.titulo}"? Esta ação não pode ser desfeita.',
          style: TextStyle(
            color: Colors.white.withOpacity(0.6),
            fontSize: 14,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: Text(
              'Cancelar',
              style: TextStyle(color: Colors.white.withOpacity(0.5)),
            ),
          ),
          TextButton(
            onPressed: () {
              setState(() => _estudos.remove(estudo));
              Navigator.pop(ctx, true);
              _showSnackBar('Estudo excluído');
            },
            child: const Text('Excluir', style: TextStyle(color: _error)),
          ),
        ],
      ),
    );
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: _surface,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.all(16),
      ),
    );
  }
}

class _Estudo {
  final int id;
  final String titulo;
  final String descricao;
  final String referencia;
  final DateTime ultimaLeitura;
  final double progresso;
  final int totalVersiculos;
  final int versiculosLidos;
  final Color cor;
  bool favorito;

  _Estudo({
    required this.id,
    required this.titulo,
    required this.descricao,
    required this.referencia,
    required this.ultimaLeitura,
    required this.progresso,
    required this.totalVersiculos,
    required this.versiculosLidos,
    required this.cor,
    required this.favorito,
  });
}
