import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';

class MaisScreen extends StatelessWidget {
  const MaisScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = Provider.of<AuthProvider>(context);
    final usuario = auth.currentUser;

    return ListView(
      padding: const EdgeInsets.symmetric(vertical: 8),
      children: [
        if (usuario != null)
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 28,
                  backgroundColor: theme.colorScheme.primary.withValues(alpha: 0.1),
                  backgroundImage: usuario.avatar != null
                      ? NetworkImage(usuario.avatar!)
                      : null,
                  child: usuario.avatar == null
                      ? Icon(
                          Icons.person,
                          size: 28,
                          color: theme.colorScheme.primary,
                        )
                      : null,
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        usuario.nome,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        usuario.email,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.chevron_right,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ],
            ),
          ),
        const Divider(height: 1),
        _MenuItem(
          icon: Icons.person_outline,
          title: 'Minha Conta',
          subtitle: 'Perfil e configuracoes pessoais',
          onTap: () => context.push('/conta'),
        ),
        _MenuItem(
          icon: Icons.settings_outlined,
          title: 'Configuracoes',
          subtitle: 'Tema, fonte e preferencias',
          onTap: () => context.push('/configuracoes'),
        ),
        _MenuItem(
          icon: Icons.bookmark_outline,
          title: 'Favoritos',
          subtitle: 'Versiculos salvos',
          onTap: () => context.push('/favoritos'),
        ),
        _MenuItem(
          icon: Icons.format_color_fill,
          title: 'Destaques',
          subtitle: 'Versiculos marcados em cores',
          onTap: () => context.push('/destaques'),
        ),
        _MenuItem(
          icon: Icons.note_outlined,
          title: 'Notas',
          subtitle: 'Anotacoes pessoais',
          onTap: () => context.push('/notas'),
        ),
        _MenuItem(
          icon: Icons.bookmarks_outlined,
          title: 'Marcadores',
          subtitle: 'Marcadores com notas',
          onTap: () => context.push('/marcadores'),
        ),
        _MenuItem(
          icon: Icons.calendar_today_outlined,
          title: 'Planos de Leitura',
          subtitle: 'Acompanhe seu progresso',
          onTap: () => context.push('/planos'),
        ),
        const Divider(height: 1),
        _MenuItem(
          icon: Icons.info_outline,
          title: 'Sobre',
          subtitle: 'Sobre o Sola Scriptura BR',
          onTap: () => _mostrarSobre(context),
        ),
        _MenuItem(
          icon: Icons.logout,
          title: 'Sair',
          subtitle: 'Encerrar sessao',
          color: theme.colorScheme.error,
          onTap: () => _confirmarSaida(context),
        ),
      ],
    );
  }

  void _mostrarSobre(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Sola Scriptura BR'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Versao 0.1.0'),
            SizedBox(height: 8),
            Text(
              'Plataforma de estudo biblico academico completo. '
              'Explore a Biblia em multiplas traducoes, estude hebraico e grego, '
              'e aprofunde-se na Palavra de Deus.',
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Fechar'),
          ),
        ],
      ),
    );
  }

  void _confirmarSaida(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Sair'),
        content: const Text('Tem certeza que deseja encerrar a sessao?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              Provider.of<AuthProvider>(context, listen: false).logout();
              context.go('/login');
            },
            child: const Text('Sair'),
          ),
        ],
      ),
    );
  }
}

class _MenuItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  final Color? color;

  const _MenuItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final itemColor = color ?? theme.colorScheme.onSurface;

    return ListTile(
      leading: Icon(icon, color: itemColor),
      title: Text(
        title,
        style: TextStyle(color: itemColor),
      ),
      subtitle: Text(
        subtitle,
        style: TextStyle(
          color: color != null
              ? itemColor.withValues(alpha: 0.7)
              : theme.colorScheme.onSurfaceVariant,
          fontSize: 12,
        ),
      ),
      trailing: Icon(
        Icons.chevron_right,
        color: theme.colorScheme.onSurfaceVariant,
      ),
      onTap: onTap,
    );
  }
}
