import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:share_plus/share_plus.dart';
import 'package:screenshot/screenshot.dart';

import '../../models/livro.dart';
import '../../models/traducao.dart';
import '../../services/biblia_service.dart';
import '../../widgets/book_selector.dart';
import '../../widgets/chapter_grid.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/loading_shimmer.dart';

class CompararScreen extends StatefulWidget {
  const CompararScreen({super.key});

  @override
  State<CompararScreen> createState() => _CompararScreenState();
}

class _CompararScreenState extends State<CompararScreen> {
  static const _cachePrefix = 'comparar_';
  static const _minTraducoes = 2;
  static const _maxTraducoes = 6;

  Livro? _livro;
  int _capitulo = 3;
  int _versiculoInicio = 16;
  int _versiculoFim = 16;
  final List<String> _traducoesSelecionadas = ['arc', 'nvi'];

  final Map<String, List<String>> _versoes = {};
  final Map<int, GlobalKey> _columnKeys = {};
  final ScreenshotController _screenshotController = ScreenshotController();
  final ScrollController _syncController = ScrollController();

  bool _carregando = false;
  bool _compartilhando = false;
  int _maxVersiculos = 0;

  @override
  void initState() {
    super.initState();
    _livro = _encontrarLivroPorAbrev('jo');
    _carregarPreferencias();
    _carregarVersoes();
  }

  @override
  void dispose() {
    _syncController.dispose();
    super.dispose();
  }

  Livro? _encontrarLivroPorAbrev(String abrev) {
    for (final l in BibliaService.livros) {
      if (l.abreviacao == abrev) return l;
    }
    return BibliaService.livros.isNotEmpty ? BibliaService.livros.first : null;
  }

  Future<void> _carregarPreferencias() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final livroAbrev = prefs.getString('${_cachePrefix}livro') ?? 'jo';
      final cap = prefs.getInt('${_cachePrefix}capitulo') ?? 3;
      final vInicio = prefs.getInt('${_cachePrefix}versiculo_inicio') ?? 16;
      final vFim = prefs.getInt('${_cachePrefix}versiculo_fim') ?? 16;
      final traducoes = prefs.getStringList('${_cachePrefix}traducoes');
      if (!mounted) return;
      setState(() {
        _livro = _encontrarLivroPorAbrev(livroAbrev);
        _capitulo = cap;
        _versiculoInicio = vInicio;
        _versiculoFim = vFim;
        if (traducoes != null && traducoes.length >= _minTraducoes) {
          _traducoesSelecionadas
            ..clear()
            ..addAll(traducoes.take(_maxTraducoes));
        }
      });
      _carregarVersoes();
    } catch (_) {
      _carregarVersoes();
    }
  }

  Future<void> _salvarPreferencias() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      if (_livro != null) {
        await prefs.setString('${_cachePrefix}livro', _livro!.abreviacao);
      }
      await prefs.setInt('${_cachePrefix}capitulo', _capitulo);
      await prefs.setInt('${_cachePrefix}versiculo_inicio', _versiculoInicio);
      await prefs.setInt('${_cachePrefix}versiculo_fim', _versiculoFim);
      await prefs.setStringList(
        '${_cachePrefix}traducoes',
        List<String>.from(_traducoesSelecionadas),
      );
    } catch (_) {
      // ignora erros de cache
    }
  }

  void _carregarVersoes() {
    if (_livro == null || !BibliaService.isInitialized) {
      return;
    }
    final slug = BibliaService.slugFromAbrev(_livro!.abreviacao);
    setState(() {
      _carregando = true;
      _versoes.clear();
      _maxVersiculos = 0;
    });

    Future.microtask(() async {
      final resultados = <String, List<String>>{};
      int maxLen = 0;
      for (final t in _traducoesSelecionadas) {
        try {
          final textos = BibliaService.fetchCapitulo(t, slug, _capitulo);
          resultados[t] = textos;
          if (textos.length > maxLen) maxLen = textos.length;
        } catch (_) {
          resultados[t] = const [];
        }
      }
      if (!mounted) return;
      setState(() {
        _versoes
          ..clear()
          ..addAll(resultados);
        _maxVersiculos = maxLen;
        _carregando = false;
      });
    });
  }

  Future<void> _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(
        builder: (_) => BookSelector(
          livroSelecionado: _livro?.abreviacao,
          onSelecionado: (l) => Navigator.of(context).pop(l),
        ),
      ),
    );
    if (resultado != null && mounted) {
      setState(() {
        _livro = resultado;
        _capitulo = 1;
        _versiculoInicio = 1;
        _versiculoFim = 1;
      });
      await _salvarPreferencias();
      _carregarVersoes();
    }
  }

  Future<void> _abrirCapitulos() async {
    if (_livro == null) return;
    final resultado = await Navigator.of(context).push<int>(
      MaterialPageRoute(
        builder: (_) => Scaffold(
          appBar: AppBar(title: Text('Capítulos — ${_livro!.nome}')),
          body: ChapterGrid(
            total: _livro!.capitulos,
            capituloSelecionado: _capitulo,
            onSelecionado: (c) => Navigator.of(context).pop(c),
          ),
        ),
      ),
    );
    if (resultado != null && mounted) {
      setState(() => _capitulo = resultado);
      await _salvarPreferencias();
      _carregarVersoes();
    }
  }

  Future<void> _abrirSeletorVersiculos() async {
    if (_livro == null) return;
    final totalCap = _livro!.capitulos;
    final maxVersiculos = _maxVersiculos > 0 ? _maxVersiculos : 50;
    final resultado = await showModalBottomSheet<_RangeVersiculos>(
      context: context,
      isScrollControlled: true,
      builder: (ctx) => _SeletorVersiculosSheet(
        livro: _livro!,
        capituloInicial: _capitulo,
        versiculoInicioInicial: _versiculoInicio,
        versiculoFimInicial: _versiculoFim,
        maxCapitulos: totalCap,
        maxVersiculosCapitulo: maxVersiculos,
      ),
    );
    if (resultado != null && mounted) {
      setState(() {
        _capitulo = resultado.capitulo;
        _versiculoInicio = resultado.versiculoInicio;
        _versiculoFim = resultado.versiculoFim;
      });
      await _salvarPreferencias();
      _carregarVersoes();
    }
  }

  Future<void> _abrirSeletorTraducoes() async {
    final resultado = await showModalBottomSheet<List<String>>(
      context: context,
      isScrollControlled: true,
      builder: (ctx) => _SeletorTraducoesSheet(
        selecionadas: List<String>.from(_traducoesSelecionadas),
        minimo: _minTraducoes,
        maximo: _maxTraducoes,
      ),
    );
    if (resultado != null &&
        mounted &&
        resultado.length >= _minTraducoes &&
        resultado.length <= _maxTraducoes) {
      setState(() {
        _traducoesSelecionadas
          ..clear()
          ..addAll(resultado);
      });
      await _salvarPreferencias();
      _carregarVersoes();
    }
  }

  int get _quantidadeVersiculos =>
      (_versiculoFim - _versiculoInicio).abs() + 1;

  List<int> get _versiculosParaExibir {
    final inicio = _versiculoInicio;
    final fim = _versiculoFim;
    final lo = inicio < fim ? inicio : fim;
    final hi = inicio < fim ? fim : inicio;
    return [for (var i = lo; i <= hi; i++) i];
  }

  String _montarTextoComparacao() {
    final buffer = StringBuffer();
    buffer.writeln(
      '📖 ${_livro?.nome ?? ''} $_capitulo:$_versiculoInicio'
      '${_versiculoFim != _versiculoInicio ? '-$_versiculoFim' : ''}',
    );
    buffer.writeln();
    final ref = _traducoesSelecionadas.first;
    final textosRef = _versoes[ref] ?? const <String>[];
    final sigRef = (Traducoes.porId(ref)?.abreviacao ?? ref).toUpperCase();
    for (final v in _versiculosParaExibir) {
      if (v - 1 < textosRef.length) {
        buffer.writeln('$v. ($sigRef) ${textosRef[v - 1]}');
        buffer.writeln();
      }
    }
    for (var i = 1; i < _traducoesSelecionadas.length; i++) {
      final t = _traducoesSelecionadas[i];
      final textos = _versoes[t] ?? const <String>[];
      final sig = (Traducoes.porId(t)?.abreviacao ?? t).toUpperCase();
      buffer.writeln('— $sig —');
      buffer.writeln();
      for (final v in _versiculosParaExibir) {
        if (v - 1 < textos.length) {
          buffer.writeln('$v. ($sig) ${textos[v - 1]}');
          buffer.writeln();
        }
      }
    }
    buffer.writeln('— Sola Scriptura BR');
    return buffer.toString();
  }

  Future<void> _compartilharTexto() async {
    final texto = _montarTextoComparacao();
    await Clipboard.setData(ClipboardData(text: texto));
    if (!mounted) return;
    try {
      await Share.share(texto, subject: 'Comparação de traduções');
    } catch (_) {
      // ignora
    }
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Texto copiado e pronto para compartilhar')),
    );
  }

  Future<void> _compartilharImagem() async {
    if (_compartilhando) return;
    setState(() => _compartilhando = true);
    try {
      final Uint8List? bytes = await _screenshotController.capture(
        pixelRatio: MediaQuery.of(context).devicePixelRatio,
        delay: const Duration(milliseconds: 20),
      );
      if (bytes == null) throw Exception('Falha ao capturar imagem.');
      final dir = await getTemporaryDirectory();
      final outDir = Directory(p.join(dir.path, 'comparar'));
      if (!await outDir.exists()) {
        await outDir.create(recursive: true);
      }
      final stamp = DateTime.now().millisecondsSinceEpoch;
      final file = File(
        p.join(outDir.path, 'comparacao_${_livro?.abreviacao}_'
            '$_capitulo$_versiculoInicio-$_versiculoFim'
            '_$stamp.png'),
      );
      await file.writeAsBytes(bytes, flush: true);
      await Share.shareXFiles(
        [XFile(file.path, mimeType: 'image/png')],
        text: 'Comparação ${_livro?.nome ?? ''} $_capitulo:$_versiculoInicio',
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao compartilhar imagem: $e')),
      );
    } finally {
      if (mounted) setState(() => _compartilhando = false);
    }
  }

  RenderRepaintBoundary? _encontrarBoundaryPrincipal() {
    void visitor(Element element) {
      if (element.widget is RepaintBoundary) {
        final renderObject = element.findRenderObject();
        if (renderObject is RenderRepaintBoundary) {
          // Apenas o primeiro encontrado.
        }
      }
      element.visitChildren(visitor);
    }

    // Estratégia simplificada: usar captura longa do widget raiz.
    return null;
  }

  Widget _buildAreaCaptura() {
    return Material(
      color: Theme.of(context).scaffoldBackgroundColor,
      child: _buildComparacao(
        forcarLayout: true,
      ),
    );
  }

  String _normalizarPalavra(String w) {
    return w
        .toLowerCase()
        .replaceAll(RegExp(r'[\u2018\u2019\u201c\u201d]'), "'")
        .replaceAll(RegExp(r'[^\w]'), '')
        .trim();
  }

  Set<String> _palavrasBase(int versiculo) {
    if (_traducoesSelecionadas.isEmpty) return const {};
    final base = _traducoesSelecionadas.first;
    final textos = _versoes[base] ?? const <String>[];
    if (versiculo - 1 >= textos.length) return const {};
    final texto = textos[versiculo - 1];
    final palavras = texto.split(RegExp(r'\s+'));
    return palavras.map(_normalizarPalavra).where((w) => w.isNotEmpty).toSet();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Comparar Traduções'),
        actions: [
          IconButton(
            icon: const Icon(Icons.text_fields),
            tooltip: 'Compartilhar texto',
            onPressed: _carregando ? null : _compartilharTexto,
          ),
          IconButton(
            icon: _compartilhando
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Icon(Icons.image),
            tooltip: 'Compartilhar como imagem',
            onPressed: _carregando ? null : _compartilharImagem,
          ),
        ],
      ),
      body: Column(
        children: [
          _buildControles(),
          const Divider(height: 1),
          Expanded(
            child: _carregando
                ? const _CompararLoading()
                : _buildConteudo(),
          ),
        ],
      ),
    );
  }

  Widget _buildControles() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 8),
      color: Theme.of(context)
          .colorScheme
          .primaryContainer
          .withValues(alpha: 0.3),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: _buildBotao(
                  icon: Icons.menu_book,
                  label: _livro?.nome ?? 'Livro',
                  sublabel: '${_livro?.abreviacao.toUpperCase() ?? ''}',
                  onTap: _abrirLivros,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildBotao(
                  icon: Icons.bookmark_outline,
                  label: 'Cap $_capitulo',
                  sublabel: _livro != null
                      ? 'de ${_livro!.capitulos}'
                      : '',
                  onTap: _abrirCapitulos,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildBotao(
                  icon: Icons.format_list_numbered,
                  label: _versiculoInicio == _versiculoFim
                      ? 'v$_versiculoInicio'
                      : 'v$_versiculoInicio-$_versiculoFim',
                  sublabel: '$_quantidadeVersiculos versículo${_quantidadeVersiculos > 1 ? 's' : ''}',
                  onTap: _abrirSeletorVersiculos,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          _buildTraducoesChips(),
        ],
      ),
    );
  }

  Widget _buildBotao({
    required IconData icon,
    required String label,
    required String sublabel,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);
    return Material(
      color: theme.cardColor,
      borderRadius: BorderRadius.circular(10),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          child: Row(
            children: [
              Icon(icon, size: 18, color: theme.colorScheme.primary),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                    if (sublabel.isNotEmpty)
                      Text(
                        sublabel,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 11,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTraducoesChips() {
    return SizedBox(
      height: 36,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          for (final t in Traducoes.lista.where(
            (tr) => BibliaService.traducoesDisponiveis.contains(tr.id),
          ))
            Padding(
              padding: const EdgeInsets.only(right: 6),
              child: FilterChip(
                label: Text(t.abreviacao),
                selected: _traducoesSelecionadas.contains(t.id),
                showCheckmark: true,
                onSelected: (selecionado) {
                  setState(() {
                    if (selecionado) {
                      if (_traducoesSelecionadas.length < _maxTraducoes &&
                          !_traducoesSelecionadas.contains(t.id)) {
                        _traducoesSelecionadas.add(t.id);
                      }
                    } else {
                      if (_traducoesSelecionadas.length > _minTraducoes) {
                        _traducoesSelecionadas.remove(t.id);
                      }
                    }
                  });
                  _salvarPreferencias();
                  _carregarVersoes();
                },
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildConteudo() {
    if (_versiculosParaExibir.isEmpty) {
      return const EmptyState(
        icon: Icons.compare_arrows,
        title: 'Selecione versículos para comparar',
        message: 'Use o botão acima para escolher o intervalo.',
      );
    }
    if (_versoes.isEmpty || _maxVersiculos == 0) {
      return const EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Sem versículos disponíveis',
        message: 'Esta passagem não foi encontrada nas traduções selecionadas.',
      );
    }
    return Screenshot(
      controller: _screenshotController,
      child: _buildComparacao(),
    );
  }

  Widget _buildComparacao({bool forcarLayout = false}) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final largura = constraints.maxWidth;
        final isTablet = largura >= 720;
        if (isTablet && _traducoesSelecionadas.length >= 2) {
          return _buildLayoutColunas();
        }
        return _buildLayoutVertical();
      },
    );
  }

  Widget _buildLayoutColunas() {
    final traducoes = _traducoesSelecionadas;
    return SingleChildScrollView(
      controller: _syncController,
      scrollDirection: Axis.horizontal,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (var i = 0; i < traducoes.length; i++) ...[
            if (i > 0)
              const VerticalDivider(width: 1, thickness: 1),
            SizedBox(
              width: 320,
              child: _buildColunaTraducao(traducoes[i], i == 0),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildLayoutVertical() {
    final traducoes = _traducoesSelecionadas;
    return ListView.builder(
      controller: _syncController,
      padding: const EdgeInsets.all(8),
      itemCount: traducoes.length,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: _buildColunaTraducao(traducoes[index], index == 0),
        );
      },
    );
  }

  Widget _buildColunaTraducao(String traducaoId, bool isBase) {
    final traducao = Traducoes.porId(traducaoId);
    final sigla = traducao?.abreviacao ?? traducaoId.toUpperCase();
    final nome = traducao?.nome ?? traducaoId;
    final textos = _versoes[traducaoId] ?? const <String>[];
    final theme = Theme.of(context);
    final key = _columnKeys.putIfAbsent(
      traducao.hashCode,
      () => GlobalKey(debugLabel: 'col-$traducaoId'),
    );
    return Container(
      key: key,
      decoration: BoxDecoration(
        color: theme.cardColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.dividerColor.withValues(alpha: 0.3),
        ),
      ),
      margin: const EdgeInsets.all(4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: theme.colorScheme.primaryContainer
                  .withValues(alpha: 0.6),
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(12),
              ),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 2,
                  ),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    sigla,
                    style: TextStyle(
                      color: theme.colorScheme.onPrimary,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    nome,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 12,
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
                if (isBase)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 6,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.tertiary
                          .withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      'base',
                      style: TextStyle(
                        fontSize: 10,
                        color: theme.colorScheme.tertiary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          for (final v in _versiculosParaExibir)
            _buildItemVersiculo(
              numero: v,
              texto: v - 1 < textos.length ? textos[v - 1] : '',
              isBase: isBase,
              traducaoId: traducaoId,
            ),
        ],
      ),
    );
  }

  Widget _buildItemVersiculo({
    required int numero,
    required String texto,
    required bool isBase,
    required String traducaoId,
  }) {
    final theme = Theme.of(context);
    if (texto.isEmpty) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildNumero(numero, theme),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                '—',
                style: TextStyle(
                  fontStyle: FontStyle.italic,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ),
          ],
        ),
      );
    }
    final baseSet = isBase ? const <String>{} : _palavrasBase(numero);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildNumero(numero, theme),
          const SizedBox(width: 10),
          Expanded(
            child: _buildTextoComDestaque(
              texto: texto,
              isBase: isBase,
              palavrasBase: baseSet,
              theme: theme,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNumero(int numero, ThemeData theme) {
    return Container(
      width: 26,
      height: 26,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: theme.colorScheme.primary.withValues(alpha: 0.12),
        shape: BoxShape.circle,
      ),
      child: Text(
        '$numero',
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: theme.colorScheme.primary,
        ),
      ),
    );
  }

  Widget _buildTextoComDestaque({
    required String texto,
    required bool isBase,
    required Set<String> palavrasBase,
    required ThemeData theme,
  }) {
    if (isBase || palavrasBase.isEmpty) {
      return Text(
        texto,
        style: theme.textTheme.bodyMedium?.copyWith(
          height: 1.5,
          fontSize: 14,
        ),
      );
    }
    final palavras = texto.split(RegExp(r'(\s+)'));
    return RichText(
      text: TextSpan(
        style: theme.textTheme.bodyMedium?.copyWith(
          height: 1.5,
          fontSize: 14,
          color: theme.colorScheme.onSurface,
        ),
        children: [
          for (final p in palavras)
            TextSpan(
              text: p,
              style: _estiloPalavra(p, palavrasBase, theme),
            ),
        ],
      ),
    );
  }

  TextStyle? _estiloPalavra(
    String palavra,
    Set<String> palavrasBase,
    ThemeData theme,
  ) {
    final normalizada = _normalizarPalavra(palavra);
    if (normalizada.isEmpty) return null;
    final diferente = !palavrasBase.contains(normalizada);
    if (!diferente) return null;
    return TextStyle(
      backgroundColor:
          theme.colorScheme.tertiary.withValues(alpha: 0.22),
      fontWeight: FontWeight.w600,
    );
  }
}

class _CompararLoading extends StatelessWidget {
  const _CompararLoading();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          VerseLoadingShimmer(count: 4),
        ],
      ),
    );
  }
}

class _RangeVersiculos {
  final int capitulo;
  final int versiculoInicio;
  final int versiculoFim;

  const _RangeVersiculos({
    required this.capitulo,
    required this.versiculoInicio,
    required this.versiculoFim,
  });
}

class _SeletorVersiculosSheet extends StatefulWidget {
  final Livro livro;
  final int capituloInicial;
  final int versiculoInicioInicial;
  final int versiculoFimInicial;
  final int maxCapitulos;
  final int maxVersiculosCapitulo;

  const _SeletorVersiculosSheet({
    required this.livro,
    required this.capituloInicial,
    required this.versiculoInicioInicial,
    required this.versiculoFimInicial,
    required this.maxCapitulos,
    required this.maxVersiculosCapitulo,
  });

  @override
  State<_SeletorVersiculosSheet> createState() => _SeletorVersiculosSheetState();
}

class _SeletorVersiculosSheetState extends State<_SeletorVersiculosSheet> {
  late int _capitulo;
  late int _versiculoInicio;
  late int _versiculoFim;

  @override
  void initState() {
    super.initState();
    _capitulo = widget.capituloInicial;
    _versiculoInicio = widget.versiculoInicioInicial;
    _versiculoFim = widget.versiculoFimInicial;
  }

  int get _maxVersiculoAtual =>
      widget.maxVersiculosCapitulo > 0 ? widget.maxVersiculosCapitulo : 50;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.only(
          left: 20,
          right: 20,
          top: 16,
          bottom: MediaQuery.of(context).viewInsets.bottom + 20,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Selecionar versículos em ${widget.livro.nome}',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: _buildDropdown<int>(
                    label: 'Capítulo',
                    value: _capitulo,
                    items: [
                      for (var i = 1; i <= widget.maxCapitulos; i++)
                        DropdownMenuItem(value: i, child: Text('$i')),
                    ],
                    onChanged: (v) {
                      if (v != null) setState(() => _capitulo = v);
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildDropdown<int>(
                    label: 'Início',
                    value: _versiculoInicio.clamp(1, _maxVersiculoAtual),
                    items: [
                      for (var i = 1; i <= _maxVersiculoAtual; i++)
                        DropdownMenuItem(value: i, child: Text('$i')),
                    ],
                    onChanged: (v) {
                      if (v != null) {
                        setState(() {
                          _versiculoInicio = v;
                          if (_versiculoFim < v) _versiculoFim = v;
                        });
                      }
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildDropdown<int>(
                    label: 'Fim',
                    value: _versiculoFim.clamp(1, _maxVersiculoAtual),
                    items: [
                      for (var i = 1; i <= _maxVersiculoAtual; i++)
                        DropdownMenuItem(value: i, child: Text('$i')),
                    ],
                    onChanged: (v) {
                      if (v != null) {
                        setState(() {
                          _versiculoFim = v;
                          if (_versiculoInicio > v) _versiculoInicio = v;
                        });
                      }
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('Cancelar'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: FilledButton(
                    onPressed: () {
                      Navigator.of(context).pop(
                        _RangeVersiculos(
                          capitulo: _capitulo,
                          versiculoInicio: _versiculoInicio,
                          versiculoFim: _versiculoFim,
                        ),
                      );
                    },
                    child: const Text('Confirmar'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDropdown<T>({
    required String label,
    required T value,
    required List<DropdownMenuItem<T>> items,
    required ValueChanged<T?> onChanged,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 6),
        DropdownButtonFormField<T>(
          value: value,
          isExpanded: true,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            isDense: true,
          ),
          items: items,
          onChanged: onChanged,
        ),
      ],
    );
  }
}

class _SeletorTraducoesSheet extends StatefulWidget {
  final List<String> selecionadas;
  final int minimo;
  final int maximo;

  const _SeletorTraducoesSheet({
    required this.selecionadas,
    required this.minimo,
    required this.maximo,
  });

  @override
  State<_SeletorTraducoesSheet> createState() => _SeletorTraducoesSheetState();
}

class _SeletorTraducoesSheetState extends State<_SeletorTraducoesSheet> {
  late final List<String> _selecionadas;

  @override
  void initState() {
    super.initState();
    _selecionadas = List<String>.from(widget.selecionadas);
  }

  @override
  Widget build(BuildContext context) {
    final disponiveis = Traducoes.lista
        .where((t) => BibliaService.traducoesDisponiveis.contains(t.id))
        .toList();
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Traduções para comparar',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 6),
            Text(
              'Selecione entre ${widget.minimo} e ${widget.maximo} traduções.',
              style: TextStyle(
                fontSize: 12,
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final t in disponiveis)
                  FilterChip(
                    label: Text('${t.abreviacao} — ${t.nome}'),
                    selected: _selecionadas.contains(t.id),
                    showCheckmark: true,
                    onSelected: (selecionado) {
                      setState(() {
                        if (selecionado) {
                          if (_selecionadas.length < widget.maximo &&
                              !_selecionadas.contains(t.id)) {
                            _selecionadas.add(t.id);
                          }
                        } else {
                          if (_selecionadas.length > widget.minimo) {
                            _selecionadas.remove(t.id);
                          }
                        }
                      });
                    },
                  ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('Cancelar'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: FilledButton(
                    onPressed: _selecionadas.length >= widget.minimo &&
                            _selecionadas.length <= widget.maximo
                        ? () => Navigator.of(context).pop(_selecionadas)
                        : null,
                    child: Text('Confirmar (${_selecionadas.length})'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
