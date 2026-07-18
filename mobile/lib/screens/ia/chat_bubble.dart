import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

enum ChatSender { user, ai }

class ChatBubble extends StatelessWidget {
  final String conteudo;
  final bool isUser;
  final DateTime? timestamp;
  final bool isLoading;
  final String? erro;
  final VoidCallback? onRetry;

  const ChatBubble({
    super.key,
    required this.conteudo,
    required this.isUser,
    this.timestamp,
    this.isLoading = false,
    this.erro,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.82,
        ),
        margin: EdgeInsets.only(
          left: isUser ? 48 : 12,
          right: isUser ? 12 : 48,
          top: 4,
          bottom: 4,
        ),
        child: Column(
          crossAxisAlignment:
              isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: isUser
                    ? theme.colorScheme.primary
                    : theme.colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(16),
                  topRight: const Radius.circular(16),
                  bottomLeft: Radius.circular(isUser ? 16 : 4),
                  bottomRight: Radius.circular(isUser ? 4 : 16),
                ),
              ),
              child: _buildContent(theme),
            ),
            _buildFooter(theme),
          ],
        ),
      ),
    );
  }

  Widget _buildContent(ThemeData theme) {
    if (isLoading) {
      return _LoadingIndicator(theme: theme);
    }

    if (erro != null) {
      return _ErrorContent(
        erro: erro!,
        onRetry: onRetry,
        theme: theme,
      );
    }

    if (isUser) {
      return Text(
        conteudo,
        style: TextStyle(
          color: theme.colorScheme.onPrimary,
          fontSize: 15,
          height: 1.4,
        ),
      );
    }

    return MarkdownBody(
      data: conteudo,
      styleSheet: MarkdownStyleSheet(
        p: TextStyle(
          color: theme.colorScheme.onSurfaceVariant,
          fontSize: 15,
          height: 1.5,
        ),
        code: TextStyle(
          backgroundColor: theme.colorScheme.surfaceContainerHigh,
          color: theme.colorScheme.primary,
          fontSize: 13,
        ),
        codeblockDecoration: BoxDecoration(
          color: theme.colorScheme.surfaceContainerHigh,
          borderRadius: BorderRadius.circular(8),
        ),
        blockquote: TextStyle(
          color: theme.colorScheme.onSurfaceVariant.withOpacity(0.8),
        ),
        h1: TextStyle(
          color: theme.colorScheme.onSurfaceVariant,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
        h2: TextStyle(
          color: theme.colorScheme.onSurfaceVariant,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
        h3: TextStyle(
          color: theme.colorScheme.onSurfaceVariant,
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
        listBullet: TextStyle(
          color: theme.colorScheme.onSurfaceVariant,
        ),
      ),
    );
  }

  Widget _buildFooter(ThemeData theme) {
    if (isLoading || erro != null) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (timestamp != null)
            Text(
              '${timestamp!.hour.toString().padLeft(2, '0')}:${timestamp!.minute.toString().padLeft(2, '0')}',
              style: TextStyle(
                fontSize: 11,
                color: theme.colorScheme.onSurfaceVariant.withOpacity(0.5),
              ),
            ),
          if (!isUser && conteudo.isNotEmpty) ...[
            const SizedBox(width: 4),
            _FooterAction(
              icon: Icons.copy_rounded,
              tooltip: 'Copiar',
              onTap: () {
                Clipboard.setData(ClipboardData(text: conteudo));
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Copiado'),
                    duration: Duration(seconds: 1),
                  ),
                );
              },
            ),
            const SizedBox(width: 2),
            _FooterAction(
              icon: Icons.share_rounded,
              tooltip: 'Compartilhar',
              onTap: () {
                // Share functionality placeholder
              },
            ),
          ],
        ],
      ),
    );
  }
}

class _LoadingIndicator extends StatelessWidget {
  final ThemeData theme;

  const _LoadingIndicator({required this.theme});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 16,
          height: 16,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            color: theme.colorScheme.primary,
          ),
        ),
        const SizedBox(width: 10),
        Text(
          'Gerando resposta...',
          style: TextStyle(
            color: theme.colorScheme.onSurfaceVariant.withOpacity(0.7),
            fontSize: 14,
            fontStyle: FontStyle.italic,
          ),
        ),
      ],
    );
  }
}

class _ErrorContent extends StatelessWidget {
  final String erro;
  final VoidCallback? onRetry;
  final ThemeData theme;

  const _ErrorContent({
    required this.erro,
    this.onRetry,
    required this.theme,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.error_outline, size: 16, color: theme.colorScheme.error),
            const SizedBox(width: 6),
            Flexible(
              child: Text(
                erro,
                style: TextStyle(
                  color: theme.colorScheme.error,
                  fontSize: 14,
                ),
              ),
            ),
          ],
        ),
        if (onRetry != null) ...[
          const SizedBox(height: 6),
          TextButton.icon(
            onPressed: onRetry,
            icon: const Icon(Icons.refresh, size: 16),
            label: const Text('Tentar novamente'),
            style: TextButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              minimumSize: Size.zero,
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
          ),
        ],
      ],
    );
  }
}

class _FooterAction extends StatelessWidget {
  final IconData icon;
  final String tooltip;
  final VoidCallback onTap;

  const _FooterAction({
    required this.icon,
    required this.tooltip,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Tooltip(
      message: tooltip,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(2),
          child: Icon(
            icon,
            size: 14,
            color: theme.colorScheme.onSurfaceVariant.withOpacity(0.5),
          ),
        ),
      ),
    );
  }
}
