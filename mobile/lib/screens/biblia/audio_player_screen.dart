import 'package:flutter/material.dart';

import '../../models/audio.dart';
import '../../models/traducao.dart';
import '../../services/audio_service.dart';
import '../../services/api_client.dart';
import '../../config/api_config.dart';

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

  AudioInfo? _audioInfo;
  bool _tocando = false;
  bool _carregando = false;
  String? _erro;
  double _velocidade = 1.0;
  Duration _duracaoTotal = const Duration(minutes: 5);
  Duration _posicaoAtual = Duration.zero;
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
      _erro = null;
    });

    try {
      final apiClient = ApiClient(ApiConfig.baseUrl);
      final service = AudioService(apiClient);
      final audio = await service.getAudioCapitulo(
        livro: widget.livro,
        capitulo: widget.capitulo,
        traducao: _traducaoSelecionada,
      );

      if (mounted) {
        setState(() {
          _audioInfo = audio;
          _carregando = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _erro = e.toString();
          _carregando = false;
        });
      }
    }
  }

  void _togglePlayPause() {
    setState(() {
      _tocando = !_tocando;
    });
    if (_tocando) {
      _animacaoController.repeat();
      _simularProgresso();
    } else {
      _animacaoController.stop();
    }
  }

  void _simularProgresso() {
    Future.delayed(const Duration(seconds: 1), () {
      if (_tocando && mounted) {
        setState(() {
          _posicaoAtual += Duration(seconds: (1 * _velocidade).round());
          if (_posicaoAtual >= _duracaoTotal) {
            _posicaoAtual = _duracaoTotal;
            _tocando = false;
            _animacaoController.stop();
          }
        });
        if (_tocando) _simularProgresso();
      }
    });
  }

  void _seek(Duration posicao) {
    setState(() {
      _posicaoAtual = posicao;
    });
  }

  void _alterarVelocidade() {
    final velocidades = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    final idx = velocidades.indexOf(_velocidade);
    final nova = velocidades[(idx + 1) % velocidades.length];
    setState(() {
      _velocidade = nova;
    });
  }

  String _formatarDuracao(Duration d) {
    final min = d.inMinutes;
    final seg = d.inSeconds % 60;
    return '${min.toString().padLeft(2, '0')}:${seg.toString().padLeft(2, '0')}';
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
          : _erro != null
              ? _buildErro(theme)
              : _buildPlayer(theme),
    );
  }

  Widget _buildErro(ThemeData theme) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.headphones_off, size: 48, color: Colors.red),
            const SizedBox(height: 16),
            Text('Erro ao carregar áudio:', style: theme.textTheme.bodyLarge),
            const SizedBox(height: 8),
            Text(_erro!, style: theme.textTheme.bodySmall, textAlign: TextAlign.center),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: _carregarAudio,
              icon: const Icon(Icons.refresh),
              label: const Text('Tentar novamente'),
            ),
          ],
        ),
      ),
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
                    theme.colorScheme.primary.withOpacity(0.6),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: theme.colorScheme.primary.withOpacity(0.3),
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
                    Icons.headphones,
                    color: theme.colorScheme.primary,
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
              color: theme.colorScheme.onSurface.withOpacity(0.6),
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
          // Progress
          Column(
            children: [
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  trackHeight: 4,
                  thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
                ),
                child: Slider(
                  value: _posicaoAtual.inSeconds.toDouble(),
                  min: 0,
                  max: _duracaoTotal.inSeconds.toDouble(),
                  onChanged: (v) => _seek(Duration(seconds: v.round())),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      _formatarDuracao(_posicaoAtual),
                      style: theme.textTheme.bodySmall,
                    ),
                    Text(
                      _formatarDuracao(_duracaoTotal),
                      style: theme.textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Controls
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                icon: const Icon(Icons.replay_10),
                iconSize: 32,
                tooltip: 'Retroceder 10s',
                onPressed: () {
                  _seek(Duration(
                    seconds: (_posicaoAtual.inSeconds - 10).clamp(
                      0,
                      _duracaoTotal.inSeconds,
                    ),
                  ));
                },
              ),
              const SizedBox(width: 16),
              Container(
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary,
                  shape: BoxShape.circle,
                ),
                child: IconButton(
                  icon: Icon(
                    _tocando ? Icons.pause : Icons.play_arrow,
                    color: Colors.white,
                  ),
                  iconSize: 48,
                  tooltip: _tocando ? 'Pausar' : 'Reproduzir',
                  onPressed: _togglePlayPause,
                ),
              ),
              const SizedBox(width: 16),
              IconButton(
                icon: const Icon(Icons.forward_30),
                iconSize: 32,
                tooltip: 'Avançar 30s',
                onPressed: () {
                  _seek(Duration(
                    seconds: (_posicaoAtual.inSeconds + 30).clamp(
                      0,
                      _duracaoTotal.inSeconds,
                    ),
                  ));
                },
              ),
            ],
          ),
          const SizedBox(height: 24),
          // Speed + Translation
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton.icon(
                onPressed: _alterarVelocidade,
                icon: const Icon(Icons.speed, size: 18),
                label: Text('${_velocidade}x'),
              ),
              const SizedBox(width: 16),
              OutlinedButton.icon(
                onPressed: _mostrarSelecaoTraducao,
                icon: const Icon(Icons.translate, size: 18),
                label: Text(_traducaoSelecionada.toUpperCase()),
              ),
            ],
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
                      Navigator.of(ctx).pop();
                      setState(() => _traducaoSelecionada = v!);
                      _carregarAudio();
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
      'mt': 'Mateus', 'mc': 'Marcos', 'lc': 'Lucas', 'jo': 'João',
      'at': 'Atos', 'rm': 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios',
      'gl': 'Gálatas', 'ef': 'Efésios', 'fp': 'Filipenses', 'cl': 'Colossenses',
      'hb': 'Hebreus', 'tg': 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
      '1jo': '1 João', 'ap': 'Apocalipse', 'sl': 'Salmos', 'pv': 'Provérbios',
      'is': 'Isaías', 'jr': 'Jeremias', 'dn': 'Daniel',
    };
    return nomes[abrev] ?? abrev;
  }
}
