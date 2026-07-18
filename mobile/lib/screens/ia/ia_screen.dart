import 'dart:async';

import 'package:flutter/material.dart';

import '../../services/ia_service.dart';
import 'chat_bubble.dart';
import 'suggested_questions.dart';

class MensagemChat {
  final String conteudo;
  final bool isUser;
  final DateTime timestamp;
  final bool isLoading;
  final String? erro;

  MensagemChat({
    required this.conteudo,
    required this.isUser,
    DateTime? timestamp,
    this.isLoading = false,
    this.erro,
  }) : timestamp = timestamp ?? DateTime.now();

  MensagemChat copyWith({
    String? conteudo,
    bool? isUser,
    DateTime? timestamp,
    bool? isLoading,
    String? erro,
  }) {
    return MensagemChat(
      conteudo: conteudo ?? this.conteudo,
      isUser: isUser ?? this.isUser,
      timestamp: timestamp ?? this.timestamp,
      isLoading: isLoading ?? this.isLoading,
      erro: erro ?? this.erro,
    );
  }
}

class IaScreen extends StatefulWidget {
  final IaService iaService;

  const IaScreen({super.key, required this.iaService});

  @override
  State<IaScreen> createState() => _IaScreenState();
}

class _IaScreenState extends State<IaScreen> {
  final TextEditingController _inputController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final List<MensagemChat> _mensagens = [];
  bool _isGenerating = false;
  StreamSubscription<String>? _streamSubscription;

  static const _perguntasSugeridas = [
    'Explane Romanos 8:28',
    'Quem escreveu a Epistola aos Hebreus?',
    'Qual e o contexto historico de Efesios?',
    'O que a Biblia diz sobre o amor?',
    'Resuma o Livro de Proverbios',
    'Quais sao os frutos do Esprito Santo?',
    'Explique a parabola do filho pródigo',
    'O que significa "fia pela fia"?',
  ];

  @override
  void initState() {
    super.initState();
    _mensagens.add(MensagemChat(
      conteudo: 'Ola! Sou o assistente de estudo biblico da Sola Scriptura.\n\n'
          'Posso ajudar com:\n'
          '- Explicacao de versiculos\n'
          '- Contexto historico\n'
          '- Estudo teologico\n'
          '- Resumos de livros biblicos\n\n'
          'Como posso ajudar?',
      isUser: false,
    ));
  }

  @override
  void dispose() {
    _streamSubscription?.cancel();
    _inputController.dispose();
    _scrollController.dispose();
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

  Future<void> _enviarMensagem(String texto) async {
    if (texto.trim().isEmpty || _isGenerating) return;

    final pergunta = texto.trim();
    _inputController.clear();

    setState(() {
      _mensagens.add(MensagemChat(conteudo: pergunta, isUser: true));
      _isGenerating = true;
      _mensagens.add(MensagemChat(
        conteudo: '',
        isUser: false,
        isLoading: true,
      ));
    });
    _scrollToBottom();

    try {
      final resposta = StringBuffer();

      _streamSubscription?.cancel();
      _streamSubscription = widget.iaService.streamPergunta(pergunta).listen(
        (chunk) {
          resposta.write(chunk);
          setState(() {
            final idx = _mensagens.length - 1;
            _mensagens[idx] = _mensagens[idx].copyWith(
              conteudo: resposta.toString(),
              isLoading: false,
            );
          });
          _scrollToBottom();
        },
        onError: (error) {
          setState(() {
            final idx = _mensagens.length - 1;
            _mensagens[idx] = _mensagens[idx].copyWith(
              conteudo: 'Erro ao gerar resposta.',
              isLoading: false,
              erro: error.toString(),
            );
            _isGenerating = false;
          });
        },
        onDone: () {
          if (mounted) {
            setState(() => _isGenerating = false);
          }
        },
        cancelOnError: true,
      );
    } catch (e) {
      setState(() {
        final idx = _mensagens.length - 1;
        _mensagens[idx] = _mensagens[idx].copyWith(
          conteudo: 'Erro ao conectar com o servidor.',
          isLoading: false,
          erro: e.toString(),
        );
        _isGenerating = false;
      });
    }
  }

  void _reenviar(int index) {
    if (index < 2) return;
    final pergunta = _mensagens[index - 1].conteudo;
    setState(() {
      _mensagens.removeRange(index - 1, _mensagens.length);
    });
    _enviarMensagem(pergunta);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Assistente IA'),
        actions: [
          if (_mensagens.length > 1)
            IconButton(
              icon: const Icon(Icons.delete_outline),
              tooltip: 'Limpar conversa',
              onPressed: () {
                setState(() {
                  _mensagens.clear();
                  _mensagens.add(MensagemChat(
                    conteudo: 'Conversa reiniciada. Como posso ajudar?',
                    isUser: false,
                  ));
                });
              },
            ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: _mensagens.length <= 1
                ? _buildEmptyChat(theme)
                : _buildMessageList(theme),
          ),
          _buildInputBar(theme),
        ],
      ),
    );
  }

  Widget _buildEmptyChat(ThemeData theme) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const SizedBox(height: 32),
        Icon(
          Icons.auto_awesome,
          size: 64,
          color: theme.colorScheme.primary.withOpacity(0.6),
        ),
        const SizedBox(height: 16),
        Text(
          'Pergunte qualquer coisa sobre a Biblia',
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          'A IA vai ajudar com explicacoes, contexto e estudo',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        SuggestedQuestions(
          perguntas: _perguntasSugeridas,
          onPerguntaSelecionada: _enviarMensagem,
        ),
      ],
    );
  }

  Widget _buildMessageList(ThemeData theme) {
    return ListView.builder(
      controller: _scrollController,
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: _mensagens.length,
      itemBuilder: (context, index) {
        final msg = _mensagens[index];
        return ChatBubble(
          conteudo: msg.conteudo,
          isUser: msg.isUser,
          timestamp: msg.timestamp,
          isLoading: msg.isLoading,
          erro: msg.erro,
          onRetry: msg.erro != null ? () => _reenviar(index) : null,
        );
      },
    );
  }

  Widget _buildInputBar(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        border: Border(
          top: BorderSide(
            color: theme.dividerColor.withOpacity(0.3),
          ),
        ),
      ),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _inputController,
                enabled: !_isGenerating,
                textInputAction: TextInputAction.send,
                maxLines: 4,
                minLines: 1,
                decoration: InputDecoration(
                  hintText: 'Digite sua pergunta...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 10,
                  ),
                ),
                onSubmitted: _enviarMensagem,
              ),
            ),
            const SizedBox(width: 8),
            CircleAvatar(
              backgroundColor: _isGenerating
                  ? theme.colorScheme.surfaceContainerHighest
                  : theme.colorScheme.primary,
              child: IconButton(
                icon: _isGenerating
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Icon(Icons.send, color: Colors.white, size: 20),
                onPressed: _isGenerating
                    ? null
                    : () => _enviarMensagem(_inputController.text),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
