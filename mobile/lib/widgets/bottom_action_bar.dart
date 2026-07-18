import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class BottomActionBar extends StatelessWidget {
  final VoidCallback? onCrossRefs;
  final VoidCallback? onComentarios;
  final VoidCallback? onLexicon;
  final VoidCallback? onAudio;
  final VoidCallback? onCompartilhar;
  final int? crossRefCount;
  final int? comentarioCount;
  final int? lexiconCount;

  const BottomActionBar({
    super.key,
    this.onCrossRefs,
    this.onComentarios,
    this.onLexicon,
    this.onAudio,
    this.onCompartilhar,
    this.crossRefCount,
    this.comentarioCount,
    this.lexiconCount,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: theme.scaffoldBackgroundColor,
        border: Border(
          top: BorderSide(
            color: theme.dividerColor.withOpacity(0.5),
            width: 0.5,
          ),
        ),
      ),
      child: SafeArea(
        top: false,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildActionButton(
              context,
              icon: Icons.link,
              label: 'Refs',
              badge: crossRefCount,
              color: Colors.blue,
              onTap: onCrossRefs,
            ),
            _buildActionButton(
              context,
              icon: Icons.comment_outlined,
              label: 'Coment.',
              badge: comentarioCount,
              color: Colors.green,
              onTap: onComentarios,
            ),
            _buildActionButton(
              context,
              icon: Icons.translate,
              label: 'Léxico',
              badge: lexiconCount,
              color: Colors.orange,
              onTap: onLexicon,
            ),
            _buildActionButton(
              context,
              icon: Icons.headphones_outlined,
              label: 'Áudio',
              color: Colors.purple,
              onTap: onAudio,
            ),
            _buildActionButton(
              context,
              icon: Icons.share_outlined,
              label: 'Compart.',
              color: Colors.teal,
              onTap: onCompartilhar,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton(
    BuildContext context, {
    required IconData icon,
    required String label,
    int? badge,
    required Color color,
    VoidCallback? onTap,
  }) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap?.call();
      },
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Icon(
                  icon,
                  size: 22,
                  color: color.withOpacity(0.8),
                ),
                if (badge != null && badge > 0)
                  Positioned(
                    right: -8,
                    top: -6,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: color,
                        shape: BoxShape.circle,
                      ),
                      child: Text(
                        '$badge',
                        style: const TextStyle(
                          fontSize: 9,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                color: color.withOpacity(0.8),
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
