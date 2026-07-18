import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/tema_provider.dart';
import '../theme/app_theme.dart';

class AppDrawer extends StatelessWidget {
  final String? userName;
  final String? userEmail;
  final String? avatarUrl;

  const AppDrawer({
    super.key,
    this.userName,
    this.userEmail,
    this.avatarUrl,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tema = Provider.of<TemaProvider>(context);

    return Drawer(
      child: SafeArea(
        child: Column(
          children: [
            _buildHeader(context, theme),
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  _buildSection(
                    context,
                    title: 'Biblia',
                    items: [
                      _DrawerItem(
                        icon: Icons.menu_book,
                        label: 'Leitura',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/biblia');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.search,
                        label: 'Pesquisa',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/pesquisa');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.translate,
                        label: 'Idiomas',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/idiomas');
                        },
                      ),
                    ],
                  ),
                  _buildSection(
                    context,
                    title: 'Estudos',
                    items: [
                      _DrawerItem(
                        icon: Icons.auto_stories,
                        label: 'Exegese',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/exegese');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.account_tree,
                        label: 'Teologia',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/teologia');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.history_edu,
                        label: 'Historia',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/historia');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.person_search,
                        label: 'Personagens',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/personagens');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.timeline,
                        label: 'Cronologia',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/cronologia');
                        },
                      ),
                    ],
                  ),
                  _buildSection(
                    context,
                    title: 'Ferramentas',
                    items: [
                      _DrawerItem(
                        icon: Icons.format_list_numbered,
                        label: 'Concordancia',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/ferramentas/concordancia');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.fact_check,
                        label: 'Critica Textual',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/ferramentas/critica-textual');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.compare,
                        label: 'Comparar',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/comparar');
                        },
                      ),
                    ],
                  ),
                  _buildSection(
                    context,
                    title: 'Extras',
                    items: [
                      _DrawerItem(
                        icon: Icons.psychology,
                        label: 'Assistente IA',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/ia');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.bookmark,
                        label: 'Favoritos',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/favoritos');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.note,
                        label: 'Notas',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/notas');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.quiz,
                        label: 'Quiz',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/quiz');
                        },
                      ),
                      _DrawerItem(
                        icon: Icons.flash_on,
                        label: 'Flashcards',
                        onTap: () {
                          Navigator.pop(context);
                          context.go('/flashcards');
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
            _buildThemeSwitcher(context, theme, tema),
            _buildFooter(context, theme),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, ThemeData theme) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
      decoration: BoxDecoration(
        color: theme.colorScheme.primary.withOpacity(0.05),
        border: Border(
          bottom: BorderSide(
            color: theme.colorScheme.outline.withOpacity(0.15),
          ),
        ),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 28,
            backgroundColor: theme.colorScheme.primary.withOpacity(0.15),
            backgroundImage: avatarUrl != null ? NetworkImage(avatarUrl!) : null,
            child: avatarUrl == null
                ? Icon(
                    Icons.person,
                    size: 28,
                    color: theme.colorScheme.primary,
                  )
                : null,
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  userName ?? 'Visitante',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                if (userEmail != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    userEmail!,
                    style: theme.textTheme.bodySmall,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSection(
    BuildContext context, {
    required String title,
    required List<_DrawerItem> items,
  }) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
          child: Text(
            title.toUpperCase(),
            style: theme.textTheme.labelSmall?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: 1.2,
              color: theme.colorScheme.primary.withOpacity(0.7),
            ),
          ),
        ),
        ...items.map((item) => ListTile(
              leading: Icon(
                item.icon,
                size: 22,
                color: theme.colorScheme.onSurface.withOpacity(0.7),
              ),
              title: Text(
                item.label,
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
              dense: true,
              contentPadding: const EdgeInsets.symmetric(horizontal: 20),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
              onTap: item.onTap,
            )),
      ],
    );
  }

  Widget _buildThemeSwitcher(
      BuildContext context, ThemeData theme, TemaProvider tema) {
    final temaProvider = Provider.of<TemaProvider>(context, listen: false);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: theme.colorScheme.outline.withOpacity(0.15),
          ),
        ),
      ),
      child: Row(
        children: [
          Icon(
            Icons.palette,
            size: 20,
            color: theme.colorScheme.onSurface.withOpacity(0.6),
          ),
          const SizedBox(width: 12),
          Text(
            'Tema:',
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.6),
            ),
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                value: tema.tema,
                isDense: true,
                isExpanded: false,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
                items: const [
                  DropdownMenuItem(value: AppTheme.light, child: Text('Claro')),
                  DropdownMenuItem(value: AppTheme.dark, child: Text('Escuro')),
                  DropdownMenuItem(value: AppTheme.sepia, child: Text('Sepia')),
                  DropdownMenuItem(
                      value: AppTheme.noturno, child: Text('Noturno')),
                ],
                onChanged: (value) {
                  if (value != null) {
                    temaProvider.setTema(value);
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter(BuildContext context, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Row(
        children: [
          Icon(
            Icons.info_outline,
            size: 16,
            color: theme.colorScheme.onSurface.withOpacity(0.4),
          ),
          const SizedBox(width: 8),
          Text(
            'v0.1.0',
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.4),
            ),
          ),
        ],
      ),
    );
  }
}

class _DrawerItem {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _DrawerItem({
    required this.icon,
    required this.label,
    required this.onTap,
  });
}
