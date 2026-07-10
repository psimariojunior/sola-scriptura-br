import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/api_service.dart';

class IaScreen extends StatefulWidget {
  const IaScreen({super.key});

  @override
  State<IaScreen> createState() => _IaScreenState();
}

class _IaScreenState extends State<IaScreen> with SingleTickerProviderStateMixin {
  final ApiService _api = apiService;
  final TextEditingController _perguntaController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  String _tradicao = 'neutra';
  bool _enviando = false;
  String? _erro;
  bool _mostrarSugestoes = true;

  List<Map<String, dynamic>> _mensagens = [];

  // Premium dark theme colors
  static const Color _background = Color(0xFF0A0A14);
  static const Color _surface = Color(0xFF12121E);
  static const Color _card = Color(0xFF1A1A2E);
  static const Color _accent = Color(0xFFC9A96E);
  static const Color _error = Color(0xFFEF4444);
  static const Color _textPrimary = Colors.white;
  static const Color _textSecondary = Colors.white70;

  static const List<String> _tradicoes = [
    'neutra',
    'reformada',
    'catolica',
    'arminiana',
    'luterana',
    'anglicana',
    'ortodoxa',
  ];

  static const List<Map<String, String>> _sugestoes = [
    {
      'pergunta': 'Qual e o significado de João 3:16?',
      'icone': '📖',
    },
    {
      'pergunta': 'Compare as versoes de Romanos 8:28',
      'icone': '🔄',
    },
    {
      'pergunta': 'Estude a palavra "agape" no Novo Testamento',
      'icone': '🔍',
    },
    {
      'pergunta': 'Analise teologica da Justificacao pela fe',
      'icone': '✝️',
    },
  ];

  static const List<Map<String, dynamic>> _acoesRapidas = [
    {
      'titulo': 'Explicar Passagem',
      'descricao': 'Explique um versiculo ou passagem',
      'icone': Icons.menu_book_rounded,
      'cor': Color(0xFFC9A96E),
    },
    {
      'titulo': 'Comparar Versoes',
      'descricao': 'Compare traducoes diferentes',
      'icone': Icons.compare_arrows_rounded,
      'cor': Color(0xFF6B9BD2),
    },
    {
      'titulo': 'Estudo de Palavra',
      'descricao': 'Analise palavras em grego/hebraico',
      'icone': Icons.translate_rounded,
      'cor': Color(0xFF7BC67E),
    },
    {
      'titulo': 'Analise Teologica',
      'descricao': 'Estude doutrinas e teologia',
      'icone': Icons.auto_stories_rounded,
      'cor': Color(0xFFD4A574),
    },
  ];

  late AnimationController _animController;
  late Animation<double> _dotAnim1;
  late Animation<double> _dotAnim2;
  late Animation<double> _dotAnim3;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();

    _dotAnim1 = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animController, curve: const Interval(0.0, 0.33)),
    );
    _dotAnim2 = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animController, curve: const Interval(0.33, 0.66)),
    );
    _dotAnim3 = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animController, curve: const Interval(0.66, 1.0)),
    );
  }

  @override
  void dispose() {
    _perguntaController.dispose();
    _scrollController.dispose();
    _animController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _enviar({String? pergunta}) async {
    final texto = pergunta ?? _perguntaController.text.trim();
    if (texto.isEmpty) return;

    setState(() {
      _enviando = true;
      _erro = null;
      _mostrarSugestoes = false;
      _mensagens.add({
        'texto': texto,
        'ehUsuario': true,
        'timestamp': DateTime.now(),
      });
    });

    _perguntaController.clear();
    _scrollToBottom();

    try {
      final data = await _api.getPerguntasIA(texto, tradicao: _tradicao);
      final resposta = (data['resposta'] ?? data['texto'] ?? '').toString();
      setState(() {
        _mensagens.add({
          'texto': resposta.isNotEmpty ? resposta : data.toString(),
          'ehUsuario': false,
          'timestamp': DateTime.now(),
        });
        _enviando = false;
      });
      _scrollToBottom();
    } catch (e) {
      setState(() {
        _mensagens.add({
          'texto': 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
          'ehUsuario': false,
          'timestamp': DateTime.now(),
          'erro': true,
        });
        _enviando = false;
      });
      _scrollToBottom();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _background,
      appBar: _buildAppBar(),
      body: Column(
        children: [
          Expanded(
            child: _mostrarSugestoes && _mensagens.isEmpty
                ? _buildTelaInicial()
                : _buildChat(),
          ),
          if (_enviando) _buildIndicadorDigitacao(),
          _buildAreaEntrada(),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: _surface,
      elevation: 0,
      centerTitle: true,
      systemOverlayStyle: const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
      ),
      leading: IconButton(
        icon: const Icon(Icons.add_rounded, color: _textSecondary),
        onPressed: () {
          setState(() {
            _mensagens.clear();
            _mostrarSugestoes = true;
          });
        },
      ),
      title: const Column(
        children: [
          Text(
            'Assistente Bíblico',
            style: TextStyle(
              color: _textPrimary,
              fontSize: 17,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.3,
            ),
          ),
          SizedBox(height: 2),
          Text(
            'Powered by AI',
            style: TextStyle(
              color: _accent,
              fontSize: 11,
              fontWeight: FontWeight.w400,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
      actions: [
        PopupMenuButton<String>(
          icon: const Icon(Icons.tune_rounded, color: _textSecondary),
          color: _card,
          onSelected: (value) {
            setState(() => _tradicao = value);
          },
          itemBuilder: (context) => _tradicoes.map((t) {
            return PopupMenuItem<String>(
              value: t,
              child: Row(
                children: [
                  if (_tradicao == t)
                    const Icon(Icons.check_circle, color: _accent, size: 18)
                  else
                    const Icon(Icons.circle_outlined, color: _textSecondary, size: 18),
                  const SizedBox(width: 10),
                  Text(
                    _tradicaoLabel(t),
                    style: TextStyle(
                      color: _tradicao == t ? _accent : _textPrimary,
                      fontWeight: _tradicao == t ? FontWeight.w600 : FontWeight.normal,
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  String _tradicaoLabel(String tradicao) {
    switch (tradicao) {
      case 'reformada':
        return 'Reformada';
      case 'catolica':
        return 'Católica';
      case 'arminiana':
        return 'Arminiana';
      case 'luterana':
        return 'Luterana';
      case 'anglicana':
        return 'Anglicana';
      case 'ortodoxa':
        return 'Ortodoxa';
      case 'neutra':
      default:
        return 'Neutra';
    }
  }

  Widget _buildTelaInicial() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: _accent.withOpacity(0.15),
                shape: BoxShape.circle,
                border: Border.all(color: _accent.withOpacity(0.3), width: 2),
              ),
              child: const Icon(
                Icons.auto_awesome_rounded,
                size: 40,
                color: _accent,
              ),
            ),
          ),
          const SizedBox(height: 20),
          const Center(
            child: Text(
              'Como posso ajudar\nseu estudo bíblico?',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: _textPrimary,
                fontSize: 22,
                fontWeight: FontWeight.w600,
                height: 1.3,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Center(
            child: Text(
              'Tradução: ${_tradicaoLabel(_tradicao)}',
              style: const TextStyle(
                color: _textSecondary,
                fontSize: 13,
              ),
            ),
          ),
          const SizedBox(height: 32),
          const Text(
            'Ações Rápidas',
            style: TextStyle(
              color: _textSecondary,
              fontSize: 13,
              fontWeight: FontWeight.w500,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 12),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.6,
            ),
            itemCount: _acoesRapidas.length,
            itemBuilder: (context, index) {
              final acao = _acoesRapidas[index];
              return _buildAcaoRapida(acao);
            },
          ),
          const SizedBox(height: 28),
          const Text(
            'Perguntas Sugeridas',
            style: TextStyle(
              color: _textSecondary,
              fontSize: 13,
              fontWeight: FontWeight.w500,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 12),
          ..._sugestoes.map((s) => _buildSugestao(s['pergunta']!, s['icone']!)),
        ],
      ),
    );
  }

  Widget _buildAcaoRapida(Map<String, dynamic> acao) {
    return Material(
      color: _card,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () {
          String perguntaExemplo;
          switch (acao['titulo']) {
            case 'Explicar Passagem':
              perguntaExemplo = 'Explique João 3:16 em contexto histórico';
              break;
            case 'Comparar Versoes':
              perguntaExemplo = 'Compare João 3:16 em diferentes traduções';
              break;
            case 'Estudo de Palavra':
              perguntaExemplo = 'Estude a palavra "pistis" (fé) no NT';
              break;
            case 'Analise Teologica':
              perguntaExemplo = 'Analise a doutrina da trindade bíblica';
              break;
            default:
              perguntaExemplo = 'Ajude-me com estudo bíblico';
          }
          _enviar(pergunta: perguntaExemplo);
        },
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(
                acao['icone'] as IconData,
                color: acao['cor'] as Color,
                size: 22,
              ),
              const Spacer(),
              Text(
                acao['titulo'],
                style: const TextStyle(
                  color: _textPrimary,
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                acao['descricao'],
                style: const TextStyle(
                  color: _textSecondary,
                  fontSize: 11,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSugestao(String pergunta, String icone) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Material(
        color: _card,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => _enviar(pergunta: pergunta),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
            child: Row(
              children: [
                Text(icone, style: const TextStyle(fontSize: 18)),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    pergunta,
                    style: const TextStyle(
                      color: _textPrimary,
                      fontSize: 14,
                    ),
                  ),
                ),
                const Icon(Icons.arrow_forward_ios_rounded, color: _textSecondary, size: 14),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildChat() {
    return ListView.builder(
      controller: _scrollController,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      itemCount: _mensagens.length,
      itemBuilder: (context, index) {
        final msg = _mensagens[index];
        return _buildMensagem(msg);
      },
    );
  }

  Widget _buildMensagem(Map<String, dynamic> msg) {
    final ehUsuario = msg['ehUsuario'] as bool;
    final erro = msg['erro'] as bool? ?? false;

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: ehUsuario ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!ehUsuario) ...[
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: _accent.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.auto_awesome_rounded,
                color: _accent,
                size: 16,
              ),
            ),
            const SizedBox(width: 10),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: ehUsuario ? _accent : _card,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(18),
                  topRight: const Radius.circular(18),
                  bottomLeft: Radius.circular(ehUsuario ? 18 : 4),
                  bottomRight: Radius.circular(ehUsuario ? 4 : 18),
                ),
                border: Border.all(
                  color: erro
                      ? _error.withOpacity(0.5)
                      : ehUsuario
                          ? _accent.withOpacity(0.3)
                          : Colors.white.withOpacity(0.05),
                  width: 1,
                ),
              ),
              child: SelectableText(
                msg['texto'] as String,
                style: TextStyle(
                  color: ehUsuario ? Colors.black87 : (erro ? _error : _textPrimary),
                  fontSize: 14.5,
                  height: 1.55,
                  fontWeight: ehUsuario ? FontWeight.w500 : FontWeight.normal,
                ),
              ),
            ),
          ),
          if (ehUsuario) ...[
            const SizedBox(width: 10),
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: _card,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.person_rounded,
                color: _textSecondary,
                size: 18,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildIndicadorDigitacao() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: const BoxDecoration(
        color: _background,
        border: Border(top: BorderSide(color: Colors.white54, width: 0.3)),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: _accent.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.auto_awesome_rounded,
              color: _accent,
              size: 16,
            ),
          ),
          const SizedBox(width: 12),
          AnimatedBuilder(
            animation: _animController,
            builder: (context, child) {
              return Row(
                children: [
                  _buildPontoAnimado(_dotAnim1.value),
                  const SizedBox(width: 4),
                  _buildPontoAnimado(_dotAnim2.value),
                  const SizedBox(width: 4),
                  _buildPontoAnimado(_dotAnim3.value),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPontoAnimado(double value) {
    return Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(
        color: _accent.withOpacity(0.3 + (value * 0.7)),
        shape: BoxShape.circle,
      ),
    );
  }

  Widget _buildAreaEntrada() {
    return Container(
      decoration: const BoxDecoration(
        color: _surface,
        border: Border(top: BorderSide(color: Colors.white54, width: 0.3)),
      ),
      padding: EdgeInsets.fromLTRB(
        12,
        10,
        12,
        MediaQuery.of(context).padding.bottom + 10,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Tradition selector compact
          if (_mostrarSugestoes && _mensagens.isEmpty)
            Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: _card,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.church_rounded, color: _accent, size: 16),
                  const SizedBox(width: 6),
                  Text(
                    _tradicaoLabel(_tradicao),
                    style: const TextStyle(color: _accent, fontSize: 12, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(width: 4),
                  const Icon(Icons.arrow_drop_down, color: _textSecondary, size: 18),
                ],
              ),
            ),
          // Input row
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Container(
                  constraints: const BoxConstraints(maxHeight: 120),
                  decoration: BoxDecoration(
                    color: _card,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: Colors.white.withOpacity(0.08), width: 1),
                  ),
                  child: TextField(
                    controller: _perguntaController,
                    minLines: 1,
                    maxLines: 5,
                    textInputAction: TextInputAction.send,
                    keyboardType: TextInputType.multiline,
                    onSubmitted: (_) => _enviar(),
                    style: const TextStyle(color: _textPrimary, fontSize: 15),
                    decoration: InputDecoration(
                      hintText: 'Pergunte sobre a Bíblia...',
                      hintStyle: TextStyle(color: _textSecondary.withOpacity(0.6), fontSize: 15),
                      border: InputBorder.none,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                      prefixIcon: const Padding(
                        padding: EdgeInsets.only(left: 4),
                        child: Icon(Icons.menu_book_rounded, color: _textSecondary, size: 20),
                      ),
                      prefixIconConstraints: const BoxConstraints(minWidth: 0, minHeight: 0),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: _enviando ? null : () => _enviar(),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: _enviando
                        ? _textSecondary.withOpacity(0.3)
                        : _perguntaController.text.trim().isNotEmpty
                            ? _accent
                            : _card,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: _perguntaController.text.trim().isNotEmpty
                          ? _accent
                          : Colors.white.withOpacity(0.08),
                      width: 1,
                    ),
                  ),
                  child: Icon(
                    Icons.arrow_upward_rounded,
                    color: _perguntaController.text.trim().isNotEmpty
                        ? Colors.black87
                        : _textSecondary,
                    size: 22,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
