import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../models/traducao.dart';
import '../../services/audio_service.dart';
import '../../services/api_client.dart';

class AudioPlayerScreen extends StatefulWidget {
  final String livro;
  final int capitulo;
  final String traducao;

  const AudioPlayerScreen({
    super.key,
    required this.livro,
    required this.capitulo,
    required this.traducao,
  });

  @override
  State<AudioPlayerScreen> createState() => _AudioPlayerScreenState();
}

class _AudioPlayerScreenState extends State<AudioPlayerScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animacaoController;
  late Animation<double> _animacaoRotacao;

  bool _carregando = false;
  String? _audioUrl;
  bool _audioDisponivel = false;
  String _traducaoSelecionada = '';

  @override
  void initState() {
    super.initState();
    _traducaoSelecionada = widget.traducao;
    _animacaoController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );
    _animacaoRotacao = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _animacaoController, curve: Curves.linear),
    );
    _carregarAudio();
  }

  @override
  void dispose() {
    _animacaoController.dispose();
    super.dispose();
  }

  Future<void> _carregarAudio() async {
    setState(() {
      _carregando = true;
      _audioDisponivel = false;
      _audioUrl = null;
    });

    try {
      final apiClient = ApiClient();
      final service = AudioService(apiClient);
      final audioInfo = await service.getAudioCapitulo(
        livro: widget.livro,
        capitulo: widget.capitulo,
        traducao: _traducaoSelecionada,
      );

      if (mounted) {
        setState(() {
          _carregando = false;
          if (audioInfo != null && audioInfo.url.isNotEmpty) {
            _audioUrl = audioInfo.url;
            _audioDisponivel = true;
          }
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _carregando = false;
          _audioDisponivel = false;
        });
      }
    }
  }

  Future<void> _abrirAudio() async {
    if (_audioUrl == null) return;

    final uri = Uri.parse(_audioUrl!);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Não foi possível abrir o áudio')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final livroNome = _nomeLivro(widget.livro);

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Áudio Bíblico', style: TextStyle(fontSize: 18)),
            Text(
              '$livroNome ${widget.capitulo}',
              style: theme.textTheme.bodySmall,
            ),
          ],
        ),
      ),
      body: _carregando
          ? const Center(child: CircularProgressIndicator())
          : _buildPlayer(theme),
    );
  }

  Widget _buildPlayer(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const Spacer(),
          // Disc animation
          AnimatedBuilder(
            animation: _animacaoRotacao,
            builder: (context, child) {
              return Transform.rotate(
                angle: _animacaoRotacao.value * 6.283185307,
                child: child,
              );
            },
            child: Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [
                    theme.colorScheme.primary,
                    theme.colorScheme.primary.withValues(alpha: 0.6),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: theme.colorScheme.primary.withValues(alpha: 0.3),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Center(
                child: Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: theme.scaffoldBackgroundColor,
                  ),
                  child: Icon(
                    _audioDisponivel ? Icons.headphones : Icons.headphones_outlined,
                    color: _audioDisponivel
                        ? theme.colorScheme.primary
                        : theme.colorScheme.onSurfaceVariant,
                    size: 32,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 40),
          // Info
          Text(
            _nomeLivro(widget.livro),
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Capítulo ${widget.capitulo}',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.6),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            Traducoes.porId(_traducaoSelecionada)?.nome ?? _traducaoSelecionada.toUpperCase(),
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.primary,
            ),
          ),
          const Spacer(),
          // Audio status
          if (_audioDisponivel) ...[
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Icon(
                    Icons.music_note,
                    color: theme.colorScheme.primary,
                    size: 32,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Áudio disponível!',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Toque no botão abaixo para ouvir no navegador.',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: _abrirAudio,
                icon: const Icon(Icons.play_arrow),
                label: const Text('Ouvir Áudio'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
          ] else ...[
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Icon(
                    Icons.hourglass_empty,
                    color: theme.colorScheme.onSurfaceVariant,
                    size: 32,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Áudio em breve',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'O áudio para esta tradução ainda não está disponível. Tente outra tradução ou volte mais tarde.',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          ],
          const SizedBox(height: 24),
          // Translation selector
          OutlinedButton.icon(
            onPressed: _mostrarSelecaoTraducao,
            icon: const Icon(Icons.translate, size: 18),
            label: Text(
              Traducoes.porId(_traducaoSelecionada)?.nome ?? _traducaoSelecionada.toUpperCase(),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  void _mostrarSelecaoTraducao() {
    showModalBottomSheet(
      context: context,
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                'Selecionar Tradução',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
            ),
            ...Traducoes.lista.map((t) => ListTile(
                  leading: Radio<String>(
                    value: t.id,
                    groupValue: _traducaoSelecionada,
                    onChanged: (v) {
                      if (v != null) {
                        Navigator.of(ctx).pop();
                        setState(() => _traducaoSelecionada = v);
                        _carregarAudio();
                      }
                    },
                  ),
                  title: Text(t.nome),
                  subtitle: Text(t.abreviacao),
                  onTap: () {
                    Navigator.of(ctx).pop();
                    setState(() => _traducaoSelecionada = t.id);
                    _carregarAudio();
                  },
                )),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  String _nomeLivro(String abrev) {
    const nomes = {
      'gn': 'Gênesis', 'ex': 'Êxodo', 'lv': 'Levítico', 'nm': 'Números',
      'dt': 'Deuteronômio', 'js': 'Josué', 'jz': 'Juízes', 'rt': 'Rute',
      '1sm': '1 Samuel', '2sm': '2 Samuel', '1rs': '1 Reis', '2rs': '2 Reis',
      '1cr': '1 Crônicas', '2cr': '2 Crônicas', 'ed': 'Esdras', 'ne': 'Neemias',
      'et': 'Ester', 'jó': 'Jó', 'sl': 'Salmos', 'pv': 'Provérbios',
      'ec': 'Eclesiastes', 'ct': 'Cantares', 'is': 'Isaías', 'jr': 'Jeremias',
      'lm': 'Lamentações', 'ez': 'Ezequiel', 'dn': 'Daniel', 'os': 'Oseias',
      'jl': 'Joel', 'am': 'Amós', 'ob': 'Obadias', 'jn': 'Jonas',
      'mq': 'Miquéias', 'na': 'Naum', 'hc': 'Habacuque', 'sf': 'Sofonias',
      'ag': 'Ageu', 'zc': 'Zacarias', 'ml': 'Malaquias',
      'mt': 'Mateus', 'mc': 'Marcos', 'lc': 'Lucas', 'jo': 'João',
      'at': 'Atos', 'rm': 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios',
      'gl': 'Gálatas', 'ef': 'Efésios', 'fp': 'Filipenses', 'cl': 'Colossenses',
      '1ts': '1 Tessalonicenses', '2ts': '2 Tessalonicenses',
      '1tm': '1 Timóteo', '2tm': '2 Timóteo', 'tt': 'Tito', 'fm': 'Filêmon',
      'hb': 'Hebreus', 'tg': 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
      '1jo': '1 João', '2jo': '2 João', '3jo': '3 João', 'jd': 'Judas',
      'ap': 'Apocalipse',
    };
    return nomes[abrev] ?? abrev;
  }
}
