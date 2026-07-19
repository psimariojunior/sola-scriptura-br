import 'dart:io';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../services/verse_image_service.dart';
import '../services/verse_share_service.dart';

/// Modal de compartilhamento de versiculo. Suporta texto + imagem + redes sociais.
class ShareVerseSheet extends StatefulWidget {
  final ShareableVerse verse;
  final String? customMessage;

  const ShareVerseSheet({
    super.key,
    required this.verse,
    this.customMessage,
  });

  /// Abre o modal de compartilhamento para um unico versiculo.
  static Future<void> show(
    BuildContext context, {
    required ShareableVerse verse,
  }) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      showDragHandle: true,
      builder: (_) => ShareVerseSheet(verse: verse),
    );
  }

  @override
  State<ShareVerseSheet> createState() => _ShareVerseSheetState();
}

class _ShareVerseSheetState extends State<ShareVerseSheet> {
  late VerseImageStyle _style;
  late VerseImageFormat _format;
  bool _showQr = true;
  bool _busy = false;
  String? _previewPath;
  String _busyLabel = '';

  @override
  void initState() {
    super.initState();
    _style = VerseImageStyle.darkGold;
    _format = VerseImageFormat.square;
  }

  String get _referenciaCurta => widget.verse.referenciaCurta;
  String get _textoFormatado {
    if (widget.verse.versiculos.length == 1) {
      return VerseShareService.formatShareText(
        livroNome: widget.verse.livroNome,
        capitulo: widget.verse.capitulo,
        versiculo: widget.verse.versiculos.first,
        traducaoAbrev: widget.verse.traducaoAbrev,
        mensagemExtra: widget.customMessage,
      );
    }
    return VerseShareService.formatRangeText(
      livroNome: widget.verse.livroNome,
      capitulo: widget.verse.capitulo,
      versiculos: widget.verse.versiculos,
      traducaoAbrev: widget.verse.traducaoAbrev,
    );
  }

  Future<void> _compartilharTexto() async {
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    try {
      await VerseShareService.shareText(
        _textoFormatado,
        subject: _referenciaCurta,
      );
      navigator.pop();
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Nao foi possivel compartilhar: $e')),
      );
    }
  }

  Future<void> _copiarTexto() async {
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    try {
      await VerseShareService.copyToClipboard(_textoFormatado);
      messenger.showSnackBar(
        const SnackBar(
          content: Text('Texto copiado para a area de transferencia.'),
        ),
      );
      navigator.pop();
    } catch (e) {
      messenger.showSnackBar(SnackBar(content: Text('Falha ao copiar: $e')));
    }
  }

  Future<VerseImageResult?> _gerarImagem({bool cacheOnly = false}) async {
    final messenger = ScaffoldMessenger.of(context);
    if (_busy) return null;
    setState(() {
      _busy = true;
      _busyLabel = cacheOnly ? 'Atualizando preview...' : 'Gerando imagem...';
    });
    try {
      final texto = widget.verse.versiculos
          .map((v) => '${v.numero}. ${v.texto.trim()}')
          .join('\n\n');
      final first = widget.verse.versiculos.first;
      final last = widget.verse.versiculos.last;
      final result = await VerseImageService.generateImage(
        context: context,
        livroNome: widget.verse.livroNome,
        livroAbreviacao: widget.verse.livroAbreviacao,
        capitulo: first.capitulo ?? widget.verse.capitulo,
        versiculoInicio: first.numero,
        versiculoFim: first == last ? null : last.numero,
        texto: texto,
        traducaoAbrev: widget.verse.traducaoAbrev,
        style: _style,
        format: _format,
        showQrCode: _showQr,
        pixelRatio: 1.0,
      );
      if (mounted) {
        setState(() => _previewPath = result.filePath);
      }
      return result;
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Falha ao gerar imagem: $e')),
      );
      return null;
    } finally {
      if (mounted) {
        setState(() {
          _busy = false;
          _busyLabel = '';
        });
      }
    }
  }

  Future<void> _compartilharImagem() async {
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    final result = await _gerarImagem();
    if (result == null) return;
    try {
      await VerseShareService.shareFile(
        result.filePath,
        text: _textoFormatado,
        subject: _referenciaCurta,
      );
      navigator.pop();
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Nao foi possivel compartilhar: $e')),
      );
    }
  }

  Future<void> _salvarNaGaleria() async {
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    final result = await _gerarImagem();
    if (result == null) return;
    try {
      await VerseImageService.saveToGallery(result);
      messenger.showSnackBar(
        const SnackBar(content: Text('Imagem salva na galeria.')),
      );
      navigator.pop();
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Nao foi possivel salvar: $e')),
      );
    }
  }

  Future<void> _abrirRede({
    required String Function(String texto, String? url) urlBuilder,
    required String nome,
  }) async {
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    final url = urlBuilder(_textoFormatado, widget.verse.link);
    try {
      final uri = Uri.parse(url);
      await launchUrl(uri, mode: LaunchMode.externalApplication);
      navigator.pop();
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Nao foi possivel abrir $nome: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final mediaQuery = MediaQuery.of(context);
    final maxHeight = mediaQuery.size.height * 0.9;

    return SafeArea(
      top: false,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxHeight: maxHeight),
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  Icon(Icons.share, color: theme.colorScheme.primary),
                  const SizedBox(width: 10),
                  Text(
                    'Compartilhar $_referenciaCurta',
                    style: theme.textTheme.titleLarge,
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _PreviewCard(
                style: _style,
                format: _format,
                showQr: _showQr,
                busy: _busy,
                busyLabel: _busyLabel,
                previewPath: _previewPath,
                onRegenerate: () => _gerarImagem(cacheOnly: true),
              ),
              const SizedBox(height: 20),
              Text(
                'Formato',
                style: theme.textTheme.labelLarge,
              ),
              const SizedBox(height: 8),
              _FormatSelector(
                format: _format,
                onChanged: (f) {
                  setState(() => _format = f);
                  if (_previewPath != null) {
                    _gerarImagem(cacheOnly: true);
                  }
                },
              ),
              const SizedBox(height: 20),
              Text(
                'Estilo da imagem',
                style: theme.textTheme.labelLarge,
              ),
              const SizedBox(height: 8),
              _StyleSelector(
                current: _style,
                onChanged: (s) {
                  setState(() => _style = s);
                  if (_previewPath != null) {
                    _gerarImagem(cacheOnly: true);
                  }
                },
              ),
              const SizedBox(height: 12),
              SwitchListTile(
                value: _showQr,
                onChanged: (v) {
                  setState(() => _showQr = v);
                  if (_previewPath != null) {
                    _gerarImagem(cacheOnly: true);
                  }
                },
                title: const Text('Incluir QR code do link'),
                subtitle: const Text('Leitura via camera do celular'),
                contentPadding: EdgeInsets.zero,
              ),
              const Divider(height: 32),
              _buildAction(
                context,
                icon: Icons.image_outlined,
                label: 'Compartilhar imagem',
                description: 'Gera a arte e abre o menu nativo.',
                onTap: _busy ? null : _compartilharImagem,
                color: theme.colorScheme.primary,
                textColor: theme.colorScheme.onPrimary,
                filled: true,
              ),
              const SizedBox(height: 10),
              _buildAction(
                context,
                icon: Icons.save_alt,
                label: 'Salvar na galeria',
                description: 'Baixa a imagem para o rolo da camera.',
                onTap: _busy ? null : _salvarNaGaleria,
              ),
              const SizedBox(height: 10),
              _buildAction(
                context,
                icon: Icons.text_snippet_outlined,
                label: 'Compartilhar texto',
                description: 'Mensagem formatada com link do site.',
                onTap: _compartilharTexto,
              ),
              const SizedBox(height: 10),
              _buildAction(
                context,
                icon: Icons.copy,
                label: 'Copiar',
                description: 'Copia o texto para a area de transferencia.',
                onTap: _copiarTexto,
              ),
              const SizedBox(height: 20),
              Text(
                'Redes sociais',
                style: theme.textTheme.labelLarge,
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: _buildSocialButton(
                      context,
                      label: 'WhatsApp',
                      color: const Color(0xFF25D366),
                      iconData: Icons.chat,
                      onTap: () => _abrirRede(
                        nome: 'WhatsApp',
                        urlBuilder: (t, _) => VerseShareService.whatsappUrl(t),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildSocialButton(
                      context,
                      label: 'Telegram',
                      color: const Color(0xFF229ED9),
                      iconData: Icons.send,
                      onTap: () => _abrirRede(
                        nome: 'Telegram',
                        urlBuilder: (t, u) => VerseShareService.telegramUrl(
                          text: t,
                          url: u,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildSocialButton(
                      context,
                      label: 'X / Twitter',
                      color: const Color(0xFF0F1419),
                      iconData: Icons.alternate_email,
                      onTap: () => _abrirRede(
                        nome: 'X',
                        urlBuilder: (t, u) => VerseShareService.twitterUrl(
                          text: t,
                          url: u,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildSocialButton(
                      context,
                      label: 'Facebook',
                      color: const Color(0xFF1877F2),
                      iconData: Icons.facebook,
                      onTap: () => _abrirRede(
                        nome: 'Facebook',
                        urlBuilder: (_, u) => VerseShareService.facebookUrl(
                          url: u ?? VerseShareService.webOrigin,
                          quote: _textoFormatado,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAction(
    BuildContext context, {
    required IconData icon,
    required String label,
    required String description,
    required VoidCallback? onTap,
    Color? color,
    Color? textColor,
    bool filled = false,
  }) {
    final theme = Theme.of(context);
    final bg = filled
        ? (color ?? theme.colorScheme.primary)
        : theme.colorScheme.surfaceContainerHighest;
    final fg = filled
        ? (textColor ?? theme.colorScheme.onPrimary)
        : theme.colorScheme.onSurface;
    return Material(
      color: bg,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Icon(icon, color: fg, size: 22),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      label,
                      style: theme.textTheme.titleSmall?.copyWith(
                        color: fg,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      description,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: fg.withValues(alpha: 0.75),
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, color: fg.withValues(alpha: 0.6)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSocialButton(
    BuildContext context, {
    required String label,
    required Color color,
    required IconData iconData,
    required VoidCallback onTap,
  }) {
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(iconData, color: Colors.white, size: 22),
              const SizedBox(height: 4),
              Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PreviewCard extends StatelessWidget {
  final VerseImageStyle style;
  final VerseImageFormat format;
  final bool showQr;
  final bool busy;
  final String busyLabel;
  final String? previewPath;
  final VoidCallback onRegenerate;

  const _PreviewCard({
    required this.style,
    required this.format,
    required this.showQr,
    required this.busy,
    required this.busyLabel,
    required this.previewPath,
    required this.onRegenerate,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final aspect = format == VerseImageFormat.square
        ? 1.0
        : 9 / 16;
    final palette = VerseImagePalette.forStyle(style);

    return Center(
      child: AspectRatio(
        aspectRatio: aspect,
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: palette.gradient,
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(18),
            boxShadow: [
              BoxShadow(
                color: theme.colorScheme.shadow.withValues(alpha: 0.15),
                blurRadius: 16,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            fit: StackFit.expand,
            children: [
              if (previewPath != null)
                Image.file(
                  File(previewPath!),
                  fit: BoxFit.cover,
                )
              else
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.image_outlined,
                        color: palette.text.withValues(alpha: 0.5),
                        size: 48,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Toque em "Compartilhar imagem" para gerar',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: palette.text.withValues(alpha: 0.7),
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ),
              if (busy)
                Container(
                  color: Colors.black54,
                  alignment: Alignment.center,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const CircularProgressIndicator(
                        valueColor:
                            AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        busyLabel,
                        style: const TextStyle(color: Colors.white),
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
}

class _FormatSelector extends StatelessWidget {
  final VerseImageFormat format;
  final ValueChanged<VerseImageFormat> onChanged;

  const _FormatSelector({required this.format, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    Widget buildChip(String label, VerseImageFormat value) {
      final selected = format == value;
      return Expanded(
        child: GestureDetector(
          onTap: () => onChanged(value),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            padding: const EdgeInsets.symmetric(vertical: 10),
            decoration: BoxDecoration(
              color: selected
                  ? theme.colorScheme.primary
                  : theme.colorScheme.surfaceContainerHighest,
              borderRadius: BorderRadius.circular(10),
            ),
            alignment: Alignment.center,
            child: Text(
              label,
              style: TextStyle(
                color: selected
                    ? theme.colorScheme.onPrimary
                    : theme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
                fontSize: 13,
              ),
            ),
          ),
        ),
      );
    }

    return Row(
      children: [
        buildChip('Quadrado 1:1', VerseImageFormat.square),
        const SizedBox(width: 8),
        buildChip('Story 9:16', VerseImageFormat.story),
      ],
    );
  }
}

class _StyleSelector extends StatelessWidget {
  final VerseImageStyle current;
  final ValueChanged<VerseImageStyle> onChanged;

  const _StyleSelector({required this.current, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SizedBox(
      height: 64,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: VerseImageStyle.values.length,
        separatorBuilder: (_, __) => const SizedBox(width: 10),
        itemBuilder: (context, i) {
          final s = VerseImageStyle.values[i];
          final palette = VerseImagePalette.forStyle(s);
          final selected = current == s;
          return GestureDetector(
            onTap: () => onChanged(s),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              width: 88,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: palette.gradient,
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: selected
                      ? theme.colorScheme.primary
                      : Colors.transparent,
                  width: 2,
                ),
              ),
              alignment: Alignment.center,
              child: Text(
                s.label,
                style: TextStyle(
                  color: palette.text,
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.4,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
